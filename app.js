(function () {
  const S = window.SAT;
  const VIS = window.SAT_VIS || {};
  const KEY = "satHub_v1";

  // ---------- storage ----------
  function blank() { return { daily: {}, errors: [], scores: [], vocab: [], reads: [], cards: {} }; }
  function normalize(d) {
    const b = blank();
    Object.keys(b).forEach((k) => { if (d && d[k]) b[k] = d[k]; });
    return b;
  }
  function load() {
    try { return normalize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return blank(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  let data = load();

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
  const daysLeft = () => dayDiff(todayStr(), S.config.examDate);
  const pageTitle = (id) => { const p = allPages().find((x) => x.id === id); return p ? p.title : id; };

  function visCard(id) {
    const v = VIS[id];
    if (!v) return "";
    return '<div class="vcard"><div class="vtitle">' + esc(v.title) + '</div><svg viewBox="0 0 240 160" class="vis">' + v.svg.replace(/\n/g, "") +
      '</svg><div class="vf">' + v.f + '</div><div class="vtip">' + esc(v.tip) + "</div></div>";
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

  function currentWeek() {
    const t = todayStr();
    return S.schedule.find((s) => t >= s.from && t <= s.to);
  }
  function todayTopic() {
    const w = currentWeek();
    if (!w) return null;
    const i = Math.max(0, dayDiff(w.from, todayStr()));
    return { week: w, topic: w.topics[i % w.topics.length], day: i + 1 };
  }
  function todayEnglish() {
    const list = S.englishTopics || [];
    if (!list.length) return null;
    const i = Math.max(0, dayDiff(S.config.startDate, todayStr()));
    return list[i % list.length];
  }
  function dayDone(dateStr) {
    const d = data.daily[dateStr];
    return d && d.done && d.done.length >= S.dailyTasks.length;
  }
  function streak() {
    let n = 0;
    const d = new Date();
    if (!dayDone(todayStr(d))) d.setDate(d.getDate() - 1);
    while (dayDone(todayStr(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function minutesFor(dateStr) {
    const d = data.daily[dateStr];
    if (!d || !d.done) return 0;
    return S.dailyTasks.filter((t) => d.done.includes(t.id)).reduce((a, t) => a + t.minutes, 0);
  }
  function weekMinutes() {
    let total = 0;
    const d = new Date();
    for (let i = 0; i < 7; i++) { total += minutesFor(todayStr(d)); d.setDate(d.getDate() - 1); }
    return total;
  }
  const sortedScores = () => [...data.scores].sort((a, b) => (a.date < b.date ? -1 : 1));
  function latestScore() { const s = sortedScores(); return s.length ? s[s.length - 1] : null; }
  function expectedAt(dateStr) {
    const pts = [{ date: S.config.startDate, score: S.config.startScore }].concat(S.config.milestones || []);
    if (dateStr <= pts[0].date) return pts[0].score;
    for (let i = 1; i < pts.length; i++) {
      if (dateStr <= pts[i].date) {
        const span = dayDiff(pts[i - 1].date, pts[i].date) || 1;
        const f = dayDiff(pts[i - 1].date, dateStr) / span;
        return Math.round(pts[i - 1].score + f * (pts[i].score - pts[i - 1].score));
      }
    }
    return pts[pts.length - 1].score;
  }

  // ---------- flashcards ----------
  function deck(filter) {
    const base = (S.flashcards || []).map((c, i) => ({ id: "f" + i, q: c.q, a: c.a, kind: "formula" }));
    const voc = data.vocab.map((v) => ({ id: "v" + v.id, q: v.word, a: v.meaning + (v.sentence ? " — “" + v.sentence + "”" : ""), kind: "vocab" }));
    if (filter === "formula") return base;
    if (filter === "vocab") return voc;
    return base.concat(voc);
  }
  const cardScore = (id) => { const s = data.cards[id] || { k: 0, u: 0 }; return s.k - s.u * 2; };
  const mastered = (id) => { const s = data.cards[id]; return s && s.k >= 3 && s.k > s.u; };
  let fc = { filter: "all", card: null, show: false };
  function nextCard() {
    const d = deck(fc.filter);
    if (!d.length) { fc.card = null; return; }
    const sorted = d.slice().sort((a, b) => cardScore(a.id) - cardScore(b.id));
    const pool = sorted.slice(0, Math.min(8, sorted.length)).filter((c) => !fc.card || c.id !== fc.card.id);
    fc.card = (pool.length ? pool : sorted)[Math.floor(Math.random() * (pool.length || sorted.length))];
    fc.show = false;
  }

  // ---------- header ----------
  function renderHeader() {
    $("#targetPill").textContent = "Target " + S.config.target.total + "+";
    const d = daysLeft();
    $("#countdown").innerHTML = d >= 0 ? "Exam-er baki <b>" + d + "</b> din" : "Exam shesh";
  }

  // ---------- nav ----------
  const homePage = { id: "dashboard", group: "Home", title: "Dashboard" };
  const trackerPages = [
    { id: "flashcards", group: "Practice", title: "Flashcards" },
    { id: "errors", group: "Practice", title: "Error log" },
    { id: "vocab", group: "Practice", title: "Vocabulary" },
    { id: "reads", group: "Practice", title: "Reading log" },
    { id: "scores", group: "Tracker", title: "Test scores" },
    { id: "tracker", group: "Tracker", title: "Daily history" },
    { id: "backup", group: "Tracker", title: "Backup / restore" }
  ];
  const allPages = () => [homePage].concat(S.sections).concat(trackerPages);
  function renderNav(active) {
    let html = "", last = "";
    allPages().forEach((p) => {
      if (p.group !== last) { html += '<div class="nav-group">' + esc(p.group) + "</div>"; last = p.group; }
      html += '<a class="nav-link' + (p.id === active ? " active" : "") + '" href="#' + esc(p.id) + '">' + esc(p.title) + "</a>";
    });
    $("#sidebar").innerHTML = html;
  }

  // ---------- pages ----------
  function pageDashboard() {
    const t = todayStr();
    const done = (data.daily[t] && data.daily[t].done) || [];
    const ls = latestScore();
    const cur = ls ? ls.total : S.config.startScore;
    const pct = Math.max(0, Math.min(100, ((cur - S.config.startScore) / (S.config.target.total - S.config.startScore)) * 100));
    const totalMin = S.dailyTasks.reduce((a, x) => a + x.minutes, 0);
    const tt = todayTopic();
    const en = todayEnglish();
    const expNow = expectedAt(t);

    let status;
    if (ls) {
      const diff = ls.total - expectedAt(ls.date);
      status = diff >= 0
        ? '<span class="tag good">Track-e acho</span> ' + esc(ls.date) + " e target chilo ~" + expectedAt(ls.date) + ", peyecho " + ls.total
        : '<span class="tag">' + Math.abs(diff) + " point pichone</span> " + esc(ls.date) + " e target chilo ~" + expectedAt(ls.date) + ". Weak topic-e beshi somoy dao.";
    } else {
      status = '<span class="tag">Test nei</span> Ekta Bluebook test diye score add koro, tahole track-e acho kina dekhabe.';
    }

    const tasks = S.dailyTasks.map((x) =>
      '<label class="task' + (done.includes(x.id) ? " done" : "") + '"><input type="checkbox" data-task="' + esc(x.id) + '"' +
      (done.includes(x.id) ? " checked" : "") + "><span>" + esc(x.label) + '</span><span class="min">' + x.minutes + " min</span></label>"
    ).join("");

    const review = data.errors.slice().sort((a, b) => (a.reviews || 0) - (b.reviews || 0) || (a.date < b.date ? -1 : 1)).slice(0, 2);
    const reviewHtml = review.length
      ? review.map((e) => '<div class="list-item"><div class="meta">' + esc(e.section) + " · " + esc(e.topic) + " · review " + (e.reviews || 0) + " bar</div><div>" + esc(e.question) +
        '</div><div class="muted">Porer bar: ' + esc(e.fix || "—") + '</div><button class="btn ghost small" data-review="' + esc(e.id) + '">Abar solve korechi ✓</button></div>').join("")
      : '<div class="muted">Error log khali. Bhul hole add koro — eta-i score barar sobcheye druto rasta.</div>';

    const quick = (S.quickLinks || []).map((l) => '<a class="btn ghost" target="_blank" rel="noopener" href="' + esc(l.url) + '">' + esc(l.label) + " ↗</a>").join("");

    return (
      "<h1>Assalamu alaikum, " + esc(S.config.name) + "</h1>" +
      '<div class="today">' +
        '<div class="today-box"><div class="today-label">Aj-er Math topic' + (tt ? " · Day " + tt.day : "") + "</div>" +
          (tt ? '<div class="today-topic">' + esc(tt.topic) + '</div><a href="#' + esc(tt.week.page) + '">' + esc(pageTitle(tt.week.page)) + " page kholo →</a>" : '<div class="today-topic">Schedule nei — content.js e update koro</div>') + "</div>" +
        '<div class="today-box"><div class="today-label">Aj-er English topic</div>' +
          (en ? '<div class="today-topic">' + esc(en.t) + '</div><a href="#' + esc(en.page) + '">' + esc(pageTitle(en.page)) + " page kholo →</a>" : "") + "</div>" +
      "</div>" +
      '<div class="actions" style="margin-bottom:16px">' + quick + '<a class="btn" href="#flashcards">Flashcards ▶</a></div>' +
      '<div class="grid">' +
        '<div class="stat"><div class="label">Exam-er baki</div><div class="value">' + Math.max(0, daysLeft()) + ' din</div><div class="sub">' + esc(S.config.examDate) + "</div></div>" +
        '<div class="stat"><div class="label">Latest score</div><div class="value">' + cur + '</div><div class="sub">' + (ls ? "Math " + esc(ls.math) + " · R&W " + esc(ls.rw) : "Start score") + "</div></div>" +
        '<div class="stat"><div class="label">Streak</div><div class="value">' + streak() + ' din</div><div class="sub">puro checklist shesh</div></div>' +
        '<div class="stat"><div class="label">Ei 7 din</div><div class="value">' + (weekMinutes() / 60).toFixed(1) + ' h</div><div class="sub">target ' + ((totalMin * 7) / 60).toFixed(0) + " h</div></div>" +
      "</div>" +
      '<div class="card"><b>Aj-er checklist</b> <span class="muted">(' + t + " · " + minutesFor(t) + " / " + totalMin + " min)</span>" + tasks + "</div>" +
      '<div class="card"><b>Target-er dike progress</b> <span class="muted">(' + S.config.startScore + " → " + S.config.target.total + ")</span>" +
        '<div class="bar" style="margin-top:8px"><div style="width:' + pct.toFixed(0) + '%"></div></div>' +
        '<div class="muted" style="margin-top:6px">' + Math.max(0, S.config.target.total - cur) + " point baki · Aj-er hisebe thaka uchit ~" + expNow + "</div>" +
        '<div style="margin-top:8px">' + status + "</div></div>" +
      '<div class="card"><b>Aj abar solve koro (error log theke)</b>' + reviewHtml + "</div>"
    );
  }

  function pageFlashcards() {
    if (!fc.card || !deck(fc.filter).some((c) => c.id === fc.card.id)) nextCard();
    const d = deck(fc.filter);
    const m = d.filter((c) => mastered(c.id)).length;
    const opt = (v, l) => '<button class="btn ' + (fc.filter === v ? "" : "ghost") + ' small" data-filter="' + v + '">' + l + "</button>";
    let body;
    if (!fc.card) body = '<div class="card muted">Ei bhag-e kono card nei. Vocabulary page-e shobdo add koro.</div>';
    else {
      const s = data.cards[fc.card.id] || { k: 0, u: 0 };
      body = '<div class="flash"><div class="flash-kind">' + (fc.card.kind === "vocab" ? "Vocabulary" : "Formula / Rule") + " · ✓" + s.k + " ✗" + s.u + "</div>" +
        '<div class="flash-q">' + esc(fc.card.q) + "</div>" +
        (fc.show
          ? '<div class="flash-a">' + esc(fc.card.a) + '</div><div class="actions center"><button class="btn bad" data-ans="u">Jani na ✗</button><button class="btn good" data-ans="k">Jani ✓</button></div>'
          : '<div class="actions center"><button class="btn" id="showAns">Uttor dekho (Space)</button></div>') +
        "</div>";
    }
    return "<h1>Flashcards</h1>" +
      '<p class="muted">Agey mone mone uttor bolo, tarpor milao. Ja paro na, segulo beshi bar ashbe. Mastered: <b>' + m + " / " + d.length + "</b></p>" +
      '<div class="actions" style="margin-bottom:12px">' + opt("all", "Shob") + opt("formula", "Formula & rule") + opt("vocab", "Vocabulary") + "</div>" + body;
  }

  function pageErrors() {
    const items = [...data.errors].sort((a, b) => (a.date < b.date ? 1 : -1)).map((e) =>
      '<div class="list-item"><div class="meta">' + esc(e.date) + " · " + esc(e.section) + " · " + esc(e.topic) +
      ' <span class="tag">' + esc(e.type) + '</span> <span class="tag good">review ' + (e.reviews || 0) + "</span></div>" +
      "<div><b>Proshno:</b> " + esc(e.question) + "</div><div><b>Keno bhul:</b> " + esc(e.why) + "</div><div><b>Porer bar:</b> " + esc(e.fix) + "</div>" +
      '<div class="actions" style="margin-top:6px"><button class="btn ghost small" data-review="' + esc(e.id) + '">Abar solve korechi ✓</button><button class="btn ghost small" data-del="errors:' + esc(e.id) + '">Delete</button></div></div>'
    ).join("");
    const byTopic = {};
    data.errors.forEach((e) => { byTopic[e.topic] = (byTopic[e.topic] || 0) + 1; });
    const weak = Object.keys(byTopic).sort((a, b) => byTopic[b] - byTopic[a]).slice(0, 5);
    return (
      "<h1>Error log</h1>" +
      (weak.length ? '<div class="card"><b>Tomar weak topic</b> <span class="muted">(shobcheye beshi bhul)</span><div style="margin-top:6px">' + weak.map((w) => '<span class="tag">' + esc(w) + " · " + byTopic[w] + "</span>").join(" ") + "</div></div>" : "") +
      '<div class="card"><form class="row" id="errForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Section<select name="section"><option>Math</option><option>R&W</option></select></label>' +
        '<label class="f">Topic<input name="topic" placeholder="e.g. Similar triangles" required></label>' +
        '<label class="f">Bhul-er dhoron<select name="type"><option>Concept jana chilo na</option><option>Calculation bhul</option><option>Proshno bhul bujhechi</option><option>Somoy shesh</option></select></label>' +
        '<label class="f wide">Proshno (chhoto kore)<textarea name="question" required></textarea></label>' +
        '<label class="f wide">Keno bhul holo<textarea name="why"></textarea></label>' +
        '<label class="f wide">Porer bar ki korbo<textarea name="fix"></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div>' +
      "</form></div>" +
      '<p class="muted">Mot ' + data.errors.length + " ta bhul. Prottek bhul kom kore 2 bar abar solve koro.</p>" +
      (items || '<div class="card muted">Ekhono kono bhul add kora hoyni.</div>')
    );
  }

  function pageVocab() {
    const items = [...data.vocab].reverse().map((v) =>
      '<div class="list-item"><b>' + esc(v.word) + "</b> — " + esc(v.meaning) + (v.sentence ? '<div class="muted">“' + esc(v.sentence) + "”</div>" : "") +
      '<div class="meta">' + esc(v.date) + (mastered("v" + v.id) ? ' · <span class="tag good">mastered</span>' : "") + ' <button class="btn ghost small" data-del="vocab:' + esc(v.id) + '">Delete</button></div></div>'
    ).join("");
    return "<h1>Vocabulary</h1>" +
      '<p class="muted">Din-e 5 ta notun shobdo. Je bakko-e peyecho seta-o likho. Shob shobdo Flashcards-e chole jabe.</p>' +
      '<div class="card"><form class="row" id="vocabForm">' +
        '<label class="f">Shobdo<input name="word" required></label>' +
        '<label class="f">Mane<input name="meaning" required></label>' +
        '<label class="f wide">Bakko (je article-e peyecho)<textarea name="sentence"></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div></form></div>' +
      '<p class="muted">Mot ' + data.vocab.length + " ta shobdo</p>" + (items || "");
  }

  function pageReads() {
    const items = [...data.reads].sort((a, b) => (a.date < b.date ? 1 : -1)).map((r) =>
      '<div class="list-item"><div class="meta">' + esc(r.date) + " · " + esc(r.type) + ' <button class="btn ghost small" data-del="reads:' + esc(r.id) + '">Delete</button></div>' +
      "<div><b>" + (r.url ? '<a target="_blank" rel="noopener" href="' + esc(r.url) + '">' + esc(r.title) + "</a>" : esc(r.title)) + "</b></div>" +
      "<div>" + esc(r.idea) + "</div></div>"
    ).join("");
    return "<h1>Reading log</h1>" +
      '<p class="muted">Prottek article shesh kore 2 line-e likho: mul argument ki + ki proman diyechen. Reading link gulo <a href="#resources">Resources</a> page-e.</p>' +
      '<div class="card"><form class="row" id="readForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Dhoron<select name="type"><option>Science</option><option>History / Social science</option><option>Literature</option></select></label>' +
        '<label class="f">Title<input name="title" required></label>' +
        '<label class="f">Link<input name="url" type="url" placeholder="https://"></label>' +
        '<label class="f wide">Mul kotha (2 line)<textarea name="idea" required></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div></form></div>' +
      '<p class="muted">Mot ' + data.reads.length + " ta article</p>" + (items || "");
  }

  function scoreChart() {
    const W = 640, H = 240, L = 46, R = 14, T = 14, B = 30;
    const x0 = toDate(S.config.startDate), x1 = toDate(S.config.examDate);
    const ymin = 1000, ymax = 1600;
    const X = (ds) => L + ((toDate(ds) - x0) / (x1 - x0)) * (W - L - R);
    const Y = (v) => T + (1 - (v - ymin) / (ymax - ymin)) * (H - T - B);
    let g = "";
    [1000, 1200, 1400, 1600].forEach((v) => {
      g += '<line class="grid-l" x1="' + L + '" y1="' + Y(v) + '" x2="' + (W - R) + '" y2="' + Y(v) + '"/><text class="ax" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + "</text>";
    });
    const ms = [{ date: S.config.startDate, score: S.config.startScore }].concat(S.config.milestones || []);
    g += '<polyline class="plan-l" points="' + ms.map((m) => X(m.date) + "," + Y(m.score)).join(" ") + '"/>';
    g += '<line class="target-l" x1="' + L + '" y1="' + Y(S.config.target.total) + '" x2="' + (W - R) + '" y2="' + Y(S.config.target.total) + '"/>';
    const sc = sortedScores().filter((s) => s.date >= S.config.startDate && s.date <= S.config.examDate);
    if (sc.length) {
      g += '<polyline class="score-l" points="' + sc.map((s) => X(s.date) + "," + Y(Math.max(ymin, Math.min(ymax, s.total)))).join(" ") + '"/>';
      sc.forEach((s) => { g += '<circle class="score-d" cx="' + X(s.date) + '" cy="' + Y(Math.max(ymin, Math.min(ymax, s.total))) + '" r="4"/>'; });
    }
    g += '<text class="ax" x="' + L + '" y="' + (H - 8) + '">' + S.config.startDate + '</text><text class="ax" x="' + (W - R) + '" y="' + (H - 8) + '" text-anchor="end">' + S.config.examDate + "</text>";
    return '<svg viewBox="0 0 ' + W + " " + H + '" class="chart">' + g + "</svg>" +
      '<div class="legend"><span><i class="lg score"></i>Tomar score</span><span><i class="lg plan"></i>Plan (milestone)</span><span><i class="lg target"></i>Target ' + S.config.target.total + "</span></div>";
  }

  function pageScores() {
    const rows = [...data.scores].sort((a, b) => (a.date < b.date ? 1 : -1)).map((s) =>
      "<tr><td>" + esc(s.date) + "</td><td>" + esc(s.name) + "</td><td>" + esc(s.math) + "</td><td>" + esc(s.rw) + "</td><td><b>" + esc(s.total) + "</b></td><td>" +
      '<button class="btn ghost small" data-del="scores:' + esc(s.id) + '">Delete</button></td></tr>'
    ).join("");
    return (
      "<h1>Test scores</h1>" +
      '<div class="card">' + scoreChart() + "</div>" +
      '<div class="card"><form class="row" id="scoreForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Test<input name="name" placeholder="Bluebook Test 1" required></label>' +
        '<label class="f">Math (200–800)<input type="number" name="math" min="200" max="800" step="10" required></label>' +
        '<label class="f">R&W (200–800)<input type="number" name="rw" min="200" max="800" step="10" required></label>' +
        '<div><button class="btn" type="submit">Add</button></div>' +
      "</form></div>" +
      (rows ? '<div class="card md"><table><tr><th>Date</th><th>Test</th><th>Math</th><th>R&W</th><th>Total</th><th></th></tr>' + rows + "</table></div>" : '<div class="card muted">Ekhono kono test score nei.</div>')
    );
  }

  function pageTracker() {
    const days = Object.keys(data.daily).filter((k) => data.daily[k].done && data.daily[k].done.length).sort().reverse();
    if (!days.length) return '<h1>Daily history</h1><div class="card muted">Ekhono kono din record hoyni. Dashboard-er checklist tick korle ekhane ashbe.</div>';
    const rows = days.map((k) =>
      "<tr><td>" + k + "</td><td>" + data.daily[k].done.length + " / " + S.dailyTasks.length + "</td><td>" + minutesFor(k) + " min</td><td>" + (dayDone(k) ? '<span class="tag good">Done</span>' : "") + "</td></tr>"
    ).join("");
    return '<h1>Daily history</h1><div class="card md"><table><tr><th>Date</th><th>Task</th><th>Somoy</th><th></th></tr>' + rows + "</table></div>";
  }

  function pageBackup() {
    return "<h1>Backup / restore</h1>" +
      '<div class="card"><p>Checklist, error log, vocabulary, reading log, flashcard progress ar score shudhu <b>ei browser-e</b> save hoy. Prottek shoptahe ekbar backup download koro. Onno device-e niye jete import koro.</p>' +
      '<div class="actions"><button class="btn" id="exportBtn">Backup download</button>' +
      '<label class="btn ghost">Backup import<input type="file" id="importFile" accept=".json" style="display:none"></label></div>' +
      '<p class="muted" id="backupMsg"></p></div>';
  }

  // ---------- router ----------
  function render() {
    const id = (location.hash || "#dashboard").slice(1);
    const sec = S.sections.find((s) => s.id === id);
    renderNav(id);
    const pages = { flashcards: pageFlashcards, errors: pageErrors, vocab: pageVocab, reads: pageReads, scores: pageScores, tracker: pageTracker, backup: pageBackup };
    $("#main").innerHTML = sec ? md(sec.md) : (pages[id] || pageDashboard)();
    document.querySelectorAll('#main a[href^="http"]').forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    bind();
  }
  function rerender() { const y = window.scrollY; render(); window.scrollTo(0, y); }

  function addFrom(form, list, build) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      data[list].push(Object.assign({ id: uid() }, build(f)));
      save(); rerender();
    });
  }

  function bind() {
    document.querySelectorAll("[data-task]").forEach((cb) =>
      cb.addEventListener("change", () => {
        const t = todayStr();
        const d = data.daily[t] || (data.daily[t] = { done: [] });
        d.done = cb.checked ? Array.from(new Set(d.done.concat(cb.dataset.task))) : d.done.filter((x) => x !== cb.dataset.task);
        save(); rerender();
      })
    );
    const ef = $("#errForm");
    if (ef) addFrom(ef, "errors", (f) => ({ date: f.get("date"), section: f.get("section"), topic: f.get("topic"), type: f.get("type"), question: f.get("question"), why: f.get("why"), fix: f.get("fix"), reviews: 0 }));
    const sf = $("#scoreForm");
    if (sf) addFrom(sf, "scores", (f) => { const m = Number(f.get("math")), r = Number(f.get("rw")); return { date: f.get("date"), name: f.get("name"), math: m, rw: r, total: m + r }; });
    const vf = $("#vocabForm");
    if (vf) addFrom(vf, "vocab", (f) => ({ date: todayStr(), word: f.get("word"), meaning: f.get("meaning"), sentence: f.get("sentence") }));
    const rf = $("#readForm");
    if (rf) addFrom(rf, "reads", (f) => ({ date: f.get("date"), type: f.get("type"), title: f.get("title"), url: f.get("url"), idea: f.get("idea") }));

    document.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
      const [list, id] = b.dataset.del.split(":");
      if (!confirmDelete(b)) return;
      data[list] = data[list].filter((x) => x.id !== id); save(); rerender();
    }));
    document.querySelectorAll("[data-review]").forEach((b) => b.addEventListener("click", () => {
      const e = data.errors.find((x) => x.id === b.dataset.review);
      if (e) { e.reviews = (e.reviews || 0) + 1; e.lastReview = todayStr(); save(); rerender(); }
    }));

    document.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => { fc.filter = b.dataset.filter; nextCard(); rerender(); }));
    const sa = $("#showAns");
    if (sa) sa.addEventListener("click", () => { fc.show = true; rerender(); });
    document.querySelectorAll("[data-ans]").forEach((b) => b.addEventListener("click", () => answer(b.dataset.ans)));

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
        try { data = normalize(JSON.parse(rd.result)); save(); render(); $("#backupMsg").textContent = "Import shofol hoyeche."; }
        catch (err) { $("#backupMsg").textContent = "File-ta thik na."; }
      };
      rd.readAsText(file);
    });
  }

  function confirmDelete(btn) {
    if (btn.dataset.armed) return true;
    btn.dataset.armed = "1";
    btn.textContent = "Nishchit? abar click";
    setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = "Delete"; } }, 3000);
    return false;
  }

  function answer(k) {
    if (!fc.card) return;
    const s = data.cards[fc.card.id] || (data.cards[fc.card.id] = { k: 0, u: 0 });
    if (k === "k") s.k++; else s.u++;
    save(); nextCard(); rerender();
  }

  document.addEventListener("keydown", (e) => {
    if ((location.hash || "") !== "#flashcards" || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.code === "Space") { e.preventDefault(); if (!fc.show) { fc.show = true; rerender(); } }
    else if (fc.show && (e.key === "ArrowRight" || e.key === "k")) answer("k");
    else if (fc.show && (e.key === "ArrowLeft" || e.key === "j")) answer("u");
  });

  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#sidebar").addEventListener("click", (e) => { if (e.target.closest(".nav-link")) $("#sidebar").classList.remove("open"); });
  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  renderHeader();
  render();
})();
