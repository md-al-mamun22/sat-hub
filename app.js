(function () {
  const S = window.SAT;
  const KEY = "satHub_v1";

  // ---------- storage ----------
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d) return { daily: d.daily || {}, errors: d.errors || [], scores: d.scores || [] };
    } catch (e) {}
    return { daily: {}, errors: [], scores: [] };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }
  let data = load();

  // ---------- helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function todayStr(d) {
    const t = d || new Date();
    return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  }
  function daysLeft() {
    const exam = new Date(S.config.examDate + "T00:00:00");
    const now = new Date(todayStr() + "T00:00:00");
    return Math.round((exam - now) / 86400000);
  }
  function md(text) {
    if (window.marked && window.marked.parse) return '<div class="md">' + window.marked.parse(text) + "</div>";
    return '<pre class="md" style="white-space:pre-wrap">' + esc(text) + "</pre>";
  }
  function currentFocus() {
    const t = todayStr();
    const w = S.schedule.find((s) => t >= s.from && t <= s.to);
    return w ? w.focus : (t < S.schedule[0].from ? "Plan shuru hobe " + S.schedule[0].from : "Schedule shesh — content.js e update koro");
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
  function latestScore() {
    if (!data.scores.length) return null;
    return [...data.scores].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  }

  // ---------- header ----------
  function renderHeader() {
    $("#targetPill").textContent = "Target " + S.config.target.total + "+";
    const d = daysLeft();
    $("#countdown").innerHTML = d >= 0 ? "Exam-er baki <b>" + d + "</b> din" : "Exam shesh";
  }

  // ---------- nav ----------
  const fixedPages = [
    { id: "dashboard", group: "Home", title: "Dashboard" },
    { id: "tracker", group: "Tracker", title: "Daily history" },
    { id: "errors", group: "Tracker", title: "Error log" },
    { id: "scores", group: "Tracker", title: "Test scores" },
    { id: "backup", group: "Tracker", title: "Backup / restore" }
  ];
  function allPages() {
    return [fixedPages[0]].concat(S.sections).concat(fixedPages.slice(1));
  }
  function renderNav(active) {
    let html = "", last = "";
    allPages().forEach((p) => {
      if (p.group !== last) { html += '<div class="nav-group">' + esc(p.group) + "</div>"; last = p.group; }
      html += '<button class="nav-link' + (p.id === active ? " active" : "") + '" data-id="' + esc(p.id) + '">' + esc(p.title) + "</button>";
    });
    $("#sidebar").innerHTML = html;
    document.querySelectorAll(".nav-link").forEach((b) =>
      b.addEventListener("click", () => { location.hash = b.dataset.id; $("#sidebar").classList.remove("open"); })
    );
  }

  // ---------- pages ----------
  function pageDashboard() {
    const t = todayStr();
    const done = (data.daily[t] && data.daily[t].done) || [];
    const ls = latestScore();
    const cur = ls ? ls.total : S.config.startScore;
    const pct = Math.max(0, Math.min(100, ((cur - S.config.startScore) / (S.config.target.total - S.config.startScore)) * 100));
    const totalMin = S.dailyTasks.reduce((a, x) => a + x.minutes, 0);

    let tasks = S.dailyTasks.map((x) =>
      '<label class="task' + (done.includes(x.id) ? " done" : "") + '"><input type="checkbox" data-task="' + esc(x.id) + '"' +
      (done.includes(x.id) ? " checked" : "") + "><span>" + esc(x.label) + '</span><span class="min">' + x.minutes + " min</span></label>"
    ).join("");

    return (
      "<h1>Assalamu alaikum, " + esc(S.config.name) + "</h1>" +
      '<div class="focus-box">Ei shoptaher focus: ' + esc(currentFocus()) + "</div>" +
      '<div class="grid">' +
        '<div class="stat"><div class="label">Exam-er baki</div><div class="value">' + Math.max(0, daysLeft()) + ' din</div><div class="sub">' + esc(S.config.examDate) + "</div></div>" +
        '<div class="stat"><div class="label">Latest score</div><div class="value">' + cur + '</div><div class="sub">' + (ls ? "Math " + esc(ls.math) + " · R&W " + esc(ls.rw) : "Start score") + "</div></div>" +
        '<div class="stat"><div class="label">Streak</div><div class="value">' + streak() + ' din</div><div class="sub">puro checklist shesh</div></div>' +
        '<div class="stat"><div class="label">Ei 7 din</div><div class="value">' + (weekMinutes() / 60).toFixed(1) + ' h</div><div class="sub">target ' + ((totalMin * 7) / 60).toFixed(0) + " h</div></div>" +
      "</div>" +
      '<div class="card"><b>Target-er dike progress</b> <span class="muted">(' + S.config.startScore + " → " + S.config.target.total + ")</span>" +
        '<div class="bar" style="margin-top:8px"><div style="width:' + pct.toFixed(0) + '%"></div></div>' +
        '<div class="muted" style="margin-top:6px">' + Math.max(0, S.config.target.total - cur) + " point baki · Math target " + S.config.target.math + " · R&W target " + S.config.target.rw + "</div></div>" +
      '<div class="card"><b>Aj-er checklist</b> <span class="muted">(' + t + " · " + minutesFor(t) + " / " + totalMin + " min)</span>" + tasks + "</div>"
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

  function pageErrors() {
    const items = [...data.errors].sort((a, b) => (a.date < b.date ? 1 : -1)).map((e) =>
      '<div class="list-item"><div class="meta">' + esc(e.date) + " · " + esc(e.section) + " · " + esc(e.topic) +
      ' <span class="tag">' + esc(e.type) + '</span> <button class="btn ghost small" data-del-err="' + esc(e.id) + '">Delete</button></div>' +
      "<div><b>Proshno:</b> " + esc(e.question) + "</div><div><b>Keno bhul:</b> " + esc(e.why) + "</div><div><b>Porer bar:</b> " + esc(e.fix) + "</div></div>"
    ).join("");
    return (
      "<h1>Error log</h1>" +
      '<div class="card"><form class="row" id="errForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Section<select name="section"><option>Math</option><option>R&W</option></select></label>' +
        '<label class="f">Topic<input name="topic" placeholder="e.g. Similar triangles" required></label>' +
        '<label class="f">Bhul-er dhoron<select name="type"><option>Concept jana chilo na</option><option>Calculation bhul</option><option>Proshno bhul bujhechi</option><option>Somoy shesh</option></select></label>' +
        '<label class="f" style="grid-column:1/-1">Proshno (chhoto kore)<textarea name="question" required></textarea></label>' +
        '<label class="f" style="grid-column:1/-1">Keno bhul holo<textarea name="why"></textarea></label>' +
        '<label class="f" style="grid-column:1/-1">Porer bar ki korbo<textarea name="fix"></textarea></label>' +
        '<div><button class="btn" type="submit">Add</button></div>' +
      "</form></div>" +
      '<p class="muted">Mot ' + data.errors.length + " ta bhul. Prottek shoptahe ekbar shob gulo abar solve koro.</p>" +
      (items || '<div class="card muted">Ekhono kono bhul add kora hoyni.</div>')
    );
  }

  function pageScores() {
    const rows = [...data.scores].sort((a, b) => (a.date < b.date ? 1 : -1)).map((s) =>
      "<tr><td>" + esc(s.date) + "</td><td>" + esc(s.name) + "</td><td>" + esc(s.math) + "</td><td>" + esc(s.rw) + "</td><td><b>" + esc(s.total) + "</b></td><td>" +
      '<button class="btn ghost small" data-del-score="' + esc(s.id) + '">Delete</button></td></tr>'
    ).join("");
    return (
      "<h1>Test scores</h1>" +
      '<div class="card"><form class="row" id="scoreForm">' +
        '<label class="f">Date<input type="date" name="date" value="' + todayStr() + '" required></label>' +
        '<label class="f">Test<input name="name" placeholder="Bluebook Test 1" required></label>' +
        '<label class="f">Math (200–800)<input type="number" name="math" min="200" max="800" step="10" required></label>' +
        '<label class="f">R&W (200–800)<input type="number" name="rw" min="200" max="800" step="10" required></label>' +
        '<div><button class="btn" type="submit">Add</button></div>' +
      "</form></div>" +
      (rows
        ? '<div class="card md"><table><tr><th>Date</th><th>Test</th><th>Math</th><th>R&W</th><th>Total</th><th></th></tr>' + rows + "</table></div>"
        : '<div class="card muted">Ekhono kono test score nei.</div>')
    );
  }

  function pageBackup() {
    return (
      "<h1>Backup / restore</h1>" +
      '<div class="card"><p>Checklist, error log ar score shudhu <b>ei browser-e</b> save hoy. Prottek shoptahe ekbar backup download kore rakho, ba onno device-e niye jete import koro.</p>' +
      '<div class="actions"><button class="btn" id="exportBtn">Backup download</button>' +
      '<label class="btn ghost">Backup import<input type="file" id="importFile" accept=".json" style="display:none"></label></div>' +
      '<p class="muted" id="backupMsg"></p></div>'
    );
  }

  // ---------- router ----------
  function render() {
    const id = (location.hash || "#dashboard").slice(1);
    const sec = S.sections.find((s) => s.id === id);
    renderNav(id);
    let html;
    if (sec) html = md(sec.md);
    else if (id === "tracker") html = pageTracker();
    else if (id === "errors") html = pageErrors();
    else if (id === "scores") html = pageScores();
    else if (id === "backup") html = pageBackup();
    else html = pageDashboard();
    $("#main").innerHTML = html;
    bind();
    window.scrollTo(0, 0);
  }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function bind() {
    document.querySelectorAll("[data-task]").forEach((cb) =>
      cb.addEventListener("change", () => {
        const t = todayStr();
        const d = data.daily[t] || (data.daily[t] = { done: [] });
        const id = cb.dataset.task;
        d.done = cb.checked ? Array.from(new Set(d.done.concat(id))) : d.done.filter((x) => x !== id);
        save(); render();
      })
    );
    const ef = $("#errForm");
    if (ef) ef.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(ef);
      data.errors.push({ id: uid(), date: f.get("date"), section: f.get("section"), topic: f.get("topic"), type: f.get("type"), question: f.get("question"), why: f.get("why"), fix: f.get("fix") });
      save(); render();
    });
    const sf = $("#scoreForm");
    if (sf) sf.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(sf);
      const m = Number(f.get("math")), r = Number(f.get("rw"));
      data.scores.push({ id: uid(), date: f.get("date"), name: f.get("name"), math: m, rw: r, total: m + r });
      save(); render();
    });
    document.querySelectorAll("[data-del-err]").forEach((b) => b.addEventListener("click", () => {
      data.errors = data.errors.filter((x) => x.id !== b.dataset.delErr); save(); render();
    }));
    document.querySelectorAll("[data-del-score]").forEach((b) => b.addEventListener("click", () => {
      data.scores = data.scores.filter((x) => x.id !== b.dataset.delScore); save(); render();
    }));
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
        try {
          const d = JSON.parse(rd.result);
          data = { daily: d.daily || {}, errors: d.errors || [], scores: d.scores || [] };
          save(); render();
          $("#backupMsg").textContent = "Import shofol hoyeche.";
        } catch (err) { $("#backupMsg").textContent = "File-ta thik na."; }
      };
      rd.readAsText(file);
    });
  }

  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  window.addEventListener("hashchange", render);
  renderHeader();
  render();
})();
