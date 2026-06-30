/* ============================================================
   Government Operations Platform — ניהול בקשות
   ארכיטקטורה נאמנה למערכת האמיתית (Canon 09 §6):
   שער בחירת מערכת → מעטפת בתוך מערכת (Header + תוכן רוחב מלא,
   ללא תפריט צד) → רשימת בקשות (אקורדיון סטטוס) → טיפול (מקטעים).
   ============================================================ */
window.OPS = (function(){

  const SYSTEM = 'נהיגה ספורטיבית';

  /* ---------- שער בחירת מערכת (post-login Gateway) ---------- */
  function gateway(){
    const cards = [
      {id:'driving', logo:'נ', name:'נהיגה ספורטיבית', org:'רשות לנהיגה ספורטיבית', tag:'רשות', img:'assets/systems/driving.jpg', state:'active'},
      {id:'music',   logo:'מ', name:'מוזיקאים מצטיינים', org:'אגף מצטיינים · משרד התרבות והספורט', tag:'אגף', img:'assets/systems/excellence.png', state:'active'},
      {id:'dance',   logo:'ר', name:'רקדנים מצטיינים',  org:'אגף מצטיינים · משרד התרבות והספורט', tag:'אגף', img:'assets/systems/excellence.png', state:'active'},
      {id:'excel',   logo:'מ', name:'מערכת מצטינים',   org:'אגף התרבות · משרד התרבות והספורט', tag:'אגף', img:'assets/systems/excel.png', state:'maint'},
      {id:'funds',   logo:'ס', name:'סל מדע',          org:'משרד החדשנות, המדע והטכנולוגיה', tag:'מטה', img:'assets/systems/funds.jpg', inv:true, state:'lock'},
    ];
    const card = c=>{
      if(c.state==='maint') return `<div class="gw-card maint disabled">
        <div class="banner maint"><img class="bn-img" src="${c.img}" alt="" loading="lazy"><div class="state-msg"><span class="si">${UI.icon("wrench",20)}</span>המערכת מתעדכנת<br><span style="font-weight:600;font-size:12.5px">אנא חזרו במועד מאוחר יותר</span></div></div>
        <div class="ftr"><div class="seal" style="background:#fff;padding:5px">${c.inv?UI.stateLogo(32):UI.ministryLogo(32)}</div><div class="org">${c.org}</div><div class="nm">${c.name}</div></div></div>`;
      if(c.state==='lock') return `<div class="gw-card disabled" title="אין הרשאה">
        <div class="banner lock"><img class="bn-img" src="${c.img}" alt="" loading="lazy"><div class="state-msg"><span class="si">${UI.icon("lock",18)}</span>אין גישה למערכת זו<br><span style="font-weight:600;font-size:12.5px">נדרש כרטיס חכם</span></div></div>
        <div class="ftr"><div class="seal" style="background:#fff;padding:5px">${c.inv?UI.stateLogo(32):UI.ministryLogo(32)}</div><div class="org">${c.org}</div><div class="nm">${c.name}</div></div></div>`;
      return `<button class="gw-card" onclick="enterSystem('${c.id}')">
        <div class="banner"><img class="bn-img" src="${c.img}" alt="" loading="lazy"><span class="tag">${c.tag}</span></div>
        <div class="ftr"><div class="seal" style="background:#fff;padding:5px">${c.inv?UI.stateLogo(32):UI.ministryLogo(32)}</div><div class="org">${c.org}</div><div class="nm">${c.name}</div></div></button>`;
    };
    const html = `<div class="gateway-wrap">
      <div class="gw-head"><h1>בחרו במערכת הרצויה</h1>
        <p>שלום עופר — בחרו את המערכת שאליה תרצו להיכנס, בהתאם להרשאות שלכם. ניתן להחליף מערכת בכל עת מהתפריט העליון.</p></div>
      <div class="gateway">${cards.map(card).join('')}</div>
    </div>`;
    return UI.bleed(UI.barGateway(), html) + UI.govFooter();
  }

  /* ---------- רשימת בקשות (אקורדיון מקובץ לפי סטטוס) ---------- */
  function requests(){
    const open = state.accOpen || {draft:true};
    const search = (state.qSearch||'').trim();
    const groups = [
      {k:'draft', keys:['draft'],        t:'טיוטות'},
      {k:'wait',  keys:['wait'],         t:'השלמת פרטים'},
      {k:'prog',  keys:['sub','prog'],   t:'בקשות בטיפול'},
      {k:'done',  keys:['appr','rej'],   t:'בקשות שהוכרעו'},
    ];
    // מקור: בקשות התור, ממופות לקטגוריות
    const qType = state.qType || 'all';
    const qView = state.qView || 'all'; // T-10: כל הבקשות / ממתין לפעולתי / חריגות SLA
    let rows = DB.queue.slice();
    if(qView==='mine') rows = rows.filter(r=>r.handler==='אני');
    if(qView==='sla')  rows = rows.filter(r=>r.alarm);
    if(search) rows = rows.filter(r=>(r.name+r.id+r.tz+r.type+(r.ref||'')).includes(search));
    if(qType!=='all') rows = rows.filter(r=>r.type===qType);

    const accHtml = groups.map(g=>{
      const grp = rows.filter(r=>g.keys.includes(r.status));
      const isOpen = open[g.k];
      const body = grp.length ? grp.map(r=>`
        <div class="req-row" onclick="nav('case','${r.id}')" role="button" tabindex="0">
          <div class="who"><div class="nm">${r.name} <span class="bdi" style="color:var(--muted);font-weight:600">${r.tz}</span></div>
            <div class="role">${r.type}</div></div>
          ${UI.statusBadge(r.status, r.label)}
          <div class="col"><span class="lbl">תאריך עדכון</span>${r.updated}</div>
          <div class="col"><span class="lbl">הערת סטטוס</span>${r.alarm?`<span style="color:var(--danger)">חריגת SLA</span>`:'—'}</div>
          <div class="col"><span class="lbl">מספר סימוכין</span><span class="bdi">${r.ref||'RNW_'+r.id.slice(-4)}</span></div>
          <div class="acts">
            <button title="עריכה / פתיחה" onclick="event.stopPropagation();nav('case','${r.id}')">${UI.icon("edit",18)}</button>
            <button title="הורדה" onclick="event.stopPropagation();toast('הורדה — אב-טיפוס')">${UI.icon("download",16)}</button>
            <button title="עוד" onclick="event.stopPropagation();toast('פעולות שורה — אב-טיפוס')">${UI.icon("more",18)}</button>
          </div>
        </div>`).join('')
        : `<div class="empty" style="padding:24px"><span class="muted">אין בקשות בקטגוריה זו</span></div>`;
      return `<div class="acc ${isOpen?'open':''}">
        <button class="acc-h" onclick="toggleAcc('${g.k}')" aria-expanded="${isOpen?'true':'false'}">
          <span class="chev">${UI.icon("chevdown",18)}</span><span class="ttl">${g.t}</span><span class="cnt">(${grp.length})</span>
          <span class="frac">${groups.indexOf(g)+1}/${groups.length}</span>
        </button>
        <div class="acc-body">${body}</div></div>`;
    }).join('');

    const reqTypes = ['נהג — בקשה לרישיון חדש','נהג — בקשה לחידוש רישיון','נהג — בקשה להוספת דרגה','נהג — הנפקה באובדן/גניבה'];
    const main = `
      <div class="page-head">
        <div><h1 class="title">ניהול בקשות — ${SYSTEM}</h1>
          <div class="sub" style="margin:8px 0 0">רשות לנהיגה ספורטיבית · ${DB.queue.length} בקשות · משובץ לפי תפקיד והרשאה.</div></div>
        <div style="position:relative">
          <button class="btn btn-pri" onclick="toggleNewReq()">+ הגשת בקשה חדשה</button>
          <div id="newReqMenu" class="dropdown-pop hidden" style="position:absolute;inset-inline-end:0;top:52px;z-index:30;min-width:300px">
            <div class="dp-head">סוגי בקשות</div>
            ${reqTypes.map(t=>`<button class="dp-item" onclick="toast('פתיחת בקשה — אב-טיפוס');toggleNewReq()"><span>${t}</span>${UI.icon('arrowl',16)}</button>`).join('')}
          </div>
        </div>
      </div>

      <div class="qtabs">
        <button class="qtab ${qView==='all'?'on':''}" onclick="setQView('all')">כל הבקשות <span class="c">${DB.queue.length}</span></button>
        <button class="qtab ${qView==='mine'?'on':''}" onclick="setQView('mine')">ממתין לפעולתי <span class="c">${DB.queue.filter(r=>r.handler==='אני').length}</span></button>
        <button class="qtab sla ${qView==='sla'?'on':''}" onclick="setQView('sla')">${UI.icon('clock',15)} חריגות SLA <span class="c">${DB.queue.filter(r=>r.alarm).length}</span></button>
      </div>
      <div class="toolbar">
        <div class="field" style="min-width:220px"><label>מילת חיפוש</label>
          <input placeholder="שם / מס׳ בקשה / ת.ז / סימוכין" value="${search}" oninput="setQSearch(this.value)"></div>
        <div class="field" style="min-width:210px"><label>סוג בקשה</label>
          <select onchange="setQType(this.value)"><option value="all">כל סוגי הבקשות</option>${[...new Set(DB.queue.map(r=>r.type))].map(t=>`<option value="${t}" ${qType===t?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="field" style="min-width:170px"><label>מתי עודכן</label>
          <select onchange="toast('סינון תאריך — אב-טיפוס')"><option>כל התקופות</option><option>החודש</option><option>3 חודשים אחרונים</option></select></div>
      </div>
      <div class="listmeta"><span>מציג: ${rows.length} בקשות</span>
        <button class="link grow" onclick="toast('רענון',true)">${UI.icon("refresh",16)} רענן</button>
        <button class="link" onclick="nav('committees')">${UI.icon("award",16)} ועדות ובחינות</button>
        <button class="link" onclick="toast('הורדת CSV — אב-טיפוס')">${UI.icon("download",16)} הורדת CSV</button></div>
      ${accHtml}`;
    return UI.shell(UI.barOps(SYSTEM), null, main, {wide:true});
  }

  /* ---------- מסך טיפול בבקשה (מקטעים מתקפלים ממוספרים) ---------- */
  function caseScreen(id){
    const r = DB.queue.find(x=>x.id===id) || DB.queue[0];
    const sec = state.secOpen || {data:true};
    const tl = `<ul class="tl">
      <li class="done"><span class="pt"></span><div class="nm">הוגשה</div><div class="dt">12.06 · המערכת</div></li>
      <li class="cur"><span class="pt"></span><div class="nm">בבדיקת השלמות</div><div class="dt">${r.updated} · אני</div></li>
      <li class="todo"><span class="pt"></span><div class="nm">בחינה מקצועית</div></li>
      <li class="todo"><span class="pt"></span><div class="nm">החלטה</div></li></ul>`;

    const section = (k,num,title,body)=>`<div class="section ${sec[k]?'open':''}" id="sec-${k}">
      <button class="section-h" onclick="toggleSec('${k}')" aria-expanded="${sec[k]?'true':'false'}"><span class="ttl">${title}</span><span class="num">${num}</span><span class="chev">${UI.icon("chevdown",18)}</span></button>
      <div class="section-b">${body}</div></div>`;

    const dataBody = `<div class="row">
        <div class="field"><label>שם מלא</label><input value="${r.name}" readonly></div>
        <div class="field"><label>ת.ז</label><input class="bdi" value="${r.tz}" readonly></div>
        <div class="field"><label>שם הספורט</label><input value="נהיגה ספורטיבית" readonly></div>
        <div class="field"><label>שנת לידה</label><input class="bdi" value="1990" readonly></div>
        <div class="field"><label>מספר אגודה</label><input class="bdi" value="2031" readonly></div>
        <div class="field"><label>סוג בקשה</label><input value="${r.type}" readonly></div>
      </div>`;
    const docsBody = `<div class="row">
        <div class="field" style="min-width:260px"><label>אישור תשלום אגרה</label><div class="filechip ok">${UI.icon("doc",18)} fee.pdf <span class="ok-tag">תקין ${UI.icon("check",16)}</span></div></div>
        <div class="field" style="min-width:260px"><label>בדיקה גופנית</label><div class="filechip ok">${UI.icon("doc",18)} medical.pdf <span class="ok-tag">תקין ${UI.icon("check",16)}</span></div></div>
        <div class="field" style="min-width:260px"><label>בדיקה ארגומטרית</label>
          <div class="filechip" style="color:var(--st-wait-t);background:var(--st-wait-b)">${UI.icon("doc",18)} חסר — נדרש מהמגיש</div></div>
      </div>
      <div class="row" style="margin-top:6px">
        <div class="field"><label><span class="req">*</span> תאריך בדיקה ארגומטרית</label><input class="bdi" placeholder="dd/mm/yyyy" value="—"></div>
      </div>`;
    const tableBody = `<div class="tbl-tools" style="border:none;padding:0 0 10px">
        <input class="search" placeholder="חיפוש בטבלה"><span class="chip">סינון ${UI.icon("chevdown",18)}</span><span class="chip">בחירת עמודות ${UI.icon("chevdown",18)}</span><span class="chip sp">+ הוספת נתונים</span></div>
      <div class="tblwrap"><table class="dt"><thead><tr><th>מס׳ ת.ז</th><th>שם הספורט</th><th>מגדר</th><th>שנת לידה</th><th>מס׳ קבוצה</th><th>סה״כ תחרויות</th></tr></thead>
        <tbody>${[1,2,3].map(()=>`<tr><td class="bdi">204113998</td><td>נהיגה ספורטיבית</td><td>זכר</td><td class="bdi">1998</td><td class="bdi">2031</td><td class="bdi">14</td></tr>`).join('')}</tbody></table></div>`;
    const emptyBody = `<div class="empty"><div class="ic">${UI.icon("inbox",20)}</div><b>אין נתונים להצגה</b><p>ניתן להוסיף שורה ידנית או לטעון קובץ נתונים.</p>
        <div style="display:flex;gap:10px;justify-content:center"><button class="btn btn-out" onclick="toast('הוספת שורה — אב-טיפוס')">הוספת שורה</button><button class="btn btn-out" onclick="toast('העלאת CSV — אב-טיפוס')">העלאת קובץ CSV</button></div></div>`;

    const secs = [
      {k:'data',  t:'נתוני הבקשה',     body:dataBody},
      {k:'table', t:'טבלת תחרויות',    body:tableBody},
      {k:'empty', t:'רשומות נוספות',   body:emptyBody},
      {k:'docs',  t:'מסמכים והעלאות',  body:docsBody},
    ];
    const sectionsHtml = secs.map((s,i)=>section(s.k, `${i+1}/${secs.length}`, s.t, s.body)).join('');
    const tocItems = secs.map((s,i)=>`<button class="toc-item" onclick="gotoSec('${s.k}')"><span class="toc-num">${i+1}</span><span>${s.t}</span></button>`).join('');
    const tocMenuItems = secs.map((s,i)=>`<button class="dp-item" onclick="closeMenus();gotoSec('${s.k}')"><span>${i+1}. ${s.t}</span></button>`).join('');

    const caseBar = `<header class="case-bar">
        <button class="case-back" onclick="nav('requests')" title="חזרה לתור הבקשות" aria-label="חזרה לתור הבקשות">${UI.icon('arrowr',20)}</button>
        <div class="case-id">
          <div class="ci-title">${r.name} · ${r.type} ${UI.statusBadge(r.status, r.label)}</div>
          <div class="ci-meta"><span class="bdi">ת.ז ${r.tz}</span> · נהג · הוגש 12.06.2026 · עודכן 16.06 14:22</div>
        </div>
        <div class="case-bar-actions">
          <div class="toc-wrap">
            <button class="btn btn-ghost btn-sm" onclick="toggleTocMenu(event)" aria-haspopup="true">${UI.icon("menu",16)} תוכן עניינים</button>
            <div class="tocmenu dropdown-pop hidden" style="position:absolute;inset-inline-start:0;top:46px;z-index:50;min-width:240px"><div class="dp-head">תוכן עניינים</div>${tocMenuItems}</div>
          </div>
          <button class="btn btn-danger btn-sm icon-collapse" title="מחיקה" onclick="toast('מחיקה — אב-טיפוס')">${UI.icon("trash",16)}<span class="btn-lbl">מחיקה</span></button>
          <button class="btn btn-out btn-sm icon-collapse" title="שמירה כטיוטא" onclick="toast('נשמר כטיוטא',true)">${UI.icon("save",18)}<span class="btn-lbl">טיוטא</span></button>
          <button class="btn btn-pri btn-sm" onclick="nav('decision','${r.id}')">${UI.icon("send",16)} בדיקה ושליחה</button>
        </div>
      </header>`;
    const collapsed = state.tocCollapsed;
    const main = `
      <div class="case-layout${collapsed?' toc-collapsed':''}">
        <div class="case-doc">
          ${sectionsHtml}
        </div>
        <aside class="case-toc${collapsed?' collapsed':''}">
          <div class="toc-h"><button class="toc-toggle" onclick="toggleToc()" title="כיווץ / הרחבה" aria-label="כיווץ תוכן עניינים">${UI.icon("menu",16)}</button><span class="toc-h-tx">תוכן עניינים</span></div>
          ${tocItems}
        </aside>
      </div>`;
    return UI.shell(caseBar, null, main, {wide:true});
  }

  /* ---------- מסך הכרעה ---------- */
  function decision(id){
    const r = DB.queue.find(x=>x.id===id) || DB.queue[0];
    const main = `
      ${UI.crumb([{t:SYSTEM},{t:r.id},{t:'הכרעה',strong:true}])}
      <h1 class="title">הכרעה בבקשה</h1>
      <div class="sub">${r.name} · ${r.type} · <span class="bdi">ת.ז ${r.tz}</span></div>
      <div class="card" style="margin-bottom:16px;max-width:760px"><div class="card-h"><b>תקציר לבדיקה</b></div>
        <div class="lrow">${UI.statusBadge('appr','תקין')}<div class="info"><div class="nm">כל המסמכים הוגשו ואושרו</div></div></div>
        <div class="lrow">${UI.statusBadge('appr','עבר')}<div class="info"><div class="nm">חוות דעת בודק מקצועי</div><div class="mt">"עומד בדרישות — ממליץ לאשר"</div></div></div>
      </div>
      <div class="card" style="max-width:760px"><div class="card-h"><b>החלטה</b></div><div class="card-b">
        <div class="field"><label><span class="req">*</span> נימוק החלטה</label>
          <textarea id="decReason" placeholder="הקלד נימוק שיוצג למגיש בהודעה ובאזור האישי..."></textarea>
          <span class="errmsg">יש להזין נימוק לפני ההכרעה.</span></div>
        <div class="actionbar" style="margin-top:8px">
          <button class="btn btn-pri" onclick="decide('appr')">${UI.icon("check",16)} אישור הבקשה</button>
          <button class="btn btn-danger" onclick="decide('rej')">דחייה</button>
          <button class="btn btn-out" onclick="toast('הועבר לוועדה',true)">העברה לוועדה</button></div>
        <div class="info-box" style="margin-top:14px"><span class="ico">${UI.icon("info",18)}</span><div>אישור/דחייה ישלחו הודעה אוטומטית למגיש ויעדכנו את האזור האישי שלו — אותה בקשה, בתצוגת אזרח.</div></div>
      </div></div>`;
    return UI.shell(UI.barOps(SYSTEM), null, main, {wide:true});
  }

  /* ---------- מצבי מערכת מלאי-עמוד (בתוך מערכת) ---------- */
  function states(){
    const which = state.stateView || 'maintenance';
    const views = {
      maintenance:{ic:'${UI.icon("wrench",20)}',h:'המערכת מתעדכנת',p:'אנו מבצעים תחזוקה מתוכננת לשיפור השירות. המערכת תחזור לפעילות בקרוב.',a:'רענון העמוד'},
      locked:{ic:'${UI.icon("lock",18)}',h:'אין גישה למערכת זו',p:'הגישה דורשת הזדהות באמצעות כרטיס חכם. לקבלת הרשאה פנו למנהל המערכת או למוקד התמיכה.',a:'הזדהות עם כרטיס חכם'},
      empty:{ic:'${UI.icon("inbox",20)}',h:'אין בקשות בתור',p:'לא נמצאו בקשות התואמות את הסינון. נסו לשנות את הסינון או לפתוח בקשה חדשה.',a:'איפוס סינון'},
      loading:{ic:'${UI.icon("clock",18)}',h:'טוען…',p:'טוען את נתוני המערכת, אנא המתינו.',a:''},
      error:{ic:'${UI.icon("alert",20)}',h:'אירעה שגיאה',p:'לא הצלחנו להשלים את הפעולה. נסו שוב, ואם התקלה חוזרת פנו לתמיכה.',a:'נסה שוב'},
    };
    const v = views[which];
    const tabs = [['maintenance','תחזוקה'],['locked','נעול'],['empty','ריק'],['loading','טעינה'],['error','שגיאה']]
      .map(([k,t])=>`<span class="pill ${which===k?'on':''}" onclick="setState('${k}')">${t}</span>`).join('');
    const main = `
      <div class="page-head"><h1 class="title">מצבי מערכת (Pattern 07)</h1></div>
      <div class="sub">סט אחיד למצבי מערכת — מלא-עמוד בתוך מערכת. בחרו מצב לתצוגה.</div>
      <div class="pills">${tabs}</div>
      <div class="card"><div class="sys-state" style="min-height:380px">
        <div class="ic">${v.ic}</div><h1>${v.h}</h1><p>${v.p}</p>
        ${v.a?`<button class="btn btn-pri" onclick="toast('${v.a} — אב-טיפוס')">${v.a}</button>`:''}</div></div>`;
    return UI.shell(UI.barOps(SYSTEM), null, main, {wide:true});
  }

  /* ---------- T-14 · Operations (employee) Login ---------- */
  function login(){
    const html = `<div class="login"><div class="card-login">
      <div class="lhead"><div class="seal">${UI.icon('shield',24)}</div>
        <div><h2>כניסת עובדי המשרד</h2><p>מערכת ניהול הבקשות · משרד התרבות והספורט</p></div></div>
      <div class="lbody">
        <div class="lmain">
          <h3>הזדהות עובד</h3>
          <p class="muted" style="font-size:13px">הכניסה למערכת מותרת לעובדים מורשים בלבד, באמצעות הזדהות עובד ארגונית.</p>
          <button class="id-btn" onclick="nav('gateway')">${UI.icon('shield',20)} הזדהות עובד (SSO)</button>
          <p class="muted" style="font-size:12px;text-align:center">הזדהות מאובטחת דרך מערכת ההזדהות הארגונית</p>
        </div>
        <div class="lalt">
          <h3 style="font-size:14px">דרכים נוספות</h3>
          <button class="alt-card" onclick="nav('gateway')"><span class="ic">${UI.icon('doc',18)}</span>כרטיס חכם ארגוני</button>
          <button class="alt-card" onclick="toast('פנייה למנהל מערכת — אב-טיפוס')"><span class="ic">${UI.icon('help',18)}</span>בעיית גישה? פנייה למנהל המערכת</button>
        </div>
      </div>
      <div class="sec-foot"><span>${UI.icon("lock",18)} גישה מאובטחת · לעובדים מורשים בלבד</span><span>gov.il</span></div>
    </div></div>`;
    return UI.bleed(UI.barAuth(), html) + UI.govFooter();
  }

  /* ---------- מודול ועדות ובחינות (talentportal §3) ---------- */
  function committees(){
    const exams=[
      {date:'24.06',time:'09:00',place:'אולם הבחינות, תל אביב',cands:6,committee:'ועדת נהיגה א׳',st:'sub',lbl:'מתוכננת'},
      {date:'26.06',time:'10:30',place:'מתחם המבחנים, חיפה',cands:4,committee:'ועדת נהיגה ב׳',st:'sub',lbl:'מתוכננת'},
      {date:'18.06',time:'09:00',place:'אולם הבחינות, תל אביב',cands:8,committee:'ועדת נהיגה א׳',st:'appr',lbl:'הסתיימה'},
    ];
    const members=[['רינת אדרי','יו״ר הוועדה'],['יואב כהן','בודק מקצועי'],['מיכל לוי','נציגת המשרד'],['דנה ניר','נציגת צה״ל']];
    const cands=[
      {n:'עופר ברוידא',tz:'065465884',t:'רישיון חדש',score:'—',st:'sub',l:'ממתין לבחינה'},
      {n:'דנה כהן',tz:'204556779',t:'רישיון חדש',score:'88',st:'appr',l:'עבר'},
      {n:'תמר גולן',tz:'301556442',t:'הוספת דרגה',score:'74',st:'prog',l:'בדיון'},
      {n:'יואב מזרחי',tz:'204113998',t:'רישיון חדש',score:'—',st:'wait',l:'נדרשת השלמה'},
    ];
    const examRows=exams.map(e=>`
      <div class="lrow">
        <div style="text-align:center;min-width:62px"><div style="font-weight:700;color:var(--ink-strong);font-size:15px">${e.date}</div><div class="mt">${e.time}</div></div>
        <div class="info"><div class="nm">${e.committee} · ${e.cands} מועמדים</div><div class="mt">${e.place}</div></div>
        ${UI.statusBadge(e.st,e.lbl)}
        <button class="btn btn-out btn-sm" onclick="toast('פתיחת דיון ועדה — אב-טיפוס')">פתח דיון</button></div>`).join('');
    const candRows=cands.map(c=>`<tr><td>${c.n}</td><td class="bdi">${c.tz}</td><td>${c.t}</td><td class="bdi">${c.score}</td><td>${UI.statusBadge(c.st,c.l)}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="toast('הזנת ציון — אב-טיפוס')">הזן ציון</button></td></tr>`).join('');
    const main=`
      ${UI.crumb([{t:SYSTEM},{t:'ועדות ובחינות',strong:true}])}
      <div class="page-head"><div><h1 class="title">ועדות ובחינות — ${SYSTEM}</h1>
        <div class="sub" style="margin:8px 0 0">תזמון בחינות, הרכב ועדות שיפוט והזנת תוצאות.</div></div>
        <button class="btn btn-pri" onclick="toast('תזמון בחינה חדשה — אב-טיפוס')">+ תזמון בחינה</button></div>
      <div class="stats">
        <div class="stat"><span class="ic">${UI.icon('calendar',18)}</span><div class="n">2</div><div class="l">בחינות מתוכננות</div></div>
        <div class="stat"><span class="ic">${UI.icon('list',18)}</span><div class="n">18</div><div class="l">מועמדים בתור</div></div>
        <div class="stat"><span class="ic">${UI.icon('user',18)}</span><div class="n">4</div><div class="l">חברי ועדה</div></div>
        <div class="stat"><span class="ic">${UI.icon('checkc',18)}</span><div class="n">7</div><div class="l">נבחנו החודש</div></div></div>
      <div class="two-col">
        <div class="col-main">
          <div class="card" style="margin-bottom:18px"><div class="card-h"><b>${UI.icon('calendar',18)} בחינות מתוכננות</b></div>${examRows}</div>
          <div class="card"><div class="card-h"><b>${UI.icon('list',18)} מועמדים לבחינה</b><button class="link" onclick="toast('ייצוא רשימה — אב-טיפוס')">ייצוא</button></div>
            <div class="tblwrap"><table class="dt"><thead><tr><th>מועמד</th><th>ת.ז</th><th>סוג בקשה</th><th>ציון</th><th>סטטוס</th><th></th></tr></thead><tbody>${candRows}</tbody></table></div></div>
        </div>
        <div class="col-side"><div class="card accent"><div class="card-h"><b>${UI.icon('user',18)} הרכב הוועדה</b></div>
          ${members.map(m=>`<div class="lrow" style="padding:13px 20px">${UI.avatar(m[0],40)}<div class="info"><div class="nm" style="font-size:14px">${m[0]}</div><div class="mt">${m[1]}</div></div></div>`).join('')}
          <div class="card-b" style="border-top:1px solid var(--bg-2)"><button class="btn btn-pri btn-block" onclick="toast('סיכום והכרעת ועדה — אב-טיפוס')">${UI.icon('checkc',16)} סיכום והכרעת ועדה</button></div></div></div>
      </div>`;
    return UI.shell(UI.barOps(SYSTEM), null, main, {wide:true});
  }

  return {login, gateway, requests, caseScreen, decision, states, committees};
})();
