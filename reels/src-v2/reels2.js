function shake(el, t, base = 'translate(-50%,-50%)') {
  anim(el, 'fn', t, .6, { ease: 'lin', cue: 'thud', fn: (r) => { const a = Math.sin(r * 40) * (1 - r) * 14; el.style.transform = `${base} translateX(${a}px) rotate(${a * .15}deg)`; } });
}
function haloOver(svg, cx, cy, rx, ry, t) {
  const e = h('ellipse', { cx, cy, rx, ry, fill: 'none', stroke: P.gold, 'stroke-width': 12, pathLength: 1, 'stroke-dasharray': 1 }, svg);
  anim(e, 'draw', t, .7, { ease: 'inOut', cue: 'chime' });
  ticks.push(tt => { if (tt > t + .7) e.setAttribute('transform', `translate(0,${Math.sin(tt * 3) * 6})`); });
  return e;
}
function sparkles(svg, pts, t) {
  pts.forEach(([x, y, r = 1], i) => {
    const sp = h('path', { d: 'M0,-26 L6,-6 L26,0 L6,6 L0,26 L-6,6 L-26,0 L-6,-6Z', fill: P.gold }, svg);
    anim(sp, 'fn', t + i * .12, .6, { fn: (q) => { const k = E.back(q); sp.setAttribute('transform', `translate(${x},${y}) scale(${Math.max(0, k) * r}) rotate(${q * 90})`); sp.style.opacity = q > 0 ? 1 : 0; } });
  });
}
function splitWord(s, y, size, a, b, tShow, tSplit, la, lb, tla, tlb, redA = true) {
  const box = h('div', { class: 'big split', style: `top:${y}px;font-size:${size}px` }, s);
  const A = h('span', { class: 'part' }, box, a), Bp = h('span', { class: 'part' }, box, b);
  const LA = h('span', { class: 'sub' }, A, la), LB = h('span', { class: 'sub' }, Bp, lb);
  anim(box, 'fn', tShow, .5, { fn: (r, k) => { box.style.opacity = k; box.style.transform = `translate(-50%,-50%) translateY(${(1 - k) * 30}px)`; } });
  anim(A, 'fn', tSplit, .5, { cue: 'tick', fn: (r, k) => { A.style.marginRight = (k * 90) + 'px'; A.style.color = mix(P.ink, redA ? P.rust : P.ink, k); Bp.style.color = mix(P.ink, redA ? P.ink : P.rust, k); } });
  [[LA, tla], [LB, tlb]].forEach(([L, tt]) => anim(L, 'fn', tt, .45, { fn: (r, k) => { L.style.opacity = k; L.style.transform = `translate(-50%, ${(1 - k) * 16}px)`; } }));
}
function letterMorph(s, y, size, parts, ev) {
  // parts: [char, role]; roles k keep, d drop@ev.d, w drop@ev.w, i insert@ev.i ; ev.show
  const line = h('div', { class: 'big', style: `top:${y}px;font-size:${size}px;white-space:nowrap` }, s);
  const spans = parts.map(([c, r]) => { const sp = h('span', { class: 'mch' }, line, c === ' ' ? '&nbsp;' : c); sp.dataset.role = r; return sp; });
  let widths = null;
  ticks.push(t => {
    if (!s.style.display || s.style.display === 'none') return;
    if (!widths) { const z = s.getBoundingClientRect().width / 1080; widths = spans.map(sp => sp.getBoundingClientRect().width / z); }
    const a0 = E.out(clamp((t - ev.show) / .5));
    line.style.opacity = a0; line.style.transform = `translate(-50%,-50%) translateY(${(1 - a0) * 30}px)`;
    spans.forEach((sp, i) => {
      const role = sp.dataset.role, w = widths[i]; let vis = 1, dy = 0, col = P.ink;
      if (role === 'i') { const k = ev.i == null ? 0 : E.out(clamp((t - ev.i) / .5)); vis = k; col = P.rust; dy = (1 - k) * -60; }
      else if (role === 'd' || role === 'w') { const T = role === 'd' ? ev.d : ev.w; const k = T == null ? 0 : E.inOut(clamp((t - T - i * .025) / .6)); vis = 1 - k; dy = k * 90; col = mix(P.ink, P.rust, clamp(k * 3)); }
      sp.style.maxWidth = (role === 'k' ? w : w * vis) + 'px'; sp.style.opacity = vis; sp.style.color = col; sp.style.transform = `translateY(${dy}px)`;
    });
  });
  return line;
}

const VIS = {
  nice: [
    (s, b) => { const el = bigWord(s, 'nice', b, { y: 1080, size: 440 }); anim(el, 'fn', W(b, 5), .4, { fn: (r, k) => el.style.color = mix(P.ink, P.rust, k) }); shake(el, W(b, 5) + .1); },
    (s, b) => { const svg = art(s, 140, 800, 800, 760); const j = jester(svg, 400, 400, 1.2); popSvg(j.g, W(b, 4), { cx: 400, cy: 400 });
      anim(j.inner, 'fn', W(b, 12), 1.2, { ease: 'lin', cue: 'jingle', fn: (r) => { const a = Math.sin(r * 30) * (1 - r) * 8; j.inner.setAttribute('transform', `rotate(${a})`); } }); },
    (s, b) => splitWord(s, 1120, 230, 'ne', 'scius', W(b, 5), W(b, 6), '"not"', '"knowing"', W(b, 6) + .2, W(b, 6) + .45),
    (s, b) => softMap(s, 60, 720, 1, W(b, 0), {
      roads: [{ via: ['Rome', 'Paris', 'London'], t: W(b, 1), dur: W(b, 7) - W(b, 1) }],
      places: [{ city: 'Rome', text: 'Rome', sub: 'nescius', t: W(b, 0) + .2 }, { city: 'Paris', text: 'Paris', sub: 'nice: "silly"', t: W(b, 3) }, { city: 'London', text: 'London', sub: 'nice: "foolish"', t: W(b, 6), hot: true, dx: -24, anchor: 'end' }] }),
    (s, b) => { bigWord(s, 'nice', b, { y: 930, size: 230, zoomFrom: 1.15 });
      const st = [[W(b, 3), 'fussy'], [W(b, 5), 'shy'], [W(b, 7), 'precise']].map(([t, w]) => ({ t, word: w, red: [...w].map((_, i) => i) }));
      morphWord(s, 1190, 150, st); },
    (s, b) => { const svg = art(s, 0, 1000, 1080, 400); sparkles(svg, [[300, 120], [780, 90, .8], [540, 260, 1.2], [200, 300, .7], [880, 280]], W(b, 7)); },
    (s, b) => { const el = bigWord(s, 'nice', b, { y: 1160, size: 340, zoomFrom: 1.2, t: W(b, 5) }); const svg = art(s, 240, 830, 600, 200); haloOver(svg, 300, 100, 210, 40, W(b, 13)); sparkles(svg, [[60, 60], [560, 40, .8], [520, 170, .6]], W(b, 13) + .3); },
  ],
  silly: [
    (s, b) => { bigWord(s, 'silly', b, { y: 1100, size: 420 }); const svg = art(s, 190, 760, 700, 220); haloOver(svg, 350, 110, 260, 48, W(b, 5)); sparkles(svg, [[70, 60], [640, 40, .8], [600, 180, .6]], W(b, 5) + .3); },
    (s, b) => { const svg = art(s, 190, 820, 700, 760); const m = monk(svg, 350, 380, 1.15); popSvg(m.g, W(b, 3), { cx: 350, cy: 450 }); m.halo.style.opacity = 0;
      anim(m.halo, 'fn', W(b, 5), .8, { cue: 'chime', fn: (r, k) => { m.halo.style.opacity = k; m.halo.setAttribute('stroke-width', 8 + 10 * k); } }); },
    (s, b) => softMap(s, 60, 720, 1, W(b, 0), {
      roads: [{ via: ['London', 'Berlin'], t: W(b, 2), dur: W(b, 6) - W(b, 2) + .2, bend: -.3, dashed: true }],
      places: [{ city: 'London', text: 'sælig', sub: 'Old English', t: W(b, 1), dx: -24, anchor: 'end' }, { city: 'Berlin', text: 'selig', sub: '"blessed"', t: W(b, 7), hot: true, dx: -10, dy: -60, anchor: 'middle' }] }),
    (s, b) => morphWord(s, 1120, 260, [{ t: W(b, 5), word: 'sælig', red: [1] }, { t: W(b, 6), word: 'sely', red: [1, 3] }, { t: W(b, 7), word: 'silly', red: [1, 2, 3, 4] }]),
    (s, b) => { const svg = art(s, 0, 760, 1080, 800); const x0 = 140, y0 = 120, x1 = 940, y1 = 640;
      const ln = h('path', { d: `M${x0},${y0} L${x1},${y1}`, stroke: P.ink, 'stroke-width': 8, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
      anim(ln, 'draw', W(b, 2), .8, { ease: 'inOut' });
      const ball = h('g', {}, svg); h('circle', { r: 34, fill: P.rust, ...OL }, ball);
      const stops = [[W(b, 2) + .4, 0], [W(b, 4), .25], [W(b, 6), .6], [W(b, 8), 1]];
      ticks.push(t => { let f = 0; for (let i = 0; i < stops.length; i++) if (t >= stops[i][0]) { const n = stops[i + 1]; f = n ? stops[i][1] + (n[1] - stops[i][1]) * E.inOut(clamp((t - stops[i][0]) / .5)) * (t >= n[0] ? 1 : 0) : stops[i][1]; if (n && t >= n[0]) continue; }
        // simpler: piecewise ease toward last reached stop
        let cur = 0, prev = 0, ts = stops[0][0]; for (const [tt, v] of stops) if (t >= tt) { prev = cur; cur = v; ts = tt; } const k = E.inOut(clamp((t - ts) / .55)); f = prev + (cur - prev) * k;
        const x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f - 40; ball.setAttribute('transform', `translate(${x},${y}) rotate(${f * 720})`); ball.style.opacity = t > stops[0][0] ? 1 : 0; });
      [[.25, 'innocent', 4], [.6, 'pitiable', 6], [1, 'foolish', 8]].forEach(([f, w, wi]) => { const x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
        const tx = h('text', { x: f === 1 ? x - 10 : x + 40, y: y + 80, class: 'mapt' + (f === 1 ? ' hot' : ''), 'font-size': 60, 'text-anchor': f === 1 ? 'end' : 'start' }, svg, w);
        anim(tx, 'fn', W(b, wi), .45, { cue: 'tick', fn: (r, k) => { tx.style.opacity = k; } }); }); },
    null,
  ],
  muscle: [
    (s, b) => { bigWord(s, 'muscle', b, { y: 1090, size: 330 }); const svg = art(s, 0, 1330, 1080, 140); const m = mouseFlat(svg);
      anim(m, 'fn', W(b, 9) - .2, 1.8, { ease: 'inOut', cue: 'squeak', fn: (r, k, t) => { m.setAttribute('transform', `translate(${-150 + k * 1400},70) translate(0,${-Math.abs(Math.sin(t * 22)) * 10})`); m.style.opacity = r > 0 && r < 1 ? 1 : 0; } }); },
    (s, b) => splitWord(s, 1120, 210, 'mus', 'culus', W(b, 4), W(b, 5), '"mouse"', '"little"', W(b, 7), W(b, 6)),
    (s, b) => { const svg = art(s, 140, 820, 800, 700);
      const sleeve = h('path', { d: 'M40,345 L130,345 L130,600 L40,600Z', fill: P.rust, ...OL }, svg);
      const arm = h('path', { fill: P.skin, ...OL }, svg);
      const fist = h('path', { d: 'M478,172 C490,147 520,150 528,170 M528,170 C540,142 575,145 582,172', fill: 'none', ...OL, 'stroke-width': 5 }, svg);
      const mg = h('g', {}, svg); const mm = mouseFlat(mg); mg.style.opacity = 0;
      const shape = B => `M130,370 C190,370 220,${370 - B} 310,${370 - B} C390,${370 - B} 430,${380 - B * .3} 470,330 C480,300 470,240 460,200 C450,130 520,95 575,120 C625,140 630,190 610,230 C600,300 640,420 630,480 C620,545 580,575 520,575 L130,575`;
      const grp = [sleeve, arm, fist]; arm.setAttribute('d', shape(25));
      const tIn = W(b, 1), tFlex = W(b, 4), tMouse = W(b, 9);
      grp.forEach(e => anim(e, 'fn', tIn, .6, { fn: (r, k) => { e.style.opacity = k; } }));
      ticks.push(t => { if (t < tIn - .5 || t > b.t1 + 1) return; const B2 = t < tFlex ? 25 : 25 + 95 * (.5 - .5 * Math.cos((t - tFlex) * 3.4)); arm.setAttribute('d', shape(B2));
        mg.style.opacity = clamp((t - tMouse) / .3); mg.setAttribute('transform', `translate(${310 + Math.sin(t * 2.6) * 22},${445 - B2 * .55}) scale(.9)`); });
      cue(tMouse, 'squeak'); },
    (s, b) => { const w1 = h('div', { class: 'big', style: `top:880px;font:italic 600 120px "EB Garamond";color:${P.ink}` }, s, 'musculus'); anim(w1, 'fn', W(b, 3), .5, { fn: (r, k) => { w1.style.opacity = k; w1.style.transform = `translate(-50%,-50%) translateY(${(1 - k) * 30}px)`; } });
      const svg = art(s, 140, 950, 800, 640); const ar = h('path', { d: 'M400,20 L400,110 M375,85 L400,115 L425,85', fill: 'none', ...OL, pathLength: 1, 'stroke-dasharray': 1 }, svg); anim(ar, 'draw', W(b, 6), .5);
      const ms = mussel(svg, 400, 360, .95); popSvg(ms, W(b, 9) - .1, { cx: 400, cy: 360 }); },
    (s, b) => { const svg = art(s, 0, 1250, 1080, 160); const m = mouseFlat(svg, '#B5A99C');
      anim(m, 'fn', W(b, 5) - .1, 1.8, { ease: 'inOut', cue: 'squeak', fn: (r, k, t) => { m.setAttribute('transform', `translate(${-150 + k * 1400},80) translate(0,${-Math.abs(Math.sin(t * 22)) * 10})`); m.style.opacity = r > 0 && r < 1 ? 1 : 0; } }); },
  ],
  goodbye: [
    (s, b) => { bigWord(s, 'goodbye', b, { y: 1100, size: 270 }); const svg = art(s, 190, 800, 700, 220); haloOver(svg, 350, 110, 250, 46, W(b, 3)); },
    (s, b) => { const svg = art(s, 140, 840, 800, 420); const sc = scroll(svg, 0, 0, 800, 400); popSvg(sc, W(b, 3), { cx: 400, cy: 200 });
      const tx = h('div', { class: 'big', style: `top:1050px;font:italic 500 104px "EB Garamond";color:${P.rust}` }, s, 'God be with ye'); tx.style.transform = 'translate(-50%,-50%)';
      anim(tx, 'wipe', W(b, 5), W(b, 8) - W(b, 5) + .3, { ease: 'lin', cue: 'scratch' }); },
    (s, b) => letterMorph(s, 1120, 150, [['G', 'k'], ['o', 'k'], ['d', 'k'], [' ', 'd'], ['b', 'k'], ['e', 'd'], [' ', 'd'], ['w', 'k'], ['i', 'd'], ['t', 'd'], ['h', 'd'], [' ', 'd'], ['y', 'k'], ['e', 'k']], { show: b.t0, d: W(b, 6) }),
    (s, b) => { letterMorph(s, 1150, 190, [['G', 'k'], ['o', 'k'], ['o', 'i'], ['d', 'k'], ['b', 'k'], ['w', 'w'], ['y', 'k'], ['e', 'k']], { show: b.t0, i: W(b, 13), w: W(b, 12) });
      label(s, 'good day', 170, 900, W(b, 2), 'font-size:60px'); label(s, 'good night', 620, 1330, W(b, 5), 'font-size:60px'); },
    (s, b) => softMap(s, 60, 720, 1, W(b, 0), { highlight: [],
      places: [{ city: 'London', text: 'goodbye', sub: 'God be with ye', t: W(b, 1), dx: -24, anchor: 'end' }, { city: 'Paris', text: 'adieu', sub: 'à Dieu, "to God"', t: W(b, 5), hot: true }, { city: 'Madrid', text: 'adiós', sub: 'a Dios, "to God"', t: W(b, 7), hot: true }] }),
    (s, b) => { const svg = art(s, 0, 1050, 1080, 400); sparkles(svg, [[300, 120], [780, 90, .8], [540, 260, 1.2], [200, 300, .7], [880, 280]], W(b, 6)); },
  ],
};

// ---------------- AMPERSAND ----------------
function alphaGrid(s, tStart, tEnd, opts = {}) {
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const cols = 7, cell = 118, gap = 14, x0 = (1080 - (cols * cell + (cols - 1) * gap)) / 2, y0 = opts.y || 800;
  const cells = [];
  for (let i = 0; i < 27; i++) {
    const cx = x0 + (i % cols) * (cell + gap), cy = y0 + Math.floor(i / cols) * (cell + gap);
    const c = h('div', { class: 'cell' + (i === 26 ? ' slot' : ''), style: `left:${cx}px;top:${cy}px;width:${cell}px;height:${cell}px` }, s, i < 26 ? L[i] : '');
    cells.push(c);
    if (opts.static) continue;
    const t = i < 26 ? tStart + (tEnd - tStart) * i / 25 : (opts.tSlot ?? tEnd + .3);
    anim(c, 'fn', t, .35, { fn: (r) => { const k = E.back(r); c.style.opacity = clamp(r * 3); c.style.transform = `scale(${Math.max(0, k)})`; } });
  }
  return cells;
}
function waxTablet(svg, x, y) {
  const g = h('g', { transform: `translate(${x},${y})` }, svg);
  h('rect', { x: 0, y: 0, width: 620, height: 420, rx: 18, fill: '#A0643A', ...OL }, g);
  h('rect', { x: 40, y: 40, width: 540, height: 340, rx: 6, fill: '#3A3631', ...OL, 'stroke-width': 4 }, g);
  [[18, 120], [18, 300]].forEach(([hx, hy]) => h('circle', { cx: hx, cy: hy, r: 8, fill: P.ink }, g));
  const stylus = h('g', { transform: 'translate(560,60) rotate(35)' }, svg);
  h('rect', { x: -9, y: -10, width: 18, height: 300, rx: 9, fill: P.cream, ...OL, 'stroke-width': 5 }, stylus);
  h('path', { d: 'M-9,290 L0,330 L9,290', fill: P.cream, ...OL, 'stroke-width': 5 }, stylus);
  return { g, stylus };
}
function chalkboard(svg, x, y, w, ht) {
  const g = h('g', { transform: `translate(${x},${y})` }, svg);
  h('rect', { x: 0, y: 0, width: w, height: ht, rx: 10, fill: '#A0643A', ...OL }, g);
  h('rect', { x: 30, y: 30, width: w - 60, height: ht - 60, fill: '#2F4A3F', ...OL, 'stroke-width': 4 }, g);
  h('rect', { x: w * .55, y: ht - 22, width: 90, height: 18, rx: 4, fill: P.cream, ...OL, 'stroke-width': 3 }, g);
  return g;
}
VIS.ampersand = [
  (s, b) => { const cells = alphaGrid(s, W(b, 1), W(b, 5) - .15, { tSlot: W(b, 5) });
    const slot = cells[26]; anim(slot, 'fn', W(b, 5) + .3, 1.4, { ease: 'lin', cue: 'tick', fn: (r) => { slot.style.borderColor = mix('#A63D2A', '#E2A08A', (Math.sin(r * 12) + 1) / 2); } }); },
  (s, b) => { const cells = alphaGrid(s, 0, 0, { static: true }); cells.forEach(c => c.style.opacity = 1);
    const slot = cells[26]; const amp = h('span', { class: 'ampc' }, slot, '&');
    anim(amp, 'fn', W(b, 5), .6, { cue: 'chime', fn: (r) => { const k = E.back(r); amp.style.opacity = clamp(r * 3); amp.style.transform = `scale(${Math.max(0, k)})`; } });
    anim(slot, 'fn', W(b, 5), .6, { fn: (r, k) => { slot.style.background = `rgba(166,61,42,${.12 * k})`; slot.style.borderStyle = r > .3 ? 'solid' : 'dashed'; } });
    cells.slice(0, 26).forEach(c => anim(c, 'fn', W(b, 5), .6, { fn: (r, k) => c.style.opacity = 1 - .55 * k })); },
  (s, b) => { const svg = art(s, 230, 840, 680, 520); const tb = waxTablet(svg, 0, 40); popSvg(tb.g, W(b, 4) - .2, { cx: 310, cy: 250 }); tb.stylus.style.opacity = 0;
    const et = h('div', { class: 'big', style: `top:1100px;left:520px;font:italic 400 230px "EB Garamond";color:${P.cream}` }, s, 'et'); et.style.transform = 'translate(-50%,-50%)';
    anim(et, 'wipe', W(b, 6) - .1, .8, { ease: 'inOut', cue: 'scratch' });
    anim(tb.stylus, 'fn', W(b, 6) - .1, .9, { fn: (r, k) => { tb.stylus.style.opacity = r > 0 && r < 1 ? 1 : (r >= 1 ? 1 : 0); tb.stylus.setAttribute('transform', `translate(${180 + 300 * k},${60 - Math.sin(r * 18) * 18}) rotate(35)`); } });
    label(s, 'Latin for "and"', 0, 1440, W(b, 9) - .1, 'left:0;right:0;text-align:center'); },
  (s, b) => { const box = h('div', { class: 'big', style: `top:1130px;font:italic 400 430px "EB Garamond"` }, s); box.style.opacity = 1;
    const E1 = h('span', { style: 'display:inline-block' }, box, 'E'), T1 = h('span', { style: 'display:inline-block' }, box, 't');
    const amp = h('div', { class: 'big', style: `top:1130px;font:italic 400 520px "EB Garamond";color:${P.rust}` }, s, '&');
    anim(box, 'fn', b.t0, .5, { fn: (r, k) => { box.style.opacity = k; } });
    anim(E1, 'fn', W(b, 6) - .05, .4, { fn: (r, k) => E1.style.color = mix(P.ink, P.rust, k) });
    anim(T1, 'fn', W(b, 8) - .05, .4, { fn: (r, k) => T1.style.color = mix(P.ink, P.rust, k) });
    anim(box, 'fn', W(b, 9), 1.0, { ease: 'inOut', fn: (r, k) => { E1.style.transform = `translateX(${k * 60}px)`; T1.style.transform = `translateX(${-k * 90}px)`; box.style.opacity = 1 - clamp((r - .45) / .5); box.style.filter = `blur(${k * 10}px)`; } });
    anim(amp, 'fn', W(b, 9) + .45, .8, { cue: 'chime', fn: (r, k) => { amp.style.opacity = k; amp.style.filter = `blur(${(1 - k) * 12}px)`; amp.style.transform = `translate(-50%,-50%) scale(${.85 + .15 * k})`; } }); },
  (s, b) => { const svg = art(s, 90, 820, 900, 560); const cb = chalkboard(svg, 0, 0, 900, 520); popSvg(cb, W(b, 3) - .2, { cx: 450, cy: 260 });
    ['X', 'Y', 'Z', '&'].forEach((ch, i) => { const el = h('div', { class: 'chalk', style: `left:${215 + i * 165}px;top:1000px;${ch === '&' ? 'color:#F2B49A' : ''}` }, s, ch);
      const t = i < 3 ? W(b, 6) + i * .25 : W(b, 10); anim(el, 'wipe', t, .45, { ease: 'out', cue: i === 3 ? 'chime' : 'scratch' }); });
    const circ = svgBox(s, 693, 962, 220, 240); const c = h('ellipse', { cx: 110, cy: 120, rx: 95, ry: 105, fill: 'none', stroke: '#F2B49A', 'stroke-width': 7, pathLength: 1, 'stroke-dasharray': 1 }, circ);
    anim(c, 'draw', W(b, 11), .6, { ease: 'inOut' }); },
  (s, b) => { const ph = h('div', { class: 'big', style: `top:1160px;font:italic 600 128px "EB Garamond";color:${P.rust}` }, s);
    ['and', 'per', 'se', 'and'].forEach((w, i) => { const sp = h('span', { style: 'display:inline-block;margin:0 .14em;opacity:0' }, ph, w);
      anim(sp, 'fn', W(b, 8 + i) - .05, .4, { fn: (r, k) => { sp.style.opacity = k; sp.style.transform = `translateY(${(1 - k) * 30}px)`; } }); });
    ph.style.opacity = 1;
    const gl = h('div', { class: 'big', style: `top:1320px;font:italic 400 64px "EB Garamond";color:${P.soft}` }, s, '<i>per se</i> = "by itself"');
    anim(gl, 'fn', W(b, 13), .5, { fn: (r, k) => { gl.style.opacity = k; } }); },
  (s, b) => { letterMorph(s, 1160, 170, [['a', 'k'], ['m', 'i'], ['n', 'd'], ['d', 'd'], [' ', 'd'], ['p', 'k'], ['e', 'k'], ['r', 'k'], [' ', 'd'], ['s', 'k'], ['e', 'd'], [' ', 'd'], ['a', 'k'], ['n', 'k'], ['d', 'k']], { show: b.t0, d: W(b, 3), i: W(b, 5) }); },
  (s, b) => { const a = h('div', { class: 'big', style: `top:1180px;font:italic 400 560px "EB Garamond";color:#E9A47F` }, s, '&');
    anim(a, 'fn', W(b, 0) + .1, .7, { cue: 'thud', fn: (r) => { const k = E.back(r); a.style.opacity = clamp(r * 3); a.style.transform = `translate(-50%,-50%) scale(${Math.max(0, k)})`; } }); },
  (s, b) => { const base = h('div', { class: 'big', style: `top:1170px;font:italic 400 680px "EB Garamond";color:${P.ink}` }, s, '&');
    anim(base, 'fn', b.t0, .6, { fn: (r, k) => { base.style.opacity = k; } });
    const mk = (clip, col, t) => { const o = h('div', { class: 'big', style: `top:1170px;font:italic 400 680px "EB Garamond";color:${col};clip-path:${clip}` }, s, '&'); anim(o, 'fn', t, .5, { fn: (r, k) => o.style.opacity = k }); };
    mk('inset(0 46% 0 0)', P.rust, W(b, 5)); mk('inset(0 0 0 54%)', P.navy, W(b, 7));
    label(s, 'E', 250, 1420, W(b, 5), `font:italic 700 90px "EB Garamond";color:${P.rust}`); label(s, 't', 790, 1420, W(b, 7), `font:italic 700 90px "EB Garamond";color:${P.navy}`); },
  (s, b) => { const a = h('div', { class: 'big', style: `top:1080px;font:italic 400 420px "EB Garamond";color:${P.rust}` }, s, '&');
    anim(a, 'fn', W(b, 2) - .05, .6, { fn: (r, k) => { a.style.opacity = k; a.style.transform = `translate(-50%,-50%) scale(${.8 + .2 * E.back(r)})`; } });
    const et = h('div', { class: 'big', style: `top:1380px;font:italic 500 110px "EB Garamond";color:${P.soft}` }, s, '= <i>et</i>');
    anim(et, 'fn', W(b, 8), .5, { fn: (r, k) => { et.style.opacity = k; } }); },
];
