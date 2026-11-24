import re
TOTAL=10
def rb(s):  # {漢字|かな} -> ruby
    return re.sub(r'\{([^|}]+)\|([^}]+)\}',r'<ruby>\1<rt>\2</rt></ruby>',s)
def head(i,tag="JLPT TRAP · SAME SOUND"):
    return f'<div class="grain"></div><div class="tag">{tag}</div><div class="num">{i}/{TOTAL}</div><div class="hand">@raj_in_jp</div>'
sw='<div class="swipe">swipe →</div>'
out=[]
out.append(f'''<section class="s">{head(1)}
<div class="h" style="top:170px;font-size:104px">SAME SOUND.<br><span class="o">DIFFERENT</span><br>KANJI.</div>
<div class="h sub" style="top:560px;font-size:42px">The JLPT tests this. Can you pick? 👀</div>
<div class="sound" style="top:700px">あう</div>
<div class="fan"><div class="opt">会う</div><div class="opt">合う</div><div class="opt">遭う</div></div>
<div class="h" style="top:1150px;font-size:40px;color:var(--teal)">Part 1 · あう · 3 kanji, 1 easy trick</div>
{sw}</section>''')
out.append(f'''<section class="s">{head(2)}
<div class="h" style="top:150px;font-size:76px">Why this <span class="o">matters</span></div>
<div class="h sub" style="top:330px;font-size:40px;line-height:1.3">The JLPT shows a word in hiragana<br>and asks you to choose the kanji.</div>
<div class="card q">
 <div class="qh">問題　Choose the correct kanji.</div>
 <div class="qs jp">{rb("{駅|えき}で{友|とも}だちに <u>あう</u>。")}</div>
 <div class="qo jp"><span>① 会う</span><span>② 合う</span><span>③ 遭う</span></div>
</div>
<div class="h" style="top:960px;font-size:46px">Every option <span class="o">sounds the same.</span><br>Only the <span class="t">meaning</span> picks the answer.</div>
{sw}</section>''')
K=[("会","meet a person","〜に会う / 〜と会う",
    [("{駅|えき}で{友|とも}だちに<b>{会|あ}う</b>。","I meet a friend at the station."),
     ("{明日|あした}、{先生|せんせい}に<b>{会|あ}います</b>。","I'll meet my teacher tomorrow.")],
    "🔑 会 → 会社 · 会議 · always PEOPLE"),
   ("合","fit · match","〜が合う",
    [("{靴|くつ}のサイズが<b>{合|あ}わない</b>。","My shoe size doesn't fit."),
     ("{答|こた}えが<b>{合|あ}って</b>いる。","The answer is correct.")],
    "🔑 合 → 合格 (pass) · 試合 (match)"),
   ("遭","run into something bad","〜に遭う",
    [("{帰|かえ}り{道|みち}で{事故|じこ}に<b>{遭|あ}った</b>。","I had an accident on the way home."),
     ("{旅行|りょこう}{中|ちゅう}に{地震|じしん}に<b>{遭|あ}った</b>。","I was hit by an earthquake on my trip.")],
    "🔑 ⻌ = road → trouble you meet on the road")]
for n,(k,m,p,exs,tip) in enumerate(K):
    i=n+3
    e=''.join(f'<div class="card ex" style="top:{560+j*275}px"><div class="js">{rb(a)}</div><div class="en">{b}</div></div>' for j,(a,b) in enumerate(exs))
    out.append(f'''<section class="s">{head(i,f"あう · {n+1} OF 3")}
<div class="card big"><div class="bk">{k}<span>う</span></div><div><div class="bm">{m}</div><div class="bp">{p}</div></div></div>
{e}<div class="tip" style="top:1140px"><span>{tip}</span></div>{sw}</section>''')
out.append(f'''<section class="s">{head(6,"THE 1-SECOND TRICK")}
<div class="h" style="top:150px;font-size:76px">Ask <span class="o">one</span> question</div>
<div class="h sub" style="top:260px;font-size:42px">What are you meeting?</div>
<div class="card flow" style="top:380px">
 <div class="fr"><div class="fq">👤 a person</div><div class="arrow">→</div><div class="fa">会<span>う</span></div></div>
 <div class="fr"><div class="fq">🧩 something fits or matches</div><div class="arrow">→</div><div class="fa">合<span>う</span></div></div>
 <div class="fr"><div class="fq">⚠️ something bad happens</div><div class="arrow">→</div><div class="fa">遭<span>う</span></div></div>
</div>
<div class="h" style="top:1120px;font-size:48px"><span class="o">Person</span> · <span class="t">Fit</span> · Trouble</div>
{sw}</section>''')
out.append(f'''<section class="s">{head(7,"BONUS")}
<div class="card big" style="top:170px"><div class="bk">逢<span>う</span></div><div><div class="bm">a special, fated meeting</div><div class="bp">songs · dramas · novels</div></div></div>
<div class="card ex" style="top:560px"><div class="js">また<b>{rb("{逢|あ}う")}</b>{rb("{日|ひ}")}まで</div><div class="en">"Until the day we meet again" · a famous 1971 song title</div></div>
<div class="h" style="top:850px;font-size:44px;line-height:1.25">逢 is <span class="o">not a jōyō kanji</span>,<br>so the JLPT won't ask you to pick it.<br><span class="sub" style="font-size:36px">But now you'll recognise it in lyrics 🎵</span></div>
{sw}</section>''')
Q=[("この{服|ふく}はサイズがぴったり <u>あう</u>。"),("{旅行|りょこう}{先|さき}で{事故|じこ}に <u>あった</u>。"),("{久|ひさ}しぶりに{母|はは}に <u>あった</u>。")]
qs=''
for j,q in enumerate(Q):
    oku='う' if j==0 else 'った'
    qs+=f'<div class="card qz" style="top:{380+j*250}px"><div class="qn">{j+1}</div><div><div class="qs jp" style="line-height:1.6">{rb(q)}</div><div class="qo jp"><span>Ⓐ 会{oku}</span><span>Ⓑ 合{oku}</span><span>Ⓒ 遭{oku}</span></div></div></div>'
out.append(f'''<section class="s">{head(8,"QUICK TEST")}
<div class="h" style="top:150px;font-size:86px">Your <span class="o">turn</span> ✍️</div>
<div class="h sub" style="top:280px;font-size:40px">Pick the right kanji.</div>
{qs}<div class="h" style="top:1150px;font-size:40px">Comment your answers 👇 <span class="t">(like 1A 2A 3A)</span></div>{sw}</section>''')
out.append(f'''<section class="s">{head(9,"SCREENSHOT THIS 📸")}
<div class="h" style="top:150px;font-size:80px">The <span class="o">cheat sheet</span></div>
<div class="card flow" style="top:320px">
 <div class="fr"><div class="fa">会<span>う</span></div><div class="fq jp" style="font-size:38px">a person<br><span style="font-weight:500;color:var(--muted)">{rb("{友|とも}だちに{会|あ}う")}</span></div></div>
 <div class="fr"><div class="fa">合<span>う</span></div><div class="fq jp" style="font-size:38px">fits · matches<br><span style="font-weight:500;color:var(--muted)">{rb("サイズが{合|あ}う")}</span></div></div>
 <div class="fr"><div class="fa">遭<span>う</span></div><div class="fq jp" style="font-size:38px">trouble<br><span style="font-weight:500;color:var(--muted)">{rb("{事故|じこ}に{遭|あ}う")}</span></div></div>
 <div class="fr"><div class="fa" style="opacity:.55">逢<span>う</span></div><div class="fq jp" style="font-size:34px;color:var(--muted)">bonus · songs &amp; dramas</div></div>
</div>
{sw}</section>''')
out.append(f'''<section class="s">{head(10,"NIHONGO × JLPT")}
<img src="logo.png" style="position:absolute;left:50%;top:170px;width:260px;margin-left:-130px;border-radius:50%">
<div class="h" style="top:490px;font-size:76px">Save this for<br><span class="o">exam day</span> 📌</div>
<div class="h sub" style="top:720px;font-size:42px;line-height:1.3">Part 2 next: はやい · 早い or 速い?<br>Free JLPT notes → link in bio</div>
<div style="position:absolute;top:960px;left:0;right:0;display:flex;justify-content:center;gap:40px">
 <div class="btn" style="background:var(--card)">📌 Save</div><div class="btn" style="background:var(--acc);color:#fff">+ Follow</div></div>
</section>''')
css=open('style.css').read()
open('slides.html','w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>'+'\n'.join(out)+'</body></html>')
