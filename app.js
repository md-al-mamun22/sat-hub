(function () {
  const S = window.SAT;
  const VIS = window.SAT_VIS || {};
  const WORDS = (window.SAT_WORDS || []).map((w) => ({ id: "w:" + w[0] + "|" + w[1], word: w[0], pos: w[1], meaning: w[2], example: w[3] }));
  const KEY = "satHub_v1";
  const INTERVALS = [1, 2, 4, 7, 15, 30];
  const MASTER_LVL = 4;
  const NEW_FORMULA_PER_DAY = 15;

  // ---------- storage ----------
  function blank() { return { daily: {}, errors: [], scores: [], vocab: [], reads: [], srs: {}, intro: {}, topics: {}, settings: {}, practice: [], trackFrom: "" }; }
  function normalize(d) {
    const b = blank();
    Object.keys(b).forEach((k) => { if (d && d[k]) b[k] = d[k]; });
    return b;
  }
  function load() { try { return normalize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return blank(); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  let data = load();
  // migrate words added before spaced repetition existed
  data.vocab.forEach((v) => { if (!data.srs["u:" + v.id]) data.srs["u:" + v.id] = { lvl: 0, due: todayStrRaw(), last: todayStrRaw() }; });
  // honest tracking starts the first day this version is opened, so earlier days are not counted as missed
  if (!data.trackFrom) { data.trackFrom = todayStrRaw(); try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  function todayStrRaw() { const t = new Date(); return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0"); }

  // settings override defaults from content.js
  function cfg() {
    const s = data.settings || {};
    const c = S.config;
    return {
      name: s.name || c.name,
      examDate: s.examDate || c.examDate,
      startDate: c.startDate,
      startScore: Number(s.startScore || c.startScore),
      target: { total: Number(s.targetTotal || c.target.total), math: Number(s.targetMath || c.target.math), rw: Number(s.targetRw || c.target.rw) },
      newWordsPerDay: Number(s.newWordsPerDay || c.newWordsPerDay || 10),
      dailyMathQ: Number(s.dailyMathQ || c.dailyMathQ || 20),
      dailyRwQ: Number(s.dailyRwQ || c.dailyRwQ || 15),
      stretch: c.stretch || null,
      milestones: c.milestones || []
    };
  }
  const tasks = () => (data.settings.tasks && data.settings.tasks.length ? data.settings.tasks : S.dailyTasks);

  // ---------- helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function todayStr(d) {
    const t = d || new Date();
    return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  }
  const toDate = (s) => new Date(s + "T00:00:00");
  const dayDiff = (a, b) => Math.round((toDate(b) - toDate(a)) / 86400000);
  const addDays = (s, n) => { const d = toDate(s); d.setDate(d.getDate() + n); return todayStr(d); };
  const daysLeft = () => dayDiff(todayStr(), cfg().examDate);
  const pageTitle = (id) => { const p = allPages().find((x) => x.id === id); return p ? p.title : id; };
  const plural = (n, w) => n + " " + w + (n === 1 ? "" : "s");

  // ---------- markdown + visuals ----------
  function visCard(id) {
    const v = VIS[id];
    if (!v) return "";
    return '<div class="vcard" data-vcard="1"><div class="vtitle">' + esc(v.title) + '</div><svg viewBox="0 0 240 160" class="vis">' + v.svg.replace(/\n/g, "") +
      '</svg><div class="vf">' + v.f + '</div><div class="vtip">' + esc(v.tip) + '</div><div class="vhint">Click to reveal</div></div>';
  }
  function visGrid(list) {
    const ids = list.trim() === "all" ? Object.keys(VIS) : list.split(",").map((s) => s.trim());
    return '<div class="vgrid">' + ids.map(visCard).join("") + "</div>";
  }
  function md(text) {
    const withVis = text.replace(/^\[\[vis:([^\]]+)\]\]\s*$/gm, (m, list) => "\n" + visGrid(list) + "\n");
    if (window.marked && window.marked.parse) return '<div class="md">' + window.marked.parse(withVis) + "</div>";
    return '<pre class="md" style="white-space:pre-wrap">' + esc(text) + "</pre>";
  }

  // ---------- schedule ----------
  const weekKey = (w, i) => w.from + "#" + i;
  function currentWeek() { const t = todayStr(); return S.schedule.find((s) => t >= s.from && t <= s.to); }
  function todayTopic() {
    const w = currentWeek();
    if (!w) return null;
    const i = Math.max(0, dayDiff(w.from, todayStr())) % w.topics.length;
    return { week: w, idx: i, topic: w.topics[i], day: Math.max(0, dayDiff(w.from, todayStr())) + 1 };
  }
  function todayEnglish() {
    const list = S.englishTopics || [];
    if (!list.length) return null;
    return list[Math.max(0, dayDiff(cfg().startDate, todayStr())) % list.length];
  }
  function planProgress() {
    let total = 0, done = 0;
    S.schedule.forEach((w) => w.topics.forEach((t, i) => { total++; if (data.topics[weekKey(w, i)]) done++; }));
    return { total, done };
  }
  const READING = [
    { type: "Science", links: [["Scientific American", "https://www.scientificamerican.com/"], ["Smithsonian", "https://www.smithsonianmag.com/"], ["BBC Future", "https://www.bbc.com/future"]] },
    { type: "History / Society", links: [["The Guardian — The Long Read", "https://www.theguardian.com/news/series/the-long-read"], ["Aeon", "https://aeon.co/"]] },
    { type: "Literature", links: [["Project Gutenberg", "https://www.gutenberg.org/"], ["Pride and Prejudice", "https://www.gutenberg.org/ebooks/1342"]] }
  ];
  function todayReading() {
    const day = new Date().getDay(); // 0 Sun ... 6 Sat
    return day === 6 || day === 0 || day === 1 ? READING[0] : day === 2 || day === 3 ? READING[1] : READING[2];
  }

  // ---------- practice log ----------
  const MATH_PAGES = ["geometry", "psda", "advanced", "algebra"];
  const DOMAIN = { geometry: "Geometry & Trig", psda: "Problem Solving & Data", advanced: "Advanced Math", algebra: "Algebra", grammar: "Grammar (Conventions)", transitions: "Expression of ideas", rwtypes: "Reading (Craft & Info)" };
  const isMixed = (name) => /mixed/i.test(name);
  function topicList() {
    const math = [];
    S.schedule.forEach((w) => { if (MATH_PAGES.includes(w.page)) w.topics.forEach((t) => { if (!isMixed(t)) math.push({ name: t, section: "Math", domain: DOMAIN[w.page], page: w.page }); }); });
    const rw = (S.englishTopics || []).map((x) => ({ name: x.t, section: "R&W", domain: DOMAIN[x.page] || "Reading", page: x.page }));
    return math.concat(rw);
  }
  const pr = () => data.practice;
  const sumQ = (list) => list.reduce((a, p) => ({ n: a.n + Number(p.n || 0), c: a.c + Number(p.correct || 0), m: a.m + Number(p.minutes || 0) }), { n: 0, c: 0, m: 0 });
  const pct = (c, n) => (n ? Math.round((c / n) * 100) : 0);
  const onDate = (d, section) => pr().filter((p) => p.date === d && (!section || p.section === section));
  function topicStats(name) {
    const l = pr().filter((p) => p.topic === name).sort((a, b) => (a.date < b.date ? -1 : 1));
    const all = sumQ(l), hard = sumQ(l.filter((p) => p.diff === "Hard"));
    const latest = l[l.length - 1];
    return { n: all.n, c: all.c, acc: pct(all.c, all.n), hn: hard.n, hacc: pct(hard.c, hard.n), last: latest ? latest.date : "", und: latest ? Number(latest.und || 0) : 0, sessions: l.length, minutes: all.m };
  }
  function topicStatus(st) {
    if (!st.n) return ["Not started", "plain"];
    if (st.n >= 10 && st.acc < 70) return ["Weak", ""];
    if (st.n >= 30 && st.acc >= 85 && st.hn >= 10 && st.hacc >= 80) return ["Mastered", "good"];
    if (st.n >= 15 && st.acc >= 80) return ["Solid", "good"];
    return ["Practicing", "plain"];
  }
  function sectionStats(sec, days) {
    const t = todayStr();
    return sumQ(pr().filter((p) => (!sec || p.section === sec) && (days == null || dayDiff(p.date, t) < days)));
  }

  // ---------- day counts ----------
  function studiedOn(d) { return onDate(d).length > 0 || minutesFor(d) >= 60; }
  function planDays() {
    const c = cfg(), t = todayStr();
    const total = dayDiff(c.startDate, c.examDate) + 1;
    const dayN = Math.min(total, Math.max(1, dayDiff(c.startDate, t) + 1));
    const from = data.trackFrom && data.trackFrom > c.startDate ? data.trackFrom : c.startDate;
    let passed = Math.max(0, Math.min(dayDiff(from, t), total));
    let studied = 0;
    const missed = [];
    for (let i = 0; i < passed; i++) { const d = addDays(from, i); if (studiedOn(d)) studied++; else missed.push(d); }
    if (t >= from && studiedOn(t)) { studied++; passed++; } // today counts once you have studied
    return { total, dayN, passed, studied, missed, left: Math.max(0, dayDiff(t, c.examDate)) };
  }

  // ---------- daily checklist (some tasks tick themselves from real activity) ----------
  const AUTO_IDS = ["mathq", "rwq", "reading", "errors", "vocab", "recall"];
  function autoTask(id, d) {
    const c = cfg();
    if (id === "mathq") { const n = sumQ(onDate(d, "Math")).n; return { done: n >= c.dailyMathQ, info: n + " / " + c.dailyMathQ + " questions logged" }; }
    if (id === "rwq") { const n = sumQ(onDate(d, "R&W")).n; return { done: n >= c.dailyRwQ, info: n + " / " + c.dailyRwQ + " questions logged" }; }
    if (id === "reading") { const n = data.reads.filter((r) => r.date === d).length; return { done: n > 0, info: n ? "article logged" : "add the article to Reading log" }; }
    if (id === "errors") {
      const q = sumQ(onDate(d)), wrong = q.n - q.c, need = Math.min(wrong, 3);
      const logged = data.errors.filter((e) => e.date === d).length;
      return { done: q.n > 0 && logged >= need, info: q.n ? wrong + " wrong today · " + logged + " logged" + (need > logged ? " (log " + need + "+)" : "") : "log practice first" };
    }
    if (d !== todayStr()) return null;
    if (id === "vocab") { const left = todaysNewWords().length, due = wordStats().due; return { done: left === 0 && due === 0, info: left + " new left · " + due + " reviews due" }; }
    if (id === "recall") {
      const due = formulaQueue().length;
      const touched = Object.keys(data.srs).some((k) => k.startsWith("f:") && data.srs[k].last === d);
      return { done: touched && due === 0, info: due ? due + " formula cards left" : touched ? "all cards done" : "open Formula flashcards" };
    }
    return null;
  }
  function doneList(d) {
    const rec = data.daily[d] || {};
    const manual = (rec.done || []).filter((id) => !AUTO_IDS.includes(id));
    const auto = tasks().filter((t) => AUTO_IDS.includes(t.id) && (() => { const a = autoTask(t.id, d); return a ? a.done : (rec.auto || []).includes(t.id); })()).map((t) => t.id);
    return manual.concat(auto);
  }
  function snapshotToday() {
    const t = todayStr();
    const a = doneList(t).filter((id) => AUTO_IDS.includes(id));
    const rec = data.daily[t] || { done: [] };
    if (JSON.stringify(a) !== JSON.stringify(rec.auto || [])) { rec.auto = a; data.daily[t] = rec; save(); }
  }
  function dayDone(dateStr) { const dl = doneList(dateStr); return tasks().every((t) => dl.includes(t.id)); }
  function streak() {
    let n = 0;
    const d = new Date();
    if (!studiedOn(todayStr(d))) d.setDate(d.getDate() - 1);
    while (studiedOn(todayStr(d)) && todayStr(d) >= cfg().startDate) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function minutesFor(dateStr) {
    const dl = doneList(dateStr);
    return tasks().filter((t) => dl.includes(t.id)).reduce((a, t) => a + Number(t.minutes), 0);
  }
  function weekMinutes() {
    let total = 0;
    const d = new Date();
    for (let i = 0; i < 7; i++) { total += minutesFor(todayStr(d)); d.setDate(d.getDate() - 1); }
    return total;
  }

  // ---------- honesty check ----------
  function honestyFlags() {
    const flags = [];
    const t = todayStr();
    S.schedule.forEach((w) => w.topics.forEach((name, i) => {
      if (!data.topics[weekKey(w, i)] || !MATH_PAGES.includes(w.page) || isMixed(name)) return;
      const st = topicStats(name);
      if (st.n < 10) flags.push(["Ticked without proof", "“" + name + "” is marked done, but only " + st.n + " questions are logged (needs 10+)."]);
      else if (st.und && st.und <= 2) flags.push(["Low understanding", "“" + name + "” is marked done, but you rated your understanding " + st.und + "/5."]);
      else if (st.acc < 70) flags.push(["Done but weak", "“" + name + "” is marked done with only " + st.acc + "% accuracy."]);
    }));
    S.schedule.forEach((w) => {
      if (w.to < t && w.to >= (data.trackFrom || "") && MATH_PAGES.includes(w.page)) w.topics.forEach((name) => { if (!isMixed(name) && topicStats(name).n === 0) flags.push(["Skipped topic", "“" + name + "” (" + w.from + " → " + w.to + ") has no practice logged."]); });
    });
    const pd = planDays();
    const recent = pd.missed.filter((d) => dayDiff(d, t) <= 7);
    if (recent.length) flags.push(["Missed days", plural(recent.length, "day") + " without study in the last week: " + recent.join(", ") + "."]);
    const last7 = pr().filter((p) => dayDiff(p.date, t) < 7);
    const s7 = sumQ(last7), h7 = sumQ(last7.filter((p) => p.diff === "Hard"));
    if (t >= "2027-01-13" && s7.n >= 40 && pct(h7.n, s7.n) < 40) flags.push(["Avoiding Hard", "Only " + pct(h7.n, s7.n) + "% of this week's questions were Hard. Phase 2 needs mostly Hard."]);
    const lowUnd = last7.filter((p) => Number(p.und) <= 2).map((p) => p.topic);
    Array.from(new Set(lowUnd)).forEach((n) => flags.push(["Didn't understand", "You rated “" + n + "” 2/5 or lower this week. Relearn it before more practice."]));
    const stale = data.errors.filter((e) => (e.reviews || 0) === 0 && dayDiff(e.date, t) >= 7).length;
    if (stale) flags.push(["Mistakes not redone", plural(stale, "mistake") + " logged over a week ago " + (stale === 1 ? "has" : "have") + " never been redone."]);
    const due = wordStats().due;
    if (due >= 40) flags.push(["Review backlog", due + " vocabulary reviews are piling up."]);
    const wk = sectionStats(null, 7), needWk = (cfg().dailyMathQ + cfg().dailyRwQ) * Math.min(7, pd.passed + 1);
    if (pd.passed >= 3 && wk.n < needWk * 0.6) flags.push(["Low volume", "Only " + wk.n + " questions in the last 7 days (target ~" + needWk + ")."]);
    return flags;
  }

  // ---------- readiness ----------
  function readiness() {
    const c = cfg();
    const t = topicList();
    const mt = t.filter((x) => x.section === "Math");
    const pageOf = (name) => { const e = (S.englishTopics || []).find((x) => x.t === name); return e ? e.page : ""; };
    const recentHard = (sec) => {
      const l = pr().filter((p) => p.section === sec && p.diff === "Hard").sort((a, b) => (a.date < b.date ? 1 : -1));
      let n = 0, cc = 0;
      for (const p of l) { if (n >= 100) break; n += Number(p.n); cc += Number(p.correct); }
      return { n, acc: pct(cc, n) };
    };
    const accItem = (group, label, q, minN, need) => {
      const acc = q.acc != null ? q.acc : pct(q.c, q.n);
      const prog = Math.min(1, acc / need) * Math.min(1, q.n / minN);
      return { group, label, prog, detail: q.n ? acc + "% on " + q.n + " questions" + (q.n < minN ? " (need " + minN + "+)" : "") : "nothing logged yet" };
    };
    const mDone = mt.filter((x) => topicStats(x.name).n >= 30).length;
    const mh = recentHard("Math"), rh = recentHard("R&W");
    const gram = sumQ(pr().filter((p) => pageOf(p.topic) === "grammar"));
    const expr = sumQ(pr().filter((p) => pageOf(p.topic) === "transitions"));
    const ws = wordStats();
    const fcs = formulaCards(), fm = fcs.filter((x) => isMastered(x.id)).length;
    const sc = sortedScores(), ls = sc[sc.length - 1], last2 = sc.slice(-2);
    const pd = planDays();
    const redone = data.errors.filter((e) => (e.reviews || 0) >= 2).length;
    const slips = data.errors.slice(-20).filter((e) => /slip|Misread/.test(e.type)).length;
    const items = [
      { group: "Math", label: "Every Math topic has 30+ questions", prog: mDone / mt.length, detail: mDone + " / " + mt.length + " topics" },
      accItem("Math", "Hard Math accuracy ≥ 85% (last 100 Hard)", { n: mh.n, acc: mh.acc }, 50, 85),
      { group: "Math", label: "Careless mistakes near zero (last 20 errors)", prog: data.errors.length >= 5 ? 1 - slips / 20 : 0, detail: data.errors.length >= 5 ? slips + " of your last 20 mistakes were slips or misreads" : "log more mistakes to measure" },
      { group: "Math", label: "Math test score ≥ " + c.target.math, prog: ls ? Math.min(1, (ls.math - 200) / (c.target.math - 200)) : 0, detail: ls ? "latest " + ls.math : "no test yet" },
      accItem("R&W", "Grammar accuracy ≥ 95%", gram, 100, 95),
      accItem("R&W", "Transitions & synthesis ≥ 95%", expr, 60, 95),
      accItem("R&W", "Hard R&W accuracy ≥ 78% (last 100 Hard)", { n: rh.n, acc: rh.acc }, 50, 78),
      { group: "R&W", label: "300 words mastered", prog: Math.min(1, ws.mastered / 300), detail: ws.mastered + " mastered · " + ws.started + " started" },
      { group: "R&W", label: "R&W test score ≥ " + c.target.rw, prog: ls ? Math.min(1, (ls.rw - 200) / (c.target.rw - 200)) : 0, detail: ls ? "latest " + ls.rw : "no test yet" },
      { group: "General", label: "Formula cards mastered ≥ 90%", prog: Math.min(1, pct(fm, fcs.length) / 90), detail: fm + " / " + fcs.length + " mastered" },
      { group: "General", label: "Studied on ≥ 85% of days", prog: pd.passed ? Math.min(1, pct(pd.studied, pd.passed) / 85) : 0, detail: pd.studied + " of " + pd.passed + " days (" + pct(pd.studied, pd.passed) + "%)" },
      { group: "General", label: "Every mistake redone 2+ times", prog: data.errors.length ? redone / data.errors.length : 0, detail: redone + " / " + data.errors.length + " mistakes" },
      { group: "General", label: "Last two full tests ≥ " + c.target.total, prog: last2.filter((x) => x.total >= c.target.total).length / 2, detail: last2.length ? last2.map((x) => x.total).join(", ") : "no tests yet" }
    ];
    const overall = Math.round((items.reduce((a, x) => a + x.prog, 0) / items.length) * 100);
    return { items, overall };
  }

  // ---------- scores ----------
  const sortedScores = () => [...data.scores].sort((a, b) => (a.date < b.date ? -1 : 1));
  function latestScore() { const s = sortedScores(); return s.length ? s[s.length - 1] : null; }
  function expectedAt(dateStr) {
    const c = cfg();
    const pts = [{ date: c.startDate, score: c.startScore }].concat(c.milestones);
    if (dateStr <= pts[0].date) return pts[0].score;
    for (let i = 1; i < pts.length; i++) {
      if (dateStr <= pts[i].date) {
        const span = dayDiff(pts[i - 1].date, pts[i].date) || 1;
        return Math.round(pts[i - 1].score + (dayDiff(pts[i - 1].date, dateStr) / span) * (pts[i].score - pts[i - 1].score));
      }
    }
    return pts[pts.length - 1].score;
  }

  // ---------- spaced repetition ----------
  function srsAnswer(id, knew) {
    const s = data.srs[id] || { lvl: -1 };
    if (knew) { s.lvl = Math.min(INTERVALS.length - 1, (s.lvl < 0 ? 0 : s.lvl + 1)); s.due = addDays(todayStr(), INTERVALS[s.lvl]); }
    else { s.lvl = 0; s.due = addDays(todayStr(), 1); }
    s.last = todayStr();
    data.srs[id] = s;
  }
  const isDue = (id) => data.srs[id] && data.srs[id].due <= todayStr();
  const isMastered = (id) => data.srs[id] && data.srs[id].lvl >= MASTER_LVL;
  const myWords = () => data.vocab.map((v) => ({ id: "u:" + v.id, word: v.word, pos: "my word", meaning: v.meaning, example: v.sentence || "", mine: true, raw: v }));
  const allWords = () => WORDS.concat(myWords());
  const learnedToday = () => Object.keys(data.intro).filter((k) => data.intro[k] === todayStr() && k.startsWith("w:")).length;
  function todaysNewWords() {
    const introToday = WORDS.filter((w) => data.intro[w.id] === todayStr());
    const left = Math.max(0, cfg().newWordsPerDay - introToday.length);
    const fresh = WORDS.filter((w) => !data.srs[w.id]).slice(0, left);
    return fresh;
  }
  function wordStats() {
    const ids = allWords().map((w) => w.id);
    const started = ids.filter((id) => data.srs[id]).length;
    return { total: ids.length, started, mastered: ids.filter(isMastered).length, due: ids.filter(isDue).length };
  }
  function learnWord(id, known) {
    data.intro[id] = todayStr();
    if (known) data.srs[id] = { lvl: MASTER_LVL, due: addDays(todayStr(), INTERVALS[MASTER_LVL]), last: todayStr() };
    else data.srs[id] = { lvl: 0, due: addDays(todayStr(), 1), last: todayStr() };
  }

  const formulaCards = () => (S.flashcards || []).map((c) => ({ id: "f:" + c.q, q: c.q, a: c.a }));
  function formulaQueue() {
    const cards = formulaCards();
    const due = cards.filter((c) => isDue(c.id));
    const introToday = cards.filter((c) => data.intro[c.id] === todayStr()).length;
    const fresh = cards.filter((c) => !data.srs[c.id]).slice(0, Math.max(0, NEW_FORMULA_PER_DAY - introToday));
    return due.concat(fresh);
  }

  // ---------- header & nav ----------
  function renderHeader() {
    const c = cfg();
    $("#targetPill").textContent = "Target " + c.target.total + (c.stretch ? "–" + c.stretch.total : "+");
    const d = daysLeft();
    $("#countdown").innerHTML = d >= 0 ? "<b>" + d + "</b> days to the test" : "Test day has passed";
  }
  const homePage = { id: "dashboard", group: "Home", title: "Dashboard" };
  const planPage = { id: "studyplan", group: "Plan", title: "Study plan (tracker)" };
  const readyPage = { id: "readiness", group: "Plan", title: "Readiness check" };
  const extraPages = [
    { id: "practice", group: "Practice", title: "Practice log" },
    { id: "mastery", group: "Practice", title: "Topic mastery" },
    { id: "vocab", group: "Practice", title: "Vocabulary trainer" },
    { id: "flashcards", group: "Practice", title: "Formula flashcards" },
    { id: "errors", group: "Practice", title: "Error log" },
    { id: "reads", group: "Practice", title: "Reading log" },
    { id: "scores", group: "Tracker", title: "Test scores" },
    { id: "tracker", group: "Tracker", title: "Daily history" },
    { id: "settings", group: "Tracker", title: "Settings" },
    { id: "backup", group: "Tracker", title: "Backup / restore" }
  ];
  function allPages() {
    const secs = S.sections.slice();
    const i = secs.findIndex((s) => s.group === "Plan");
    secs.splice(i < 0 ? 0 : i + 1, 0, planPage, readyPage);
    return [homePage].concat(secs).concat(extraPages);
  }
  function renderNav(active) {
    let html = "", last = "";
    allPages().forEach((p) => {
      if (p.group !== last) { html += '<div class="nav-group">' + esc(p.group) + "</div>"; last = p.group; }
      let badge = "";
      if (p.id === "vocab") { const n = wordStats().due + todaysNewWords().length; if (n) badge = '<span class="badge">' + n + "</span>"; }
      if (p.id === "flashcards") { const n = formulaQueue().length; if (n) badge = '<span class="badge">' + n + "</span>"; }
      html += '<a class="nav-link' + (p.id === active ? " active" : "") + '" href="#' + esc(p.id) + '">' + esc(p.title) + badge + "</a>";
    });
    $("#sidebar").innerHTML = html;
  }

  // ---------- pages ----------
  function practiceForm(formId, defTopic, compact) {
    const groups = {};
    topicList().forEach((x) => { (groups[x.section + " — " + x.domain] = groups[x.section + " — " + x.domain] || []).push(x.name); });
    groups["Mixed"] = ["Mixed Math", "Mixed R&W"];
    const opts = Object.keys(groups).map((g) => '<optgroup label="' + esc(g) + '">' + groups[g].map((n) => '<option' + (n === defTopic ? " selected" : "") + ">" + esc(n) + "</option>").join("") + "</optgroup>").join("");
    return '<form class="row" id="' + formId + '">' +
      '<label class="f wide2">Topic<select name="topic" required>' + opts + "</select></label>" +
      '<label class="f">Difficulty<select name="diff"><option>Easy</option><option selected>Medium</option><option>Hard</option><option>Mixed</option></select></label>' +
      '<label class="f">Questions<input type="number" name="n" min="1" max="200" required></label>' +
      '<label class="f">Correct<input type="number" name="correct" min="0" max="200" required></label>' +
      '<label class="f">Minutes<input type="number" name="minutes" min="1" max="300"></label>' +
      '<label class="f">Understanding<select name="und"><option value="5">5 — could teach it</option><option value="4">4 — clear</option><option value="3" selected>3 — mostly</option><option value="2">2 — shaky</option><option value="1">1 — lost</option></select></label>' +
      (compact ? "" : '<label class="f">Source<select name="source"><option>Question Bank</option><option>Khan Academy</option><option>Bluebook</option><option>Other</option></select></label>' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '"></label>' +
        '<label class="f wide">Note (optional)<input name="note" placeholder="what was hard?"></label>') +
      '<div><button class="btn" type="submit">Log practice</button></div>' +
      '<div class="form-err" id="' + formId + 'Err"></div></form>';
  }

  function pageDashboard() {
    const c = cfg();
    const t = todayStr();
    snapshotToday();
    const done = doneList(t);
    const ls = latestScore();
    const cur = ls ? ls.total : c.startScore;
    const pctT = Math.max(0, Math.min(100, ((cur - c.startScore) / (c.target.total - c.startScore)) * 100));
    const totalMin = tasks().reduce((a, x) => a + Number(x.minutes), 0);
    const tt = todayTopic();
    const en = todayEnglish();
    const rd = todayReading();
    const ws = wordStats();
    const newW = todaysNewWords().length;
    const fq = formulaQueue().length;
    const pp = planProgress();
    const pd = planDays();
    const tm = sumQ(onDate(t, "Math")), tr = sumQ(onDate(t, "R&W"));
    const all = sectionStats(null), wk = sectionStats(null, 7);
    const flags = honestyFlags();
    const rdy = readiness();

    let status;
    if (ls) {
      const diff = ls.total - expectedAt(ls.date);
      status = diff >= 0
        ? '<span class="tag good">On track</span> On ' + esc(ls.date) + " the plan expected ~" + expectedAt(ls.date) + "; you scored " + ls.total + "."
        : '<span class="tag">' + Math.abs(diff) + " points behind</span> On " + esc(ls.date) + " the plan expected ~" + expectedAt(ls.date) + ". Spend extra time on your weak topics.";
    } else {
      status = '<span class="tag">No test yet</span> Take a Bluebook practice test and add the score to see whether you are on track.';
    }

    const taskHtml = tasks().map((x) => {
      const auto = AUTO_IDS.includes(x.id) ? autoTask(x.id, t) : null;
      const isDone = done.includes(x.id);
      return '<label class="task' + (isDone ? " done" : "") + (auto ? " auto" : "") + '"><input type="checkbox" ' + (auto ? "disabled" : 'data-task="' + esc(x.id) + '"') + (isDone ? " checked" : "") + "><span>" + esc(x.label) +
        (auto ? '<span class="auto-info">auto · ' + esc(auto.info) + "</span>" : "") + '</span><span class="min">' + x.minutes + " min</span></label>";
    }).join("");

    const review = data.errors.slice().sort((a, b) => (a.reviews || 0) - (b.reviews || 0) || (a.date < b.date ? -1 : 1)).slice(0, 2);
    const reviewHtml = review.length
      ? review.map((e) => '<div class="list-item"><div class="meta">' + esc(e.section) + " · " + esc(e.topic) + " · redone " + plural(e.reviews || 0, "time") + "</div><div>" + esc(e.question) +
        '</div><div class="muted">Next time: ' + esc(e.fix || "—") + '</div><button class="btn ghost small" data-review="' + esc(e.id) + '">Solved it again ✓</button></div>').join("")
      : '<div class="muted">Your error log is empty. Log every mistake — it is the fastest way to raise your score.</div>';

    const quick = (S.quickLinks || []).map((l) => '<a class="btn ghost" target="_blank" rel="noopener" href="' + esc(l.url) + '">' + esc(l.label) + " ↗</a>").join("");
    const topicDone = tt && data.topics[weekKey(tt.week, tt.idx)];
    const bar = (v, max) => '<div class="bar"><div style="width:' + Math.min(100, Math.round((v / max) * 100)) + '%"></div></div>';
    const defTopic = tt && MATH_PAGES.includes(tt.week.page) && !isMixed(tt.topic) ? tt.topic : (en ? en.t : "");

    return (
      '<h1>Hello, ' + esc(c.name) + '</h1>' +
      '<div class="daybar"><div><b>Day ' + pd.dayN + "</b> of " + pd.total + '</div><div><b>' + pd.left + '</b> days left</div><div>Studied <b>' + pd.studied + " / " + pd.passed + "</b> days (" + pct(pd.studied, pd.passed) + '%)</div><div class="' + (pd.missed.length ? "warn" : "") + '">Missed <b>' + pd.missed.length + '</b></div><div>Streak <b>' + plural(streak(), "day") + '</b></div><div>Readiness <b>' + rdy.overall + "%</b></div></div>" +
      '<div class="today">' +
        '<div class="today-box"><div class="today-label">Today\'s Math topic' + (tt ? " · Day " + tt.day : "") + "</div>" +
          (tt ? '<div class="today-topic">' + esc(tt.topic) + '</div><div class="today-links"><a href="#' + esc(tt.week.page) + '">Open ' + esc(pageTitle(tt.week.page)) + ' →</a>' +
            '<label class="mini-check"><input type="checkbox" data-topic="' + esc(weekKey(tt.week, tt.idx)) + '"' + (topicDone ? " checked" : "") + "> Done</label></div>"
            : '<div class="today-topic">No schedule for today — update it in content.js</div>') + "</div>" +
        '<div class="today-box"><div class="today-label">Today\'s English topic</div>' +
          (en ? '<div class="today-topic">' + esc(en.t) + '</div><div class="today-links"><a href="#' + esc(en.page) + '">Open ' + esc(pageTitle(en.page)) + " →</a></div>" : "") + "</div>" +
        '<div class="today-box"><div class="today-label">Today\'s reading</div><div class="today-topic">' + esc(rd.type) + '</div><div class="today-links">' +
          rd.links.map((l) => '<a target="_blank" rel="noopener" href="' + esc(l[1]) + '">' + esc(l[0]) + " ↗</a>").join(" · ") + "</div></div>" +
        '<div class="today-box"><div class="today-label">Today\'s vocabulary</div><div class="today-topic">' + plural(newW, "new word") + " · " + ws.due + ' due</div><div class="today-links"><a href="#vocab">Open trainer →</a> · <a href="#flashcards">' + plural(fq, "formula card") + " left</a></div></div>" +
      "</div>" +
      '<div class="card"><div class="week-head"><b>Log practice</b><span class="muted">Every set you do goes here — it powers every number in the hub.</span></div>' +
        '<div class="grid two" style="margin:10px 0">' +
          '<div><div class="muted">Math today: <b>' + tm.n + " / " + c.dailyMathQ + "</b> questions · " + pct(tm.c, tm.n) + "% correct</div>" + bar(tm.n, c.dailyMathQ) + "</div>" +
          '<div><div class="muted">R&W today: <b>' + tr.n + " / " + c.dailyRwQ + "</b> questions · " + pct(tr.c, tr.n) + "% correct</div>" + bar(tr.n, c.dailyRwQ) + "</div>" +
        "</div>" + practiceForm("quickPractice", defTopic, true) + "</div>" +
      (flags.length
        ? '<div class="card flagcard"><b>Honesty check</b> <span class="muted">(' + plural(flags.length, "issue") + ")</span>" + flags.map((f) => '<div class="flag"><span class="tag">' + esc(f[0]) + "</span> " + esc(f[1]) + "</div>").join("") + "</div>"
        : '<div class="card"><b>Honesty check</b> <span class="tag good">All clear</span> <span class="muted">No skipped topics, fake ticks, or missed days.</span></div>') +
      '<div class="card"><b>Today\'s checklist</b> <span class="muted">(' + t + " · " + minutesFor(t) + " / " + totalMin + ' min · items marked "auto" tick themselves from what you log)</span>' + taskHtml + "</div>" +
      '<div class="actions" style="margin-bottom:16px">' + quick + "</div>" +
      '<div class="grid">' +
        '<div class="stat"><div class="label">Latest score</div><div class="value">' + cur + '</div><div class="sub">' + (ls ? "Math " + esc(ls.math) + " · R&W " + esc(ls.rw) : "Starting score") + "</div></div>" +
        '<div class="stat"><div class="label">Questions practiced</div><div class="value">' + all.n + '</div><div class="sub">' + pct(all.c, all.n) + "% correct · " + wk.n + " this week</div></div>" +
        '<div class="stat"><div class="label">Last 7 days</div><div class="value">' + (weekMinutes() / 60).toFixed(1) + ' h</div><div class="sub">target ' + ((totalMin * 7) / 60).toFixed(0) + " h</div></div>" +
        '<div class="stat"><div class="label">Words mastered</div><div class="value">' + ws.mastered + '</div><div class="sub">of ' + ws.total + " · " + ws.started + " started</div></div>" +
        '<div class="stat"><div class="label">Study plan</div><div class="value">' + Math.round((pp.done / pp.total) * 100) + '%</div><div class="sub">' + pp.done + " / " + pp.total + " topics ticked</div></div>" +
        '<div class="stat"><div class="label">Mistakes logged</div><div class="value">' + data.errors.length + '</div><div class="sub">' + data.errors.filter((e) => (e.reviews || 0) >= 2).length + " redone 2+ times</div></div>" +
      "</div>" +
      '<div class="card"><b>Progress toward your target</b> <span class="muted">(' + c.startScore + " → " + c.target.total + (c.stretch ? "–" + c.stretch.total : "") + ")</span>" +
        '<div class="bar" style="margin-top:8px"><div style="width:' + pctT.toFixed(0) + '%"></div></div>' +
        '<div class="muted" style="margin-top:6px">' + Math.max(0, c.target.total - cur) + " points to go · today the plan expects ~" + expectedAt(t) + ' · <a href="#readiness">Readiness check →</a></div>' +
        '<div style="margin-top:8px">' + status + "</div></div>" +
      '<div class="card"><b>Redo today (from your error log)</b>' + reviewHtml + "</div>"
    );
  }

  function pagePractice() {
    const t = todayStr();
    // 21-day chart
    const days = [];
    for (let i = 20; i >= 0; i--) days.push(addDays(t, -i));
    const vals = days.map((d) => ({ d, m: sumQ(onDate(d, "Math")).n, r: sumQ(onDate(d, "R&W")).n }));
    const max = Math.max(cfg().dailyMathQ + cfg().dailyRwQ, ...vals.map((v) => v.m + v.r));
    const W = 640, H = 180, L = 30, B = 22, bw = (W - L) / days.length;
    const Y = (v) => (H - B) - (v / max) * (H - B - 10);
    let g = '<line class="target-l" x1="' + L + '" y1="' + Y(cfg().dailyMathQ + cfg().dailyRwQ) + '" x2="' + W + '" y2="' + Y(cfg().dailyMathQ + cfg().dailyRwQ) + '"/>';
    vals.forEach((v, i) => {
      const x = L + i * bw + 2, w = bw - 4;
      if (v.m) g += '<rect class="bar-m" x="' + x + '" y="' + Y(v.m) + '" width="' + w + '" height="' + (H - B - Y(v.m)) + '"><title>' + v.d + ": Math " + v.m + "</title></rect>";
      if (v.r) g += '<rect class="bar-r" x="' + x + '" y="' + Y(v.m + v.r) + '" width="' + w + '" height="' + (Y(v.m) - Y(v.m + v.r)) + '"><title>' + v.d + ": R&W " + v.r + "</title></rect>";
      if (!v.m && !v.r && v.d < t && v.d >= cfg().startDate) g += '<text class="ax miss" x="' + (x + w / 2) + '" y="' + (H - B - 4) + '" text-anchor="middle">×</text>';
      if (i % 5 === 0 || i === vals.length - 1) g += '<text class="ax" x="' + (x + w / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + v.d.slice(5) + "</text>";
    });
    g += '<text class="ax" x="' + (L - 4) + '" y="' + (Y(max) + 4) + '" text-anchor="end">' + max + "</text>";
    const chart = '<svg viewBox="0 0 ' + W + " " + H + '" class="chart">' + g + '</svg><div class="legend"><span><i class="lg score"></i>Math</span><span><i class="lg rw"></i>R&W</span><span><i class="lg target"></i>Daily target</span><span>× = missed day</span></div>';

    const m = sectionStats("Math"), r = sectionStats("R&W");
    const byDiff = ["Easy", "Medium", "Hard"].map((d) => { const q = sumQ(pr().filter((p) => p.diff === d)); return '<div class="stat"><div class="label">' + d + '</div><div class="value">' + pct(q.c, q.n) + '%</div><div class="sub">' + q.n + " questions</div></div>"; }).join("");
    const list = [...pr()].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, 60).map((p) =>
      "<tr><td>" + esc(p.date) + "</td><td>" + esc(p.section) + "</td><td>" + esc(p.topic) + "</td><td>" + esc(p.diff) + "</td><td>" + p.correct + "/" + p.n + " (" + pct(p.correct, p.n) + "%)</td><td>" + esc(p.minutes || "—") + "</td><td>" + esc(p.und) + "/5</td><td>" +
      '<button class="btn ghost small" data-del="practice:' + esc(p.id) + '">Delete</button></td></tr>').join("");
    return "<h1>Practice log</h1>" +
      '<p class="muted">Log every set right after you finish it. Be honest — the numbers only help if they are real.</p>' +
      '<div class="card">' + practiceForm("practiceForm", "", false) + "</div>" +
      '<div class="grid">' +
        '<div class="stat"><div class="label">Math total</div><div class="value">' + m.n + '</div><div class="sub">' + pct(m.c, m.n) + "% correct · " + Math.round(m.m / 60) + " h</div></div>" +
        '<div class="stat"><div class="label">R&W total</div><div class="value">' + r.n + '</div><div class="sub">' + pct(r.c, r.n) + "% correct · " + Math.round(r.m / 60) + " h</div></div>" + byDiff +
      "</div>" +
      '<div class="card"><b>Last 21 days</b>' + chart + "</div>" +
      (list ? '<div class="card md"><table><tr><th>Date</th><th>Section</th><th>Topic</th><th>Level</th><th>Score</th><th>Min</th><th>Und.</th><th></th></tr>' + list + "</table></div>" : '<div class="card muted">No practice logged yet.</div>');
  }

  function pageMastery() {
    const t = todayStr();
    const ticked = {};
    S.schedule.forEach((w) => w.topics.forEach((n, i) => { if (data.topics[weekKey(w, i)]) ticked[n] = true; }));
    const groups = {};
    topicList().forEach((x) => { (groups[x.section + " — " + x.domain] = groups[x.section + " — " + x.domain] || []).push(x); });
    const counts = { "Not started": 0, Practicing: 0, Weak: 0, Solid: 0, Mastered: 0 };
    const html = Object.keys(groups).map((g) => {
      const rows = groups[g].map((x) => {
        const st = topicStats(x.name);
        const [label, cls] = topicStatus(st);
        counts[label]++;
        const fading = st.last && dayDiff(st.last, t) > 14 && (label === "Solid" || label === "Mastered");
        const warn = ticked[x.name] && st.n < 10 ? ' <span class="tag">ticked, no proof</span>' : "";
        return "<tr><td>" + esc(x.name) + warn + "</td><td>" + st.n + "</td><td>" + (st.n ? st.acc + "%" : "—") + "</td><td>" + (st.hn ? st.hacc + "% (" + st.hn + ")" : "—") + "</td><td>" + (st.und ? st.und + "/5" : "—") + "</td><td>" + (st.last ? esc(st.last) + (fading ? ' <span class="tag">fading</span>' : "") : "—") +
          '</td><td><span class="tag ' + cls + '">' + label + "</span></td></tr>";
      }).join("");
      return '<div class="card md"><b>' + esc(g) + '</b><table><tr><th>Topic</th><th>Questions</th><th>Accuracy</th><th>Hard</th><th>Understanding</th><th>Last practiced</th><th>Status</th></tr>' + rows + "</table></div>";
    }).join("");
    const total = topicList().length;
    return "<h1>Topic mastery</h1>" +
      '<p class="muted">Built only from your Practice log. <b>Solid</b> = 15+ questions at 80%+. <b>Mastered</b> = 30+ questions at 85%+ and 10+ Hard at 80%+. <b>Weak</b> = under 70%. <b>Fading</b> = not practiced for 14+ days.</p>' +
      '<div class="grid">' + Object.keys(counts).map((k) => '<div class="stat"><div class="label">' + k + '</div><div class="value">' + counts[k] + '</div><div class="sub">of ' + total + " topics</div></div>").join("") + "</div>" + html;
  }

  function pageReadiness() {
    const c = cfg();
    const r = readiness();
    const groups = ["Math", "R&W", "General"];
    return "<h1>Readiness check</h1>" +
      '<p class="muted">Live progress toward Math ' + c.target.math + (c.stretch ? "–" + c.stretch.math : "+") + " and R&W " + c.target.rw + (c.stretch ? "–" + c.stretch.rw : "+") + '. Each bar fills only from real logged work. What each requirement means: <a href="#target">Target 770+ / 700+</a>.</p>' +
      '<div class="card"><b>Overall readiness: ' + r.overall + '%</b><div class="bar" style="margin-top:8px"><div style="width:' + r.overall + '%"></div></div></div>' +
      groups.map((g) => '<div class="card"><b>' + g + "</b>" + r.items.filter((x) => x.group === g).map((x) =>
        '<div class="req"><div class="req-head"><span>' + (x.prog >= 1 ? "✅ " : "") + esc(x.label) + '</span><span class="muted">' + esc(x.detail) + '</span></div><div class="bar"><div style="width:' + Math.round(x.prog * 100) + '%"></div></div></div>').join("") + "</div>").join("");
  }

  function pageStudyPlan() {
    const t = todayStr();
    const pp = planProgress();
    const weeks = S.schedule.map((w) => {
      const n = w.topics.length;
      const d = w.topics.filter((x, i) => data.topics[weekKey(w, i)]).length;
      const cur = t >= w.from && t <= w.to;
      const past = t > w.to;
      const items = w.topics.map((x, i) => {
        const st = topicStats(x), ticked = data.topics[weekKey(w, i)];
        const counted = MATH_PAGES.includes(w.page) && !isMixed(x);
        const ev = counted ? (st.n ? st.n + " q · " + st.acc + "%" : "no practice") : "";
        const warn = counted && ticked && st.n < 10 ? ' <span class="tag">no proof</span>' : "";
        return '<label class="task' + (ticked ? " done" : "") + '"><input type="checkbox" data-topic="' + esc(weekKey(w, i)) + '"' + (ticked ? " checked" : "") + "><span>" + esc(x) + warn + '</span><span class="min">' + ev + "</span></label>";
      }).join("");
      return '<div class="card' + (cur ? " current" : "") + '"><div class="week-head"><b>' + esc(w.focus) + "</b>" +
        (cur ? ' <span class="tag good">This week</span>' : past && d < n ? ' <span class="tag">Unfinished</span>' : "") +
        '<span class="muted" style="margin-left:auto">' + esc(w.from) + " → " + esc(w.to) + " · " + d + "/" + n + "</span></div>" +
        '<div class="bar" style="margin:8px 0"><div style="width:' + Math.round((d / n) * 100) + '%"></div></div>' + items +
        '<div style="margin-top:6px"><a href="#' + esc(w.page) + '">Open ' + esc(pageTitle(w.page)) + " →</a></div></div>";
    }).join("");
    return "<h1>Study plan</h1>" +
      '<p class="muted">Tick each topic when you have learned it and practiced it in the Question Bank. Overall: <b>' + pp.done + " / " + pp.total + "</b> topics.</p>" +
      '<div class="bar" style="margin-bottom:16px"><div style="width:' + Math.round((pp.done / pp.total) * 100) + '%"></div></div>' + weeks;
  }

  // ---------- vocabulary trainer ----------
  let vt = { tab: "today", queue: null, idx: 0, show: false, filter: "all", search: "" };
  function reviewQueue() { return allWords().filter((w) => isDue(w.id)); }
  function wordCard(w, actions) {
    return '<div class="wcard"><div class="wword">' + esc(w.word) + ' <span class="wpos">' + esc(w.pos) + '</span></div><div class="wmean">' + esc(w.meaning) + "</div>" +
      (w.example ? '<div class="wex">“' + esc(w.example) + "”</div>" : "") + (actions || "") + "</div>";
  }
  function pageVocab() {
    const c = cfg();
    const ws = wordStats();
    const tabs = [["today", "Today's new words"], ["review", "Review (" + ws.due + ")"], ["list", "Word list"], ["mine", "My words"]];
    const tabHtml = '<div class="tabs">' + tabs.map((x) => '<button class="tab' + (vt.tab === x[0] ? " on" : "") + '" data-vtab="' + x[0] + '">' + esc(x[1]) + "</button>").join("") + "</div>";
    const head = "<h1>Vocabulary trainer</h1>" +
      '<div class="grid">' +
        '<div class="stat"><div class="label">Learned today</div><div class="value">' + learnedToday() + " / " + c.newWordsPerDay + '</div><div class="sub">new words</div></div>' +
        '<div class="stat"><div class="label">Due for review</div><div class="value">' + ws.due + '</div><div class="sub">today</div></div>' +
        '<div class="stat"><div class="label">Started</div><div class="value">' + ws.started + '</div><div class="sub">of ' + ws.total + "</div></div>" +
        '<div class="stat"><div class="label">Mastered</div><div class="value">' + ws.mastered + '</div><div class="sub">reached the 15-day level</div></div>' +
      '</div><div class="bar" style="margin-bottom:14px"><div style="width:' + Math.round((ws.mastered / Math.max(1, ws.total)) * 100) + '%"></div></div>' + tabHtml;
    let body = "";
    if (vt.tab === "today") {
      const fresh = todaysNewWords();
      if (!fresh.length) {
        body = '<div class="card"><b>Done for today ✓</b><p class="muted">You learned ' + plural(learnedToday(), "new word") + " today." +
          (WORDS.every((w) => data.srs[w.id]) ? " You have started every word in the list — keep doing reviews." : " Come back tomorrow for the next set, or do your reviews now.") +
          '</p><div class="actions"><button class="btn" data-vtab="review">Go to review (' + ws.due + ')</button><button class="btn ghost" id="extraWords">Learn 5 more today</button></div></div>';
      } else {
        body = '<p class="muted">Read each word, its meaning, and the example sentence out loud. Make your own sentence in your head. Then mark it.</p>' +
          '<div class="wgrid">' + fresh.map((w) => wordCard(w, '<div class="actions"><button class="btn small" data-learn="' + esc(w.id) + '">Learned</button><button class="btn ghost small" data-known="' + esc(w.id) + '">Already know it</button></div>')).join("") + "</div>" +
          '<div class="actions" style="margin-top:12px"><button class="btn" id="learnAll">Mark all ' + fresh.length + " as learned</button></div>";
      }
    } else if (vt.tab === "review") {
      if (!vt.queue) { vt.queue = reviewQueue().sort(() => Math.random() - 0.5); vt.idx = 0; vt.show = false; }
      const w = vt.queue[vt.idx];
      if (!w) {
        body = '<div class="card"><b>No reviews due ✓</b><p class="muted">Reviews come back on a schedule (1, 2, 4, 7, 15, 30 days). Learn today\'s new words if you have not yet.</p></div>';
      } else {
        const lvl = data.srs[w.id] ? data.srs[w.id].lvl : 0;
        body = '<p class="muted">' + (vt.idx + 1) + " of " + vt.queue.length + ". Say the meaning out loud before you flip. Keyboard: Space = flip, → = knew it, ← = didn't know.</p>" +
          '<div class="flash"><div class="flash-kind">' + esc(w.pos) + " · level " + (lvl + 1) + " of " + INTERVALS.length + '</div><div class="flash-q">' + esc(w.word) + "</div>" +
          (vt.show
            ? '<div class="flash-a">' + esc(w.meaning) + "</div>" + (w.example ? '<div class="wex" style="margin-top:10px">“' + esc(w.example) + "”</div>" : "") +
              '<div class="actions center"><button class="btn bad" data-vans="0">Didn\'t know ✗</button><button class="btn good" data-vans="1">Knew it ✓</button></div>'
            : '<div class="actions center"><button class="btn" id="vflip">Show meaning (Space)</button></div>') + "</div>";
      }
    } else if (vt.tab === "list") {
      const status = (w) => (isMastered(w.id) ? "mastered" : data.srs[w.id] ? "learning" : "new");
      const q = vt.search.toLowerCase();
      const rows = allWords().filter((w) => (vt.filter === "all" || status(w) === vt.filter) && (!q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)));
      const opt = (v, l) => '<button class="btn ' + (vt.filter === v ? "" : "ghost") + ' small" data-vfilter="' + v + '">' + l + "</button>";
      body = '<div class="actions" style="margin-bottom:10px"><input id="vsearch" placeholder="Search words or meanings" value="' + esc(vt.search) + '" style="flex:1;min-width:200px">' +
        opt("all", "All") + opt("new", "New") + opt("learning", "Learning") + opt("mastered", "Mastered") + "</div>" +
        '<p class="muted">' + rows.length + ' words</p><div class="card md"><table><tr><th>Word</th><th>Meaning</th><th>Example</th><th>Status</th></tr>' +
        rows.map((w) => "<tr><td><b>" + esc(w.word) + '</b><div class="muted">' + esc(w.pos) + "</div></td><td>" + esc(w.meaning) + "</td><td class=\"muted\">" + esc(w.example) + '</td><td><span class="tag' + (status(w) === "mastered" ? " good" : status(w) === "new" ? " plain" : "") + '">' + status(w) + "</span></td></tr>").join("") +
        "</table></div>";
    } else {
      const items = [...data.vocab].reverse().map((v) =>
        '<div class="list-item"><b>' + esc(v.word) + "</b> — " + esc(v.meaning) + (v.sentence ? '<div class="muted">“' + esc(v.sentence) + "”</div>" : "") +
        '<div class="meta">' + esc(v.date) + (isMastered("u:" + v.id) ? ' · <span class="tag good">mastered</span>' : "") + ' <button class="btn ghost small" data-del="vocab:' + esc(v.id) + '">Delete</button></div></div>').join("");
      body = '<p class="muted">Add words you meet in your reading. They join your reviews automatically starting tomorrow.</p>' +
        '<div class="card"><form class="row" id="vocabForm">' +
          '<label class="f">Word<input name="word" required></label>' +
          '<label class="f">Meaning<input name="meaning" required></label>' +
          '<label class="f wide">Sentence where you found it<textarea name="sentence"></textarea></label>' +
          '<div><button class="btn" type="submit">Add</button></div></form></div>' +
        '<p class="muted">' + plural(data.vocab.length, "word") + "</p>" + items;
    }
    return head + body;
  }

  // ---------- formula flashcards ----------
  let fc = { queue: null, idx: 0, show: false };
  function pageFlashcards() {
    if (!fc.queue) { fc.queue = formulaQueue().sort(() => Math.random() - 0.5); fc.idx = 0; fc.show = false; }
    const cards = formulaCards();
    const m = cards.filter((c) => isMastered(c.id)).length;
    const started = cards.filter((c) => data.srs[c.id]).length;
    const c = fc.queue[fc.idx];
    const head = "<h1>Formula flashcards</h1>" +
      '<p class="muted">Formulas and grammar rules with spaced repetition. Up to ' + NEW_FORMULA_PER_DAY + " new cards a day plus whatever is due. Started " + started + " / " + cards.length + " · Mastered <b>" + m + "</b>. Add cards in content.js → flashcards.</p>";
    if (!c) return head + '<div class="card"><b>All done for today ✓</b><p class="muted">Cards come back on a schedule. Scan the <a href="#cheatsheet">Formula cheat sheet</a> in quiz mode for extra practice.</p><button class="btn ghost" id="fcAgain">Practice all cards anyway</button></div>';
    return head + '<p class="muted">' + (fc.idx + 1) + " of " + fc.queue.length + ". Keyboard: Space = flip, → = knew it, ← = didn't know.</p>" +
      '<div class="flash"><div class="flash-kind">' + (data.srs[c.id] ? "review" : "new card") + '</div><div class="flash-q">' + esc(c.q) + "</div>" +
      (fc.show
        ? '<div class="flash-a">' + esc(c.a) + '</div><div class="actions center"><button class="btn bad" data-fans="0">Didn\'t know ✗</button><button class="btn good" data-fans="1">Knew it ✓</button></div>'
        : '<div class="actions center"><button class="btn" id="fflip">Show answer (Space)</button></div>') + "</div>";
  }

  function pageErrors() {
    const items = [...data.errors].sort((a, b) => (a.date < b.date ? 1 : -1)).map((e) =>
      '<div class="list-item"><div class="meta">' + esc(e.date) + " · " + esc(e.section) + " · " + esc(e.topic) +
      ' <span class="tag">' + esc(e.type) + '</span> <span class="tag good">reviewed ' + (e.reviews || 0) + "×</span></div>" +
      "<div><b>Question:</b> " + esc(e.question) + "</div><div><b>Why I missed it:</b> " + esc(e.why) + "</div><div><b>Next time:</b> " + esc(e.fix) + "</div>" +
      '<div class="actions" style="margin-top:6px"><button class="btn ghost small" data-review="' + esc(e.id) + '">Solved it again ✓</button><button class="btn ghost small" data-del="errors:' + esc(e.id) + '">Delete</button></div></div>'
    ).join("");
    const byTopic = {}, byType = {};
    data.errors.forEach((e) => { byTopic[e.topic] = (byTopic[e.topic] || 0) + 1; byType[e.type] = (byType[e.type] || 0) + 1; });
    const weak = Object.keys(byTopic).sort((a, b) => byTopic[b] - byTopic[a]).slice(0, 6);
    const types = Object.keys(byType).sort((a, b) => byType[b] - byType[a]);
    const typeAdvice = { "Didn't know the concept": "relearn the topic page before practicing", "Calculation slip": "slow down and check every step", "Misread the question": "underline what the question actually asks", "Ran out of time": "practice timed sets" };
    return (
      "<h1>Error log</h1>" +
      (weak.length ? '<div class="card"><b>Your weak topics</b> <span class="muted">(most mistakes)</span><div style="margin-top:6px">' + weak.map((w) => '<span class="tag">' + esc(w) + " · " + byTopic[w] + "</span>").join(" ") + "</div>" +
        '<div class="muted" style="margin-top:8px">Most common mistake type: <b>' + esc(types[0]) + "</b>" + (typeAdvice[types[0]] ? " → " + typeAdvice[types[0]] : "") + "</div></div>" : "") +
      '<div class="card"><form class="row" id="errForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Section<select name="section"><option>Math</option><option>R&W</option></select></label>' +
        '<label class="f">Topic<input name="topic" list="topicList" placeholder="e.g. Similar triangles" required></label>' +
        '<label class="f">Mistake type<select name="type"><option>Didn\'t know the concept</option><option>Calculation slip</option><option>Misread the question</option><option>Ran out of time</option></select></label>' +
        '<label class="f wide">Question (short)<textarea name="question" required></textarea></label>' +
        '<label class="f wide">Why I missed it<textarea name="why"></textarea></label>' +
        '<label class="f wide">What I will do next time<textarea name="fix"></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div>' +
      "</form><datalist id=\"topicList\">" + Array.from(new Set(S.schedule.flatMap((w) => w.topics).concat((S.englishTopics || []).map((x) => x.t)))).map((x) => '<option value="' + esc(x) + '">').join("") + "</datalist></div>" +
      '<p class="muted">' + plural(data.errors.length, "mistake") + " logged. Redo each one at least twice.</p>" +
      (items || '<div class="card muted">No mistakes logged yet.</div>')
    );
  }

  function pageReads() {
    const items = [...data.reads].sort((a, b) => (a.date < b.date ? 1 : -1)).map((r) =>
      '<div class="list-item"><div class="meta">' + esc(r.date) + " · " + esc(r.type) + ' <button class="btn ghost small" data-del="reads:' + esc(r.id) + '">Delete</button></div>' +
      "<div><b>" + (r.url ? '<a target="_blank" rel="noopener" href="' + esc(r.url) + '">' + esc(r.title) + "</a>" : esc(r.title)) + "</b></div><div>" + esc(r.idea) + "</div></div>"
    ).join("");
    const rd = todayReading();
    return "<h1>Reading log</h1>" +
      '<p class="muted">After each article, write 2 lines: the main argument and the evidence used. Today\'s type: <b>' + esc(rd.type) + "</b> — " + rd.links.map((l) => '<a target="_blank" rel="noopener" href="' + esc(l[1]) + '">' + esc(l[0]) + "</a>").join(" · ") + "</p>" +
      '<div class="card"><form class="row" id="readForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Type<select name="type"><option>Science</option><option' + (rd.type === "History / Society" ? " selected" : "") + '>History / Society</option><option' + (rd.type === "Literature" ? " selected" : "") + ">Literature</option></select></label>" +
        '<label class="f">Title<input name="title" required></label>' +
        '<label class="f">Link<input name="url" type="url" placeholder="https://"></label>' +
        '<label class="f wide">Main point (2 lines)<textarea name="idea" required></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div></form></div>' +
      '<p class="muted">' + plural(data.reads.length, "article") + " read</p>" + items;
  }

  function scoreChart() {
    const c = cfg();
    const W = 640, H = 240, L = 46, R = 14, T = 14, B = 30;
    const x0 = toDate(c.startDate), x1 = toDate(c.examDate);
    const ymin = 1000, ymax = 1600;
    const X = (ds) => L + ((toDate(ds) - x0) / (x1 - x0)) * (W - L - R);
    const Y = (v) => T + (1 - (Math.max(ymin, Math.min(ymax, v)) - ymin) / (ymax - ymin)) * (H - T - B);
    let g = "";
    [1000, 1200, 1400, 1600].forEach((v) => { g += '<line class="grid-l" x1="' + L + '" y1="' + Y(v) + '" x2="' + (W - R) + '" y2="' + Y(v) + '"/><text class="ax" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + "</text>"; });
    const ms = [{ date: c.startDate, score: c.startScore }].concat(c.milestones);
    g += '<polyline class="plan-l" points="' + ms.map((m) => X(m.date) + "," + Y(m.score)).join(" ") + '"/>';
    g += '<line class="target-l" x1="' + L + '" y1="' + Y(c.target.total) + '" x2="' + (W - R) + '" y2="' + Y(c.target.total) + '"/>';
    const sc = sortedScores().filter((s) => s.date >= c.startDate && s.date <= c.examDate);
    if (sc.length) {
      g += '<polyline class="score-l" points="' + sc.map((s) => X(s.date) + "," + Y(s.total)).join(" ") + '"/>';
      sc.forEach((s) => { g += '<circle class="score-d" cx="' + X(s.date) + '" cy="' + Y(s.total) + '" r="4"><title>' + esc(s.name) + ": " + s.total + "</title></circle>"; });
    }
    g += '<text class="ax" x="' + L + '" y="' + (H - 8) + '">' + c.startDate + '</text><text class="ax" x="' + (W - R) + '" y="' + (H - 8) + '" text-anchor="end">' + c.examDate + "</text>";
    return '<svg viewBox="0 0 ' + W + " " + H + '" class="chart">' + g + "</svg>" +
      '<div class="legend"><span><i class="lg score"></i>Your score</span><span><i class="lg plan"></i>Plan (milestones)</span><span><i class="lg target"></i>Target ' + c.target.total + "</span></div>";
  }

  function pageScores() {
    const c = cfg();
    const sc = sortedScores();
    const rows = [...sc].reverse().map((s) =>
      "<tr><td>" + esc(s.date) + "</td><td>" + esc(s.name) + "</td><td>" + esc(s.math) + "</td><td>" + esc(s.rw) + "</td><td><b>" + esc(s.total) + "</b></td><td>" +
      '<button class="btn ghost small" data-del="scores:' + esc(s.id) + '">Delete</button></td></tr>').join("");
    let gap = "";
    const ls = sc[sc.length - 1];
    if (ls) {
      const gm = c.target.math - ls.math, gr = c.target.rw - ls.rw;
      gap = '<div class="card"><b>Gap to target</b><div class="grid" style="margin:8px 0 0">' +
        '<div class="stat"><div class="label">Math</div><div class="value">' + ls.math + '</div><div class="sub">' + (gm > 0 ? gm + " to go (target " + c.target.math + ")" : "target reached") + "</div></div>" +
        '<div class="stat"><div class="label">R&W</div><div class="value">' + ls.rw + '</div><div class="sub">' + (gr > 0 ? gr + " to go (target " + c.target.rw + ")" : "target reached") + "</div></div></div>" +
        '<div class="muted" style="margin-top:8px">Bigger gap: <b>' + (gm >= gr ? "Math" : "R&W") + "</b> — give it more of your daily time.</div></div>";
    }
    return "<h1>Test scores</h1>" + '<div class="card">' + scoreChart() + "</div>" + gap +
      '<div class="card"><form class="row" id="scoreForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Test<input name="name" placeholder="Bluebook Test 1" required></label>' +
        '<label class="f">Math (200–800)<input type="number" name="math" min="200" max="800" step="10" required></label>' +
        '<label class="f">R&W (200–800)<input type="number" name="rw" min="200" max="800" step="10" required></label>' +
        '<div><button class="btn" type="submit">Add</button></div></form></div>' +
      (rows ? '<div class="card md"><table><tr><th>Date</th><th>Test</th><th>Math</th><th>R&W</th><th>Total</th><th></th></tr>' + rows + "</table></div>" : '<div class="card muted">No test scores yet.</div>');
  }

  function pageTracker() {
    const days = Array.from(new Set(Object.keys(data.daily).concat(pr().map((p) => p.date)))).filter((k) => doneList(k).length || onDate(k).length).sort().reverse();
    // 8-week heatmap
    const cells = [];
    const d = new Date(); d.setDate(d.getDate() - 55);
    for (let i = 0; i < 56; i++) {
      const k = todayStr(d), m = minutesFor(k);
      const lvl = m === 0 ? 0 : m < 60 ? 1 : m < 100 ? 2 : 3;
      cells.push('<div class="hm l' + lvl + '" title="' + k + ": " + m + ' min"></div>');
      d.setDate(d.getDate() + 1);
    }
    const heat = '<div class="card"><b>Last 8 weeks</b><div class="heat">' + cells.join("") + '</div><div class="legend"><span><i class="hm l0"></i>0</span><span><i class="hm l1"></i>&lt;60 min</span><span><i class="hm l2"></i>60–99</span><span><i class="hm l3"></i>100+</span></div></div>';
    if (!days.length) return "<h1>Daily history</h1>" + heat + '<div class="card muted">No days recorded yet. Tick the Dashboard checklist and they will appear here.</div>';
    const rows = days.map((k) => { const m = sumQ(onDate(k, "Math")), r = sumQ(onDate(k, "R&W")); return "<tr><td>" + k + "</td><td>" + doneList(k).length + " / " + tasks().length + "</td><td>" + m.n + " (" + pct(m.c, m.n) + "%)</td><td>" + r.n + " (" + pct(r.c, r.n) + "%)</td><td>" + minutesFor(k) + " min</td><td>" + (dayDone(k) ? '<span class="tag good">Done</span>' : "") + "</td></tr>"; }).join("");
    const pd = planDays();
    const missed = pd.missed.length ? '<div class="card"><b>Missed days (' + pd.missed.length + ')</b><div class="muted" style="margin-top:6px">' + pd.missed.join(" · ") + "</div></div>" : "";
    return "<h1>Daily history</h1>" + heat + missed + '<div class="card md"><table><tr><th>Date</th><th>Checklist</th><th>Math q</th><th>R&W q</th><th>Time</th><th></th></tr>' + rows + "</table></div>";
  }

  function pageSettings() {
    const c = cfg();
    const taskText = tasks().map((t) => t.minutes + " | " + t.label).join("\n");
    return "<h1>Settings</h1>" +
      '<p class="muted">Changes are saved in this browser and override the defaults in content.js.</p>' +
      '<div class="card"><form class="row" id="settingsForm">' +
        '<label class="f">Your name<input name="name" value="' + esc(c.name) + '"></label>' +
        '<label class="f">Test date<input type="date" name="examDate" value="' + esc(c.examDate) + '"></label>' +
        '<label class="f">Starting score<input type="number" name="startScore" value="' + c.startScore + '"></label>' +
        '<label class="f">Target total<input type="number" name="targetTotal" value="' + c.target.total + '"></label>' +
        '<label class="f">Target Math<input type="number" name="targetMath" value="' + c.target.math + '"></label>' +
        '<label class="f">Target R&W<input type="number" name="targetRw" value="' + c.target.rw + '"></label>' +
        '<label class="f">New words per day<input type="number" min="1" max="40" name="newWordsPerDay" value="' + c.newWordsPerDay + '"></label>' +
        '<label class="f">Math questions per day<input type="number" min="1" max="100" name="dailyMathQ" value="' + c.dailyMathQ + '"></label>' +
        '<label class="f">R&W questions per day<input type="number" min="1" max="100" name="dailyRwQ" value="' + c.dailyRwQ + '"></label>' +
        '<label class="f wide">Daily checklist — one task per line as "minutes | task"<textarea name="tasks" rows="8">' + esc(taskText) + "</textarea></label>" +
        '<div class="actions"><button class="btn" type="submit">Save</button><button class="btn ghost" type="button" id="resetSettings">Reset to defaults</button></div>' +
      '</form><p class="muted" id="settingsMsg"></p></div>';
  }

  function pageBackup() {
    return "<h1>Backup / restore</h1>" +
      '<div class="card"><p>Everything you enter (practice log, checklist, plan ticks, words, flashcard progress, error log, reading log, scores, settings) is saved only in <b>this browser</b>. Download a backup every week, and import it to move to another device.</p>' +
      '<div class="actions"><button class="btn" id="exportBtn">Download backup</button>' +
      '<label class="btn ghost">Import backup<input type="file" id="importFile" accept=".json" style="display:none"></label></div>' +
      '<p class="muted" id="backupMsg"></p></div>';
  }

  // ---------- quiz mode for cheat sheet ----------
  let quizMode = false;
  function addQuizToggle() {
    if (!document.querySelector("#main .vgrid")) return;
    const h = document.querySelector("#main h1");
    if (!h) return;
    const bar = document.createElement("div");
    bar.className = "actions";
    bar.style.marginBottom = "12px";
    bar.innerHTML = '<button class="btn ' + (quizMode ? "" : "ghost") + ' small" id="quizToggle">' + (quizMode ? "Quiz mode: ON — click a card to reveal" : "Quiz mode: hide formulas") + "</button>";
    h.after(bar);
    document.querySelector("#main").classList.toggle("quiz", quizMode);
  }

  // ---------- router ----------
  function render() {
    const id = (location.hash || "#dashboard").slice(1);
    const sec = S.sections.find((s) => s.id === id);
    renderHeader();
    renderNav(id);
    const pages = { studyplan: pageStudyPlan, readiness: pageReadiness, practice: pagePractice, mastery: pageMastery, vocab: pageVocab, flashcards: pageFlashcards, errors: pageErrors, reads: pageReads, scores: pageScores, tracker: pageTracker, settings: pageSettings, backup: pageBackup };
    $("#main").classList.remove("quiz");
    $("#main").innerHTML = sec ? md(sec.md) : (pages[id] || pageDashboard)();
    document.querySelectorAll('#main a[href^="http"]').forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    if (sec) addQuizToggle();
    bind();
  }
  function rerender() { const y = window.scrollY; render(); window.scrollTo(0, y); }

  function addFrom(form, list, build) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      data[list].push(Object.assign({ id: uid() }, build(new FormData(form))));
      save(); rerender();
    });
  }
  const on = (sel, ev, fn) => document.querySelectorAll(sel).forEach((el) => el.addEventListener(ev, () => fn(el)));

  function bind() {
    on("[data-task]", "change", (cb) => {
      const t = todayStr();
      const d = data.daily[t] || (data.daily[t] = { done: [] });
      d.done = cb.checked ? Array.from(new Set(d.done.concat(cb.dataset.task))) : d.done.filter((x) => x !== cb.dataset.task);
      save(); rerender();
    });
    on("[data-topic]", "change", (cb) => { if (cb.checked) data.topics[cb.dataset.topic] = todayStr(); else delete data.topics[cb.dataset.topic]; save(); rerender(); });

    const ef = $("#errForm");
    if (ef) addFrom(ef, "errors", (f) => ({ date: f.get("date"), section: f.get("section"), topic: f.get("topic"), type: f.get("type"), question: f.get("question"), why: f.get("why"), fix: f.get("fix"), reviews: 0 }));
    const sf = $("#scoreForm");
    if (sf) addFrom(sf, "scores", (f) => { const m = Number(f.get("math")), r = Number(f.get("rw")); return { date: f.get("date"), name: f.get("name"), math: m, rw: r, total: m + r }; });
    const vf = $("#vocabForm");
    if (vf) vf.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(vf), id = uid();
      data.vocab.push({ id, date: todayStr(), word: f.get("word"), meaning: f.get("meaning"), sentence: f.get("sentence") });
      data.srs["u:" + id] = { lvl: 0, due: addDays(todayStr(), 1), last: todayStr() };
      save(); rerender();
    });
    ["quickPractice", "practiceForm"].forEach((fid) => {
      const pf = $("#" + fid);
      if (!pf) return;
      pf.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = new FormData(pf);
        const n = Number(f.get("n")), cr = Number(f.get("correct"));
        const err = $("#" + fid + "Err");
        if (!(n > 0)) { err.textContent = "Enter how many questions you did."; return; }
        if (cr > n) { err.textContent = "Correct cannot be more than the number of questions."; return; }
        const topic = f.get("topic");
        const tp = topicList().find((x) => x.name === topic);
        const section = tp ? tp.section : /R&W/.test(topic) ? "R&W" : "Math";
        data.practice.push({ id: uid(), date: f.get("date") || todayStr(), section, topic, diff: f.get("diff"), n, correct: cr, minutes: Number(f.get("minutes") || 0), und: Number(f.get("und")), source: f.get("source") || "Question Bank", note: f.get("note") || "" });
        save(); rerender();
      });
      pf.addEventListener("input", () => { const err = $("#" + fid + "Err"); if (err) err.textContent = ""; });
    });
    const rf = $("#readForm");
    if (rf) addFrom(rf, "reads", (f) => ({ date: f.get("date"), type: f.get("type"), title: f.get("title"), url: f.get("url"), idea: f.get("idea") }));

    on("[data-del]", "click", (b) => {
      if (!b.dataset.armed) { b.dataset.armed = "1"; b.textContent = "Sure? Click again"; setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.textContent = "Delete"; } }, 3000); return; }
      const [list, id] = b.dataset.del.split(":");
      data[list] = data[list].filter((x) => x.id !== id);
      if (list === "vocab") delete data.srs["u:" + id];
      save(); rerender();
    });
    on("[data-review]", "click", (b) => { const e = data.errors.find((x) => x.id === b.dataset.review); if (e) { e.reviews = (e.reviews || 0) + 1; e.lastReview = todayStr(); save(); rerender(); } });

    // vocab
    on("[data-vtab]", "click", (b) => { vt.tab = b.dataset.vtab; vt.queue = null; rerender(); });
    on("[data-learn]", "click", (b) => { learnWord(b.dataset.learn, false); save(); rerender(); });
    on("[data-known]", "click", (b) => { learnWord(b.dataset.known, true); save(); rerender(); });
    const la = $("#learnAll");
    if (la) la.addEventListener("click", () => { todaysNewWords().forEach((w) => learnWord(w.id, false)); save(); rerender(); });
    const xw = $("#extraWords");
    if (xw) xw.addEventListener("click", () => { WORDS.filter((w) => !data.srs[w.id]).slice(0, 5).forEach((w) => { data.srs[w.id] = { lvl: 0, due: addDays(todayStr(), 1), last: todayStr() }; data.intro[w.id] = todayStr(); }); save(); vt.tab = "list"; vt.filter = "learning"; rerender(); });
    const vfl = $("#vflip");
    if (vfl) vfl.addEventListener("click", () => { vt.show = true; rerender(); });
    on("[data-vans]", "click", (b) => vAnswer(b.dataset.vans === "1"));
    on("[data-vfilter]", "click", (b) => { vt.filter = b.dataset.vfilter; rerender(); });
    const vs = $("#vsearch");
    if (vs) vs.addEventListener("input", () => { vt.search = vs.value; const pos = vs.selectionStart; rerender(); const n = $("#vsearch"); n.focus(); n.setSelectionRange(pos, pos); });

    // formula flashcards
    const ffl = $("#fflip");
    if (ffl) ffl.addEventListener("click", () => { fc.show = true; rerender(); });
    on("[data-fans]", "click", (b) => fAnswer(b.dataset.fans === "1"));
    const fa = $("#fcAgain");
    if (fa) fa.addEventListener("click", () => { fc.queue = formulaCards().sort(() => Math.random() - 0.5); fc.idx = 0; fc.show = false; fc.free = true; rerender(); });

    // quiz mode
    const qt = $("#quizToggle");
    if (qt) qt.addEventListener("click", () => { quizMode = !quizMode; rerender(); });
    on("[data-vcard]", "click", (c) => { if (quizMode) c.classList.toggle("reveal"); });

    // settings
    const stf = $("#settingsForm");
    if (stf) stf.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(stf);
      const tl = String(f.get("tasks") || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l, i) => {
        const m = l.match(/^(\d+)\s*\|\s*(.+)$/);
        const label = m ? m[2] : l;
        const prev = tasks().find((x) => x.label === label) || S.dailyTasks.find((x) => x.label === label);
        return { id: prev ? prev.id : "t" + i + "_" + label.slice(0, 12).replace(/\W/g, ""), minutes: m ? Number(m[1]) : 10, label };
      });
      data.settings = { name: f.get("name"), examDate: f.get("examDate"), startScore: f.get("startScore"), targetTotal: f.get("targetTotal"), targetMath: f.get("targetMath"), targetRw: f.get("targetRw"), newWordsPerDay: f.get("newWordsPerDay"), dailyMathQ: f.get("dailyMathQ"), dailyRwQ: f.get("dailyRwQ"), tasks: tl };
      save(); rerender(); $("#settingsMsg").textContent = "Saved.";
    });
    const rs = $("#resetSettings");
    if (rs) rs.addEventListener("click", () => { data.settings = {}; save(); rerender(); $("#settingsMsg").textContent = "Reset to defaults."; });

    // backup
    const ex = $("#exportBtn");
    if (ex) ex.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "sat-hub-backup-" + todayStr() + ".json";
      a.click();
    });
    const im = $("#importFile");
    if (im) im.addEventListener("change", () => {
      const file = im.files[0];
      if (!file) return;
      const rd = new FileReader();
      rd.onload = () => {
        try { data = normalize(JSON.parse(rd.result)); save(); render(); $("#backupMsg").textContent = "Backup imported."; }
        catch (err) { $("#backupMsg").textContent = "That file is not a valid backup."; }
      };
      rd.readAsText(file);
    });
  }

  function vAnswer(knew) {
    const w = vt.queue && vt.queue[vt.idx];
    if (!w) return;
    srsAnswer(w.id, knew);
    save(); vt.idx++; vt.show = false; rerender();
  }
  function fAnswer(knew) {
    const c = fc.queue && fc.queue[fc.idx];
    if (!c) return;
    if (!data.srs[c.id]) data.intro[c.id] = todayStr();
    if (!fc.free || !knew || !data.srs[c.id]) srsAnswer(c.id, knew);
    save(); fc.idx++; fc.show = false; rerender();
  }

  document.addEventListener("keydown", (e) => {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    const h = location.hash;
    if (h === "#vocab" && vt.tab === "review" && vt.queue && vt.queue[vt.idx]) {
      if (e.code === "Space") { e.preventDefault(); if (!vt.show) { vt.show = true; rerender(); } }
      else if (vt.show && e.key === "ArrowRight") vAnswer(true);
      else if (vt.show && e.key === "ArrowLeft") vAnswer(false);
    } else if (h === "#flashcards" && fc.queue && fc.queue[fc.idx]) {
      if (e.code === "Space") { e.preventDefault(); if (!fc.show) { fc.show = true; rerender(); } }
      else if (fc.show && e.key === "ArrowRight") fAnswer(true);
      else if (fc.show && e.key === "ArrowLeft") fAnswer(false);
    }
  });

  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#sidebar").addEventListener("click", (e) => { if (e.target.closest(".nav-link")) $("#sidebar").classList.remove("open"); });
  window.addEventListener("hashchange", () => { vt.queue = null; fc.queue = null; fc.free = false; render(); window.scrollTo(0, 0); });
  render();
})();
