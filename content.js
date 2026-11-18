/*
  ==========================================================
  MY SAT HUB — CONTENT FILE
  ==========================================================
  All study content lives here. To update the site, edit this file.

  - config        : default exam date, targets, milestones (can also be changed on the Settings page)
  - quickLinks    : buttons on the Dashboard
  - schedule      : weekly focus + one topic per day (shown on the Dashboard and Study plan)
  - englishTopics : one R&W topic per day, rotating
  - dailyTasks    : default daily checklist (editable on the Settings page)
  - flashcards    : formula & grammar cards (vocabulary cards come from vocab.js)
  - sections      : sidebar pages written in Markdown ("md")

  Notes:
  - Inside "md" do not use the backtick character.
  - [[vis:id1,id2]] on its own line shows formula visuals from visuals.js.
  ==========================================================
*/

window.SAT = {
  config: {
    name: "Mamun",
    examDate: "2027-03-27",
    startDate: "2026-11-18",
    startScore: 1050,
    target: { total: 1450, math: 780, rw: 680 },
    newWordsPerDay: 10,
    milestones: [
      { date: "2026-12-31", score: 1200 },
      { date: "2027-02-28", score: 1350 },
      { date: "2027-03-27", score: 1450 }
    ]
  },

  quickLinks: [
    { label: "Question Bank", url: "https://satsuitequestionbank.collegeboard.org/" },
    { label: "Bluebook practice", url: "https://bluebook.collegeboard.org/students/practice" },
    { label: "Khan Academy SAT", url: "https://satsuite.collegeboard.org/practice/khan-academy" },
    { label: "Desmos", url: "https://www.desmos.com/calculator" }
  ],

  schedule: [
    { from: "2026-11-18", to: "2026-11-24", focus: "Math: Geometry & Trigonometry", page: "geometry",
      topics: ["Lines, angles, triangle sum, similar triangles", "Pythagoras, 45-45-90, 30-60-90", "Trigonometry: SOH-CAH-TOA, sin x = cos(90° − x)", "Circles: circumference, area, arc, sector, radians", "Circle equation, completing the square, inscribed angles", "Area, volume, scaling", "Geometry mixed test + error log review"] },
    { from: "2026-11-25", to: "2026-12-08", focus: "Math: Problem Solving & Data Analysis", page: "psda",
      topics: ["Ratios, rates, unit conversion", "Percent & percent change", "Mean, median, outliers", "Standard deviation & spread", "Probability & two-way tables", "Scatterplots, line of best fit, linear vs exponential", "Sampling & margin of error"] },
    { from: "2026-12-09", to: "2026-12-29", focus: "Math: Advanced Math", page: "advanced",
      topics: ["Exponent & radical rules", "Equivalent expressions (expand/factor)", "Quadratics: factoring", "Quadratic formula & discriminant", "Vertex form & parabola graphs", "Exponential growth/decay", "Function notation & transformations", "Polynomial zeros & factors", "Nonlinear systems (Desmos)", "Rational expressions", "Advanced Math mixed hard set"] },
    { from: "2026-12-30", to: "2027-01-12", focus: "Math: Algebra", page: "algebra",
      topics: ["Linear equations in one variable", "Slope & forms of a line", "Slope/intercept in context", "Systems of equations", "No solution / infinitely many solutions", "Linear inequalities", "Algebra mixed hard set"] },
    { from: "2027-01-13", to: "2027-02-28", focus: "Phase 2: Hard practice + error log + full test every 2 weeks", page: "plan",
      topics: ["Hard: Advanced Math", "Hard: Algebra", "Hard: Problem Solving & Data Analysis", "Hard: Geometry & Trig", "Hard R&W: reading questions", "Redo every error log question", "Full test (every 2nd week) / weak-topic drill"] },
    { from: "2027-03-01", to: "2027-03-27", focus: "Phase 3: Test mode", page: "testday",
      topics: ["Full timed test", "Review test mistakes", "Weak-topic drill", "Redo error log", "Formula & grammar flashcards"] }
  ],

  englishTopics: [
    { t: "Sentence boundaries (comma splices)", page: "grammar" },
    { t: "Semicolons & colons", page: "grammar" },
    { t: "Nonessential info: comma/dash pairs", page: "grammar" },
    { t: "Subject-verb agreement", page: "grammar" },
    { t: "Pronouns & apostrophes", page: "grammar" },
    { t: "Verb tense & modifiers", page: "grammar" },
    { t: "Transitions", page: "transitions" },
    { t: "Rhetorical synthesis", page: "transitions" },
    { t: "Words in context", page: "rwtypes" },
    { t: "Text structure & purpose", page: "rwtypes" },
    { t: "Central ideas & details", page: "rwtypes" },
    { t: "Command of evidence (text)", page: "rwtypes" },
    { t: "Command of evidence (graphs/tables)", page: "rwtypes" },
    { t: "Inferences", page: "rwtypes" },
    { t: "Cross-text connections", page: "rwtypes" }
  ],

  dailyTasks: [
    { id: "recall",  label: "Formula & rule recall (blank-page test + flashcards)", minutes: 10 },
    { id: "concept", label: "Math: learn today's topic (Khan Academy + notes)", minutes: 25 },
    { id: "mathq",   label: "Math: Question Bank practice (Easy → Hard)", minutes: 35 },
    { id: "reading", label: "English: read 1 article actively", minutes: 20 },
    { id: "rwq",     label: "English: grammar / R&W practice", minutes: 15 },
    { id: "vocab",   label: "Vocabulary: today's new words + due reviews", minutes: 10 },
    { id: "errors",  label: "Log today's mistakes in the error log", minutes: 5 }
  ],

  flashcards: [
    { q: "Sum of the angles in a triangle?", a: "180°" },
    { q: "Exterior angle of a triangle = ?", a: "The sum of the two remote interior angles" },
    { q: "Parallel lines cut by a transversal: which angles are equal?", a: "All small angles are equal, all large angles are equal. Small + large = 180°" },
    { q: "Similar triangles with DE ∥ BC: the ratio?", a: "AD/AB = AE/AC = DE/BC (use whole sides, not pieces)" },
    { q: "Pythagorean theorem?", a: "a² + b² = c²" },
    { q: "Common Pythagorean triples?", a: "3-4-5, 5-12-13, 8-15-17, 7-24-25" },
    { q: "45-45-90 side ratio?", a: "x : x : x√2" },
    { q: "30-60-90 side ratio?", a: "x : x√3 : 2x (x is opposite 30°)" },
    { q: "sin θ = ?", a: "opposite / hypotenuse" },
    { q: "cos θ = ?", a: "adjacent / hypotenuse" },
    { q: "tan θ = ?", a: "opposite / adjacent" },
    { q: "If sin A = cos B, how are A and B related?", a: "A + B = 90°" },
    { q: "Circumference of a circle?", a: "2πr" },
    { q: "Area of a circle?", a: "πr²" },
    { q: "Arc length (degrees)?", a: "(θ/360) × 2πr" },
    { q: "Arc length (radians)?", a: "rθ" },
    { q: "Sector area (degrees)?", a: "(θ/360) × πr²" },
    { q: "π radians = how many degrees?", a: "180°" },
    { q: "Central angle vs inscribed angle?", a: "Central = 2 × inscribed (same arc)" },
    { q: "Equation of a circle?", a: "(x − h)² + (y − k)² = r², center (h, k)" },
    { q: "Angle between a tangent and the radius?", a: "90°" },
    { q: "Volume of a cylinder?", a: "πr²h" },
    { q: "Volume of a cone?", a: "⅓πr²h" },
    { q: "Volume of a sphere?", a: "(4/3)πr³" },
    { q: "If every length is multiplied by k, area and volume?", a: "Area × k², volume × k³" },
    { q: "Percent change?", a: "(new − old) / old × 100" },
    { q: "Which does an outlier affect more: mean or median?", a: "The mean" },
    { q: "Add the same number to every value: what happens to SD?", a: "It does not change" },
    { q: "Slope formula?", a: "(y₂ − y₁) / (x₂ − x₁)" },
    { q: "Slope of Ax + By = C?", a: "−A/B" },
    { q: "Slope of a perpendicular line?", a: "Negative reciprocal (m₁ × m₂ = −1)" },
    { q: "When does a system have no solution?", a: "Same slope, different intercepts (parallel lines)" },
    { q: "When does a system have infinitely many solutions?", a: "Both equations describe the same line" },
    { q: "Quadratic formula?", a: "x = (−b ± √(b² − 4ac)) / 2a" },
    { q: "x-coordinate of the vertex?", a: "−b / 2a" },
    { q: "Discriminant < 0 means?", a: "No real solutions" },
    { q: "Discriminant = 0 means?", a: "Exactly one real solution" },
    { q: "Sum and product of the roots?", a: "Sum = −b/a, product = c/a" },
    { q: "Exponential growth formula?", a: "a(1 + r)ᵗ" },
    { q: "x^(m/n) = ?", a: "ⁿ√(xᵐ)" },
    { q: "Where does f(x − h) move the graph?", a: "Right by h units" },
    { q: "Multiply or divide an inequality by a negative?", a: "Flip the inequality sign" },
    { q: "What must be on both sides of a semicolon?", a: "Two independent clauses" },
    { q: "What must come before a colon?", a: "An independent clause (a complete sentence)" },
    { q: "What is a comma splice?", a: "Joining two complete sentences with only a comma (an error)" },
    { q: "FANBOYS?", a: "for, and, nor, but, or, yet, so" },
    { q: "Comma between a subject and its verb?", a: "Never" },
    { q: "its vs it's?", a: "its = possessive; it's = it is" },
    { q: "How to set off nonessential information?", a: "Two commas, two dashes, or two parentheses — never mixed" },
    { q: "Contrast transitions?", a: "however, nevertheless, in contrast, yet" },
    { q: "Cause → effect transitions?", a: "therefore, thus, consequently, as a result" },
    { q: "Addition transitions?", a: "moreover, furthermore, additionally" },
    { q: "Rhetorical synthesis: what do you read first?", a: "The goal at the end of the question, not the notes" },
    { q: "Time per R&W question?", a: "About 71 seconds" },
    { q: "Time per Math question?", a: "About 95 seconds" }
  ],

  sections: [
/* ---------------------------------------------------------- */
{ id: "plan", group: "Plan", title: "Master plan", md: `
# Master plan: 1050 → 1450+

> Target: **Math 770–780 + R&W 670–680 = 1440–1460**. Test date: **March 27, 2027**.
> Track your week-by-week topics on the **Study plan** page.

## Digital SAT structure

| Section | Modules | Questions | Time |
|---|---|---|---|
| Reading & Writing | 2 | 27 + 27 = 54 | 32 + 32 min |
| Math | 2 | 22 + 22 = 44 | 35 + 35 min |

- The test is **adaptive**: a strong Module 1 unlocks a harder Module 2. You cannot reach 770+ Math without the hard Module 2.
- **Desmos** is available for the entire Math section.
- There is no penalty for wrong answers, so **never leave a question blank**.

## Three phases

**Phase 1: Foundation (Nov 18 – Jan 12)**
- Math order: Geometry & Trig → Problem Solving & Data Analysis → Advanced Math → Algebra
- English: grammar rules + daily reading + 10 new words a day

**Phase 2: Hard practice (Jan 13 – Feb 28)**
- Hard questions from the College Board Question Bank
- Error log every day
- A full Bluebook test every two weeks

**Phase 3: Test mode (March)**
- 1–2 full timed tests per week, at the real test time of day
- No new material: only error log review
- Light revision and good sleep for the last 2 days

## Milestones

| By | Target |
|---|---|
| End of December | ~1200 |
| End of February | ~1350 |
| March 27 | 1450+ |

## Two hours a day

| Time | Task |
|---|---|
| 10 min | Formula/rule recall |
| 25 min | Math concept |
| 35 min | Math practice |
| 20 min | English reading |
| 15 min | Grammar / R&W practice |
| 10 min | Vocabulary |
| 5 min | Error log |

All resources are on the **Resources & links** page.
` },

/* ---------------------------------------------------------- */
{ id: "resources", group: "Plan", title: "Resources & links", md: `
# Resources & links

## Official (free) — your main tools
| Tool | Use it for | Link |
|---|---|---|
| **Bluebook** | Official full-length adaptive practice tests. Limited supply, so use them to measure your score. | [bluebook.collegeboard.org](https://bluebook.collegeboard.org/students/practice) |
| **SAT Suite Question Bank** | Official questions filtered by topic and difficulty. No account needed. | [satsuitequestionbank.collegeboard.org](https://satsuitequestionbank.collegeboard.org/) |
| **Khan Academy (Official SAT Prep)** | Learning concepts: Foundations → Medium → Advanced | [College Board's Khan Academy page](https://satsuite.collegeboard.org/practice/khan-academy) |
| **Desmos** | Calculator practice at home | [desmos.com/calculator](https://www.desmos.com/calculator) |

## How to use the Question Bank
1. **Assessment:** SAT
2. **Test:** Math or Reading and Writing
3. **Domain:** today's topic (for example, Geometry and Trigonometry)
4. **Difficulty:** Easy + Medium first, then **Hard only**
5. When you miss one, read the explanation and add it to the **Error log**

## Reading (one article a day)
| Subject | Source | Link |
|---|---|---|
| Science | Scientific American | [scientificamerican.com](https://www.scientificamerican.com/) |
| Science / History | Smithsonian Magazine | [smithsonianmag.com](https://www.smithsonianmag.com/) |
| Science / Society | BBC Future | [bbc.com/future](https://www.bbc.com/future) |
| Social science | The Guardian — The Long Read | [theguardian.com/the-long-read](https://www.theguardian.com/news/series/the-long-read) |
| Argument / Philosophy | Aeon | [aeon.co](https://aeon.co/) |
| Literature | Project Gutenberg (free classics) | [gutenberg.org](https://www.gutenberg.org/) |
| Literature starter | Pride and Prejudice — Jane Austen | [gutenberg.org/ebooks/1342](https://www.gutenberg.org/ebooks/1342) |

> Some sites show a paywall after a few free articles each month. If you hit one, switch to another source.
` },

/* ---------------------------------------------------------- */
{ id: "cheatsheet", group: "Math", title: "Formula cheat sheet", md: `
# Formula cheat sheet

> Every formula on one page, with a picture. Scan it for 2 minutes each morning. Turn on **Quiz mode** to hide the formulas and test yourself.

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

> About 15% of SAT Math (5–7 of 44 questions). Nearly every formula comes from **4 ideas**: **180°, Pythagoras, fractions of a whole, base × height**.

[[vis:parallel,triangle,similar]]

## 1. Lines & angles
- Parallel lines cut by a transversal: **all small angles are equal, all large angles are equal**. Small + large = 180°.
- Vertical angles are equal.
- A straight line = 180°; all the way around a point = 360°.

## 2. Triangles
- **A + B + C = 180°** (draw a line through the top vertex parallel to the base: the three angles form a straight line)
- **Exterior angle = sum of the two remote interior angles**
- Isosceles: angles opposite equal sides are equal
- **Similar triangles**: equal angles → proportional sides
  - If DE ∥ BC: AD/AB = AE/AC = DE/BC
  - **Trap:** use the whole side (AD/**AB**), not the pieces (AD/DB)

## 3. Right triangles
[[vis:pythagoras,tri45,tri30]]

- **a² + b² = c²** (c = hypotenuse)
- Common triples: **3-4-5, 5-12-13, 8-15-17, 7-24-25** (and multiples like 6-8-10)
- **45-45-90 = half a square:** x : x : x√2
- **30-60-90 = half an equilateral triangle:** x : x√3 : 2x
  - The shortest side (x) is opposite 30°; x√3 is opposite 60°

## 4. Trigonometry
[[vis:soh]]

| | Formula | Memory hook |
|---|---|---|
| sin θ | opposite / hypotenuse | **SOH** |
| cos θ | adjacent / hypotenuse | **CAH** |
| tan θ | opposite / adjacent | **TOA** |

- **sin x = cos(90° − x)**. If sin A = cos B, then **A + B = 90°**.
- Similar right triangles share the same sin, cos, and tan.

## 5. Circles
[[vis:circle,inscribed,circleeq]]

| What | Formula |
|---|---|
| Circumference | 2πr |
| Area | πr² |
| Arc length | (θ/360) × 2πr, or **rθ** in radians |
| Sector area | (θ/360) × πr², or **½r²θ** in radians |
| Equation | **(x − h)² + (y − k)² = r²** → center (h, k) |

- **π radians = 180°** (2π/3 = 120°, π/6 = 30°, π/4 = 45°)
- **Central angle = 2 × inscribed angle** (same arc)
- A tangent line meets the radius at **90°**
- Signs flip: (x − 3)² → h = +3; (y + 4)² → k = −4. The right side is **r²**, not r.
- For x² + y² − 6x + 8y = 11, **complete the square**: add (half the x-coefficient)² and (half the y-coefficient)² to both sides.

## 6. Area & volume
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

- A cone or pyramid is **⅓** of the matching cylinder or box
- **Scaling:** length × k → area × **k²** → volume × **k³**

> The SAT gives a reference sheet (area, volume, Pythagoras, special triangles), but knowing these by heart saves time.
` },

/* ---------------------------------------------------------- */
{ id: "psda", group: "Math", title: "Problem Solving & Data", md: `
# Problem Solving & Data Analysis

> About 15% of SAT Math (5–7 questions). Mostly word problems, tables, and graphs.

## 1. Ratios, rates, proportions
- Proportion: a/b = c/d → **cross-multiply**
- Rate = amount / time (for example, km per hour)
- **Unit conversion:** write units as fractions so unwanted units cancel
  - 3 ft/sec → ft/min: 3 × 60 = 180

## 2. Percent
[[vis:percent]]

- **Part = (percent/100) × whole**
- **Percent change = (new − old) / old × 100**
- Increase by x%: × (1 + x/100). Decrease by x%: × (1 − x/100)
- **Trap:** +20% then −20% does not return to the start (1.2 × 0.8 = 0.96)

## 3. Statistics
[[vis:meanmedian,sd]]

| Term | Meaning |
|---|---|
| Mean | sum ÷ count |
| Median | middle value when sorted (average the two middles if even) |
| Mode | most frequent value |
| Range | max − min |
| Standard deviation | how spread out the data are (compare, no formula needed) |

- An **outlier** pulls the mean but barely moves the **median**
- Adding the same number to every value changes the mean, **not the SD**
- More spread-out data → larger SD

## 4. Probability
- **P = favorable outcomes / total outcomes**
- Two-way tables: if the question says "**of those who...**", the denominator is only that group's total (conditional probability)

## 5. Data & graphs
[[vis:linexp]]

- **Line of best fit**: the slope is how much y changes per 1 unit of x
- **Linear** = increases by the same **amount** each step. **Exponential** = increases by the same **percent/factor** each step.
- **Sampling:** a random sample lets you generalize to the population it was drawn from — and only that population.
- A larger **margin of error** means less certainty. Larger samples reduce the margin of error.
` },

/* ---------------------------------------------------------- */
{ id: "advanced", group: "Math", title: "Advanced Math", md: `
# Advanced Math

> About 35% of SAT Math (13–15 questions). **The biggest and most important domain.**

## 1. Quadratics — three forms
[[vis:parabola,discriminant]]

| Form | What it shows directly |
|---|---|
| Standard: ax² + bx + c | y-intercept = c |
| Vertex: a(x − h)² + k | vertex (h, k) |
| Factored: a(x − r)(x − s) | roots/zeros r and s |

- **Quadratic formula:** x = (−b ± √(b² − 4ac)) / 2a
- **Vertex x = −b / 2a**
- **Discriminant D = b² − 4ac**
  - D > 0 → 2 real solutions
  - D = 0 → 1 real solution
  - D < 0 → no real solutions
- **Sum of roots = −b/a**, **product = c/a**
- a > 0 opens upward (has a minimum); a < 0 opens downward (has a maximum)

## 2. Exponents
| Rule | Example |
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
- a = starting value, r = rate as a decimal
- 1.05 means 5% growth; 0.92 means 8% decay

## 4. Functions
[[vis:transform]]

- f(3) means substitute 3 for x
- Solutions of f(x) = 0 are where the graph crosses the x-axis (zeros, roots, x-intercepts)
- **Transformations:**
  - f(x) + k → up k
  - f(x − h) → right h (the sign flips!)
  - −f(x) → reflect over the x-axis

## 5. Polynomials & equivalent expressions
- If x = r is a zero, then **(x − r)** is a factor
- Equivalent expressions: expand both, or graph both in Desmos and see if they match
- Nonlinear systems (line + parabola): **graph both in Desmos and find the intersections**
` },

/* ---------------------------------------------------------- */
{ id: "algebra", group: "Math", title: "Algebra", md: `
# Algebra

> About 35% of SAT Math (13–15 questions). Easier, but most careless mistakes happen here.

## 1. Linear equations & lines
[[vis:slope,parperp]]

- **Slope m = (y₂ − y₁) / (x₂ − x₁)**
- **Slope-intercept: y = mx + b** (b = y-intercept)
- Point-slope: y − y₁ = m(x − x₁)
- Standard form Ax + By = C → slope = **−A/B**
- **Parallel lines: same slope**
- **Perpendicular lines: slopes multiply to −1** (2 ⟂ −1/2)

## 2. Slope and intercept in context
- Slope = **change per unit** (a rate)
- y-intercept = **starting value** (when x = 0)
- Example: C = 25h + 40 → 25 per hour plus a fixed fee of 40

## 3. Systems of equations
[[vis:systems]]

| Result | Meaning |
|---|---|
| One solution | different slopes |
| **No solution** | same slope, different intercepts (parallel) |
| **Infinitely many** | both equations are the same line |

- Solve by substitution, elimination, or **Desmos intersection**

## 4. Inequalities
- Multiplying or dividing by a negative **flips the sign**
- On a graph: < or > uses a dashed line; ≤ or ≥ uses a solid line

## 5. Absolute value
- |x − 3| = 5 → x − 3 = 5 or x − 3 = −5 → x = 8 or −2
` },

/* ---------------------------------------------------------- */
{ id: "desmos", group: "Math", title: "Desmos tricks", md: `
# Desmos — your biggest weapon

> For 770+ you must be fast in Desmos. Bluebook has Desmos built in; practice at desmos.com at home.

## When to use it
| Question type | How |
|---|---|
| System of equations | type both equations → **click the intersection** |
| Roots of a quadratic | type the equation → read where it crosses the x-axis |
| Vertex / max / min | click the curve; Desmos shows the point |
| Equivalent expressions | type each on its own line → if the graphs overlap, they are equivalent |
| "For what value is there no solution?" | replace the constant with a **slider** (k) and move it |
| Regression | make a table, then type **y₁ ~ mx₁ + b** |
| Circle equation | type the whole equation and read the center and radius |

## Tips
- You can plug answer choices into Desmos to check them
- Some questions are faster by hand. Desmos is for checking, not for every question.
- Practice 5 minutes of Desmos daily so it costs no time on test day
` },

/* ---------------------------------------------------------- */
{ id: "vocabguide", group: "English", title: "Vocabulary guide", md: `
# Vocabulary: how much and how

## How many words do you need?
- There is **no official SAT word list**. Vocabulary is tested only through **Words in Context** questions (a short passage with a blank or an underlined word).
- Prep sources disagree, ranging from about **100 to 600** high-frequency academic words. The SAT favors useful academic words (like *undermine*, *empirical*, *tentative*) over rare ones.
- This hub includes **408 core words** in the **Vocabulary** trainer. Learning them well covers the vocabulary you need for 670–680 R&W.

## Your daily target
| | Amount |
|---|---|
| New words per day | **10** (change it in Settings) |
| Reviews | whatever is **due today** (usually 10–30) |
| Time | about **10 minutes** |
| Full list finished | about **41 days** (by the end of December) |

After the list is done, keep doing the daily reviews until test day. Reviews keep the words in long-term memory.

## How the trainer works (spaced repetition)
1. Each day you get **10 new words** with a meaning and an example sentence.
2. Mark **"Learned"** and the word goes into review.
3. When a word is due, you see it in **Review**. Say the meaning out loud, then flip.
4. **Knew it** → the next review is later (1 → 2 → 4 → 7 → 15 → 30 days). **Didn't know** → it comes back tomorrow.
5. A word reaching the 15-day level counts as **mastered**.

## Learn words the SAT way
- Always read the **example sentence**, not just the meaning — the SAT tests words in context.
- Watch the **"Multiple meanings"** set: SAT loves common words used in uncommon ways (*check* = stop, *qualify* = limit, *sound* = reliable).
- Add new words from your reading on the **Vocabulary** page under **My words**.
` },

/* ---------------------------------------------------------- */
{ id: "reading", group: "English", title: "Reading habit", md: `
# Reading habit

> Digital SAT passages are **short** (about 25–150 words per question). The skill is **finding the main point quickly**.

## 20 minutes a day, from these sources
| Type | Links |
|---|---|
| Science | [Scientific American](https://www.scientificamerican.com/) · [Smithsonian](https://www.smithsonianmag.com/) · [BBC Future](https://www.bbc.com/future) |
| History / Social science | [The Guardian — The Long Read](https://www.theguardian.com/news/series/the-long-read) · [Aeon](https://aeon.co/) |
| Literature | [Project Gutenberg](https://www.gutenberg.org/) · start with [Pride and Prejudice](https://www.gutenberg.org/ebooks/1342) |

> Rotation: Sat–Mon science, Tue–Wed history/society, Thu–Fri literature. The Dashboard shows today's type.

## Active reading (this is the real practice)
1. After each paragraph, stop → say in **one line**: "What is the author saying?"
2. Unknown word → **guess the meaning from context first**, then check a dictionary
3. Add new words to **My words** on the Vocabulary page
4. At the end, write 2 lines in the **Reading log**: the **main argument + the evidence used**
` },

/* ---------------------------------------------------------- */
{ id: "grammar", group: "English", title: "Grammar rules", md: `
# Grammar rules (Standard English Conventions)

> A large share of R&W is grammar. The rules are learnable, so treat these as **free points** — aim for near-perfect.

## 1. A sentence = an independent clause
Independent clause = **subject + verb + a complete thought**. "She runs." is a complete sentence.

## 2. Four ways to join two independent clauses
| Method | Example |
|---|---|
| Period (.) | I studied. I passed. |
| Semicolon (;) | I studied; I passed. |
| Comma + FANBOYS | I studied, **so** I passed. |
| Colon (:) when the second part explains the first | I had one goal: I wanted to pass. |

- **FANBOYS** = for, and, nor, but, or, yet, so
- **Comma splice (wrong):** I studied, I passed. ❌
- Words like however/therefore cannot join sentences with just a comma: "I studied; **however,** I failed." ✔

## 3. Semicolon (;)
Both sides must be **independent clauses**.

## 4. Colon (:)
The **left side** must be an independent clause. The right side is a list, explanation, or example.
- ✔ She needed three things: time, money, and focus.
- ❌ She needed: time, money, and focus.

## 5. Nonessential information
- Set it off with two commas, two dashes, or two parentheses — **one kind, never mixed**
- ✔ My brother, **a doctor,** lives in Dhaka.
- ❌ My brother, a doctor — lives in Dhaka.
- If the sentence still works without it, it is nonessential

## 6. Where **not** to put a comma
- Between a subject and its verb ❌
- Between a verb and its object ❌
- Around essential information ❌ (The student **who studied** passed.)

## 7. Subject-verb agreement
- **Find the real subject** and ignore "of ..." phrases
  - The list **of items** **is** long. (subject = list → is)
- Each, every, either, neither → singular

## 8. Pronouns
- Singular noun → it/its; plural → they/their
- **its** = possessive; **it's** = it is
- **their** = possessive; **they're** = they are; **there** = a place

## 9. Possessive apostrophes
- One person: the student**'s** book
- Many people: the students**'** books

## 10. Verb tense
- Match the tense used in the rest of the passage

## 11. Modifiers
- An opening phrase must be followed immediately by the thing it describes
  - ✔ Walking to school, **I** saw a dog.
  - ❌ Walking to school, **a dog** was seen.
` },

/* ---------------------------------------------------------- */
{ id: "transitions", group: "English", title: "Transitions & synthesis", md: `
# Transitions & Rhetorical Synthesis

## Transitions — find the relationship first, then the word
| Relationship | Words |
|---|---|
| **Contrast** | however, nevertheless, nonetheless, in contrast, still, yet |
| **Cause → effect** | therefore, thus, consequently, as a result, hence |
| **Addition** | moreover, furthermore, additionally, in addition, also |
| **Example** | for example, for instance |
| **Similarity** | similarly, likewise |
| **Time / sequence** | subsequently, then, finally, meanwhile |
| **Emphasis** | in fact, indeed |
| **Summary** | in short, in summary |

**Method:** read the sentence before and after the blank and ask, "How are these two related?" Pick the group from the table, then the word. Choose by **relationship**, not by how the word sounds.

## Rhetorical Synthesis (the bullet-notes questions)
1. **Do not read the notes first.** Read the **goal** at the end of the question (for example, "emphasize a difference" or "introduce the study to an unfamiliar audience").
2. Pick the option that **accomplishes that goal**.
3. Quickly confirm its facts appear in the notes.

> One of the easiest question types on the SAT. Do not lose points here.
` },

/* ---------------------------------------------------------- */
{ id: "rwtypes", group: "English", title: "R&W question types", md: `
# Reading & Writing question types

| Type | What it asks | How to approach it |
|---|---|---|
| **Words in Context** | which word fits the blank | Predict **your own word** before looking at the choices |
| **Text Structure & Purpose** | why the author wrote it / what a sentence does | Name its job in one word: explain, argue, contrast... |
| **Cross-Text Connections** | how two authors agree or disagree | Write each author's main point separately first |
| **Central Ideas & Details** | the main point | Choose the option that covers the whole passage — not too narrow, not too broad |
| **Command of Evidence (text)** | which evidence supports a claim | Restate the claim in your own words first |
| **Command of Evidence (graphs/tables)** | which data support a claim | Check every number in the choice against the graphic |
| **Inferences** | the logical next step | Take only what **must** follow from the passage |
| **Boundaries / Form** | grammar | See Grammar rules |
| **Transitions** | the connecting word | See Transitions & synthesis |
| **Rhetorical Synthesis** | goal from notes | See Transitions & synthesis |

## For every question
- **Predict the answer before reading the choices**
- The correct answer is **supported by the passage**. Outside knowledge is not needed.
- Be suspicious of **extreme words** (always, never, completely, proves)
- Stuck between two choices? Pick the one with **more direct evidence** in the passage.
` },

/* ---------------------------------------------------------- */
{ id: "testday", group: "Exam", title: "Test day strategy", md: `
# Test day strategy

## Timing
- R&W: about **71 seconds** per question
- Math: about **95 seconds** per question
- Stuck for more than 2 minutes → **mark for review** and come back

## Module 1 matters most
- A strong Module 1 unlocks the hard Module 2, and 1450 needs the hard module
- **Zero careless mistakes** in Module 1. Double-check every answer.

## Never leave a blank
- There is no penalty for guessing.

## The day before
- No new material. Only the formula cheat sheet and your error log.
- Update Bluebook, charge your device, prepare your admission ticket and ID
- **Sleep well** — it is a big part of your score

## Test day
- Light meal, arrive early
- If one question goes badly, let it go and focus on the next
` }
  ]
};
