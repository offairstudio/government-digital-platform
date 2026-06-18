<div dir="rtl">

# פורטל שירותים ממשלתי אחיד — פרויקט עיצוב

עיצוב מחדש של מעטפת הפורטל והטפסים הדיגיטליים של משרד התרבות והספורט ומשרד החדשנות, המדע והטכנולוגיה — מבוסס **Israel Government Design System (IGDS)** / gov.il, מיועד למימוש ב-Salesforce.

## מבנה הפרויקט

```
Government Digital Platform/
├── Canon/                       # מסמכי האמת (Single Source of Truth)
│   ├── 00_Canon_Project.md          # ה-Canon הראשי + יומן החלטות
│   ├── 01_Phase1_System_Analysis.md
│   ├── 02_Domain_Model.md
│   ├── 03_IA_Navigation.md
│   ├── 04_User_Flows.md
│   ├── 05_Wireframes_Prototype.html
│   ├── 06_Component_Inventory.md
│   ├── 07_Core_Patterns_And_Screen_Architecture.md
│   ├── 08_GovIl_Field_Research.md
│   ├── 09_Existing_System_Live_Analysis.md
│   └── 10_UX_Expert_Review.md
└── Prototype/                   # אב-טיפוס קוד Fidelity גבוה (HTML/CSS/JS, ללא build)
    ├── index.html                   # נקודת כניסה
    ├── styles.css · data.js · components.js
    ├── screens-citizen.js · screens-operations.js · app.js
    ├── art/README.md                # מדריך החלפת איורים
    └── README.md                    # מדריך הפרוטוטייפ

איסוף חומרים/                    # חומרי רפרנס (עיצובים קודמים מהפיגמה)
```

## הרצת הפרוטוטייפ
- **הכי פשוט:** לחיצה כפולה על `Government Digital Platform/Prototype/index.html`.
- **או שרת מקומי:** מתוך תיקיית `Prototype/` הריצו `python3 -m http.server 8731` ואז `http://localhost:8731`.

## ניווט
מסך פתיחה → **אזור אישי לאזרח** או **מערכת ניהול הבקשות**. לחיצה על הלוגו חוזרת למסך הפתיחה. קישור **"מפת מסכים"** ב-Footer מוביל לאינדקס של כל המסכים והמצבים.

## סטטוס
שני המוצרים מומשו במלואם — כל 20 ה-Templates + מצבי מערכת, טפסי מצטיינים (מוזיקה ומחול), ומודול ועדות ובחינות. נאמן לטוקני gov.il (Rubik, כחול #0068F5, גרדיאנט #025FDB→#0B3668). QA פונקציונלי נקי.

> ההחלטות העיצופיות מתועדות ב-`Canon/00_Canon_Project.md` (יומן החלטות) וב-`Canon/10_UX_Expert_Review.md`.

</div>
