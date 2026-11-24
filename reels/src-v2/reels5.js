// Story reels: Eyak, babies, Hebrew (illustrated, colourful). Depends on reels4.js helpers.
const rnd = (i, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
function wfn(B) { return (i, j) => { const ws = B[i].words; return ws[j < 0 ? ws.length + j : Math.min(j, ws.length - 1)]; }; }
function outro(root, B) {
  const last = B[B.length - 1], tEnd = last.t1 + .45;
  const pill = div(root, `left:0;top:0;z-index:60;padding:24px 50px 30px;background:${K.cream};border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.25);text-align:center;opacity:0`, `<div style="font:italic 600 80px 'EB Garamond';color:${K.rust}">@wordology.lab</div><div style="font:400 40px 'EB Garamond';color:${K.ink}">stories language forgot · follow for more</div>`);
  T(tEnd, .55, (k, r) => { pill.style.opacity = clamp(r * 3); at(pill, 540, 330, Math.max(0, E.back(r))); }, 'lin'); cue(tEnd, 'pop');
  T(last.t0 - .3, .3, k => document.getElementById('foot').style.opacity = 1 - k);
}
function snow(p, n, t0, t1, col = '#fff') {
  const fl = []; for (let i = 0; i < n; i++) fl.push(div(p, `left:0;top:0;width:${8 + rnd(i) * 10}px;height:${8 + rnd(i) * 10}px;border-radius:50%;background:${col};opacity:${.5 + rnd(i, 2) * .5}`));
  ticks.push(t => fl.forEach((f, i) => { const sp = 60 + rnd(i, 3) * 80, y = ((rnd(i, 4) * 1920 + t * sp) % 2000) - 40, x = rnd(i, 5) * 1080 + Math.sin(t * .8 + i) * 30; f.style.transform = `translate(${x}px,${y}px)`; }));
  return fl;
}
// grandmother bust (centered at 0,0 = chin), ~ 360 wide
function grandma(svg, x, y, s = 1) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${s})` }, svg);
  h('path', { d: 'M-190,330 C-185,170 -120,110 0,105 C120,110 185,170 190,330Z', fill: K.rust, ...OL }, g);
  h('path', { d: 'M-70,112 L0,200 L70,112', fill: 'none', stroke: K.ink, 'stroke-width': 6 }, g);
  for (let i = 0; i < 4; i++) h('circle', { cx: 0, cy: 225 + i * 30, r: 8, fill: K.mustard, stroke: K.ink, 'stroke-width': 3 }, g);
  h('path', { d: 'M-34,40 L-34,120 L34,120 L34,40Z', fill: K.skin, ...OL, 'stroke-width': 5 }, g);
  h('ellipse', { cx: 0, cy: -40, rx: 105, ry: 118, fill: K.skin, ...OL }, g);
  h('path', { d: 'M-112,-30 C-130,-150 -40,-175 0,-172 C60,-175 130,-140 112,-30 C100,-80 70,-110 0,-112 C-60,-110 -100,-80 -112,-30Z', fill: '#D9D4CC', ...OL, 'stroke-width': 5 }, g);
  h('circle', { cx: 0, cy: -185, r: 48, fill: '#D9D4CC', ...OL, 'stroke-width': 5 }, g);
  [-40, 40].forEach(dx => { h('circle', { cx: dx, cy: -40, r: 30, fill: 'rgba(255,255,255,.35)', stroke: K.ink, 'stroke-width': 5 }, g); h('circle', { cx: dx, cy: -38, r: 7, fill: K.ink }, g); });
  h('line', { x1: -10, y1: -42, x2: 10, y2: -42, stroke: K.ink, 'stroke-width': 5 }, g);
  h('path', { d: 'M-30,25 q30,22 60,0', fill: 'none', stroke: K.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  [-62, 62].forEach(dx => h('circle', { cx: dx, cy: 10, r: 16, fill: K.coral, opacity: .55 }, g));
  return g;
}
function boyHead(svg, x, y, s = 1, phones = true) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${s})` }, svg);
  h('path', { d: 'M-150,300 C-150,170 -95,120 0,120 C95,120 150,170 150,300Z', fill: K.teal, ...OL }, g);
  h('path', { d: 'M-30,60 L-30,130 L30,130 L30,60Z', fill: K.skin, ...OL, 'stroke-width': 5 }, g);
  h('circle', { cx: 0, cy: -10, r: 100, fill: K.skin, ...OL }, g);
  h('path', { d: 'M-102,-20 C-110,-110 -40,-130 10,-125 C70,-125 115,-90 102,-20 C80,-70 40,-60 10,-80 C-20,-55 -70,-60 -102,-20Z', fill: '#5A3825', ...OL, 'stroke-width': 5 }, g);
  [-36, 36].forEach(dx => h('circle', { cx: dx, cy: 0, r: 9, fill: K.ink }, g));
  h('path', { d: 'M-24,40 q24,20 48,0', fill: 'none', stroke: K.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  [-58, 58].forEach(dx => h('circle', { cx: dx, cy: 28, r: 14, fill: K.coral, opacity: .5 }, g));
  if (phones) { h('path', { d: 'M-110,-10 C-115,-150 115,-150 110,-10', fill: 'none', stroke: K.ink, 'stroke-width': 18, 'stroke-linecap': 'round' }, g); h('path', { d: 'M-110,-10 C-115,-150 115,-150 110,-10', fill: 'none', stroke: K.plum, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
    [-1, 1].forEach(sd => h('rect', { x: sd > 0 ? 92 : -132, y: -50, width: 40, height: 84, rx: 18, fill: K.plum, ...OL, 'stroke-width': 5 }, g)); }
  return g;
}
function iconBubble(p, sym, col, size = 120) {
  return div(p, `left:0;top:0;width:${size}px;height:${size * .8}px;background:${col};border:5px solid ${K.ink};border-radius:${size * .4}px;display:flex;align-items:center;justify-content:center;font:700 ${size * .42}px Fredoka;color:${K.cream};opacity:0`, sym + `<div style="position:absolute;left:24%;bottom:-18px;width:26px;height:26px;background:${col};border-right:5px solid ${K.ink};border-bottom:5px solid ${K.ink};transform:rotate(45deg)"></div>`);
}
function photo(p, src, W, H, pos = '50% 50%') {
  const el = div(p, `left:0;top:0;width:${W}px;height:${H}px;padding:22px 22px 70px;background:#FBF7EF;border-radius:6px;box-shadow:0 24px 50px rgba(0,0,0,.35);opacity:0;z-index:2`);
  const box = div(el, `left:22px;top:22px;width:${W}px;height:${H}px;overflow:hidden;background:#222`);
  const img = h('img', { src, style: `position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:${pos};transform-origin:50% 40%` }, box);
  [[-30, -10, -8], [W - 60, -14, 10]].forEach(([x, y, r]) => div(el, `left:${x + 22}px;top:${y}px;width:110px;height:40px;background:rgba(233,180,76,.75);transform:rotate(${r}deg)`));
  return { el, img };
}
const ALASKA = 'M120,160 L300,95 L520,62 L700,72 L700,420 L760,468 L835,550 L862,628 L808,604 L740,530 L655,476 L588,452 L520,470 L440,505 L360,548 L262,602 L160,648 L70,678 L190,598 L245,545 L196,505 L118,478 L80,402 L132,334 L88,262Z';

// ======================= EYAK =======================
function alaskaNight(sc, tw) {
  const svg = svgBox(sc, 0, 0, 1080, 1920);
  svg.innerHTML = `<defs><linearGradient id="nsky${tw}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B2233"/><stop offset=".6" stop-color="#1E4A5C"/><stop offset="1" stop-color="#3E7383"/></linearGradient>
  <linearGradient id="aur${tw}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FF0C0" stop-opacity="0"/><stop offset=".5" stop-color="#7DE8B5" stop-opacity=".8"/><stop offset="1" stop-color="#B58BE0" stop-opacity="0"/></linearGradient>
  <radialGradient id="glow${tw}"><stop offset="0" stop-color="#FFD36B" stop-opacity=".9"/><stop offset="1" stop-color="#FFD36B" stop-opacity="0"/></radialGradient></defs>
  <rect width="1080" height="1920" fill="url(#nsky${tw})"/>`;
  for (let i = 0; i < 40; i++) { const st = h('circle', { cx: rnd(i, 7) * 1080, cy: 440 + rnd(i, 8) * 600, r: 2 + rnd(i, 9) * 3, fill: '#fff' }, svg); ticks.push(t => st.setAttribute('opacity', .4 + .6 * Math.abs(Math.sin(t * 1.5 + i)))); }
  const aur = [0, 1, 2].map(i => h('path', { fill: 'none', stroke: `url(#aur${tw})`, 'stroke-width': 90 - i * 20, opacity: .7, 'stroke-linecap': 'round' }, svg));
  ticks.push(t => aur.forEach((a, i) => { let d = ''; for (let x = -100; x <= 1180; x += 60) { const y = 620 + i * 70 + Math.sin(x / 180 + t * .7 + i) * 60 + Math.sin(x / 90 - t * 1.1) * 18; d += (d ? ' L' : 'M') + x + ',' + y.toFixed(1); } a.setAttribute('d', d); }));
  h('path', { d: 'M-40,1360 L180,1060 L300,1180 L470,960 L640,1200 L780,1040 L1120,1380Z', fill: '#DCE9EE', ...OL, 'stroke-width': 5 }, svg);
  h('path', { d: 'M470,960 L420,1030 L455,1020 L480,1060 L510,1015 L540,1040Z M180,1060 L140,1115 L175,1105 L200,1130 L215,1090Z M780,1040 L740,1095 L775,1090 L800,1110Z', fill: '#fff', ...OL, 'stroke-width': 4 }, svg);
  h('path', { d: 'M-40,1360 L180,1060 L240,1150 L130,1360Z M470,960 L560,1100 L520,1360 L380,1360Z', fill: '#B8CFD8', opacity: .6 }, svg);
  h('rect', { x: -20, y: 1350, width: 1120, height: 600, fill: '#EEF5F7', ...OL, 'stroke-width': 5 }, svg);
  h('path', { d: 'M-20,1440 C200,1410 400,1470 620,1440 C800,1415 950,1450 1100,1430', fill: 'none', stroke: '#C9DCE3', 'stroke-width': 8 }, svg);
  // cabin
  const cab = h('g', { transform: 'translate(540,1380)' }, svg);
  const glow = h('circle', { cx: 0, cy: -110, r: 240, fill: `url(#glow${tw})` }, cab);
  h('rect', { x: -70, y: -330, width: 40, height: 90, fill: '#7A4A2E', ...OL, 'stroke-width': 5 }, cab);
  h('rect', { x: -200, y: -220, width: 400, height: 220, fill: K.wood, ...OL }, cab);
  for (let i = 1; i < 5; i++) h('line', { x1: -200, y1: -220 + i * 44, x2: 200, y2: -220 + i * 44, stroke: '#7A4A2E', 'stroke-width': 4 }, cab);
  h('path', { d: 'M-240,-210 L0,-360 L240,-210Z', fill: '#7A4A2E', ...OL }, cab);
  h('path', { d: 'M-250,-205 L0,-372 L250,-205 L220,-195 L0,-335 L-220,-195Z', fill: '#fff', ...OL, 'stroke-width': 5 }, cab);
  const win = h('rect', { x: -60, y: -170, width: 120, height: 100, rx: 8, fill: '#FFD36B', ...OL, 'stroke-width': 5 }, cab);
  h('line', { x1: 0, y1: -170, x2: 0, y2: -70, stroke: K.ink, 'stroke-width': 5 }, cab); h('line', { x1: -60, y1: -120, x2: 60, y2: -120, stroke: K.ink, 'stroke-width': 5 }, cab);
  h('rect', { x: 110, y: -150, width: 60, height: 150, fill: '#5E3A24', ...OL, 'stroke-width': 5 }, cab);
  const smoke = [0, 1, 2, 3].map(i => h('circle', { r: 22 + i * 8, fill: '#C9D6DC', opacity: .6 }, cab));
  ticks.push(t => smoke.forEach((s, i) => { const r = ((t * .35 + i / 4) % 1); s.setAttribute('cx', -50 + Math.sin(r * 6 + i) * 30 + r * 60); s.setAttribute('cy', -350 - r * 300); s.setAttribute('opacity', .6 * (1 - r)); }));
  snow(sc, 26);
  return { svg, win, glow, cab };
}
function buildEyak(cfg) {
  const B = VO.beats; DURATION = VO.dur; const w = wfn(B);
  const root = div(document.getElementById('stage'), 'left:0;top:0;width:1080px;height:1920px;overflow:hidden');
  // ---------- S1: Alaska night, light goes out, words fall ----------
  const s1 = div(root, 'left:0;top:0;width:1080px;height:1920px;overflow:hidden;z-index:1');
  const A1 = alaskaNight(s1, 1);
  const tOut = w(0, 4) + .05;
  ticks.push(t => { const off = E.inOut(clamp((t - tOut) / .5)); const fl = t > tOut && t < tOut + .4 ? (Math.sin(t * 80) > 0 ? 1 : .3) : 1; A1.win.setAttribute('fill', mix('#FFD36B', '#2B3A44', off)); A1.glow.setAttribute('opacity', (1 - off) * fl);
    const g = E.inOut(clamp((t - w(1, 3)) / 1.6)); s1.style.filter = `grayscale(${g * .85}) brightness(${1 - g * .25})`; });
  cue(tOut, 'thud');
  const pRed = photo(s1, 'img/msj_red.jpg', 640, 600, '0% 60%');
  T(0, .8, (k, r) => { pRed.el.style.opacity = 1; at(pRed.el, 540, 820 - 900 * (1 - bounceOut(r)), 1, -14 + 10 * E.out(r)); }, 'lin'); cue(.45, 'thud');
  ticks.push(t => { pRed.img.style.transform = `scale(${1 + .12 * clamp(t / 6)})`; const g = E.inOut(clamp((t - tOut) / .8)); pRed.img.style.filter = `grayscale(${g}) contrast(${1 + .1 * g})`;
    s1.style.transform = `scale(${1.12 - .12 * E.out(clamp(t / 4))})`; s1.style.transformOrigin = '50% 60%'; });
  const yr = div(s1, `left:0;top:0;z-index:6;padding:6px 26px 10px;border:8px solid ${K.rust};border-radius:14px;font:900 96px Fraunces;color:${K.rust};background:rgba(251,247,239,.9);opacity:0`, '2008');
  anim(yr, 'stamp', w(0, 1) - .08, .4, { base: 'translate(800px,1080px) translate(-50%,-50%)', rot: 8 }); cue(w(0, 1), 'stamp');
  const syms = ['♪', '♥', '☀', '★', '♫', '☁', '✿'], bc = [K.rust, K.teal, K.mustard, K.plum, K.coral, K.green, K.sky];
  const bubs = syms.map((s, i) => { const b = iconBubble(s1, s, bc[i], 110 + rnd(i, 3) * 40); b.style.zIndex = 4; return b; });
  ticks.push(t => bubs.forEach((b, i) => { const t0 = .1 + i * .18, r = clamp((t - t0) / 3.2); const x0 = 540 + (rnd(i, 1) - .5) * 860, y0 = 1180 - r * 560 - rnd(i, 2) * 120;
    const fall = clamp((t - (w(1, 3) + i * .07)) / 1.4);
    const col = fall > 0 ? mix(bc[i], '#8C979C', clamp(fall * 3)) : bc[i]; b.style.background = col;
    b.style.opacity = t < t0 ? 0 : clamp((t - t0) * 3) * (1 - clamp((fall - .6) / .4));
    at(b, x0 + Math.sin(t * 1.3 + i) * 24, y0 + fall * fall * 900, (.4 + .6 * E.back(clamp((t - t0) / .5))) * (1 - fall * .4), Math.sin(t + i) * 6 + fall * 90 * (i % 2 ? 1 : -1)); }));
  for (let i = 0; i < 4; i++) cue(.2 + i * .36, 'pop');
  // ---------- S2: portrait + map ----------
  const s2 = sceneDiv(root, '#EFE4D3', 2); iris(s2, B[2].t0 - .35, 540, 1250, .6);
  const bg2 = div(s2, 'left:-100px;top:-100px;width:1300px;height:2200px;background-image:radial-gradient(circle at 30px 30px, rgba(200,85,61,.12) 8px, transparent 9px);background-size:120px 120px');
  ticks.push(t => bg2.style.transform = `translateY(${-t * 14 % 120}px)`);
  const pf = div(s2, 'left:0;top:0;width:620px;height:760px;');
  pf.innerHTML = `<svg width="620" height="760" style="overflow:visible"><rect x="10" y="10" width="600" height="740" rx="300" fill="${K.mustard}" stroke="${K.ink}" stroke-width="10"/><rect x="40" y="40" width="540" height="680" rx="270" fill="#A8DADC" stroke="${K.ink}" stroke-width="6"/></svg>`;
  const ovp = div(pf, `left:40px;top:40px;width:540px;height:680px;border-radius:270px;overflow:hidden;border:6px solid ${K.ink};box-sizing:border-box;background:#222 url(img/msj_pink.jpg) no-repeat 78% 50%/auto 114%`);
  ticks.push(t => ovp.style.backgroundSize = `auto ${114 + 10 * clamp((t - B[2].t0) / 5)}%`);
  const plaque = div(s2, `left:0;top:0;padding:16px 40px 22px;background:${K.cream};border:6px solid ${K.ink};border-radius:20px;text-align:center;opacity:0;box-shadow:0 10px 0 rgba(35,31,27,.15)`, `<div style="font:italic 700 66px 'EB Garamond';color:${K.ink}">Marie Smith Jones</div><div style="font:500 40px 'EB Garamond';color:#7A6F64">1918 – 2008</div>`);
  const tMap = B[3].t0 - .1;
  ticks.push(t => { const a = E.back(clamp((t - (B[2].t0 - .2)) / .6)); const m = E.inOut(clamp((t - tMap) / .7)); at(pf, 540 - 300 * m, 1080 - 260 * m + Math.sin(t * 1.4) * 8, (.6 + .4 * a) * (1 - .55 * m)); });
  T(w(2, 3) - .1, .5, (k, r) => { plaque.style.opacity = clamp(r * 3); at(plaque, 540, 1540, Math.max(0, E.back(r))); }, 'lin'); cue(w(2, 3), 'pop');
  T(tMap, .6, (k) => at(plaque, 540 - 300 * k, 1540 - 740 * k, 1 - .45 * k), 'inOut');
  const mapS = svgBox(s2, 140, 980, 880, 700, '0 0 900 720'); mapS.style.opacity = 0;
  h('path', { d: ALASKA, fill: '#CFE3C8', ...OL }, mapS);
  for (let i = 0; i < 8; i++) h('ellipse', { cx: 40 - i * 4 + i * -12 + 30, cy: 690 + i * 6, rx: 14 - i, ry: 7, fill: '#CFE3C8', ...OL, 'stroke-width': 4 }, mapS);
  h('text', { x: 360, y: 300, 'text-anchor': 'middle', 'font-family': 'Fraunces', 'font-weight': 900, 'font-size': 76, fill: K.green, 'letter-spacing': 8 }, mapS, 'ALASKA');
  const pin = h('g', { opacity: 0 }, mapS); h('path', { d: 'M0,0 C-40,-50 -40,-100 0,-100 C40,-100 40,-50 0,0Z', fill: K.rust, ...OL, 'stroke-width': 5 }, pin); h('circle', { cx: 0, cy: -68, r: 14, fill: K.cream }, pin);
  const ring = h('circle', { cx: 600, cy: 455, r: 20, fill: 'none', stroke: K.rust, 'stroke-width': 5, opacity: 0 }, mapS);
  T(tMap + .1, .5, k => mapS.style.opacity = k, 'out');
  T(w(3, 5) - .1, .5, (k, r) => { pin.setAttribute('opacity', 1); pin.setAttribute('transform', `translate(600,${455 - 200 * (1 - bounceOut(r))})`); }, 'lin'); cue(w(3, 5) + .2, 'tick');
  ticks.push(t => { const r = ((t - w(3, 5) - .4) % 1.4) / 1.4; if (t > w(3, 5) + .4) { ring.setAttribute('r', 20 + r * 70); ring.setAttribute('opacity', 1 - r); } });
  const eyLab = div(s2, `left:0;top:0;padding:10px 30px 16px;background:${K.rust};border:5px solid ${K.ink};border-radius:18px;font:italic 700 64px 'EB Garamond';color:${K.cream};opacity:0`, 'Eyak');
  T(w(3, 5) + .1, .45, (k, r) => { eyLab.style.opacity = clamp(r * 3); at(eyLab, 760, 1290, Math.max(0, E.back(r))); }, 'lin');
  const stamp = div(s2, `left:0;top:0;padding:10px 26px;border:7px solid ${K.rust};border-radius:14px;font:700 52px Oswald;letter-spacing:4px;color:${K.rust};opacity:0;background:rgba(247,240,230,.85)`, 'LAST SPEAKER');
  anim(stamp, 'stamp', w(3, 2) - .05, .4, { base: 'translate(560px,620px) translate(-50%,-50%)', rot: -10 }); cue(w(3, 2) + .1, 'stamp');
  // ---------- S3: real photos — alone, then the grave marker, candle goes out ----------
  const s3 = sceneDiv(root, '#2E2433', 3); iris(s3, B[4].t0 - .35, 540, 1200, .6);
  const dust3 = []; for (let i = 0; i < 30; i++) dust3.push(div(s3, `left:0;top:0;width:${4 + rnd(i, 4) * 6}px;height:${4 + rnd(i, 4) * 6}px;border-radius:50%;background:#F6D9A6;opacity:.35`));
  ticks.push(t => dust3.forEach((d, i) => at(d, rnd(i, 5) * 1080 + Math.sin(t * .5 + i) * 40, ((rnd(i, 6) * 1920 - t * (20 + rnd(i, 7) * 30)) % 1920 + 1920) % 1920)));
  const pBW = photo(s3, 'img/msj_bw.jpg', 700, 860, '50% 30%');
  T(B[4].t0 - .3, .7, (k, r) => { pBW.el.style.opacity = clamp(r * 3); at(pBW.el, 540, 1060 + 120 * (1 - E.out(r)), .9 + .1 * E.back(r), -3 + 3 * (1 - r)); }, 'lin');
  ticks.push(t => { pBW.img.style.transform = `scale(${1 + .1 * clamp((t - B[4].t0) / 4)})`; });
  const qb = div(s3, `left:0;top:0;z-index:5;padding:10px 40px 26px;background:#fff;border:6px solid ${K.ink};border-radius:50px;font:700 90px Fredoka;color:${K.plum};opacity:0`, '…' + `<div style="position:absolute;left:30%;bottom:-24px;width:30px;height:30px;background:#fff;border-right:6px solid ${K.ink};border-bottom:6px solid ${K.ink};transform:rotate(45deg)"></div>`);
  T(w(4, 4) - .1, .5, (k, r) => { qb.style.opacity = clamp(r * 3); at(qb, 800, 640 + Math.sin(r * 3) * 6, Math.max(0, E.back(r))); }, 'lin'); cue(w(4, 4), 'pop');
  const nob = div(s3, `left:0;top:0;z-index:5;padding:6px 26px 12px;background:rgba(255,255,255,.18);border:5px dashed rgba(255,255,255,.6);border-radius:40px;font:700 70px Fredoka;color:rgba(255,255,255,.7);opacity:0`, ' ');
  
  const pGr = photo(s3, 'img/msj_grave.jpg', 880, 660, '50% 50%');
  T(B[5].t0 - .25, .7, (k, r) => { pGr.el.style.opacity = clamp(r * 3); at(pGr.el, 540 + 700 * (1 - E.out(r)), 1080, 1, 3 - 8 * (1 - r)); qb.style.opacity = 1 - k; nob.style.opacity = 1 - k; }, 'lin'); cue(B[5].t0, 'click');
  ticks.push(t => { pGr.img.style.transform = `scale(${1.02 + .08 * clamp((t - B[5].t0) / 4)})`; });
  const cnd = svgBox(s3, 0, 0, 1080, 1920); cnd.style.zIndex = 4;
  cnd.innerHTML = `<defs><radialGradient id="cg"><stop offset="0" stop-color="#FFC861" stop-opacity=".7"/><stop offset="1" stop-color="#FFC861" stop-opacity="0"/></radialGradient></defs>`;
  const cglow = h('circle', { cx: 900, cy: 1450, r: 300, fill: 'url(#cg)' }, cnd);
  h('rect', { x: 870, y: 1460, width: 60, height: 170, rx: 8, fill: K.cream, ...OL, 'stroke-width': 5 }, cnd);
  h('ellipse', { cx: 900, cy: 1630, rx: 70, ry: 16, fill: K.mustard, ...OL, 'stroke-width': 5 }, cnd);
  const flame = h('path', { fill: '#FFB33B', stroke: K.ink, 'stroke-width': 4 }, cnd);
  const smk = [0, 1, 2].map(i => h('circle', { r: 12 + i * 6, fill: '#BFC6CC', opacity: 0 }, cnd));
  const tFl = w(5, -1) - .1, FX = 900, FY = 1460;
  ticks.push(t => { const out = clamp((t - tFl) / .35); const fs = (1 - out) * (1 + .08 * Math.sin(t * 17)); flame.setAttribute('d', `M${FX},${FY - 4} C${FX - 26 * fs},${FY - 40 * fs} ${FX - 6},${FY - 92 * fs} ${FX},${FY - 110 * fs} C${FX + 6},${FY - 92 * fs} ${FX + 26 * fs},${FY - 40 * fs} ${FX},${FY - 4}Z`); cglow.setAttribute('opacity', 1 - out);
    smk.forEach((s, i) => { const r = clamp((t - tFl - .1 - i * .25) / 1.6); s.setAttribute('cx', FX + Math.sin(r * 5 + i) * 26); s.setAttribute('cy', FY - 20 - r * 360); s.setAttribute('opacity', r > 0 && r < 1 ? .7 * (1 - r) : 0); });
    const dk = E.inOut(clamp((t - tFl) / 1)); s3.style.filter = `grayscale(${dk * .9}) brightness(${1 - dk * .45})`; });
  cue(tFl, 'squeak');
  // ---------- S4: twist burst + France bedroom ----------
  const s4 = sceneDiv(root, K.coral, 4); iris(s4, B[6].t0 - .2, 540, 1200, .45);
  const rays = div(s4, `left:-460px;top:-40px;width:2000px;height:2000px;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(233,180,76,.55) 0deg 10deg, transparent 10deg 20deg)`);
  ticks.push(t => at(rays, 540, 1120, 1, t * 20));
  const tw = div(s4, `left:0;top:0;font:900 300px/1 Fraunces;color:${K.cream};text-shadow:0 14px 0 ${K.rust};opacity:0`, '?!');
  T(w(6, 3) - .15, .5, (k, r) => { tw.style.opacity = clamp(r * 3); at(tw, 540, 1120, Math.max(0, E.back(r)), Math.sin(r * 20) * 8 * (1 - r)); }, 'lin'); cue(w(6, 3), 'chime');
  confetti(s4, w(6, 3), 540, 1120, 30, 520);
  const s5 = sceneDiv(root, '#F2D184', 5); iris(s5, B[7].t0 - .25, 540, 1120, .55);
  const r5 = svgBox(s5, 0, 0, 1080, 1920);
  r5.innerHTML = `<defs><pattern id="wp" width="90" height="90" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="7" fill="#E9B44C"/><circle cx="65" cy="65" r="6" fill="#F4A261"/></pattern><linearGradient id="eve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6D597A"/><stop offset="1" stop-color="#F4A261"/></linearGradient></defs>
  <rect width="1080" height="1920" fill="#F6DFA4"/><rect width="1080" height="1920" fill="url(#wp)"/>
  <rect x="80" y="500" width="380" height="460" rx="12" fill="url(#eve)" stroke="#231F1B" stroke-width="7"/>
  <path d="M270,560 L250,700 L232,700 L220,780 L205,780 L190,900 L350,900 L335,780 L320,780 L308,700 L290,700Z" fill="#3A2E3F"/><path d="M215,820 Q270,770 325,820" fill="none" stroke="#3A2E3F" stroke-width="10"/>
  <line x1="270" y1="500" x2="270" y2="960" stroke="#231F1B" stroke-width="7"/><line x1="80" y1="730" x2="460" y2="730" stroke="#231F1B" stroke-width="7"/>
  <rect y="1360" width="1080" height="560" fill="#B5835A"/><rect x="0" y="1340" width="1080" height="40" fill="#8E6845" stroke="#231F1B" stroke-width="6"/>`;
  const flag = div(s5, 'left:0;top:0;width:250px;height:170px;opacity:0;transform-origin:0 50%', `<svg width="250" height="170"><line x1="6" y1="0" x2="6" y2="170" stroke="${K.ink}" stroke-width="8"/><path d="M10,10 L240,60 L10,120Z" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M10,10 L87,27 L87,102 L10,120Z" fill="#2E4FA0"/><path d="M163,43 L240,60 L163,85Z" fill="#D7263D"/><path d="M10,10 L240,60 L10,120Z" fill="none" stroke="${K.ink}" stroke-width="5"/></svg>`);
  T(w(7, 5) - .1, .5, (k, r) => { flag.style.opacity = clamp(r * 3); flag.style.transform = `translate(640px,560px) rotate(${(1 - E.elastic(r)) * -40}deg)`; }, 'lin'); cue(w(7, 5), 'pop');
  ticks.push(t => { if (t > w(7, 5) + .4) flag.style.transform = `translate(640px,560px) rotate(${Math.sin(t * 3) * 3}deg)`; });
  const boyS = svgBox(s5, 0, 0, 1080, 1920); const boy = boyHead(boyS, 330, 1080, 1.2);
  ticks.push(t => boy.setAttribute('transform', `translate(330,${1080 + Math.abs(Math.sin(t * 4.2)) * -10}) scale(1.2) rotate(${Math.sin(t * 2.1) * 3})`));
  h('rect', { x: 40, y: 1400, width: 1000, height: 60, rx: 14, fill: K.wood, ...OL }, boyS);
  const age = div(s5, `left:0;top:0;width:180px;height:180px;border-radius:50%;background:${K.teal};border:7px solid ${K.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;color:${K.cream};opacity:0;line-height:.9`, `<div style="font:900 90px Fraunces">12</div><div style="font:600 30px Outfit">years old</div>`);
  T(w(7, 7) - .1, .5, (k, r) => { age.style.opacity = clamp(r * 3); at(age, 560, 870, Math.max(0, E.back(r)), -10); }, 'lin'); cue(w(7, 7), 'pop');
  // cassette player
  const cas = div(s5, `left:0;top:0;width:400px;height:250px;opacity:0`, `<svg width="400" height="250"><rect x="5" y="5" width="390" height="240" rx="24" fill="${K.plum}" stroke="${K.ink}" stroke-width="7"/><rect x="45" y="40" width="310" height="130" rx="14" fill="${K.cream}" stroke="${K.ink}" stroke-width="5"/><rect x="110" y="175" width="180" height="50" rx="8" fill="#4E3F58" stroke="${K.ink}" stroke-width="5"/><rect x="155" y="80" width="90" height="50" fill="#8a7a64" opacity=".5"/></svg>`);
  const reels = [0, 1].map(i => div(cas, `left:${105 + i * 140}px;top:55px;width:52px;height:52px;margin:0;border-radius:50%;border:8px dashed ${K.ink};background:${K.mustard};box-sizing:border-box;transform-origin:50% 50%`));
  T(w(7, -1) - .2, .5, (k, r) => { cas.style.opacity = clamp(r * 3); at(cas, 760, 1250, Math.max(0, E.back(r))); }, 'lin'); cue(w(7, -1), 'click');
  ticks.push(t => reels.forEach(r => r.style.transform = `rotate(${t * 220}deg)`));
  const waves = [0, 1, 2].map(i => div(s5, `left:0;top:0;width:70px;height:120px;border:7px solid ${K.teal};border-left:none;border-top-color:transparent;border-bottom-color:transparent;border-radius:0 60px 60px 0;opacity:0`));
  ticks.push(t => waves.forEach((wv, i) => { if (t < w(7, -1)) return; const r = ((t * 1.2 + i / 3) % 1); wv.style.opacity = (1 - r) * .9; at(wv, 560 - r * 90, 1170, .6 + r * .8, 180); }));
  const nb = div(s5, `left:0;top:0;width:330px;height:230px;opacity:0`, `<svg width="330" height="230"><rect x="5" y="5" width="320" height="220" rx="10" fill="#fff" stroke="${K.ink}" stroke-width="6"/><line x1="165" y1="5" x2="165" y2="225" stroke="${K.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(i => `<line class="nbl" x1="30" y1="${55 + i * 34}" x2="140" y2="${55 + i * 34}" stroke="${K.rust}" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><line class="nbl" x1="190" y1="${55 + i * 34}" x2="300" y2="${55 + i * 34}" stroke="${K.navy}" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}</svg>`);
  T(w(8, 3) - .2, .5, (k, r) => { nb.style.opacity = clamp(r * 3); at(nb, 720, 1520, Math.max(0, E.back(r)), -4); }, 'lin'); cue(w(8, 3), 'pop');
  nb.querySelectorAll('.nbl').forEach((l, i) => T(w(8, 3) + .1 + i * .09, .3, k => l.style.strokeDashoffset = 1 - k, 'out'));
  // thought bubble alaska + ghost bubble caught by notebook
  const th = div(s5, `left:0;top:0;width:300px;height:220px;opacity:0`, `<svg width="300" height="220" style="overflow:visible"><ellipse cx="150" cy="100" rx="145" ry="98" fill="#fff" stroke="${K.ink}" stroke-width="6"/><circle cx="40" cy="210" r="20" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="10" cy="250" r="11" fill="#fff" stroke="${K.ink}" stroke-width="4"/><path d="M60,150 L120,60 L160,110 L190,80 L245,150Z" fill="#DCE9EE" stroke="${K.ink}" stroke-width="5"/><text x="150" y="60" text-anchor="middle" font-family="Fraunces" font-weight="900" font-size="60" fill="${K.rust}">?</text></svg>`);
  T(w(9, 0) - .1, .5, (k, r) => { th.style.opacity = clamp(r * 3); at(th, 600, 700, Math.max(0, E.back(r))); }, 'lin'); cue(w(9, 0), 'pop');
  T(w(9, 6) - .1, .3, k => th.style.opacity = 1 - k, 'out');
  const ghost = iconBubble(s5, '♪', '#9AA4A8', 120);
  const tCatch = w(9, -1);
  ticks.push(t => { if (t < w(9, 5) - .2) { ghost.style.opacity = 0; return; } const a = clamp((t - (w(9, 5) - .2)) / .4), c = E.inOut(clamp((t - tCatch) / .6));
    ghost.style.opacity = (.35 + .4 * Math.abs(Math.sin(t * 6))) * (1 - c) + c * clamp(1 - (t - tCatch - .6) / .3) ; ghost.style.background = mix('#9AA4A8', K.rust, c);
    at(ghost, 900 - 40 * Math.sin(t * 2) * (1 - c) + (720 - 900) * c, 760 + (1460 - 760) * c, (.6 + .4 * a) * (1 - .5 * c), Math.sin(t * 3) * 10); });
  cue(tCatch + .5, 'chime'); sparkleBurst(s5, tCatch + .55, 720, 1500, 10, 220);
  // taught himself: calendar flipping + progress bar
  const cal = div(s5, `left:0;top:0;width:220px;height:240px;opacity:0`);
  const calTop = `<div style="position:absolute;left:0;top:0;width:220px;height:60px;background:${K.rust};border:6px solid ${K.ink};border-radius:20px 20px 0 0;box-sizing:border-box"></div>`;
  const pages = [];
  cal.innerHTML = calTop; for (let i = 0; i < 8; i++) { const pg = div(cal, `left:0;top:54px;width:220px;height:180px;background:#fff;border:6px solid ${K.ink};border-radius:0 0 20px 20px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font:900 90px Fraunces;color:${K.ink};transform-origin:50% 0;z-index:${10 - i}`, String(2002 + i)); pages.push(pg); }
  const tTau = B[10].t0 - .15;
  T(tTau, .4, (k, r) => { cal.style.opacity = clamp(r * 3); at(cal, 830, 860, Math.max(0, E.back(r))); }, 'lin');
  pages.forEach((pg, i) => T(tTau + .3 + i * .17, .2, k => { if (i < 7) { pg.style.transform = `rotateX(${k * 90}deg)`; pg.style.opacity = 1 - k; } }, 'lin'));
  for (let i = 0; i < 4; i++) cue(tTau + .35 + i * .34, 'tick');
  const bar = div(s5, `left:0;top:0;width:560px;height:70px;border:6px solid ${K.ink};border-radius:40px;background:#fff;overflow:hidden;opacity:0`); const fill = div(bar, `left:0;top:0;height:100%;width:0;background:linear-gradient(90deg,${K.teal},${K.green},${K.mustard});`);
  const barL = div(s5, `left:0;top:0;font:italic 700 60px 'EB Garamond';color:${K.ink};opacity:0`, 'Eyak ★★★');
  T(tTau, .4, (k, r) => { bar.style.opacity = k; barL.style.opacity = k; at(bar, 540, 1555, 1); at(barL, 540, 1470, 1); nb.style.opacity = 1 - k; }, 'out');
  T(tTau + .2, B[10].t1 - tTau + .2, k => fill.style.width = k * 100 + '%', 'inOut');
  // ---------- S6: flight France -> Alaska ----------
  const s6 = sceneDiv(root, '#A8DADC', 6); iris(s6, B[11].t0 - .3, 830, 860, .55);
  const r6 = svgBox(s6, 0, 0, 1080, 1920);
  r6.innerHTML = `<defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC8E3"/><stop offset="1" stop-color="#DFF3F4"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#dsky)"/>`;
  const globe = h('g', { transform: 'translate(540,1300)' }, r6);
  h('circle', { r: 560, fill: '#4FA3C7', ...OL }, globe);
  const land = h('g', {}, globe);
  h('path', { d: 'M-430,-180 C-380,-330 -230,-380 -150,-320 C-110,-260 -170,-200 -240,-180 C-300,-120 -380,-90 -430,-180Z', fill: K.green, ...OL, 'stroke-width': 5 }, land);
  h('path', { d: 'M150,-330 C230,-400 380,-360 420,-260 C440,-190 360,-150 300,-180 C240,-140 160,-200 150,-330Z', fill: K.green, ...OL, 'stroke-width': 5 }, land);
  h('path', { d: 'M-120,-60 C-40,-110 80,-90 110,-20 C120,60 40,120 -40,90 C-110,70 -150,10 -120,-60Z', fill: '#8CBF6E', ...OL, 'stroke-width': 5 }, land);
  const pA = [-300, -270], pF = [300, -280];
  const mk = (x, y, txt, col) => { const g = h('g', {}, globe); h('circle', { cx: x, cy: y, r: 18, fill: col, ...OL, 'stroke-width': 5 }, g); return g; };
  mk(...pA, 'Alaska', K.rust); mk(...pF, 'France', K.navy);
  const lab = (txt, x, y, col) => { const el = div(s6, `left:0;top:0;z-index:5;padding:8px 26px 14px;background:${col};border:5px solid ${K.ink};border-radius:16px;font:italic 700 54px 'EB Garamond';color:${K.cream};opacity:0`, txt); at(el, x, y); return el; };
  const lA = lab('Alaska', 240, 900, K.rust), lF = lab('France', 840, 890, K.navy);
  T(B[11].t0, .5, (k, r) => { lA.style.opacity = lF.style.opacity = k; }, 'out');
  const arc = `M${pF[0]},${pF[1]} Q0,-760 ${pA[0]},${pA[1]}`;
  const ap = h('path', { d: arc, fill: 'none', stroke: K.ink, 'stroke-width': 7, 'stroke-dasharray': '18 16', 'stroke-linecap': 'round' }, globe);
  const apm = h('path', { d: arc, fill: 'none', stroke: 'none' }, globe);
  const plane = div(s6, 'left:0;top:0;width:150px;height:150px', `<svg width="150" height="150" viewBox="-75 -75 150 150"><path d="M-60,0 L60,-6 C72,-6 72,6 60,6 L-60,0Z M10,-4 L-20,-48 L-6,-48 L36,-4Z M10,4 L-20,48 L-6,48 L36,4Z M-50,-2 L-62,-24 L-52,-24 L-36,-2Z M-50,2 L-62,24 L-52,24 L-36,2Z" fill="${K.cream}" stroke="${K.ink}" stroke-width="5" stroke-linejoin="round"/></svg>`);
  const tP0 = w(11, 3) - .3, tP1 = w(11, 5) + .4;
  ap.style.clipPath = 'none';
  ticks.push(t => { const r = E.inOut(clamp((t - tP0) / (tP1 - tP0))); const L = apm.getTotalLength(); const p = apm.getPointAtLength(L * r), q = apm.getPointAtLength(Math.min(L, L * r + 2));
    const ang = Math.atan2(q.y - p.y, q.x - p.x) * 57.3; at(plane, 540 + p.x, 1300 + p.y, 1 + .2 * Math.sin(Math.PI * r), ang); ap.style.strokeDashoffset = 0; ap.setAttribute('stroke-dasharray', `${L * r} ${L}`); land.setAttribute('transform', `rotate(${Math.sin(t * .3) * 2})`);
    plane.style.opacity = t > tP0 - .3 ? 1 : 0; });
  const clouds = [0, 1, 2, 3].map(i => div(s6, `left:0;top:0;width:${220 + i * 30}px;height:${80 + i * 10}px;background:#fff;border-radius:60px;opacity:.85;box-shadow:40px -30px 0 -10px #fff, -40px -20px 0 -14px #fff`));
  ticks.push(t => clouds.forEach((c, i) => at(c, ((1300 - (t * (40 + i * 20) + i * 330)) % 1500 + 1500) % 1500 - 200, 560 + i * 120, 1)));
  T(w(11, 7) - .1, .5, (k, r) => { lA.style.transform = `translate(240px,900px) translate(-50%,-50%) scale(${1 + .25 * Math.sin(Math.PI * r)})`; }, 'lin'); cue(w(11, 7), 'pop');
  // ---------- S7: Alaska again, light back on, colour floods, bridge ----------
  const s7 = div(root, 'left:0;top:0;width:1080px;height:1920px;overflow:hidden;z-index:7;clip-path:circle(0px at 240px 900px)');
  iris(s7, B[12].t0 - .3, 240, 900, .6);
  const A7 = alaskaNight(s7, 7);
  const tOn = w(12, 6) - .05;
  ticks.push(t => { const on = E.out(clamp((t - tOn) / .4)); A7.win.setAttribute('fill', mix('#2B3A44', '#FFD36B', on)); A7.glow.setAttribute('opacity', on); const g = 1 - E.inOut(clamp((t - tOn) / 1)); s7.style.filter = `grayscale(${g * .85}) brightness(${1 - g * .25})`; });
  cue(tOn, 'chime');
  const nb2 = syms.map((s, i) => iconBubble(s7, s, bc[i], 110 + rnd(i, 3) * 40));
  ticks.push(t => nb2.forEach((b, i) => { const t0 = tOn + .1 + i * .12, r = clamp((t - t0) / 3); b.style.opacity = t < t0 ? 0 : clamp((t - t0) * 3);
    at(b, 540 + (rnd(i, 11) - .5) * 860 + Math.sin(t * 1.3 + i) * 20, 1150 - E.out(r) * (520 + rnd(i, 12) * 140), .4 + .6 * E.back(clamp((t - t0) / .5)), Math.sin(t + i) * 6); }));
  confetti(s7, tOn + .1, 540, 1230, 26, 500);
  // bridge
  const br = svgBox(s7, 0, 0, 1080, 1920);
  const bcols = [K.rust, K.coral, K.mustard, K.green, K.teal, K.plum];
  const arcs = bcols.map((c, i) => h('path', { d: `M${-60 + i * 0},${1500 + i * 0} Q540,${820 + i * 34} ${1140},${1500}`, fill: 'none', stroke: c, 'stroke-width': 34, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1, opacity: .95 }, br));
  arcs.forEach((a, i) => anim(a, 'draw', w(13, 4) - .2 + i * .06, .8, { ease: 'inOut' }));
  cue(w(13, 4), 'jingle');
  const pEnd = photo(s7, 'img/msj_red.jpg', 300, 280, '0% 60%'); pEnd.el.style.zIndex = 5;
  T(w(13, 1) - .1, .6, (k, r) => { pEnd.el.style.opacity = clamp(r * 3); at(pEnd.el, 200, 1560, .6 + .4 * E.back(r), -6); }, 'lin'); cue(w(13, 1), 'pop');
  const bs = svgBox(s7, 0, 0, 1080, 1920); bs.style.zIndex = 5; const bh = boyHead(bs, 880, 1560, .62); bh.setAttribute('opacity', 0);
  T(w(13, 2) - .1, .6, (k, r) => { bh.setAttribute('opacity', 1); bh.setAttribute('transform', `translate(880,${1560 + 400 * (1 - E.back(r))}) scale(.62)`); }, 'lin'); cue(w(13, 2), 'pop');
  outro(root, B);
  captions4(root, B, cfg);
}

// ======================= BABIES =======================
function baby(svg, x, y, s, hat) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${s})` }, svg);
  const body = h('g', {}, g);
  h('path', { d: 'M-150,260 C-170,120 -110,70 0,70 C110,70 170,120 150,260Z', fill: '#fff', ...OL }, body);
  h('path', { d: 'M-150,200 C-60,230 60,230 150,200', fill: 'none', stroke: '#E3D7C7', 'stroke-width': 8 }, body);
  const head = h('g', {}, g);
  h('circle', { cx: 0, cy: -40, r: 120, fill: K.skin, ...OL }, head);
  [-122, 122].forEach(dx => h('ellipse', { cx: dx, cy: -30, rx: 18, ry: 26, fill: K.skin, ...OL, 'stroke-width': 5 }, head));
  h('path', { d: 'M-10,-160 q20,-30 30,-6', fill: 'none', ...OL, 'stroke-width': 5 }, head);
  const eyes = [-44, 44].map(dx => h('path', { d: `M${dx - 18},-50 q18,14 36,0`, fill: 'none', ...OL, 'stroke-width': 6 }, head));
  const mouth = h('ellipse', { cx: 0, cy: 20, rx: 26, ry: 30, fill: '#8C2F2F', ...OL, 'stroke-width': 5 }, head);
  [-74, 74].forEach(dx => h('circle', { cx: dx, cy: 4, r: 18, fill: K.coral, opacity: .55 }, head));
  const tears = [-1, 1].map(sd => h('ellipse', { cx: sd * 60, cy: -20, rx: 9, ry: 14, fill: '#7EC8E3', stroke: K.ink, 'stroke-width': 3, opacity: 0 }, head));
  if (hat === 'beret') { h('path', { d: 'M-110,-120 C-110,-190 90,-210 120,-140 C100,-120 -60,-105 -110,-120Z', fill: '#2E4FA0', ...OL, 'stroke-width': 5 }, head); h('line', { x1: 10, y1: -190, x2: 18, y2: -214, stroke: K.ink, 'stroke-width': 7, 'stroke-linecap': 'round' }, head); }
  if (hat === 'beanie') { h('path', { d: 'M-118,-90 C-120,-200 120,-200 118,-90Z', fill: '#D7263D', ...OL, 'stroke-width': 5 }, head); h('rect', { x: -124, y: -110, width: 248, height: 34, rx: 14, fill: '#F2C230', ...OL, 'stroke-width': 5 }, head); h('circle', { cx: 0, cy: -196, r: 24, fill: '#222', ...OL, 'stroke-width': 4 }, head); }
  return { g, head, mouth, eyes, tears };
}
function babySet(svg, b, t, cry, x, y, s) { const m = cry ? .6 + .4 * Math.abs(Math.sin(t * 9)) : .35; b.mouth.setAttribute('ry', 30 * m); b.mouth.setAttribute('rx', 26 * (cry ? 1 : .8));
  b.tears.forEach((tr, i) => { const r = (t * 1.6 + i * .5) % 1; tr.setAttribute('opacity', cry ? 1 - r : 0); tr.setAttribute('cy', -20 + r * 90); });
  b.head.setAttribute('transform', `rotate(${cry ? Math.sin(t * 7) * 4 : Math.sin(t * 2) * 3})`); }
function buildBabies(cfg) {
  const B = VO.beats; DURATION = VO.dur; const w = wfn(B);
  const root = div(document.getElementById('stage'), 'left:0;top:0;width:1080px;height:1920px;overflow:hidden');
  // S1: two crying babies + accent stamp
  const s1 = div(root, `left:0;top:0;width:1080px;height:1920px;overflow:hidden;background:${K.sky};z-index:1`);
  const dots = div(s1, 'left:-100px;top:-100px;width:1300px;height:2200px;background-image:radial-gradient(circle at 30px 30px, rgba(255,255,255,.5) 10px, transparent 11px),radial-gradient(circle at 90px 90px, rgba(244,162,97,.35) 8px, transparent 9px);background-size:120px 120px');
  ticks.push(t => dots.style.transform = `translate(${-t * 10 % 120}px,${-t * 16 % 120}px)`);
  const sv1 = svgBox(s1, 0, 0, 1080, 1920);
  const bA = baby(sv1, 290, 1150, 1.4), bB = baby(sv1, 790, 1150, 1.4);
  const wav = [0, 1].map(i => h('path', { fill: 'none', stroke: i ? K.rust : K.navy, 'stroke-width': 10, 'stroke-linecap': 'round' }, sv1));
  ticks.push(t => { const cry = t < B[1].t0; babySet(sv1, bA, t, cry); babySet(sv1, bB, t + .3, cry);
    [bA, bB].forEach((b, i) => { const yy = 1150 + Math.abs(Math.sin(t * (cry ? 9 : 2) + i)) * (cry ? -14 : -4); b.g.setAttribute('transform', `translate(${i ? 790 : 290},${yy + 60}) scale(1.4)`); });
    if (t > B[1].t0 && t < B[1].t1 + .3) { bB.eyes.forEach((e, j) => e.setAttribute('d', j ? `M26,-50 q18,-14 36,0` : `M-62,-56 l36,0`)); } else bB.eyes.forEach((e, j) => e.setAttribute('d', `M${(j ? 44 : -44) - 18},-50 q18,14 36,0`));
    wav.forEach((p, i) => { let d = ''; const cx = 540, amp = t < B[1].t0 ? 40 : 6; for (let k = 0; k <= 30; k++) { const x = cx - 220 + k * 15, y = 640 + i * 70 + Math.sin(k * .9 - t * 14 + i) * amp * Math.sin(Math.PI * k / 30); d += (d ? ' L' : 'M') + x + ',' + y.toFixed(1); } p.setAttribute('d', d); }); });
  const acc = div(s1, `left:0;top:0;padding:14px 40px 20px;border:9px solid ${K.rust};border-radius:20px;font:700 96px Oswald;letter-spacing:6px;color:${K.rust};background:rgba(247,240,230,.9);opacity:0`, 'ACCENT');
  anim(acc, 'stamp', w(0, 4) - .08, .4, { base: 'translate(540px,1470px) translate(-50%,-50%)', rot: -8 }); cue(w(0, 4), 'stamp');
  for (let i = 0; i < 3; i++) cue(.15 + i * .45, 'squeak');
  const rings1 = []; for (let i = 0; i < 6; i++) rings1.push(div(s1, `left:0;top:0;width:160px;height:160px;border-radius:50%;border:8px solid ${i % 2 ? K.rust : K.navy};opacity:0`));
  ticks.push(t => rings1.forEach((rg, i) => { const r = ((t * .9 + i / 3) % 1), cx = i % 2 ? 790 : 290; rg.style.opacity = t < B[1].t0 ? (1 - r) * .7 : 0; at(rg, cx, 1180, .5 + r * 2.2); }));
  // S2: lab: calendar 2009, hospital bracelet, mic + screen; flags
  const s2 = sceneDiv(root, '#E8F1F2', 2); iris(s2, B[2].t0 - .3, 540, 1150, .55);
  const sv2 = svgBox(s2, 0, 0, 1080, 1920);
  h('rect', { y: 1400, width: 1080, height: 520, fill: '#C9DDE0' }, sv2);
  // crib
  h('rect', { x: 180, y: 1180, width: 720, height: 260, rx: 30, fill: '#fff', ...OL }, sv2);
  for (let i = 0; i < 9; i++) h('line', { x1: 220 + i * 80, y1: 1200, x2: 220 + i * 80, y2: 1420, stroke: '#D6C9B8', 'stroke-width': 10 }, sv2);
  const bc2 = baby(sv2, 540, 1080, .8);
  ticks.push(t => babySet(sv2, bc2, t, t > w(2, 2) && t < B[3].t0));
  // mic
  const mic = h('g', {}, sv2); h('line', { x1: 880, y1: 1160, x2: 880, y2: 700, stroke: K.ink, 'stroke-width': 10 }, mic); h('path', { d: 'M880,700 L720,760', stroke: K.ink, 'stroke-width': 10 }, mic); h('rect', { x: 660, y: 720, width: 90, height: 130, rx: 45, fill: K.plum, ...OL, transform: 'rotate(-20 705 785)' }, mic);
  const rec = div(s2, `left:0;top:0;padding:10px 28px;background:${K.rust};border-radius:40px;font:700 46px Outfit;color:#fff;opacity:0`, '● REC');
  T(w(2, 3) - .1, .4, (k, r) => { rec.style.opacity = clamp(r * 3) * (Math.sin(r * 30) > -.6 ? 1 : .5); at(rec, 780, 640, Math.max(0, E.back(r))); }, 'lin'); cue(w(2, 3), 'click');
  ticks.push(t => { if (t > w(2, 3) + .4) rec.style.opacity = .6 + .4 * Math.sin(t * 6); });
  const cal = div(s2, `left:0;top:0;width:260px;height:270px;opacity:0`, `<div style="position:absolute;left:0;top:0;width:260px;height:70px;background:${K.teal};border:6px solid ${K.ink};border-radius:24px 24px 0 0;box-sizing:border-box"></div><div style="position:absolute;left:0;top:64px;width:260px;height:200px;background:#fff;border:6px solid ${K.ink};border-radius:0 0 24px 24px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font:900 92px Fraunces;color:${K.ink}">2009</div>`);
  T(w(2, 1) - .15, .5, (k, r) => { cal.style.opacity = clamp(r * 3); at(cal, 250, 700, Math.max(0, E.back(r)), -6); }, 'lin'); cue(w(2, 1), 'pop');
  const brc = div(s2, `left:0;top:0;padding:12px 34px;background:#fff;border:6px solid ${K.ink};border-radius:40px;font:700 50px Outfit;color:${K.ink};opacity:0;box-shadow:inset 0 -10px 0 ${K.sky}`, '3 days old');
  T(w(2, 8) - .1, .5, (k, r) => { brc.style.opacity = clamp(r * 3); at(brc, 540, 1560, Math.max(0, E.back(r)), 4); }, 'lin'); cue(w(2, 8), 'pop');
  // S3: two babies with flags
  const s3 = sceneDiv(root, '#FFF1D6', 3); iris(s3, B[3].t0 - .3, 540, 1100, .55);
  const sv3 = svgBox(s3, 0, 0, 1080, 1920);
  const half = (x, cols, horiz) => { const g = h('g', { opacity: .9 }, sv3); cols.forEach((c, i) => h('rect', horiz ? { x, y: 560 + i * 380, width: 540, height: 380, fill: c } : { x: x + i * 180, y: 560, width: 180, height: 1140, fill: c }, g)); return g; };
  const fF = half(0, ['#2E4FA0', '#F7F0E6', '#D7263D'], false), fG = half(540, ['#2B2B2B', '#D7263D', '#F2C230'], true);
  [fF, fG].forEach(g => g.setAttribute('opacity', 0));
  const clip3 = h('rect', { x: 0, y: 560, width: 1080, height: 1140, fill: 'none', ...OL, 'stroke-width': 8 }, sv3);
  
  const bF = baby(sv3, 290, 1240, 1.25, 'beret'), bG = baby(sv3, 790, 1240, 1.25, 'beanie');
  const nm = (txt, x, col) => { const el = div(s3, `left:0;top:0;padding:8px 30px 14px;background:${col};border:5px solid ${K.ink};border-radius:18px;font:italic 700 60px 'EB Garamond';color:#fff;opacity:0`, txt); return el; };
  const nF = nm('French', 290, '#2E4FA0'), nG = nm('German', 790, '#2B2B2B');
  T(w(3, 2) - .15, .5, (k, r) => { fF.setAttribute('opacity', k * .9); nF.style.opacity = clamp(r * 3); at(nF, 290, 1560, Math.max(0, E.back(r))); }, 'lin'); cue(w(3, 2), 'pop');
  T(w(3, 5) - .15, .5, (k, r) => { fG.setAttribute('opacity', k * .9); nG.style.opacity = clamp(r * 3); at(nG, 790, 1560, Math.max(0, E.back(r))); }, 'lin'); cue(w(3, 5), 'pop');
  [bF, bG].forEach(b => { b.g.setAttribute('opacity', 0); });
  T(B[3].t0, .5, (k, r) => [[bF, 290], [bG, 790]].forEach(([b, x], i) => { b.g.setAttribute('opacity', 1); b.g.setAttribute('transform', `translate(${x},${1180 + 600 * (1 - bounceOut(r))}) scale(1.25)`); }), 'lin');
  ticks.push(t => { if (t > B[3].t0 + .5) [[bF, 290], [bG, 790]].forEach(([b, x], i) => { babySet(sv3, b, t + i, false); b.g.setAttribute('transform', `translate(${x},${1180 + Math.sin(t * 2.4 + i * 2) * 10}) scale(1.25)`); }); });
  // S4: melody chart, rising vs falling
  const s4 = sceneDiv(root, K.cream, 4); iris(s4, B[4].t0 - .3, 540, 1240, .55);
  const sv4 = svgBox(s4, 0, 0, 1080, 1920);
  const grid = h('g', {}, sv4); h('rect', { x: 90, y: 560, width: 900, height: 1000, rx: 30, fill: '#fff', ...OL }, grid);
  for (let i = 1; i < 6; i++) h('line', { x1: 90, y1: 560 + i * 166, x2: 990, y2: 560 + i * 166, stroke: '#EADFCF', 'stroke-width': 4 }, grid);
  h('text', { x: 130, y: 640, 'font-family': 'Outfit', 'font-weight': 600, 'font-size': 40, fill: '#9A8E7E' }, grid, 'pitch ↑');
  h('text', { x: 950, y: 1530, 'text-anchor': 'end', 'font-family': 'Outfit', 'font-weight': 600, 'font-size': 40, fill: '#9A8E7E' }, grid, 'time →');
  const cry1 = 'M150,1300 C300,1260 420,1360 560,1250 C700,1140 820,980 930,760', cry2 = 'M150,820 C300,760 420,820 560,900 C700,980 820,1180 930,1380';
  const ghostP = h('path', { d: 'M150,1060 C350,960 560,1160 930,1060', fill: 'none', stroke: '#C9BFB0', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-dasharray': '2 22', opacity: 0 }, sv4);
  T(w(4, 5) - .2, .5, k => ghostP.setAttribute('opacity', k), 'out');
  const peek = svgBox(s4, 0, 0, 1080, 1920); const pk1 = baby(peek, 300, 1700, .42, 'beret'), pk2 = baby(peek, 780, 1700, .42, 'beanie'); [pk1, pk2].forEach((b, i) => T(B[4].t0 + i * .15, .5, (k, r) => b.g.setAttribute('transform', `translate(${i ? 780 : 300},${1700 + 300 * (1 - E.back(r))}) scale(.42)`), 'lin'));
  ticks.push(t => { if (t > B[4].t0 + .6) [pk1, pk2].forEach((b, i) => babySet(peek, b, t + i, t > w(4, 7))); });
  T(B[6].t0 - .3, .3, k => ghostP.setAttribute('opacity', 1 - k), 'out');
  const mkCurve = (d, col) => { const p = h('path', { d, fill: 'none', stroke: col, 'stroke-width': 22, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1, opacity: 0 }, sv4); const pm = h('path', { d, fill: 'none', stroke: 'none' }, sv4); return { p, pm }; };
  const c1 = mkCurve(cry1, '#2E4FA0'), c2 = mkCurve(cry2, '#D7263D');
  const head1 = svgBox(s4, 0, 0, 1080, 1920), hb1 = baby(head1, 0, 0, .32, 'beret'), hb2 = baby(head1, 0, 0, .32, 'beanie');
  [hb1, hb2].forEach(b => b.g.setAttribute('opacity', 0));
  const drawC = (c, hb, t0, t1, hat) => { anim(c.p, 'draw', t0, t1 - t0, { ease: 'inOut' });
    ticks.push(t => { if (t < t0) { hb.g.setAttribute('opacity', 0); return; } const r = E.inOut(clamp((t - t0) / (t1 - t0))); const L = c.pm.getTotalLength(), pt = c.pm.getPointAtLength(L * r); hb.g.setAttribute('opacity', 1); hb.g.setAttribute('transform', `translate(${pt.x},${pt.y - 40}) scale(.32)`); babySet(head1, hb, t, r < 1); }); };
  drawC(c1, hb1, w(6, 0), w(6, 9) + .2); drawC(c2, hb2, w(7, 0), w(7, 7) + .2);
  const arw = (txt, x, y, col) => { const el = div(s4, `left:0;top:0;font:900 120px Fraunces;color:${col};opacity:0`, txt); return el; };
  const up = arw('↗', 900, 680, '#2E4FA0'), dn = arw('↘', 900, 1440, '#D7263D');
  T(w(6, 5) - .1, .5, (k, r) => { up.style.opacity = k; at(up, 880, 690, Math.max(0, E.back(r))); }, 'lin'); cue(w(6, 5), 'chime');
  T(w(7, 5) - .1, .5, (k, r) => { dn.style.opacity = k; at(dn, 880, 1450, Math.max(0, E.back(r))); }, 'lin'); cue(w(7, 5), 'thud');
  const sfx4 = []; [w(4, 5), w(5, 4)].forEach(t => cue(t, 'tick'));
  const dif = div(s4, `left:0;top:0;font:italic 700 100px 'EB Garamond';color:${K.plum};opacity:0`, 'different?');
  T(w(5, 4) - .1, .5, (k, r) => { dif.style.opacity = clamp(r * 3); at(dif, 540, 1060, Math.max(0, E.back(r)), Math.sin(r * 18) * 5 * (1 - r)); }, 'lin');
  T(B[6].t0 - .2, .3, k => dif.style.opacity = 1 - k, 'out');
  // S5: womb with notes flowing in
  const s5 = sceneDiv(root, '#F7D6D0', 5); iris(s5, B[8].t0 - .3, 540, 1100, .6);
  const sv5 = svgBox(s5, 0, 0, 1080, 1920);
  sv5.innerHTML = `<defs><radialGradient id="wombG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FCE3DC"/><stop offset=".8" stop-color="#F3A9A0"/><stop offset="1" stop-color="#E07A6F"/></radialGradient></defs>`;
  const womb = h('circle', { cx: 600, cy: 1180, r: 330, fill: 'url(#wombG)', ...OL }, sv5);
  const fet = h('g', {}, sv5);
  h('path', { d: 'M520,1150 C470,1260 560,1360 680,1330 C760,1300 760,1220 720,1180', fill: K.skin, ...OL }, fet);
  h('circle', { cx: 560, cy: 1110, r: 110, fill: K.skin, ...OL }, fet);
  h('path', { d: 'M520,1110 q16,10 32,0 M592,1110 q16,10 32,0', fill: 'none', ...OL, 'stroke-width': 5 }, fet);
  h('path', { d: 'M555,1150 q14,8 28,0', fill: 'none', ...OL, 'stroke-width': 5 }, fet);
  h('circle', { cx: 520, cy: 1140, r: 14, fill: K.coral, opacity: .5 }, fet);
  // mom profile at left
  const mom = h('g', {}, sv5);
  h('path', { d: 'M-40,760 C60,700 150,720 170,800 C180,840 200,860 215,880 C200,890 190,895 185,905 C200,915 195,930 180,935 C190,960 170,985 140,985 C120,1050 80,1080 -40,1080Z', fill: '#C98A6B', ...OL }, mom);
  h('path', { d: 'M-40,720 C40,640 180,650 190,760 C150,720 100,740 60,780 C30,830 20,900 -40,960Z', fill: '#4B2E22', ...OL }, mom);
  ticks.push(t => fet.setAttribute('transform', `rotate(${Math.sin(t * 1.2) * 5} 600 1180)`));
  const notes = []; const nsym = ['♪', '♫', '♩', '♬'], ncol = [K.rust, K.teal, K.plum, K.navy, K.mustard];
  for (let i = 0; i < 14; i++) notes.push(div(s5, `left:0;top:0;font:700 ${80 + rnd(i, 4) * 40}px 'DejaVu Sans';color:${ncol[i % 5]};opacity:0`, nsym[i % 4]));
  const tN0 = w(8, 11) - .2;
  ticks.push(t => notes.forEach((n, i) => { const st = tN0 + i * .32, r = ((t - st) / 2.2); if (t < st) { n.style.opacity = 0; return; } const rr = r % 1;
    const x = 210 + rr * 360, y = 920 + Math.sin(rr * Math.PI * 2 + i) * 90 + rr * 220; n.style.opacity = Math.sin(Math.PI * rr); at(n, x, y, .6 + .5 * Math.sin(Math.PI * rr), Math.sin(t * 3 + i) * 14); }));
  cue(tN0 + .2, 'chime');
  // words vs music
  const wd = div(s5, `left:0;top:0;padding:10px 36px 18px;background:#fff;border:6px solid ${K.ink};border-radius:40px;font:italic 600 90px 'EB Garamond';color:${K.ink};opacity:0`, 'bonjour · hallo');
  const strike = div(wd, `left:20px;top:50%;height:10px;width:0;background:${K.rust};border-radius:5px`);
  T(B[10].t0 - .15, .45, (k, r) => { wd.style.opacity = clamp(r * 3); at(wd, 540, 650, Math.max(0, E.back(r))); }, 'lin');
  T(w(10, 2), .35, k => strike.style.width = `calc(${k * 100}% - 40px)`, 'out'); cue(w(10, 2), 'scratch');
  const mus = div(s5, `left:0;top:0;font:700 150px 'DejaVu Sans';color:${K.plum};opacity:0`, '♪♫♪');
  T(w(10, 4) - .1, .5, (k, r) => { mus.style.opacity = k; at(mus, 540, 1650, Math.max(0, E.back(r)), Math.sin(r * 12) * 6); }, 'lin'); cue(B[10].t0 + .3, 'chime');
  // S6: both babies "singing" accents, first word
  const s6 = sceneDiv(root, K.mustard, 6); iris(s6, B[11].t0 - .3, 540, 1240, .6);
  const rays = div(s6, `left:-460px;top:-40px;width:2000px;height:2000px;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.28) 0deg 10deg, transparent 10deg 20deg)`);
  ticks.push(t => at(rays, 540, 1150, 1, t * 10));
  const sv6 = svgBox(s6, 0, 0, 1080, 1920);
  const x1 = baby(sv6, 290, 1260, 1.3, 'beret'), x2 = baby(sv6, 790, 1260, 1.3, 'beanie');
  ticks.push(t => [[x1, 290], [x2, 790]].forEach(([b, x], i) => { babySet(sv6, b, t + i, t > w(12, 0) - .2); b.g.setAttribute('transform', `translate(${x},${1250 + Math.abs(Math.sin(t * 3 + i)) * -16}) scale(1.3)`); }));
  const fw = div(s6, `left:0;top:0;padding:12px 40px 20px;background:#fff;border:6px solid ${K.ink};border-radius:46px;font:italic 700 74px 'EB Garamond';color:${K.ink};opacity:0`, 'first word?' + `<div style="position:absolute;left:50%;bottom:-24px;width:30px;height:30px;background:#fff;border-right:6px solid ${K.ink};border-bottom:6px solid ${K.ink};transform:translateX(-50%) rotate(45deg)"></div>`);
  T(w(11, 5) - .1, .45, (k, r) => { fw.style.opacity = clamp(r * 3); at(fw, 540, 880, Math.max(0, E.back(r))); }, 'lin'); cue(w(11, 5), 'pop');
  T(B[12].t0, .3, k => fw.style.opacity = 1 - k, 'out');
  const mini = (d, col, x) => { const s = svgBox(s6, x - 200, 740, 400, 300); const p = h('path', { d, fill: 'none', stroke: col, 'stroke-width': 16, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, s); anim(p, 'draw', w(12, 0), .9, { ease: 'inOut' }); return p; };
  mini('M30,250 C120,240 200,200 370,40', '#2E4FA0', 290); mini('M30,40 C150,60 250,120 370,250', '#D7263D', 790);
  confetti(s6, w(12, 4), 540, 1100, 30, 560); cue(w(12, 4), 'jingle');
  outro(root, B);
  captions4(root, B, cfg);
}

// ======================= HEBREW =======================
function bearded(svg, x, y, s) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${s})` }, svg);
  h('path', { d: 'M-190,330 C-185,170 -120,110 0,105 C120,110 185,170 190,330Z', fill: '#2B2D42', ...OL }, g);
  h('path', { d: 'M-60,112 L0,240 L60,112', fill: '#fff', ...OL, 'stroke-width': 5 }, g);
  h('path', { d: 'M-20,140 L0,170 L20,140 L0,250Z', fill: K.rust, ...OL, 'stroke-width': 4 }, g);
  h('ellipse', { cx: 0, cy: -40, rx: 100, ry: 115, fill: K.skin, ...OL }, g);
  h('path', { d: 'M-100,-20 C-110,90 -60,170 0,175 C60,170 110,90 100,-20 C80,40 40,30 0,32 C-40,30 -80,40 -100,-20Z', fill: '#3D2B1F', ...OL, 'stroke-width': 5 }, g);
  h('path', { d: 'M-104,-50 C-120,-150 -40,-170 0,-166 C50,-170 120,-150 104,-50 C90,-100 60,-110 0,-112 C-50,-110 -90,-100 -104,-50Z', fill: '#3D2B1F', ...OL, 'stroke-width': 5 }, g);
  [-38, 38].forEach(dx => { h('circle', { cx: dx, cy: -44, r: 26, fill: 'rgba(255,255,255,.3)', stroke: K.ink, 'stroke-width': 5 }, g); h('circle', { cx: dx, cy: -42, r: 7, fill: K.ink }, g); });
  h('line', { x1: -12, y1: -46, x2: 12, y2: -46, stroke: K.ink, 'stroke-width': 5 }, g);
  h('path', { d: 'M-24,20 q24,14 48,0', fill: 'none', stroke: K.cream, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  return g;
}
function buildHebrew(cfg) {
  const B = VO.beats; DURATION = VO.dur; const w = wfn(B);
  const root = div(document.getElementById('stage'), 'left:0;top:0;width:1080px;height:1920px;overflow:hidden');
  const HEB = 'Rubik';
  // S1: night, sleeping scroll, counter 1,700 -> 9,000,000
  const s1 = div(root, `left:0;top:0;width:1080px;height:1920px;overflow:hidden;background:#1D2B3A;z-index:1`);
  const st = []; for (let i = 0; i < 50; i++) st.push(div(s1, `left:${rnd(i, 1) * 1080}px;top:${400 + rnd(i, 2) * 1400}px;width:${4 + rnd(i, 3) * 6}px;height:${4 + rnd(i, 3) * 6}px;border-radius:50%;background:#fff`));
  ticks.push(t => st.forEach((s, i) => s.style.opacity = .3 + .7 * Math.abs(Math.sin(t * 1.3 + i))));
  const hg = div(s1, 'left:0;top:0;width:300px;height:440px', `<svg width="300" height="440"><rect x="10" y="0" width="280" height="30" rx="10" fill="${K.wood}" stroke="${K.ink}" stroke-width="6"/><rect x="10" y="410" width="280" height="30" rx="10" fill="${K.wood}" stroke="${K.ink}" stroke-width="6"/><path d="M50,30 C50,150 140,180 140,220 C140,260 50,290 50,410 L250,410 C250,290 160,260 160,220 C160,180 250,150 250,30Z" fill="rgba(168,218,220,.35)" stroke="${K.cream}" stroke-width="6"/><path id="sandT" d="M80,60 L220,60 C210,140 160,170 150,215 C140,170 90,140 80,60Z" fill="${K.mustard}"/><path id="sandB" d="M60,405 L240,405 C230,350 190,330 150,320 C110,330 70,350 60,405Z" fill="${K.mustard}"/></svg>`);
  at(hg, 300, 1150);
  const sandT = hg.querySelector('#sandT'), sandB = hg.querySelector('#sandB');
  ticks.push(t => { const r = clamp(t / (B[0].t1)); sandT.setAttribute('transform', `translate(150,215) scale(${1 - .8 * r}) translate(-150,-215)`); sandB.setAttribute('transform', `translate(150,405) scale(1,${.2 + .8 * r}) translate(-150,-405)`); at(hg, 170, 1150, .8, Math.sin(t * .8) * 3); });
  const cnt = div(s1, `left:0;top:0;font:900 118px/1 Fraunces;color:${K.cream};text-align:center;white-space:nowrap`);
  const cntL = div(s1, `left:0;top:0;font:italic 500 56px 'EB Garamond';color:#A8DADC;white-space:nowrap`);
  const tC = B[1].t0;
  ticks.push(t => { if (t < tC) { const y = Math.round(1700 * E.out(clamp((t - .2) / (w(0, 3) - .1)))); cnt.textContent = y.toLocaleString('en-US'); cntL.textContent = 'years of silence'; cnt.style.color = K.cream; s1.style.background = '#1D2B3A'; }
    else { const r = E.inOut(clamp((t - tC) / (w(1, 3) - tC + .3))); cnt.textContent = Math.round(9e6 * r).toLocaleString('en-US'); cntL.textContent = 'speakers today'; cnt.style.color = K.mustard; s1.style.background = mix('#1D2B3A', '#264653', r); }
    at(cnt, 650, 1050, 1); at(cntL, 650, 1160); });
  cue(.3, 'tick');
  const ppl = []; for (let i = 0; i < 60; i++) ppl.push(div(s1, `left:0;top:0;width:44px;height:64px;opacity:0`, `<svg width="44" height="64"><circle cx="22" cy="14" r="12" fill="${BLK[i % 7]}" stroke="${K.ink}" stroke-width="3"/><path d="M4,62 C4,36 40,36 40,62Z" fill="${BLK[(i + 3) % 7]}" stroke="${K.ink}" stroke-width="3"/></svg>`));
  ppl.forEach((p, i) => { const x = 80 + (i % 10) * 92, y = 1360 + Math.floor(i / 10) * 72; T(tC + i * .025, .35, (k, r) => { p.style.opacity = 1; at(p, x, y - 80 * (1 - bounceOut(r))); }, 'lin'); });
  for (let i = 0; i < 6; i++) cue(tC + i * .25, 'tick');
  // S2: It's Hebrew — big glowing word
  const s2 = sceneDiv(root, K.navy, 2); iris(s2, B[2].t0 - .25, 720, 1050, .5);
  const rays2 = div(s2, `left:-460px;top:-40px;width:2000px;height:2000px;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(233,180,76,.25) 0deg 10deg, transparent 10deg 20deg)`);
  ticks.push(t => at(rays2, 540, 1100, 1, t * 10));
  const ivrit = div(s2, `left:0;top:0;font:700 300px/1 ${HEB};color:${K.mustard};text-shadow:0 0 60px rgba(233,180,76,.7),0 14px 0 rgba(0,0,0,.3);opacity:0;direction:rtl`, 'עברית');
  const ivL = div(s2, `left:0;top:0;font:italic 600 80px 'EB Garamond';color:${K.cream};opacity:0`, 'Hebrew');
  T(w(2, 1) - .15, .6, (k, r) => { ivrit.style.opacity = clamp(r * 3); at(ivrit, 540, 1080, Math.max(0, E.back(r))); ivL.style.opacity = k; at(ivL, 540, 1300); }, 'lin'); cue(w(2, 1), 'chime');
  sparkleBurst(s2, w(2, 1), 540, 1080, 12, 420);
  // S3: library of scrolls and books, then empty crib
  const s3 = sceneDiv(root, '#3A2E3F', 3); iris(s3, B[3].t0 - .3, 540, 1080, .55);
  const sv3 = svgBox(s3, 0, 0, 1080, 1920);
  sv3.innerHTML = `<defs><radialGradient id="lg"><stop offset="0" stop-color="#FFC861" stop-opacity=".55"/><stop offset="1" stop-color="#FFC861" stop-opacity="0"/></radialGradient></defs>`;
  for (let r = 0; r < 3; r++) { h('rect', { x: 60, y: 620 + r * 300, width: 960, height: 24, fill: K.wood, ...OL, 'stroke-width': 5 }, sv3);
    for (let i = 0; i < 9; i++) { const bw = 70 + rnd(i + r * 9, 2) * 30, bh = 180 + rnd(i + r * 9, 3) * 70, x = 90 + i * 104; h('rect', { x, y: 620 + r * 300 - bh, width: bw, height: bh, rx: 6, fill: BLK[(i + r) % 7], ...OL, 'stroke-width': 5 }, sv3); h('line', { x1: x + 12, y1: 620 + r * 300 - bh + 30, x2: x + bw - 12, y2: 620 + r * 300 - bh + 30, stroke: K.cream, 'stroke-width': 5 }, sv3); } }
  const lglow = h('circle', { cx: 540, cy: 1460, r: 420, fill: 'url(#lg)' }, sv3);
  const scr = div(s3, 'left:0;top:0;width:620px;height:300px', `<svg width="620" height="300"><rect x="60" y="30" width="500" height="240" fill="#F3E2BE" stroke="${K.ink}" stroke-width="6"/><rect x="20" y="10" width="60" height="280" rx="30" fill="${K.wood}" stroke="${K.ink}" stroke-width="6"/><rect x="540" y="10" width="60" height="280" rx="30" fill="${K.wood}" stroke="${K.ink}" stroke-width="6"/></svg>`);
  const scrT = div(scr, `left:0;top:0;width:620px;height:300px;display:flex;align-items:center;justify-content:center;font:500 84px ${HEB};color:${K.ink};direction:rtl`, 'שמע ישראל');
  ticks.push(t => { at(scr, 540, 1460 + Math.sin(t * 1.5) * 10, 1); lglow.setAttribute('opacity', .7 + .3 * Math.sin(t * 5)); });
  const prL = div(s3, `left:0;top:0;font:italic 700 66px 'EB Garamond';color:${K.mustard};opacity:0`, 'prayers');
  const bkL = div(s3, `left:0;top:0;font:italic 700 66px 'EB Garamond';color:${K.mustard};opacity:0`, 'books');
  T(w(3, 8) - .1, .4, (k, r) => { prL.style.opacity = k; at(prL, 300, 1680, Math.max(0, E.back(r))); }, 'lin'); cue(w(3, 8), 'pop');
  T(w(3, 10) - .1, .4, (k, r) => { bkL.style.opacity = k; at(bkL, 780, 1680, Math.max(0, E.back(r))); }, 'lin'); cue(w(3, 10), 'pop');
  const s3b = sceneDiv(root, '#EFE4D3', 3); iris(s3b, B[4].t0 - .25, 540, 1460, .5);
  const svb = svgBox(s3b, 0, 0, 1080, 1920);
  h('rect', { y: 1450, width: 1080, height: 470, fill: '#D9C7AE' }, svb);
  h('rect', { x: 240, y: 1100, width: 600, height: 300, rx: 30, fill: '#fff', ...OL }, svb);
  for (let i = 0; i < 8; i++) h('line', { x1: 280 + i * 74, y1: 1120, x2: 280 + i * 74, y2: 1380, stroke: '#D6C9B8', 'stroke-width': 10 }, svb);
  h('rect', { x: 260, y: 1390, width: 30, height: 120, fill: K.wood, ...OL, 'stroke-width': 5 }, svb); h('rect', { x: 790, y: 1390, width: 30, height: 120, fill: K.wood, ...OL, 'stroke-width': 5 }, svb);
  const qm = div(s3b, `left:0;top:0;font:900 260px Fraunces;color:${K.rust};opacity:0`, '?');
  T(w(4, 5) - .1, .5, (k, r) => { qm.style.opacity = k; at(qm, 540, 950 + Math.sin(r * 10) * 8, Math.max(0, E.back(r)), Math.sin(r * 14) * 10 * (1 - r)); }, 'lin'); cue(w(4, 5), 'thud');
  // S4: 1880s Jerusalem, Ben-Yehuda
  const s4 = sceneDiv(root, '#F6BD8A', 4); iris(s4, B[5].t0 - .3, 540, 950, .6);
  const sv4 = svgBox(s4, 0, 0, 1080, 1920);
  sv4.innerHTML = `<defs><linearGradient id="js" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F28F6B"/><stop offset=".6" stop-color="#F9D29D"/><stop offset="1" stop-color="#F3E2BE"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#js)"/>`;
  const sun4 = h('circle', { cx: 780, cy: 760, r: 120, fill: '#FFE3A3' }, sv4);
  const city = h('g', {}, sv4);
  [[0, 980, 200, 260], [180, 940, 170, 300], [330, 1000, 220, 240], [530, 900, 190, 340], [700, 960, 210, 280], [890, 1010, 220, 230]].forEach(([x, y, ww, hh], i) => { h('rect', { x, y, width: ww, height: hh + 200, fill: i % 2 ? '#E8CFA6' : '#DDBF92', ...OL, 'stroke-width': 5 }, city);
    for (let k = 0; k < 2; k++) h('path', { d: `M${x + 30 + k * 70},${y + 120} l0,-30 a22,22 0 0 1 44,0 l0,30Z`, fill: '#8A6448', ...OL, 'stroke-width': 4 }, city); });
  h('path', { d: 'M540,900 a95,95 0 0 1 190,0Z', fill: K.mustard, ...OL, 'stroke-width': 5 }, city);
  h('rect', { y: 1400, width: 1080, height: 520, fill: '#CDA977' }, sv4);
  const yr = div(s4, `left:0;top:0;padding:10px 34px;background:${K.navy};border:6px solid ${K.ink};border-radius:20px;font:900 76px Fraunces;color:${K.cream};opacity:0`, '1880s');
  T(w(5, 3) - .15, .5, (k, r) => { yr.style.opacity = clamp(r * 3); at(yr, 230, 640, Math.max(0, E.back(r)), -6); }, 'lin'); cue(w(5, 3), 'pop');
  const ben = bearded(sv4, 540, 1300, 1.15); ben.setAttribute('opacity', 0);
  T(w(5, 7) - .3, .6, (k, r) => { ben.setAttribute('opacity', 1); ben.setAttribute('transform', `translate(540,${1300 + 500 * (1 - E.back(r))}) scale(1.15)`); }, 'lin'); cue(w(5, 7), 'pop');
  const nmB = div(s4, `left:0;top:0;padding:12px 36px 18px;background:${K.cream};border:6px solid ${K.ink};border-radius:20px;font:italic 700 62px 'EB Garamond';color:${K.ink};opacity:0`, 'Eliezer Ben-Yehuda');
  T(w(5, 8) - .1, .45, (k, r) => { nmB.style.opacity = clamp(r * 3); at(nmB, 540, 1640, Math.max(0, E.back(r))); }, 'lin');
  ticks.push(t => sun4.setAttribute('cy', 760 - 40 * clamp((t - B[5].t0) / 5)));
  // S5: son hears only Hebrew: baby with letters flowing
  const s5 = sceneDiv(root, '#FFF1D6', 5); iris(s5, B[6].t0 - .3, 540, 1300, .55);
  const sv5 = svgBox(s5, 0, 0, 1080, 1920);
  h('rect', { x: 200, y: 1240, width: 680, height: 280, rx: 30, fill: '#fff', ...OL }, sv5);
  for (let i = 0; i < 8; i++) h('line', { x1: 250 + i * 82, y1: 1260, x2: 250 + i * 82, y2: 1500, stroke: '#D6C9B8', 'stroke-width': 10 }, sv5);
  const bb = baby(sv5, 540, 1150, .85);
  ticks.push(t => babySet(sv5, bb, t, false));
  const lets = 'אבגדהוזחטיכלמנסעפצקרשת'.split('');
  const lel = lets.map((c, i) => div(s5, `left:0;top:0;font:700 ${90 + rnd(i, 2) * 50}px ${HEB};color:${BLK[i % 7]};opacity:0;text-shadow:0 6px 0 rgba(35,31,27,.15)`, c));
  ticks.push(t => lel.forEach((l, i) => { const t0 = B[6].t0 + i * .1, r = clamp((t - t0) / 2.4); if (t < t0 || t > B[7].t0 + .2) { l.style.opacity = 0; return; } const a = (i / lets.length) * Math.PI * 2 + t * .5, R = 520 - 360 * E.inOut(r);
    l.style.opacity = Math.sin(Math.PI * Math.min(1, r * 1.05)); at(l, 540 + Math.cos(a) * R, 1080 + Math.sin(a) * R * .8, .5 + .7 * (1 - r), a * 30); }));
  cue(B[6].t0 + .2, 'chime');
  // S6: modern things with ?, inventing, dictionary fireworks
  const s6 = sceneDiv(root, K.sky, 6); iris(s6, B[7].t0 - .3, 540, 1080, .55);
  const thingsSV = svgBox(s6, 0, 0, 1080, 1920);
  const thing = (x, y, draw) => { const g = h('g', { opacity: 0 }, thingsSV); draw(g); return { g, x, y }; };
  const tNews = thing(260, 900, g => { h('rect', { x: -130, y: -100, width: 260, height: 200, rx: 10, fill: '#fff', ...OL }, g); h('rect', { x: -110, y: -80, width: 220, height: 40, fill: K.ink }, g); for (let i = 0; i < 4; i++) h('line', { x1: -110, y1: -10 + i * 28, x2: i % 2 ? 40 : 110, y2: -10 + i * 28, stroke: '#9A8E7E', 'stroke-width': 8 }, g); });
  const tBike = thing(800, 880, g => { [-90, 90].forEach(dx => h('circle', { cx: dx, cy: 30, r: 70, fill: 'none', ...OL, 'stroke-width': 8 }, g)); h('path', { d: 'M-90,30 L-20,-60 L60,-60 L90,30 M-20,-60 L10,30 L60,-60 M-40,-90 L0,-90', fill: 'none', stroke: K.rust, 'stroke-width': 10, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g); });
  const tBook = thing(540, 1330, g => { h('path', { d: 'M-180,-110 L0,-80 L180,-110 L180,110 L0,140 L-180,110Z', fill: K.plum, ...OL }, g); h('path', { d: 'M-160,-95 L-5,-68 L-5,118 L-160,92Z M160,-95 L5,-68 L5,118 L160,92Z', fill: '#fff', ...OL, 'stroke-width': 4 }, g); });
  const tTrain = thing(270, 1290, g => { h('rect', { x: -150, y: -70, width: 230, height: 120, rx: 14, fill: K.teal, ...OL }, g); h('rect', { x: 60, y: -120, width: 90, height: 170, rx: 12, fill: K.rust, ...OL }, g); h('rect', { x: -120, y: -110, width: 40, height: 50, fill: K.ink }, g); [-110, -20, 90].forEach(x => h('circle', { cx: x, cy: 70, r: 34, fill: K.ink, stroke: K.cream, 'stroke-width': 6 }, g)); h('rect', { x: -110, y: -45, width: 60, height: 40, rx: 6, fill: K.cream, ...OL, 'stroke-width': 4 }, g); h('rect', { x: -20, y: -45, width: 60, height: 40, rx: 6, fill: K.cream, ...OL, 'stroke-width': 4 }, g); });
  const tIce = thing(800, 1290, g => { h('path', { d: 'M-60,-20 L60,-20 L0,160Z', fill: K.wood, ...OL }, g); h('circle', { cx: -30, cy: -50, r: 55, fill: K.coral, ...OL }, g); h('circle', { cx: 35, cy: -50, r: 55, fill: '#F7F0E6', ...OL }, g); h('circle', { cx: 0, cy: -110, r: 55, fill: K.plum, ...OL }, g); });
  const things = [tNews, tBike, tTrain, tIce];
  things.forEach((th, i) => T(B[7].t0 + .1 + i * .45, .5, (k, r) => { th.g.setAttribute('opacity', 1); th.g.setAttribute('transform', `translate(${th.x},${th.y}) scale(${Math.max(0, E.back(r))}) rotate(${Math.sin(r * 9) * 6})`); }, 'lin'));
  [0, 1, 2, 3].forEach(i => cue(B[7].t0 + .2 + i * .45, 'pop'));
  const qs = things.map(th => { const q = div(s6, `left:0;top:0;font:900 120px Fraunces;color:${K.rust};opacity:0`, '?'); return { q, th }; });
  qs.forEach(({ q, th }, i) => T(w(7, 8) + i * .12, .4, (k, r) => { q.style.opacity = k; at(q, th.x + 130, th.y - 140, Math.max(0, E.back(r))); }, 'lin'));
  // invent: lightbulb
  const bulb = div(s6, 'left:0;top:0;width:200px;height:260px;opacity:0', `<svg width="200" height="260"><circle cx="100" cy="95" r="85" fill="#FFE36B" stroke="${K.ink}" stroke-width="7"/><rect x="62" y="175" width="76" height="55" rx="10" fill="#9A8E7E" stroke="${K.ink}" stroke-width="6"/><path d="M75,110 l15,-30 l20,30 l15,-30" fill="none" stroke="${K.ink}" stroke-width="6"/></svg>`);
  T(w(8, 2) - .15, .5, (k, r) => { bulb.style.opacity = clamp(r * 3); at(bulb, 540, 760, Math.max(0, E.back(r))); }, 'lin'); cue(w(8, 2), 'chime');
  sparkleBurst(s6, w(8, 2), 540, 740, 10, 220);
  ticks.push(t => { if (t > w(8, 2) + .4) bulb.style.filter = `drop-shadow(0 0 ${30 + 20 * Math.sin(t * 8)}px rgba(255,227,107,.9))`; });
  tBook.g.setAttribute('opacity', 0);
  T(B[9].t0 - .3, .5, (k, r) => { tBook.g.setAttribute('opacity', 1); tBook.g.setAttribute('transform', `translate(540,1330) scale(${1.5 * Math.max(0, E.back(r))})`); }, 'lin');
  const card = (heb, en, col, x, y, t) => { const c = div(s6, `left:0;top:0;padding:14px 34px 18px;background:#fff;border:6px solid ${K.ink};border-radius:24px;text-align:center;opacity:0;box-shadow:0 10px 0 ${col}`, `<div style="font:700 86px ${HEB};color:${col};direction:rtl;line-height:1.1">${heb}</div><div style="font:italic 600 46px 'EB Garamond';color:${K.ink}">${en}</div>`);
    T(t - .1, .6, (k, r) => { c.style.opacity = clamp(r * 3); at(c, 540 + (x - 540) * E.out(r), 1250 + (y - 1250) * E.out(r), Math.max(0, E.back(r)), (x < 540 ? -6 : 6) * k); }, 'lin'); cue(t, 'pop'); return c; };
  card('עיתון', 'newspaper', K.rust, 300, 900, w(9, 0)); card('מילון', 'dictionary', K.teal, 780, 900, w(9, 1));
  const more = ['אופניים', 'גלידה', 'מגבת', 'בובה', 'רכבת'];
  more.forEach((m, i) => { const a = -Math.PI * (.15 + i * .14), R = 430; const el = div(s6, `left:0;top:0;padding:8px 22px 12px;background:${BLK[i % 7]};border:5px solid ${K.ink};border-radius:18px;font:700 54px ${HEB};color:#fff;direction:rtl;opacity:0`, m);
    T(w(9, 2) + i * .09, .6, (k, r) => { el.style.opacity = clamp(r * 3); at(el, 540 + Math.cos(a) * R * E.out(r) * 1.1, 1500 + Math.sin(a) * R * E.out(r) * 1.3 + 200 * (1 - E.out(r)), .3 + .7 * E.back(r)); }, 'lin'); });
  [0, 1, 2].forEach(i => { confetti(s6, w(9, 2) + i * .25, 300 + i * 240, 1100 - i * 80, 18, 320); cue(w(9, 2) + i * .25, 'pop'); });
  ticks.push(t => things.forEach((th, i) => { if (t > B[9].t0 - .3) th.g.setAttribute('opacity', Math.max(0, 1 - (t - B[9].t0 + .3) / .3)); }));
  qs.forEach(({ q }) => T(B[9].t0 - .3, .3, k => q.style.opacity = 1 - k, 'out'));
  T(B[9].t0 - .3, .3, k => bulb.style.opacity = 1 - k, 'out');
  // S7: son grows, first native speaker — speech bubble
  const s7 = sceneDiv(root, '#F3E9DC', 7); iris(s7, B[10].t0 - .3, 540, 1300, .6);
  const sv7 = svgBox(s7, 0, 0, 1080, 1920);
  const rays7 = div(s7, `left:-460px;top:-40px;width:2000px;height:2000px;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(233,180,76,.3) 0deg 10deg, transparent 10deg 20deg)`); s7.insertBefore(rays7, sv7);
  ticks.push(t => at(rays7, 540, 1250, 1, t * 10));
  const fl7 = 'אבגדהוזחטיכלמנ'.split('').map((c, i) => div(s7, `left:0;top:0;font:700 ${70 + rnd(i, 3) * 40}px ${HEB};color:${BLK[i % 7]};opacity:.85`, c));
  ticks.push(t => fl7.forEach((l, i) => { const a = i / 14 * Math.PI * 2 + t * .4; at(l, 540 + Math.cos(a) * 420, 1200 + Math.sin(a) * 300, 1, Math.sin(t + i) * 15); }));
  const kidG = boyHead(sv7, 540, 1250, 1.2, false);
  const sp = div(s7, `left:0;top:0;padding:14px 44px 26px;background:#fff;border:7px solid ${K.ink};border-radius:56px;font:700 120px ${HEB};color:${K.rust};direction:rtl;opacity:0`, 'עברית!' + `<div style="position:absolute;left:30%;bottom:-28px;width:34px;height:34px;background:#fff;border-right:7px solid ${K.ink};border-bottom:7px solid ${K.ink};transform:rotate(45deg)"></div>`);
  T(B[10].t0 + .2, .5, (k, r) => { sp.style.opacity = clamp(r * 3); at(sp, 600, 880, Math.max(0, E.back(r))); }, 'lin'); cue(B[10].t0 + .3, 'chime');
  const badge = div(s7, `left:0;top:0;width:220px;height:220px;border-radius:50%;background:${K.mustard};border:7px solid ${K.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;line-height:1`, `<div style="font:900 100px Fraunces;color:${K.ink}">#1</div><div style="font:600 30px Outfit;color:${K.ink}">native speaker</div>`);
  T(w(10, 6) - .1, .5, (k, r) => { badge.style.opacity = clamp(r * 3); at(badge, 860, 1480, Math.max(0, E.back(r)), 10); }, 'lin'); cue(w(10, 6), 'stamp');
  ticks.push(t => kidG.setAttribute('transform', `translate(540,${1250 + Math.abs(Math.sin(t * 3)) * -10}) scale(1.2)`));
  // S8: sunrise, city full of bubbles, language wakes up
  const s8 = sceneDiv(root, '#1D2B3A', 8); iris(s8, B[11].t0 - .3, 540, 1250, .6);
  const sv8 = svgBox(s8, 0, 0, 1080, 1920);
  sv8.innerHTML = `<defs><linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#264653"/><stop offset=".55" stop-color="#E76F51"/><stop offset="1" stop-color="#F9D29D"/></linearGradient></defs>`;
  const sky8 = h('rect', { width: 1080, height: 1920, fill: 'url(#dawn)', opacity: 0 }, sv8);
  const sun8 = h('circle', { cx: 540, cy: 1500, r: 200, fill: '#FFE3A3' }, sv8);
  const c8 = h('g', {}, sv8);
  for (let i = 0; i < 9; i++) { const x = i * 122, ww = 110, hh = 250 + rnd(i, 6) * 260; h('rect', { x, y: 1480 - hh, width: ww, height: hh + 500, fill: i % 2 ? '#3A2E3F' : '#4A3B50', ...OL, 'stroke-width': 4 }, c8);
    for (let k = 0; k < 3; k++) { const wn = h('rect', { x: x + 25, y: 1480 - hh + 40 + k * 70, width: 26, height: 36, fill: '#FFD36B', opacity: 0 }, c8); T(B[12].t0 + rnd(i * 3 + k, 9) * 1.2, .2, kk => wn.setAttribute('opacity', kk), 'out'); } }
  h('rect', { y: 1480, width: 1080, height: 440, fill: '#2B2235' }, sv8);
  T(B[11].t0, B[12].t1 - B[11].t0, (k) => { sky8.setAttribute('opacity', k); sun8.setAttribute('cy', 1500 - 520 * k); }, 'inOut');
  const tb = ['שלום', 'בוקר טוב', 'אמא', 'תודה', 'אבא', 'כן', 'לחם', 'חבר', 'שמש', 'מים'];
  tb.forEach((wd, i) => { const x = 110 + (i % 5) * 215, y = 1150 + Math.floor(i / 5) * 190 + rnd(i, 3) * 60, t0 = w(12, 3) - .2 + i * .1;
    const el = div(s8, `left:0;top:0;padding:8px 26px 14px;background:#fff;border:5px solid ${K.ink};border-radius:30px;font:700 56px ${HEB};color:${BLK[i % 7]};direction:rtl;white-space:nowrap;opacity:0`, wd);
    T(t0, .5, (k, r) => { el.style.opacity = clamp(r * 3); at(el, x, y - 60 * E.out(r) + Math.sin(r * 6) * 4, Math.max(0, E.back(r))); }, 'lin'); if (i % 3 === 0) cue(t0, 'pop'); });
  confetti(s8, w(12, 3), 540, 1000, 30, 560); cue(w(12, 3), 'jingle');
  outro(root, B);
  captions4(root, B, cfg);
}
