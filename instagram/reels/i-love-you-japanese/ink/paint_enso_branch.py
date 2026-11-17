import os, sys, math
import numpy as np
from PIL import Image
REPO, OUT = sys.argv[1], sys.argv[2]
sys.path.insert(0, REPO)
from poly_ink import InkScene, brush_stroke, splatter
from poly_ink.brush import PRESS_DOWN, HOOK
W, H = 1080, 1920
os.makedirs(OUT, exist_ok=True)
def rgba(scene, at):
    scene.render(at=at)
    D = np.clip(scene.p.D, 0, 1); R = np.clip(scene.p.R, 0, 1); a = np.maximum(D, R)
    img = np.zeros((H, W, 4), np.uint8)
    rgb = np.array((20,18,16),np.float32)[None,None,:]*(1-R[...,None]) + np.array((179,36,29),np.float32)*R[...,None]
    img[...,:3] = rgb.astype(np.uint8); img[...,3] = (a*255).astype(np.uint8)
    return Image.fromarray(img,'RGBA')
# 1) enso circle (moon): one stroke, ~340deg, centre (540,560) r 230
cx, cy, r = 540, 560, 230
pts = [(cx + r*math.cos(math.radians(a)), cy + r*math.sin(math.radians(a))) for a in np.linspace(200, 200+335, 14)]
en = InkScene(W, H, seed=31)
en.add(brush_stroke(W, H, pts, 46, dry=0.55, profile=((0,0.7),(0.1,1.0),(0.7,0.85),(1,0.15)), seed=4), 0, 1400)
en.add(splatter(W, H, int(pts[-1][0]), int(pts[-1][1]), (24, 12), n=6, size=(1.2, 3), seed=7, direction=0.3), 1300, 120)
os.makedirs(f'{OUT}/enso', exist_ok=True)
for i, ms in enumerate(range(0, 1601, 33)): rgba(en, ms).save(f'{OUT}/enso/{i+1:04d}.png')
rgba(en, None).save(f'{OUT}/enso_final.png')
# 2) plum branch top-left, painted
br = InkScene(W, H, seed=12); t = 0
t = br.add(brush_stroke(W, H, [(-40, 250), (120, 300), (260, 360), (380, 470)], 34, dry=0.6, profile=PRESS_DOWN, seed=1), 0, 700)
br.add(brush_stroke(W, H, [(150, 305), (190, 230), (250, 190)], 16, dry=0.6, profile=HOOK, seed=2), 400, 400)
br.add(brush_stroke(W, H, [(270, 370), (340, 330), (400, 320)], 14, dry=0.6, profile=HOOK, seed=3), 600, 400)
os.makedirs(f'{OUT}/branch', exist_ok=True)
for i, ms in enumerate(range(0, 1201, 33)): rgba(br, ms).save(f'{OUT}/branch/{i+1:04d}.png')
rgba(br, None).save(f'{OUT}/branch_final.png')
print('ok', len(os.listdir(f'{OUT}/enso')), len(os.listdir(f'{OUT}/branch')))
