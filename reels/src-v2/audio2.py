import json, sys, wave, numpy as np
SR = 44100
rng = np.random.default_rng(7)
def env(n, a, r):  # attack/release in samples
    e = np.ones(n); a = max(1, min(a, n)); r = max(1, min(r, n - a))
    e[:a] = np.linspace(0, 1, a); e[-r:] = np.linspace(1, 0, r) * e[-r:]; return e
def lp(x, k):  # crude lowpass: moving average
    if k <= 1: return x
    c = np.cumsum(np.insert(x, 0, 0)); y = (c[k:] - c[:-k]) / k
    return np.concatenate([y, np.zeros(len(x) - len(y))])
def hz(m): return 440 * 2 ** ((m - 69) / 12)

def music(dur):
    n = int(dur * SR); out = np.zeros(n)
    # D major-ish warm progression, 3s per chord
    chords = [[50, 57, 62, 66, 69, 73], [47, 54, 59, 62, 66, 69], [43, 50, 55, 59, 62, 66], [45, 52, 57, 61, 64, 69]]
    cl = 3.0; t = np.arange(n) / SR
    for ci in range(int(dur / cl) + 1):
        ch = chords[ci % 4]; s0 = int(ci * cl * SR); s1 = min(n, int((ci + 1) * cl * SR + .8 * SR))
        if s0 >= n: break
        seg = t[s0:s1] - ci * cl; L = s1 - s0; e = env(L, int(.6 * SR), int(1.0 * SR))
        pad = sum(np.sin(2 * np.pi * hz(m) * seg * d) for m in ch[:4] for d in (1, 1.003)) / 8
        out[s0:s1] += pad * e * .16
        # bass
        out[s0:s1] += np.sin(2 * np.pi * hz(ch[0] - 12) * seg) * e * .12
        # pluck arpeggio, 8ths at 80bpm-ish (0.375s)
        arp = [ch[2], ch[3], ch[4], ch[5], ch[4], ch[3], ch[2], ch[4]]
        for j, m in enumerate(arp):
            st = int((ci * cl + j * .375) * SR)
            if st >= n: break
            L2 = min(int(1.2 * SR), n - st); tt = np.arange(L2) / SR
            f = hz(m + 12)
            pl = (np.sin(2 * np.pi * f * tt) + .35 * np.sin(4 * np.pi * f * tt) + .12 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 4.5)
            out[st:st + L2] += pl * (.07 if j % 2 == 0 else .05)
    # simple echo reverb
    for d, g in [(.23, .3), (.37, .22), (.51, .15)]:
        k = int(d * SR); out[k:] += out[:-k] * g
    out = lp(out, 6)
    fade = env(n, int(.8 * SR), int(1.6 * SR)); return out * fade

def sfx(kind):
    if kind == 'whoosh':
        L = int(.7 * SR); x = rng.standard_normal(L); x = lp(x, 10) - lp(x, 60)
        e = np.sin(np.linspace(0, np.pi, L)) ** 2; return x * e * .5, -.35
    if kind in ('thud', 'stamp'):
        L = int(.5 * SR); tt = np.arange(L) / SR
        f = 90 * np.exp(-tt * 8) + 45
        x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9) * .9
        nz = lp(rng.standard_normal(L), 3) * np.exp(-tt * 40) * (.5 if kind == 'stamp' else .2)
        return x + nz, 0
    if kind == 'pop':
        L = int(.12 * SR); tt = np.arange(L) / SR; f = 900 * np.exp(-tt * 18) + 380
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 30) * .35, 0
    if kind == 'tick':
        L = int(.08 * SR); tt = np.arange(L) / SR
        return (np.sin(2 * np.pi * 1700 * tt) + .5 * np.sin(2 * np.pi * 2650 * tt)) * np.exp(-tt * 70) * .22, 0
    if kind == 'scratch':
        L = int(.8 * SR); tt = np.arange(L) / SR; x = rng.standard_normal(L); x = x - lp(x, 4)
        trem = .55 + .45 * np.sin(2 * np.pi * 9 * tt); return x * trem * env(L, 800, 6000) * .09, 0
    if kind == 'squeak':
        L = int(.09 * SR); tt = np.arange(L) / SR; f = 2600 + 1500 * tt / tt[-1]
        s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.linspace(0, np.pi, L)) * .16
        return np.concatenate([s, np.zeros(int(.05 * SR)), s * .8]), 0
    if kind == 'chime':
        L = int(1.2 * SR); tt = np.arange(L) / SR
        x = sum(np.sin(2*np.pi*f*tt)*a for f,a in [(1568,.5),(2093,.35),(3136,.15)]) * np.exp(-tt*3.5)
        return x * .12, 0
    if kind == 'jingle':
        out = np.zeros(int(.8*SR))
        for j in range(6):
            L=int(.25*SR); tt=np.arange(L)/SR; f=2400+300*(j%3); st=int(j*.07*SR)
            out[st:st+L]+= (np.sin(2*np.pi*f*tt)+.5*np.sin(2*np.pi*f*2.7*tt))*np.exp(-tt*18)*.08
        return out, 0
    return np.zeros(1), 0

reel = sys.argv[1]; cfg = json.load(open(f'cues-{reel}.json'))
import soundfile as sf
vo, vsr = sf.read(f'vo/{reel}.wav')
dur = cfg['dur'] + .2; n = int(dur * SR)
mix = music(dur) * .28
for c in cfg['cues']:
    x, off = sfx(c['type']); st = int((c['t'] + off) * SR)
    if st < 0: x = x[-st:]; st = 0
    e = min(n, st + len(x)); mix[st:e] += x[:e - st] * .55
v = np.interp(np.arange(n), np.arange(len(vo)) * SR / vsr, vo)[:n]
mix += v * 1.0
mix = np.tanh(mix * 1.1) * .9
st = np.stack([mix, np.roll(mix, 220) * .97], 1)
with wave.open(f'audio-{reel}.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(st, -1, 1) * 32767).astype('<i2').tobytes())
print('ok', reel, len(cfg['cues']), 'cues')
