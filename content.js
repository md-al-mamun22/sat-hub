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
    startDate: "2026-11-18",
    target: { total: 1450, math: 780, rw: 680 },
    // Kobe koto score thaka uchit (Dashboard "track-e acho kina" ekhan theke hisab kore)
    milestones: [
      { date: "2026-12-31", score: 1200 },
      { date: "2027-02-28", score: 1350 },
      { date: "2027-03-27", score: 1450 }
    ]
  },

  // Dashboard-er quick link button
  quickLinks: [
    { label: "Question Bank", url: "https://satsuitequestionbank.collegeboard.org/" },
    { label: "Bluebook practice", url: "https://bluebook.collegeboard.org/students/practice" },
    { label: "Khan Academy SAT", url: "https://satsuite.collegeboard.org/practice/khan-academy" },
    { label: "Desmos", url: "https://www.desmos.com/calculator" }
  ],

  // Prottek shoptahe focus. "topics" theke prottek din ekta kore topic Dashboard-e ashe (shesh hole abar shuru theke).
  schedule: [
    { from: "2026-11-18", to: "2026-11-24", focus: "Math: Geometry & Trigonometry", page: "geometry",
      topics: ["Lines, angles, triangle 180°, similar triangles", "Pythagoras, 45-45-90, 30-60-90", "Trigonometry: SOH-CAH-TOA, sin x = cos(90 − x)", "Circle: paridhi, area, arc, sector, radian", "Circle equation, completing the square, inscribed angle", "Area, volume, scaling", "Geometry mixed test + error log review"] },
    { from: "2026-11-25", to: "2026-12-08", focus: "Math: Problem Solving & Data Analysis", page: "psda",
      topics: ["Ratio, rate, unit conversion", "Percent & percent change", "Mean, median, outlier", "Standard deviation & spread", "Probability & two-way table", "Scatterplot, best-fit, linear vs exponential", "Sampling & margin of error"] },
    { from: "2026-12-09", to: "2026-12-29", focus: "Math: Advanced Math", page: "advanced",
      topics: ["Exponent & radical rules", "Equivalent expressions (expand/factor)", "Quadratic: factoring", "Quadratic formula & discriminant", "Vertex form & parabola graph", "Exponential growth/decay", "Function notation & transformations", "Polynomial zeros & factors", "Nonlinear systems (Desmos)", "Rational expressions", "Advanced Math mixed Hard set"] },
    { from: "2026-12-30", to: "2027-01-12", focus: "Math: Algebra", page: "algebra",
      topics: ["Linear equation (1 variable)", "Slope & line forms", "Slope/intercept in context", "System of equations", "No solution / infinite solution", "Linear inequalities", "Algebra mixed Hard set"] },
    { from: "2027-01-13", to: "2027-02-28", focus: "Phase 2: Hard practice + error log + full test every 2 weeks", page: "plan",
      topics: ["Hard: Advanced Math", "Hard: Algebra", "Hard: PSDA", "Hard: Geometry & Trig", "Hard R&W: reading questions", "Error log-er shob bhul abar solve", "Full test (2 shoptahe ekbar) / weak topic drill"] },
    { from: "2027-03-01", to: "2027-03-27", focus: "Phase 3: Test mode", page: "testday",
      topics: ["Full timed test", "Test-er bhul review", "Weak topic drill", "Error log redo", "Formula & grammar flashcards"] }
  ],

  // English topic: prottek din ekta kore, ghure ghure ashe
  englishTopics: [
    { t: "Sentence boundaries (comma splice)", page: "grammar" },
    { t: "Semicolon & colon", page: "grammar" },
    { t: "Nonessential info: comma/dash pair", page: "grammar" },
    { t: "Subject-verb agreement", page: "grammar" },
    { t: "Pronoun & apostrophe", page: "grammar" },
    { t: "Verb tense & modifier", page: "grammar" },
    { t: "Transitions", page: "transitions" },
    { t: "Rhetorical synthesis", page: "transitions" },
    { t: "Words in context", page: "rwtypes" },
    { t: "Text structure & purpose", page: "rwtypes" },
    { t: "Central idea & details", page: "rwtypes" },
    { t: "Command of evidence (text)", page: "rwtypes" },
    { t: "Command of evidence (graph/table)", page: "rwtypes" },
    { t: "Inferences", page: "rwtypes" },
    { t: "Cross-text connections", page: "rwtypes" }
  ],

  // Flashcard: q = proshno, a = uttor. Notun card jog korte ekhane line add koro.
  flashcards: [
    { q: "Triangle-er 3 angle-er jogfol?", a: "180°" },
    { q: "Triangle-er bahirer kon = ?", a: "Dur-er duto bhitorer konar jogfol" },
    { q: "Parallel line-e transversal: kon angle gulo shoman?", a: "Shob chhoto angle shoman, shob boro angle shoman. Chhoto + boro = 180°" },
    { q: "Similar triangle-e DE ∥ BC hole ratio?", a: "AD/AB = AE/AC = DE/BC (puro side diye, tukra diye na)" },
    { q: "Pythagoras?", a: "a² + b² = c²" },
    { q: "Common Pythagorean triples?", a: "3-4-5, 5-12-13, 8-15-17, 7-24-25" },
    { q: "45-45-90 ratio?", a: "x : x : x√2" },
    { q: "30-60-90 ratio?", a: "x : x√3 : 2x (30° er ulto dike x)" },
    { q: "sin θ = ?", a: "opposite / hypotenuse" },
    { q: "cos θ = ?", a: "adjacent / hypotenuse" },
    { q: "tan θ = ?", a: "opposite / adjacent" },
    { q: "sin A = cos B hole A ar B-er shomporko?", a: "A + B = 90°" },
    { q: "Circle-er paridhi?", a: "2πr" },
    { q: "Circle-er area?", a: "πr²" },
    { q: "Arc length (degree)?", a: "(θ/360) × 2πr" },
    { q: "Arc length (radian)?", a: "rθ" },
    { q: "Sector area (degree)?", a: "(θ/360) × πr²" },
    { q: "π radian = koto degree?", a: "180°" },
    { q: "Central angle ar inscribed angle-er shomporko?", a: "Central = 2 × inscribed" },
    { q: "Circle equation?", a: "(x − h)² + (y − k)² = r², center (h, k)" },
    { q: "Tangent ar radius milite koto degree?", a: "90°" },
    { q: "Cylinder volume?", a: "πr²h" },
    { q: "Cone volume?", a: "⅓πr²h" },
    { q: "Sphere volume?", a: "(4/3)πr³" },
    { q: "Length k gun barle area ar volume?", a: "Area × k², volume × k³" },
    { q: "Percent change?", a: "(new − old) / old × 100" },
    { q: "Outlier kake beshi bodlay: mean na median?", a: "Mean" },
    { q: "Shob value-te same sonkha jog korle SD?", a: "Bodlai na" },
    { q: "Slope formula?", a: "(y₂ − y₁) / (x₂ − x₁)" },
    { q: "Ax + By = C er slope?", a: "−A/B" },
    { q: "Perpendicular line-er slope?", a: "Negative reciprocal (m₁ × m₂ = −1)" },
    { q: "System-e 'no solution' kokhon?", a: "Slope same, intercept alada (parallel)" },
    { q: "System-e 'infinite solution' kokhon?", a: "Duto equation ekoi line" },
    { q: "Quadratic formula?", a: "x = (−b ± √(b² − 4ac)) / 2a" },
    { q: "Vertex-er x?", a: "−b / 2a" },
    { q: "Discriminant < 0 mane?", a: "Kono real solution nei" },
    { q: "Discriminant = 0 mane?", a: "Ekta solution" },
    { q: "Root-er jogfol ar gunfol?", a: "Jogfol = −b/a, gunfol = c/a" },
    { q: "Exponential growth formula?", a: "a(1 + r)ᵗ" },
    { q: "x^(m/n) = ?", a: "ⁿ√(xᵐ)" },
    { q: "f(x − h) graph-ke kothay shorai?", a: "Dane h unit" },
    { q: "Negative diye gun/bhag korle inequality?", a: "Chinho ulte jai" },
    { q: "Semicolon-er dui dike ki thakte hobe?", a: "Duto independent clause" },
    { q: "Colon-er bam dike ki thakte hobe?", a: "Independent clause (complete sentence)" },
    { q: "Comma splice ki?", a: "Shudhu comma diye duto complete sentence jora (bhul)" },
    { q: "FANBOYS?", a: "for, and, nor, but, or, yet, so" },
    { q: "Subject ar verb-er majhe comma?", a: "Na, kokhono na" },
    { q: "its vs it's?", a: "its = tar, it's = it is" },
    { q: "Nonessential info ghirte?", a: "Duto comma, duto dash ba duto bracket (mishabe na)" },
    { q: "Contrast transition?", a: "however, nevertheless, in contrast, yet" },
    { q: "Cause → effect transition?", a: "therefore, thus, consequently, as a result" },
    { q: "Addition transition?", a: "moreover, furthermore, additionally" },
    { q: "Rhetorical synthesis-e agey ki porbo?", a: "Proshner shesh-er goal, notes na" },
    { q: "R&W proti proshne somoy?", a: "~71 second" },
    { q: "Math proti proshne somoy?", a: "~95 second" }
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

## Resources
Shob link **Resources** page-e ache.
` },

/* ---------------------------------------------------------- */
{ id: "resources", group: "Plan", title: "Resources & links", md: `
# Resources & links

## Official (free) — eigulo-i main
| Ki | Kaj | Link |
|---|---|---|
| **Bluebook** | Official full-length adaptive practice test. Simito, tai shudhu score mapar jonno. | [bluebook.collegeboard.org](https://bluebook.collegeboard.org/students/practice) |
| **SAT Suite Question Bank** | Topic + difficulty diye official proshno. Account lage na. | [satsuitequestionbank.collegeboard.org](https://satsuitequestionbank.collegeboard.org/) |
| **Khan Academy (Official SAT Prep)** | Concept shekha, Foundations → Medium → Advanced | [College Board-er Khan Academy page](https://satsuite.collegeboard.org/practice/khan-academy) |
| **Desmos** | Ghore calculator practice | [desmos.com/calculator](https://www.desmos.com/calculator) |

## Question Bank kivabe use korbe
1. **Assessment:** SAT
2. **Test:** Math ba Reading and Writing
3. **Domain:** aj-er topic (jemon Geometry and Trigonometry)
4. **Difficulty:** prothome Easy + Medium, pore shudhu **Hard**
5. Bhul hole uttor-er byakkha poro, tarpor **Error log**-e likho

## Reading (prottek din 1 ta article)
| Bishoy | Kothay | Link |
|---|---|---|
| Science | Scientific American | [scientificamerican.com](https://www.scientificamerican.com/) |
| Science / History | Smithsonian Magazine | [smithsonianmag.com](https://www.smithsonianmag.com/) |
| Science / Society | BBC Future | [bbc.com/future](https://www.bbc.com/future) |
| Social science | The Guardian — The Long Read | [theguardian.com/the-long-read](https://www.theguardian.com/news/series/the-long-read) |
| Argument / Philosophy | Aeon | [aeon.co](https://aeon.co/) |
| Literature | Project Gutenberg (free classic) | [gutenberg.org](https://www.gutenberg.org/) |
| Literature shuru | Pride and Prejudice — Jane Austen | [gutenberg.org/ebooks/1342](https://www.gutenberg.org/ebooks/1342) |

> Kichu site-e mase koyekta article-er por paywall ase. Atkale onno site-e jao.
` },

/* ---------------------------------------------------------- */
{ id: "cheatsheet", group: "Math", title: "Formula cheat sheet (visual)", md: `
# Formula cheat sheet

> Shob formula ek page-e, chhobi shoho. Prottek din shokale 2 minute **chokh bulao**, tarpor **Flashcards** e test koro.

## Geometry & Trig
[[vis:parallel,triangle,similar,pythagoras,tri45,tri30,soh,circle,inscribed,circleeq,volume,scaling]]

## Algebra
[[vis:slope,parperp,systems]]

## Advanced Math
[[vis:parabola,discriminant,exponential,transform]]

## Problem Solving & Data Analysis
[[vis:percent,meanmedian,sd,linexp]]
` },

/* ---------------------------------------------------------- */
{ id: "geometry", group: "Math", title: "Geometry & Trigonometry", md: `
# Geometry & Trigonometry

> SAT Math-er ~15% (44-er moddhe 5–7 ta proshno). Shob formula mattro **4 ta idea** theke ase: **180°, Pythagoras, bhag (fraction), base × height**.

[[vis:parallel,triangle,similar]]

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
[[vis:pythagoras,tri45,tri30]]

- **a² + b² = c²** (c = hypotenuse)
- Common triples: **3-4-5, 5-12-13, 8-15-17, 7-24-25** (ar egulor gunitok, jemon 6-8-10)
- **45-45-90 = square-er ordhek:** x : x : x√2
- **30-60-90 = equilateral triangle-er ordhek:** x : x√3 : 2x
  - 30° er ulto dike shobcheye chhoto side (x), 60° er ulto dike x√3

## 4. Trigonometry
[[vis:soh]]

| | Formula | Mone rakho |
|---|---|---|
| sin θ | opposite / hypotenuse | **SOH** |
| cos θ | adjacent / hypotenuse | **CAH** |
| tan θ | opposite / adjacent | **TOA** |

- **sin x = cos(90° − x)**. Jodi sin A = cos B, tahole **A + B = 90°**.
- Similar triangle-e angle same hole sin/cos/tan same.

## 5. Circles
[[vis:circle,inscribed,circleeq]]

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
[[vis:volume,scaling]]

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
[[vis:percent]]

- **Part = (percent/100) × whole**
- **Percent change = (new − old) / old × 100**
- x% barle: × (1 + x/100). x% komle: × (1 − x/100)
- **Trap:** 20% bere tarpor 20% komle ager jaygay fire ashe na (1.2 × 0.8 = 0.96)

## 3. Statistics
[[vis:meanmedian,sd]]

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
[[vis:linexp]]

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
[[vis:parabola,discriminant]]

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
[[vis:exponential]]

- **f(t) = a(1 + r)ᵗ** (growth), **a(1 − r)ᵗ** (decay)
- a = shuru-r value, r = percent (decimal-e)
- 1.05 mane 5% growth, 0.92 mane 8% decay

## 4. Functions
[[vis:transform]]

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
[[vis:slope,parperp]]

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
[[vis:systems]]

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
| Dhoron | Link |
|---|---|
| Science | [Scientific American](https://www.scientificamerican.com/) · [Smithsonian](https://www.smithsonianmag.com/) · [BBC Future](https://www.bbc.com/future) |
| History / Social science | [The Guardian — The Long Read](https://www.theguardian.com/news/series/the-long-read) · [Aeon](https://aeon.co/) |
| Literature | [Project Gutenberg](https://www.gutenberg.org/) · shuru koro [Pride and Prejudice](https://www.gutenberg.org/ebooks/1342) diye |

> Rotation: Sat-Mon science, Tue-Wed history/society, Thu-Fri literature.

## Active reading (eta-i ashol practice)
1. Prottek paragraph-er por thamo → **ek line-e nijer bhashay**: "lekhok ki bolchen?"
2. Ochena shobdo → **agey context theke mane anuman**, tarpor dictionary
3. Din-e **5 ta notun shobdo** note-e likho, je bakko-e peyecho seta soho
4. Shesh e 2 line likho: **mul argument ki + ki proman diyechen**

## Log rakho
- Pora article **Reading log** page-e add koro (title, link, mul kotha)
- Notun shobdo **Vocabulary** page-e add koro. Egulo automatically **Flashcards**-e chole ashbe.
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
