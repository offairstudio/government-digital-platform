<div dir="rtl">

# Core Patterns & Screen Architecture — תבניות הליבה

> מסמך נלווה ל-`00_Canon_Project.md`. מגדיר את **תבניות ה-UX המרכזיות** של הפלטפורמה — שכבת הביניים בין מלאי הרכיבים (`06`) לבין ה-Design System. זוהי שכבה מחייבת **לפני** בניית טוקנים וקומפוננטות, כדי שהרכיבים ייבנו עבור תבניות ידועות ולא להפך.

| שדה | ערך |
|---|---|
| גרסה | 0.1 — טיוטה ראשונית |
| סטטוס | שלב 3 — אפיון (UX Patterns) |
| עודכן | 17 ביוני 2026 |
| תלוי ב | ‏IA (`03`), ‏Flows (`04`), ‏Prototype (`05`), ‏Component Inventory (`06`) |

---

## 1. למה תבניות, ולמה עכשיו

מלאי הרכיבים מונה כ-40 רכיבים. אבל מערכת אמיתית לא נבנית מ-40 חלקים נפרדים — היא נשענת על מספר קטן של **תבניות חוזרות** שמרכיבות את הרכיבים יחד. הסדר הנכון הוא מלמעלה למטה:

```
UX Patterns        ← 5–8 תבניות מרכזיות (המסמך הזה)
   ▼
Layout Templates   ← 15–20 פריסות מסך קונקרטיות (וריאנטים של התבניות)
   ▼
Components         ← ~40 רכיבים (doc 06)
   ▼
Tokens             ← יסודות IGDS (Canon §6)
```

**הסיכון שהמסמך מונע:** מעבר ישיר ל-Design System ולפיגמה לפני הגדרת התבניות עלול להוביל לגילוי מאוחר שחסר Pattern שלם (למשל Request Workspace או Queue Management) — ולחזרה אחורה אחרי שבוע עבודה. ‏(D-012)

**עיקרון:** כל מסך בפלטפורמה הוא **מופע של תבנית**. אין מסכים "ייחודיים" שאינם נגזרים מתבנית.

---

## 2. קטלוג התבניות (Pattern Catalog)

לכל תבנית: מטרה · משמש (מסכים/מוצרים) · מבנה (אזורים) · רכיבים מרכיבים (מ-`06`) · וריאנטים · רספונסיביות · נגישות · מיפוי Salesforce.

### Pattern 01 — Personal Dashboard
**מטרה:** נקודת עוגן מבוססת-משימה — "מה דורש ממני פעולה".
**משמש:** אזור אישי אזרח (C · `home`) · שולחן עבודה פקיד (O · `queue`/workspace).
**מבנה (אזורים):** Header · Stats · Tasks (משימות פתוחות) · Recent Activity · Notifications.
**רכיבים:** App Bar, Side Nav, Stats Tiles, Alert Banner, List Row, Messages Feed, Status Badge.
**וריאנטים:** *Citizen* — דגש על בקשות פתוחות והשלמת פרטים. *Operations* — דגש על תור, חריגות SLA, הקצאות.
**רספונסיבי:** Stats קורסים ל-2 עמודות; Side Nav נסתר במובייל.
**נגישות:** Tasks ראשונים בסדר הקריאה; Stats כטקסט+מספר (לא צבע בלבד).
**Salesforce:** EC Home Page / Lightning App Home · Stats+Tasks = LWC · Notifications = EC.

### Pattern 02 — Request Workspace
**מטרה:** הצגה וטיפול ביחידת העבודה המרכזית (Request) — אותה ישות, שתי תצוגות.
**משמש:** צפייה/מעקב בקשה (C · `track`) · טיפול בבקשה (O · `case`).
**מבנה:** Header (זיהוי הבקשה) · Status · Main Content (נתוני הבקשה) · Documents · Activity Timeline · Action Panel.
**רכיבים:** Action Bar, Status Badge, Status Timeline, Field (readonly), Document Row, Messages, Two-column Layout.
**וריאנטים:** *Citizen (read-only + Complete)* — תצוגה לקריאה עם פעולת "השלם פרטים" כשנדרש. *Operations (editable + Drive)* — שינוי סטטוס, בדיקת מסמכים, בקשת השלמה, הכרעה.
**רספונסיבי:** Action Panel/Timeline עוברים מתחת ל-Main Content במובייל.
**נגישות:** Timeline עם `aria` לשלב נוכחי; פעולות הרסניות מובדלות (Danger).
**Salesforce:** Record Page (Case) · Action Bar = LWC/Quick Actions · Timeline/Documents = LWC/Related Files.

### Pattern 03 — Multi-Step Form
**מטרה:** איסוף נתונים מובנה ומונחה לכל סוג בקשה.
**משמש:** מצטיינים · קרנות · סקרים · **כל בקשה עתידית** (C · `apply`).
**מבנה:** Stepper · Form Area · Validation · Save Draft · Submit.
**רכיבים:** Stepper, Progress Bar, Field (+ מותנים), Info Box, Section, Dropzone/Conditional Upload, Auto-save Toast, Step Footer.
**וריאנטים:** מספר שלבים משתנה לפי טופס; שלב "השלמת פרטים" ממוקד-חוסר (נפתח על השדה החסר בלבד).
**רספונסיבי:** Stepper הופך אופקי-נגלל/אנכי במובייל.
**נגישות:** שדות מההזדהות readonly; חובה(*) אחרי התווית; שגיאה מתחת לשדה ומנחה; קישור Stepper↔תוכן ב-`aria`.
**Salesforce:** Screen Flow (התאמה מיטבית) · שדות מותנים = Flow logic.

### Pattern 04 — Queue Management
**מטרה:** ניהול תור עבודה של פקידים מעל אוסף בקשות.
**משמש:** כל תורי העבודה של ה-Operations Platform (O · `queue`).
**מבנה:** Filters · Table · Bulk Actions · Detail Preview.
**רכיבים:** Filter Pills, Data Table (Toolbar/Bulk Bar/Row), Status Badge, Stats Tiles, Empty State.
**וריאנטים:** לפי מערכת/תפקיד; תצוגת "ממתין לפעולתי" מול "כל הבקשות".
**רספונסיבי:** טבלה נגללת אופקית; עמודות-ליבה נשארות.
**נגישות:** טבלה עם כותרות `scope`; ערכי ת.ז./מספרים עטופים `<bdi>`; בחירה מרובה נגישה במקלדת.
**Salesforce:** List View / LWC Datatable · Bulk = LWC · Filters = List View filters.

### Pattern 05 — Service Catalog
**מטרה:** בחירת שירות להגשה (צד אזרח).
**משמש:** בחירת שירות לאזרח (C · `services`).
**מבנה:** Search · Categories · Service List.
**רכיבים:** Input (חיפוש), Filter Pills (קטגוריות), Service Card/Row, Empty State.
**וריאנטים:** מעט שירותים = רשימה פשוטה; הרבה = חיפוש+קטגוריות. (במקביל קיים **System Selection** בצד המנהלים — תבנית קרובה אך לבחירת מערכת, ראו §3.)
**רספונסיבי:** רשימה בעמודה אחת במובייל.
**נגישות:** כל שירות כפתור/קישור נגיש עם תיאור ותנאי סף.
**Salesforce:** EC Page · Service List = LWC / Navigation.

### Pattern 06 — Authentication & Entry
**מטרה:** כניסה מאובטחת אחידה דרך הזדהות לאומית.
**משמש:** כניסה לשני המוצרים (C · `login`; כניסת עובד ל-O).
**מבנה:** Brand/Art · Identity Action (ראשי) · Alternatives (משני) · Footer (gov.il).
**רכיבים:** Button (Primary), Link, Info text.
**וריאנטים:** *Citizen* — כולל "ללא ת.ז ישראלית/קטינים". *Operations* — הזדהות עובד.
**רספונסיבי:** עמודת אמנות נסתרת במובייל; פאנל מלא-רוחב.
**נגישות:** פעולה ראשית אחת ברורה; ללא מודאלים חוסמים מיותרים.
**Salesforce:** EC Login + Auth Provider (Apex) למערכת ההזדהות.

### Pattern 07 — System States & Feedback
**מטרה:** סט אחיד למצבי מערכת ומשוב — מחליף עיצובים אד-הוק.
**משמש:** לכל אורך שני המוצרים (Empty/Maintenance/Locked/Loading/Error/Success).
**מבנה:** Icon/Illustration · Message · (Action אופציונלי).
**רכיבים:** Empty State, System States, Alert Banner, Toast.
**וריאנטים:** מלא-עמוד (Maintenance/Locked) מול אינלייני (Empty/Error בתוך אזור).
**רספונסיבי:** ממורכז, מתאים לכל רוחב.
**נגישות:** `role="status"`/`aria-live` להודעות; Locked מסביר *איך* משיגים גישה.
**Salesforce:** LWC / Flow screens · Maintenance = Site setting.

---

## 3. מפת תבנית ↔ מסך (מהפרוטוטייפ `05`)

| תבנית | Citizen | Operations |
|---|---|---|
| 01 Personal Dashboard | `home` | שולחן עבודה (חלק מ-`queue`) |
| 02 Request Workspace | `track` (read-only) | `case` + `decision` |
| 03 Multi-Step Form | `apply` | — (פקיד צופה בערכי הטופס) |
| 04 Queue Management | — | `queue` |
| 05 Service Catalog | `services` | `systems` (וריאנט: בחירת מערכת) |
| 06 Authentication | `login` | כניסת עובד |
| 07 System States | מצבי ריק/תחזוקה/נעול | מצבי ריק/שגיאה |

---

## 4. Layout Templates (15–20 פריסות)

פריסות מסך קונקרטיות — וריאנטים של התבניות לכל מוצר. אלה ה"שלדים" שעליהם יורכבו הרכיבים.

| # | Template | תבנית-אם | מוצר |
|---|---|---|---|
| T-01 | Citizen Dashboard | 01 | C |
| T-02 | Clerk Workspace Dashboard | 01 | O |
| T-03 | Citizen Request — Tracking (read-only) | 02 | C |
| T-04 | Clerk Case Workspace | 02 | O |
| T-05 | Clerk Decision Screen | 02 | O |
| T-06 | Multi-Step Form — Standard | 03 | C |
| T-07 | Multi-Step Form — Complete Missing (ממוקד) | 03 | C |
| T-08 | Documents Step / Upload | 03 | C |
| T-09 | Queue — All Requests | 04 | O |
| T-10 | Queue — My Tasks / SLA | 04 | O |
| T-11 | Service Catalog | 05 | C |
| T-12 | System Selection (manager) | 05 | O |
| T-13 | Login — Citizen | 06 | C |
| T-14 | Login — Staff | 06 | O |
| T-15 | Empty State (inline) | 07 | C/O |
| T-16 | Maintenance (full-page) | 07 | C/O |
| T-17 | Locked / No-Access | 07 | C/O |
| T-18 | Success / Submission Result | 07 | C/O |
| T-19 | Messages / Notifications Center | 01/02 | C/O |
| T-20 | Profile / Settings | 01 | C/O |

---

## 5. כיצד תבניות צורכות רכיבים (עקרון ההרכבה)

- **תבנית = פריסת אזורים + חוזה תוכן.** היא מגדירה אילו אזורים קיימים ובאיזה סדר, לא את העיצוב המדויק.
- **אזור = אוסף רכיבים.** למשל אזור "Status" בתבנית 02 מורכב מ-Status Badge + Status Timeline.
- **רכיב = יחידה אטומית מ-`06`.** משמש בכמה תבניות ללא שינוי.
- **טוקן = ערך יסוד.** מזין את כל הרכיבים בכל התבניות.

מכאן: כשבונים רכיב ב-Design System, יודעים בדיוק **לאילו תבניות** הוא משרת ובאילו אזורים — וזה מונע רכיבים מיותרים או חסרים.

---

## 6. שאלות פתוחות וצעדים הבאים

**שאלות:**
1. ⬦ האם נדרשת תבנית נפרדת ל-Reports/Analytics ב-Operations, או שהיא וריאנט של Queue Management?
2. ⬦ האם Messages/Notifications הוא מסך עצמאי (T-19) או פאנל בתוך Dashboard/Request Workspace?
3. ⬦ Profile/Settings (T-20) — היקף העריכה בצד האזרח (רוב הפרטים מההזדהות, לקריאה).

**צעדים הבאים — שלב 4 (UI Design System), עכשיו עם הקשר מלא:**
1. קובץ Tokens מלא (צבע, טיפוגרפיה, Grid, Spacing, Icons, Radius).
2. ספריית קומפוננטות ב-Figma עם Variants/States — **לפי הרכיבים שהתבניות דורשות**.
3. תבניות ופריסות כ-Figma Templates/Layouts.
4. Usage Guidelines המקשרות רכיב ← אזור ← תבנית.

הרצף המלא שהושלם: Canon → Domain Model → IA → Flows → Component Inventory → **UX Patterns** → (הבא) Design System.

</div>
