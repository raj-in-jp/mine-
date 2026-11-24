const { chromium } = require('playwright');
(async () => {
  const [reel, ...times] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => m.type()==='error' && console.log('CONSOLE', m.text()));
  await p.goto(`http://localhost:8766/reel4.html?r=${reel}`); await p.waitForFunction('window.READY', null, { timeout: 30000 });
  for (const t of times) { await p.evaluate(t => render(+t), t); await p.screenshot({ path: `chk/${reel}-${t}.jpg`, type:'jpeg', quality:70, clip:{x:0,y:0,width:1080,height:1920} }); }
  await b.close();
})();
