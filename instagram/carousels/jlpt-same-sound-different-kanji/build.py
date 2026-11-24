import html
TOTAL=11
WORDS=[
 ("あう",[("会","う","meet a person","駅で友だちに<b>会う</b>。","I meet a friend at the station.","会 = meeting → 会社, 会議"),
         ("合","う","fit · match","靴のサイズが<b>合わない</b>。","My shoe size doesn't fit.","合 = fit → 合格 (pass)"),
         ("遭","う","run into trouble","帰り道で事故に<b>遭った</b>。","I had an accident on the way home.","⻌ = road → trouble on the road")]),
 ("はやい",[("早","い","early (time)","朝<b>早く</b>起きる。","I wake up early.","日 sun on top → time of day"),
         ("速","い","fast (speed)","新幹線はとても<b>速い</b>。","The shinkansen is very fast.","⻌ = moving → speed")]),
 ("あつい",[("暑","い","hot weather","今日は<b>暑い</b>ですね。","It's hot today, isn't it?","日 sun on top → weather"),
         ("熱","い","hot to touch","このお茶は<b>熱い</b>。","This tea is hot.","灬 fire at the bottom → things"),
         ("厚","い","thick","<b>厚い</b>本を読んでいる。","I'm reading a thick book.","not temperature at all!")]),
 ("はかる",[("計","る","time · numbers","時間を<b>計る</b>。","I time it.","計 → 時計 (clock)"),
         ("測","る","length · height","部屋の長さを<b>測る</b>。","I measure the room's length.","測 → 測定 (measurement)"),
         ("量","る","weight · amount","体重を<b>量る</b>。","I weigh myself.","量 = amount → 分量")]),
 ("とる",[("取","る","take · get","メモを<b>取る</b>。","I take notes.","the everyday 'take'"),
         ("撮","る","take a photo/video","写真を<b>撮る</b>。","I take a photo.","撮 → 撮影 (filming)"),
         ("採","る","hire · pick","新しい社員を<b>採る</b>。","We hire new staff.","採 → 採用 (hiring)")]),
 ("かえる",[("帰","る","go home","家に<b>帰る</b>。","I go home.","帰 → 帰国 (return to your country)"),
         ("変","える","change","予定を<b>変える</b>。","I change my plans.","変 → 変化 (change)")]),
]
def head(i,tag="JLPT TRAP · SAME SOUND"):
    return f'<div class="grain"></div><div class="tag">{tag}</div><div class="num">{i}/{TOTAL}</div><div class="hand">@raj_in_jp</div>'
def sw(): return '<div class="swipe">swipe →</div>'
out=[]
# 1 cover
out.append(f'''<section class="s">{head(1)}
<div class="h" style="top:170px;font-size:104px">SAME SOUND.<br><span class="o">DIFFERENT</span><br>KANJI.</div>
<div class="h sub" style="top:560px;font-size:42px">The JLPT tests this. Can you pick? 👀</div>
<div class="sound" style="top:700px">あう</div>
<div class="fan">
 <div class="opt">会う</div><div class="opt">合う</div><div class="opt">遭う</div>
</div>
<div class="h" style="top:1150px;font-size:40px;color:var(--teal)">6 sounds · 15 kanji · 1 trick each</div>
{sw()}</section>''')
# 2 stake
out.append(f'''<section class="s">{head(2)}
<div class="h" style="top:150px;font-size:76px">Why this <span class="o">matters</span></div>
<div class="h sub" style="top:330px;font-size:40px;line-height:1.3">The JLPT shows a word in hiragana<br>and asks you to choose the kanji.</div>
<div class="card q">
 <div class="qh">問題　Choose the correct kanji.</div>
 <div class="qs jp">駅で友だちに <u>あう</u>。</div>
 <div class="qo jp"><span>① 会う</span><span>② 合う</span><span>③ 遭う</span></div>
</div>
<div class="h" style="top:930px;font-size:46px">Every option <span class="o">sounds the same.</span><br>Only the <span class="t">meaning</span> picks the answer.</div>
{sw()}</section>''')
# word slides
for n,(snd,rows) in enumerate(WORDS):
    i=n+3
    rh = 255 if len(rows)==3 else 330
    body=''
    for k,(kj,oku,mean,sent,eng,hint) in enumerate(rows):
        top=390+k*(rh+22)
        body+=f'''<div class="card row" style="top:{top}px;height:{rh}px">
 <div class="kj jp">{kj}<span>{oku}</span></div>
 <div class="info"><div class="mean">{mean}</div><div class="sent jp">{sent}</div><div class="eng">{eng}</div><div class="hint">🔑 {html.escape(hint)}</div></div></div>'''
    out.append(f'''<section class="s">{head(i)}
<div class="sound sm" style="top:140px">{snd}</div>
<div class="h sub" style="top:300px;font-size:36px">1 sound · {len(rows)} kanji</div>
{body}{sw()}</section>''')
# quiz
out.append(f'''<section class="s">{head(9,"QUICK TEST")}
<div class="h" style="top:150px;font-size:86px">Your <span class="o">turn</span> ✍️</div>
<div class="h sub" style="top:280px;font-size:40px">Pick the right kanji.</div>
<div class="card qz" style="top:390px"><div class="qn">1</div><div><div class="qs jp">お風呂のお湯が <u>あつい</u>。</div><div class="qo jp"><span>Ⓐ 暑い</span><span>Ⓑ 熱い</span><span>Ⓒ 厚い</span></div></div></div>
<div class="card qz" style="top:640px"><div class="qn">2</div><div><div class="qs jp">マラソンの時間を <u>はかる</u>。</div><div class="qo jp"><span>Ⓐ 計る</span><span>Ⓑ 測る</span><span>Ⓒ 量る</span></div></div></div>
<div class="card qz" style="top:890px"><div class="qn">3</div><div><div class="qs jp">旅行で写真を <u>とった</u>。</div><div class="qo jp"><span>Ⓐ 取った</span><span>Ⓑ 撮った</span><span>Ⓒ 採った</span></div></div></div>
<div class="h" style="top:1150px;font-size:40px">Comment your answers 👇 <span class="t">(like 1A 2B 3C)</span></div>
{sw()}</section>''')
# recap
rec=[("あう","会 person · 合 fit · 遭 trouble"),("はやい","早 time · 速 speed"),("あつい","暑 weather · 熱 touch · 厚 thick"),
     ("はかる","計 time · 測 length · 量 weight"),("とる","取 take · 撮 photo · 採 hire"),("かえる","帰 go home · 変 change")]
rows=''.join(f'<div class="rr"><div class="rs jp">{a}</div><div class="rc jp">{b}</div></div>' for a,b in rec)
out.append(f'''<section class="s">{head(10,"SCREENSHOT THIS 📸")}
<div class="h" style="top:150px;font-size:80px">The <span class="o">cheat sheet</span></div>
<div class="card recap">{rows}</div>
<div class="h sub" style="top:1190px;font-size:34px">Person? Time? Speed? Weight? → pick the kanji.</div>
{sw()}</section>''')
# cta
out.append(f'''<section class="s">{head(11,"NIHONGO × JLPT")}
<img src="logo.png" style="position:absolute;left:50%;top:170px;width:260px;margin-left:-130px;border-radius:50%">
<div class="h" style="top:490px;font-size:76px">Save this for<br><span class="o">exam day</span> 📌</div>
<div class="h sub" style="top:720px;font-size:42px;line-height:1.3">Part 2 next: more JLPT traps.<br>Free JLPT notes → link in bio</div>
<div style="position:absolute;top:960px;left:0;right:0;display:flex;justify-content:center;gap:40px">
 <div class="btn" style="background:var(--card)">📌 Save</div><div class="btn" style="background:var(--acc);color:#fff">+ Follow</div></div>
</section>''')
css=open('style.css').read()
open('slides.html','w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>'+'\n'.join(out)+'</body></html>')
