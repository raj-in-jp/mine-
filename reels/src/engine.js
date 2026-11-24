// Deterministic reel engine: build DOM once, then render(t) sets every style from time t.
const W = 1080, H = 1920;
const C = { paper: '#F3EBDD', ink: '#1C1A17', soft: '#5A5247', red: '#9B2C2C', gold: '#B8872B', land: '#E6D8BE', line: '#B9A88A' };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const E = {
  lin: k => k,
  out: k => 1 - Math.pow(1 - k, 3),
  inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  back: k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
  elastic: k => k === 0 ? 0 : k === 1 ? 1 : Math.pow(2, -10 * k) * Math.sin((k * 10 - .75) * (2 * Math.PI / 3)) + 1,
};
const NS = 'http://www.w3.org/2000/svg';
const anims = [], scenes = [], CUES = [], ticks = [];
let DURATION = 20;

function h(tag, attrs = {}, parent, html) {
  const svg = ['svg', 'path', 'circle', 'ellipse', 'line', 'rect', 'g', 'text', 'mask', 'polyline', 'defs', 'filter', 'feTurbulence', 'feDisplacementMap', 'tspan'].includes(tag);
  const el = svg ? document.createElementNS(NS, tag) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else el.setAttribute(k, v);
  }
  if (html != null) el.innerHTML = html;
  if (parent) parent.appendChild(el);
  return el;
}
function cue(t, type) { CUES.push({ t: +t.toFixed(3), type }); }

// anim(el, type, t0, dur, opts)
function anim(el, type, t0, dur = .6, o = {}) { anims.push({ el, type, t0, dur, o }); if (o.cue) cue(t0 + (o.cueAt || 0), o.cue); return el; }

function scene(t0, t1, build) {
  const el = h('div', { class: 'scene' }, document.getElementById('stage'));
  scenes.push({ el, t0, t1 });
  build(el, t0);
  if (t0 > 0.1) cue(t0 - .25, 'whoosh');
  return el;
}

// text helpers
function text(parent, str, css, cls = '') {
  return h('div', { class: 'txt ' + cls, style: css }, parent, str);
}
function letters(parent, str, css, cls = '') {
  const el = h('div', { class: 'txt ' + cls, style: css }, parent);
  [...str].forEach(ch => h('span', { class: 'ch' }, el, ch === ' ' ? '&nbsp;' : ch));
  return el;
}
function svgBox(parent, x, y, w, ht, vb) {
  return h('svg', { width: w, height: ht, viewBox: vb || `0 0 ${w} ${ht}`, style: `position:absolute;left:${x}px;top:${y}px;overflow:visible` }, parent);
}

function apply(a, t) {
  const { el, type, t0, dur, o } = a;
  const raw = clamp((t - t0) / dur);
  const ease = E[o.ease || (type === 'pop' ? 'back' : 'out')];
  const k = ease(raw);
  const base = o.base || '';
  switch (type) {
    case 'fadeUp': el.style.opacity = raw === 0 ? 0 : clamp(k); el.style.transform = `${base} translateY(${(1 - k) * (o.dy ?? 50)}px)`; el.style.filter = `blur(${(1 - clamp(k)) * 8}px)`; break;
    case 'fade': el.style.opacity = k * (o.to ?? 1); break;
    case 'pop': el.style.opacity = clamp(raw * 3); el.style.transform = `${base} scale(${(o.from ?? .4) + (1 - (o.from ?? .4)) * k})`; break;
    case 'stamp': { const kk = E.out(raw); el.style.opacity = clamp(raw * 4); el.style.transform = `${base} rotate(${o.rot ?? -8}deg) scale(${2.4 - 1.4 * kk})`; break; }
    case 'draw': el.style.strokeDashoffset = 1 - k; el.style.opacity = raw > 0 ? 1 : 0; break;
    case 'wipe': el.style.clipPath = `inset(-20% ${(1 - k) * 100}% -20% -5%)`; el.style.opacity = raw > 0 ? 1 : 0; break;
    case 'letters': {
      const chs = el.querySelectorAll('.ch'); const st = o.stagger ?? .05;
      chs.forEach((c, i) => {
        const r = clamp((t - t0 - i * st) / dur); const kk = E.back(r);
        c.style.opacity = clamp(r * 2.5);
        c.style.transform = `translateY(${(1 - kk) * (o.dy ?? -140)}px) rotate(${(1 - kk) * (i % 2 ? 12 : -12)}deg)`;
      });
      el.style.opacity = 1; break;
    }
    case 'type': { const n = Math.round(clamp((t - t0) / dur) * o.str.length); el.innerHTML = o.str.slice(0, n) + (raw < 1 && raw > 0 ? '<span class="caret">|</span>' : ''); el.style.opacity = raw > 0 ? 1 : 0; break; }
    case 'out': el.style.opacity = raw === 0 ? (el.style.opacity || 1) : 1 - k; if (raw > 0) el.style.transform = `${base} translateY(${-k * (o.dy ?? 20)}px) scale(${1 - k * (o.shrink ?? 0)})`; if (raw > 0) el.style.filter = `blur(${k * 6}px)`; break;
    case 'gray': el.style.color = raw > 0 ? mix(o.from || C.red, o.to || '#A59A88', k) : ''; break;
    case 'grow': el.style.transform = `${base} scaleX(${k})`; el.style.opacity = raw > 0 ? 1 : 0; break;
    case 'fn': o.fn(raw, k, t); break;
  }
}
function mix(a, b, k) {
  const p = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`;
}

function render(t) {
  // initial hidden state for anim targets not yet started
  for (const a of anims) {
    if (t < a.t0 && !['letters', 'out', 'gray', 'fn'].includes(a.type)) {
      if (a.type === 'draw') { a.el.style.strokeDashoffset = 1; a.el.style.opacity = 0; }
      else a.el.style.opacity = 0;
    }
  }
  // run in start order so later anims (e.g. 'out') win
  for (const a of anims) if (t >= a.t0 || a.type === 'letters' || a.type === 'fn') apply(a, t);
  for (const s of scenes) {
    const fi = clamp((t - s.t0) / .45), fo = clamp((s.t1 - t) / .45);
    const vis = t >= s.t0 - .01 && t <= s.t1 + .01;
    s.el.style.display = vis ? 'block' : 'none';
    const drift = 1 + .035 * clamp((t - s.t0) / (s.t1 - s.t0));
    s.el.style.opacity = Math.min(E.out(fi), E.out(fo));
    s.el.style.transform = `scale(${drift}) translateY(${(1 - E.out(fo)) * -40}px)`;
    s.el.style.filter = fo < 1 ? `blur(${(1 - fo) * 10}px)` : 'none';
  }
  for (const f of ticks) f(t);
  document.getElementById('bar').style.transform = `scaleX(${clamp(t / DURATION)})`;
}

// ---------- shared chrome ----------
function chrome(no, title) {
  const ch = document.getElementById('chrome');
  h('div', { class: 'frame' }, ch);
  h('div', { class: 'frame2' }, ch);
  const ft = h('div', { class: 'foot' }, ch, '<span class="fl"></span>a word a day<span class="fl"></span>');
  ticks.push(t => { ft.style.opacity = .9 * E.out(clamp((t - .4) / .8)); });
  const tag = h('div', { class: 'tag' }, ch, `<span class="dot"></span>WORD ORIGINS <span class="no">No. ${no}</span>`);
  ticks.push(t => { tag.style.opacity = E.out(clamp(t / .6)); });
  document.title = title;
}

// ---------- reusable illustrated components ----------
let MAP;
function mapBlock(parent, x, y, scale, t0, cfg) {
  // cfg: { highlight:[ids], route:[cityNames], pins:[{city,label,sub,side,dt}], zoom:{cx,cy,s} }
  const wrap = h('div', { style: `position:absolute;left:${x}px;top:${y}px;width:${MAP.W * scale}px;height:${MAP.H * scale}px;` }, parent);
  const svg = h('svg', { width: MAP.W * scale, height: MAP.H * scale, viewBox: `0 0 ${MAP.W} ${MAP.H}`, style: 'overflow:visible' }, wrap);
  const g = h('g', {}, svg);
  // sea hatch
  const sea = h('rect', { x: 0, y: 0, width: MAP.W, height: MAP.H, fill: 'url(#hatch)', opacity: 0 }, g);
  anim(sea, 'fade', t0, .8, { to: .55 });
  const grat = h('path', { d: MAP.grat, fill: 'none', stroke: C.line, 'stroke-width': 1.2, 'stroke-dasharray': '3 7', opacity: 0 }, g);
  anim(grat, 'fade', t0, .8, { to: .7 });
  const hl = new Set(cfg.highlight || []);
  for (const c of MAP.countries) {
    const on = hl.has(c.id);
    const p = h('path', { d: c.d, fill: C.land, stroke: '#9C8B6C', 'stroke-width': 1.1, 'stroke-linejoin': 'round' }, g);
    anim(p, 'fade', t0 + .1, .7);
    if (on) {
      const p2 = h('path', { d: c.d, fill: 'rgba(155,44,44,.16)', stroke: C.red, 'stroke-width': 2.6, pathLength: 1, 'stroke-dasharray': 1, 'stroke-linejoin': 'round' }, g);
      anim(p2, 'draw', t0 + (cfg.hlDelay ?? .5), 1.4, { ease: 'inOut' });
    }
  }
  // frame around map
  const fr = h('rect', { x: 2, y: 2, width: MAP.W - 4, height: MAP.H - 4, fill: 'none', stroke: C.ink, 'stroke-width': 3, pathLength: 1, 'stroke-dasharray': 1 }, svg);
  anim(fr, 'draw', t0, 1.2, { ease: 'inOut' });
  // compass
  const cp = h('g', { transform: `translate(${MAP.W - 110},${MAP.H - 120})` }, svg);
  h('circle', { r: 46, fill: 'none', stroke: C.soft, 'stroke-width': 1.5 }, cp);
  h('path', { d: 'M0,-62 L10,0 L0,62 L-10,0Z', fill: C.ink }, cp);
  h('path', { d: 'M-62,0 L0,8 L62,0 L0,-8Z', fill: C.soft, opacity: .6 }, cp);
  h('text', { y: -72, 'text-anchor': 'middle', 'font-family': 'Cinzel', 'font-weight': 700, 'font-size': 26, fill: C.ink }, cp, 'N');
  anim(cp, 'fn', t0 + .3, 1.2, { fn: (r, k) => { cp.setAttribute('opacity', k); cp.setAttribute('transform', `translate(${MAP.W - 110},${MAP.H - 120}) rotate(${(1 - k) * -120})`); } });

  // route
  let tRoute = t0 + (cfg.routeDelay ?? 1.2);
  const pts = (cfg.route || []).map(n => MAP.cities[n]);
  if (pts.length > 1) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
      const bend = cfg.bend ?? .28;
      d += ` Q${mx - dy * bend},${my + dx * bend} ${x2},${y2}`;
    }
    const id = 'm' + Math.random().toString(36).slice(2);
    const mask = h('mask', { id }, svg);
    const mp = h('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 16, pathLength: 1, 'stroke-dasharray': 1, 'stroke-linecap': 'round' }, mask);
    h('path', { d, fill: 'none', stroke: C.red, 'stroke-width': 5, 'stroke-dasharray': '14 12', 'stroke-linecap': 'round', mask: `url(#${id})` }, svg);
    anim(mp, 'draw', tRoute, cfg.routeDur ?? 2.6, { ease: 'inOut' });
    mp.style.opacity = 1;
    // travelling ink dot
    const probe = h('path', { d, fill: 'none', stroke: 'none' }, svg);
    const dot = h('circle', { r: 11, fill: C.red, stroke: C.paper, 'stroke-width': 4 }, svg);
    const len = () => probe.getTotalLength();
    anim(dot, 'fn', tRoute, cfg.routeDur ?? 2.6, {
      ease: 'inOut', fn: (r, k) => { const p = probe.getPointAtLength(len() * k); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('opacity', r > 0 && r < 1 ? 1 : 0); }
    });
  }
  // pins
  for (const p of cfg.pins || []) {
    const [cx, cy] = MAP.cities[p.city];
    const tp = t0 + p.dt;
    const pg = h('g', {}, svg);
    const ring = h('circle', { cx, cy, r: 16, fill: 'none', stroke: C.red, 'stroke-width': 3 }, pg);
    h('circle', { cx, cy, r: 13, fill: C.red, stroke: C.paper, 'stroke-width': 5 }, pg);
    anim(pg, 'fn', tp, .5, { cue: 'pop', fn: (r) => { const k = E.back(r); pg.setAttribute('opacity', r > 0 ? 1 : 0); pg.setAttribute('transform', `translate(${cx},${cy}) scale(${k}) translate(${-cx},${-cy})`); } });
    anim(ring, 'fn', tp + .2, 1.6, { ease: 'lin', fn: (r) => { ring.setAttribute('r', 16 + r * 46); ring.setAttribute('opacity', r > 0 && r < 1 ? (1 - r) : 0); } });
    // label card (HTML so fonts render nicely)
    const side = p.side || 'right';
    const lx = (cx + (side === 'right' ? 30 : -30)) * scale, ly = (cy - 54 + (p.dy || 0)) * scale;
    const card = h('div', { class: 'pin', style: `left:${lx}px;top:${ly}px;${side === 'left' ? 'transform-origin:right center;' : ''}` }, wrap,
      `<div class="pl">${p.label}</div><div class="pw">${p.word}</div>${p.sub ? `<div class="ps">${p.sub}</div>` : ''}`);
    const base = side === 'left' ? 'translateX(-100%)' : '';
    anim(card, 'pop', tp + .15, .55, { base, from: .6 });
  }
  return wrap;
}

function timeline(parent, x, y, items, t0, step = .85, gap = 168) {
  // vertical timeline: items [{yr, w, note, hot}]
  const total = gap * (items.length - 1);
  const svg = svgBox(parent, x, y, 60, total + 40);
  const ln = h('line', { x1: 30, y1: 20, x2: 30, y2: total + 20, stroke: C.ink, 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': 1, 'stroke-linecap': 'round' }, svg);
  anim(ln, 'draw', t0, step * (items.length - 1) + .3, { ease: 'lin' });
  items.forEach((it, i) => {
    const ti = t0 + i * step;
    const dot = h('circle', { cx: 30, cy: 20 + i * gap, r: it.hot ? 18 : 13, fill: it.hot ? C.red : C.paper, stroke: it.hot ? C.red : C.ink, 'stroke-width': 4 }, svg);
    anim(dot, 'fn', ti, .5, { cue: 'tick', fn: r => { const k = E.back(r); dot.style.transformOrigin = `30px ${20 + i * gap}px`; dot.style.transform = `scale(${k})`; dot.style.opacity = r > 0 ? 1 : 0; } });
    const row = h('div', { class: 'tl-row', style: `left:${x + 90}px;top:${y + i * gap - 22}px` }, parent,
      `<div class="tl-yr">${it.yr}</div><div class="tl-w ${it.hot ? 'hot' : ''}">${it.w}</div>${it.note ? `<div class="tl-n">${it.note}</div>` : ''}`);
    anim(row, 'fadeUp', ti + .05, .55, { dy: 30 });
    if (!it.hot && i < items.length - 1) anim(row.querySelector('.tl-w'), 'gray', t0 + (items.length - 1) * step + .2, .6, { from: C.ink.replace('#', '#') });
  });
}

function cta(parent, t0, line1 = 'Which word should I do next?') {
  const q = text(parent, line1, 'top:560px;font:600 74px/1.12 "Playfair Display";color:var(--ink);text-align:center;left:90px;right:90px;');
  anim(q, 'fadeUp', t0, .7);
  const c = text(parent, 'Comment it below', 'top:800px;font:500 46px Inter;color:var(--soft);text-align:center;left:0;right:0;');
  anim(c, 'fadeUp', t0 + .35, .6);
  const svg = svgBox(parent, 490, 890, 100, 220);
  const ar = h('path', { d: 'M50,10 C20,70 80,120 50,190 M22,160 L50,195 L78,160', fill: 'none', stroke: C.red, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
  anim(ar, 'draw', t0 + .6, .9, { ease: 'inOut' });
  ticks.push(t => { if (t > t0 + 1.5) svg.style.transform = `translateY(${Math.sin((t - t0) * 5) * 10}px)`; });
  const f = h('div', { class: 'follow', style: 'top:1180px' }, parent, '<span>+</span> Follow for a new word every day');
  anim(f, 'pop', t0 + 1.1, .6, { from: .7, cue: 'pop' });
}

function rule(parent, x, y, w, t0, color = C.red) {
  const r = h('div', { style: `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:6px;background:${color};border-radius:3px;transform-origin:left center` }, parent);
  anim(r, 'grow', t0, .6, { ease: 'inOut' });
  return r;
}

function mouseSVG(g, fill = C.ink) {
  // simple side-view mouse, ~120 wide, origin at body center
  h('path', { d: 'M-55,10 C-60,-30 -10,-48 25,-30 C45,-22 58,-6 62,6 C64,12 58,16 50,16 L-50,18 C-56,18 -56,14 -55,10Z', fill }, g);
  h('circle', { cx: 28, cy: -36, r: 15, fill, stroke: C.paper, 'stroke-width': 3 }, g);
  h('circle', { cx: 46, cy: -6, r: 3.5, fill: C.paper }, g);
  h('path', { d: 'M-54,12 C-90,14 -100,-20 -128,-6', fill: 'none', stroke: fill, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  h('path', { d: 'M62,8 l26,-6 M62,10 l26,6', stroke: fill, 'stroke-width': 2, opacity: .8 }, g);
}
