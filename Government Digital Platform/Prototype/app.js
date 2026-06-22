/* ============================================================
   App — Router · State · Interactions
   נקודת כניסה: מסך פתיחה (landing) → בחירת סוג משתמש.
   ============================================================ */
const state = {
  product:'c', screen:'login', param:null,
  step:0, completeMode:true,
  qSearch:'', qType:'all', qView:'all',
  svcCat:'הכל', svcSearch:'', musicTrack:'classical', discipline:'music',
  accOpen:{draft:true}, secOpen:{data:true},
  stateView:'maintenance',
  /* אזור אישי (רשימת בקשות) */
  appSearch:'', appType:'all', appPeriod:'all', appEmpty:false,
  sysName:'נהיגה ספורטיבית', sysSub:'רישוי נהגים ספורטיביים', sysSubs:['רישוי נהגים ספורטיביים','רישום אגודות ומועדונים','מבחנים והסמכות'], sysImg:'assets/systems/driving.jpg', sysLogo:'culture', sysReqTypes:[{id:'music',name:'הגשת בקשה'}],
};

/* ברכה לפי שעה */
function greeting(){
  const h = new Date().getHours();
  if(h<12) return 'בוקר טוב';
  if(h<18) return 'צהריים טובים';
  return 'ערב טוב';
}

const SCREENS = {
  c:{
    login:()=>CITIZEN.login(), auth:()=>CITIZEN.auth(), gateway:()=>OPS.gateway(),
    home:()=>CITIZEN.home(), services:()=>CITIZEN.services(),
    service:()=>CITIZEN.service(state.param), apply:()=>CITIZEN.apply(),
    track:()=>CITIZEN.track(state.param), notifications:()=>CITIZEN.notifications(), profile:()=>CITIZEN.profile(),
    success:()=>CITIZEN.success(), cstate:()=>CITIZEN.cstate(),
  },
  o:{
    login:()=>OPS.login(), gateway:()=>OPS.gateway(), requests:()=>OPS.requests(),
    case:()=>OPS.caseScreen(state.param), decision:()=>OPS.decision(state.param), states:()=>OPS.states(),
    committees:()=>OPS.committees(),
  },
};

/* ---- entry / portal switching ---- */
function goLanding(){ state.screen='landing'; render(); window.scrollTo(0,0); }
function goMap(){ state.screen='map'; render(); window.scrollTo(0,0); }
function enterProduct(p){ state.product=p; state.param=null; state.screen = p==='c'?'login':'login'; render(); window.scrollTo(0,0); }
function goScreen(p, s, param){ state.product=p; state.param=(param!==undefined?param:null); if(s==='apply'){ state.completeMode=false; state.step=0; } state.screen=s; render(); window.scrollTo(0,0); }
function goState(p, view){ state.product=p; state.stateView=view; state.screen=(p==='c'?'cstate':'states'); render(); window.scrollTo(0,0); }

/* ---- navigation ---- */
function nav(screen, param){
  const go=()=>{ if(param!==undefined) state.param=param; if(screen==='apply' && param===undefined){ state.completeMode=true; state.step=0; } state.screen=screen; render(); window.scrollTo(0,0); };
  if(state.screen==='apply' && screen!=='apply' && screen!=='success'){ requestLeaveForm(go); return; }
  go();
}

/* ---- דיאלוג יציאה מהטופס (מערכת העיצוב) ---- */
let _formExitPending=null;
function requestLeaveForm(go){ _formExitPending=go; openLeaveDialog(); }
function _leaveEsc(e){ if(e.key==='Escape') closeLeaveDialog(); }
function openLeaveDialog(){
  closeLeaveDialog(true);
  const el=document.createElement('div'); el.className='modal-overlay'; el.id='leaveDlg';
  el.innerHTML=`<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="lvT" aria-describedby="lvD">
    <div class="modal-ic">${UI.icon('alert',26)}</div>
    <h3 id="lvT">יציאה מהטופס</h3>
    <p id="lvD">השינויים שביצעת עדיין לא נשלחו. ניתן לשמור אותם כטיוטה ולהמשיך מאוחר יותר, או לצאת ולבטל את השינויים.</p>
    <div class="modal-acts">
      <button class="btn btn-pri" onclick="leaveSaveDraft()">${UI.icon('save',17)} שמירה כטיוטה</button>
      <button class="btn btn-danger-out" onclick="leaveDiscard()">יציאה וביטול השינויים</button>
      <button class="btn btn-ghost" onclick="closeLeaveDialog()">המשך עריכה</button>
    </div></div>`;
  el.addEventListener('click',e=>{ if(e.target===el) closeLeaveDialog(); });
  document.body.appendChild(el);
  document.addEventListener('keydown', _leaveEsc);
  const f=el.querySelector('.btn-pri'); if(f) f.focus();
}
function closeLeaveDialog(keepPending){ const el=document.getElementById('leaveDlg'); if(el) el.remove(); document.removeEventListener('keydown', _leaveEsc); if(!keepPending) _formExitPending=null; }
function leaveSaveDraft(){ const p=_formExitPending; closeLeaveDialog(); toast('הטיוטה נשמרה',true); if(p) p(); }
function leaveDiscard(){ const p=_formExitPending; closeLeaveDialog(); if(p) p(); }

/* ---- gateway → enter selected system → אזור אישי ---- */
const REQ_MUSIC={id:'music',name:'מוזיקאי מצטיין'}, REQ_DANCE={id:'dance',name:'רקדן מצטיין'};
const SYS_MAP = {
  driving:{name:'נהיגה ספורטיבית', subs:['רישוי נהגים ספורטיביים','רישום אגודות ומועדונים','מבחנים והסמכות'], img:'assets/systems/driving.jpg', logo:'culture', empty:true,  reqTypes:[{id:'music',name:'הגשת בקשה'}]},
  human:  {name:'מצטיינים בצה״ל',  subs:['מוזיקאים מצטיינים','רקדנים מצטיינים'],                              img:'assets/systems/excellence.png', logo:'culture', empty:false, reqTypes:[REQ_MUSIC, REQ_DANCE]},
  excel:  {name:'מערכת מצטינים',   subs:['מוזיקאים מצטיינים','רקדנים מצטיינים','אמני במה'],                  img:'assets/systems/excel.png',   logo:'culture', empty:true,  reqTypes:[REQ_MUSIC, REQ_DANCE]},
  funds:  {name:'סל מדע',          subs:['מענקי מחקר','מלגות מדע','תשתיות ומעבדות'],                          img:'assets/systems/funds.jpg',   logo:'state',   empty:true,  reqTypes:[{id:'music',name:'בקשת מענק'}]},
};
function enterSystem(id){ const s=SYS_MAP[id]||SYS_MAP.driving; state.sysName=s.name; state.sysSubs=s.subs; state.sysSub=s.subs[0]; state.sysImg=s.img; state.sysLogo=s.logo; state.sysReqTypes=s.reqTypes; state.appEmpty=!!s.empty; state.screen='home'; render(); window.scrollTo(0,0); }

/* הגשת בקשה חדשה — בוחר סוג בקשה אם יש יותר מאחד */
function newRequest(){
  const types=state.sysReqTypes||[REQ_MUSIC, REQ_DANCE];
  if(types.length<=1){ startForm(types[0].id); return; }
  closeReqTypeDlg();
  const el=document.createElement('div'); el.className='modal-overlay'; el.id='reqTypeDlg';
  el.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-labelledby="rtT">
    <h3 id="rtT">הגשת בקשה חדשה</h3>
    <p>בחרו את סוג הבקשה שברצונכם להגיש במערכת <b>${state.sysName||''}</b>:</p>
    <div class="modal-acts">
      ${types.map(t=>`<button class="btn btn-out reqtype-opt" onclick="pickReqType('${t.id}')">${UI.icon(t.id==='dance'?'award':'music',18)} <span>${t.name}</span></button>`).join('')}
      <button class="btn btn-ghost" onclick="closeReqTypeDlg()">ביטול</button>
    </div></div>`;
  el.addEventListener('click',e=>{ if(e.target===el) closeReqTypeDlg(); });
  document.body.appendChild(el);
  const f=el.querySelector('.reqtype-opt'); if(f) f.focus();
}
function closeReqTypeDlg(){ const el=document.getElementById('reqTypeDlg'); if(el) el.remove(); }
function pickReqType(id){ closeReqTypeDlg(); startForm(id); }

/* ---- שורות/כרטיסים חוזרים בטופס (הוספה/מחיקה אמיתית) ---- */
function _cleanClone(node){
  node.querySelectorAll('.uisel').forEach(u=>u.remove());
  node.querySelectorAll('select').forEach(s=>{ s.removeAttribute('data-enh'); s.style.display=''; s.selectedIndex=0; });
  node.querySelectorAll('input').forEach(i=>{ if(i.type==='checkbox'||i.type==='radio') i.checked=false; else i.value=''; });
  return node;
}
function addRepeat(btn){
  let el=btn.previousElementSibling;
  while(el){
    const tbl = el.querySelector && el.querySelector('table.form-table tbody');
    if(tbl){ const last=tbl.querySelector('tr:last-child'); if(last){ tbl.appendChild(_cleanClone(last.cloneNode(true))); enhanceSelects(); } return; }
    if(el.classList && el.classList.contains('repeat-card')){
      const clone=_cleanClone(el.cloneNode(true));
      const h=clone.querySelector('.rc-h b'); if(h){ const m=h.textContent.match(/(\d+)\s*$/); if(m) h.textContent=h.textContent.replace(/\d+\s*$/, (parseInt(m[1])+1)); }
      btn.parentNode.insertBefore(clone, btn); enhanceSelects(); return;
    }
    el=el.previousElementSibling;
  }
}
function delTableRow(btn){ const tr=btn.closest('tr'); const tb=tr&&tr.parentNode; if(tr && tb && tb.querySelectorAll('tr').length>1){ tr.remove(); } else { toast('יש להשאיר לפחות שורה אחת'); } }
function setAppSub(name){ state.sysSub=name; render(); }

/* ---- אזור אישי: חיפוש / סינון / מיון + פתיחת בקשה ---- */
function setAppSearch(v){ state.appSearch=v; render(); const inp=document.querySelector('#appSearchInput'); if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length,inp.value.length); } }
function setAppType(v){ state.appType=v; render(); }
function setAppPeriod(v){ state.appPeriod=v; render(); }
function openReq(id, action){
  const go=()=>{
    state.param=id;
    if(action==='complete'){ state.completeMode=true; state.step=0; state.screen='apply'; }
    else { state.screen='track'; }   /* צפייה → מסך מעקב אחר הבקשה */
    render(); window.scrollTo(0,0);
  };
  if(state.screen==='apply' && action!=='complete'){ requestLeaveForm(go); return; }
  go();
}
function goEmptyHome(){ state.product='c'; state.appEmpty=true; state.appSearch=''; state.appType='all'; state.screen='home'; render(); window.scrollTo(0,0); }
/* לוגו → דף הבית של הפורטל (אזור אישי אם כבר בפנים, אחרת מסך כניסה) */
function goHome(){ if(state.screen==='login'||state.screen==='auth'){ render(); return; } state.product='c'; state.appEmpty=false; state.screen='home'; render(); window.scrollTo(0,0); }
function setQView(v){ state.qView=v; render(); }
function toggleAcc(k){ state.accOpen[k]=!state.accOpen[k]; render(); }
function toggleSec(k){ state.secOpen[k]=!state.secOpen[k]; render(); }
function toggleNewReq(){ const m=document.getElementById('newReqMenu'); if(m) m.classList.toggle('hidden'); }
function toggleMenu(){ document.body.classList.toggle('menu-open'); }
function closeMenus(){ document.querySelectorAll('.usermenu,.subsysmenu,.tocmenu').forEach(m=>m.classList.add('hidden'));
  document.querySelectorAll('.uisel-menu').forEach(m=>{ m.classList.add('hidden'); const b=m.parentNode&&m.parentNode.querySelector('.uisel-btn'); if(b) b.setAttribute('aria-expanded','false'); }); }
function closeUserMenu(){ closeMenus(); }
function toggleUserMenu(e){ e.stopPropagation(); const wrap=e.currentTarget.closest('.userpill-wrap'); const m=wrap&&wrap.querySelector('.usermenu'); if(!m) return; const willOpen=m.classList.contains('hidden'); closeMenus(); if(willOpen) m.classList.remove('hidden'); }
function toggleSubsys(e){ e.stopPropagation(); const wrap=e.currentTarget.closest('.subsys-wrap'); const m=wrap&&wrap.querySelector('.subsysmenu'); if(!m) return; const willOpen=m.classList.contains('hidden'); closeMenus(); if(willOpen) m.classList.remove('hidden'); }
function setSubsys(name){ state.subsys=name; render(); }
function toggleTocMenu(e){ e.stopPropagation(); const wrap=e.currentTarget.closest('.toc-wrap'); const m=wrap&&wrap.querySelector('.tocmenu'); if(!m) return; const willOpen=m.classList.contains('hidden'); closeMenus(); if(willOpen) m.classList.remove('hidden'); }
function gotoSec(k){ state.secOpen=state.secOpen||{}; state.secOpen[k]=true; render(); const el=document.getElementById('sec-'+k); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }
function toggleToc(){ state.tocCollapsed=!state.tocCollapsed; render(); }
document.addEventListener('click', closeMenus);
function setQSearch(v){
  state.qSearch=v; render();
  const inp=document.querySelector('.toolbar input'); if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length,inp.value.length); }
}

/* ---- form ---- */
function startForm(serviceId){ state.discipline=(serviceId==='dance'?'dance':'music'); state.completeMode=false; state.step=0; state.screen='apply'; render(); window.scrollTo(0,0); }
function setTrack(t){ state.musicTrack=t; render(); }
function setStep(i){ state.step=i; render(); window.scrollTo(0,0); }
function nextStep(){ if(state.step<DB.formDef.steps.length-1){ state.step++; render(); window.scrollTo(0,0); } }
function prevStep(){ if(state.step>0){ state.step--; render(); window.scrollTo(0,0); } }
function submitForm(){
  const dec=document.getElementById('declare');
  if(dec && !dec.checked){ toast('יש לאשר את ההצהרה לפני ההגשה'); return; }
  toast('הבקשה הוגשה בהצלחה', true); nav('success');
}
/* חיפוש גלובלי (Hero / Header) → קטלוג שירותים */
function goSearch(ev, val){
  if(ev && ev.key && ev.key!=='Enter') return;
  state.svcSearch = (val||'').trim(); state.svcCat='הכל';
  state.product='c'; state.screen='services'; render(); window.scrollTo(0,0);
}
/* קטלוג שירותים — סינון לפי קטגוריה + חיפוש */
function setSvcCat(c){ state.svcCat=c; render(); }
function setSvcSearch(v){
  state.svcSearch=v; render();
  const inp=document.querySelector('#svcSearchInput'); if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length,inp.value.length); }
}
/* תור Operations — סינון לפי סוג בקשה */
function setQType(t){ state.qType=t; render(); }

/* ---- clerk actions ---- */
function requestCompletion(){
  const r=DB.queue.find(x=>x.id===state.param); if(r){ r.status='wait'; r.label='ממתין למגיש'; }
  toast('נשלחה בקשת השלמה למגיש · הסטטוס עודכן ל"ממתין למגיש"', true); nav('requests');
}
function decide(verdict){
  const ta=document.getElementById('decReason');
  if(!ta || !ta.value.trim()){ ta?.closest('.field')?.classList.add('err'); toast('יש להזין נימוק לפני ההכרעה'); return; }
  const r=DB.queue.find(x=>x.id===state.param); if(r){ r.status=verdict; r.label=verdict==='appr'?'אושרה':'נדחתה'; }
  toast(verdict==='appr'?'הבקשה אושרה · הודעה נשלחה למגיש':'הבקשה נדחתה · הודעה נשלחה למגיש', true); nav('requests');
}
function setState(k){ state.stateView=k; if(state.screen!=='states') state.screen='states'; render(); }

/* ---- render ---- */
function render(){
  document.body.classList.remove('menu-open');
  let html;
  if(state.screen==='landing'){ html = UI.landing(); }
  else if(state.screen==='map'){ html = UI.designMap(); }
  else {
    const fn = SCREENS[state.product][state.screen] || SCREENS[state.product].home || SCREENS[state.product].gateway;
    html = fn();
  }
  document.getElementById('app').innerHTML = html;
  associateLabels();
  cardifyForm();
  enhanceSelects();
  bindAutosave();
  initSignature();
  document.body.classList.toggle('formbar', state.screen==='apply');
}

/* פד חתימה אינטראקטיבי (canvas) */
function clearSignature(){ const cv=document.getElementById('sigPad'); if(!cv) return; const c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); cv.classList.remove('signed'); }
function initSignature(){
  const cv=document.getElementById('sigPad'); if(!cv || cv.dataset.init) return;
  cv.dataset.init='1';
  const ratio=window.devicePixelRatio||1;
  const rect=cv.getBoundingClientRect();
  cv.width=Math.max(1,rect.width)*ratio; cv.height=Math.max(1,rect.height)*ratio;
  const ctx=cv.getContext('2d'); ctx.scale(ratio,ratio);
  ctx.lineWidth=2.4; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0B3668';
  let drawing=false, last=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; };
  cv.addEventListener('pointerdown',e=>{ drawing=true; last=pos(e); cv.classList.add('signed'); try{cv.setPointerCapture(e.pointerId);}catch(_){ } });
  cv.addEventListener('pointermove',e=>{ if(!drawing) return; const p=pos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; });
  const stop=()=>{ drawing=false; }; cv.addEventListener('pointerup',stop); cv.addEventListener('pointercancel',stop);
}

/* שמירה אוטומטית: כברירת מחדל מציג רק דיסקט+שעה; בעת שינוי מציג לרגע "טיוטה נשמרה" */
let _asDebounce, _asHide;
function _hm(){ const d=new Date(); const p=n=>(n<10?'0':'')+n; return p(d.getHours())+':'+p(d.getMinutes()); }
function autosaveTick(){
  const el=document.querySelector('.autosave'); if(!el) return;
  const t=el.querySelector('.as-time'); if(t) t.textContent=_hm();
  el.classList.add('saving');
  clearTimeout(_asHide); _asHide=setTimeout(()=>el.classList.remove('saving'), 2200);
}
function bindAutosave(){
  const cont=document.querySelector('.form-sections'); if(!cont || cont.dataset.asBound) return;
  cont.dataset.asBound='1';
  const t=document.querySelector('.autosave .as-time'); if(t) t.textContent=_hm();
  const onEdit=()=>{ clearTimeout(_asDebounce); _asDebounce=setTimeout(autosaveTick, 800); };
  cont.addEventListener('input', onEdit);
  cont.addEventListener('change', onEdit);
}

/* טפסים: קיבוץ כל מקטע (form-sec) + תוכנו לכרטיסייה נפרדת לסריקה טובה */
function cardifyForm(){
  if(state.screen!=='apply') return;
  const cont = document.querySelector('.form-sections');
  if(!cont || cont.dataset.carded) return;
  cont.dataset.carded='1';
  let card=null;
  [...cont.children].forEach(el=>{
    if(el.classList.contains('form-sec')){
      card=document.createElement('section'); card.className='form-card';
      cont.insertBefore(card, el); card.appendChild(el);
    } else if(card){ card.appendChild(el); }
  });
}

/* שדות נפתחים: המרת כל select נייטיב לרכיב רשימה מותאם למערכת העיצוב */
function enhanceSelects(){
  document.querySelectorAll('#app select:not([data-enh])').forEach(sel=>{
    sel.setAttribute('data-enh','1');
    const wrap=document.createElement('div'); wrap.className='uisel';
    const cur=sel.options[sel.selectedIndex];
    const btn=document.createElement('button'); btn.type='button'; btn.className='uisel-btn';
    btn.setAttribute('aria-haspopup','listbox'); btn.setAttribute('aria-expanded','false');
    if(sel.disabled) btn.disabled=true;
    btn.innerHTML=`<span class="uisel-val">${cur?cur.textContent:''}</span><span class="uisel-chev">${UI.icon('chevdown',18)}</span>`;
    const menu=document.createElement('div'); menu.className='uisel-menu hidden'; menu.setAttribute('role','listbox');
    [...sel.options].forEach((o,i)=>{
      const oi=document.createElement('button'); oi.type='button'; oi.setAttribute('role','option');
      oi.className='uisel-opt'+(i===sel.selectedIndex?' on':''); oi.textContent=o.textContent;
      oi.addEventListener('click',ev=>{
        ev.stopPropagation(); sel.value=o.value;
        btn.querySelector('.uisel-val').textContent=o.textContent;
        menu.querySelectorAll('.uisel-opt').forEach(x=>x.classList.remove('on')); oi.classList.add('on');
        menu.classList.add('hidden'); btn.setAttribute('aria-expanded','false');
        sel.dispatchEvent(new Event('change',{bubbles:true}));
      });
      menu.appendChild(oi);
    });
    btn.addEventListener('click',ev=>{
      ev.stopPropagation(); const willOpen=menu.classList.contains('hidden'); closeMenus();
      if(willOpen){ menu.classList.remove('hidden'); btn.setAttribute('aria-expanded','true'); }
    });
    sel.style.display='none';
    sel.parentNode.insertBefore(wrap, sel.nextSibling);
    wrap.appendChild(btn); wrap.appendChild(menu);
  });
}
/* נגישות: קישור תוויות לשדות (for/id) + תיוג שדות טבלה לפי כותרת עמודה */
function associateLabels(){
  let lc=0;
  document.querySelectorAll('#app .field').forEach(f=>{
    const lab=f.querySelector('label'); const inp=f.querySelector('input,select,textarea');
    if(lab&&inp&&!inp.id){ const id='fld'+(++lc); inp.id=id; lab.htmlFor=id; }
  });
  document.querySelectorAll('#app table.form-table').forEach(t=>{
    const ths=[...t.querySelectorAll('thead th')].map(h=>h.textContent.trim());
    t.querySelectorAll('tbody tr').forEach(tr=>{ [...tr.children].forEach((td,i)=>{
      const c=td.querySelector('input,select'); if(c && !c.getAttribute('aria-label') && ths[i]) c.setAttribute('aria-label',ths[i]);
    }); });
  });
}
render();
