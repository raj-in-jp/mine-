// Reel definitions
const center = 'left:0;right:0;text-align:center;';
const WORD = (size) => `${center}font:600 ${size}px/1 "Playfair Display";color:var(--ink);letter-spacing:-.01em;`;
const SMALL = `${center}font:500 50px/1.2 Inter;color:var(--soft);`;
const HEAD = `${center}font:600 68px/1.15 "Playfair Display";color:var(--ink);`;

function hook(s, t0, { pre, word, size = 300, post, stampTxt, stampColor = C.red, stampSize = 120 }) {
  anim(text(s, pre, `top:470px;${SMALL}`), 'fadeUp', t0 + .1, .6);
  anim(letters(s, word, `top:590px;${WORD(size)}`), 'letters', t0 + .4, .6, { stagger: .06, cue: 'thud', cueAt: .35 });
  anim(text(s, post, `top:1000px;${SMALL}`), 'fadeUp', t0 + 1.2, .5);
  const st = h('div', { class: 'stamp', style: `top:1100px;color:${stampColor};border-color:${stampColor};font-size:${stampSize}px` }, s, stampTxt);
  anim(st, 'stamp', t0 + 1.6, .45, { base: 'translateX(-50%)', cue: 'stamp', cueAt: .3 });
  return st;
}

function breakdown(s, t0, { head, a, aL, b, bL, res, resL }) {
  anim(text(s, head, `top:380px;${SMALL}`), 'fadeUp', t0 + .2, .6);
  const svg = svgBox(s, 0, 540, 1080, 260);
  [[110, a, aL, .5], [610, b, bL, 1.1]].forEach(([x, word, lab, dt]) => {
    const r = h('rect', { x, y: 10, width: 360, height: 200, rx: 10, fill: 'rgba(255,255,255,.35)', stroke: C.ink, 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': 1 }, svg);
    anim(r, 'draw', t0 + dt, .7, { ease: 'inOut', cue: 'tick' });
    anim(text(s, word, `left:${x}px;width:360px;top:592px;text-align:center;font:700 92px Cinzel;color:var(--ink)`), 'fadeUp', t0 + dt + .25, .5, { dy: 20 });
    anim(text(s, lab, `left:${x}px;width:360px;top:790px;text-align:center;font:500 42px Inter;color:var(--red)`), 'fadeUp', t0 + dt + .45, .5, { dy: 20 });
  });
  anim(text(s, '+', 'left:0;right:0;text-align:center;top:575px;font:400 120px "Playfair Display";color:var(--soft)'), 'pop', t0 + .9, .5);
  const ar = svgBox(s, 490, 880, 100, 190);
  const ap = h('path', { d: 'M50,5 L50,160 M24,132 L50,165 L76,132', fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1 }, ar);
  anim(ap, 'draw', t0 + 1.9, .6, { ease: 'inOut' });
  anim(text(s, res, `top:1070px;${center}font:italic 400 150px/1.1 "Playfair Display";color:var(--red)`), 'wipe', t0 + 2.4, .9, { ease: 'inOut', cue: 'scratch' });
  anim(text(s, resL, `top:1290px;${SMALL}color:var(--ink)`), 'fadeUp', t0 + 3.2, .6);
}

function endLine(s, t0, line) {
  anim(text(s, line, `top:330px;${center}font:italic 400 56px/1.25 "Playfair Display";color:var(--soft);padding:0 110px`), 'fadeUp', t0 + .1, .7);
  rule(s, 470, 510, 140, t0 + .5);
  cta(s, t0 + .7);
}

const REELS = {
  nice() {
    chrome('01', 'nice'); DURATION = 22;
    scene(0, 3.7, s => hook(s, 0, { pre: '700 years ago, calling someone', word: 'nice', post: 'was an', stampTxt: 'INSULT' }));
    scene(3.7, 8.7, s => breakdown(s, 3.7, { head: 'It comes from Latin', a: 'ne', aL: '"not"', b: 'scīre', bL: '"to know"', res: 'nescius', resL: '= "ignorant, not knowing"' }));
    scene(8.7, 13.5, s => {
      anim(text(s, 'From Rome to London', `top:270px;${HEAD}`), 'fadeUp', 8.9, .6);
      mapBlock(s, 98, 420, .92, 8.8, {
        highlight: ['380', '250', '826'], route: ['Rome', 'Paris', 'London'], routeDelay: 1.0, routeDur: 2.6,
        pins: [
          { city: 'Rome', label: 'Latin', word: 'nescius', sub: 'ignorant', side: 'left', dt: .9 },
          { city: 'Paris', label: 'Old French', word: 'nice', sub: 'silly, simple', side: 'right', dt: 2.3 },
          { city: 'London', label: 'English · 1300s', word: 'nice', sub: 'foolish', side: 'left', dy: -70, dt: 3.5 },
        ]
      });
    });
    scene(13.5, 18.3, s => {
      anim(text(s, 'Then it kept changing…', `top:300px;${HEAD}`), 'fadeUp', 13.7, .6);
      timeline(s, 190, 540, [
        { yr: '1300s', w: 'foolish' },
        { yr: '1400s', w: 'fussy, shy' },
        { yr: '1500s', w: 'precise', note: 'a "nice" distinction' },
        { yr: '1700s', w: 'pleasant', note: 'the meaning we use today', hot: true },
      ], 14.1, .9, 190);
    });
    scene(18.3, 22, s => endLine(s, 18.3, 'From foolish to pleasant in 700 years.'));
  },

  silly() {
    chrome('02', 'silly'); DURATION = 22;
    scene(0, 3.7, s => {
      hook(s, 0, { pre: '1,000 years ago, calling someone', word: 'silly', post: 'was a', stampTxt: 'COMPLIMENT', stampColor: C.gold, stampSize: 84 });
      const svg = svgBox(s, 290, 532, 500, 120);
      const halo = h('ellipse', { cx: 250, cy: 60, rx: 190, ry: 34, fill: 'none', stroke: C.gold, 'stroke-width': 9, pathLength: 1, 'stroke-dasharray': 1 }, svg);
      anim(halo, 'draw', 1.0, .8, { ease: 'inOut' });
      ticks.push(t => { if (t > 1.8) svg.style.transform = `translateY(${Math.sin(t * 3) * 6}px)`; });
      [[60, 10], [450, 0], [480, 90]].forEach(([x, y], i) => {
        const sp = h('path', { d: 'M0,-22 L5,-5 L22,0 L5,5 L0,22 L-5,5 L-22,0 L-5,-5Z', fill: C.gold, transform: `translate(${x},${y})` }, svg);
        anim(sp, 'fn', 1.5 + i * .15, .5, { fn: r => { const k = E.back(r); sp.setAttribute('transform', `translate(${x},${y}) scale(${k}) rotate(${r * 90})`); sp.setAttribute('opacity', r > 0 ? 1 : 0); } });
      });
    });
    scene(3.7, 8.7, s => {
      anim(text(s, 'In Old English it was', `top:420px;${SMALL}`), 'fadeUp', 3.9, .6);
      anim(text(s, 'sælig', `top:540px;${center}font:italic 400 230px/1.1 "Playfair Display";color:var(--red)`), 'wipe', 4.4, 1.0, { ease: 'inOut', cue: 'scratch' });
      anim(text(s, 'and it meant', `top:880px;${SMALL}`), 'fadeUp', 5.4, .5);
      ['blessed', 'happy', 'fortunate'].forEach((w, i) => {
        anim(h('div', { class: 'chip', style: `top:${990 + i * 125}px` }, s, w), 'pop', 5.9 + i * .45, .5, { base: 'translateX(-50%)', from: .5, cue: 'pop' });
      });
    });
    scene(8.7, 13.5, s => {
      anim(text(s, 'Its cousin still survives', `top:270px;${HEAD}`), 'fadeUp', 8.9, .6);
      mapBlock(s, 98, 420, .92, 8.8, {
        highlight: ['826', '276'], route: ['London', 'Berlin'], bend: -.25, routeDelay: 1.6, routeDur: 1.6,
        pins: [
          { city: 'London', label: 'Old English', word: 'sælig', sub: 'blessed → silly', side: 'left', dy: 40, dt: .9 },
          { city: 'Berlin', label: 'German today', word: 'selig', sub: 'still means "blessed"', side: 'left', dy: -110, dt: 3.0 },
        ]
      });
    });
    scene(13.5, 18.3, s => {
      anim(text(s, 'Then it slid downhill', `top:300px;${HEAD}`), 'fadeUp', 13.7, .6);
      timeline(s, 190, 540, [
        { yr: 'Old English', w: 'blessed, happy' },
        { yr: '1200s', w: 'innocent' },
        { yr: '1300s', w: 'pitiable, weak' },
        { yr: '1500s', w: 'foolish', note: 'and it stuck', hot: true },
      ], 14.1, .9, 190);
    });
    scene(18.3, 22, s => endLine(s, 18.3, 'From blessed to foolish. Language is wild.'));
  },

  muscle() {
    chrome('03', 'muscle'); DURATION = 22.4;
    scene(0, 3.9, s => {
      hook(s, 0, { pre: 'Every time you flex, you show off', word: 'muscle', size: 250, post: 'which literally means', stampTxt: 'LITTLE MOUSE', stampSize: 84 });
      const svg = svgBox(s, 0, 1330, 1080, 120);
      const g = h('g', {}, svg); mouseSVG(g, C.ink);
      anim(g, 'fn', 2.1, 1.6, { ease: 'inOut', cue: 'squeak', fn: (r, k, t) => { const x = -150 + k * 1380; g.setAttribute('transform', `translate(${x},60) translate(0,${-Math.abs(Math.sin(t * 22)) * 10})`); g.setAttribute('opacity', r > 0 && r < 1 ? 1 : 0); } });
    });
    scene(3.9, 8.7, s => breakdown(s, 3.9, { head: 'In Latin', a: 'mūs', aL: '"mouse"', b: '-culus', bL: '"little"', res: 'musculus', resL: '= "little mouse"' }));
    scene(8.7, 14.3, s => {
      anim(text(s, 'Why a mouse?', `top:280px;${HEAD}`), 'fadeUp', 8.9, .6);
      const svg = svgBox(s, 140, 430, 800, 700);
      const outline = h('path', { fill: 'rgba(255,255,255,.45)', stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
      const sleeve = h('path', { d: 'M60,355 L120,355 L120,580 L60,580', fill: 'none', stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
      const fist = h('path', { d: 'M478,172 C490,147 520,150 528,170 M528,170 C540,142 575,145 582,172', fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
      const mg = h('g', {}, svg); mouseSVG(mg, C.red);
      const lines = h('path', { d: 'M0,0 l-20,-34 M28,-6 l0,-40 M56,0 l20,-34', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' }, svg);
      const arm = B => `M120,370 C190,370 220,${370 - B} 310,${370 - B} C390,${370 - B} 430,${380 - B * .3} 470,330 C480,300 470,240 460,200 C450,130 520,95 575,120 C625,140 630,190 610,230 C600,300 640,420 630,480 C620,545 580,565 520,565 L120,565`;
      outline.setAttribute('d', arm(25));
      anim(outline, 'draw', 9.0, 1.4, { ease: 'inOut' });
      anim(sleeve, 'draw', 9.0, .8, { ease: 'inOut' });
      anim(fist, 'draw', 10.1, .5);
      const flex = t => t < 10.6 ? 25 : 25 + 95 * (0.5 - 0.5 * Math.cos(Math.min(t - 10.6, 99) * 3.2));
      ticks.push(t => {
        if (t < 8.6 || t > 14.4) return;
        const B = flex(t); outline.setAttribute('d', arm(B));
        const v = clamp((t - 10.9) / .4);
        mg.setAttribute('transform', `translate(${305 + Math.sin(t * 2.4) * 18},${430 - B * .55}) scale(.95)`);
        mg.setAttribute('opacity', v * .9);
        lines.setAttribute('transform', `translate(286,${330 - B})`);
        lines.setAttribute('opacity', B > 95 ? clamp((B - 95) / 20) : 0);
      });
      cue(10.9, 'squeak'); cue(12.9, 'squeak');
      anim(text(s, 'Romans thought a flexing muscle looked like a <b>mouse moving under the skin</b>.', `top:1160px;${center}font:500 48px/1.35 Inter;color:var(--ink);padding:0 120px`), 'fadeUp', 11.2, .7);
    });
    scene(14.3, 18.6, s => {
      anim(text(s, 'Bonus', `top:330px;${center}font:700 34px Inter;letter-spacing:.25em;color:var(--red);text-transform:uppercase`), 'fadeUp', 14.5, .5);
      anim(text(s, 'Latin <i>musculus</i> also meant…', `top:400px;${HEAD}`), 'fadeUp', 14.7, .6);
      anim(letters(s, 'mussel', `top:540px;${WORD(220)}`), 'letters', 15.3, .6, { stagger: .06, cue: 'thud', cueAt: .3 });
      const svg = svgBox(s, 390, 830, 300, 300);
      const shell = h('path', { d: 'M150,20 C230,40 280,140 250,230 C230,280 170,290 150,280 C130,290 70,280 50,230 C20,140 70,40 150,20Z', fill: 'rgba(28,26,23,.08)', stroke: C.ink, 'stroke-width': 6, pathLength: 1, 'stroke-dasharray': 1 }, svg);
      anim(shell, 'draw', 15.9, 1, { ease: 'inOut' });
      [60, 100, 140].forEach((r, i) => { const a = h('path', { d: `M${150 - r * .9},${250 - r * .2} Q150,${250 - r * 1.6} ${150 + r * .9},${250 - r * .2}`, fill: 'none', stroke: C.soft, 'stroke-width': 4, pathLength: 1, 'stroke-dasharray': 1 }, svg); anim(a, 'draw', 16.4 + i * .15, .6); });
      anim(text(s, 'Muscle and mussel are word cousins.', `top:1180px;${SMALL}color:var(--ink)`), 'fadeUp', 16.8, .6);
    });
    scene(18.6, 22.4, s => endLine(s, 18.6, 'Your biceps? Technically mice.'));
  },

  goodbye() {
    chrome('04', 'goodbye'); DURATION = 22.6;
    scene(0, 3.7, s => hook(s, 0, { pre: 'Every time you say', word: 'goodbye', size: 220, post: 'you are actually saying a', stampTxt: 'PRAYER' }));
    scene(3.7, 10.2, s => {
      anim(text(s, 'It started as a blessing', `top:400px;${SMALL}`), 'fadeUp', 3.9, .6);
      // spans: [char, role] role: k keep, d drop at stage2, w drop at stage3, i insert at stage3
      const parts = [['G', 'k'], ['o', 'k'], ['o', 'i'], ['d', 'k'], [' ', 'd'], ['b', 'k'], ['e', 'd'], [' ', 'd'], ['w', 'w'], ['i', 'd'], ['t', 'd'], ['h', 'd'], [' ', 'd'], ['y', 'k'], ['e', 'k']];
      const line = h('div', { class: 'txt', style: `top:640px;${center}font:600 128px/1.1 "Playfair Display";color:var(--ink);white-space:nowrap` }, s);
      const spans = parts.map(([c, r]) => { const sp = h('span', { class: 'ch morph' }, line, c === ' ' ? '&nbsp;' : c); sp.dataset.role = r; return sp; });
      const T1 = 4.3, T2 = 6.2, T3 = 8.0;
      let widths = null;
      ticks.push(t => {
        if (t < 3.6 || t > 10.3) return;
        if (!widths) widths = spans.map(sp => { sp.style.maxWidth = 'none'; return sp.getBoundingClientRect().width / (sp.closest('.scene').getBoundingClientRect().width / 1080); });
        spans.forEach((sp, i) => {
          const role = sp.dataset.role, w = widths[i];
          let vis = 1, col = C.ink, dy = 0;
          const a = clamp((t - T1 - i * .04) / .5);
          if (role === 'i') { const k = E.out(clamp((t - T3 - .4) / .6)); vis = k; col = C.red; }
          else if (role === 'd') { const k = E.inOut(clamp((t - T2 - i * .03) / .7)); vis = 1 - k; dy = k * 80; col = mix(C.ink, C.red, clamp(k * 3)); vis *= a; }
          else if (role === 'w') { const k = E.inOut(clamp((t - T3) / .6)); vis = 1 - k; dy = k * 80; col = mix(C.ink, C.red, clamp(k * 3)); vis *= a; }
          else vis = a;
          const shrink = role === 'k' ? 1 : vis;
          sp.style.maxWidth = (role === 'k' ? w : w * shrink) + 'px';
          sp.style.opacity = role === 'k' ? a : vis;
          sp.style.color = col;
          sp.style.transform = `translateY(${dy + (role === 'k' ? (1 - E.back(a)) * 40 : 0)}px)`;
        });
      });
      const stages = [[T1, '1300s', '"God be with ye"'], [T2 + .3, '1570s', 'squashed to "godbwye"'], [T3 + .4, 'Today', '"God" became "good", like <i>good day</i> and <i>good night</i>']];
      stages.forEach(([ts, yr, note], i) => {
        const y = h('div', { class: 'txt', style: `top:900px;${center}font:700 40px Inter;letter-spacing:.2em;color:var(--red)` }, s, yr.toUpperCase());
        const n = h('div', { class: 'txt', style: `top:970px;${center}font:500 46px/1.35 Inter;color:var(--soft);padding:0 120px` }, s, note);
        anim(y, 'fadeUp', ts, .5, { dy: 20, cue: i ? 'tick' : undefined }); anim(n, 'fadeUp', ts + .1, .5, { dy: 20 });
        if (i < 2) { const nx = stages[i + 1][0] - .35; anim(y, 'out', nx, .3); anim(n, 'out', nx, .3); }
      });
      cue(T2, 'scratch'); cue(T3, 'scratch');
    });
    scene(10.2, 15.2, s => {
      anim(text(s, 'Its neighbours do the same', `top:270px;${HEAD}`), 'fadeUp', 10.4, .6);
      mapBlock(s, 98, 420, .92, 10.3, {
        highlight: ['826', '250', '724'], route: [],
        pins: [
          { city: 'London', label: 'English', word: 'goodbye', sub: 'God be with ye', side: 'right', dy: -110, dt: .9 },
          { city: 'Paris', label: 'French', word: 'adieu', sub: 'à Dieu, "to God"', side: 'right', dt: 1.9 },
          { city: 'Madrid', label: 'Spanish', word: 'adiós', sub: 'a Dios, "to God"', side: 'right', dt: 2.9 },
        ]
      });
    });
    scene(15.2, 18.8, s => {
      anim(text(s, 'So every goodbye', `top:640px;${center}font:400 96px/1.1 "Playfair Display";color:var(--ink)`), 'fadeUp', 15.4, .7);
      anim(text(s, 'is a tiny blessing.', `top:780px;${center}font:italic 400 108px/1.1 "Playfair Display";color:var(--red)`), 'fadeUp', 16.0, .7);
      const svg = svgBox(s, 140, 930, 800, 60);
      const u = h('path', { d: 'M20,30 C200,0 520,55 780,20', fill: 'none', stroke: C.gold, 'stroke-width': 8, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1 }, svg);
      anim(u, 'draw', 16.6, .8, { ease: 'inOut' });
    });
    scene(18.8, 22.6, s => endLine(s, 18.8, 'Say it like you mean it.'));
  },
};
