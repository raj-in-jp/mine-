const {chromium}=require('playwright');const fs=require('fs');(async()=>{fs.mkdirSync('ov',{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/ov.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const st=process.argv.slice(2).map(Number); const ts= st.length? st : [...Array(375).keys()].map(i=>i/30);
for(let i=0;i<ts.length;i++){await p.evaluate(t=>window.render(t),ts[i]);await p.screenshot({path:st.length?`still_${ts[i]}.png`:`ov/${String(i).padStart(4,'0')}.png`,omitBackground:true});}
await b.close()})()
