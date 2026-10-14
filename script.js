'use strict';
/* ============ ١) بيانات عامة (عدّلي الأسئلة من قسم BANK و BUILD أدناه) ============ */
const COL={red:['أحمر','#e63946','حمراء','حمراوين'],blue:['أزرق','#1e78d6','زرقاء','زرقاوين'],yellow:['أصفر','#f6b800','صفراء','صفراوين'],green:['أخضر','#2ea44f','خضراء','خضراوين']};
const LABELS=['مستحيل','أقل احتمالًا','متساوي الإمكانية','أكثر احتمالًا','مؤكد'];
const LV=[
{n:'التذكر',i:'🧠',c:'#e63946',s:'التعرّف على مصطلحات الاحتمال',m:'تذكّري معنى كل كلمة من كلمات الاحتمال.'},
{n:'الفهم',i:'💡',c:'#f77f00',s:'تفسير معنى الاحتمال',m:'فكّري، ثم اشرحي سبب إجابتكِ.'},
{n:'التطبيق',i:'🎯',c:'#d99a00',s:'تطبيق الاحتمال على مواقف',m:'طبّقي ما تعلّمتِ على الأكياس والعجلة والمكعب.'},
{n:'التحليل',i:'🔍',c:'#2a9d4a',s:'مقارنة الاحتمالات وتحليلها',m:'عدّي الكرات في كل صندوق ثم قارني.'},
{n:'التقييم',i:'⚖️',c:'#1d6fd8',s:'الحكم على آراء الآخرين',m:'احكمي على رأي الطالبة، واذكري الدليل.'},
{n:'الإبداع',i:'🎨',c:'#8e44ad',s:'تصميم حالات احتمال',m:'هيا نبتكر! أضيفي الكرات واحذفيها حتى يتحقق الشرط.'}];
const TR=[{n:'المستكشفة',i:'🧭',d:'أسئلة بسيطة مع صور وتلميحات'},{n:'المحللة',i:'🧩',d:'مقارنة احتمالات وتفسير النتائج'},{n:'المبدعة',i:'🌟',d:'تصميم أكياس وتبرير الاختيارات'}];
const BADGE=['ذاكرة ذهبية','فاهمة ذكية','مطبّقة ماهرة','محلّلة بارعة','خبيرة التقييم','مبدعة الاحتمال'];
const MAXQ=18,KEY='bloomProb_v2';

/* ============ ٢) دوال الرياضيات ============ */
const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const sum=b=>Object.values(b).reduce((a,x)=>a+x,0);
// تصنيف احتمال لون: 0 مستحيل، 1 أقل، 2 متساوي، 3 أكثر، 4 مؤكد (بمقارنة اللون بأكثر لون آخر عددًا)
const cls=(b,c)=>{const k=b[c]||0,n=sum(b);if(!k)return 0;if(k===n)return 4;const m=Math.max(0,...Object.keys(b).filter(x=>x!==c).map(x=>b[x]));return k<m?1:k===m?2:3};
const most=b=>Object.keys(b).sort((x,y)=>b[y]-b[x])[0];
const K=(n,c)=>n==1?`كرة ${COL[c][2]} واحدة`:n==2?`كرتين ${COL[c][3]}`:`${ar(n)} ${n<11?'كرات':'كرة'} ${COL[c][2]}`;
const bt=b=>Object.keys(b).filter(c=>b[c]).map(c=>K(b[c],c)).join(' و');
// خيارات تسميات الاحتمال: الصحيح أولًا (يُخلط عند العرض)
const lo=(a,T)=>{const p=T==0&&[0,2,4].includes(a)?[0,2,4]:[0,1,2,3,4];return[LABELS[a],...p.filter(x=>x!==a).map(x=>LABELS[x])]};
const mo=b=>{const c=most(b);return[COL[c][0],...Object.keys(b).filter(x=>x!==c).map(x=>COL[x][0])]};

/* ============ ٣) بنك الأسئلة ============
 كل سؤال: parts = أسئلة فرعية، كل جزء: q نص، o خيارات (الصحيح أولًا ما لم يُحدَّد a)، s:0 لمنع الخلط
 h تلميح، e تفسير، bags رسوم، txt نص تمهيدي. المصفوفة T = رقم المسار (0 مستكشفة، 1 محللة، 2 مبدعة) */
const BANK=T=>{
const n=a=>a[T],E=(q,o,h,e,x)=>({parts:[{q,o}],h,e,...x}),F=(q,v,h,e,x)=>({parts:[{q,o:['صح','خطأ'],a:v?0:1,s:0}],h,e,...x}),bg=(b,t)=>({b,t});
let k,x,y,B,W,c,r,g;
return[[
 (k=n([5,6,8]),E('ما احتمال سحب كرة زرقاء من هذا الكيس؟',lo(0,T),'هل توجد كرة زرقاء داخل الكيس؟','لا توجد أي كرة زرقاء، لذلك سحبها مستحيل.',{txt:`يحتوي الكيس على ${K(k,'red')} فقط.`,bags:[bg({red:k})]})),
 (k=n([3,5,9]),F('سحب كرة صفراء من هذا الكيس مؤكد.',true,'هل في الكيس لون آخر غير الأصفر؟','كل الكرات صفراء، فسحب كرة صفراء مؤكد.',{txt:`يحتوي الكيس على ${K(k,'yellow')} فقط.`,bags:[bg({yellow:k})]})),
 (k=n([2,4,5]),F('سحب كرة حمراء وسحب كرة زرقاء متساويان في الإمكانية.',true,'قارني عدد الحمراء بعدد الزرقاء.','عدد الحمراء يساوي عدد الزرقاء، فلكل لون الفرصة نفسها.',{txt:`يحتوي الكيس على ${K(k,'red')} و${K(k,'blue')}.`,bags:[bg({red:k,blue:k})]}))
],[
 (B=n([[3,2],[5,3],[7,4]]),{parts:[{q:'أي اللونين أكثر احتمالًا عند سحب كرة واحدة عشوائيًا؟',o:['أحمر','أزرق','متساويان']},{q:'لماذا؟',o:['لأن عدد الكرات الحمراء أكبر من عدد الكرات الزرقاء','لأن اللون الأحمر أجمل','لأن اللون الأزرق ذُكر أولًا']}],h:'عدّي كل لون وقارني.',e:'الكرات الحمراء أكثر عددًا، فسحب الأحمر أكثر احتمالًا (وليس مؤكدًا).',txt:`يحتوي الكيس على ${bt({red:B[0],blue:B[1]})}.`,bags:[bg({red:B[0],blue:B[1]})]}),
 (B=n([[5,1],[6,1],[7,2]]),E('هل سحب كرة زرقاء مؤكد؟ ولماذا؟',['لا؛ لأن الكيس يحتوي أيضًا على كرات حمراء','نعم؛ لأن الأزرق هو الأكثر عددًا','نعم؛ لأن الكيس كبير'],'المؤكد يعني أنه لا يوجد أي احتمال آخر.','الأزرق أكثر احتمالًا، لكنه ليس مؤكدًا لوجود كرات حمراء.',{bags:[bg({blue:B[0],red:B[1]})]})),
 (k=n([4,5,6]),E('ما معنى أن سحب الكرة الحمراء «أقل احتمالًا»؟',['يمكن أن تُسحب لكن فرصتها أقل من غيرها','لا يمكن أن تُسحب أبدًا','ستُسحب في كل مرة'],'هل توجد كرة حمراء في الكيس؟','«أقل احتمالًا» يعني أن الحدث ممكن، لكن فرصته أقل.',{bags:[bg({red:1,blue:k})]}))
],[
 (B=n([{red:2,yellow:4},{red:3,yellow:5,blue:2},{red:4,yellow:3,blue:3,green:1}]),E('ما اللون الأكثر احتمالًا عند سحب كرة واحدة دون النظر؟',mo(B),'قارني عدد كل لون بالألوان الأخرى.',`اللون الأكثر عددًا هو الأكثر احتمالًا: ${COL[most(B)][0]}.`,{txt:`يحتوي الكيس على ${bt(B)}.`,bags:[bg(B)]})),
 (c=n([['العدد ٧',0,'لا يوجد العدد ٧ على المكعب، فظهوره مستحيل.'],['عددًا أقل من ٧',4,'كل أعداد المكعب (١ إلى ٦) أقل من ٧، فهو مؤكد.'],['عددًا زوجيًا',2,'الأعداد الزوجية: ٢ و٤ و٦ (ثلاثة)، والفردية: ١ و٣ و٥ (ثلاثة)، فهما متساويان.']]),E(`🎲 عند رمي مكعب أعداد مرقم من ١ إلى ٦، ما احتمال ظهور ${c[0]}؟`,lo(c[1],T),'اكتبي أعداد المكعب ثم عدّي الأعداد المناسبة.',c[2])),
 (W=n([[{blue:3,yellow:1},'yellow'],[{red:2,blue:2,green:1},'green'],[{red:1,blue:3,yellow:2},'red']]),E(`تدور العجلة وتتوقف عشوائيًا. ما احتمال أن تتوقف عند اللون ${COL[W[1]][0]}؟`,lo(cls(W[0],W[1]),T),'قارني عدد أجزاء هذا اللون بعدد أجزاء كل لون آخر.','أجزاء هذا اللون أقل من غيرها، فهو أقل احتمالًا.',{bags:[bg(W[0],'عجلة الحظ')],wheel:1}))
],[
 ([x,y]=n([[4,1],[5,2],[6,3]]),{parts:[{q:'كم كرة حمراء في الصندوق الأول؟',o:[ar(x),ar(y),ar(x+y)]},{q:'ما أوجه الاختلاف بين الصندوقين؟',o:['العدد الكلي واحد، لكن اختلف عدد الكرات الحمراء والزرقاء','اختلف العدد الكلي للكرات فقط','لا يوجد أي اختلاف']},{q:'أيهما يجعل سحب الكرة الحمراء أكثر احتمالًا؟',o:['الصندوق الأول','الصندوق الثاني','متساويان']}],h:'عدّي الكرات الحمراء في كل صندوق قبل الإجابة.',e:'في الصندوق الأول الحمراء أكثر من الزرقاء، فسحب الحمراء منه أكثر احتمالًا.',bags:[bg({red:x,blue:y},'الصندوق الأول'),bg({red:y,blue:x},'الصندوق الثاني')]}),
 (r=n([5,6,7]),E('أي الصندوقين يجعل سحب الأحمر وسحب الأزرق متساويي الإمكانية؟',['الصندوق الأول','الصندوق الثاني','كلاهما'],'ابحثي عن الصندوق الذي يتساوى فيه عدد الحمراء والزرقاء.','في الصندوق الأول ٣ حمراء و٣ زرقاء، فالفرصة متساوية.',{bags:[bg({red:3,blue:3},'الصندوق الأول'),bg({red:r,blue:1},'الصندوق الثاني')]})),
 ([x,y]=n([[4,1],[5,2],[6,3]]),F('الصندوقان يحتويان العدد نفسه من الكرات، لذلك فاحتمال سحب الحمراء متساوٍ فيهما.',false,'العدد الكلي واحد، فهل توزيع الألوان واحد أيضًا؟','العدد الكلي متساوٍ، لكن توزيع الألوان مختلف، فاحتمال الحمراء ليس متساويًا.',{bags:[bg({red:x,blue:y},'الصندوق الأول'),bg({red:y,blue:x},'الصندوق الثاني')]}))
],[
 ([r,y]=n([[3,7],[4,9],[5,11]]),E('هل توافقين على رأي الطالبة؟ ولماذا؟',[`لا أوافق؛ لأن عدد الكرات الزرقاء (${ar(y)}) أكبر من عدد الكرات الحمراء (${ar(r)})`,'أوافق؛ لأن كلمة «حمراء» مكتوبة أولًا',`أوافق؛ لأن ${ar(r)} أقل من ${ar(y)}`],'قارني عدد الحمراء بعدد الزرقاء.','الزرقاء أكثر عددًا، فسحب الأزرق هو الأكثر احتمالًا.',{txt:`قالت سارة: «يوجد في الكيس ${K(r,'red')} و${K(y,'blue')}، ولذلك فإن سحب كرة حمراء أكثر احتمالًا».`,bags:[bg({red:r,blue:y})]})),
 (k=n([3,4,5]),E('هل توافقين على رأي الطالبة؟',['لا أوافق؛ فالمؤكد يعني أن كل الكرات خضراء، وهنا الحمراء بعدد الخضراء','أوافق؛ لأن الأخضر موجود في الكيس','أوافق؛ لأن الأعداد متساوية'],'متى يكون الحدث مؤكدًا؟','سحب الأخضر ممكن لكنه ليس مؤكدًا، وهو متساوي الإمكانية مع الأحمر.',{txt:`قالت نوف: «يحتوي الكيس على ${K(k,'green')} و${K(k,'red')}، لذلك سحب كرة خضراء مؤكد».`,bags:[bg({green:k,red:k})]})),
 (k=n([5,6,8]),E('هل توافقين على رأي الطالبة؟',['لا أوافق؛ الأكثر احتمالًا لا يعني مؤكدًا، فقد تظهر كرة زرقاء','أوافق؛ لأن الأحمر أكثر','أوافق؛ لأن الاحتمال يحدد النتيجة دائمًا'],'هل الأكثر احتمالًا هو نفسه المؤكد؟','الاحتمال يخبرنا عن الفرصة، أما نتيجة السحب الفعلية فقد تختلف في كل مرة.',{txt:'قالت ريم: «الأحمر أكثر احتمالًا في هذا الكيس، لذلك سأسحب كرة حمراء في المرة القادمة بالتأكيد».',bags:[bg({red:k,blue:2})]}))
],[]];};
// تحديات الإبداع (المستوى السادس): ok تتحقق من تصميم الطالبة
const BUILD=[
{g:'اجعلي سحب كرة حمراء أكثر احتمالًا.',ok:b=>cls(b,'red')===3,h:'ضعي عددًا من الكرات الحمراء أكبر من عدد أي لون آخر.'},
{g:'صمّمي كيسًا يجعل سحب الأحمر والأزرق متساويي الإمكانية.',ok:b=>b.red>0&&b.red===b.blue&&!b.green&&!b.yellow,h:'اجعلي عدد الحمراء مساويًا لعدد الزرقاء، ولا تضعي ألوانًا أخرى.'},
{g:'ابتكري كيسًا يكون فيه سحب الكرة الخضراء مستحيلًا.',ok:b=>!b.green,h:'لا تضعي أي كرة خضراء في الكيس.'}];

/* ============ ٤) الحالة والتخزين المحلي ============ */
const $=s=>document.querySelector(s),app=$('#app');
let S=null,H=[],cur=null,BG={},bid=0,BD={},tsel=0;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');H=d.hist||[];S=d.cur||null}catch(e){H=[];S=null}}
function save(){try{if(S){H=H.filter(x=>x.id!==S.id);if(S.fin)H.push(JSON.parse(JSON.stringify(S)))}localStorage.setItem(KEY,JSON.stringify({cur:S,hist:H}))}catch(e){}}
const newS=t=>{S={id:Date.now(),name:'',track:t,pts:0,right:0,wrong:0,fin:false,lv:LV.map(()=>({d:0,ft:0,r:0,w:0,p:0}))};save()};
const done=()=>S.lv.reduce((a,l)=>a+l.d,0);
const stats=s=>{const ft=s.lv.reduce((a,l)=>a+l.ft,0);return{score:Math.round(s.pts/(MAXQ*10)*100),mast:Math.round(ft/MAXQ*100)}};
const prog=()=>`<div class="prog"><div style="width:${done()/MAXQ*100}%"></div><span>التقدم: ${ar(done())} من ${ar(MAXQ)}</span></div>`;
const stars=n=>'⭐'.repeat(n)+'☆'.repeat(3-n);
const owl=m=>`<div class="guide"><svg viewBox="0 0 80 80" width="76" height="76" aria-hidden="true"><path d="M18 22l8 8-10 2zM62 22l-8 8 10 2z" fill="#8d5a2b"/><ellipse cx="40" cy="46" rx="26" ry="28" fill="#8d5a2b"/><ellipse cx="40" cy="55" rx="16" ry="17" fill="#f3d9a4"/><circle cx="30" cy="36" r="10" fill="#fff"/><circle cx="50" cy="36" r="10" fill="#fff"/><circle cx="31" cy="37" r="4.5" fill="#222"/><circle cx="49" cy="37" r="4.5" fill="#222"/><path d="M36 43l4 7 4-7z" fill="#f77f00"/></svg><div class="bubble" id="say">${m}</div></div>`;
const say=m=>{const e=$('#say');if(e)e.innerHTML=m};

/* ============ ٥) الرسوم: كيس، عجلة ============ */
const ball=c=>`<i class="ball" style="--c:${COL[c][1]}"></i>`;
function wheelHTML(b){const s=[];Object.keys(b).forEach(c=>{for(let i=0;i<b[c];i++)s.push(COL[c][1])});const d=360/s.length;return`<div class="wheelw"><div class="wheel" style="background:conic-gradient(${s.map((c,i)=>`${c} ${i*d}deg ${(i+1)*d-2}deg,#fff ${(i+1)*d-2}deg ${(i+1)*d}deg`).join(',')})"></div></div>`}
function fig(b,t,kind){const id='b'+(++bid);BG[id]=b;const body=kind==='wheel'?wheelHTML(b):`<div class="bag"><div class="balls">${Object.keys(b).map(c=>ball(c).repeat(b[c])).join('')}</div></div>`;
return`<figure class="fig">${t?`<figcaption>${t}</figcaption>`:''}${body}<div class="cnt">${Object.keys(b).filter(c=>b[c]).map(c=>`<span><i class="ball sm" style="--c:${COL[c][1]}"></i>×${ar(b[c])}</span>`).join('')}</div><button class="mini" data-draw="${id}" data-k="${kind||''}">${kind==='wheel'?'🎡 دوّري العجلة':'🤚 اسحبي كرة'}</button><div class="dr" id="r${id}"></div></figure>`}
function draw(t){const id=t.dataset.draw,b=BG[id],n=sum(b),out=$('#r'+id);if(!n){out.textContent='الكيس فارغ، أضيفي كرات أولًا.';return}
let r=Math.random()*n,c;for(c of Object.keys(b)){if((r-=b[c])<0)break}
out.textContent=(t.dataset.k==='wheel'?`توقفت العجلة عند اللون ${COL[c][0]}`:`سُحبت كرة ${COL[c][0]}`)+'. هذه نتيجة تجربة واحدة فقط؛ قد تختلف في كل مرة حتى لو كان لونٌ أكثر احتمالًا.'}

/* ============ ٦) الشاشات ============ */
function start(){cur=null;app.innerHTML=`<section class="card hero"><h2>🎯 مغامرة هرم بلوم في عالم الاحتمال</h2><p class="sub">فكّري، حلّلي، توقّعي، وأبدعي!</p>${owl('أهلًا بكِ! أنا البومة «حكيمة»، سأرافقكِ في رحلة الهرم. اختاري مسارك ثم اضغطي «ابدئي المغامرة».')}<h3>اختاري مسارك</h3><div class="tracks">${TR.map((t,i)=>`<button class="track${tsel===i?' on':''}" data-act="track" data-i="${i}"><span>${t.i}</span><b>${t.n}</b><small>${t.d}</small></button>`).join('')}</div><button class="big" data-act="go">ابدئي المغامرة 🚀</button>${S&&done()>0&&!S.fin?'<button class="big alt" data-act="home">متابعة المحاولة السابقة</button>':''}<p class="meta">المادة: الرياضيات · الصف الرابع الابتدائي · الدرس: الاحتمال<br>إعداد المعلمة: مريم علي</p></section>`}
function pyramid(){cur=null;const all=S.lv.every(l=>l.d>=3);app.innerHTML=`<section class="card">${prog()}<h2>هرم بلوم — مسار ${TR[S.track].n} ${TR[S.track].i}</h2>${owl('اضغطي على أي طبقة لتبدئي تحدّيها. أنصحكِ بالبدء من أسفل الهرم 👇')}<div class="pyr">${[5,4,3,2,1,0].map(i=>{const v=S.lv[i];return`<button class="layer" data-act="lv" data-i="${i}" style="--c:${LV[i].c};width:${100-i*12}%">${LV[i].i} ${ar(i+1)}. ${LV[i].n} ${v.d>=3?'✅ '+stars(v.ft>=3?3:v.ft==2?2:1):v.d>0?'▶ '+ar(v.d)+'/٣':''}</button>`}).join('')}</div><div class="row"><button class="big alt" data-act="fin" ${all?'':'disabled style="opacity:.5;cursor:not-allowed"'}>${all?'النتيجة النهائية 🏆':'أكملي المستويات الستة لتظهر النتيجة'}</button></div></section>`}
function enter(l){const d=S.lv[l].d;if(d>=3)return levelEnd(l);cur={l,i:d,att:0,sel:[],ord:[],done:false,Q:l<5?BANK(S.track)[l]:null};BD={red:0,blue:0,yellow:0,green:0,txt:''};question()}
function question(){const l=cur.l,L=LV[l],q=l===5?BUILD[cur.i]:cur.Q[cur.i];let body;
if(l===5)body=`<p class="qt">🎨 ${q.g}</p><div id="bld"></div>${S.track==2?`<label class="just">اكتبي تبريرًا لتصميمكِ:<textarea id="txt" rows="2">${esc(BD.txt)}</textarea></label>`:''}`;
else body=(q.txt?`<div class="stmt">${q.txt}</div>`:'')+(q.bags?`<div class="figs">${q.bags.map(z=>fig(z.b,z.t,q.wheel?'wheel':'')).join('')}</div>`:'')+q.parts.map((p,pi)=>{const ord=cur.ord[pi]||(cur.ord[pi]=p.s===0?p.o.map((_,i)=>i):shuf(p.o.map((_,i)=>i)));return`<div class="part"><p class="qt">${p.q}</p><div class="opts">${ord.map(oi=>`<button class="opt" data-p="${pi}" data-o="${oi}">${p.o[oi]}</button>`).join('')}</div></div>`}).join('');
app.innerHTML=`<section class="card" style="--c:${L.c}">${prog()}<span class="qhead">${L.i} المستوى ${ar(l+1)}: ${L.n} · السؤال ${ar(cur.i+1)} من ٣</span>${owl(L.m)}${body}<div id="fb"></div><div class="row"><button class="big" data-act="check">تحقّقي من الإجابة ✔</button><button class="mini" data-act="hint" ${cur.att>=[0,1,2][S.track]?'':'hidden'}>💡 تلميح</button><button class="mini alt" data-act="home">⬅ العودة للهرم</button></div></section>`;
if(l===5)bld();
cur.sel.forEach((o,pi)=>{if(o!=null){const b=app.querySelector(`.opt[data-p="${pi}"][data-o="${o}"]`);b&&b.classList.add('on')}})}
function bld(){const b={};Object.keys(COL).forEach(c=>{if(BD[c])b[c]=BD[c]});const n=sum(b);
$('#bld').innerHTML=`<div class="bag-edit">${Object.keys(COL).map(c=>`<div class="ctl"><i class="ball" style="--c:${COL[c][1]}"></i><b>${COL[c][0]}</b><button data-add="${c}" data-d="1" aria-label="إضافة">＋</button><span>${ar(BD[c])}</span><button data-add="${c}" data-d="-1" aria-label="حذف">－</button></div>`).join('')}</div>${fig(b,'كيسكِ')}<ul class="desc">${Object.keys(COL).map(c=>`<li>احتمال سحب كرة <b>${COL[c][0]}</b>: <b>${n?LABELS[cls(b,c)]:'—'}</b>${n?` (${ar(b[c]||0)} من ${ar(n)})`:''}</li>`).join('')}</ul>`}
function lockOpts(q){app.querySelectorAll('.opt').forEach(b=>{const p=+b.dataset.p,o=+b.dataset.o;b.disabled=true;if(o===(q.parts[p].a||0))b.classList.add('right');else if(cur.sel[p]===o)b.classList.add('bad')})}
function finish(html,q){const lv=S.lv[cur.l];cur.done=true;lv.d=Math.max(lv.d,cur.i+1);$('#fb').innerHTML=html+`<div class="row"><button class="big" data-act="next">${cur.i>=2?'إنهاء المستوى 🏁':'السؤال التالي ◀'}</button></div>`;app.querySelector('[data-act=check]').hidden=true;app.querySelector('[data-act=hint]').hidden=true;if(q)lockOpts(q);save()}
function success(q){const lv=S.lv[cur.l],p=[10,6,3][Math.min(cur.att,2)];S.pts+=p;lv.p+=p;lv.r++;S.right++;if(!cur.att)lv.ft++;say('أحسنتِ يا بطلة! 🌟');finish(`<div class="fb ok pop">🎉 إجابة صحيحة! +${ar(p)} نقاط${cur.att?' (بعد محاولة أو أكثر)':''}<br>${q.e||'أحسنتِ، استمري!'}</div>`,cur.l<5?q:null)}
function wrongTry(q,res,msg){const lv=S.lv[cur.l];S.wrong++;lv.w++;cur.att++;save();
if(cur.l<5&&cur.att>=3){say('لا بأس، التعلّم يحتاج محاولات 💪');finish(`<div class="fb no">لم تنجحي هذه المرة، وهذه هي الإجابة الصحيحة:<br>${q.e}</div>`,q);return}
if(cur.l<5)res.forEach((r,i)=>{if(!r){const b=app.querySelector(`.opt[data-p="${i}"].on`);b&&b.classList.replace('on','bad');cur.sel[i]=null}});
$('#fb').innerHTML=`<div class="fb no">${msg}<br>💡 تلميح: ${q.h}</div>`;app.querySelector('[data-act=hint]').hidden=false}
function check(){if(cur.done)return;const l=cur.l;
if(l===5){const q=BUILD[cur.i],b={};Object.keys(COL).forEach(c=>{if(BD[c])b[c]=BD[c]});const need=[2,4,6][S.track];let err='';
if(sum(b)<need)err=`ضعي ${ar(need)} كرات على الأقل في الكيس.`;else if(!q.ok(b))err=q.h;else if(S.track==2&&BD.txt.trim().length<8)err='اكتبي تبريرًا لتصميمكِ (جملة قصيرة على الأقل).';
if(err){wrongTry({h:err},[],'لم يتحقق الشرط بعد، عدّلي كيسكِ وجرّبي مرة أخرى.');return}
success({e:'تصميم صحيح! ويمكنكِ تجربة تصميم آخر قبل الانتقال. تذكّري: السحب الفعلي قد يختلف عن الاحتمال.'});return}
const q=cur.Q[cur.i];if(q.parts.some((p,i)=>cur.sel[i]==null)){say('اختاري إجابة لكل سؤال قبل التحقق 🙂');return}
const res=q.parts.map((p,i)=>cur.sel[i]===(p.a||0));res.every(Boolean)?success(q):wrongTry(q,res,'ليست صحيحة بعد. حاولي مرة أخرى!')}
function next(){cur.i++;cur.att=0;cur.sel=[];cur.ord=[];cur.done=false;BD={red:0,blue:0,yellow:0,green:0,txt:''};if(cur.i>=3)levelEnd(cur.l);else question()}
function levelEnd(l){const v=S.lv[l],L=LV[l],st=v.ft>=3?3:v.ft==2?2:1;if(S.lv.every(x=>x.d>=3)&&!S.fin){S.fin=true;save()}
app.innerHTML=`<section class="card hero" style="--c:${L.c}">${prog()}<h2>${L.i} أنهيتِ مستوى «${L.n}»!</h2><div class="stars">${stars(st)}</div><p>صحيحة من المحاولة الأولى: <b>${ar(v.ft)}</b> من ٣ · النقاط: <b>${ar(v.p)}</b> من ٣٠</p><p class="badge">🏅 شارة «${BADGE[l]}»</p>${owl(st==3?'رائع! أتقنتِ هذا المستوى.':'جيد! يمكنكِ إعادة المستوى لتحسين نتيجتكِ.')}<div class="row"><button class="big" data-act="home">العودة للهرم</button><button class="mini" data-act="replay" data-i="${l}">🔄 إعادة المستوى</button>${S.fin?'<button class="mini" data-act="fin">🏆 النتيجة النهائية</button>':''}</div></section>`}
function final(){const st=stats(S),s3=st.mast>=85?3:st.mast>=60?2:1;
app.innerHTML=`<section class="card hero">${prog()}<h2>🏆 النتيجة النهائية</h2><div class="stars">${stars(s3)}</div><div class="kpis"><div><b>${ar(S.right)}</b><small>إجابات صحيحة</small></div><div><b>${ar(S.wrong)}</b><small>إجابات خاطئة</small></div><div><b>${ar(st.score)}٪</b><small>الدرجة (${ar(S.pts)} من ١٨٠)</small></div><div><b>${ar(st.mast)}٪</b><small>نسبة الإتقان</small></div></div><div class="badges">${S.lv.map((v,i)=>v.d>=3?`<span class="bd" style="--c:${LV[i].c}">${LV[i].i} ${BADGE[i]}</span>`:'').join('')}${st.score>=90?'<span class="bd gold">🥇 بطلة الاحتمال</span>':''}</div><label class="just">اسم الطالبة (للشهادة):<input id="nm" value="${esc(S.name)}" placeholder="اكتبي اسمكِ هنا" maxlength="60"></label><div class="row"><button class="big" data-act="cert">🖨 اطبعي شهادة الإنجاز</button><button class="mini" data-act="dash">📊 تقرير الأداء</button><button class="mini" data-act="again">🔁 العبي من جديد</button></div></section>`}

/* ============ ٧) لوحة المعلمة ============ */
const sk=v=>v.ft>=3?'أتقنتها ✅':v.ft==2?'قيد التمكن 🟡':'تحتاج تعزيزًا 🔴';
function rec(s){const st=stats(s),w=s.lv.map((v,i)=>v.ft<2?LV[i].n:null).filter(Boolean);
if(st.mast>=85&&!w.length)return'🌟 توصية إثرائية: أتقنت الطالبة المستويات؛ يُنصح بتحديات مفتوحة، مثل تصميم أسئلة احتمال لزميلاتها وتجربة مسار أعلى.';
if(st.mast>=60)return`📘 توصية: مستوى جيد. يُنصح بتعزيز: ${w.join('، ')||'التحليل والتقييم'} بأنشطة قصيرة ثم إعادة المحاولة.`;
return`🛠 توصية علاجية: تحتاج الطالبة إلى تعزيز المفاهيم الأساسية بأكياس كرات حقيقية، خاصة: ${w.join('، ')}. يُنصح بمسار «المستكشفة» وإعادة اللعبة.`}
function rep(s){const st=stats(s);let d='';try{d=new Date(s.id).toLocaleDateString('ar-EG')}catch(e){}
return`<h2>تقرير أداء الطالبة</h2><p>الاسم: <b>${esc(s.name||'—')}</b> · المسار: ${TR[s.track].n} · التاريخ: ${d}</p><div class="kpis"><div><b>${ar(s.right)}</b><small>إجابات صحيحة</small></div><div><b>${ar(s.wrong)}</b><small>إجابات خاطئة</small></div><div><b>${ar(st.score)}٪</b><small>الدرجة النهائية (${ar(s.pts)} من ١٨٠)</small></div><div><b>${ar(st.mast)}٪</b><small>نسبة الإتقان</small></div></div><table><tr><th>المستوى</th><th>المهارة</th><th>صحيحة من أول محاولة</th><th>النسبة</th><th>الحالة</th></tr>${s.lv.map((v,i)=>`<tr><td>${LV[i].i} ${LV[i].n}</td><td>${LV[i].s}</td><td>${ar(v.ft)} / ٣${v.d<3?' (غير مكتمل)':''}</td><td>${ar(Math.round(v.ft/3*100))}٪</td><td>${v.d<3?'لم يكتمل':sk(v)}</td></tr>`).join('')}</table><p class="rec">${rec(s)}</p>`}
function dash(){cur=null;const s=S&&done()>0?S:H[H.length-1];
app.innerHTML=`<section class="card"><h2>📊 لوحة المعلمة</h2><p class="note">ℹ️ النتائج محفوظة على هذا الجهاز وهذا المتصفح فقط (localStorage)، ولا تُرسل تلقائيًا للمعلمة ولا تُحفظ في حساب سحابي. اطلبي من الطالبة طباعة التقرير أو تصدير ملف CSV.</p>${s?rep(s):'<p>لا توجد نتائج بعد. ابدئي اللعب أولًا.</p>'}<div class="row">${s?'<button class="big" data-act="prep">🖨 طباعة التقرير</button>':''}<button class="mini" data-act="csv">⬇ تصدير CSV</button><button class="mini alt" data-act="clear">🗑 مسح النتائج</button></div>${H.length?`<h3>المحاولات المكتملة على هذا الجهاز (${ar(H.length)})</h3><table><tr><th>الاسم</th><th>المسار</th><th>الدرجة</th><th>الإتقان</th></tr>${H.map(h=>`<tr><td>${esc(h.name||'—')}</td><td>${TR[h.track].n}</td><td>${ar(stats(h).score)}٪</td><td>${ar(stats(h).mast)}٪</td></tr>`).join('')}</table>`:''}</section>`}
function csv(){const rows=[['التاريخ','الاسم','المسار','صحيحة','خاطئة','النقاط','الدرجة٪','الإتقان٪',...LV.map(l=>l.n+' (من 3)')]];
(H.length?H:S?[S]:[]).forEach(s=>{const st=stats(s);rows.push([new Date(s.id).toISOString().slice(0,10),s.name,TR[s.track].n,s.right,s.wrong,s.pts,st.score,st.mast,...s.lv.map(v=>v.ft)])});
const t='\ufeff'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\r\n'),a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([t],{type:'text/csv;charset=utf-8'}));a.download='نتائج-مغامرة-الاحتمال.csv';document.body.appendChild(a);a.click();a.remove()}
function printHTML(h){$('#print').innerHTML=h;setTimeout(()=>window.print(),60)}
function cert(){if(!S.name.trim()){const i=$('#nm');i&&i.focus();return}const st=stats(S);let d='';try{d=new Date().toLocaleDateString('ar-EG')}catch(e){}
printHTML(`<div class="cert"><h1>🏆 شهادة إنجاز</h1><p>تُمنح الطالبة</p><h2>${esc(S.name)}</h2><p>لإتمامها لعبة «مغامرة هرم بلوم في عالم الاحتمال»<br>في درس الاحتمال — الصف الرابع الابتدائي — مسار «${TR[S.track].n}»<br>وحصولها على <b>${ar(st.score)}٪</b> ونسبة إتقان <b>${ar(st.mast)}٪</b></p><p>${BADGE.map((b,i)=>S.lv[i].d>=3?LV[i].i:'').join(' ')}</p><p>المعلمة: مريم علي · ${d}</p></div>`)}

/* ============ ٨) الأحداث ============ */
const ACT={
menu:()=>start(),
track:t=>{tsel=+t.dataset.i;start()},
go:()=>{newS(tsel);pyramid()},
home:()=>S?pyramid():start(),
lv:t=>enter(+t.dataset.i),
check,next,
hint:()=>{const q=cur.l===5?BUILD[cur.i]:cur.Q[cur.i];say('💡 '+q.h)},
replay:t=>{const l=+t.dataset.i,v=S.lv[l];S.pts-=v.p;S.right-=v.r;S.wrong-=v.w;S.lv[l]={d:0,ft:0,r:0,w:0,p:0};S.fin=false;save();enter(l)},
fin:()=>{if(S.lv.every(l=>l.d>=3))final()},
again:()=>{S=null;save();tsel=0;start()},
dash:()=>dash(),
prep:()=>{const s=S&&done()>0?S:H[H.length-1];if(s)printHTML(rep(s))},
cert,csv,
clear:()=>{if(confirm('هل تريدين مسح كل النتائج المحفوظة على هذا الجهاز؟')){H=[];S=null;try{localStorage.removeItem(KEY)}catch(e){}start()}}};
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||t.disabled)return;
if(t.classList.contains('opt')){if(!cur||cur.done)return;const p=+t.dataset.p;cur.sel[p]=+t.dataset.o;app.querySelectorAll(`.opt[data-p="${p}"]`).forEach(x=>x.classList.remove('on','bad'));t.classList.add('on');return}
if(t.dataset.draw){draw(t);return}
if(t.dataset.add){const c=t.dataset.add;BD[c]=Math.max(0,Math.min(12,BD[c]+ +t.dataset.d));bld();return}
const a=t.dataset.act;if(a&&ACT[a])ACT[a](t)});
document.addEventListener('input',e=>{if(e.target.id==='txt')BD.txt=e.target.value;if(e.target.id==='nm'&&S){S.name=e.target.value;save()}});
load();start();
