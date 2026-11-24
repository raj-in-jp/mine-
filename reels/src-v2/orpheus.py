import re, sys, time, numpy as np, torch, soundfile as sf
from llama_cpp import Llama
from snac import SNAC
llm = Llama('orpheus.gguf', n_ctx=4096, n_threads=4, verbose=False)
snac = SNAC.from_pretrained('hubertsiuzdak/snac_24khz').eval()
def speak(text, voice, out):
    t0 = time.time()
    prompt = f"<|audio|>{voice}: {text}<|eot_id|>"
    toks = llm.tokenize(prompt.encode(), special=True)
    ids = []
    for tok in llm.generate(toks, temp=0.6, top_p=0.9, repeat_penalty=1.1):
        if tok == llm.token_eos() or len(ids) > 3000: break
        s = llm.detokenize([tok], special=True).decode(errors='ignore')
        m = re.search(r'<custom_token_(\d+)>', s)
        if m and int(m.group(1)) >= 10:
            ids.append(int(m.group(1)))
    codes = [n - 10 - ((i % 7) * 4096) for i, n in enumerate(ids)]
    codes = codes[:len(codes) // 7 * 7]
    l0, l1, l2 = [], [], []
    for j in range(len(codes) // 7):
        c = codes[7*j:7*j+7]
        l0.append(c[0]); l1 += [c[1], c[4]]; l2 += [c[2], c[3], c[5], c[6]]
    if any(x < 0 or x > 4095 for x in l0 + l1 + l2):
        bad = sum(x < 0 or x > 4095 for x in l0 + l1 + l2); print('warn out-of-range codes', bad)
        clip = lambda L: [min(4095, max(0, x)) for x in L]; l0, l1, l2 = clip(l0), clip(l1), clip(l2)
    with torch.inference_mode():
        audio = snac.decode([torch.tensor([l0]), torch.tensor([l1]), torch.tensor([l2])])
    a = audio.squeeze().numpy()
    sf.write(out, a, 24000); print(out, f'{len(a)/24000:.1f}s audio in {time.time()-t0:.0f}s')
if __name__ == '__main__':
    txt = "Seven hundred years ago, calling someone nice was... an insult. It comes from the Latin nescius, meaning ignorant. So for centuries, nice meant you were a fool."
    for v in sys.argv[1:]:
        speak(txt, v, f'or_{v}.wav')
