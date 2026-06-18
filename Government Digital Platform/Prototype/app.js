/* ============================================================
   App — Router · State · Interactions
   נקודת כניסה: מסך פתיחה (landing) → בחירת סוג משתמש.
   ============================================================ */
const state = {
  product:'c', screen:'landing', param:null,
  step:0, completeMode:true,
  qSearch:'', qType:'all', qView:'all',
  svcCat:'הכל', svcSearch:'', musicTrack:'classical', discipline:'music',
  accOpen:{draft:true}, secOpen:{data:true},
  stateView:'maintenance',
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
    login:()=>CITIZEN.login(), home:()=>CITIZEN.home(), services:()=>CITIZEN.services(),
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
  if(param!==undefined) state.param=param;
  if(screen==='apply' && param===undefined){ state.completeMode=true; state.step=0; }
  state.screen=screen; render(); window.scrollTo(0,0);
}

/* ---- Operations: gateway → enter system ---- */
function enterSystem(id){ state.screen='requests'; render(); window.scrollTo(0,0); }
function setQView(v){ state.qView=v; render(); }
function toggleAcc(k){ state.accOpen[k]=!state.accOpen[k]; render(); }
function toggleSec(k){ state.secOpen[k]=!state.secOpen[k]; render(); }
function toggleNewReq(){ const m=document.getElementById('newReqMenu'); if(m) m.classList.toggle('hidden'); }
function toggleMenu(){ document.body.classList.toggle('menu-open'); }
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
