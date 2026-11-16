const {chromium}=require('playwright');const fs=require('fs');(async()=>{
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/reel.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const st=process.argv.slice(2).map(Number); if(!st.length) fs.mkdirSync('fr',{recursive:true});
const ts=st.length?st:[...Array(720).keys()].map(i=>i/30);
for(let i=0;i<ts.length;i++){await p.evaluate(t=>window.render(t),ts[i]);await p.screenshot({path:st.length?`s_${i}.png`:`fr/${String(i).padStart(4,'0')}.jpg`,type:st.length?'png':'jpeg',quality:st.length?undefined:92});}
await b.close()})()
