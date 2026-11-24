// Illustrated, colourful version of the ampersand reel (reuses amp2 narration)
const K = { cream: '#F7F0E6', paper: '#F3E9DC', ink: '#231F1B', rust: '#C8553D', mustard: '#E9B44C', teal: '#2A9D8F', navy: '#264653', coral: '#F4A261', plum: '#6D597A', sky: '#A8DADC', green: '#6A994E', skin: '#EBC39C', wood: '#A0643A' };
const BLK = [K.rust, K.teal, K.mustard, K.plum, K.coral, K.navy, K.green];
const shade = (c, f = .72) => { const n = parseInt(c.slice(1), 16); const r = (n >> 16) * f | 0, g = ((n >> 8) & 255) * f | 0, b = (n & 255) * f | 0; return `rgb(${r},${g},${b})`; };
const bounceOut = x => { const n1 = 7.5625, d1 = 2.75; if (x < 1 / d1) return n1 * x * x; if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75; if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375; return n1 * (x -= 2.625 / d1) * x + .984375; };
function T(t, d, fn, ease = 'inOut') { anim(document.body, 'fn', t, d, { ease, fn: (r, k, tt) => { if (tt < t) return; fn(k, r, tt); } }); }
function div(p, css, html = '') { return h('div', { style: 'position:absolute;' + css }, p, html); }
function at(el, x, y, s = 1, rot = 0, extra = '') { el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${rot}deg) scale(${s}) ${extra}`; }
function sceneDiv(root, bg, z) { return div(root, `left:0;top:0;width:1080px;height:1920px;overflow:hidden;background:${bg};z-index:${z};clip-path:circle(0px at 540px 960px)`); }
function iris(sc, t, cx, cy, d = .6) { sc.style.clipPath = 'circle(0px at 540px 960px)'; T(t, d, (k, r) => { sc.style.clipPath = `circle(${k * 2300}px at ${cx}px ${cy}px)`; }, 'inOut'); }
function confetti(p, t, cx, cy, n = 26, spread = 520, cols = BLK) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (i % 3) * .3, v = spread * (.55 + ((i * 37) % 10) / 20), c = cols[i % cols.length];
    const shape = i % 3 === 0 ? 'border-radius:50%' : i % 3 === 1 ? 'border-radius:3px' : 'border-radius:2px;height:8px';
    const el = div(p, `left:0;top:0;width:18px;height:18px;background:${c};${shape};opacity:0;z-index:30`);
    T(t, 1.3, (k, r) => { const x = cx + Math.cos(a) * v * E.out(r), y = cy + Math.sin(a) * v * E.out(r) * .8 + 420 * r * r; el.style.opacity = r < 1 ? (1 - r * r) : 0; at(el, x, y, 1, r * 720 * (i % 2 ? 1 : -1)); }, 'lin');
  }
}
function sparkleBurst(p, t, cx, cy, n = 10, R = 260, col = K.mustard) {
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const el = div(p, `left:0;top:0;width:60px;height:60px;z-index:25;opacity:0`, `<svg width="60" height="60" viewBox="-30 -30 60 60"><path d="M0,-28 L7,-7 L28,0 L7,7 L0,28 L-7,7 L-28,0 L-7,-7Z" fill="${i % 2 ? col : K.coral}"/></svg>`);
    T(t, .9, (k, r) => { const d = R * E.out(r); el.style.opacity = r < 1 ? 1 - r : 0; at(el, cx + Math.cos(a) * d, cy + Math.sin(a) * d, (1 - r) * 1.2 + .2, r * 180); }, 'lin'); }
}

// ---------- captions on a card, marker highlight on key words ----------
function captions4(root, B, cfg) {
  const card = div(root, `left:60px;top:150px;width:960px;z-index:50;`);
  B.forEach((b, i) => {
    const box = div(card, `left:0;top:0;width:960px;box-sizing:border-box;padding:30px 44px 34px;background:rgba(247,240,230,.94);border-radius:28px;box-shadow:0 10px 30px rgba(35,31,27,.12);font:400 74px/1.2 "EB Garamond";color:${K.ink};opacity:0`);
    cfg[i].show.split(/\s+/).forEach((tk, j) => {
      const em = tk.includes('*'); const sp = h('span', { class: 'cw' + (em ? ' cem' : '') }, box, tk.replace(/\*/g, '')); box.appendChild(document.createTextNode(' '));
      const t = b.words[j] - .06;
      anim(sp, 'fn', t, .32, { fn: (r) => { const k = E.out(r); sp.style.opacity = k; sp.style.transform = `translateY(${(1 - k) * 18}px)`; if (em) sp.style.backgroundSize = `${E.inOut(clamp((r - .2) / .8)) * 100}% 42%`; } });
    });
    const tIn = b.t0 - .2, tOut = i < B.length - 1 ? B[i + 1].t0 - .16 : b.t1 + .45;
    anim(box, 'fn', 0, 1, { fn: (r, k, t) => { let o = 0, dy = 0, s = 1;
      if (t >= tIn && t < tOut) { const q = E.back(clamp((t - tIn) / .3)); o = clamp((t - tIn) / .15); s = .96 + .04 * q; }
      else if (t >= tOut && t < tOut + .22) { const q = E.inOut((t - tOut) / .22); o = 1 - q; dy = -24 * q; }
      box.style.opacity = o; box.style.transform = `translateY(${dy}px) scale(${s})`; } });
  });
}

// ---------- illustrations ----------
function scribeSVG(svg) {
  const g = h('g', {}, svg);
  // body / toga
  h('path', { d: 'M110,1600 C120,1300 180,1120 330,1080 C480,1120 540,1300 560,1600Z', fill: K.cream, ...OL }, g);
  h('path', { d: 'M200,1110 C300,1250 420,1380 520,1600 L470,1600 C380,1420 280,1300 180,1150Z', fill: K.rust, ...OL, 'stroke-width': 5 }, g);
  // neck + head
  h('path', { d: 'M300,1040 L300,1095 L360,1095 L360,1040Z', fill: K.skin, ...OL, 'stroke-width': 5 }, g);
  h('ellipse', { cx: 330, cy: 960, rx: 92, ry: 108, fill: K.skin, ...OL }, g);
  h('path', { d: 'M240,930 C230,840 300,820 340,825 C400,825 440,860 425,930 C410,890 380,880 350,885 C320,870 280,880 240,930Z', fill: '#3D2B1F', ...OL, 'stroke-width': 5 }, g);
  // laurel
  for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * .1), x = 330 + Math.cos(a) * 100, y = 935 + Math.sin(a) * 70; h('ellipse', { cx: x, cy: y, rx: 22, ry: 10, fill: K.green, stroke: K.ink, 'stroke-width': 3, transform: `rotate(${a * 57.3 + 60} ${x} ${y})` }, g); }
  // face
  h('path', { d: 'M360,955 q14,-10 28,0', fill: 'none', ...OL, 'stroke-width': 5 }, g);
  h('path', { d: 'M395,975 q18,22 -4,30', fill: 'none', ...OL, 'stroke-width': 4 }, g);
  h('path', { d: 'M350,1025 q22,10 40,-4', fill: 'none', ...OL, 'stroke-width': 4 }, g);
  h('circle', { cx: 300, cy: 995, r: 12, fill: K.coral, opacity: .5 }, g);
  return g;
}
function tabletEl(p, x, y, s, rot) {
  const el = div(p, 'left:0;top:0;width:420px;height:300px;', `<svg width="420" height="300"><rect x="4" y="4" width="412" height="292" rx="16" fill="${K.wood}" stroke="${K.ink}" stroke-width="6"/><rect x="34" y="34" width="352" height="232" rx="6" fill="#3A3631" stroke="${K.ink}" stroke-width="4"/></svg>`);
  const et = div(el, `left:0;top:0;width:420px;height:300px;display:flex;align-items:center;justify-content:center;font:italic 400 150px "EB Garamond";color:${K.cream};`, 'et');
  at(el, x, y, s, rot); return { el, et };
}
function kid(svg, x, hair, shirt, bow) {
  const g = h('g', { transform: `translate(${x},0)` }, svg);
  h('path', { d: 'M-115,1620 C-115,1470 -80,1420 0,1420 C80,1420 115,1470 115,1620Z', fill: shirt, ...OL }, g);
  const head = h('g', {}, g);
  h('circle', { cx: 0, cy: 1340, r: 82, fill: hair, ...OL }, head);
  h('path', { d: 'M-78,1320 C-60,1260 60,1260 78,1320', fill: 'none', stroke: shade(hair, .8), 'stroke-width': 8 }, head);
  h('ellipse', { cx: -84, cy: 1355, rx: 14, ry: 22, fill: K.skin, ...OL, 'stroke-width': 4 }, head); h('ellipse', { cx: 84, cy: 1355, rx: 14, ry: 22, fill: K.skin, ...OL, 'stroke-width': 4 }, head);
  if (bow) { h('path', { d: 'M20,1262 l40,-26 l0,52Z M20,1262 l-40,-26 l0,52Z', fill: bow, ...OL, 'stroke-width': 4 }, head); h('circle', { cx: 20, cy: 1262, r: 10, fill: bow, ...OL, 'stroke-width': 4 }, head); }
  return { g, head };
}
function bubble(p, word, x, y, col) {
  const el = div(p, `left:0;top:0;padding:14px 34px 22px;background:#fff;border:6px solid ${K.ink};border-radius:46px;font:italic 600 76px "EB Garamond";color:${col};white-space:nowrap;opacity:0;z-index:20`, word + `<div style="position:absolute;left:50%;bottom:-26px;width:34px;height:34px;background:#fff;border-right:6px solid ${K.ink};border-bottom:6px solid ${K.ink};transform:translateX(-50%) rotate(45deg)"></div>`);
  at(el, x, y); return el;
}

function buildAmp3(cfg) {
  const B = VO.beats; DURATION = VO.dur;
  const w = (i, j) => { const ws = B[i].words; return ws[j < 0 ? ws.length + j : Math.min(j, ws.length - 1)]; };
  const root = div(document.getElementById('stage'), 'left:0;top:0;width:1080px;height:1920px;overflow:hidden');

  // ================= S1: toy blocks =================
  const s1 = div(root, `left:0;top:0;width:1080px;height:1920px;overflow:hidden;background:${K.paper};z-index:1`);
  const wall = div(s1, 'left:-200px;top:0;width:6000px;height:1920px;background-image:radial-gradient(circle at 20px 20px, rgba(200,85,61,.18) 7px, transparent 8px),radial-gradient(circle at 90px 80px, rgba(42,157,143,.16) 6px, transparent 7px);background-size:140px 140px');
  const cam = div(s1, 'left:0;top:0;width:0;height:0;transform-origin:0 0');
  const BX = i => 200 + i * 178, BY = 1150, SZ = 150;
  div(cam, `left:-400px;top:${BY + SZ / 2 + 14}px;width:5800px;height:46px;background:${K.wood};border:5px solid ${K.ink};border-radius:8px;box-shadow:0 18px 0 ${shade(K.wood)}`);
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const panT0 = B[0].t0 + .1, panT1 = w(0, -1) + .25, zX = BX(25), slotX = BX(26) + 20;
  const blocks = L.map((c, i) => {
    const col = BLK[i % BLK.length];
    const b = div(cam, `left:0;top:0;width:${SZ}px;height:${SZ}px;box-sizing:border-box;background:${col};border:5px solid ${K.ink};border-radius:20px;box-shadow:0 12px 0 ${shade(col)};display:flex;align-items:center;justify-content:center;font:900 104px Fraunces;color:${K.cream};opacity:0`, c);
    const camX = x => 540 - x; // screen x of world x at start-of-pan mapping approximated
    const f = clamp((BX(i) - 900) / (zX - 700)); const tl = f > 0 ? panT0 + (panT1 - panT0) * f - .1 : .05 + i * .07;
    T(Math.max(0, tl), .7, (k, r) => { const y = BY - 700 * (1 - bounceOut(r)); b.style.opacity = 1; const sq = r > .3 && r < .45 ? 1.12 : 1; b.style.transform = `translate(${BX(i) - SZ / 2}px,${y - SZ / 2}px) scale(${sq},${2 - sq})`; }, 'lin');
    if (i % 4 === 0) cue(Math.max(0, tl) + .25, 'tick');
    return b;
  });
  // camera
  const camKeys = [{ x: 680, y: BY - 120, s: 1 }, { t: panT0, d: panT1 - panT0, x: zX - 120, y: BY - 120, s: 1 }, { t: w(3, 0) - .1, d: B[3].t1 - w(3, 0) + .4, x: slotX, y: BY + 10, s: 2.6 }];
  ticks.push(t => { let c = { ...camKeys[0] }; for (let i = 1; i < camKeys.length; i++) { const k = camKeys[i]; if (t <= k.t) break; const p = E.inOut(clamp((t - k.t) / k.d)); c = { x: c.x + (k.x - c.x) * p, y: c.y + (k.y - c.y) * p, s: c.s * Math.pow(k.s / c.s, p) }; }
    const shake = (t > w(2, 5) && t < w(2, 5) + .35) ? Math.sin(t * 90) * 10 * (1 - (t - w(2, 5)) / .35) : 0;
    cam.style.transform = `translate(${540 - c.x * c.s + shake}px,${960 - c.y * c.s}px) scale(${c.s})`; wall.style.transform = `translateX(${-(c.x - 680) * .35}px)`; });
  // X Y Z hops
  [[23, 10], [24, 11], [25, 12]].forEach(([li, wj]) => { const b = blocks[li]; T(w(1, wj) - .06, .45, (k, r) => { const j = Math.sin(Math.PI * r); b.style.transform = `translate(${BX(li) - SZ / 2}px,${BY - SZ / 2 - 90 * j}px) scale(${1 - .08 * j},${1 + .1 * j})`; }, 'lin'); cue(w(1, wj), 'tick'); });
  // "and" block
  const andB = div(cam, `left:0;top:0;width:${SZ + 40}px;height:${SZ}px;box-sizing:border-box;background:#D9CFC1;border:5px solid ${K.ink};border-radius:20px;box-shadow:0 12px 0 #B5AA9B;display:flex;align-items:center;justify-content:center;font:italic 600 84px "EB Garamond";color:${K.ink};opacity:0`, 'and');
  T(w(1, 13) - .1, .7, (k, r) => { andB.style.opacity = 1; andB.style.transform = `translate(${slotX - (SZ + 40) / 2}px,${BY - 700 * (1 - bounceOut(r)) - SZ / 2}px)`; }, 'lin'); cue(w(1, 13) + .2, 'tick');
  // flick off
  T(w(2, 2), .9, (k, r) => { andB.style.transform = `translate(${slotX - (SZ + 40) / 2 + 420 * r}px,${BY - SZ / 2 - 260 * Math.sin(Math.PI * r * .6) + 600 * r * r}px) rotate(${r * 160}deg)`; andB.style.opacity = 1 - clamp((r - .7) / .3); }, 'lin'); cue(w(2, 2), 'pop');
  // & block
  const ampB = div(cam, `left:0;top:0;width:${SZ + 20}px;height:${SZ + 20}px;box-sizing:border-box;background:${K.mustard};border:6px solid ${K.ink};border-radius:22px;box-shadow:0 14px 0 ${shade(K.mustard)};display:flex;align-items:center;justify-content:center;font:400 120px "Libre Caslon Text";color:${K.ink};opacity:0`, '&');
  T(w(2, 5) - .3, .8, (k, r) => { ampB.style.opacity = 1; const y = BY - 900 * (1 - bounceOut(r)); const land = r > .32 && r < .5 ? 1.18 : 1; ampB.style.transform = `translate(${slotX - (SZ + 20) / 2}px,${y - (SZ + 20) / 2 - 10}px) scale(${land},${2 - land})`; }, 'lin'); cue(w(2, 5), 'thud');
  // confetti in world? -> screen space at the & position (camera at s=1, & at screen x = 540 + (slotX - (zX-120)))
  confetti(s1, w(2, 5) + .05, 540 + (slotX - (zX - 120)), 1080, 28, 480);
  // secret: & wiggles + glow
  T(w(3, 5) - .1, .8, (k, r) => { ampB.style.boxShadow = `0 14px 0 ${shade(K.mustard)}, 0 0 ${60 * Math.sin(Math.PI * r)}px ${30 * Math.sin(Math.PI * r)}px rgba(233,180,76,.8)`; ampB.style.transform = `translate(${slotX - (SZ + 20) / 2}px,${BY - (SZ + 20) / 2 - 10}px) rotate(${Math.sin(r * 30) * 6 * (1 - r)}deg)`; }, 'lin'); cue(w(3, 5), 'chime');

  // ================= S2: Rome =================
  const s2 = sceneDiv(root, '#F3E9DC', 2); iris(s2, B[4].t0 - .35, 540, 990, .65);
  const r2 = svgBox(s2, 0, 0, 1080, 1920);
  r2.innerHTML = `<defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6BD8A"/><stop offset=".55" stop-color="#F9DDB5"/><stop offset="1" stop-color="#F3E9DC"/></linearGradient></defs>
  <rect width="1080" height="1920" fill="url(#sky2)"/>`;
  const sun = h('circle', { cx: 760, cy: 860, r: 130, fill: K.coral, opacity: .9 }, r2);
  h('path', { d: 'M0,1250 C200,1150 380,1190 560,1230 C760,1170 900,1150 1080,1210 L1080,1920 L0,1920Z', fill: '#E7B97E' }, r2);
  h('path', { d: 'M0,1350 C260,1290 520,1330 1080,1300 L1080,1920 L0,1920Z', fill: '#D9A66B' }, r2);
  const cols = h('g', {}, r2);
  [[70, 560], [1010, 560]].forEach(([cx]) => { h('rect', { x: cx - 70, y: 560, width: 140, height: 1060, fill: K.cream, ...OL }, cols); [-35, 0, 35].forEach(dx => h('line', { x1: cx + dx, y1: 600, x2: cx + dx, y2: 1600, stroke: '#D8CBB8', 'stroke-width': 6 }, cols)); h('rect', { x: cx - 100, y: 530, width: 200, height: 50, fill: K.cream, ...OL }, cols); h('rect', { x: cx - 100, y: 1600, width: 200, height: 40, fill: K.cream, ...OL }, cols); });
  h('rect', { x: 0, y: 1630, width: 1080, height: 300, fill: '#C99A62', ...OL }, r2);
  const scribe = scribeSVG(r2);
  const tab = tabletEl(s2, 720, 1250, 1, -6); tab.et.style.clipPath = 'inset(0 100% 0 0)';
  const arm = div(s2, 'left:0;top:0;width:300px;height:60px;transform-origin:0 50%', `<svg width="300" height="60"><rect x="0" y="12" width="250" height="36" rx="18" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/><rect x="230" y="22" width="80" height="12" rx="6" fill="${K.cream}" stroke="${K.ink}" stroke-width="4"/></svg>`);
  ticks.push(t => { const r = clamp((t - (w(4, 4) - .15)) / .8); const wig = r > 0 && r < 1 ? Math.sin(r * 22) * 14 : 0; arm.style.transform = `translate(${430 + 120 * r}px,${1180 + wig}px) rotate(${-8 + wig * .3}deg)`; sun.setAttribute('cy', 880 - 40 * clamp((t - B[4].t0) / 5)); cols.setAttribute('transform', `translate(${-6 * clamp((t - B[4].t0) / 5)},0)`); });
  T(w(4, 4) - .15, .8, k => tab.et.style.clipPath = `inset(0 ${(1 - k) * 100}% 0 0)`); cue(w(4, 4) - .1, 'scratch');
  [[250, 640, -12], [830, 600, 9], [520, 560, 4], [180, 800, 7]].forEach(([x, y, rot], i) => { const tt = tabletEl(s2, x, y, .55, rot); tt.el.style.opacity = 0;
    T(w(4, 8) + i * .12, .45, (k, r) => { tt.el.style.opacity = 1; at(tt.el, x, y, .55 * Math.max(0, E.back(r)), rot); }, 'lin'); cue(w(4, 8) + i * .12, 'pop'); });

  // ================= S3: melt =================
  const s3 = sceneDiv(root, '#F6E3B4', 3); iris(s3, B[5].t0 - .3, 720, 1250, .6);
  const rays = div(s3, `left:-460px;top:-0px;width:2000px;height:2000px;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(233,180,76,.35) 0deg 10deg, transparent 10deg 20deg);opacity:0`);
  ticks.push(t => { at(rays, 540, 1100, 1, t * 12); });
  const goo = div(s3, 'left:0;top:0;width:1080px;height:1920px;filter:url(#goo)');
  const gE = div(goo, `left:0;top:0;font:900 460px/1 Fraunces;color:${K.rust}`, 'E'), gT = div(goo, `left:0;top:0;font:900 460px/1 Fraunces;color:${K.teal}`, 't');
  const drips = [0, 1, 2, 3, 4, 5].map(i => div(goo, `left:0;top:0;width:${40 - i * 3}px;height:${40 - i * 3}px;border-radius:50%;background:${i % 2 ? K.teal : K.rust};opacity:0`));
  ticks.push(t => {
    if (t < B[5].t0 - .5 || t > B[6].t1 + 1) return;
    const m = E.inOut(clamp((t - w(5, 6)) / (w(6, 2) - w(5, 6) + .2)));
    const wob = Math.sin(t * 9) * 6 * m;
    at(gE, 360 + 150 * m, 1110 + wob, 1 - .15 * m, -6 * m, `scale(${1 + .06 * Math.sin(t * 7) * m},${1 - .05 * Math.sin(t * 7) * m})`);
    at(gT, 740 - 170 * m, 1130 - wob, 1 - .15 * m, 8 * m);
    drips.forEach((d, i) => { const ts = w(5, 8) + i * .18, r = clamp((t - ts) / 1.3); d.style.opacity = r > 0 && r < 1 ? 1 : 0; at(d, 470 + i * 28, 1250 + 520 * r * r); });
    const pop = E.back(clamp((t - (B[5].t0 - .1)) / .5)); goo.style.opacity = clamp((t - (B[5].t0 - .2)) / .3) * (1 - clamp((t - w(6, 2)) / .35)); goo.style.transform = `scale(${.6 + .4 * Math.min(1.1, pop)})`; goo.style.transformOrigin = '540px 1100px';
  });
  const ampC = div(s3, `left:0;top:0;font:400 520px/1 "Libre Caslon Text";color:${K.rust};opacity:0;text-shadow:0 14px 0 rgba(35,31,27,.12)`, '&');
  T(w(6, 2) - .05, .6, (k, r) => { ampC.style.opacity = clamp(r * 3); at(ampC, 540, 1100, Math.max(0, E.back(r))); rays.style.opacity = k; }, 'lin'); cue(w(6, 2), 'chime');
  sparkleBurst(s3, w(6, 2) + .05, 540, 1100, 12, 360);
  T(w(6, 5) - .05, .5, (k, r) => at(ampC, 540, 1100, 1 + .16 * Math.sin(Math.PI * r), Math.sin(r * Math.PI * 2) * 4), 'lin');

  // ================= S4: classroom =================
  const s4 = sceneDiv(root, '#E9D7BC', 4); iris(s4, B[7].t0 - .3, 540, 1100, .6);
  const r4 = svgBox(s4, 0, 0, 1080, 1920);
  h('rect', { x: 0, y: 1180, width: 1080, height: 760, fill: '#C79D74' }, r4); h('rect', { x: 0, y: 1172, width: 1080, height: 16, fill: '#8E6845' }, r4);
  for (let i = 0; i < 9; i++) h('rect', { x: i * 124 + 10, y: 1200, width: 104, height: 300, rx: 6, fill: 'none', stroke: '#B48A60', 'stroke-width': 5 }, r4);
  h('rect', { x: 70, y: 560, width: 940, height: 560, rx: 14, fill: K.wood, ...OL }, r4); h('rect', { x: 100, y: 590, width: 880, height: 500, fill: '#2F5D50', ...OL, 'stroke-width': 4 }, r4);
  h('rect', { x: 600, y: 1100, width: 110, height: 18, rx: 4, fill: K.cream, ...OL, 'stroke-width': 3 }, r4);
  const chalk = (txt, x, y, size, col = '#F1EADF') => { const el = div(s4, `left:0;top:0;font:italic 500 ${size}px "EB Garamond";color:${col};white-space:nowrap;opacity:0`, txt); at(el, x, y); return el; };
  const cXYZ = ['X', 'Y', 'Z', '&'].map((c, i) => chalk(c, 250 + i * 170, 700, 130, i === 3 ? '#F6C89F' : '#F1EADF'));
  cXYZ[3].style.fontFamily = '"Libre Caslon Text"'; cXYZ[3].style.fontStyle = 'normal';
  [w(7, 1), w(7, 2), w(7, 3), w(7, 4)].forEach((t, i) => T(t - .05, .35, k => { cXYZ[i].style.opacity = 1; cXYZ[i].style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; }, 'out'));
  cue(w(7, 1), 'scratch');
  const gloss = chalk('& by itself is and', 540, 900, 84, '#F6C89F'); gloss.style.fontFamily = '"EB Garamond"';
  T(w(8, 0) - .05, B[8].t1 - w(8, 0) + .1, k => { gloss.style.opacity = 1; gloss.style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; }, 'lin'); cue(w(8, 0), 'scratch');
  const kidsSvg = svgBox(s4, 0, 0, 1080, 1920);
  const kids = [[175, '#2B2D42', K.teal, null], [415, '#8D5524', K.mustard, K.coral], [665, '#E76F51', K.plum, null], [905, '#3D2B1F', K.coral, K.teal]].map(([x, hc, sc, bw]) => kid(kidsSvg, x, hc, sc, bw));
  h('rect', { x: -20, y: 1560, width: 1120, height: 70, fill: '#8E6845', ...OL }, kidsSvg); h('rect', { x: -20, y: 1630, width: 1120, height: 300, fill: '#B07A4A' }, kidsSvg);
  const words = ['and', 'per', 'se', 'and'], bcol = [K.rust, K.teal, K.plum, K.rust];
  const bubs = words.map((wd, i) => bubble(s4, wd, [175, 415, 665, 905][i], 1170, bcol[i]));
  [6, 7, 8, 9].forEach((j, i) => { T(w(7, j) - .08, .4, (k, r) => { bubs[i].style.opacity = clamp(r * 3); at(bubs[i], [175, 415, 665, 905][i], 1170, Math.max(0, E.back(r))); }, 'lin'); cue(w(7, j), 'pop'); });
  ticks.push(t => kids.forEach((kd, i) => { let b = 0; const ti = w(7, 6 + i); if (t > ti - .1 && t < ti + .4) b = Math.sin(Math.PI * (t - ti + .1) / .5) * 26;
    if (t > B[9].t0 && t < B[10].t1) b = Math.abs(Math.sin(t * 14 + i)) * 18; if (t > B[11].t0 && t < B[11].t1 + .5) b = Math.abs(Math.sin(t * 8 + i * 1.3)) * 50;
    kd.head.setAttribute('transform', `translate(0,${-b})`); }));
  // say it fast: bubbles squash into one
  const big = div(s4, `left:0;top:0;padding:18px 50px 30px;background:#fff;border:7px solid ${K.ink};border-radius:60px;font:italic 600 110px "EB Garamond";color:${K.ink};white-space:nowrap;opacity:0;z-index:21`);
  const parts = [['a', 'k'], ['m', 'i'], ['n', 'd'], ['d', 'd'], [' ', 'd'], ['p', 'k'], ['e', 'k'], ['r', 'k'], [' ', 'd'], ['s', 'k'], ['e', 'd'], [' ', 'd'], ['a', 'k'], ['n', 'k'], ['d', 'k']];
  const ms = parts.map(([c, r]) => { const sp = h('span', { class: 'mch' }, big, c === ' ' ? '&nbsp;' : c); sp.dataset.role = r; return sp; });
  const tGather = w(9, 2), tBig = B[10].t0 - .05, tD = w(10, 3) - .05, tI = w(10, 4) - .1;
  T(tGather, tBig - tGather + .05, (k, r) => bubs.forEach((b, i) => { const x0 = [175, 415, 665, 905][i]; at(b, x0 + (540 - x0) * k, 1170 - 40 * k, 1 - .3 * k, Math.sin(r * 40) * 4); }));
  T(tBig, .35, (k, r) => { bubs.forEach(b => b.style.opacity = 1 - k); big.style.opacity = k; at(big, 540, 1150, .7 + .3 * E.back(r)); }, 'lin'); cue(tBig, 'pop');
  let mw = null;
  ticks.push(t => { if (t < tBig - .1 || t > B[11].t1 + 1) return; if (!mw) { const z = document.getElementById('stage').getBoundingClientRect().width / 1080; mw = ms.map(sp => sp.getBoundingClientRect().width / z / (big._s || 1)); }
    ms.forEach((sp, i) => { const role = sp.dataset.role; let vis = 1, dy = 0; if (role === 'i') { vis = E.out(clamp((t - tI) / .4)); dy = (1 - vis) * -50; sp.style.color = K.rust; }
      if (role === 'd') { const k = E.inOut(clamp((t - tD - i * .02) / .45)); vis = 1 - k; dy = k * 60; }
      sp.style.maxWidth = (role === 'k' ? mw[i] : mw[i] * vis) + 'px'; sp.style.opacity = vis; sp.style.transform = `translateY(${dy}px)`; });
    const fin = E.out(clamp((t - w(10, 4) - .15) / .4)); big.style.color = mix(K.ink, K.rust, fin); big.style.background = mix('#ffffff', '#FFF4D6', fin); });
  confetti(s4, w(10, 4) + .1, 540, 1150, 34, 560); cue(w(10, 4) + .1, 'chime');
  const ul = svgBox(s4, 180, 760, 720, 60); const ulp = h('path', { d: 'M10,30 C220,8 480,52 710,20', fill: 'none', stroke: '#F6C89F', 'stroke-width': 9, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, ul); anim(ulp, 'draw', w(11, 5) - .1, .5, { ease: 'inOut' });

  // ================= S5: font flash =================
  const s5 = sceneDiv(root, K.cream, 5); iris(s5, B[12].t0 - .3, 540, 1150, .5);
  const fonts = ['400 "Libre Caslon Text"', '900 Fraunces', '400 "Bebas Neue"', '600 "Playfair Display"', '900 "Bodoni Moda"', '800 Inter', '700 Fredoka', '900 Cinzel', '800 Outfit', '900 Rubik', '700 Oswald'];
  const fbg = [K.mustard, K.teal, K.coral, K.plum, K.sky, K.rust, K.green, K.navy, K.mustard, K.coral, K.teal];
  const fl = div(s5, `left:0;top:0;font:400 560px/1 "Libre Caslon Text";color:${K.ink}`, '&');
  const tF0 = B[12].t0 - .1, tF1 = w(12, 3) - .05;
  ticks.push(t => { if (t < tF0 - .3 || t > B[12].t1 + 1) return; if (t < tF1) { const i = Math.floor((t - tF0) / ((tF1 - tF0) / fonts.length)); const j = Math.max(0, Math.min(fonts.length - 1, i)); fl.style.font = `${fonts[j]} 560px/1`.replace(/^(\d+) (.+) 560px\/1$/, '$1 560px/1 $2'); s5.style.background = fbg[j]; fl.style.color = j === 7 || j === 3 ? K.cream : K.ink; at(fl, 540, 1120, 1 + .03 * Math.sin(t * 40)); }
    else { fl.style.font = 'italic 400 680px/1 "EB Garamond"'; s5.style.background = K.cream; fl.style.color = K.ink; at(fl, 540, 1140, 1); } });
  for (let i = 0; i < 6; i++) cue(tF0 + i * (tF1 - tF0) / 6, 'tick');
  const ov = (clip, col) => { const o = div(s5, `left:0;top:0;padding:200px;font:italic 400 680px/1 "EB Garamond";color:${col};clip-path:${clip};opacity:0`, '&'); at(o, 540, 1140); return o; };
  const oE = ov('inset(0 49% 0 0)', K.rust), oT = ov('inset(0 0 0 51%)', K.teal);
  const lab = (txt, x, col) => { const el = div(s5, `left:0;top:0;font:italic 700 110px "EB Garamond";color:${col};opacity:0`, txt); at(el, x, 1560); return el; };
  const lE = lab('E', 300, K.rust), lT = lab('t', 790, K.teal);
  T(w(12, 5) - .05, .4, (k, r) => { oE.style.opacity = k; lE.style.opacity = k; at(lE, 300, 1560, Math.max(0, E.back(r))); }, 'lin'); cue(w(12, 5), 'pop');
  T(w(12, 8) - .05, .4, (k, r) => { oT.style.opacity = k; lT.style.opacity = k; at(lT, 790, 1560, Math.max(0, E.back(r))); }, 'lin'); cue(w(12, 8), 'pop');

  // ================= S6: keyboard =================
  const s6 = sceneDiv(root, K.navy, 6); iris(s6, B[13].t0 - .3, 540, 1140, .55);
  const kb = div(s6, `left:40px;top:1180px;width:1000px;height:560px;background:#1B2F3A;border:6px solid ${K.ink};border-radius:40px;box-shadow:0 20px 0 #12222A`);
  const keyEl = (x, y, wdt, lbl, hi) => div(kb, `left:${x}px;top:${y}px;width:${wdt}px;height:120px;box-sizing:border-box;background:${hi ? K.mustard : K.cream};border:5px solid ${K.ink};border-radius:20px;box-shadow:0 10px 0 ${hi ? shade(K.mustard) : '#BFB3A1'};display:flex;flex-direction:column;align-items:center;justify-content:center;font:500 46px "EB Garamond";color:${K.ink};line-height:1`, lbl);
  const row1 = ['5', '6', '7', '8', '9'].map((c, i) => keyEl(40 + i * 190, 40, 160, c === '7' ? '<span style="font:400 64px \'Libre Caslon Text\'">&amp;</span><span style="font-size:40px">7</span>' : c, c === '7'));
  ['T', 'Y', 'U', 'I', 'O'].forEach((c, i) => keyEl(90 + i * 190, 200, 160, c));
  const shiftK = keyEl(40, 360, 330, 'shift', true); ['Z', 'X', 'C'].forEach((c, i) => keyEl(400 + i * 190, 360, 160, c));
  const k7 = row1[2];
  const finger = (x) => div(s6, `left:0;top:0;width:110px;height:420px;background:${K.skin};border:6px solid ${K.ink};border-radius:55px 55px 20px 20px;opacity:0`, `<div style="position:absolute;left:22px;top:18px;width:54px;height:58px;border-radius:26px;background:#F6DCC6;border:4px solid ${K.ink}"></div>`);
  const f1 = finger(), f2 = finger();
  const tPress = w(13, 4) - .02;
  ticks.push(t => { const a = E.out(clamp((t - (B[13].t0 + .2)) / .5)), p = Math.sin(Math.PI * clamp((t - tPress) / .3)), gone = E.inOut(clamp((t - tPress - .5) / .5));
    [[f1, 245, 1580], [f2, 525, 1420]].forEach(([f, x, y]) => { f.style.opacity = a * (1 - gone); at(f, x, y + 600 * (1 - a) + 30 * p + 500 * gone, 1, 0); });
    [shiftK, k7].forEach(k => { k.style.transform = `translateY(${8 * p}px)`; k.style.boxShadow = `0 ${10 - 8 * p}px 0 ${shade(K.mustard)}`; }); });
  cue(tPress, 'click');
  const fly = div(s6, `left:0;top:0;font:400 400px/1 "Libre Caslon Text";color:${K.mustard};opacity:0;text-shadow:0 12px 0 rgba(0,0,0,.25);z-index:5`, '&');
  T(tPress + .15, .8, (k, r) => { fly.style.opacity = clamp(r * 4); at(fly, 520 + 20 * k, 1290 - 420 * k, .2 + .8 * E.back(r), (1 - k) * -20); }, 'lin'); cue(tPress + .2, 'chime');
  sparkleBurst(s6, tPress + .6, 540, 870, 10, 300);
  // laurel + = et
  const lw = svgBox(s6, 240, 600, 600, 560); const leaves = [];
  [-1, 1].forEach(sd => { const stem = h('path', { d: `M300,520 C${300 + sd * 240},460 ${300 + sd * 270},200 ${300 + sd * 120},40`, fill: 'none', stroke: K.green, 'stroke-width': 8, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, lw); anim(stem, 'draw', w(13, 8) - .2, .6, { ease: 'inOut' });
    for (let i = 0; i < 7; i++) { const u = .12 + i * .13; const x = 300 + sd * (240 * Math.sin(Math.PI * u) * (1 - u * .5)), y = 520 - 480 * u; const lf = h('ellipse', { cx: x, cy: y, rx: 34, ry: 14, fill: K.green, stroke: K.ink, 'stroke-width': 3, transform: `rotate(${sd * (40 + u * 50)} ${x} ${y})` }, lw); lf.style.opacity = 0; leaves.push([lf, w(13, 8) - .1 + i * .06]); } });
  leaves.forEach(([lf, t]) => T(t, .3, k => lf.style.opacity = k, 'out'));
  const eq = div(s6, `left:0;top:0;font:italic 600 120px "EB Garamond";color:${K.mustard};opacity:0`, '= <i>et</i>'); T(w(13, 9) - .05, .5, (k, r) => { eq.style.opacity = k; at(eq, 540, 1110 + (1 - k) * 30, Math.max(0, E.back(r))); }, 'lin');
  // outro handle
  const tEnd = B[13].t1 + .45;
  const pill = div(root, `left:0;top:0;z-index:60;padding:24px 50px 30px;background:${K.cream};border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.25);text-align:center;opacity:0`, `<div style="font:italic 600 80px 'EB Garamond';color:${K.rust}">@wordology.lab</div><div style="font:400 40px 'EB Garamond';color:${K.ink}">a new word, every day · follow for more</div>`);
  T(tEnd, .55, (k, r) => { pill.style.opacity = clamp(r * 3); at(pill, 540, 330, Math.max(0, E.back(r))); }, 'lin'); cue(tEnd, 'pop');
  T(B[13].t0 - .3, .3, k => document.getElementById('foot').style.opacity = 1 - k);

  captions4(root, B, cfg);
}
