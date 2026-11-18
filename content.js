/*
  ==========================================================
  MY SAT HUB — CONTENT FILE
  ==========================================================
  Ei file-ei shob content thake. Kichu update korte chaile shudhu ei file edit koro.

  - config      : exam date, target score, start score
  - schedule    : kon shoptahe kon topic (Dashboard-e "Aj-er focus" ekhan theke ashe)
  - dailyTasks  : prottek diner checklist (2 ghonta)
  - sections    : sidebar-er prottek page. "md" er bhitore Markdown likhbe.

  Notun page add korte: sections-e ekta notun { id, group, title, md } jog koro.
  Shotorkota: md-er bhitore backtick (`) character use korbe na.
  ==========================================================
*/

window.SAT = {
  config: {
    name: "Mamun",
    examDate: "2027-03-27",
    startScore: 1050,
    target: { total: 1450, math: 780, rw: 680 }
  },

  schedule: [
    { from: "2026-11-18", to: "2026-11-24", focus: "Math: Geometry & Trigonometry  |  English: grammar basics + daily reading" },
    { from: "2026-11-25", to: "2026-12-08", focus: "Math: Problem Solving & Data Analysis  |  English: punctuation rules" },
    { from: "2026-12-09", to: "2026-12-29", focus: "Math: Advanced Math (quadratics, exponents, functions)  |  English: transitions + rhetorical synthesis" },
    { from: "2026-12-30", to: "2027-01-12", focus: "Math: Algebra  |  English: reading question types" },
    { from: "2027-01-13", to: "2027-02-28", focus: "Phase 2: Hard Question Bank + error log + full test every 2 weeks" },
    { from: "2027-03-01", to: "2027-03-27", focus: "Phase 3: Test mode — 1–2 full timed tests per week, revise error log" }
  ],

  dailyTasks: [
    { id: "recall",   label: "Formula & rule recall (blank page test)", minutes: 10 },
    { id: "concept",  label: "Math: aj-er topic bujho (Khan Academy + notes)", minutes: 25 },
    { id: "mathq",    label: "Math: Question Bank practice (Easy → Hard)", minutes: 40 },
    { id: "reading",  label: "English: 1 ta article active reading", minutes: 20 },
    { id: "rwq",      label: "English: grammar / R&W practice", minutes: 20 },
    { id: "errors",   label: "Error log-e aj-er bhul likho", minutes: 5 }
  ],

  sections: [
/* ---------------------------------------------------------- */
{ id: "plan", group: "Plan", title: "Master plan (18 weeks)", md: `
# Master plan: 1050 → 1450+

> Target: **Math 770–780 + R&W 670–680 = 1440–1460**. Exam: **March 27, 2027**.

## Digital SAT structure

| Section | Module | Proshno | Somoy |
|---|---|---|---|
| Reading & Writing | 2 module | 27 + 27 = 54 | 32 + 32 min |
| Math | 2 module | 22 + 22 = 44 | 35 + 35 min |

- Test **adaptive**: Module 1 bhalo korle Module 2 hard hoy. Hard Module 2 chhara 770+ shombhob na.
- Math-er puro test-e **Desmos calculator** use kora jai.
- Bhul uttor-er jonno kono negative marking nei, tai **kono proshno faka rakhbe na**.

## 3 Phase

**Phase 1: Foundation (Nov 18 – Jan 12)**
- Math order: Geometry & Trig → Problem Solving & Data Analysis → Advanced Math → Algebra
- English: grammar rules + prottek din reading habit

**Phase 2: Hard practice (Jan 13 – Feb 28)**
- College Board Question Bank-er Hard proshno
- Error log protidin
- Prottek 2 shoptahe Bluebook-e ekta full test

**Phase 3: Test mode (March)**
- Shoptahe 1–2 ta full timed test, ashol exam-er somoy-e
- Notun kichu na, shudhu error log revise
- Exam-er ager 2 din halka revision + bhalo ghum

## Milestone (track-e acho kina bujhte)

| Kobe | Target |
|---|---|
| December shesh | ~1200 |
| February shesh | ~1350 |
| March | 1450+ |

## Prottek din 2 ghonta

| Somoy | Kaaj |
|---|---|
| 10 min | Formula/rule recall: na dekhe likho |
| 25 min | Math concept |
| 40 min | Math practice |
| 20 min | English reading |
| 20 min | Grammar / R&W practice |
| 5 min | Error log |

## Resources (shob free, official)
- **Bluebook app** (College Board): official full practice test. Simito, tai shudhu score mapar jonno rakho.
- **College Board Question Bank** (SAT Suite Question Bank): topic ar difficulty diye proshno.
- **Khan Academy**: Official Digital SAT course, concept shekhar jonno.
` },

/* ---------------------------------------------------------- */
{ id: "geometry", group: "Math", title: "Geometry & Trigonometry", md: `
# Geometry & Trigonometry

> SAT Math-er ~15% (44-er moddhe 5–7 ta proshno). Shob formula mattro **4 ta idea** theke ase: **180°, Pythagoras, bhag (fraction), base × height**.

## 1. Lines & angles
- Parallel line-e transversal: **shob chhoto angle shoman, shob boro angle shoman**. Chhoto + boro = 180°.
- Vertical angle shoman.
- Straight line = 180°, ekta point-er chardike = 360°.

## 2. Triangles
- **A + B + C = 180°** (upor-er kona diye base-er parallel line kolpona koro, 3 angle ekta straight line hoy)
- **Bahirer kon = dur-er duto bhitorer angle-er jogfol**
- Isosceles: shoman side-er ulto diker angle shoman
- **Similar triangle**: angle shoman → side-er ratio shoman
  - DE ∥ BC hole: AD/AB = AE/AC = DE/BC
  - **Trap:** ratio nibe puro side diye (AD/**AB**), tukra diye (AD/DB) na

## 3. Right triangles
- **a² + b² = c²** (c = hypotenuse)
- Common triples: **3-4-5, 5-12-13, 8-15-17, 7-24-25** (ar egulor gunitok, jemon 6-8-10)
- **45-45-90 = square-er ordhek:** x : x : x√2
- **30-60-90 = equilateral triangle-er ordhek:** x : x√3 : 2x
  - 30° er ulto dike shobcheye chhoto side (x), 60° er ulto dike x√3

## 4. Trigonometry
| | Formula | Mone rakho |
|---|---|---|
| sin θ | opposite / hypotenuse | **SOH** |
| cos θ | adjacent / hypotenuse | **CAH** |
| tan θ | opposite / adjacent | **TOA** |

- **sin x = cos(90° − x)**. Jodi sin A = cos B, tahole **A + B = 90°**.
- Similar triangle-e angle same hole sin/cos/tan same.

## 5. Circles
| Ki | Formula |
|---|---|
| Paridhi | 2πr |
| Area | πr² |
| Arc length | (θ/360) × 2πr, ba radian-e **rθ** |
| Sector area | (θ/360) × πr², ba radian-e **½r²θ** |
| Equation | **(x − h)² + (y − k)² = r²** → center (h, k) |

- **π radian = 180°** (2π/3 = 120°, π/6 = 30°, π/4 = 45°)
- **Central angle = 2 × inscribed angle** (ekoi arc-er upor)
- Tangent line ar radius milite **90°**
- Equation-e chinho ulto: (x − 3)² → x = +3; (y + 4)² → y = −4. Dan dike **r²**, r na.
- x² + y² − 6x + 8y = 11 dhoroner proshne **completing the square** koro: x er coefficient-er ordhek-er square jog koro.

## 6. Area & Volume
| Shape | Formula |
|---|---|
| Rectangle | l × w |
| Triangle | ½ × b × h |
| Trapezoid | ½(a + b) × h |
| Box | l × w × h |
| Cylinder | πr²h |
| Cone | ⅓πr²h |
| Pyramid | ⅓ × base area × h |
| Sphere | (4/3)πr³ |

- Cone ar pyramid = cylinder/box-er **⅓**
- **Scaling:** length × k → area × **k²** → volume × **k³**

> SAT test-e ekta reference sheet deya thake (area, volume, Pythagoras, special triangle). Tobu mukhosto rakho, karon druto chinte para-tai ashol.
` },

/* ---------------------------------------------------------- */
{ id: "psda", group: "Math", title: "Problem Solving & Data Analysis", md: `
# Problem Solving & Data Analysis

> SAT Math-er ~15% (5–7 ta proshno). Beshirbhag word problem, table ar graph.

## 1. Ratio, rate, proportion
- Proportion: a/b = c/d → **cross multiply**
- Rate = poriman / somoy (jemon km per hour)
- **Unit conversion:** unit gulo bhagnangsho hisebe likho, jate onnodorkari unit kete jai
  - 3 ft/sec → ? ft/min: 3 × 60 = 180

## 2. Percent
- **Part = (percent/100) × whole**
- **Percent change = (new − old) / old × 100**
- x% barle: × (1 + x/100). x% komle: × (1 − x/100)
- **Trap:** 20% bere tarpor 20% komle ager jaygay fire ashe na (1.2 × 0.8 = 0.96)

## 3. Statistics
| Ki | Mane |
|---|---|
| Mean | jogfol ÷ sonkha |
| Median | sajale majher ta (jor hole majher duto-r gor) |
| Mode | shobcheye beshi bar |
| Range | max − min |
| Standard deviation | data koto chhoriye ache (formula lagbe na, shudhu tulona) |

- **Outlier** (onek boro/chhoto value) mean-ke tene nei, **median-ke prai bodlai na**
- Shob value-te same sonkha jog korle: mean bodlai, **SD bodlai na**
- Data beshi chhoriye thakle SD beshi

## 4. Probability
- **P = favorable / total**
- Two-way table: proshne "**of those who...**" thakle denominator hobe shudhu oi group-er total (conditional probability)

## 5. Data & graphs
- Scatterplot-e **line of best fit**: slope = proti 1 unit x barle y koto bare
- **Linear** = protibar shoman **poriman** bare. **Exponential** = protibar shoman **percent/gun** bare.
- **Sampling:** random sample hole result puro population-e apply kora jai. Sample je group theke, conclusion shudhu shei group-er jonno.
- **Margin of error** beshi = kom nishchit. Sample boro hole margin of error kome.
` },

/* ---------------------------------------------------------- */
{ id: "advanced", group: "Math", title: "Advanced Math", md: `
# Advanced Math

> SAT Math-er ~35% (13–15 ta proshno). **Sobcheye boro ar guruttopurno ongsho.**

## 1. Quadratics — 3 ta form
| Form | Ki shohoj e pao |
|---|---|
| Standard: ax² + bx + c | y-intercept = c |
| Vertex: a(x − h)² + k | vertex (h, k) |
| Factored: a(x − r)(x − s) | root/zero = r ar s |

- **Quadratic formula:** x = (−b ± √(b² − 4ac)) / 2a
- **Vertex-er x = −b / 2a**
- **Discriminant D = b² − 4ac**
  - D > 0 → 2 ta real solution
  - D = 0 → 1 ta solution
  - D < 0 → kono real solution nei
- Root-er **jogfol = −b/a**, **gunfol = c/a**
- a > 0 hole parabola upor dike khola (minimum ache), a < 0 hole nich dike (maximum ache)

## 2. Exponents
| Rule | Udahoron |
|---|---|
| xᵃ · xᵇ = xᵃ⁺ᵇ | x² · x³ = x⁵ |
| xᵃ / xᵇ = xᵃ⁻ᵇ | x⁵ / x² = x³ |
| (xᵃ)ᵇ = xᵃᵇ | (x²)³ = x⁶ |
| x⁰ = 1 | |
| x⁻ᵃ = 1/xᵃ | x⁻² = 1/x² |
| x^(m/n) = ⁿ√(xᵐ) | x^(1/2) = √x |

## 3. Exponential growth/decay
- **f(t) = a(1 + r)ᵗ** (growth), **a(1 − r)ᵗ** (decay)
- a = shuru-r value, r = percent (decimal-e)
- 1.05 mane 5% growth, 0.92 mane 8% decay

## 4. Functions
- f(3) mane x er jaygay 3 boshao
- f(x) = 0 er solution = graph x-axis ke jekhane kate (zero/root/x-intercept)
- **Transformation:**
  - f(x) + k → upore k
  - f(x − h) → dane h (chinho ulto!)
  - −f(x) → x-axis e ulte jai

## 5. Polynomial & equivalent expressions
- x = r jodi zero hoy, tahole **(x − r)** ekta factor
- Equivalent expression proshne: dui dike expand koro, ba Desmos-e duto graph eke dekho ek line-e pore kina
- Nonlinear system (line + parabola): **Desmos-e duto graph eke intersection dekho**
` },

/* ---------------------------------------------------------- */
{ id: "algebra", group: "Math", title: "Algebra", md: `
# Algebra

> SAT Math-er ~35% (13–15 ta proshno). Shohoj, kintu careless bhul ekhanei beshi hoy.

## 1. Linear equation & line
- **Slope m = (y₂ − y₁) / (x₂ − x₁)**
- **Slope-intercept: y = mx + b** (b = y-intercept)
- Point-slope: y − y₁ = m(x − x₁)
- Standard form Ax + By = C → slope = **−A/B**
- **Parallel line: same slope**
- **Perpendicular line: slope gun korle −1** (2 er perpendicular −1/2)

## 2. Context-e slope ar intercept
- Slope = **proti unit-e koto bodlay** (rate)
- y-intercept = **shuru-r value** (x = 0 hole)
- Udahoron: C = 25h + 40 → proti ghonta 25 taka, fixed charge 40 taka

## 3. System of equations
| Ki holo | Mane |
|---|---|
| Ekta solution | slope alada |
| **Kono solution nei** | slope same, intercept alada (parallel) |
| **Infinite solution** | dui equation ashole ekoi line |

- Solve: substitution, elimination, ba **Desmos-e intersection**

## 4. Inequalities
- Negative sonkha diye gun/bhag korle **chinho ulte jai**
- Graph-e: < / > hole dashed line, ≤ / ≥ hole solid line

## 5. Absolute value
- |x − 3| = 5 → x − 3 = 5 ba x − 3 = −5 → x = 8 ba −2
` },

/* ---------------------------------------------------------- */
{ id: "desmos", group: "Math", title: "Desmos tricks", md: `
# Desmos — tomar sobcheye boro hatiyar

> 770+ er jonno Desmos-e druto hote hobe. Bluebook-e built-in Desmos ache, ghore practice koro desmos.com e.

## Kokhon use korbe
| Proshno | Kivabe |
|---|---|
| System of equations | duto equation likho → **intersection point-e click** |
| Quadratic-er root | equation likho → x-axis e jekhane kate |
| Vertex / max / min | graph-er upor click, point dekhabe |
| Equivalent expression | duto expression alada line-e likho → graph mile gele equivalent |
| "Kon value-te kono solution nei" | ekta constant-er jaygay **slider** (k) diye nariye dekho |
| Regression | table banao, tarpor **y₁ ~ mx₁ + b** likho |
| Circle equation | puro equation likho, center ar radius chokhe dekho |

## Tips
- Uttor-er option gulo Desmos-e boshiye check kora jai
- Kono kono proshno haate druto hoy. Desmos je kono proshno check korar jonno, shob somoy solve korar jonno na.
- Prottek din 5 minute Desmos-e practice koro, jate exam-e somoy nosto na hoy
` },

/* ---------------------------------------------------------- */
{ id: "reading", group: "English", title: "Reading habit", md: `
# Reading habit

> Digital SAT-e prottek proshner jonno **chhoto passage** (25–150 shobdo). Dorkar: **druto pore mul kotha dhorte para**.

## Prottek din 20 minute, ei bishoy theke poro
| Dhoron | Kothay (free) |
|---|---|
| Science | Scientific American, Smithsonian Magazine, BBC Future |
| History / Social science | BBC, The Guardian, Aeon |
| Literature | Project Gutenberg (Jane Austen, Dickens, purono classic) |

## Active reading (eta-i ashol practice)
1. Prottek paragraph-er por thamo → **ek line-e nijer bhashay**: "lekhok ki bolchen?"
2. Ochena shobdo → **agey context theke mane anuman**, tarpor dictionary
3. Din-e **5 ta notun shobdo** note-e likho, je bakko-e peyecho seta soho
4. Shesh e 2 line likho: **mul argument ki + ki proman diyechen**

## Amar vocabulary note
(Ekhane notun shobdo add korte thako: shobdo — mane — bakko)

-
` },

/* ---------------------------------------------------------- */
{ id: "grammar", group: "English", title: "Grammar rules", md: `
# Grammar rules (Standard English Conventions)

> R&W-er ekta boro ongsho grammar. Rule shekha jai, tai **egulo "free point"** — prai perfect korte hobe.

## 1. Sentence = Independent clause
Independent clause = **subject + verb + purno mane**. "She runs." ekta complete sentence.

## 2. Duto independent clause jorar 4 upay
| Upay | Udahoron |
|---|---|
| Period (.) | I studied. I passed. |
| Semicolon (;) | I studied; I passed. |
| Comma + FANBOYS | I studied, **so** I passed. |
| Colon (:) jodi 2nd part 1st part-ke byakkha kore | I had one goal: I wanted to pass. |

- **FANBOYS** = for, and, nor, but, or, yet, so
- **Comma splice (bhul):** I studied, I passed. ❌ (shudhu comma diye duto sentence jora jai na)
- However, therefore er age shudhu comma diye jora jai na: "I studied; **however,** I failed." ✔

## 3. Semicolon (;)
Dui dikei **independent clause** thakte hobe.

## 4. Colon (:)
**Bam dik** independent clause hote hobe. Dan dik = list, byakkha, ba udahoron.
- ✔ She needed three things: time, money, and focus.
- ❌ She needed: time, money, and focus.

## 5. Extra information (nonessential)
- Duto comma, duto dash, ba duto bracket diye ghirte hobe — **ek dhoron**, mishabe na
- ✔ My brother, **a doctor,** lives in Dhaka.
- ❌ My brother, a doctor — lives in Dhaka.
- Info-ta bad dile sentence thik thakle seta nonessential

## 6. Jekhane comma **dibe na**
- Subject ar verb-er majhe ❌
- Verb ar object-er majhe ❌
- Essential info-r charpashe ❌ (The student **who studied** passed.)

## 7. Subject-verb agreement
- **Ashol subject khojo**, majher "of ..." phrase bad dao
  - The list **of items** **is** long. (subject = list → is)
- Each, every, either, neither → singular

## 8. Pronoun
- Singular noun → it/its, plural → they/their
- **its** = tar (possessive), **it's** = it is
- **their** = tader, **they're** = they are, **there** = sekhane

## 9. Possessive apostrophe
- Ekjon: student**'s** book
- Onekjon: students**'** books

## 10. Verb tense
- Passage-er baki ongsho je tense-e ache, shei tense mene cholo

## 11. Modifier
- Shuru-r phrase-er thik porei sei jinish thakte hobe jake se describe kore
  - ✔ Walking to school, **I** saw a dog.
  - ❌ Walking to school, **a dog** was seen.
` },

/* ---------------------------------------------------------- */
{ id: "transitions", group: "English", title: "Transitions & Synthesis", md: `
# Transitions & Rhetorical Synthesis

## Transitions — agey shomporko bujho, tarpor shobdo bacho
| Shomporko | Shobdo |
|---|---|
| **Biporit / contrast** | however, nevertheless, nonetheless, in contrast, still, yet |
| **Karon → fol** | therefore, thus, consequently, as a result, hence |
| **Aro jog** | moreover, furthermore, additionally, in addition, also |
| **Udahoron** | for example, for instance |
| **Mil / similar** | similarly, likewise |
| **Somoy / kromo** | subsequently, then, finally, meanwhile |
| **Jor deya / sotti** | in fact, indeed |
| **Shar-shongkhep** | in short, in summary |

**Kivabe solve korbe:** faka-r ager ar porer bakko pore nijeke jigesh koro: "ei duto-r shomporko ki?" Tarpor table theke group bacho. Shobdo dekhe na, **shomporko** dekhe bacho.

## Rhetorical Synthesis (notes-wala proshno)
1. **Notes porbe na agey.** Proshner shesh-er **goal** ta pore nao (jemon "emphasize a difference", "introduce the study to an audience unfamiliar with...")
2. Option gulo theke je ta **goal ta purno kore**, seta bacho
3. Option-er tothyo notes-e ache kina dekhe nao, eto-tukui

> Eta SAT-er sobcheye shohoj proshno gulor ekta. Ekhane bhul kora jabe na.
` },

/* ---------------------------------------------------------- */
{ id: "rwtypes", group: "English", title: "R&W question types", md: `
# Reading & Writing question types

| Type | Ki chai | Kivabe |
|---|---|---|
| **Words in Context** | faka-te kon shobdo boshe | Option dekhar agey **nijer shobdo** bhabo, tarpor milao |
| **Text Structure & Purpose** | lekhok keno likhechen / ekta line-er kaj ki | Passage-er "kaj" ek shobde bolo: explain, argue, contrast... |
| **Cross-Text Connections** | duto passage-er lekhok ki bhabe ekmot/dimot | Agey dui jon-er mul kotha alada likho |
| **Central Ideas & Details** | mul kotha | Shob bakko cover kore emon option bacho, khub sorho ba khub boro na |
| **Command of Evidence (text)** | kon proman claim-ke support kore | Claim-ta agey nijer bhashay bolo |
| **Command of Evidence (graph/table)** | data diye claim support | Option-er protiti sonkha graph-e check koro |
| **Inferences** | logical next step | Passage theke **noto** shudhu jeta nishchit bhabe ase |
| **Boundaries / Form** | grammar | Grammar rules page dekho |
| **Transitions** | jora shobdo | Transitions page dekho |
| **Rhetorical Synthesis** | notes theke goal | Transitions page dekho |

## Shob proshner jonno
- **Option dekhar agey uttor-ta nije anuman koro**
- Shothik uttor **passage-e proman shoho** thakbe. Bahirer gyan lage na.
- **Extreme shobdo** (always, never, completely, proves) thakle shondeho koro
- Duto option-er majhe atkale: passage theke **sorasori proman** kon ta-r beshi?
` },

/* ---------------------------------------------------------- */
{ id: "testday", group: "Exam", title: "Test day strategy", md: `
# Test day strategy

## Somoy
- R&W: proti proshno ~**71 second**
- Math: proti proshno ~**95 second**
- Ekta proshne 2 minute-er beshi atkale → **mark for review**, pore fire esho

## Module 1 = sobcheye guruttopurno
- Module 1 bhalo hole hard Module 2 ase, ar hard module chhara 1450 shombhob na
- Module 1-e **careless bhul** ekdom na. Prottek uttor ekbar check koro.

## Kono proshno faka na
- Negative marking nei. Na parle-o anuman kore uttor dao.

## Ager din
- Notun kichu porbe na. Shudhu formula page ar error log dekho.
- Bluebook app update, device charge, admission ticket, ID ready rakho
- **Bhalo ghum** — eta score-er onek boro ongsho

## Exam-er din
- Halka khabar, somoy-er agey pouchao
- Ekta proshno kharap gele mathay rekho na, porer ta-te fokus
` }
  ]
};
