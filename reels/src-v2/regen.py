import os, sys, subprocess, importlib.util, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
cwd = os.getcwd(); os.chdir('../tts'); spec = importlib.util.spec_from_file_location('orph', 'orpheus.py'); orph = importlib.util.module_from_spec(spec); spec.loader.exec_module(orph); os.chdir(cwd)
m = WhisperModel('small.en', device='cpu', compute_type='int8')
jobs = {4: (["Ancient Roman scribes wrote, eht, Latin for and, so often,", "Ancient Roman scribes wrote ehtt, Latin for and, so often,"], ['et ', 'ett', 'eht']),
        13: (["So next time you type it, remember. You're writing, Latin.", "So next time you type it, remember. You're writing LAT-in."], ['latin'])}
for i, (cands, keys) in jobs.items():
    done = False
    for c in cands:
        for k in range(3):
            raw = f'vo/amp2/b{i}_raw.wav'; orph.speak(c, 'dan', raw)
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'atempo=1.1', f'vo/amp2/try{i}.wav'], check=True)
            a, sr = sf.read(f'vo/amp2/try{i}.wav'); a16 = np.interp(np.linspace(0, len(a) - 1, int(len(a) * 16000 / sr)), np.arange(len(a)), a).astype(np.float32)
            txt = ' '.join(x.text for x in m.transcribe(a16)[0]).lower() + ' '
            print(i, repr(c), '|', txt, flush=True)
            if any(kk in txt for kk in keys): os.replace(f'vo/amp2/try{i}.wav', f'vo/amp2/b{i}.wav'); done = True; break
        if done: break
    print('BEAT', i, 'OK' if done else 'KEPT-OLD', flush=True)
