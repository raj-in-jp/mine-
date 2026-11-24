// Continuous one-shot version: a persistent "&" hero, camera moves, no scene cuts.
function camera(cam, keys) {
  ticks.push(t => {
    let c = { x: keys[0].x, y: keys[0].y, s: keys[0].s };
    for (let i = 1; i < keys.length; i++) {
      const k = keys[i]; if (t <= k.t) break;
      const p = E.inOut(clamp((t - k.t) / k.d));
      c = { x: c.x + (k.x - c.x) * p, y: c.y + (k.y - c.y) * p, s: c.s * Math.pow(k.s / c.s, p) };
    }
    cam.style.transform = `translate(${540 - c.x * c.s}px,${960 - c.y * c.s}px) scale(${c.s})`;
  });
}
function captions(root, B, cfg) {
  B.forEach((b, i) => {
    const box = sentence(root, b, cfg[i].show, false);
    const tOut = i < B.length - 1 ? B[i + 1].t0 - .14 : b.t1 + .5;
    anim(box, 'fn', tOut, .28, { fn: (r, k) => { if (r <= 0) { box.style.opacity = 1; box.style.transform = 'none'; return; } box.style.opacity = 1 - k; box.style.transform = `translateY(${-34 * k}px)`; } });
  });
}
// generic tween on a function of k between t and t+d (eased), with before/after hold
function tw(t, d, fn, ease = 'inOut') { anim(document.body, 'fn', t, d, { ease, fn: (r, k, tt) => { if (tt < t) return; fn(k, r); } }); }
function txt(parent, html, css) { const el = h('div', { class: 'gl', style: css }, parent, html); return el; }
function place(el, x, y, s = 1, extra = '') { el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${s}) ${extra}`; }

function buildAmp2(cfg) {
  const B = VO.beats; DURATION = VO.dur;
  const w = (i, j) => { const ws = B[i].words; return ws[j < 0 ? ws.length + j : Math.min(j, ws.length - 1)]; };
  const root = h('div', { class: 'root' }, document.getElementById('stage'));
  const cam = h('div', { id: 'cam' }, root);
  const scr = h('div', { class: 'layer' }, root);

  // ---------- WORLD: the alphabet line ----------
  const AY = 1150, X0 = 260, DX = 150, L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letters = L.map((c, i) => { const el = txt(cam, c, `font:500 150px "EB Garamond";color:${P.ink};opacity:0`); place(el, X0 + i * DX, AY); return el; });
  const zX = X0 + 25 * DX, ampX = zX + 190;
  const andW = txt(cam, 'and', `font:italic 500 130px "EB Garamond";color:${P.soft};opacity:0`); place(andW, ampX + 30, AY - 8);
  const strike = h('div', { style: `position:absolute;left:${ampX - 90}px;top:${AY - 10}px;width:240px;height:9px;background:${P.rust};transform-origin:left;transform:scaleX(0)` }, cam);
  const ampW = txt(cam, '&', `font:400 170px "Libre Caslon Text";color:${P.rust};opacity:0`); place(ampW, ampX, AY - 10);
  // pan along the alphabet, then hold on X Y Z _, then zoom into &
  const zoomS = 3.0;
  camera(cam, [
    { x: 700, y: AY - 60, s: 1 },
    { t: B[0].t0 + .15, d: Math.max(1.6, w(0, -1) - B[0].t0 + .2), x: zX - 110, y: AY - 60, s: 1 },
    { t: w(3, 0) - .1, d: B[3].t1 - w(3, 0) + .5, x: ampX, y: AY - 10, s: zoomS },
  ]);
  // letters fade in as a quick shimmer while panning
  letters.forEach((el, i) => tw(B[0].t0 + i * .03, .3, k => el.style.opacity = k, 'out'));
  // X Y Z pulse with "X, Y, Z"
  [[23, 10], [24, 11], [25, 12]].forEach(([li, wj]) => { const el = letters[li]; tw(w(1, wj) - .05, .45, (k, r) => { const s = 1 + .28 * Math.sin(Math.PI * r); place(el, X0 + li * DX, AY, s); el.style.color = mix(P.ink, P.rust, Math.sin(Math.PI * r)); }, 'lin'); });
  tw(w(1, 13) - .05, .45, k => { andW.style.opacity = k; place(andW, ampX + 30, AY - 8 + (1 - k) * 20); }, 'out');
  tw(w(2, 2), .35, k => strike.style.transform = `scaleX(${k})`);
  tw(w(2, 4) - .1, .3, k => { andW.style.opacity = 1 - k; strike.style.opacity = 1 - k; });
  tw(w(2, 5) - .05, .55, (k, r) => { ampW.style.opacity = clamp(r * 3); place(ampW, ampX, AY - 10, Math.max(0, E.back(r))); }, 'lin'); cue(w(2, 5), 'pop');
  tw(w(3, 0), 1.0, k => letters.forEach(el => el.style.opacity = 1 - k));

  // ---------- SCREEN: hero & and friends ----------
  const HY = 1080; // hero screen centre y
  const handoff = B[3].t1 + .45;
  const hero = txt(scr, '&', `font:400 ${170 * zoomS}px "Libre Caslon Text";color:${P.rust};opacity:0`);
  place(hero, 540, 960);
  tw(handoff, .01, k => { hero.style.opacity = k ? 1 : 0; cam.style.visibility = k ? 'hidden' : 'visible'; }, 'lin');
  // beat 4: tablet + et
  const tsvg = svgBox(scr, 170, HY - 300, 740, 560); const tab = waxTablet(tsvg, 30, 40); tab.stylus.style.opacity = 0; tsvg.style.opacity = 0;
  tw(w(4, 0) - .2, .5, k => { hero.style.opacity = 1 - k; place(hero, 540, 960 + 120 * k, 1 - .3 * k); tsvg.style.opacity = k; tsvg.style.transform = `translateY(${(1 - k) * 60}px)`; });
  const et = txt(scr, 'et', `font:italic 400 260px "EB Garamond";color:${P.cream}`); place(et, 540, HY + 10); et.style.opacity = 0;
  tw(w(4, 4) - .15, .7, (k, r) => { et.style.opacity = r > 0 ? 1 : 0; et.style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; }, 'inOut'); cue(w(4, 4) - .1, 'scratch');
  tw(w(4, 4) - .15, .8, (k, r) => { tab.stylus.style.opacity = r > 0 && r < 1 ? 1 : 0; tab.stylus.setAttribute('transform', `translate(${260 + 260 * k},${100 - Math.sin(r * 16) * 16}) rotate(35)`); }, 'lin');
  // "so often": many small ets
  const copies = [];
  for (let i = 0; i < 14; i++) { const c = txt(scr, 'et', `font:italic 400 64px "EB Garamond";color:rgba(247,240,230,.75)`); const cx = 300 + (i % 7) * 80, cy = HY - 165 + Math.floor(i / 7) * 245; place(c, cx, cy); c.style.opacity = 0; copies.push(c);
    tw(w(4, 8) + i * .055, .2, k => c.style.opacity = k, 'out'); }
  cue(w(4, 8), 'scratch');
  // beat 5: tablet away, big Et on paper; letters colour, then melt
  const etB = h('div', { class: 'gl', style: `font:italic 400 420px "EB Garamond";color:${P.ink};white-space:nowrap` }, scr);
  const eE = h('span', { style: 'display:inline-block' }, etB, 'E'), eT = h('span', { style: 'display:inline-block' }, etB, 't');
  place(etB, 540, HY); etB.style.opacity = 0;
  tw(w(5, 0) - .15, .45, k => { tsvg.style.opacity = 1 - k; et.style.opacity = 1 - k; copies.forEach(c => c.style.opacity = Math.min(+c.style.opacity || 0, 1 - k)); etB.style.opacity = k; place(etB, 540, HY, .9 + .1 * k); });
  tw(w(5, 2) - .05, .35, k => eE.style.color = mix(P.ink, P.rust, k));
  tw(w(5, 5) - .05, .35, k => eT.style.color = mix(P.ink, P.rust, k));
  tw(w(5, 6), B[5].t1 - w(5, 6) + .3, k => { eE.style.transform = `translateX(${k * 55}px) skewX(${-k * 6}deg)`; eT.style.transform = `translateX(${-k * 95}px) skewX(${-k * 8}deg)`; etB.style.filter = `blur(${k * 3}px)`; });
  // evolution strip
  const strip = [['Et', 'font:500 92px "EB Garamond"'], ['<span style="letter-spacing:-.18em">Et</span>', 'font:italic 500 92px "EB Garamond"'], ['&', 'font:italic 400 108px "EB Garamond"'], ['&', 'font:400 100px "Libre Caslon Text"']];
  const stripEls = strip.map(([s, f], i) => { const el = txt(scr, s, `${f};color:${P.soft}`); place(el, 210 + i * 220, 1470); el.style.opacity = 0; return el; });
  const arrows = [0, 1, 2].map(i => { const el = txt(scr, '→', `font:400 60px "EB Garamond";color:${P.mapline}`); place(el, 320 + i * 220, 1465); el.style.opacity = 0; return el; });
  [w(5, 6), w(5, 7), w(5, 8), w(6, 2)].forEach((t, i) => { tw(t, .4, k => { stripEls[i].style.opacity = k; if (i) arrows[i - 1].style.opacity = k; }, 'out'); });
  // beat 6: Et becomes &
  const amp = txt(scr, '&', `font:400 470px "Libre Caslon Text";color:${P.rust}`); place(amp, 540, HY); amp.style.opacity = 0;
  tw(w(6, 2) - .1, .7, k => { etB.style.opacity = 1 - k; amp.style.opacity = k; amp.style.filter = `blur(${(1 - k) * 12}px)`; place(amp, 540, HY, .88 + .12 * k); }); cue(w(6, 2) + .2, 'chime');
  tw(w(6, 5) - .05, .5, (k, r) => place(amp, 540, HY, 1 + .12 * Math.sin(Math.PI * r)), 'lin');
  stripEls[3].style.transition = 'none'; tw(w(6, 5), .4, k => stripEls[3].style.color = mix(P.soft, P.rust, k));
  // beat 7: chalkboard, & flies into place after X Y Z
  const bsvg = svgBox(scr, 60, 760, 960, 720); const board = chalkboard(bsvg, 0, 0, 960, 700); bsvg.style.opacity = 0; scr.appendChild(amp);
  tw(w(7, 0) - .15, .5, k => { bsvg.style.opacity = k; bsvg.style.transform = `scale(${.94 + .06 * k})`; stripEls.forEach(e => e.style.opacity = Math.min(+e.style.opacity, 1 - k)); arrows.forEach(e => e.style.opacity = Math.min(+e.style.opacity, 1 - k)); });
  const chalkCss = `font:italic 500 150px "EB Garamond";color:#F1EADF`;
  const cX = ['X', 'Y', 'Z'].map((c, i) => { const el = txt(scr, c, chalkCss); place(el, 250 + i * 170, 950); el.style.opacity = 0; return el; });
  [w(7, 1), w(7, 2), w(7, 3)].forEach((t, i) => tw(t, .3, k => { cX[i].style.opacity = k; cX[i].style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; }, 'out'));
  cue(w(7, 1), 'scratch');
  tw(w(7, 3) + .1, .8, k => { place(amp, 540 + (760 - 540) * k, HY + (945 - HY) * k, 1 - .7 * k); amp.style.color = mix(P.rust, '#F2B49A', k); });
  const chant = ['and', 'per', 'se', 'and'];
  const chEls = chant.map((c, i) => { const el = txt(scr, c, `font:italic 500 110px "EB Garamond";color:#F1EADF`); place(el, 225 + i * 205, 1180); el.style.opacity = 0; return el; });
  [6, 7, 8, 9].forEach((j, i) => tw(w(7, j) - .05, .3, k => { chEls[i].style.opacity = k; chEls[i].style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; }, 'out'));
  // beat 8: glosses
  const gl = [['&', 225], ['by itself', 515], ['is and', 840]].map(([s, x]) => { const el = txt(scr, s, `font:italic 400 64px "EB Garamond";color:#F2B49A`); place(el, x, 1300); el.style.opacity = 0; return el; });
  [w(8, 0), w(8, 1), w(8, 3)].forEach((t, i) => tw(t - .05, .35, k => { gl[i].style.opacity = k; }, 'out'));
  // beat 9-10: say it fast -> squash into ampersand
  tw(w(9, 0), .3, k => gl.forEach(g => g.style.opacity = 1 - k));
  tw(w(9, 2), B[9].t1 - w(9, 2) + .25, k => chEls.forEach((el, i) => place(el, 225 + i * 205 + (540 - (225 + i * 205)) * .35 * k, 1180 + Math.sin(k * 40) * 3 * k)));
  const mline = h('div', { class: 'gl', style: `font:italic 500 130px "EB Garamond";white-space:nowrap;color:#F1EADF` }, scr); place(mline, 540, 1180); mline.style.opacity = 0;
  const parts = [['a', 'k'], ['m', 'i'], ['n', 'd'], ['d', 'd'], [' ', 'd'], ['p', 'k'], ['e', 'k'], ['r', 'k'], [' ', 'd'], ['s', 'k'], ['e', 'd'], [' ', 'd'], ['a', 'k'], ['n', 'k'], ['d', 'k']];
  const ms = parts.map(([c, r]) => { const sp = h('span', { class: 'mch' }, mline, c === ' ' ? '&nbsp;' : c); sp.dataset.role = r; return sp; });
  const tSwap = B[10].t0 - .05, tD = w(10, 3), tI = w(10, 4) - .1;
  tw(tSwap, .25, k => { mline.style.opacity = k; chEls.forEach(e => e.style.opacity = 1 - k); }, 'lin');
  let mw = null;
  ticks.push(t => {
    if (t < tSwap - .1) return; if (!mw) mw = ms.map(sp => sp.getBoundingClientRect().width / (document.getElementById('stage').getBoundingClientRect().width / 1080));
    ms.forEach((sp, i) => { const role = sp.dataset.role; let vis = 1, dy = 0;
      if (role === 'i') { vis = E.out(clamp((t - tI) / .45)); dy = (1 - vis) * -50; sp.style.color = '#F2B49A'; }
      if (role === 'd') { const k = E.inOut(clamp((t - tD - i * .02) / .5)); vis = 1 - k; dy = k * 70; }
      sp.style.maxWidth = (role === 'k' ? mw[i] : mw[i] * vis) + 'px'; sp.style.opacity = vis; sp.style.transform = `translateY(${dy}px)`; });
    const fin = E.out(clamp((t - w(10, 4) - .2) / .5)); mline.style.color = mix('#F1EADF', '#F2B49A', fin); place(mline, 540, 1180, 1 + .15 * fin);
  });
  cue(tD, 'scratch'); cue(w(10, 4) + .1, 'chime');
  // beat 11: underline + chalk stars
  const us = svgBox(scr, 220, 1240, 640, 60); const ul = h('path', { d: 'M10,30 C200,10 440,48 630,22', fill: 'none', stroke: '#F2B49A', 'stroke-width': 8, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, us);
  anim(ul, 'draw', w(11, 5) - .1, .6, { ease: 'inOut' });
  // beat 12: giant & with E and t revealed
  const big = txt(scr, '&', `font:italic 400 700px "EB Garamond";color:${P.ink}`); place(big, 540, HY + 20); big.style.opacity = 0;
  const bigR = txt(scr, '&', `font:400 560px "Libre Caslon Text";color:${P.ink}`); place(bigR, 540, HY + 20); bigR.style.opacity = 0;
  tw(B[12].t0 - .15, .55, k => { bsvg.style.opacity = 1 - k; cX.forEach(e => e.style.opacity = 1 - k); amp.style.opacity = 1 - k; mline.style.opacity = 1 - k; us.style.opacity = 1 - k; bigR.style.opacity = k; place(bigR, 540, HY + 20, .85 + .15 * k); });
  tw(w(12, 1) - .05, .6, k => { bigR.style.opacity = 1 - k; bigR.style.filter = `blur(${k * 10}px)`; big.style.opacity = k; big.style.filter = `blur(${(1 - k) * 10}px)`; }); cue(w(12, 1), 'chime');
  const ov = (clip, col) => { const o = txt(scr, '&', `font:italic 400 700px "EB Garamond";color:${col};padding:220px;clip-path:${clip}`); place(o, 540, HY + 20); o.style.opacity = 0; return o; };
  const oE = ov('inset(0 49% 0 0)', P.rust), oT = ov('inset(0 0 0 51%)', P.navy);
  const lE = txt(scr, 'E', `font:italic 700 96px "EB Garamond";color:${P.rust}`); place(lE, 270, 1500); lE.style.opacity = 0;
  const lT = txt(scr, 't', `font:italic 700 96px "EB Garamond";color:${P.navy}`); place(lT, 800, 1500); lT.style.opacity = 0;
  tw(w(12, 5) - .05, .4, k => { oE.style.opacity = k; lE.style.opacity = k; });
  tw(w(12, 8) - .05, .4, k => { oT.style.opacity = k; lT.style.opacity = k; });
  // beat 13: & shrinks into a keyboard key, pressed on "type", "= et" on "Latin"
  const key = h('div', { class: 'key' }, scr, '<span class="k7">7</span><span class="ka">&</span>'); place(key, 540, HY + 40); key.style.opacity = 0;
  tw(B[13].t0 - .1, .6, k => { [big, oE, oT].forEach(e => { e.style.opacity = 1 - k; place(e, 540, HY + 20 + 20 * k, 1 - .55 * k); }); lE.style.opacity = Math.min(+lE.style.opacity, 1 - k); lT.style.opacity = Math.min(+lT.style.opacity, 1 - k); key.style.opacity = k; place(key, 540, HY + 40, .7 + .3 * k); });
  tw(w(13, 4) - .02, .32, (k, r) => { const p = Math.sin(Math.PI * r); key.style.boxShadow = `0 ${18 - 14 * p}px 0 #B9A88A, 0 ${26 - 18 * p}px 30px rgba(0,0,0,.18)`; place(key, 540, HY + 40 + 14 * p); }, 'lin'); cue(w(13, 4), 'click');
  const eq = txt(scr, '= <i>et</i>', `font:italic 500 110px "EB Garamond";color:${P.rust}`); place(eq, 540, 1430); eq.style.opacity = 0;
  tw(w(13, 9) - .05, .5, k => { eq.style.opacity = k; place(eq, 540, 1430 + (1 - k) * 30); }, 'out');
  // outro: handle
  const tEnd = B[13].t1 + .5;
  const hdl = txt(scr, '@wordology.lab', `font:italic 600 92px "EB Garamond";color:${P.rust}`); place(hdl, 540, 560); hdl.style.opacity = 0;
  const sub = txt(scr, 'a new word, every day · follow for more', `font:400 46px "EB Garamond";color:${P.soft}`); place(sub, 540, 660); sub.style.opacity = 0;
  tw(tEnd, .6, k => { hdl.style.opacity = k; sub.style.opacity = k; place(hdl, 540, 560 + (1 - k) * 30); place(sub, 540, 660 + (1 - k) * 30); document.getElementById('foot').style.opacity = 1 - k; }, 'out');

  captions(root, B, cfg);
}
