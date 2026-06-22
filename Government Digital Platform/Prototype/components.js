/* ============================================================
   Shared Components + Icon System (SVG, ללא אימוג'ים)
   נאמן ל-gov.il / IGDS · מקצועי
   ============================================================ */
window.UI = (function(){

  /* ---- Icon set (line, currentColor, 24 grid) ---- */
  const I = {
    home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    plus:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    plusbare:'<path d="M12 5v14M5 12h14"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.8.3-1.4 1-1.4 1.9v.3"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>',
    bell:'<path d="M18 8a6 6 0 1 0-12 0c0 6-3 7-3 7h18s-3-1-3-7"/><path d="M10.5 20a2 2 0 0 0 3 0"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    download:'<path d="M12 3v12M7 11l5 5 5-5"/><path d="M5 21h14"/>',
    refresh:'<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v5h-5"/>',
    filter:'<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
    sliders:'<path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>',
    edit:'<path d="M4 20h4l10-10-4-4L4 16z"/><path d="m14 6 4 4"/>',
    more:'<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>',
    upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/>',
    clip:'<path d="M20 11.5 11.5 20a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9 12.5a1.6 1.6 0 0 1-2.3-2.3l7.3-7.3"/>',
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    check:'<path d="M5 12.5 10 17l9-10"/>',
    checkc:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    alert:'<path d="M12 4 2.5 20h19z"/><path d="M12 10v4"/><circle cx="12" cy="17.3" r="0.6" fill="currentColor"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r="0.7" fill="currentColor"/>',
    lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1"/>',
    calendar:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
    chevdown:'<path d="m6 9 6 6 6-6"/>',
    arrowl:'<path d="M14 6 8 12l6 6"/>',
    arrowr:'<path d="m10 6 6 6-6 6"/>',
    send:'<path d="M21 4 3 11l7 2 2 7z"/><path d="M21 4 12 13"/>',
    save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    wrench:'<path d="M14.5 6a4 4 0 0 0-5.3 5l-5.4 5.4 2.8 2.8 5.4-5.4a4 4 0 0 0 5-5.3l-2.4 2.4-2.1-2.1z"/>',
    inbox:'<path d="M4 13l2.5-8h11L20 13v6H4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
    shield:'<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
    x:'<path d="m6 6 12 12M18 6 6 18"/>',
    award:'<circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 7 5-3 5 3-1.5-7"/>',
    book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z"/><path d="M5 20a3 3 0 0 1 3-3h11"/>',
    music:'<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    piano:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v8M11 5v8M15 5v8M3 13h18"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><path d="M12 17v4M9 21h6"/>',
    disc:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.3"/><path d="M12 3a9 9 0 0 1 6.4 2.6"/>',
    flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12"/><circle cx="12" cy="12" r="3"/>',
    bolt:'<path d="M13 3 4 14h6l-1 7 9-11h-6z"/>',
    menorah:'<path d="M4.6 6v2.4M7.1 6v2.4M9.6 6v2.4M12 6v2.4M14.4 6v2.4M16.9 6v2.4M19.4 6v2.4"/><path d="M9.6 8.4q2.4 4.4 4.8 0"/><path d="M7.1 8.4q4.9 6.4 9.8 0"/><path d="M4.6 8.4q7.4 8.6 14.8 0"/><path d="M12 8.4V17"/><path d="M9.2 17h5.6M12 17v2.4M9.4 19.4h5.2"/>',
  };
  function icon(name, size){
    const p = I[name]; if(!p) return '';
    const s = size||20;
    return `<svg class="ic-svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }

  /* ---- ministry colorful-star logo (SVG) ---- */
  function ministryLogo(size){
    const s=size||40;
    return `<img src="assets/logos/culture-symbol.svg" alt="לוגו משרד התרבות והספורט" style="height:${s}px;width:auto;display:block">`;
  }
  function stateLogo(size){
    const s=size||40;
    return `<img src="assets/logos/state-emblem.svg" alt="סמל מדינת ישראל" style="height:${s}px;width:auto;display:block">`;
  }

  /* ---- header pieces ---- */
  function emblem(title, sub, logoHtml){
    const subTxt = (sub===undefined) ? 'פורטל שירותים ממשלתי' : sub;
    return `<button class="brand-lock" onclick="goHome()" title="פורטל השירותים והבקשות — דף הבית">
      <span class="emblem ministry">${logoHtml||stateLogo(38)}</span>
      <span class="bl-div"></span>
      <span class="bl-tx"><span class="wm">${title||'מדינת ישראל'}</span>${subTxt?`<span class="wm-sub">${subTxt}</span>`:''}</span>
    </button>`;
  }
  function iconbtn(name,title,onclick,dot){
    return `<button class="iconbtn" title="${title}" aria-label="${title}" ${onclick?`onclick="${onclick}"`:''}>${icon(name,19)}${dot?`<span class="dot">${dot}</span>`:''}</button>`;
  }
  function userPill(name,sub,items){
    const menu = (items||[]).map(it=> it.div
      ? `<div class="um-div"></div>`
      : `<button class="um-item${it.danger?' danger':''}" onclick="closeUserMenu();${it.onclick}">${icon(it.icon,17)}<span>${it.label}</span></button>`
    ).join('');
    return `<div class="userpill-wrap">
      <button class="userpill" onclick="toggleUserMenu(event)" aria-haspopup="true"><span class="ava">${icon('user',17)}</span>
        <span class="up-tx"><span>${name}</span>${sub?`<span class="sub">${sub}</span>`:''}</span>${icon('chevdown',16)}</button>
      <div class="usermenu hidden">${menu}</div>
    </div>`;
  }

  function barCitizen(){
    return `<header class="govbar light"><div class="left">
        ${emblem('פורטל השירותים והבקשות','האזור האישי')}</div>
      <div class="right">
        <button class="iconbtn lang" title="שפה: English" aria-label="שינוי שפה" onclick="toast('English — אב-טיפוס')">${icon('globe',18)}<span>עברית</span></button>
        ${iconbtn('mail','הודעות',"nav('notifications')",2)}
        ${userPill('עופר ברוידא','',[
          {label:'הבקשות שלי',icon:'home',onclick:"nav('home')"},
          {label:'פרטים אישיים',icon:'user',onclick:"nav('profile')"},
          {div:true},
          {label:'החלפת מערכת',icon:'grid',onclick:"nav('gateway')"},
          {label:'התנתקות',icon:'arrowl',onclick:"goScreen('c','login')",danger:true},
        ])}
      </div></header>`;
  }
  function barGateway(){
    return `<header class="govbar dark"><div class="left">${emblem('פורטל השירותים והבקשות','האזור האישי')}</div>
      <div class="right">${userPill('עופר ברוידא','',[
        {label:'התנתקות',icon:'arrowl',onclick:"goScreen('c','login')",danger:true},
      ])}</div></header>`;
  }
  function barOps(system){
    const subsystems = ['רישוי נהגים ספורטיביים','רישום אגודות ומועדונים','מבחנים והסמכות','פיקוח ובטיחות'];
    const curSub = state.subsys || subsystems[0];
    return `<header class="govbar dark"><div class="left">
        <button class="applauncher" title="בחירת מערכת" aria-label="בחירת מערכת" onclick="nav('gateway')">${icon('grid',22)}</button>
        <button class="brand-lock" onclick="goLanding()" title="פורטל שירותים ממשלתי — דף הבית"><span class="emblem ministry">${ministryLogo(38)}</span></button>
        <div class="ctx">
          <span class="ctx-sys">${system}</span>
          <div class="subsys-wrap">
            <button class="sw" onclick="toggleSubsys(event)" aria-haspopup="true">${curSub} ${icon('chevdown',13)}</button>
            <div class="subsysmenu hidden">
              ${subsystems.map(s=>`<button class="um-item${s===curSub?' on':''}" onclick="closeMenus();setSubsys('${s}')">${s}</button>`).join('')}
              <div class="um-div"></div>
              <button class="um-item" onclick="closeMenus();nav('gateway')">${icon('grid',16)}<span>החלפת מערכת</span></button>
            </div>
          </div></div></div>
      <div class="right">
        ${iconbtn('bell','הודעות',"nav('requests')",5)}
        ${userPill('רינת אדרי','פקיד מטפל',[
          {label:'החלפת מערכת',icon:'grid',onclick:"nav('gateway')"},
          {div:true},
          {label:'התנתקות',icon:'arrowl',onclick:'goLanding()',danger:true},
        ])}
      </div></header>`;
  }

  /* ---- סרגל אזור אישי (לאחר בחירת מערכת) — נאמן ל-Figma ---- */
  function barApplicant(minimal){
    const sys = state.sysName || 'נהיגה ספורטיבית';
    const minName = state.sysLogo==='state' ? 'משרד החדשנות, המדע והטכנולוגיה' : 'משרד התרבות והספורט';
    const brand = `<button class="brand-lock applic-brand" onclick="nav('home')" title="${minName} — דף הבית"><span class="emblem ministry no-chip">${state.sysLogo==='state'?stateLogo(40):ministryLogo(40)}</span><span class="bl-tx"><span class="wm">${minName}</span></span></button>`;
    if(minimal){
      return `<header class="govbar dark"><div class="left">
        ${brand}
        <div class="ctx ctx-static"><span class="ctx-sys">${sys}</span></div>
      </div>
      <div class="right">
        <span class="autosave bar-autosave" title="טיוטה נשמרה אוטומטית"><span class="as-note">טיוטה נשמרה אוטומטית ·</span>${icon('save',16)}<span class="as-time">09:51</span></span>
        <button class="bar-exit" onclick="nav('home')" title="יציאה מהתהליך" aria-label="יציאה מהתהליך">${icon('x',18)} <span class="btn-lbl">יציאה מהתהליך</span></button></div>
      </header>`;
    }
    return `<header class="govbar dark"><div class="left">
        ${brand}
        <div class="ctx">
          <div class="subsys-wrap syswitch">
            <button class="sw sw-combo" onclick="toggleSubsys(event)" aria-haspopup="true" aria-label="בחירת מערכת">
              <span class="sw-sys">${sys}</span>${icon('chevdown',16)}
            </button>
            <div class="subsysmenu sysmenu hidden">
              <div class="ssm-head">בחירת מערכת</div>
              ${Object.keys(SYS_MAP).map(id=>{const s=SYS_MAP[id];const cur=s.name===sys;return `<button class="um-item${cur?' on':''}" onclick="closeMenus();enterSystem('${id}')">${icon('grid',16)}<span class="um-tx">${s.name}</span>${cur?icon('check',16):''}</button>`;}).join('')}
            </div>
          </div>
        </div></div>
      <div class="right">
        <button class="bar-newreq" onclick="newRequest()" aria-label="הגשת בקשה חדשה">${icon('plusbare',18)} <span class="btn-lbl">הגשת בקשה חדשה</span></button>
        ${userPill('עופר ברוידא','',[
          {label:'הבקשות שלי',icon:'home',onclick:"nav('home')"},
          {label:'הודעות',icon:'mail',onclick:"nav('notifications')"},
          {label:'פרטים אישיים',icon:'user',onclick:"nav('profile')"},
          {div:true},
          {label:'החלפת מערכת',icon:'grid',onclick:"nav('gateway')"},
          {label:'התנתקות',icon:'arrowl',onclick:"goScreen('c','login')",danger:true},
        ])}
      </div></header>`;
  }

  /* ---- מסך טרום-הזדהות: כותרת מינימלית (ללא חיפוש / תפריט משתמש) ---- */
  function barAuth(){
    return `<header class="govbar light"><div class="left">${emblem()}</div>
      <div class="right"><span class="muted" style="display:flex;align-items:center;gap:8px;font-size:13.5px">${icon('shield',16)} gov.il</span></div></header>`;
  }

  /* ---- Landing / portal entry (מסך פתיחה לשני סוגי המשתמשים) ---- */
  function landing(){
    return `<div class="landing">
      <div class="landing-mid">
        <div class="emblem-lg">${stateLogo(64)}</div>
        <div class="kicker">מדינת ישראל</div>
        <h1>פורטל שירותים ממשלתי אחיד</h1>
        <p class="lead">מערכת אחת, חוויה אחת — להגשת בקשות ולניהולן. בחרו את נקודת הכניסה המתאימה לכם.</p>
        <div class="portal-cards">
          <button class="portal-card" onclick="enterProduct('c')">
            <span class="pc-tag">משתמש קצה</span>
            <div class="pc-ic">${icon('user',28)}</div>
            <h2>אזור אישי לאזרח</h2>
            <p>הגשת בקשות לשירותי המשרד, מעקב אחר סטטוס וניהול הפניות שלכם — במקום אחד.</p>
            <span class="pc-go">כניסה לאזור האישי ${icon('arrowl',18)}</span>
          </button>
          <button class="portal-card ops" onclick="enterProduct('o')">
            <span class="pc-tag">עובדי המשרד</span>
            <div class="pc-ic">${icon('grid',28)}</div>
            <h2>מערכת ניהול הבקשות</h2>
            <p>ניהול וטיפול בבקשות, תורי עבודה והכרעות — לפקידים ולמנהלי המערכות.</p>
            <span class="pc-go">כניסה למערכת ${icon('arrowl',18)}</span>
          </button>
        </div>
      </div>
      ${govFooter()}
    </div>`;
  }

  /* ---- Design index (מפת מסכים) — לצפייה בכל המסכים והמצבים ---- */
  function designMap(){
    const grp = (title, items)=>`<div class="dm-grp"><h3>${title}</h3><div class="dm-list">${items.map(i=>`<button class="dm-item" onclick="${i.go}">${icon(i.ic||'file',18)}<span>${i.t}</span>${icon('arrowl',15)}</button>`).join('')}</div></div>`;
    const cit = [
      {t:'1 · הזדהות וכניסה', ic:'shield', go:"goScreen('c','login')"},
      {t:'2 · הזדהות לאומית (gov.il)', ic:'lock', go:"goScreen('c','auth')"},
      {t:'3 · בחירת מערכת', ic:'grid', go:"goScreen('c','gateway')"},
      {t:'4 · אזור אישי — הבקשות שלי', ic:'home', go:"goScreen('c','home')"},
      {t:'4ב · אזור אישי — מצב ריק', ic:'inbox', go:"goEmptyHome()"},
      {t:'5 · טופס בקשה (תהליך)', ic:'edit', go:"goScreen('c','apply')"},
    ];
    const citMore = [
      {t:'קטלוג שירותים', ic:'list', go:"goScreen('c','services')"},
      {t:'דף שירות', ic:'file', go:"goScreen('c','service','music')"},
      {t:'מעקב בקשה', ic:'clock', go:"goScreen('c','track','M-2026-0042')"},
      {t:'הודעות', ic:'mail', go:"goScreen('c','notifications')"},
      {t:'פרטים אישיים', ic:'user', go:"goScreen('c','profile')"},
      {t:'הגשה בהצלחה', ic:'checkc', go:"goScreen('c','success')"},
    ];
    const citStates = [
      {t:'תחזוקה', ic:'wrench', go:"goState('c','maintenance')"},
      {t:'נעול / נדרש כרטיס חכם', ic:'lock', go:"goState('c','locked')"},
      {t:'שגיאה', ic:'alert', go:"goState('c','error')"},
      {t:'מצב ריק', ic:'inbox', go:"goState('c','empty')"},
    ];
    return `<div class="landing"><div class="landing-top">
        <span class="brand-lock" style="cursor:pointer" onclick="goLanding()"><span class="emblem" style="color:var(--navy)">${icon('menorah',32)}</span>
          <span class="bl-div" style="background:var(--line)"></span>
          <span class="bl-tx"><span class="wm" style="color:var(--ink-strong)">פורטל שירותים ממשלתי</span><span class="wm-sub">מפת מסכים · אב-טיפוס</span></span></span>
        <button class="txtbtn" onclick="goLanding()">חזרה למסך הפתיחה ←</button>
      </div>
      <div class="dm-wrap">
        <h1>מפת מסכים — אב-טיפוס</h1>
        <p class="dm-lead">פורטל השירותים והבקשות · האזור האישי — מסך אחרי מסך, לפי סדר המסע.</p>
        ${grp('המסע הראשי', cit)}
        ${grp('מסכים נוספים', citMore)}
        ${grp('מצבי מערכת', citStates)}
      </div>${govFooter()}</div>`;
  }

  function side(groups){
    const body = groups.map(g=>{
      const head = g.g?`<div class="grp">${g.g}</div>`:'';
      const items = g.items.map(i=>`
        <button class="nav ${i.on?'on':''}" onclick="nav('${i.screen}')" ${i.on?'aria-current="page"':''}>
          <span class="ic">${icon(i.ic,20)}</span><span>${i.t}</span>${i.badge?`<span class="badge">${i.badge}</span>`:''}</button>`).join('');
      return head+items;
    }).join('');
    return `<nav class="side" aria-label="ניווט">${body}<div class="foot">אב-טיפוס 0.4 · IGDS · gov.il</div></nav>`;
  }

  function statusBadge(k,label){ const s=DB.STATUS[k]||DB.STATUS.draft; return `<span class="badge-st ${s.cls}">${label||s.cat}</span>`; }
  function crumb(parts){ return `<div class="crumb">${parts.map((p,i)=>(i>0?'<span class="sep">/</span>':'')+(p.strong?`<b>${p.t}</b>`:(p.go?`<button class="crumb-link" onclick="${p.go}">${p.t}</button>`:p.t))).join('')}</div>`; }
  function stepper(steps,cur,opts){
    opts=opts||{};
    return `<div class="stepper" role="list">${steps.map((s,i)=>{
      const cls=i<cur?'done':(i===cur?'on':'');
      const click=opts.clickable&&i<=cur?`clickable" onclick="setStep(${i})`:'';
      return `<div class="step ${cls} ${click}" role="listitem"><span class="c">${i<cur?icon('check',16):(i+1)}</span><span class="lbl">${s.t}</span></div>`;
    }).join('')}</div>`;
  }
  function progress(cur,total){ return `<div class="progressbar"><i style="width:${Math.round(cur/(total-1)*100)}%"></i></div>`; }

  function govFooter(){
    return `<footer class="govfoot">
      <div class="brand"><span class="fseal">${stateLogo(30)}</span> פורטל השירותים והבקשות</div>
      <div class="lnks"><a href="#" onclick="goMap();return false">מפת מסכים</a><a href="#" onclick="return false">הצהרת נגישות</a><a href="#" onclick="return false">תנאי שימוש</a><a href="#" onclick="return false">פרטיות</a><a href="#" onclick="return false">צור קשר</a></div>
      <div>מופעל ע״י מערכת ההזדהות הממשלתית · gov.il</div></footer>`;
  }
  function fab(t){ const lbl=t||'תמיכה'; return `<button class="fab" onclick="toast('${lbl} — אב-טיפוס')">${lbl}</button>`; }

  /* ---- Spot illustration (gov.il style) — medallion + icon + dot motif. ניתן להחלפה בארט הלקוח ---- */
  function art(key, iconName, opts){
    opts=opts||{};
    const sz = opts.size||32;
    return `<div class="art-slot ${opts.cls||''}" data-art="${key}"${opts.h?` style="height:${opts.h}px"`:''} role="img" aria-label="${opts.alt||'איור'}">
      <i class="art-dot a"></i><i class="art-dot b"></i><i class="art-dot c"></i>
      <span class="art-medallion">${icon(iconName, sz)}</span></div>`;
  }
  /* ---- Avatar (round initials) ---- */
  function avatar(name, size){
    const p = (name||'').trim().split(/\s+/);
    const init = (p[0]?p[0][0]:'') + (p[1]?p[1][0]:'');
    const s = size||44;
    return `<span class="avatar" style="width:${s}px;height:${s}px;font-size:${Math.round(s/2.7)}px">${init}</span>`;
  }
  /* ---- "בתוקף" style ok-badge ---- */
  function badgeOk(t){ return `<span class="badge-ok">${icon('checkc',15)} ${t}</span>`; }

  function shell(bar, sideHtml, mainHtml, opts){
    opts=opts||{};
    const cls = opts.narrow?'main narrow':(opts.appcol?'main appcol':(opts.formpage?'main formpage':'main'));
    const skip = `<a href="#main" class="skip-link">דלג לתוכן</a>`;
    const overlay = sideHtml ? `<div class="menu-overlay" onclick="toggleMenu()"></div>` : '';
    return skip + bar + overlay + `<div class="app-body">${sideHtml||''}<main id="main" class="${cls}" tabindex="-1">${mainHtml}</main></div>` + govFooter() + (opts.nofab?'':fab(opts.fab));
  }
  function bleed(bar, html){ return bar + html; }

  return {icon, ministryLogo, stateLogo, emblem, iconbtn, barCitizen, barGateway, barOps, barApplicant, barAuth, landing, designMap, side, statusBadge, crumb, stepper, progress, govFooter, fab, art, avatar, badgeOk, shell, bleed};
})();

/* ---- Toast ---- */
let _toastT;
function toast(msg, ok){
  document.querySelectorAll('.toast').forEach(t=>t.remove());
  const el=document.createElement('div'); el.className='toast'+(ok?' ok':''); el.setAttribute('role','status');
  el.innerHTML=`${UI.icon(ok?'checkc':'info',18)}<span>${msg}</span>`; document.body.appendChild(el);
  clearTimeout(_toastT); _toastT=setTimeout(()=>el.remove(),2600);
}
