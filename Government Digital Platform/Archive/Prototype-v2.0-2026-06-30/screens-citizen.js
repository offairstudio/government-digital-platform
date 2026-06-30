/* ============================================================
   Citizen Portal — משתמש קצה · נאמן ל-gov.il (D-018)
   ללא Launcher מערכות — האזרח נכנס לשירות ישירות (כמו gov.il).
   ============================================================ */
window.CITIZEN = (function(){

  /* תפריט הצד הוסתר — הניווט עבר לסרגל העליון (פרטי משתמש + הודעות) */
  function cside(active){ return ''; }

  /* ---------- 1 · הזדהות וכניסה (כניסה לפורטל) ---------- */
  function login(){
    const html = `<div class="signin">
      <header class="signin-top">
        <div class="ministries">
          <img class="min-logo" src="assets/logos/state-lockup.svg" alt="מדינת ישראל · משרד החדשנות, המדע והטכנולוגיה">
          <img class="min-logo" src="assets/logos/culture-lockup.svg" alt="משרד התרבות והספורט">
        </div>
      </header>
      <div class="signin-stage">
        <div class="signin-card">
          <div class="sc-kicker">פורטל השירותים והבקשות · האזור האישי</div>
          <h2>הזדהות וכניסה</h2>
          <p>כדי לשמור על המידע האישי שלך, הכניסה דורשת הזדהות באמצעות מערכת ההזדהות הממשלתית.</p>
          <button class="id-btn" onclick="nav('auth')">${UI.icon("shield",20)} הזדהות לאומית</button>
          <div class="sc-byline">פותח ונתמך על ידי <img src="assets/logos/gov.svg" alt="gov.il" class="govil-mark" onerror="this.replaceWith(document.createTextNode('gov.il'))"></div>
          <p class="sc-foot">הזדהות מאובטחת אחת לקבלת שירותים ומידע מהממשלה ומהרשויות המקומיות</p>
        </div>
      </div>
    </div>`;
    return html;
  }

  /* ---------- 2 · הזדהות לאומית (gov.il) — ספק חיצוני · Placeholder ---------- */
  function auth(){
    const I_SMART = `<img src="assets/logos/smart_card.svg" alt="" style="height:42px;width:auto;display:block">`;
    const I_BIO = `<img src="assets/logos/bio_id.svg" alt="" style="height:40px;width:auto;display:block">`;
    const I_QUICK = `<img src="assets/logos/passkey.svg" alt="" style="height:40px;width:auto;display:block">`;
    const html = `<div class="govauth">
      <header class="ga-bar">
        <div class="ga-brand"><span class="ga-em">${UI.stateLogo(30)}</span><span class="ga-tx">מערכת הזדהות לאומית</span><span class="ga-flag">★ יחד ננצח ★</span></div>
        <div class="ga-links">
          <span class="ga-link">${UI.icon('lock',15)} כניסה בטוחה לשירותי הדיגיטל של ישראל <b>מה כדאי לבדוק?</b> ${UI.icon('chevdown',14)}</span>
          <span class="ga-link">${UI.icon('globe',15)} עברית ${UI.icon('chevdown',13)}</span>
          <span class="ga-link">${UI.icon('settings',15)} עזרה</span>
        </div>
      </header>
      <main class="ga-main">
        <h1 class="ga-title">הזדהות וכניסה לשירות מבוקש</h1>
        <div class="ga-card">
          <div class="ga-col ga-pass">
            <h2>${UI.icon('lock',18)} כניסה עם סיסמה</h2>
            <label class="ga-lbl">מספר זהות בן <b>9 ספרות</b> (כולל ספרת ביקורת)</label>
            <input class="ga-inp bdi" inputmode="numeric" placeholder="_________">
            <label class="ga-lbl">סיסמה</label>
            <input class="ga-inp" type="password">
            <a class="ga-forgot" href="#" onclick="return false">שכחתי סיסמה</a>
            <button class="ga-submit" onclick="nav('gateway')">כניסה <span class="ga-sh">${UI.icon('shield',18)}</span></button>
            <div class="ga-more">
              <div class="ga-more-h">דרכים נוספות להזדהות</div>
              <div class="ga-tiles">
                <button class="ga-tile" onclick="nav('gateway')"><span class="gt-ic">${I_SMART}</span><span>כרטיס חכם</span></button>
                <button class="ga-tile" onclick="nav('gateway')"><span class="gt-ic">${I_BIO}</span><span>תעודת זהות ביומטרית</span></button>
                <button class="ga-tile" onclick="nav('gateway')"><span class="gt-ic">${I_QUICK}</span><span>כניסה מהירה</span></button>
              </div>
            </div>
          </div>
          <div class="ga-sep"></div>
          <div class="ga-col ga-reg">
            <h2>אין לך סיסמה עדיין?</h2>
            <p>הרשמה להזדהות הלאומית תסייע לך לצרוך שירותים ממשלתיים רבים ומגוונים באמצעים דיגיטליים</p>
            <button class="ga-regbtn" onclick="nav('gateway')">להרשמה</button>
          </div>
        </div>
        <p class="ga-note">${UI.icon('info',15)} זהו מסך הדגמה של מערכת ההזדהות הממשלתית (gov.il) — ספק חיצוני. בלחיצה על כניסה תועברו לבחירת מערכת.</p>
      </main>
    </div>`;
    return html;
  }

  /* ---------- 4 · אזור אישי — הבקשות שלי (Figma: Citizen / Home) ---------- */
  function hero(){
    return `<div class="cit-hero apphero">
      <div class="hero-tx">
        <h2>${greeting()}, עופר ברוידא</h2>
        <p>הבקשות שלך, הסטטוסים והשירותים — במקום אחד.</p>
      </div>
      <div class="hero-art-card"><img class="hero-art-img" src="${state.sysImg||'assets/systems/driving.jpg'}" alt="${state.sysName||''}" onerror="this.style.display='none'"></div>
    </div>`;
  }

  function reqCard(r){
    const act = r.action==='complete'
      ? `<button class="btn btn-pri rc-act" onclick="openReq('${r.id}','complete')">השלם עכשיו</button>`
      : `<button class="btn btn-out rc-act" onclick="openReq('${r.id}','view')">צפה</button>`;
    return `<article class="reqcard ${r.group==='todo'?'is-todo':''}">
      <span class="rc-ic">${UI.icon(r.icon||'file',24)}</span>
      <div class="rc-body">
        <div class="rc-title">${r.service}</div>
        <div class="rc-meta">${r.meta}</div>
        ${r.desc?`<div class="rc-desc">${r.desc}</div>`:''}
      </div>
      <div class="rc-side">
        ${UI.statusBadge(r.status, r.label)}
        ${act}
        <button class="rc-more" title="פעולות" aria-label="פעולות" onclick="toast('פעולות בקשה — אב-טיפוס')">${UI.icon('more',22)}</button>
      </div>
    </article>`;
  }

  function emptyHome(){
    const feat=(ic,t,d)=>`<div class="ae-feat"><span class="ae-feat-ic">${UI.icon(ic,20)}</span><div class="ae-feat-tx"><b>${t}</b><p>${d}</p></div></div>`;
    const main = `${hero()}
      <div class="app-empty">
        <h2>עדיין לא הגשת בקשות</h2>
        <p>זהו האזור האישי שלך במערכת. כאן יופיעו כל הבקשות שתגיש — אפשר לעקוב אחר הסטטוס, להשלים פרטים חסרים ולהמשיך טיוטות שמורות, הכול במקום אחד.</p>
        <button class="btn btn-pri btn-lg" onclick="newRequest()">${UI.icon('plusbare',18)} הגשת בקשה חדשה</button>
        <div class="ae-feats">
          ${feat('list','מעקב סטטוס','עדכון על כל שלב בטיפול בבקשה')}
          ${feat('bell','התראות','הודעה כשנדרשת השלמת פרטים')}
          ${feat('save','שמירת טיוטות','אפשר לעצור ולהמשיך בכל זמן')}
        </div>
      </div>`;
    return UI.shell(UI.barApplicant(), null, main, {appcol:true});
  }

  function home(){
    if(state.appEmpty) return emptyHome();
    const q = (state.appSearch||'').trim();
    const type = state.appType||'all';
    const period = state.appPeriod||'all';
    let rows = DB.appRequests.slice();
    if(q) rows = rows.filter(r=>(r.service+' '+r.id+' '+r.meta+' '+(r.desc||'')).includes(q));
    if(type!=='all') rows = rows.filter(r=>r.type===type);
    if(period==='new') rows.sort((a,b)=>b.sortKey-a.sortKey);
    if(period==='old') rows.sort((a,b)=>a.sortKey-b.sortKey);
    const types = [...new Set(DB.appRequests.map(r=>r.type))];

    const groupsHtml = DB.appGroups.map(g=>{
      const items = rows.filter(r=>r.group===g.k);
      if(!items.length) return '';
      return `<section class="reqgroup">
        <h3 class="rg-title">${g.t}</h3>
        <div class="reqcards">${items.map(reqCard).join('')}</div></section>`;
    }).join('');

    const noMatch = `<div class="empty" style="margin-top:8px"><div class="ic">${UI.icon('search',28)}</div><b>לא נמצאו בקשות</b>
        <p>לא נמצאו בקשות התואמות את הסינון. נסו מילה אחרת או אפסו את הסינון.</p>
        <button class="btn btn-out" onclick="setAppSearch('');setAppType('all')">איפוס סינון</button></div>`;

    const main = `${hero()}
      <div class="app-list-head"><h2>הבקשות שלי</h2></div>
      <div class="app-filters">
        <div class="field"><label>מילת חיפוש</label>
          <input id="appSearchInput" placeholder="שם / מס׳ בקשה / ת.ז / סימוכין" value="${q}" oninput="setAppSearch(this.value)"></div>
        <div class="field" style="max-width:240px"><label>סוג בקשה</label>
          <select onchange="setAppType(this.value)"><option value="all">כל סוגי הבקשות</option>${types.map(t=>`<option value="${t}" ${type===t?'selected':''}>${t}</option>`).join('')}</select></div>
        <div class="field" style="max-width:190px"><label>מתי עודכן</label>
          <select onchange="setAppPeriod(this.value)">
            <option value="all" ${period==='all'?'selected':''}>כל התקופות</option>
            <option value="new" ${period==='new'?'selected':''}>מהחדש לישן</option>
            <option value="old" ${period==='old'?'selected':''}>מהישן לחדש</option>
          </select></div>
      </div>
      ${rows.length ? groupsHtml : noMatch}`;
    return UI.shell(UI.barApplicant(), null, main, {appcol:true});
  }

  /* ---------- קטלוג שירותים (gov.il) ---------- */
  function services(){
    const cats = ['הכל','מצטינים','קרנות','סקרים'];
    const cat = state.svcCat || 'הכל';
    const q = (state.svcSearch||'').trim();
    let items = DB.services.filter(s=>(cat==='הכל'||s.cat===cat) && (!q || (s.name+s.short+s.org).includes(q)));
    const list = items.length ? items.map(s=>`
      <button class="svc" onclick="nav('service','${s.id}')"><span class="ic">${UI.icon(s.icon,24)}</span>
        <div class="t"><b>${s.name}</b><p>${s.short}</p><div class="meta">${s.org}</div></div><span class="arr">${UI.icon('arrowl',18)}</span></button>`).join('')
      : `<div class="empty"><div class="ic">${UI.icon('search',28)}</div><b>לא נמצאו שירותים</b>
          <p>לא נמצאו שירותים התואמים את החיפוש "${q||cat}". נסו מילה אחרת או קטגוריה אחרת.</p>
          <button class="btn btn-out" onclick="setSvcCat('הכל');setSvcSearch('')">איפוס סינון</button></div>`;
    const main = `
      ${UI.crumb([{t:'אזור אישי'},{t:'הגשת בקשה',strong:true}])}
      <h1 class="title">איזה שירות תרצו?</h1>
      <div class="sub">בחרו שירות כדי לראות את התנאים, המסמכים הנדרשים ואופן ההגשה — לפני שמתחילים למלא.</div>
      <div class="field" style="max-width:440px;margin-bottom:16px"><input id="svcSearchInput" placeholder="חיפוש שירות לפי שם או נושא" value="${q}" oninput="setSvcSearch(this.value)"></div>
      <div class="pills">${cats.map(c=>`<span class="pill ${cat===c?'on':''}" onclick="setSvcCat('${c}')">${c}</span>`).join('')}</div>
      <div class="card">${list}</div>`;
    return UI.shell(UI.barApplicant(), cside('services'), main, {narrow:true});
  }

  /* ---------- דף שירות (gov.il Service Page) ---------- */
  function service(id){
    const s = DB.services.find(x=>x.id===id) || DB.services[0];
    const main = `
      ${UI.crumb([{t:'אזור אישי'},{t:'הגשת בקשה'},{t:s.cat},{t:s.name,strong:true}])}
      <div class="page-head"><div><h1 class="title">${s.name}</h1>
        <div class="sub" style="margin:8px 0 0">${s.org}</div></div>
        <span class="badge-st st-prog" style="font-size:13px">שירות מקוון</span></div>
      <p style="font-size:16px;max-width:760px;margin:14px 0 22px">${s.intro}</p>
      <div class="two-col">
        <div class="col-main">
          <div class="card accent" style="margin-bottom:18px"><div class="card-b">
            <h2 class="sec" style="margin-bottom:10px">מי יכול להגיש את הבקשה</h2>
            <ul style="padding-inline-start:20px;font-size:14.5px">${s.who.map(w=>`<li style="margin-bottom:6px">${w}</li>`).join('')}</ul></div></div>
          <div class="card accent" style="margin-bottom:18px"><div class="card-b">
            <h2 class="sec" style="margin-bottom:10px">איך מגישים את הבקשה</h2>
            <ol style="padding-inline-start:20px;font-size:14.5px">${s.how.map(h=>`<li style="margin-bottom:6px">${h}</li>`).join('')}</ol>
            <div class="note-box" style="margin-top:14px"><span class="ico">${UI.icon("info",18)}</span><div>${s.notice}</div></div></div></div>
          <div class="card accent" style="margin-bottom:18px"><div class="card-b">
            <h2 class="sec" style="margin-bottom:10px">המשך הטיפול בבקשה</h2>
            <p style="font-size:14.5px">${s.after}</p></div></div>
          <div class="card cta-band"><div class="card-b" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
            <div><b style="font-size:16px;color:var(--ink-strong)">מוכנים להגיש?</b>
              <p class="note" style="margin:2px 0 0">מילוי לוקח כ-10 דקות · ניתן לשמור טיוטה ולהמשיך מאוחר יותר.</p></div>
            <button class="btn btn-pri btn-lg" onclick="startForm('${s.id}')">התחלת בקשה ←</button></div></div>
        </div>
        <div class="col-side">
          <div class="card accent"><div class="card-b">
            <b style="font-size:14px">מסמכים נדרשים</b>
            ${s.docs.map(d=>`<div class="lrow" style="padding:9px 0;border-color:#eef0f3"><span>${UI.icon("clip",18)}</span><div class="info"><div class="nm" style="font-size:13.5px">${d}</div></div></div>`).join('')}
            <div class="divider"></div><b style="font-size:14px">עוד באותו נושא</b>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
              <a class="link" href="#" onclick="return false">תנאי הסף המלאים והתקנון</a>
              <a class="link" href="#" onclick="return false">שאלות נפוצות</a>
              <a class="link" href="#" onclick="return false">יצירת קשר עם האגף</a></div></div></div>
        </div>
      </div>`;
    return UI.shell(UI.barApplicant(), cside('services'), main);
  }

  /* ---------- טופס מרובה-שלבים (govforms style) ---------- */
  function apply(){
    const f = DB.formDef;
    const step = state.step || 0;
    const isComplete = state.completeMode;
    const stepBody = renderStep(f.steps[step].k, isComplete);
    const disc = state.discipline||'music';
    const fTitle = disc==='dance' ? 'טופס מועמדות — רקדן מצטיין תשפ״ו' : f.title;
    const subtitles = ['מלא את כל השדות המסומנים בכוכבית (*) והעלה את המסמכים הנדרשים', disc==='dance'?'מלא את פרטי ההכשרה המקצועית וסגנון ההתמחות':'בחר את המסלול ומלא את פרטי ההכשרה המוזיקלית','פרט הישגים, הופעות והעלה מסמכים תומכים','רשום את הרפרטואר לבחינה'+(disc==='dance'?'':' ואת פרטי המלווים'),'קרא את ההנחיות ואשר אותן כדי להמשיך','בדוק את הסיכום, אשר את ההצהרות וחתום'];
    const reqId = state.param || f.reqId;
    const main = `
      ${UI.crumb([{t:'הבקשות שלי',go:"nav('home')"},{t:'מעקב הבקשה',go:"openReq('"+reqId+"','view')"},{t:disc==='dance'?'מועמדות רקדן מצטיין':'מועמדות מוזיקאי מצטיין',strong:true}])}
      <div class="page-head"><div class="formhead"><div class="emb">${UI.icon(disc==='dance'?"award":"music",24)}</div>
        <div class="ttl"><b>${fTitle}</b>
          <span class="org">${f.org} ${UI.statusBadge('wait','השלמת פרטים')}</span>
          <div class="rid">מספר בקשה: <span class="bdi">${f.reqId}</span></div></div></div>
      </div>
      <div class="stepper-wrap">${UI.stepper(f.steps, step, {clickable:true})}</div>
      ${isComplete?`<div class="note-box"><span class="ico">${UI.icon("alert",20)}</span><div><b>הערת המשרד (16.06):</b> נא להעלות <b>תעודת זהות (שני צדדים)</b>. שאר השדות בשלב זה נשמרו.</div></div>`:''}
      <div class="req-note">שדות המסומנים בכוכבית (<span class="req">*</span>) הם שדות חובה</div>
      <div class="form-sections">${stepBody}</div>
      <div class="formfoot">
        <button class="btn btn-ghost" onclick="prevStep()" ${step===0?'disabled':''}>→ שלב קודם</button>
        <div class="acts">
          ${step<f.steps.length-1?`<button class="btn btn-pri" onclick="nextStep()">המשך לשלב הבא ←</button>`:`<button class="btn btn-pri" onclick="submitForm()">${UI.icon("check",16)} הגשת הבקשה</button>`}</div></div>`;
    return UI.shell(UI.barApplicant(true), null, main, {nofab:true, formpage:true});
  }

  function renderStep(k, isComplete){
    if(k==='personal') return `
      <h3 class="form-sec">${UI.icon('user',18)} פרטים אישיים</h3>
      <div class="info-box"><span class="ico">${UI.icon('bolt',18)}</span><div>שם, ת.ז ותאריך לידה מולאו ממערכת ההזדהות הממשלתית ואינם ניתנים לעריכה.</div></div>
      <div class="row">
        <div class="field"><label><span class="req">*</span> שם משפחה</label><input value="ברוידא" readonly></div>
        <div class="field"><label><span class="req">*</span> שם פרטי</label><input value="עופר" readonly></div></div>
      <div class="row">
        <div class="field"><label><span class="req">*</span> מין</label><select><option>בחר</option><option selected>זכר</option><option>נקבה</option></select></div>
        <div class="field"><label><span class="req">*</span> ת.ז.</label><input class="bdi" value="065465884" readonly></div></div>
      <div class="row">
        <div class="field"><label><span class="req">*</span> תאריך לידה</label><input class="bdi" value="12.04.1990" readonly></div>
        <div class="field" style="min-width:120px"><label>גיל</label><input value="34" readonly placeholder="מחושב אוטומטית"></div>
        <div class="field"><label><span class="req">*</span> ארץ לידה</label><input value="ישראל"></div>
        <div class="field" style="min-width:120px"><label>שנת עלייה</label><input class="bdi" placeholder="אם רלוונטי"></div></div>

      <h3 class="form-sec">${UI.icon('home',18)} כתובת קבועה</h3>
      <div class="row">
        <div class="field"><label><span class="req">*</span> רחוב</label><input placeholder="שם הרחוב"></div>
        <div class="field" style="min-width:110px"><label><span class="req">*</span> מס׳ בית</label><input class="bdi"></div>
        <div class="field" style="min-width:90px"><label>דירה</label><input class="bdi"></div></div>
      <div class="row">
        <div class="field"><label><span class="req">*</span> עיר</label><input placeholder="עיר מגורים"></div>
        <div class="field"><label>מיקוד</label><input class="bdi"></div></div>

      <h3 class="form-sec">${UI.icon('phone',18)} פרטי קשר</h3>
      <div class="row">
        <div class="field"><label><span class="req">*</span> טלפון נייד</label><input class="bdi" value="050-1234567" inputmode="tel"></div>
        <div class="field"><label><span class="req">*</span> דוא״ל</label><input value="ofer@example.com" type="email"></div></div>
      <div class="row">
        <div class="field"><label>טלפון נוסף</label><input class="bdi" inputmode="tel"></div>
        <div class="field"><label>בעל הטלפון הנוסף</label><select><option>בחר</option><option>אבא</option><option>אמא</option><option>אפוטרופוס</option><option>אחר</option></select></div></div>

      <h3 class="form-sec">${UI.icon('shield',18)} מועמד לשירות</h3>
      <div class="row">
        <div class="field" style="flex:none;min-width:220px"><label><span class="req">*</span> סוג שירות</label>
          <div style="display:flex;gap:20px;padding-top:8px"><label class="check" style="margin:0"><input type="radio" name="svc" checked><span>צבאי</span></label><label class="check" style="margin:0"><input type="radio" name="svc"><span>לאומי</span></label></div></div>
        <div class="field"><label><span class="req">*</span> תאריך גיוס</label><input class="bdi" placeholder="dd.mm.yyyy"></div></div>
      <label class="check"><input type="checkbox"><span>עוד לא קיבלתי תאריך גיוס</span></label>

      <h3 class="form-sec">${UI.icon('book',18)} לימודים כלליים</h3>
      <div class="row">
        <div class="field"><label><span class="req">*</span> בית-ספר</label><input></div>
        <div class="field"><label><span class="req">*</span> יישוב</label><input></div>
        <div class="field" style="min-width:110px"><label><span class="req">*</span> כיתה</label><input></div></div>
      <div class="row">
        <div class="field"><label>כתובת בית-הספר</label><input></div>
        <div class="field"><label>טלפון בית-הספר</label><input class="bdi"></div>
        <div class="field"><label>עיסוק אחר (אם לא בביה״ס)</label><input></div></div>

      <h3 class="form-sec">${UI.icon('clip',18)} העלאת מסמכים</h3>
      <div class="row">
        <div class="field"><label><span class="req">*</span> תמונת פספורט עדכנית</label><div class="filechip ok">${UI.icon('doc',18)} passport.jpg <span class="ok-tag">הועלה ${UI.icon('check',16)}</span><span class="x">${UI.icon('x',16)}</span></div>
          <div class="hint">JPG, PNG עד 5MB</div></div>
        <div class="field"><label><span class="req">*</span> תעודת זהות (שני צדדים)</label>
          <div class="dropzone ${isComplete?'req-miss':''}" onclick="toast('בחירת קובץ — אב-טיפוס')"><span class="big">${UI.icon('upload',24)}</span>לחץ להעלאת קובץ · PDF עד 10MB</div>
          ${isComplete?'<span class="errmsg" style="display:block">שדה חובה — חסר מסמך.</span>':''}</div></div>`;

    if(k==='training' && (state.discipline||'music')==='dance') return `
      <h3 class="form-sec">${UI.icon('book',18)} הכשרה מקצועית</h3>
      <div class="note-box"><span class="ico">${UI.icon('info',18)}</span><div>ההכוונה להכשרה מקצועית בלבד: תיכון אומנויות, להקה מקצועית, סטודיו מקצועי. אין לכלול חוגי ילדות. דרישת סף: לפחות שנתיים.</div></div>
      <div class="row"><div class="field" style="max-width:300px"><label><span class="req">*</span> שנת התחלת הכשרה מקצועית</label>
        <select><option>בחר שנה</option><option>תשפ״ב</option><option>תשפ״ג</option><option>תשפ״ד</option><option>תשפ״ה</option><option>תשפ״ו</option></select></div></div>
      <h3 class="form-sec">מוסדות לימוד</h3>
      <div class="repeat-card"><div class="rc-h"><b>מוסד 1</b></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם בית הספר</label><input></div>
          <div class="field"><label>כתובת</label><input></div>
          <div class="field" style="min-width:140px"><label><span class="req">*</span> מס׳ שנות הכשרה</label><input class="bdi"></div></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> סגנון ההתמחות</label>
            <select><option>בחר סגנון</option><option>בלט קלאסי</option><option>מודרני</option><option>ג׳אז</option><option>היפ-הופ</option><option>מחול עכשווי</option><option>אחר</option></select></div></div>
        <div class="rc-sub">פרטי המורה</div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם המורה/ים</label><input></div>
          <div class="field"><label>טלפון המורה</label><input class="bdi"></div>
          <div class="field"><label>דוא״ל המורה</label><input></div></div></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף מוסד נוסף</button>`;
    if(k==='training'){ const tr=state.musicTrack||'classical';
      const tcard=(id,ic,t,p)=>`<div class="track-card ${tr===id?'on':''}" onclick="setTrack('${id}')"><span class="tc-em">${UI.icon(ic,32)}</span><b>${t}</b><p>${p}</p></div>`;
      return `
      <h3 class="form-sec">${UI.icon('music',18)} בחירת מסלול מוזיקלי</h3>
      <div class="track-cards">
        ${tcard('classical','piano','נגינה – תחום קלאסי','כלי מיתר, כלי נשיפה, כלי הקשה, פסנתר')}
        ${tcard('jazz','disc','נגינה ושירה – ג׳אז','Be-bop · Ballads · Latin · Modern Jazz')}
        ${tcard('vocal','mic','שירה – תחום קלאסי','אופרה · אורטוריה · ליד קלאסי')}
      </div>
      <h3 class="form-sec">נסיון מקצועי</h3>
      <div class="row">
        <div class="field"><label><span class="req">*</span> כלי נגינה ראשי</label><input value="פסנתר"></div>
        <div class="field"><label><span class="req">*</span> מספר שנות לימוד</label><input class="bdi" value="12"></div></div>
      <div class="row">
        <div class="field"><label>כלי נגינה אחר</label><input></div>
        <div class="field"><label>מספר שנות לימוד (כלי אחר)</label><input class="bdi"></div></div>
      <h3 class="form-sec">מוסדות לימוד</h3>
      <div class="repeat-card"><div class="rc-h"><b>מוסד 1</b></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם המוסד</label><input value="האקדמיה למוזיקה, ירושלים"></div>
          <div class="field"><label>כתובת</label><input></div>
          <div class="field" style="min-width:150px"><label><span class="req">*</span> שנות לימוד במוסד</label><input class="bdi" value="4"></div></div>
        <div class="rc-sub">פרטי המורה</div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם המורה</label><input></div>
          <div class="field"><label>טלפון המורה</label><input class="bdi"></div>
          <div class="field"><label>דוא״ל המורה</label><input></div></div></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף מוסד נוסף</button>`;
    }

    if(k==='docs') return `
      <h3 class="form-sec">הופעות פומביות בתפקידי סולו</h3>
      <div style="overflow-x:auto"><table class="form-table"><thead><tr><th>חודש ושנה</th><th>מקום ההופעה</th><th>מסגרת</th><th>סולן בהרכב?</th><th></th></tr></thead>
        <tbody><tr><td><input class="bdi" value="05/2024"></td><td><input value="היכל התרבות"></td><td><input value="קונצרט"></td><td><select><option>בחר</option><option selected>כן</option><option>לא</option></select></td><td><button class="row-del" onclick="delTableRow(this)">${UI.icon('trash',16)}</button></td></tr></tbody></table></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף הופעה</button>

      <h3 class="form-sec">פרסים, מלגות ותחרויות</h3>
      <div style="overflow-x:auto"><table class="form-table"><thead><tr><th>חודש ושנה</th><th>שם התחרות / המלגה</th><th>זכית?</th><th>תיאור / הערות</th><th></th></tr></thead>
        <tbody><tr><td><input class="bdi" value="03/2023"></td><td><input value="תחרות ארצית"></td><td><select><option>בחר</option><option selected>כן</option><option>לא</option></select></td><td><input value="מקום ראשון"></td><td><button class="row-del" onclick="delTableRow(this)">${UI.icon('trash',16)}</button></td></tr></tbody></table></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף שורה</button>

      <h3 class="form-sec">יצירות שבוצעו בשנתיים האחרונות</h3>
      <div class="info-box"><span class="ico">${UI.icon('info',18)}</span><div>יש לרשום את שם המלחין ואת שם היצירות באותיות לטיניות.</div></div>
      <div style="overflow-x:auto"><table class="form-table"><thead><tr><th>שם המלחין</th><th>שם היצירה</th><th></th></tr></thead>
        <tbody><tr><td><input value="Bach"></td><td><input value="Prelude No.1"></td><td><button class="row-del" onclick="delTableRow(this)">${UI.icon('trash',16)}</button></td></tr></tbody></table></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף יצירה</button>

      <h3 class="form-sec">${UI.icon('clip',18)} העלאת מסמכים נוספים</h3>
      <div class="field"><div class="hint">ניתן להעלות תעודות, אישורי השתתפות, תמונות מהופעות ועוד.</div>
        <div class="dropzone" onclick="toast('בחירת קובץ — אב-טיפוס')"><span class="big">${UI.icon('upload',24)}</span>לחץ להעלאת מסמכים · PDF, JPG, PNG עד 10MB</div></div>`;

    if(k==='repertoire' && (state.discipline||'music')==='dance') return `
      <h3 class="form-sec">${UI.icon('music',18)} רפרטואר לבחינה</h3>
      <div class="info-box"><span class="ico">${UI.icon('info',18)}</span><div>פרטו את היצירות שתציגו בבחינה (ניתן להוסיף מספר יצירות).</div></div>
      <div class="repeat-card"><div class="rc-h"><b>יצירה 1</b></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם היצירה</label><input></div>
          <div class="field"><label><span class="req">*</span> כוריאוגרף</label><input></div></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> סגנון</label><input value="בלט קלאסי"></div>
          <div class="field"><label><span class="req">*</span> משך הקטע בדקות</label><select><option>בחר משך</option>${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option ${n===3?'selected':''}>${n}</option>`).join('')}</select></div></div></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף יצירה</button>
      <div class="note" style="margin-top:8px">לבחינת מחול אין צורך בפרטי מלווים.</div>`;
    if(k==='repertoire') return `
      <h3 class="form-sec">${UI.icon('music',18)} רפרטואר למבחן</h3>
      <div class="info-box"><span class="ico">${UI.icon('info',18)}</span><div>יש לרשום את שם המלחין ואת שם היצירות באותיות לטיניות.</div></div>
      <div class="repeat-card"><div class="rc-h"><b>יצירה 1</b></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם המלחין</label><input value="Bach"></div>
          <div class="field"><label><span class="req">*</span> שם היצירה</label><input value="Prelude No.1"></div></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> סגנון/תקופה</label><input value="Baroque"></div>
          <div class="field"><label><span class="req">*</span> משך הקטע בדקות</label><select><option>בחר משך</option>${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option ${n===4?'selected':''}>${n}</option>`).join('')}</select></div></div></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף יצירה</button>

      <h3 class="form-sec">${UI.icon('user',18)} מלווים לבחינה</h3>
      <div class="info-box"><span class="ico">${UI.icon('info',18)}</span><div>ניתן לציין עד 4 מלווים.</div></div>
      <div class="repeat-card"><div class="rc-h"><b>מלווה 1</b></div>
        <div class="row">
          <div class="field"><label><span class="req">*</span> שם מלא</label><input></div>
          <div class="field"><label><span class="req">*</span> כלי נגינה</label><input></div>
          <div class="field"><label><span class="req">*</span> טלפון</label><input class="bdi"></div>
          <div class="field"><label>דוא״ל</label><input></div></div></div>
      <button class="btn-add" onclick="addRepeat(this)">${UI.icon('plus',16)} הוסף מלווה</button>`;

    if(k==='guidelines') return `
      <h3 class="form-sec">${UI.icon('book',18)} הנחיות למועמדים</h3>
      <div class="note-box"><span class="ico">${UI.icon('info',18)}</span><div>נא לקרוא בעיון את ההנחיות. יש להסכים להנחיות על מנת להמשיך בתהליך.</div></div>
      <div class="card" style="box-shadow:none;border-color:var(--bg-2)"><div class="card-b" style="max-height:300px;overflow:auto">
        <ul style="padding-inline-start:20px;font-size:14.5px;line-height:1.95;color:var(--ink-soft)">
          <li>יש להגיע 30 דקות לפני מועד הבחינה עם תעודה מזהה.</li>
          <li>הליווי המוזיקלי באחריות המועמד/ת.</li>
          <li>משך הבחינה כ-20 דקות.</li>
          <li>נגני כלי נשיפה — נדרשת השתתפות במיונים לתזמורת צה"ל או אישור מתאים ממנהל התרבות.</li>
          <li>החלטות ועדת השיפוט הן סופיות.</li>
        </ul></div></div>
      <label class="check" style="margin-top:16px"><input type="checkbox"><span><span class="req">*</span> קראתי והבנתי את ההנחיות וכן הסכמתי לכל הדרישות בהן.</span></label>`;

    if(k==='summary') return `
      <h3 class="form-sec">${UI.icon('checkc',18)} סיכום הבקשה</h3>
      <div class="sum-block"><div class="sb-h"><b>פרטים אישיים</b><button class="link" onclick="setStep(0)">${UI.icon('edit',14)} עריכה</button></div>
        <div class="sb-grid">
          <div class="sb-item"><span class="k">שם מלא</span><span class="v">עופר ברוידא</span></div>
          <div class="sb-item"><span class="k">ת.ז</span><span class="v bdi">065465884</span></div>
          <div class="sb-item"><span class="k">דוא״ל</span><span class="v">ofer@example.com</span></div>
          <div class="sb-item"><span class="k">תאריך גיוס</span><span class="v">—</span></div></div></div>
      <div class="sum-block"><div class="sb-h"><b>הכשרה מקצועית</b><button class="link" onclick="setStep(1)">${UI.icon('edit',14)} עריכה</button></div>
        <div class="sb-grid">
          <div class="sb-item"><span class="k">מסלול</span><span class="v">נגינה – תחום קלאסי</span></div>
          <div class="sb-item"><span class="k">כלי ראשי</span><span class="v">פסנתר</span></div></div></div>
      <div class="sum-block"><div class="sb-h"><b>רפרטואר ומסמכים</b><button class="link" onclick="setStep(3)">${UI.icon('edit',14)} עריכה</button></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge-ok">${UI.icon('checkc',15)} פספורט הועלה</span><span class="badge-ok">${UI.icon('checkc',15)} ת.ז הועלתה</span><span class="badge-st st-prog">1 יצירה ברפרטואר</span></div></div>

      <h3 class="form-sec">הצהרות</h3>
      <label class="check"><input type="checkbox"><span>אני מצהיר/ה בזה כי כל הפרטים שמסרתי בשאלון נכונים.</span></label>
      <label class="check"><input type="checkbox"><span>אני מצהיר/ה כי קראתי את דף הדרישות וההנחיות והבנתי והסכמתי לכל הדרישות בו.</span></label>
      <label class="check"><input type="checkbox"><span>ידוע לי כי הגשת הבקשה אינה מבטיחה קבלה למעמד מצטיין בצה"ל, והאישור הסופי כפוף להחלטת ועדת השיפוט ואישור צה"ל.</span></label>
      <label class="check"><input type="checkbox"><span>ידוע לי כי החלטות ועדת השיפוט הן סופיות ואין אפשרות לערער עליהן.</span></label>
      <label class="check"><input type="checkbox"><span>ידוע לי כי נגני כלי נשיפה רשאים להיבחן רק לאחר השתתפות במיונים לתזמורת צה"ל או הסדרת אישור מתאים.</span></label>

      <h3 class="form-sec">${UI.icon('edit',18)} חתימה דיגיטלית</h3>
      <div class="hint" style="margin-bottom:8px">אנא חתום/י במסגרת למטה באמצעות העכבר או מסך המגע.</div>
      <div class="sig-wrap"><canvas id="sigPad" class="sig-pad" aria-label="אזור חתימה"></canvas><span class="sig-ph">${UI.icon('edit',16)} חתום/י כאן</span></div>
      <button class="link" onclick="clearSignature()">נקה חתימה</button>
      <label class="check" style="margin-top:16px"><input type="checkbox" id="declare"><span><span class="req">*</span> אני מאשר/ת את כל ההצהרות ואת הגשת הבקשה.</span></label>`;
    return '';
  }

  /* ---------- מעקב בקשה (Pattern 02 read-only מועשר) ---------- */
  function track(id){
    if(!id){
      const rows = DB.citizenRequests.map(r=>`
        <div class="lrow lrow-mine" style="cursor:pointer" onclick="nav('track','${r.id}')">
          <div class="info"><div class="nm">${r.service}</div><div class="mt"><span class="bdi">${r.id}</span> · ${r.system} · עודכן ${r.updated}</div></div>
          ${UI.statusBadge(r.status, r.label)}<span class="arr" style="color:var(--gov-blue);font-weight:800">←</span></div>`).join('');
      const main = `
        ${UI.crumb([{t:'אזור אישי'},{t:'הבקשות שלי',strong:true}])}
        <h1 class="title">הבקשות שלי</h1>
        <div class="sub">מעקב אחר כל הבקשות שהגשת, לפי סטטוס.</div>
        <div class="pills"><span class="pill on">הכל <span class="c">3</span></span><span class="pill">פעילות <span class="c">2</span></span><span class="pill">ממתין לפעולתך <span class="c">1</span></span><span class="pill">סגורות <span class="c">1</span></span></div>
        <div class="card">${rows}</div>`;
      return UI.shell(UI.barApplicant(), cside('track'), main, {narrow:true});
    }
    const r = DB.citizenRequests.find(x=>x.id===id) || DB.citizenRequests[0];
    const det = DB.requestDetail[r.id] || {ref:'—', docs:[], messages:[{from:'המערכת',date:r.submitted,body:`הבקשה התקבלה ומספרה ${r.id}.`}]};
    const waiting = r.status==='wait', closed = r.status==='appr'||r.status==='rej';
    const tl = `<ul class="tl">
      <li class="done"><span class="pt"></span><div class="nm">הוגשה</div><div class="dt">${r.submitted}</div></li>
      <li class="${waiting?'cur':'done'}"><span class="pt"></span><div class="nm">בבדיקת השלמות${waiting?' — נדרשת פעולה':''}</div><div class="dt">${r.updated}</div></li>
      <li class="${r.status==='prog'?'cur':(closed?'done':'todo')}"><span class="pt"></span><div class="nm">בבחינה מקצועית</div></li>
      <li class="${closed?'cur':'todo'}"><span class="pt"></span><div class="nm">החלטת ועדה</div></li>
      <li class="${r.status==='appr'?'done':'todo'}"><span class="pt"></span><div class="nm">תוצאה${r.status==='appr'?' — אושרה':''}</div></li></ul>`;
    const docsHtml = det.docs.length ? det.docs.map(d=>`<div class="lrow"><div class="info"><div class="nm">${d.name} ${UI.statusBadge(d.status,d.label)}</div></div>${d.status==='wait'?`<button class="btn btn-pri btn-sm" onclick="nav('apply')">העלה</button>`:`<button class="link" onclick="toast('צפייה במסמך — אב-טיפוס')">צפה</button>`}</div>`).join('') : `<div class="empty" style="padding:20px"><span class="muted">אין מסמכים מצורפים</span></div>`;
    const msgsHtml = det.messages.map(m=>`<div class="lrow" style="align-items:flex-start"><span style="font-size:18px;color:var(--blue);line-height:1" aria-hidden="true">${m.from==='המשרד'?UI.icon("mail",18):UI.icon("settings",18)}</span><div class="info"><div class="nm" style="font-size:13.5px">${m.from} · <span class="muted" style="font-weight:600">${m.date}</span></div><div class="mt" style="color:var(--secondary)">${m.body}</div></div></div>`).join('');
    const main = `
      ${UI.crumb([{t:'הבקשות שלי',go:"nav('home')"},{t:r.id,strong:true}])}
      <div class="page-head"><h1 class="title">${r.service}</h1></div>
      <div class="idpair" style="margin:8px 0 16px;align-items:center">${UI.statusBadge(r.status, r.label)}<span><b>מספר בקשה</b> <bdi>${r.id}</bdi></span>${det.ref&&det.ref!=='—'?`<span><b>מספר סימוכין</b> <bdi>${det.ref}</bdi></span>`:''}<span>הוגשה ${r.submitted}</span></div>
      <div class="two-col" style="margin-top:8px">
        <div class="col-main">
          <div class="card" style="margin-bottom:16px"><div class="card-h"><b>${UI.icon("list",18)} מעקב סטטוס</b></div><div class="card-b">${tl}</div></div>
          <div class="card"><div class="card-h"><b>${UI.icon("clip",18)} מסמכים</b></div>${docsHtml}</div></div>
        <div class="col-side">
          <div class="card accent" style="margin-bottom:16px"><div class="card-b"><b style="font-size:14px">פעולות</b>
            ${waiting?`<button class="btn btn-pri btn-block" style="margin:10px 0" onclick="nav('apply')">השלם פרטים ←</button>`:''}
            <button class="btn btn-out btn-block" style="${waiting?'':'margin-top:10px'}" onclick="toast('צפייה בטופס — אב-טיפוס')">צפייה בטופס המלא</button></div></div>
          <div class="card accent"><div class="card-h"><b>${UI.icon("mail",18)} הודעות הבקשה</b></div>${msgsHtml}</div></div>
      </div>`;
    return UI.shell(UI.barApplicant(), cside('track'), main);
  }

  /* ---------- הודעות ---------- */
  function notifications(){
    const list = DB.notifications.map(n=>`
      <div class="lrow" style="cursor:pointer;${n.unread?'background:#F2F7FD':''}" onclick="nav('track','${n.req}')">
        <span class="noti-ic">${UI.icon(n.icon,22)}</span>
        <div class="info"><div class="nm">${n.title} ${n.unread?'<span style="color:var(--danger);font-size:11px;font-weight:700">● חדש</span>':''}</div><div class="mt">${n.body}</div></div>
        <div class="mt" style="white-space:nowrap">${n.time}</div></div>`).join('');
    const main = `
      ${UI.crumb([{t:'אזור אישי'},{t:'הודעות',strong:true}])}
      <div class="page-head"><h1 class="title">הודעות</h1><button class="btn btn-ghost btn-sm" onclick="toast('סומן כנקרא',true)">סמן הכל כנקרא</button></div>
      <div class="sub">עדכונים על הבקשות שלך והודעות מהמשרד.</div>
      <div class="card">${list}</div>`;
    return UI.shell(UI.barApplicant(), cside('notifications'), main, {narrow:true});
  }

  /* ---------- פרופיל (MyGov style) ---------- */
  function profile(){
    const changeLink = `<button class="link" onclick="toast('עריכת פרטים — אב-טיפוס')">${UI.icon('edit',14)} שינוי</button>`;
    const main = `
      ${UI.crumb([{t:'אזור אישי'},{t:'פרטים אישיים',strong:true}])}
      <h1 class="title" style="text-align:center;margin-bottom:24px">פרטים אישיים</h1>

      <div class="card" style="margin-bottom:20px">
        <div class="profile-card">
          ${UI.avatar('עופר ברוידא',72)}
          <div class="pc-tx"><b>עופר ברוידא</b>
            <div class="meta"><span class="bdi">065465884</span> · ה׳ באייר התשמ״ד · ארץ לידה: ישראל</div></div>
        </div>
        <div style="border-top:1px solid var(--bg-2)"><div class="info-cols">
          <div class="info-col">
            <div class="ic-head"><span class="lbl">${UI.icon('phone',16)} פרטי הקשר שלך</span>${changeLink}</div>
            <div class="val">ofer@example.com<br><span class="bdi">050-1234567</span></div>
          </div>
          <div class="info-col">
            <div class="ic-head"><span class="lbl">${UI.icon('home',16)} כתובת מגורים</span>${changeLink}</div>
            <div class="val">הרצל 10, דירה 4, תל אביב–יפו<br>מיקוד <span class="bdi">6688101</span></div>
          </div>
          <div class="info-col">
            <div class="ic-head"><span class="lbl">${UI.icon('user',16)} מצב משפחתי</span></div>
            <div class="val">נשוי</div>
          </div>
        </div></div>
      </div>

      <div class="info-box"><span class="ico">${UI.icon("bolt",18)}</span><div>פרטי הזיהוי (שם, ת.ז, תאריך לידה) מגיעים ממערכת ההזדהות הממשלתית ואינם ניתנים לעריכה. ניתן לעדכן פרטי קשר וכתובת בלבד.</div></div>

      <div class="row">
        <div class="card" style="flex:1;min-width:280px"><div class="card-b">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px"><b style="font-size:16px;color:var(--ink-strong)">${UI.icon('mail',17)} דיוור דיגיטלי</b>${UI.badgeOk('פעיל')}</div>
          <label class="check"><input type="checkbox" checked><span>קבלת הודעות והחלטות בדוא״ל</span></label>
          <label class="check"><input type="checkbox" checked><span>קבלת מסרונים (SMS)</span></label>
          <label class="check"><input type="checkbox"><span>דיוור עדכונים כלליים</span></label>
        </div></div>
        <div class="card" style="flex:1;min-width:280px"><div class="card-b">
          <b style="font-size:16px;color:var(--ink-strong)">${UI.icon('doc',17)} מסמכים אחרונים</b>
          <div class="lrow" style="padding:12px 0;border-color:var(--bg-2)">${UI.icon('doc',18)}<div class="info"><div class="nm" style="font-size:14px">אישור תושב</div></div>${UI.badgeOk('בתוקף')}</div>
          <div class="lrow" style="padding:12px 0;border:none">${UI.icon('doc',18)}<div class="info"><div class="nm" style="font-size:14px">תעודת זהות</div></div>${UI.badgeOk('בתוקף')}</div>
        </div></div>
      </div>`;
    return UI.shell(UI.barApplicant(), cside('profile'), main);
  }

  /* ---------- T-18 · Success / Submission Result ---------- */
  function success(){
    const main = `<div class="state-page">
      <div class="ic ok">${UI.icon('checkc',46)}</div>
      <h1>הבקשה הוגשה בהצלחה</h1>
      <p>בקשתך נקלטה במערכת. מספר הבקשה <b class="bdi">M-2026-0042</b>. נשלח אישור לדוא״ל שלך, וניתן לעקוב אחר הסטטוס באזור האישי.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
        <button class="btn btn-pri btn-lg" onclick="nav('track','M-2026-0042')">למעקב אחר הבקשה</button>
        <button class="btn btn-out btn-lg" onclick="nav('home')">חזרה לבקשות שלי</button>
      </div>
      <div class="card" style="margin-top:30px;max-width:540px;text-align:start;width:100%"><div class="card-b">
        <b style="color:var(--ink-strong)">מה קורה עכשיו?</b>
        <ul style="padding-inline-start:20px;margin-top:10px;font-size:14.5px;line-height:1.95;color:var(--ink-soft)">
          <li>הבקשה תעבור לבדיקת שלמות.</li>
          <li>אם יחסר מידע — תישלח הודעה ל"השלמת פרטים".</li>
          <li>לאחר מכן הבקשה תועבר לבחינה מקצועית ולהחלטת ועדה.</li>
        </ul></div></div>
    </div>`;
    return UI.bleed(UI.barApplicant(), main) + UI.govFooter();
  }

  /* ---------- T-16/T-17/T-15 · Full-page states (citizen-facing) ---------- */
  function cstate(){
    const which = state.stateView || 'maintenance';
    const v = {
      maintenance:{ic:'warn',icon:'wrench',h:'המערכת מתעדכנת',p:'אנו מבצעים תחזוקה מתוכננת לשיפור השירות. השירות יחזור לפעילות בקרוב — נשמח לראותך שוב בעוד זמן קצר.',a:'רענון העמוד',a2:'חזרה לבקשות שלי'},
      locked:{ic:'lock',icon:'lock',h:'נדרשת הזדהות מאובטחת',p:'הגישה לשירות זה דורשת הזדהות באמצעות כרטיס חכם. כדי להמשיך, הזדהו עם כרטיס חכם או פנו למוקד התמיכה בטלפון *6552.',a:'הזדהות עם כרטיס חכם',a2:'פנייה לתמיכה'},
      error:{ic:'warn',icon:'alert',h:'אירעה שגיאה',p:'לא הצלחנו להשלים את הפעולה. נסו שוב בעוד מספר רגעים. אם התקלה חוזרת, פנו למוקד התמיכה ונשמח לסייע.',a:'נסו שוב',a2:'חזרה לבקשות שלי'},
      empty:{ic:'blue',icon:'inbox',h:'עדיין אין בקשות',p:'לא הגשת בקשות עד כה. בחרו שירות כדי להתחיל בקשה חדשה — המערכת תלווה אתכם צעד אחר צעד.',a:'בחירת שירות והתחלה',a2:''},
    }[which];
    const main = `<div class="state-page">
      <div class="ic ${v.ic}">${UI.icon(v.icon,42)}</div>
      <h1>${v.h}</h1><p>${v.p}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
        <button class="btn btn-pri btn-lg" onclick="${which==='empty'?"nav('services')":"nav('home')"}">${v.a}</button>
        ${v.a2?`<button class="btn btn-out btn-lg" onclick="nav('home')">${v.a2}</button>`:''}
      </div></div>`;
    return UI.bleed(UI.barApplicant(), main) + UI.govFooter();
  }

  return {login, auth, home, services, service, apply, track, notifications, profile, success, cstate};
})();
