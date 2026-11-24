const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const v of ['a','b']) { await p.goto(`http://localhost:8766/cover5.html?v=${v}`); await p.evaluate(async()=>{await document.fonts.ready; await Promise.all(['500 80px "EB Garamond"','italic 700 80px "EB Garamond"','italic 600 80px "EB Garamond"','900 80px Fraunces','600 30px Inter'].map(f=>document.fonts.load(f)))}); await p.waitForTimeout(500); await p.screenshot({ path: `eyak-cover-${v}.png` }); }
await b.close(); })();
