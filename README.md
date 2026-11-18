# My SAT Hub — 1450+

Amar nijer SAT preparation system: plan, Math formula, English rules, daily checklist, error log ar score tracker, ek jaygay.

## File gulo
| File | Ki ache |
|---|---|
| `index.html` | Page-er kathamo |
| `content.js` | **Shob content** — plan, formula, rules, schedule, daily task. Update korte shudhu eta edit korbo. |
| `app.js` | Dashboard, checklist, error log, score-er logic |
| `style.css` | Design (light/dark dutoi) |
| `marked.min.js` | Markdown-ke page-e dekhanor library (offline-o kaj kore). Edit korte hobe na. |

## Kivabe khulbo
- **Computer-e:** `index.html` e double-click → browser-e khulbe.
- **Online (GitHub Pages):**
  1. GitHub-e notun repo banao, jemon `sat-hub`
  2. Ei 6 ta file upload koro
  3. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save
  4. 1–2 minute por link pabe: `https://md-al-mamun22.github.io/sat-hub/`

Phone theke-o ei link khule use kora jabe.

## Content update kivabe
`content.js` khulo:
- **Exam date / target bodlate:** `config` er bhitore
- **Shoptaher focus bodlate:** `schedule` er bhitore
- **Daily checklist bodlate:** `dailyTasks` er bhitore
- **Notun note/formula jog korte:** je page-e chao, tar `md:` er bhitore Markdown-e likho
- **Notun page:** `sections` e ekta notun block jog koro:
  ```js
  { id: "my-notes", group: "Math", title: "Amar notes", md: `
  # Amar notes
  - ekhane likho
  ` },
  ```
- Shotorkota: `md` er bhitore backtick (`` ` ``) character dibe na.

## Data kothay save hoy
Checklist, error log ar score **browser-er localStorage-e** save hoy (GitHub-e na). Tai:
- Prottek shoptahe **Backup / restore** page theke backup download koro
- Onno device-e gele oi file **import** koro
