import re
TOTAL=8
def rb(s): return re.sub(r'\{([^|}]+)\|([^}]+)\}',r'<ruby>\1<rt>\2</rt></ruby>',s)
def head(i,tag="JLPT TRAP · SAME SOUND"):
    return f'<div class="grain"></div><div class="tag">{tag}</div><div class="num">{i}/{TOTAL}</div><div class="hand">@raj_in_jp</div>'
sw='<div class="swipe">swipe →</div>'
out=[]
out.append(f'''<section class="s">{head(1)}
<div class="h" style="top:170px;font-size:104px">SAME SOUND.<br><span class="o">DIFFERENT</span><br>KANJI.</div>
<div class="h sub" style="top:560px;font-size:42px">The JLPT tests this. Can you pick? 👀</div>
<div class="sound" style="top:700px">はやい</div>
<div class="fan"><div class="opt">早い</div><div class="opt">速い</div></div>
<div class="h" style="top:1150px;font-size:40px;color:var(--teal)">Part 2 · はやい · 2 kanji, 1 easy trick</div>
{sw}</section>''')
out.append(f'''<section class="s">{head(2)}
<div class="h" style="top:150px;font-size:76px">Why this <span class="o">matters</span></div>
<div class="h sub" style="top:330px;font-size:40px;line-height:1.3">Both are read はやい.<br>But only one is correct.</div>
<div class="card q">
 <div class="qh">問題　Choose the correct kanji.</div>
 <div class="qs jp">{rb("{新幹線|しんかんせん}はとても <u>はやい</u>。")}</div>
 <div class="qo jp"><span>① 早い</span><span>② 速い</span></div>
</div>
<div class="h" style="top:960px;font-size:46px"><span class="o">"Early"</span> and <span class="o">"fast"</span><br>get <span class="t">different kanji</span>.</div>
{sw}</section>''')
K=[("早","early · soon","about TIME",
    [("{朝|あさ}<b>{早|はや}く</b>{起|お}きる。","I wake up early in the morning."),
     ("まだ{寝|ね}るには<b>{早|はや}い</b>。","It's still too early to sleep.")],
    "🔑 日 (sun) on top → time · 早朝"),
   ("速","fast · quick","about SPEED",
    [("{新幹線|しんかんせん}はとても<b>{速|はや}い</b>。","The shinkansen is very fast."),
     ("{彼|かれ}は{走|はし}るのが<b>{速|はや}い</b>。","He runs fast.")],
    "🔑 ⻌ = moving → speed · 速度 (speed)")]
for n,(k,m,p,exs,tip) in enumerate(K):
    e=''.join(f'<div class="card ex" style="top:{560+j*275}px"><div class="js">{rb(a)}</div><div class="en">{b}</div></div>' for j,(a,b) in enumerate(exs))
    out.append(f'''<section class="s">{head(n+3,f"はやい · {n+1} OF 2")}
<div class="card big"><div class="bk">{k}<span>い</span></div><div><div class="bm">{m}</div><div class="bp">{p}</div></div></div>
{e}<div class="tip" style="top:1140px"><span>{tip}</span></div>{sw}</section>''')
out.append(f'''<section class="s">{head(5,"THE 1-SECOND TRICK")}
<div class="h" style="top:150px;font-size:76px">Ask <span class="o">one</span> question</div>
<div class="h sub" style="top:260px;font-size:42px">WHEN? or HOW FAST?</div>
<div class="card flow" style="top:380px">
 <div class="fr"><div class="fq">⏰ when it happens</div><div class="arrow">→</div><div class="fa">早<span>い</span></div></div>
 <div class="fr"><div class="fq">🚄 how fast it moves</div><div class="arrow">→</div><div class="fa">速<span>い</span></div></div>
</div>
<div class="card ex" style="top:840px"><div class="js" style="font-size:44px">Fun fact: both have the <b>same opposite</b> → {rb("{遅|おそ}い")}</div><div class="en">遅い = late AND slow</div></div>
{sw}</section>''')
out.append(f'''<section class="s">{head(6,"BONUS")}
<div class="card big" style="top:170px"><div class="bk">早口</div><div><div class="bm">はやくち<br>talking fast</div><div class="bp">uses 早, not 速!</div></div></div>
<div class="card ex" style="top:560px"><div class="js">{rb("{先生|せんせい}は<b>{早口|はやくち}</b>だ。")}</div><div class="en">My teacher talks fast.</div></div>
<div class="h" style="top:850px;font-size:44px;line-height:1.25">It's about speed, but the word is<br><span class="o">fixed as 早口</span>.<br><span class="sub" style="font-size:36px">Learn it as one word, not with the trick 🧠</span></div>
{sw}</section>''')
Q=["{明日|あした}は{朝|あさ} <u>はやく</u> {出|で}かける。","うちのインターネットは <u>はやい</u>。","{今年|ことし}は{冬|ふゆ}が{来|く}るのが <u>はやい</u>。"]
qs=''
for j,q in enumerate(Q):
    oku='く' if j==0 else 'い'
    qs+=f'<div class="card qz" style="top:{380+j*250}px"><div class="qn">{j+1}</div><div><div class="qs jp" style="line-height:1.6">{rb(q)}</div><div class="qo jp"><span>Ⓐ 早{oku}</span><span>Ⓑ 速{oku}</span></div></div></div>'
out.append(f'''<section class="s">{head(7,"QUICK TEST")}
<div class="h" style="top:150px;font-size:86px">Your <span class="o">turn</span> ✍️</div>
<div class="h sub" style="top:280px;font-size:40px">Pick the right kanji.</div>
{qs}<div class="h" style="top:1150px;font-size:40px">Comment your answers 👇 <span class="t">(like 1B 2A 3B)</span></div>{sw}</section>''')
out.append(f'''<section class="s">{head(8,"NIHONGO × JLPT")}
<img src="logo.png" style="position:absolute;left:50%;top:170px;width:260px;margin-left:-130px;border-radius:50%">
<div class="h" style="top:490px;font-size:76px">Save this for<br><span class="o">exam day</span> 📌</div>
<div class="h sub" style="top:720px;font-size:42px;line-height:1.3">Free JLPT notes → link in bio</div>
<div style="position:absolute;top:960px;left:0;right:0;display:flex;justify-content:center;gap:40px">
 <div class="btn" style="background:var(--card)">📌 Save</div><div class="btn" style="background:var(--acc);color:#fff">+ Follow</div></div>
</section>''')
css=open('style.css').read()
open('slides.html','w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>'+'\n'.join(out)+'</body></html>')
