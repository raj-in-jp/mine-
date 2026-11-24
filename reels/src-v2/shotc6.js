const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); p.on('pageerror', e => console.log('ERR', e.message));
for (const v of ['babies','hebrew']) { await p.goto(`http://localhost:8766/cover6.html?v=${v}`); await p.evaluate(async()=>{await Promise.all(['500 80px "EB Garamond"','italic 700 80px "EB Garamond"','italic 600 80px "EB Garamond"','700 80px Rubik','600 30px Inter'].map(f=>document.fonts.load(f)))}); await p.waitForTimeout(400); await p.screenshot({ path: `${v}-cover.png` }); }
await b.close(); })();
