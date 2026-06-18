<div dir="rtl">

# Component Inventory — מלאי רכיבים

> מסמך נלווה ל-`00_Canon_Project.md`. מלאי הרכיבים המשותפים לשני המוצרים, מבוסס על הפרוטוטייפ (`05`), הזרימות (`04`) וה-IGDS. זהו הבסיס לשלב 4 (Design System) ולספריית הקומפוננטות ב-Figma/קוד.

| שדה | ערך |
|---|---|
| גרסה | 0.1 — טיוטה ראשונית |
| סטטוס | שלב 3 — אפיון (Component Inventory) |
| עודכן | 17 ביוני 2026 |
| תלוי ב | ‏IGDS Tokens (Canon §6), ‏Wireframes (`05`), ‏Domain Model (`02`) |

---

## 1. עקרונות הספרייה

1. **רכיב אחד, שני מוצרים.** כל רכיב מוגדר פעם אחת ומשרת גם את ה-Citizen Portal וגם את ה-Operations Platform; ההבדל הוא צפיפות ותוכן, לא שפה ויזואלית.
2. **מבוסס Tokens.** כל ערך (צבע, מרווח, פינה, טיפוגרפיה) מגיע מטוקני IGDS (Canon §6). אין ערכים קשיחים.
3. **נגישות מובנית.** כל רכיב עומד ב-WCAG AA, ניווט מקלדת, ‏`aria` בעברית, ותמיכת RTL — לא כתוספת.
4. **מיפוי Salesforce.** לכל רכיב מצוין מסלול מימוש: Standard EC / Config / Flow / LWC (Canon §8).
5. **מצבים מלאים.** לכל רכיב מוגדרים כל המצבים: ‏default, ‏hover, ‏focus, ‏active, ‏disabled, ‏error, ‏loading, ‏empty — לפי הרלוונטיות.

מקרא מיפוי: **EC** = Standard Experience Cloud · **Cfg** = Config Only · **Flow** = Screen Flow · **LWC** = רכיב מותאם.
מקרא מוצר: **C** = Citizen · **O** = Operations · **C/O** = שניהם.

---

## 2. ניווט ומעטפת (Shell & Navigation)

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **App Bar** | סרגל עליון: לוגו+שם, הקשר מערכת, נגישות, שפה, התראות, תפריט משתמש | עם/בלי הקשר מערכת | EC (Theme/Header) | C/O |
| **Side Navigation** | ניווט צד עם קבוצות ופריטים | פריט: default / active / עם badge | EC (Navigation Menu) / LWC | C/O |
| **Nav Item** | פריט ניווט בודד | default · active · עם מונה התראות | EC / LWC | C/O |
| **System Switcher** | בחירת מערכת לניהול (Operations) | רשימת מערכות עם מונה בקשות | LWC / EC App Launcher | O |
| **Service List** | בחירת שירות להגשה (Citizen) | שורת שירות עם אייקון/תיאור/חץ | LWC / Flow | C |
| **Breadcrumb** | נתיב ניווט | C: שירות←בקשה · O: מערכת←תור←בקשה | LWC | C/O |
| **User Menu / Pill** | זהות + התנתקות + (החלפת תפקיד ב-O) | סגור / פתוח | EC | C/O |
| **Notifications Bell** | פעמון עם אינדיקטור לא-נקרא | ריק · עם נקודה · פתוח | EC (Notifications) | C/O |
| **Accessibility Bar** | גודל גופן, ניגודיות, גווני אפור, הקראה קולית | פעיל/לא-פעיל לכל כלי | LWC | C/O |
| **Language Toggle** | עברית / English | he · en | Cfg | C/O |
| **Support FAB** | כפתור תמיכה צף | default · hover | Cfg / LWC | C/O |

**נגישות:** Skip links ("דלג לתוכן", "דלג לניווט") בראש העמוד; סדר טאב לפי סדר ויזואלי RTL; ל-App Bar ול-Side Nav `role`/`aria-current` מתאימים.

---

## 3. פעולות (Actions)

### 3.1 Button — אנטומיה ווריאנטים

| וריאנט | שימוש | מצבים |
|---|---|---|
| **Primary** | פעולה ראשית אחת למסך (נייבי `#003E80`) | default · hover (`#0061A8`) · focus (טבעת 2px) · active · disabled |
| **Outline (Secondary)** | פעולה משנית | + אותם מצבים |
| **Ghost** | פעולה שלישונית / קישור-פעולה | + אותם מצבים |
| **Danger** | פעולה הרסנית (דחייה/מחיקה) | טקסט/מסגרת אדומים `#B91C1C` |
| גדלים | `sm` (7×14) · `default` (11×22) | — |

**כללי RTL:** פעולה ראשית בצד ההתחלה (ימין); חיצים כיווניים (`←`). **לא Pill** — פינות 8px בלבד (D-004).

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Action Bar** | אזור פעולות עקבי בראש מסך בקשה | פעולות ראשית/משנית/הרסנית בהיררכיה | LWC | C/O |
| **Filter Pills** | מסננים מהירים | default · active | LWC | C/O |
| **Link** | קישור-טקסט בתוך תוכן | default · hover · visited | — | C/O |

---

## 4. רכיבי טופס (Forms)

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Field** | מעטפת: תווית + חובה(*) + עזרה + שגיאה | default · focus · error · disabled · readonly | LWC / Flow | C/O |
| **Text Input** | קלט טקסט/מספר/טל׳ | + `inputmode`/`pattern` למספר/ת.ז. | EC/Flow/LWC | C/O |
| **Select / Dropdown** | בחירה מרשימה | סגור · פתוח · נבחר · disabled | EC/Flow/LWC | C/O |
| **Radio Group** | בחירה יחידה | נבחר/לא · disabled | Flow/LWC | C/O |
| **Checkbox** | סימון בודד/מרובה | מסומן · ביניים · disabled | Flow/LWC | C/O |
| **Date Field** | בחירת תאריך `dd/mm/yyyy` | ריק · נבחר · שגיאה | EC/LWC | C/O |
| **Textarea** | טקסט ארוך | default · focus | EC/LWC | C/O |
| **Info Box** | אזור הסבר/הנחיה למשתמש | מידע · אזהרה | Cfg/LWC | C/O |
| **Section / Fieldset** | קיבוץ שדות בכותרת | פתוח · מכווץ | LWC | C/O |
| **Conditional Field** | שדה/קבוצה שנחשפים לפי תשובה | מוסתר · מוצג | Flow (best fit) | C/O |
| **Readonly (Identity)** | שדה מההזדהות, לא-עריך | readonly עם רקע אפור | LWC | C |

**Stepper / Progress (טופס מועמדות מרובה-שלבים):**

| רכיב | תיאור | מצבים |
|---|---|---|
| **Stepper** | אינדיקטור שלבים ממוספר (6 שלבים במצטינים) | שלב: done(✓) · current · todo |
| **Progress Bar** | מילוי התקדמות | מתמלא מימין לשמאל (RTL) |
| **Step Footer** | ניווט שלב קודם/הבא + שמירת טיוטה | פעולות ראשית/משנית |
| **Auto-save Toast** | חיווי שמירה אוטומטית | מופיע · נעלם · עם חותמת זמן |

**נגישות טפסים:** תווית מעל השדה; כוכבית חובה **אחרי** התווית; הודעת שגיאה מתחת לשדה, מנחה לתיקון ("הדוא״ל אינו תקין. נסו שוב במבנה name@example.com"); טבעת פוקוס נייבי 2px; קישור בין Stepper לתוכן ב-`aria`.

---

## 5. נתונים (Data Display)

### 5.1 Data Table — אנטומיה (לב ה-Operations)

| חלק | תיאור |
|---|---|
| **Toolbar** | חיפוש · סינון · מיון · בחירת עמודות · ייצוא CSV · רענון |
| **Bulk Bar** | מופיע בבחירת שורות: שיוך למטפל · שינוי סטטוס · ייצוא |
| **Header** | כותרות עמודות (נייבי), מיון לחיץ |
| **Row** | checkbox · תאים · Status Badge · תפריט פעולות (⋯) |
| **States** | טעון · ריק (Empty State) · טעינה |

**עקרונות:** עמודות מצומצמות כברירת מחדל + הרחבה לפי בחירה (חשיפה הדרגתית). תאים מספריים/ת.ז. עטופים `<bdi>` ו-LTR. ערכי Placeholder יוחלפו בשמות אמיתיים.

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Stats Tile** | כרטיס מדד מספרי לפי סטטוס | רגיל · הדגשה (חריגה) | LWC | C/O |
| **List Row (Card list)** | שורת בקשה/שירות בכרטיס | עם Status Badge ופעולה מותנית | LWC | C/O |
| **Service Card** | כרטיס שירות/מערכת לבחירה | רגיל · hover | LWC | C/O |

---

## 6. סטטוס ומשוב (Status & Feedback)

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Status Badge** | תג סטטוס דו-רבדי (D-009): צבע=Category, טקסט=Label | 7 קטגוריות: טיוטה · הוגשה · בטיפול · ממתין למגיש · אושרה · נדחתה · נסגרה | LWC | C/O |
| **Status Timeline** | ציר זמן אנכי של שלבי התהליך | שלב: done · current · todo | LWC | C/O |
| **Alert Banner** | התראת משימה פתוחה ("השלמת פרטים") | מידע · אזהרה · עם פעולה | Flow/LWC | C/O |
| **Toast** | חיווי קצר (שמירה/הצלחה) | הצלחה · מידע · נעלם אוטומטית | LWC | C/O |
| **Messages Feed** | רשימת הודעות הקשורות לבקשה | נקרא · לא-נקרא | LWC (Message__c) | C/O |
| **Empty State** | אין נתונים + פעולה מוצעת | ריק עם CTA · ריק נקי | LWC | C/O |

**System States (סט אחיד שמחליף עיצובים אד-הוק):**

| מצב | תיאור | מוצר |
|---|---|---|
| **Maintenance** | "המערכת מתעדכנת" אחיד (במקום רקע DNA) | C/O |
| **Locked / No-Access** | אין הרשאה + הסבר *איך* משיגים גישה | C/O |
| **Loading** | טעינה | C/O |
| **Error** | שגיאת מערכת מנחה | C/O |
| **Success** | הצלחה/אישור | C/O |

**נגישות:** Status Badge אינו מסתמך על צבע בלבד — כולל טקסט (Label) ונקודה; Alert ו-Toast עם `role="status"`/`aria-live`.

---

## 7. העלאות (Uploads)

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Dropzone** | אזור גרירה/לחיצה להעלאה | ריק · hover · גרירה · שגיאה (סוג/גודל) | EC (File Upload)/LWC | C/O |
| **Uploaded File Chip** | קובץ שהועלה עם שם וסטטוס | הועלה · בבדיקה · נדחה | EC (Related Files) | C/O |
| **Document Row** | שורת מסמך נדרש בתצוגת פקיד | חסר · תקין · נדחה | LWC | O |
| **Conditional Upload** | העלאה שמופיעה לפי תשובה/מעמד | מוסתר · נדרש | Flow | C |

**נגישות:** Dropzone נגיש במקלדת + תווית; הודעת שגיאת קובץ ברורה (סוג/גודל); חיווי התקדמות העלאה.

---

## 8. מכלים (Containers)

| רכיב | תיאור | מצבים / וריאנטים | Salesforce | מוצר |
|---|---|---|---|---|
| **Card** | מכל תוכן עם כותרת אופציונלית | עם/בלי Header · עם פעולת קישור | LWC/EC | C/O |
| **Two-column Layout** | תוכן ראשי + פאנל צד (פעולות/היסטוריה) | רספונסיבי (קורס למובייל) | EC Grid/LWC | C/O |

---

## 9. סיכום מיפוי Salesforce

| מסלול | רכיבים אופייניים |
|---|---|
| **Standard EC** | App Bar, Navigation Menu, Notifications, File Upload, Related Files |
| **Config Only** | Language Toggle, Info/Links, Support |
| **Flow (Screen Flow)** | טופס מועמדות, שדות מותנים, Conditional Upload, Alert מותנה, New Request |
| **LWC** | Data Table, Status Badge/Timeline, Stats Tiles, Messages Feed, Stepper, Service/System Switcher |

**עיקרון:** מעדיפים EC/Cfg/Flow על פני LWC כשאפשר (Canon §8). הרכיבים המורכבים (טבלה, סטטוסים, דשבורד) הם LWC לגיטימיים.

---

## 10. שאלות פתוחות וצעדים הבאים

**שאלות:**
1. ⬦ אילו רכיבי Standard EC זמינים בגרסת ה-Org, ומה מגבלות ה-RTL ב-Experience Builder? (Canon §12.2)
2. ⬦ האם Data Table יישען על רכיב Standard (List View) או LWC מותאם?
3. ⬦ מילון Status Labels מלא לכל תהליך (מיפוי ל-7 הקטגוריות).

**צעדים הבאים — שלב 4 (UI Design System):**
1. הגדרת Tokens מלאה (צבע, טיפוגרפיה, Grid, Spacing, Icons) כקובץ אחד.
2. ספריית קומפוננטות מלאה ב-Figma עם Variants ו-States, מבוססת על מלאי זה.
3. Usage Guidelines לכל רכיב.
4. (בהמשך) המרה ל-Figma באמצעות ה-Figma MCP, והכנה למסירה לפיתוח.

</div>
