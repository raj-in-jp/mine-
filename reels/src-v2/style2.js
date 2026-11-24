// Style 2: flat cream, Garamond, rust italic emphasis, flat outlined illustrations, voice-synced words
const P = { bg: '#EFE6DA', ink: '#231F1B', rust: '#A63D2A', navy: '#2E4560', cream: '#F7F0E6', skin: '#E8C49F', gold: '#C9962E', land: '#E4D6BF', mapline: '#C7B597', soft: '#7A6F64', mouse: '#9A8E82' };
const OL = { stroke: P.ink, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
let VO;

// ---------- voice-synced sentence ----------
function sentence(s, b, show, navy) {
  const box = h('div', { class: navy ? 'sent navy' : 'sent' }, s);
  const toks = show.split(/\s+/);
  toks.forEach((tk, i) => {
    const em = tk.startsWith('*') || tk.endsWith('*') || tk.includes('*');
    const clean = tk.replace(/\*/g, '');
    const sp = h('span', { class: 'w' + (em ? ' em' : '') }, box, clean);
    box.appendChild(document.createTextNode(' '));
    const t = b.words[i] - .06;
    anim(sp, 'fn', t, .38, { fn: (r) => { const k = E.out(r); sp.style.opacity = k; sp.style.filter = `blur(${(1 - k) * 8}px)`; sp.style.transform = `translateY(${(1 - k) * 22}px)`; } });
  });
  // keep emphasis words chained across "a little mouse" style multi-word emphasis
  return box;
}
const W = (b, i) => b.words[Math.max(0, Math.min(b.words.length - 1, i < 0 ? b.words.length + i : i))];

// ---------- primitives ----------
function bigWord(s, word, b, { y = 980, size = 400, zoomFrom = 1.7, color = P.ink, t = b.t0 } = {}) {
  const el = h('div', { class: 'big', style: `top:${y}px;font-size:${size}px;color:${color}` }, s, word);
  anim(el, 'fn', t - .1, Math.max(1.5, (b.t1 - b.t0) * .9), { ease: 'out', fn: (r, k) => { el.style.opacity = clamp(r * 6); el.style.transform = `translate(-50%,-50%) scale(${zoomFrom - (zoomFrom - 1) * k})`; } });
  return el;
}
function popSvg(g, t, { cx = 0, cy = 0, dur = .55, cue: c = 'pop' } = {}) {
  anim(g, 'fn', t, dur, { cue: c, fn: (r) => { const k = E.back(r); g.style.opacity = r > 0 ? 1 : 0; g.style.transformOrigin = `${cx}px ${cy}px`; g.style.transform = `scale(${Math.max(0, k)})`; } });
}
function fadeIn(el, t, dur = .5, dy = 30) { anim(el, 'fadeUp', t, dur, { dy }); return el; }
function label(s, txt, x, y, t, css = '') { const el = h('div', { class: 'lab', style: `left:${x}px;top:${y}px;${css}` }, s, txt); fadeIn(el, t, .45, 16); return el; }
function art(s, x, y, w, ht) { return svgBox(s, x, y, w, ht); }

// ---------- illustrations (flat, thick outline) ----------
function jester(svg, x, y, sc = 1) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${sc})` }, svg);
  const inner = h('g', {}, g);
  // collar
  h('path', { d: 'M-150,150 L-110,110 L-75,160 L-37,110 L0,160 L37,110 L75,160 L110,110 L150,150 L120,210 L-120,210Z', fill: P.rust, ...OL }, inner);
  // face
  h('ellipse', { cx: 0, cy: 40, rx: 105, ry: 115, fill: P.skin, ...OL }, inner);
  // hat lobes
  h('path', { d: 'M-100,-30 C-170,-70 -230,-10 -250,60 C-200,0 -150,-20 -110,10Z', fill: P.navy, ...OL }, inner);
  h('path', { d: 'M100,-30 C170,-70 230,-10 250,60 C200,0 150,-20 110,10Z', fill: P.navy, ...OL }, inner);
  h('path', { d: 'M-60,-60 C-50,-150 30,-200 70,-210 C40,-160 50,-100 60,-60Z', fill: P.rust, ...OL }, inner);
  h('path', { d: 'M-110,10 C-90,-70 90,-70 110,10 C60,-10 -60,-10 -110,10Z', fill: P.rust, ...OL }, inner);
  const bells = [[-252, 66], [252, 66], [72, -214]].map(([bx, by]) => h('circle', { cx: bx, cy: by, r: 18, fill: P.gold, ...OL }, inner));
  // eyes, cheeks, grin
  h('path', { d: 'M-50,25 q15,-14 30,0 M20,25 q15,-14 30,0', fill: 'none', ...OL, 'stroke-width': 6 }, inner);
  h('circle', { cx: -62, cy: 70, r: 14, fill: P.rust, opacity: .35 }, inner); h('circle', { cx: 62, cy: 70, r: 14, fill: P.rust, opacity: .35 }, inner);
  h('path', { d: 'M-48,88 Q0,135 48,88', fill: P.cream, ...OL }, inner);
  return { g, inner, bells };
}
function monk(svg, x, y, sc = 1) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${sc})` }, svg);
  const halo = h('circle', { cx: 0, cy: -70, r: 120, fill: 'none', stroke: P.gold, 'stroke-width': 14 }, g);
  h('path', { d: 'M-170,330 C-170,170 -120,60 -90,20 L90,20 C120,60 170,170 170,330Z', fill: P.navy, ...OL }, g);
  h('path', { d: 'M-95,40 C-130,-60 -80,-150 0,-150 C80,-150 130,-60 95,40 C60,10 -60,10 -95,40Z', fill: P.navy, ...OL }, g);
  h('ellipse', { cx: 0, cy: -45, rx: 62, ry: 72, fill: P.skin, ...OL }, g);
  h('path', { d: 'M-30,-50 q12,10 24,0 M8,-50 q12,10 24,0', fill: 'none', ...OL, 'stroke-width': 5 }, g);
  h('path', { d: 'M-20,-5 Q0,10 20,-5', fill: 'none', ...OL, 'stroke-width': 5 }, g);
  h('path', { d: 'M-60,180 C-30,150 30,150 60,180 L40,215 C10,195 -10,195 -40,215Z', fill: P.skin, ...OL }, g);
  h('path', { d: 'M-150,250 L150,250', stroke: P.cream, 'stroke-width': 12 }, g);
  h('path', { d: 'M40,250 l10,70 M40,250 l-6,64', stroke: P.cream, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
  return { g, halo };
}
function mouseFlat(svg, fill = P.mouse) {
  const g = h('g', {}, svg);
  h('path', { d: 'M-54,12 C-90,14 -100,-20 -128,-6', fill: 'none', stroke: P.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  h('path', { d: 'M-55,10 C-60,-30 -10,-48 25,-30 C45,-22 58,-6 62,6 C64,12 58,16 50,16 L-50,18 C-56,18 -56,14 -55,10Z', fill, ...OL, 'stroke-width': 5 }, g);
  h('circle', { cx: 24, cy: -34, r: 16, fill, ...OL, 'stroke-width': 5 }, g);
  h('circle', { cx: 24, cy: -34, r: 8, fill: '#D9A7A0' }, g);
  h('circle', { cx: 44, cy: -6, r: 4, fill: P.ink }, g);
  h('circle', { cx: 63, cy: 7, r: 5, fill: '#D9A7A0', stroke: P.ink, 'stroke-width': 3 }, g);
  return g;
}
function mussel(svg, x, y, sc = 1) {
  const g = h('g', { transform: `translate(${x},${y}) scale(${sc})` }, svg);
  h('path', { d: 'M0,-170 C110,-150 160,-30 140,80 C125,160 60,190 0,180 C-60,190 -125,160 -140,80 C-160,-30 -110,-150 0,-170Z', fill: P.navy, ...OL }, g);
  [40, 80, 120].forEach(r => h('path', { d: `M${-r * .95},${150 - r * .1} Q0,${150 - r * 2.1} ${r * .95},${150 - r * .1}`, fill: 'none', stroke: '#5B7392', 'stroke-width': 6, 'stroke-linecap': 'round' }, g));
  h('path', { d: 'M0,-170 L0,180', stroke: P.ink, 'stroke-width': 5, opacity: .5 }, g);
  h('ellipse', { cx: -60, cy: -60, rx: 18, ry: 40, fill: '#fff', opacity: .25, transform: 'rotate(20 -60 -60)' }, g);
  return g;
}
function scroll(svg, x, y, w = 760, ht = 360) {
  const g = h('g', { transform: `translate(${x},${y})` }, svg);
  h('rect', { x: 30, y: 20, width: w - 60, height: ht - 40, fill: P.cream, ...OL }, g);
  [[0, 0], [w - 60, 0]].forEach(([dx]) => { h('rect', { x: dx, y: 0, width: 60, height: ht, rx: 30, fill: '#E6D2B0', ...OL }, g); h('ellipse', { cx: dx + 30, cy: 0, rx: 30, ry: 12, fill: '#D3BC95', ...OL, 'stroke-width': 4 }, g); });
  return g;
}

// ---------- soft faded map ----------
function softMap(s, x, y, sc, t0, cfg) {
  const svg = svgBox(s, x, y, MAP.W * sc, MAP.H * sc, `0 0 ${MAP.W} ${MAP.H}`);
  const id = 'fade' + Math.random().toString(36).slice(2);
  const defs = h('defs', {}, svg);
  defs.innerHTML = `<radialGradient id="g${id}" cx="50%" cy="50%" r="55%"><stop offset="55%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/></radialGradient><mask id="${id}"><rect width="${MAP.W}" height="${MAP.H}" fill="url(#g${id})"/></mask>`;
  const g = h('g', { mask: `url(#${id})` }, svg);
  h('rect', { width: MAP.W, height: MAP.H, fill: '#E9DFD0' }, g);
  const hl = new Set(cfg.highlight || []);
  for (const c of MAP.countries) h('path', { d: c.d, fill: hl.has(c.id) ? P.rust : P.land, 'fill-opacity': hl.has(c.id) ? .9 : 1, stroke: hl.has(c.id) ? P.ink : P.mapline, 'stroke-width': hl.has(c.id) ? 2.5 : 1.6 }, g);
  anim(g, 'fn', t0, .8, { fn: (r, k) => { g.style.opacity = k; g.style.transform = `scale(${1.08 - .08 * k})`; g.style.transformOrigin = '50% 50%'; } });
  if (cfg.zoom) { const [zx, zy, z, tz] = cfg.zoom; ticks.push(t => { const k = E.inOut(clamp((t - tz) / 2.5)); svg.style.transformOrigin = `${zx * sc}px ${zy * sc}px`; svg.style.transform = `scale(${1 + (z - 1) * k})`; }); }
  const P2 = n => MAP.cities[n];
  for (const rd of cfg.roads || []) {
    const pts = rd.via.map(P2); let d = `M${pts[0]}`;
    for (let i = 1; i < pts.length; i++) { const [x1, y1] = pts[i - 1], [x2, y2] = pts[i]; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, bd = rd.bend ?? .2; d += ` Q${mx - dy * bd},${my + dx * bd} ${x2},${y2}`; }
    const o = h('path', { d, fill: 'none', stroke: P.ink, 'stroke-width': 13, pathLength: 1, 'stroke-dasharray': 1, 'stroke-linecap': 'round' }, svg);
    const i2 = h('path', { d, fill: 'none', stroke: P.cream, 'stroke-width': 5, pathLength: 1, 'stroke-dasharray': 1, 'stroke-linecap': 'round' }, svg);
    anim(o, 'draw', rd.t, rd.dur, { ease: 'inOut' }); anim(i2, 'draw', rd.t, rd.dur, { ease: 'inOut' });
    if (rd.dashed) { o.setAttribute('stroke-width', 6); i2.remove(); }
  }
  for (const p of cfg.places || []) {
    const [cx, cy] = P2(p.city);
    const dot = h('g', {}, svg);
    h('circle', { cx, cy, r: 13, fill: p.hot ? P.rust : P.ink, stroke: P.cream, 'stroke-width': 5 }, dot);
    popSvg(dot, p.t, { cx, cy, cue: 'tick' });
    const tx = h('text', { x: cx + (p.dx ?? 24), y: cy + (p.dy ?? -22), 'text-anchor': p.anchor || 'start', class: 'mapt' + (p.hot ? ' hot' : ''), 'font-size': p.size || 54 }, svg, p.text);
    if (p.sub) h('tspan', { x: cx + (p.dx ?? 24), dy: 44, class: 'maps', 'font-size': 34 }, tx, p.sub);
    anim(tx, 'fn', p.t + .1, .5, { fn: (r, k) => { tx.style.opacity = k; tx.style.transform = `translateY(${(1 - k) * 14}px)`; } });
  }
  return svg;
}

// ---------- letter morph ----------
function morphWord(s, y, size, stages) {
  // stages: [{t, word, red:[indices]}] crossfade with slide
  const els = stages.map((st, i) => {
    const el = h('div', { class: 'big', style: `top:${y}px;font-size:${size}px` }, s, [...st.word].map((c, j) => `<span style="color:${(st.red || []).includes(j) ? P.rust : P.ink}">${c}</span>`).join(''));
    const nx = stages[i + 1]?.t;
    anim(el, 'fn', st.t - .05, .45, { fn: (r, k) => {
      let o = k, dy = (1 - k) * 40; if (nx != null) { const q = E.inOut(clamp((s._t - nx + .05) / .4)); o *= 1 - q; dy -= q * 40; }
      el.style.opacity = o; el.style.transform = `translate(-50%,-50%) translateY(${dy}px)`; el.style.filter = `blur(${(1 - o) * 6}px)`;
    } });
    return el;
  });
  ticks.push(t => s._t = t);
  return els;
}

// ---------- end card ----------
function endCard(t0, dur) {
  scene(t0, dur, s => {
    const a = h('div', { class: 'big', style: 'top:820px;font:italic 600 112px "EB Garamond";color:' + P.rust }, s, '@wordology.lab'); anim(a, 'fadeUp', t0 + .15, .6, { base: 'translate(-50%,-50%)' });
    const b = h('div', { class: 'big', style: 'top:950px;font:400 56px "EB Garamond";color:' + P.soft }, s, 'a new word, every day'); anim(b, 'fadeUp', t0 + .5, .6, { base: 'translate(-50%,-50%)' });
    const c = h('div', { class: 'pill', style: 'top:1060px' }, s, 'Follow for more'); anim(c, 'pop', t0 + .9, .5, { from: .6, cue: 'pop', base: 'translateX(-50%)' });
  });
}

// ---------- reel builder ----------
function build(reel, beatsCfg, visuals) {
  DURATION = VO.dur;
  const B = VO.beats;
  B.forEach((b, i) => {
    const cfg = beatsCfg[i];
    const t0 = Math.max(0, b.t0 - .3), t1 = i < B.length - 1 ? B[i + 1].t0 - .3 : b.t1 + .9;
    const sc = scene(t0, t1, s => {
      if (cfg.navy) s.classList.add('navyscene');
      sentence(s, b, cfg.show, cfg.navy);
      if (visuals[i]) visuals[i](s, b);
    });
  });
  endCard(B[B.length - 1].t1 + .9, VO.dur);
  const ft = document.getElementById('foot');
  ticks.push(t => { const navyNow = VO.beats.some((b, i) => beatsCfg[i].navy && t > b.t0 - .3 && t < (VO.beats[i + 1]?.t0 ?? b.t1 + .9) - .3); ft.style.color = navyNow ? 'rgba(247,240,230,.75)' : P.soft; ft.style.opacity = t > B[B.length - 1].t1 + .9 ? 0 : 1; });
}
