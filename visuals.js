/*
  FORMULA VISUALS
  Each visual has: title, svg (the picture), f (formula), tip (memory hook).
  Write [[vis:id1,id2]] in content.js to show those visuals as cards.
  [[vis:all]] shows every visual.
*/
window.SAT_VIS = {
  parallel: {
    title: "Parallel lines",
    svg: `<line class="s" x1="20" y1="55" x2="220" y2="55"/><line class="s" x1="20" y1="115" x2="220" y2="115"/><line class="w" x1="70" y1="150" x2="170" y2="10"/>
<text class="ta" x="152" y="47">a</text><text class="ta" x="114" y="73">a</text><text class="ta" x="110" y="107">a</text><text class="ta" x="72" y="133">a</text>
<text class="tg" x="116" y="47">b</text><text class="tg" x="150" y="73">b</text><text class="tg" x="74" y="107">b</text><text class="tg" x="108" y="133">b</text>`,
    f: "all a equal, all b equal · a + b = 180°",
    tip: "All small angles match; all large angles match."
  },
  triangle: {
    title: "Triangle angles",
    svg: `<polygon class="s" points="30,130 170,130 120,30"/><line class="s d" x1="170" y1="130" x2="228" y2="130"/>
<text class="t" x="42" y="124">A</text><text class="t" x="150" y="124">B</text><text class="t" x="115" y="54">C</text><text class="ta" x="184" y="122">x</text>`,
    f: "A + B + C = 180° · x = A + C",
    tip: "Exterior angle = sum of the two far interior angles."
  },
  similar: {
    title: "Similar triangles",
    svg: `<polygon class="s" points="120,20 30,140 210,140"/><line class="a" x1="84" y1="68" x2="156" y2="68"/>
<text class="t" x="115" y="14">A</text><text class="t" x="18" y="152">B</text><text class="t" x="212" y="152">C</text><text class="ta" x="66" y="70">D</text><text class="ta" x="162" y="70">E</text>`,
    f: "DE ∥ BC → AD/<b>AB</b> = AE/AC = DE/BC",
    tip: "Trap: use the whole side (AB), not the piece (DB)."
  },
  pythagoras: {
    title: "Pythagoras",
    svg: `<polygon class="s" points="40,130 190,130 40,40"/><rect class="s" x="40" y="120" width="10" height="10"/>
<text class="t" x="24" y="90">a</text><text class="t" x="110" y="148">b</text><text class="ta" x="122" y="78">c</text>`,
    f: "a² + b² = c²",
    tip: "Triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25."
  },
  tri45: {
    title: "45-45-90",
    svg: `<polygon class="s" points="50,130 170,130 50,10"/><rect class="s" x="50" y="120" width="10" height="10"/>
<text class="t" x="34" y="75">x</text><text class="t" x="106" y="148">x</text><text class="ta" x="118" y="66">x√2</text>
<text class="t sm" x="138" y="124">45°</text><text class="t sm" x="56" y="40">45°</text>`,
    f: "x : x : x√2",
    tip: "Half of a square cut along its diagonal."
  },
  tri30: {
    title: "30-60-90",
    svg: `<polygon class="s" points="40,130 200,130 40,38"/><rect class="s" x="40" y="120" width="10" height="10"/>
<text class="t" x="24" y="88">x</text><text class="t" x="106" y="148">x√3</text><text class="ta" x="126" y="78">2x</text>
<text class="t sm" x="168" y="124">30°</text><text class="t sm" x="46" y="64">60°</text>`,
    f: "x : x√3 : 2x",
    tip: "Half an equilateral triangle. Shortest side is opposite 30°."
  },
  soh: {
    title: "SOH-CAH-TOA",
    svg: `<polygon class="s" points="30,130 200,130 200,40"/><rect class="s" x="190" y="120" width="10" height="10"/>
<text class="ta" x="58" y="125">θ</text><text class="t" x="205" y="90">opp</text><text class="t" x="104" y="148">adj</text><text class="tg" x="96" y="76">hyp</text>`,
    f: "sin = opp/hyp · cos = adj/hyp · tan = opp/adj",
    tip: "sin x = cos(90° − x). If sin A = cos B, then A + B = 90°."
  },
  circle: {
    title: "Circle, arc, sector",
    svg: `<path class="fa" d="M90 80 L145 80 A55 55 0 0 0 117.5 32.4 Z"/><circle class="s" cx="90" cy="80" r="55"/>
<path class="w" d="M145 80 A55 55 0 0 0 117.5 32.4"/><line class="s" x1="90" y1="80" x2="145" y2="80"/>
<text class="t" x="112" y="96">r</text><text class="ta" x="100" y="72">θ</text>
<text class="t sm" x="156" y="60">C = 2πr</text><text class="t sm" x="156" y="82">A = πr²</text><text class="t sm" x="156" y="104">π = 180°</text>`,
    f: "arc = (θ/360)·2πr = rθ · sector = (θ/360)·πr² = ½r²θ",
    tip: "Arc = the pizza crust; sector = the whole slice."
  },
  inscribed: {
    title: "Central vs inscribed",
    svg: `<circle class="s" cx="120" cy="80" r="60"/><line class="g" x1="120" y1="80" x2="176.4" y2="59.5"/><line class="g" x1="120" y1="80" x2="99.5" y2="23.6"/>
<line class="a d" x1="68" y1="110" x2="176.4" y2="59.5"/><line class="a d" x1="68" y1="110" x2="99.5" y2="23.6"/>
<text class="tg" x="130" y="66">2θ</text><text class="ta" x="84" y="90">θ</text><text class="t" x="108" y="98">O</text>`,
    f: "central angle = 2 × inscribed angle",
    tip: "The center sees the arc from closer, so its angle is double."
  },
  circleeq: {
    title: "Circle equation",
    svg: `<line class="s" x1="20" y1="130" x2="230" y2="130"/><line class="s" x1="40" y1="10" x2="40" y2="150"/>
<circle class="w" cx="130" cy="70" r="40"/><line class="s" x1="130" y1="70" x2="170" y2="70"/><circle cx="130" cy="70" r="3" class="dot"/>
<text class="t" x="146" y="64">r</text><text class="t sm" x="104" y="90">(h, k)</text>`,
    f: "(x − h)² + (y − k)² = r²",
    tip: "Signs flip: (x − 3)² → h = +3. The right side is r², not r."
  },
  volume: {
    title: "Cylinder vs cone",
    svg: `<ellipse class="s" cx="60" cy="40" rx="30" ry="8"/><ellipse class="s" cx="60" cy="120" rx="30" ry="8"/><line class="s" x1="30" y1="40" x2="30" y2="120"/><line class="s" x1="90" y1="40" x2="90" y2="120"/>
<ellipse class="s" cx="170" cy="120" rx="30" ry="8"/><line class="w" x1="170" y1="40" x2="140" y2="120"/><line class="w" x1="170" y1="40" x2="200" y2="120"/>
<text class="t" x="36" y="150">πr²h</text><text class="ta" x="144" y="150">⅓πr²h</text>`,
    f: "cone = ⅓ cylinder · pyramid = ⅓ box · sphere = (4/3)πr³",
    tip: "It takes 3 cones of water to fill the matching cylinder."
  },
  scaling: {
    title: "Scaling",
    svg: `<rect class="s" x="20" y="80" width="30" height="30"/><rect class="w" x="70" y="50" width="60" height="60"/><line class="s d" x1="100" y1="50" x2="100" y2="110"/><line class="s d" x1="70" y1="80" x2="130" y2="80"/>
<text class="t sm" x="22" y="128">side 1</text><text class="ta sm" x="76" y="128">side 2 → ×4</text>
<text class="t sm" x="148" y="70">length × k</text><text class="t sm" x="148" y="90">area × k²</text><text class="t sm" x="148" y="110">volume × k³</text>`,
    f: "length × k → area × k² → volume × k³",
    tip: "Area is 2-D (k²), volume is 3-D (k³)."
  },
  slope: {
    title: "Slope & intercept",
    svg: `<line class="s" x1="20" y1="130" x2="230" y2="130"/><line class="s" x1="40" y1="10" x2="40" y2="150"/>
<line class="w" x1="40" y1="110" x2="220" y2="30"/><line class="s d" x1="100" y1="83.3" x2="160" y2="83.3"/><line class="s d" x1="160" y1="83.3" x2="160" y2="56.7"/>
<circle cx="40" cy="110" r="3" class="dot"/><text class="ta" x="22" y="114">b</text><text class="t sm" x="116" y="97">run</text><text class="t sm" x="165" y="74">rise</text>`,
    f: "y = mx + b · m = rise/run = (y₂ − y₁)/(x₂ − x₁)",
    tip: "Slope = rate (change per unit). b = starting value."
  },
  parperp: {
    title: "Parallel & perpendicular",
    svg: `<line class="s" x1="20" y1="120" x2="150" y2="40"/><line class="s" x1="70" y1="140" x2="200" y2="60"/><line class="w" x1="80" y1="31" x2="140" y2="129"/>
<text class="t" x="24" y="104">m</text><text class="t" x="196" y="84">m</text><text class="ta" x="146" y="140">−1/m</text>`,
    f: "parallel: same m · perpendicular: m₁ × m₂ = −1",
    tip: "Perpendicular to slope 2 is slope −1/2."
  },
  systems: {
    title: "System of equations",
    svg: `<line class="s" x1="15" y1="40" x2="75" y2="110"/><line class="w" x1="15" y1="110" x2="75" y2="40"/>
<line class="s" x1="90" y1="50" x2="150" y2="90"/><line class="w" x1="90" y1="75" x2="150" y2="115"/>
<line class="s" x1="165" y1="110" x2="225" y2="40" stroke-width="5"/><line class="w d" x1="165" y1="110" x2="225" y2="40"/>
<text class="t sm" x="14" y="140">1 solution</text><text class="t sm" x="100" y="140">none</text><text class="t sm" x="170" y="140">infinite</text>`,
    f: "different slopes → 1 · same slope, different b → none · same line → infinite",
    tip: "For Ax + By = C, slope = −A/B."
  },
  parabola: {
    title: "Quadratic graph",
    svg: `<line class="s" x1="15" y1="110" x2="230" y2="110"/><line class="s" x1="60" y1="10" x2="60" y2="150"/>
<path class="w" d="M40 8.4 Q130 261.6 220 8.4"/><line class="s d" x1="130" y1="20" x2="130" y2="135"/>
<circle cx="90" cy="110" r="3" class="dot"/><circle cx="170" cy="110" r="3" class="dot"/><circle cx="130" cy="135" r="3" class="dot"/><circle cx="60" cy="58.4" r="3" class="dot"/>
<text class="t sm" x="80" y="104">r</text><text class="t sm" x="174" y="104">s</text><text class="ta sm" x="138" y="150">(h, k)</text><text class="t sm" x="66" y="64">c</text><text class="t sm" x="136" y="30">x = −b/2a</text>`,
    f: "a(x − h)² + k → vertex · a(x − r)(x − s) → roots · c → y-intercept",
    tip: "a > 0 opens up (minimum); a < 0 opens down (maximum)."
  },
  discriminant: {
    title: "Discriminant b² − 4ac",
    svg: `<line class="s" x1="10" y1="90" x2="80" y2="90"/><path class="w" d="M15 40 Q45 180 75 40"/>
<line class="s" x1="85" y1="90" x2="155" y2="90"/><path class="w" d="M90 40 Q120 140 150 40"/>
<line class="s" x1="160" y1="90" x2="230" y2="90"/><path class="w" d="M165 40 Q195 100 225 40"/>
<text class="t sm" x="22" y="130">D &gt; 0</text><text class="t sm" x="97" y="130">D = 0</text><text class="t sm" x="172" y="130">D &lt; 0</text>
<text class="ta sm" x="20" y="148">2 root</text><text class="ta sm" x="96" y="148">1 root</text><text class="ta sm" x="170" y="148">0 root</text>`,
    f: "D = b² − 4ac",
    tip: "x = (−b ± √D)/2a. Sum of roots = −b/a, product = c/a."
  },
  exponential: {
    title: "Growth vs decay",
    svg: `<line class="s" x1="20" y1="135" x2="230" y2="135"/><line class="s" x1="30" y1="10" x2="30" y2="150"/>
<path class="w" d="M30 125 C120 123 170 105 205 18"/><path class="g" d="M32 25 C60 105 120 124 225 128"/>
<text class="ta sm" x="150" y="40">a(1 + r)ᵗ</text><text class="tg sm" x="64" y="70">a(1 − r)ᵗ</text>`,
    f: "growth a(1 + r)ᵗ · decay a(1 − r)ᵗ",
    tip: "1.05 = 5% growth, 0.92 = 8% decay."
  },
  transform: {
    title: "Graph shift",
    svg: `<line class="s" x1="15" y1="135" x2="230" y2="135"/><path class="s" d="M50 50 Q80 170 110 50"/><path class="w" d="M130 10 Q160 130 190 10"/>
<line class="g" x1="90" y1="110" x2="150" y2="75"/><text class="t sm" x="30" y="128">f(x)</text><text class="ta sm" x="164" y="95">f(x − h) + k</text>`,
    f: "f(x − h) → right h · f(x) + k → up k · −f(x) → flip",
    tip: "Inside the brackets, the sign works backwards."
  },
  percent: {
    title: "Percent change",
    svg: `<rect class="s" x="40" y="70" width="40" height="60"/><rect class="w fa" x="130" y="40" width="40" height="90"/><line class="s" x1="20" y1="130" x2="200" y2="130"/>
<text class="t sm" x="48" y="148">old</text><text class="ta sm" x="136" y="148">new</text><line class="g" x1="88" y1="80" x2="122" y2="55"/>`,
    f: "% change = (new − old)/old × 100",
    tip: "+20% then −20% = 0.96, not back to the start."
  },
  meanmedian: {
    title: "Mean vs median",
    svg: `<line class="s" x1="20" y1="100" x2="225" y2="100"/>
<circle cx="40" cy="90" r="5" class="dot"/><circle cx="55" cy="90" r="5" class="dot"/><circle cx="60" cy="78" r="5" class="dot"/><circle cx="70" cy="90" r="5" class="dot"/><circle cx="80" cy="90" r="5" class="dot"/><circle cx="210" cy="90" r="5" class="dotw"/>
<line class="g" x1="65" y1="105" x2="65" y2="122"/><line class="w" x1="86" y1="105" x2="86" y2="138"/>
<text class="tg sm" x="34" y="134">median</text><text class="ta sm" x="76" y="152">mean</text><text class="ta sm" x="186" y="72">outlier</text>`,
    f: "an outlier pulls the mean; the median barely moves",
    tip: "Add the same number to every value: mean changes, SD does not."
  },
  sd: {
    title: "Standard deviation",
    svg: `<line class="s" x1="15" y1="130" x2="230" y2="130"/>
<path class="g" d="M20 130 C55 130 60 30 75 30 C90 30 95 130 130 130"/><path class="w" d="M110 130 C150 130 150 80 170 80 C190 80 190 130 230 130"/>
<text class="tg sm" x="50" y="150">low SD</text><text class="ta sm" x="146" y="150">high SD</text>`,
    f: "more spread out = larger SD",
    tip: "No formula needed — just compare spreads."
  },
  pyramid: {
    title: "Height vs slant height",
    svg: `<line class="s" x1="40" y1="125" x2="150" y2="125"/><line class="s" x1="150" y1="125" x2="200" y2="100"/><line class="s d" x1="200" y1="100" x2="90" y2="100"/><line class="s d" x1="90" y1="100" x2="40" y2="125"/>
<line class="s" x1="120" y1="25" x2="40" y2="125"/><line class="s" x1="120" y1="25" x2="150" y2="125"/><line class="s" x1="120" y1="25" x2="200" y2="100"/><line class="s d" x1="120" y1="25" x2="90" y2="100"/>
<line class="w d" x1="120" y1="25" x2="120" y2="112"/><line class="g" x1="120" y1="25" x2="95" y2="125"/><line class="s d" x1="120" y1="112" x2="95" y2="125"/>
<text class="ta" x="125" y="78">h</text><text class="tg" x="90" y="72">l</text><text class="t sm" x="88" y="145">s/2</text><text class="t sm" x="172" y="125">s</text>`,
    f: "h² + (s/2)² = l² · cone: h² + r² = l²",
    tip: "h goes to the center; l goes down a face. Trap: l is usually a wrong choice."
  },
  surface: {
    title: "Surface area",
    svg: `<rect class="s" x="40" y="60" width="50" height="50"/><polygon class="w fa" points="40,60 90,60 65,25"/><polygon class="w fa" points="90,60 90,110 125,85"/><polygon class="w fa" points="40,110 90,110 65,145"/><polygon class="w fa" points="40,60 40,110 5,85"/>
<text class="t sm" x="58" y="90">s²</text><text class="ta sm" x="134" y="60">base: s²</text><text class="ta sm" x="134" y="82">4 faces: 4 × ½sl</text><text class="ta sm" x="134" y="104">total: s² + 2sl</text>`,
    f: "total = base + lateral · each face = ½ × s × l",
    tip: "Cylinder 2πr² + 2πrh · cone πr² + πrl · sphere 4πr² · box 2(lw + lh + wh)."
  },
  linexp: {
    title: "Linear vs exponential",
    svg: `<line class="s" x1="20" y1="145" x2="230" y2="145"/><line class="s" x1="30" y1="50" x2="30" y2="150"/>
<line class="s" x1="30" y1="140" x2="220" y2="70"/><path class="w" d="M30 138 C130 136 180 120 215 55"/>
<line class="s" x1="34" y1="16" x2="54" y2="16"/><text class="t sm" x="60" y="20">linear = +same amount</text>
<line class="w" x1="34" y1="34" x2="54" y2="34"/><text class="ta sm" x="60" y="38">exponential = ×same %</text>`,
    f: "linear: same amount each step · exponential: same factor each step",
    tip: "In a table: equal differences → linear; equal ratios → exponential."
  }
};
