import json, sys, os, re, difflib, subprocess, numpy as np, soundfile as sf
sys.path.insert(0, '../tts'); os.chdir(os.path.dirname(os.path.abspath(__file__)))
from faster_whisper import WhisperModel
import importlib.util
spec = importlib.util.spec_from_file_location('orph', '../tts/orpheus.py'); 
cwd = os.getcwd(); os.chdir('../tts'); orph = importlib.util.module_from_spec(spec); spec.loader.exec_module(orph); os.chdir(cwd)
wm = WhisperModel('base.en', device='cpu', compute_type='int8')
norm = lambda w: re.sub(r'[^a-z]', '', w.lower())
TEMPO = float(os.environ.get('TEMPO', '1.07')); SR = 24000
def load16(a, sr):
    n = int(len(a) * 16000 / sr); return np.interp(np.linspace(0, len(a) - 1, n), np.arange(len(a)), a).astype(np.float32)
def trim(a):
    idx = np.where(np.abs(a) > 0.01)[0]
    return a[max(0, idx[0] - 600): idx[-1] + 2400] if len(idx) else a
scripts = json.load(open('scripts.json'))
for reel in (sys.argv[1:] or scripts):
    os.makedirs(f'vo/{reel}', exist_ok=True)
    beats_out = []; full = [np.zeros(int(.35 * SR))]; t = .35
    for i, b in enumerate(scripts[reel]):
        say = b['say']; sw = say.split(); best = None
        for attempt in range(3):
            raw = f'vo/{reel}/b{i}_raw.wav'
            if not (os.environ.get('REUSE') and os.path.exists(f'vo/{reel}/b{i}.wav')):
                orph.speak(say, 'dan', raw)
                subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', f'atempo={TEMPO}', f'vo/{reel}/b{i}.wav'], check=True)
            a, _ = sf.read(f'vo/{reel}/b{i}.wav'); a = trim(a)
            segs, _ = wm.transcribe(load16(a, SR), word_timestamps=True)
            ww = [(w.word.strip(), w.start, w.end) for s in segs for w in s.words]
            hyp = ' '.join(norm(x[0]) for x in ww); ref = ' '.join(norm(x) for x in sw)
            score = difflib.SequenceMatcher(None, hyp, ref).ratio(); dur = len(a) / SR
            ok = score > .78 and dur < len(sw) * .75 + 1.5
            print(reel, i, f'try{attempt}', f'score={score:.2f}', f'{dur:.1f}s', '|', ' '.join(x[0] for x in ww), flush=True)
            if best is None or score > best[0]: best = (score, a, ww)
            if ok or os.environ.get('REUSE'): break
        score, a, ww = best
        # align say words -> whisper words
        A = [norm(x) for x in sw]; B = [norm(x[0]) for x in ww]
        times = [None] * len(A)
        for blk in difflib.SequenceMatcher(None, A, B, autojunk=False).get_matching_blocks():
            for k in range(blk.size): times[blk.a + k] = (ww[blk.b + k][1], ww[blk.b + k][2])
        # interpolate gaps
        known = [k for k, v in enumerate(times) if v]
        dur = len(a) / SR
        for k in range(len(A)):
            if times[k] is None:
                prev = max([j for j in known if j < k], default=None); nxt = min([j for j in known if j > k], default=None)
                s0 = times[prev][1] if prev is not None else 0.05; s1 = times[nxt][0] if nxt is not None else dur - .1
                lo = prev if prev is not None else -1; hi = nxt if nxt is not None else len(A)
                frac = (k - lo) / (hi - lo); st = s0 + (s1 - s0) * frac; times[k] = (st, st + .25)
        beats_out.append({'t0': round(t, 3), 't1': round(t + dur, 3), 'words': [round(t + s, 3) for s, e in times], 'score': round(score, 2)})
        g = b.get('gap', .4); full.append(a); full.append(np.zeros(int(g * SR))); t += dur + g
    full.append(np.zeros(int(2.8 * SR)))
    sf.write(f'vo/{reel}.wav', np.concatenate(full), SR)
    json.dump({'beats': beats_out, 'dur': round(t + 2.8, 2)}, open(f'vo/{reel}.json', 'w'))
    print('DONE', reel, round(t + 2.8, 1), flush=True)
