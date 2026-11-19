# My SAT Hub — 1450+

A personal SAT study system: plan, formulas with visuals, grammar rules, a vocabulary trainer, flashcards, an error log, and score tracking in one place.

Live: https://md-al-mamun22.github.io/sat-hub/

## Files
| File | What it holds |
|---|---|
| `index.html` | Page skeleton |
| `content.js` | **All study content** — plan, schedule, formulas, rules, flashcards, daily tasks. Edit this to update the site. |
| `vocab.js` | The 408-word SAT vocabulary list (word, part of speech, meaning, example) |
| `visuals.js` | Formula pictures (SVG) |
| `app.js` | Dashboard, trainers, trackers |
| `style.css` | Design (light and dark mode) |
| `marked.min.js` | Markdown library (works offline). Do not edit. |

## Features
- **Practice log:** record every set (topic, difficulty, questions, correct, minutes, understanding 1–5). It powers every number in the hub.
- **Accountability:** day X of Y, days left, days studied vs missed, streak, questions practiced, readiness %.
- **Auto checklist:** Math, R&W, reading, error-log, vocabulary, and flashcard tasks tick themselves from real activity — they cannot be ticked by hand.
- **Honesty check:** flags topics ticked without practice, skipped topics, missed days, low-understanding topics, avoided Hard questions, mistakes never redone, review backlogs, and low volume.
- **Topic mastery:** questions, accuracy, Hard accuracy, understanding, last practiced, and status (Not started / Practicing / Weak / Solid / Mastered / fading) for every topic.
- **Readiness check:** live progress against the requirements for Math 770–780 and R&W 700–740.
- **Dashboard:** today's Math topic, English topic, reading type, and vocabulary; daily checklist; streak; on-track check against milestones; mistakes to redo
- **Study plan:** every weekly topic with tick boxes and progress bars
- **Formula cheat sheet:** all formulas with pictures; **Quiz mode** blurs formulas so you can test yourself
- **Vocabulary trainer:** 10 new words a day + spaced-repetition reviews (1, 2, 4, 7, 15, 30 days), searchable word list, your own words
- **Formula flashcards:** formulas and grammar rules with spaced repetition. Keyboard: Space = flip, → = knew it, ← = didn't know
- **Error log:** weak topics and most common mistake type shown automatically
- **Reading log, test score chart, 8-week activity heatmap, Settings, Backup**

## How to update content
Open `content.js`:
- **Default test date / targets:** `config` (or change them on the Settings page)
- **Weekly focus and daily topics:** `schedule`
- **New flashcard:** add `{ q: "question", a: "answer" }` to `flashcards`
- **New word:** add `["word", "part of speech", "meaning", "example"]` to `vocab.js`
- **Show formula pictures on a page:** inside `md`, on its own line, write `[[vis:pythagoras,soh]]` (ids are in `visuals.js`)
- **New page:** add `{ id, group, title, md }` to `sections`
- Do not use the backtick character inside `md`.

## Where your data is saved
Your ticks, words, flashcard progress, error log, scores, and settings are saved in **this browser's localStorage** (not on GitHub). Download a backup from **Backup / restore** every week, and import it on another device.
