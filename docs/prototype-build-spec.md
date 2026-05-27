# Congress Intelligence Platform — Pre-Congress Prototype Build Spec

> **What this is.** A hand-off document for Claude Code to build a clickable, stakeholder-ready prototype of the pre-congress workflow. Static HTML/CSS/JS only — no backend, no framework, all data inline. Built to demo the product end-to-end and to serve as the visual spec when the real Next.js POC follows.

> **What this is not.** A production app, the real frontend POC, or anything that talks to the backend yet. This prototype freezes the visual design and interaction model so stakeholders can see and click *before* the team wires it to real services.

---

## 0. How to build this with Claude Code

1. **Single-page app, hash-routed.** One `index.html` shell, plus one HTML fragment per page loaded into the main area on hash change. Shared `app.css` and `app.js` (light — just nav + mock interactions).
2. **No framework.** Plain HTML/CSS/JS keeps the prototype trivially portable. When you build the real Next.js POC later, the components map one-to-one.
3. **All data inline.** No `fetch`, no API. Hard-code the seeded mock data described in Section 3 inside `app.js` so screens read from one source of truth and stay consistent.
4. **Every mocked interaction shows a visible cue.** Either a small "Demo data" badge on screens that don't yet do real work, or a toast (`✓ Saved`, `Ingesting 3,142 abstracts…`) for actions that simulate backend behavior. The prototype should never silently pretend.
5. **Demo flow is the priority.** Build in the order in Section 4 — one continuous click-through (Agency Dashboard → Client Workspace → Congress → Intel Feed → KOL Dossier → Ask) must work before any side road is built.

**Scope:** pre-congress only. Onsite live capture and post-congress reporting are explicitly out of scope for this prototype.

---

## 1. Shared design system

Used by every page. Define once in `app.css`. The full working scaffold (sidebar, topbar, color tokens, components) already exists in `congress_screens.html` — use it as the visual reference; this section is the build spec.

### 1.1 Palette & typography

```css
:root {
  /* Ink / structure */
  --ink:#0F2A43; --ink2:#0A1F2E; --ink3:#13334F;
  --slate:#48607A; --slate-l:#8499AE; --slate-xl:#AEBECD;
  --line:#E7EDF3; --line2:#DCE5EC;
  --bg:#F4F7FA; --card:#FFFFFF;
  /* Brand accent */
  --teal:#0D9488; --teal-d:#0F766E; --teal-l:#5EEAD4; --teal-bg:#E6F4F1;
  /* Signal colors (used consistently across all pages) */
  --amber:#B45309;  --amber-bg:#FCEFD6;   /* COMPETITIVE */
  --teal-sig:#0F766E; --teal-sig-bg:#E6F4F1; /* OWN COMPANY */
  --violet:#6D5BD0; --violet-bg:#ECE9FB;  /* INDICATION-LEVEL (both) */
  /* Type */
  --disp:'Bricolage Grotesque',sans-serif; /* display */
  --ui:'Hanken Grotesk',sans-serif;        /* body */
  --mono:'JetBrains Mono',monospace;       /* numbers, IDs, badges */
  --r:14px; --rs:10px;
  --sh:0 1px 2px rgba(15,42,67,.04), 0 4px 16px rgba(15,42,67,.06);
}
```

### 1.2 Shell layout (sidebar + topbar + content)

The same shell wraps every page. Active nav item is derived from the current hash.

```html
<div class="app">
  <aside class="side">
    <div class="brand"><div class="logo"><span>IQ</span></div>
      <div><h1>Congress IQ</h1><p>ORCHESTRATE AI</p></div></div>

    <div class="nav-label">Workspace · GSK</div>
    <a class="nav-item" href="#/dashboard">Agency Dashboard</a>
    <a class="nav-item" href="#/clients/gsk">GSK Workspace</a>
    <a class="nav-item" href="#/clients/gsk/congresses/ddw-2026">DDW 2026</a>
    <a class="nav-item" href="#/clients/gsk/congresses/ddw-2026/feed">Intel Feed
      <span class="nav-badge">312</span></a>
    <a class="nav-item" href="#/clients/gsk/kols">KOL Directory</a>

    <div class="nav-label">Configuration</div>
    <a class="nav-item" href="#/clients/gsk/settings/prioritization">Prioritization</a>
    <a class="nav-item" href="#/profile">My Profile</a>

    <div class="side-foot">
      <div class="who"><div class="av">SP</div>
        <div><b>Sarah Phillips</b><small>MedCom Agency · Director</small></div></div>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div class="congress"><span class="dot"></span> DDW 2026 <span class="chev">▾</span></div>
      <div class="search"><input placeholder="Ask in plain language — abstracts, KOLs, drugs, topics…">
        <span class="k">⌘K</span></div>
    </header>
    <section id="page" class="wrap"><!-- per-page fragment injected here --></section>
  </main>
</div>
```

### 1.3 Reusable components (define once, use everywhere)

| Component | Where it appears | What it does |
|---|---|---|
| `.metric` tile | Every dashboard | label · big number · sub-detail |
| `.chip.comp / .own / .both / .lb / .soft / .line` | Across feeds, cards, headers | signal/category tagging — colors fixed per signal |
| `.acard` (abstract card) | Intel Feed, dashboards | colored left-stripe by signal, title, meta line, priority-score ring |
| `.score .ring` | Anywhere a priority score is shown | 58×58px SVG ring with number; stroke-dashoffset encodes score |
| `.panel` + `.panel-h` + `.panel-b` | Side panels everywhere | uniform card containers |
| `.kol-hd` | KOL Dossier, profile headers | dark gradient header with avatar, name, tags, primary action |
| `.slot` | Presentation slate, schedules | date-block + title + meta + optional chip |
| `.tl` (timeline) | Activity feeds | left-rail with dots, used for "what changed" / activity |
| `.fchip` | Filter bars | toggleable filter chip; `.act` for active state |
| `.demo-badge` | On any mocked screen | small amber pill — "DEMO DATA" |

> **One non-negotiable convention:** signal colors are fixed everywhere. Competitive = amber, Own = teal, Indication (both) = violet, Late-breaking = ink/black. Stakeholders will read the dashboard and the feed as one product, so the same flag must look the same on both.

---

## 2. Pages

Ten pages. Numbered routes match the URL each page lives at; pages are listed in the order to build them.

---

### 2.1 Agency Dashboard — `#/dashboard`

**Purpose.** First landing surface. The agency's view across *all* its pharma clients and their upcoming congresses. Anchors the multi-client mental model from the first click.

**Features to implement (real interactions):**
- Top metric tiles (Active Clients, Upcoming Congresses, In Progress, Reports Ready) — clickable, routing into the appropriate filtered list.
- *Upcoming Congresses* list — each row routes to the relevant Congress Dashboard (`#/clients/[client]/congresses/[congress]`).
- *My Assigned Clients* row — each tile routes to the corresponding Client Workspace.
- *Quick Actions* — "Create New Congress" opens the congress-creation flow (Section 2.10); other actions can be inert with a toast.
- Recent Activity feed — non-interactive, just renders.

**Things to mock:**
- 6 clients (GSK, Merck, Boehringer, AstraZeneca, Novartis, Pfizer), each with 1–3 congresses.
- 8 upcoming congresses spanning DDW 2026, ASCO 2026, ATS 2026, ESMO 2026, AAN 2026.
- 5 recent activity entries with timestamps.

```html
<section class="ph">
  <div class="eyebrow">Agency Overview</div>
  <h2>Welcome back, Sarah <span class="wave">👋</span></h2>
  <p>Here's what's happening across your clients and congresses.</p>
</section>

<div class="metrics stagger">
  <a class="metric" href="#/clients">
    <div class="lab"><span class="d" style="background:var(--ink)"></span>Active Clients</div>
    <div class="num">6</div><div class="sub">View all →</div></a>
  <a class="metric" href="#/congresses?status=upcoming">
    <div class="lab"><span class="d" style="background:var(--teal)"></span>Upcoming Congresses</div>
    <div class="num">8</div><div class="sub">Next: DDW 2026 in 41 days</div></a>
  <div class="metric">
    <div class="lab"><span class="d" style="background:var(--amber)"></span>In Progress</div>
    <div class="num">3</div><div class="sub">2 active, 1 finalizing</div></div>
  <div class="metric">
    <div class="lab"><span class="d" style="background:var(--violet)"></span>Reports Ready</div>
    <div class="num">5</div><div class="sub">3 awaiting client review</div></div>
</div>

<div class="cols">
  <div class="panel">
    <div class="panel-h">Upcoming Congresses <a class="more" href="#/congresses">VIEW ALL ›</a></div>
    <div class="panel-b" style="padding:6px 0">
      <!-- repeat rows for each congress -->
      <a class="congress-row" href="#/clients/gsk/congresses/ddw-2026">
        <div class="cmark">DDW</div>
        <div class="cinfo">
          <b>Digestive Disease Week 2026</b>
          <div class="meta">May 16–19 · San Diego, CA · <span class="chip line">GSK</span></div>
        </div>
        <span class="chip soft">Planning</span>
        <span class="when">In 41 days</span>
      </a>
      <!-- ASCO, ATS, ESMO, AAN … -->
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Recent Activity</div>
    <div class="panel-b"><div class="tl">
      <div class="tl-i"><span class="dt">2H AGO</span><b>Capture added for Dr. John Smith</b><p>DDW 2026 · GSK</p></div>
      <div class="tl-i"><span class="dt">5H AGO</span><b>Report generated</b><p>ASCO 2025 Post-Congress · Merck</p></div>
      <div class="tl-i"><span class="dt">1D AGO</span><b>Session prioritized</b><p>LBA1: Novel IL-23 Inhibitor Phase 3</p></div>
    </div></div>
  </div>
</div>

<div class="sec-title">My Assigned Clients <span class="ln"></span></div>
<div class="client-grid">
  <!-- 6 client tiles -->
  <a class="client-tile" href="#/clients/gsk">
    <div class="ctag">GSK</div><b>GSK</b><small>3 Congresses</small>
    <div class="prog"><i style="width:62%"></i></div></a>
  <!-- Merck, Boehringer, AstraZeneca, Novartis, Pfizer … -->
</div>

<div class="sec-title">Quick Actions <span class="ln"></span></div>
<div class="qa-grid">
  <a class="qa" href="#/clients/gsk/congresses/new">
    <div class="qi">＋</div><b>Create New Congress</b><small>Start a new congress workspace</small></a>
  <a class="qa" href="#/upload">
    <div class="qi">⬆</div><b>Upload Documents</b><small>PDFs, slides, screenshots</small></a>
  <a class="qa" href="#/clients/gsk/settings/prioritization">
    <div class="qi">★</div><b>View Prioritization</b><small>AI-ranked opportunities</small></a>
  <a class="qa" href="#/capture">
    <div class="qi">●</div><b>Add Capture</b><small>Voice, photo, or note</small></a>
</div>
```

---

### 2.2 Client Workspace — `#/clients/gsk`

**Purpose.** The strategic-lens layer. Everything that scopes intelligence to *this* pharma client lives here — their pipeline, competitors, priorities, KOLs. Anchors the "lens" concept and links out to per-congress views.

**Features to implement:**
- Breadcrumb (`Client Workspaces › GSK`).
- Tab nav (`Overview · Congresses · KOLs · Insights · Reports · Documents · Company Profile · Team`); only **Overview** and **Congresses** are wired, the rest show a "Coming soon" inline state.
- *Active Congresses / KOLs Tracked / Insights / Reports* metric tiles.
- *Strategic Priorities* — 3–5 priority cards with priority pill (High/Medium/Low). Edit affordance opens a stub.
- *Upcoming Congresses* — same row component as Agency Dashboard, scoped to GSK only.
- *Top Therapeutic Areas* — pie/donut with percentages (use Chart.js or a static SVG).
- *Recent Activity* — scoped to GSK.
- *Key Documents* — list of uploaded reference docs (Pipeline Overview, Therapy Area Strategy, Competitor Landscape) — clicks open a "preview unavailable in prototype" stub.

**Things to mock:**
- 4 strategic priorities specific to GSK (immunology / IBD leadership, respiratory life cycle, oncology, next-gen immunology).
- TA distribution: Gastroenterology 38%, Respiratory 27%, Oncology 18%, Immunology 12%, Other 5%.
- 6 active congresses, 245 tracked KOLs, 1,368 insights captured (use these to mirror the PM mockup).
- 3 key documents.

```html
<div class="crumb">Client Workspaces › <b>GSK</b></div>
<div class="client-hd">
  <div class="ctag-lg">GSK</div>
  <div>
    <h2>GSK <span class="chip own">Active Client</span></h2>
    <p>GlaxoSmithKline · Therapeutic areas: Gastroenterology, Respiratory, Oncology, Immunology</p>
  </div>
  <div class="hd-actions">
    <button class="btn-secondary">⚙ Client Settings</button>
    <a class="btn-primary" href="#/clients/gsk/congresses/new">＋ New Congress</a>
  </div>
</div>

<nav class="tabs">
  <a class="tab act">Overview</a>
  <a class="tab" href="#/clients/gsk/congresses">Congresses</a>
  <a class="tab" href="#/clients/gsk/kols">KOLs</a>
  <a class="tab">Insights</a>
  <a class="tab">Reports</a>
  <a class="tab">Documents</a>
  <a class="tab">Company Profile</a>
  <a class="tab">Team</a>
</nav>

<div class="metrics">
  <div class="metric"><div class="lab">Active Congresses</div><div class="num">6</div><div class="sub">Across 2026</div></div>
  <div class="metric"><div class="lab">KOLs Tracked</div><div class="num">245</div><div class="sub">All TAs</div></div>
  <div class="metric"><div class="lab">Insights Captured</div><div class="num">1,368</div><div class="sub">This year</div></div>
  <div class="metric"><div class="lab">Reports Generated</div><div class="num">28</div><div class="sub">This year</div></div>
  <div class="metric"><div class="lab">Strategic Priorities</div><div class="num">4</div><div class="sub">Configured</div></div>
</div>

<div class="cols-3">
  <div class="panel">
    <div class="panel-h">Upcoming Congresses <a class="more" href="#/clients/gsk/congresses">VIEW ALL ›</a></div>
    <div class="panel-b">
      <a class="cong-mini" href="#/clients/gsk/congresses/ddw-2026">
        <div class="cmark sm">DDW</div>
        <div><b>DDW 2026</b><div class="meta">May 3–6 · San Diego</div></div>
        <span class="when">In 41 days</span>
      </a>
      <!-- repeat for ASCO, ATS, ESMO, ACG -->
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Top Therapeutic Areas</div>
    <div class="panel-b"><canvas id="ta-donut" width="220" height="220"></canvas>
      <div class="legend">
        <div><span class="d" style="background:#0D9488"></span>Gastroenterology <b>38%</b></div>
        <div><span class="d" style="background:#6D5BD0"></span>Respiratory <b>27%</b></div>
        <!-- … -->
      </div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Recent Activity</div>
    <div class="panel-b"><div class="tl">
      <div class="tl-i"><span class="dt">2H AGO</span><b>New congress added: DDW 2026</b></div>
      <div class="tl-i"><span class="dt">5H AGO</span><b>Dr. Walter Reinisch added to KOL list</b></div>
      <div class="tl-i"><span class="dt">1D AGO</span><b>11 insights captured from ASCO 2024</b></div>
    </div></div>
  </div>
</div>

<div class="sec-title">Strategic Priorities <a class="more">MANAGE PRIORITIES ›</a><span class="ln"></span></div>
<div class="priorities">
  <div class="pri"><div class="pri-n">1</div>
    <b>Advance leadership in IBD and GI inflammation</b>
    <span class="chip comp">HIGH PRIORITY</span></div>
  <div class="pri"><div class="pri-n">2</div>
    <b>Expand respiratory portfolio and life cycle management</b>
    <span class="chip comp">HIGH PRIORITY</span></div>
  <div class="pri"><div class="pri-n">3</div>
    <b>Strengthen oncology pipeline positioning</b>
    <span class="chip soft">MEDIUM PRIORITY</span></div>
  <div class="pri"><div class="pri-n">4</div>
    <b>Identify next-gen immunology opportunities</b>
    <span class="chip soft">MEDIUM PRIORITY</span></div>
</div>

<div class="sec-title">Key Documents <a class="more">VIEW ALL ›</a><span class="ln"></span></div>
<div class="docs">
  <div class="doc"><div class="dic pdf">PDF</div>
    <div><b>GSK Clinical Pipeline Overview</b><small>Updated Apr 25, 2026</small></div></div>
  <div class="doc"><div class="dic ppt">PPTX</div>
    <div><b>GSK Therapeutic Area Strategy 2026</b><small>Updated Apr 20, 2026</small></div></div>
  <div class="doc"><div class="dic xls">XLSX</div>
    <div><b>GSK Competitor Landscape</b><small>Updated Apr 18, 2026</small></div></div>
</div>
```

---

### 2.3 Congress Dashboard — `#/clients/gsk/congresses/ddw-2026`

**Purpose.** The pre-congress war room for one congress. The single most important screen between landing and the Intel Feed — it answers "how is DDW 2026 shaping up against GSK's strategy."

**Features to implement:**
- Header: congress title, date, location, status pill, share/upload/capture actions.
- Tab nav (`Overview · Sessions · Abstracts · Posters · People · Companies · Insights · Tasks · Reports · Files · Settings`); **Overview, Abstracts, People** wired (others stub).
- 4 metric tiles (Total Sessions, Abstracts, KOLs Identified, My Prioritized Items).
- *Congress Progress* — donut showing prep progress (Completed / In Progress / Not Started).
- *Top Prioritized Sessions* — table of 5–6 sessions with priority pill; row click → Abstract Detail (Section 2.5).
- *Top KOLs to Engage* — list of 5 KOLs with priority pill; row click → KOL Dossier (Section 2.7).
- *My Tasks* — checklist grouped by phase (Pre / During / Post).
- *Recent Insights* — small feed of captured insights.
- *Priority Breakdown* — 3 columns of horizontal bars (Therapeutic Areas, Focus Areas, Data Types).
- "Capture Insight" CTA in the header — opens a stub (live capture is out of scope for this prototype).

**Things to mock:**
- Mock metrics: 1,342 sessions · 4,789 abstracts (2,156 prioritized) · 623 KOLs · 87 prioritized items.
- Congress progress 72% / 18% / 10%.
- 5 prioritized sessions with realistic DDW content (LB IL-23 trial, UC plenary, fibrosis/MASH, microbiome, RWE GI).
- 5 KOLs with affiliations matching the KOL Directory (Section 2.6).
- 7 tasks across phases.
- Priority breakdown numbers per the PM mockup.

```html
<div class="crumb">Client Workspaces › GSK › Congresses › <b>Digestive Disease Week 2026</b></div>
<div class="cong-hd">
  <div class="cmark lg">DDW</div>
  <div class="cong-info">
    <h2>Digestive Disease Week 2026 <span class="chip own">Active</span></h2>
    <div class="meta">📅 May 3–6, 2026 · 📍 San Diego, CA · #DDW2026</div>
  </div>
  <div class="hd-actions">
    <button class="btn-secondary">⤴ Share</button>
    <button class="btn-secondary">⬆ Upload / Ingest</button>
    <button class="btn-primary">＋ Capture Insight</button>
  </div>
</div>

<nav class="tabs">
  <a class="tab act">Overview</a>
  <a class="tab" href="#/clients/gsk/congresses/ddw-2026/feed">Abstracts</a>
  <a class="tab">Sessions</a>
  <a class="tab">Posters</a>
  <a class="tab" href="#/clients/gsk/kols">People</a>
  <a class="tab">Companies</a>
  <a class="tab">Insights</a>
  <a class="tab">Tasks</a>
  <a class="tab">Reports</a>
  <a class="tab">Files</a>
</nav>

<div class="metrics">
  <div class="metric"><div class="lab">Total Sessions</div><div class="num">1,342</div><div class="sub">Across all tracks</div></div>
  <div class="metric"><div class="lab">Abstracts</div><div class="num">4,789</div><div class="sub"><b>2,156</b> prioritized</div></div>
  <div class="metric"><div class="lab">KOLs Identified</div><div class="num">623</div><div class="sub"><b>158</b> to connect with</div></div>
  <div class="metric"><div class="lab">My Prioritized Items</div><div class="num">87</div><div class="sub">Sessions · abstracts · people</div></div>
  <div class="metric prog-tile">
    <div class="lab">Congress Progress</div>
    <div class="ring-wrap"><svg class="big-ring" viewBox="0 0 100 100"><!-- 72% donut --></svg>
      <div class="ring-pct"><b>72%</b><small>Completed</small></div></div>
  </div>
</div>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">Top Prioritized Sessions <a class="more" href="#/clients/gsk/congresses/ddw-2026/feed">VIEW ALL SESSIONS ›</a></div>
    <table class="ttbl">
      <thead><tr><th>SESSION</th><th>DATE & TIME</th><th>PRIORITY</th></tr></thead>
      <tbody>
        <tr><td><b>LB01 — Late-Breaking Clinical Trials in IBD</b><br><small>Late-Breaking Research</small></td>
            <td>Sun May 3 · 8:00–9:30</td><td><span class="chip comp">High</span></td></tr>
        <tr><td><b>175 — New Therapeutic Targets in UC</b><br><small>Plenary Session</small></td>
            <td>Sun May 3 · 10:30–12:00</td><td><span class="chip comp">High</span></td></tr>
        <tr><td><b>212 — Advances in Fibrosis and NASH</b><br><small>Scientific Oral Presentation</small></td>
            <td>Mon May 4 · 13:30–15:00</td><td><span class="chip soft">Medium</span></td></tr>
        <!-- 3 more rows -->
      </tbody>
    </table>
  </div>

  <div class="panel">
    <div class="panel-h">Top KOLs to Engage <a class="more" href="#/clients/gsk/kols">VIEW ALL ›</a></div>
    <div class="panel-b">
      <a class="kol-row" href="#/kols/subrata-ghosh">
        <div class="av">SG</div>
        <div><b>Dr. Subrata Ghosh</b><small>University of Chicago</small></div>
        <span class="chip comp">High</span></a>
      <!-- 4 more KOL rows -->
    </div>
  </div>
</div>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">My Tasks (7) <a class="more">VIEW ALL ›</a></div>
    <div class="panel-b tasks">
      <div class="ph-grp">PRE-CONGRESS</div>
      <label class="task"><input type="checkbox"> Review 18 high-priority abstracts <span class="due">Due May 3</span></label>
      <label class="task"><input type="checkbox"> Confirm meetings with 5 KOLs <span class="due">Due May 3</span></label>
      <div class="ph-grp">ONSITE</div>
      <label class="task"><input type="checkbox"> Attend LB01 session <span class="due">May 3, 8:00</span></label>
      <label class="task"><input type="checkbox"> Capture insights from GSK symposium <span class="due">May 3, 12:30</span></label>
      <label class="task"><input type="checkbox"> Daily report — Day 1 <span class="due">May 3, 18:00</span></label>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Priority Breakdown <a class="more" href="#/clients/gsk/settings/prioritization">CONFIGURE ›</a></div>
    <div class="panel-b breakdown">
      <div><div class="bd-h">Therapeutic Areas</div>
        <div class="bd-row"><b>IBD</b><div class="bar"><i style="width:88%;background:#0D9488"></i></div><span>42</span></div>
        <div class="bd-row"><b>Hepatology</b><div class="bar"><i style="width:60%;background:#6D5BD0"></i></div><span>28</span></div>
        <div class="bd-row"><b>Pancreatology</b><div class="bar"><i style="width:38%;background:#B45309"></i></div><span>18</span></div>
        <div class="bd-row"><b>GI Oncology</b><div class="bar"><i style="width:18%;background:#48607A"></i></div><span>8</span></div>
      </div>
      <div><div class="bd-h">Data Types</div>
        <div class="bd-row"><b>Clinical Trials</b><div class="bar"><i style="width:92%;background:#0D9488"></i></div><span>46</span></div>
        <div class="bd-row"><b>Safety Data</b><div class="bar"><i style="width:46%;background:#B45309"></i></div><span>22</span></div>
        <div class="bd-row"><b>Real World Data</b><div class="bar"><i style="width:34%;background:#6D5BD0"></i></div><span>16</span></div>
        <div class="bd-row"><b>Basic Science</b><div class="bar"><i style="width:14%;background:#48607A"></i></div><span>6</span></div>
      </div>
    </div>
  </div>
</div>
```

---

### 2.4 Intel Feed — `#/clients/gsk/congresses/ddw-2026/feed`

**The centerpiece of the prototype.** This is the screen that proves the product's value. Stakeholders should leave the demo remembering this one.

**Purpose.** Show every abstract scored, ranked, and filterable against GSK's strategy — competitive flagging, own-company flagging, evidence tiering, and natural-language search.

**Features to implement:**
- Sticky filter bar (TA, Disease, Session Type, Evidence Tier, Data Type, Drug). Chips toggle. Active filters update visible count.
- Sort dropdown (Priority · Date · Session Type).
- Result count + active filters summary.
- Search input that filters cards live by title (no need for a real search backend — substring is fine).
- **Abstract cards** with: left-stripe color by signal (competitive / own / indication), chip stack (signal + topic + evidence tier + session type), title, meta line (author · NCT · session), and priority-score ring on the right.
- Click on a card → Abstract Detail (Section 2.5).
- Click on the author name in the meta → KOL Dossier (Section 2.7).
- "Save", "Mark as priority", "Add to meeting list" actions on hover.
- An empty-state design for when filters return nothing.

**Things to mock:**
- 12–15 realistic DDW abstracts. Mix of signals so users can see competitive amber, own teal, indication violet:
  - Risankizumab vs ustekinumab in UC (competitive, late-breaking, IL-23 topic)
  - Real-world JAKi safety (competitive, oral, JAKi topic)
  - Semaglutide MASH fibrosis (own, plenary, GLP-1)
  - FIB-4 / MRI-PDFF validation (indication, poster, NIT topic)
  - Mirikizumab Crohn's H2H (competitive, oral)
  - Resmetirom + GLP-1 combination (indication, poster)
  - Filgotinib long-term safety (competitive, poster)
  - Treat-to-target endpoints in UC (indication, symposium)
  - …8–10 more
- 6 active filter chips; clicking "Competitive" filters down to 7 cards, etc.
- Priority scores 60–95, distributed realistically.

```html
<div class="ph">
  <div class="eyebrow">Intel Feed · DDW 2026</div>
  <h2>Prioritized abstracts</h2>
  <p>Every abstract scored against GSK's pipeline, competitors, and priority topics — ranked, filterable, source-linked.</p>
</div>

<div class="feed-toolbar">
  <div class="result-count"><b>312</b> matches · <span class="muted">of 4,789 total</span></div>
  <div class="sort">Sort: <select><option>Priority (high → low)</option><option>Date</option><option>Session type</option></select></div>
</div>

<div class="filters">
  <span class="fl">FILTER</span>
  <span class="fchip act">All priorities <span class="x">✕</span></span>
  <span class="fchip">Therapeutic area</span>
  <span class="fchip">Disease</span>
  <span class="fchip">Session type</span>
  <span class="fchip">Evidence tier</span>
  <span class="fchip act">Competitive <span class="x">✕</span></span>
  <span class="fchip">Drug</span>
  <button class="clear-all">Clear all</button>
</div>

<div class="acards stagger">
  <!-- COMPETITIVE / LATE-BREAKING -->
  <a class="acard k-comp" href="#/abstracts/lba-101">
    <div class="body">
      <div class="top">
        <span class="chip comp">COMPETITIVE</span>
        <span class="chip lb">LATE-BREAKING</span>
        <span class="chip soft">IL-23</span>
        <span class="chip soft">RCT · Tier 1</span>
      </div>
      <h3>Phase III efficacy of risankizumab vs ustekinumab in moderate-to-severe ulcerative colitis: the SEQUENCE-UC trial</h3>
      <div class="meta">
        <span>👤 <a href="#/kols/sarah-chen" class="ml"><b>Dr. Sarah Chen</b></a>, UHN Toronto</span>
        <span class="mono">NCT05123456</span>
        <span>🗓 Thu · Oral · Hall A</span>
      </div>
    </div>
    <div class="score">
      <div class="ring"><svg width="58" height="58">
        <circle cx="29" cy="29" r="25" fill="none" stroke="#E7EDF3" stroke-width="5"/>
        <circle cx="29" cy="29" r="25" fill="none" stroke="#0D9488" stroke-width="5"
                stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="9"/>
      </svg><b>94</b></div>
      <small>priority</small>
    </div>
    <div class="hover-actions">
      <button title="Save">☆</button>
      <button title="Priority">★</button>
      <button title="Add to meeting list">+</button>
    </div>
  </a>

  <!-- 11+ more abstract cards in the same shape -->
</div>
```

---

### 2.5 Abstract Detail — `#/abstracts/[id]`

**Purpose.** Drill-down on a single abstract. Where a user reviews the AI-generated summary, sees the authors, gets the trial linkage, and decides whether to prioritize the session for attendance.

**Features to implement:**
- Back-to-feed link.
- Header: title, signal chips, session/date/venue, priority-score ring, "Add to meeting list" / "Mark priority" / "Save" actions.
- Two-column body:
  - Left: AI Summary (4–6 sentences, badged "AI-generated"), then Background / Methods / Results / Conclusions sections.
  - Right side panel: Authors (each clickable to KOL Dossier), Affiliations, Trial info (NCT link), Drugs mentioned (with ontology resolution shown — "risankizumab" ↔ "Skyrizi" ↔ "IL-23 inhibitor"), Topics, Source document link.
- "Related abstracts" carousel at the bottom.
- "View on congress site →" external link (stub).

**Things to mock:**
- Use SEQUENCE-UC as the demo abstract (matches Intel Feed top card).
- 5 authors with avatars, 2 institutions.
- 3 related abstracts (other IL-23 papers).

```html
<a class="back-link" href="#/clients/gsk/congresses/ddw-2026/feed">← Back to Intel Feed</a>

<div class="abstract-hd">
  <div class="top">
    <span class="chip comp">COMPETITIVE</span>
    <span class="chip lb">LATE-BREAKING</span>
    <span class="chip soft">IL-23 · RCT · Tier 1</span>
  </div>
  <h2>Phase III efficacy of risankizumab vs ustekinumab in moderate-to-severe ulcerative colitis: the SEQUENCE-UC trial</h2>
  <div class="meta">
    <span>🗓 Thursday, May 16 · 9:00–9:30 AM</span>
    <span>📍 Hall A · LB Oral Session 1</span>
    <span class="mono">Abstract LBA-101 · NCT05123456</span>
  </div>
  <div class="hd-actions">
    <button class="btn-primary">＋ Add to meeting list</button>
    <button class="btn-secondary">★ Mark priority</button>
    <button class="btn-secondary">☆ Save</button>
    <div class="score"><div class="ring"><!-- 94 --></div><small>PRIORITY</small></div>
  </div>
</div>

<div class="cols-2">
  <div class="abstract-body">
    <div class="ai-summary">
      <div class="ai-lab">AI-GENERATED SUMMARY</div>
      <p>SEQUENCE-UC is a Phase III head-to-head trial comparing risankizumab to ustekinumab in 824 patients with moderate-to-severe UC. At week 52, risankizumab demonstrated superior endoscopic improvement (45.2% vs 32.7%, p&lt;0.001) and histologic remission. Safety profiles were comparable, with no new signals for either agent. The data position risankizumab as a potentially preferred IL-23 option for moderate-to-severe UC.</p>
    </div>
    <section><h3>Background</h3><p>Lorem ipsum…</p></section>
    <section><h3>Methods</h3><p>Lorem ipsum…</p></section>
    <section><h3>Results</h3><p>Lorem ipsum…</p></section>
    <section><h3>Conclusions</h3><p>Lorem ipsum…</p></section>
    <div class="source"><b>Source:</b> Gastroenterology Supplement (forthcoming) ·
      <a href="#" class="ext">View on congress site →</a></div>
  </div>
  <aside class="abstract-side">
    <div class="panel">
      <div class="panel-h">Authors</div>
      <div class="panel-b">
        <a class="kol-row sm" href="#/kols/sarah-chen">
          <div class="av">SC</div><div><b>Dr. Sarah Chen</b><small>UHN Toronto · Presenting</small></div></a>
        <!-- 4 more -->
      </div>
    </div>
    <div class="panel">
      <div class="panel-h">Drugs mentioned</div>
      <div class="panel-b">
        <div class="drug">
          <b>risankizumab</b>
          <div class="syn"><span class="chip line">Skyrizi</span><span class="chip line">IL-23 inhibitor</span></div>
        </div>
        <div class="drug">
          <b>ustekinumab</b>
          <div class="syn"><span class="chip line">Stelara</span><span class="chip line">IL-12/23</span></div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-h">Trial</div>
      <div class="panel-b">
        <b class="mono">NCT05123456</b><br>
        Phase 3 · Active, recruiting · 824 patients
        <div class="ext-link">View on ClinicalTrials.gov →</div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-h">Topics</div>
      <div class="panel-b">
        <span class="chip soft">IL-23 positioning</span>
        <span class="chip soft">UC treat-to-target</span>
        <span class="chip soft">Endoscopic remission</span>
      </div>
    </div>
  </aside>
</div>
```

---

### 2.6 KOL Directory — `#/clients/gsk/kols`

**Purpose.** Search and triage KOLs. The pre-congress targeting surface — used to find people, see their congress activity at a glance, and decide who to add to the meeting list.

**Features to implement:**
- Search input (live filters by name/affiliation).
- Filter bar (Therapeutic Area, Focus Area, Affiliation, Country, Tags, More Filters).
- Sort dropdown (Relevance · Influence · Match).
- Result count (`232 results`).
- KOL rows showing: avatar, name, credentials, **match-score pill** (High/Medium/Low Match), affiliation, expertise/focus tags, congress activity (last 1–2 with role), influence score (numeric + Very High/High/Moderate label), publication + citation counts, action menu.
- Row click → KOL Dossier.
- Quick-add "+" action to add to current congress's meeting list (toast on click).
- Export button (stub).
- "+ Add KOL" button (stub).

**Things to mock:**
- 8 KOLs covering IBD (Ghosh, Vermeire, Sandborn, Feagan, Colombel, Antonsen, Reinisch) and 2 in MASH.
- Influence scores 65–95.
- Mix of match-status pills.
- Realistic congress activity (DDW 2024 Presenter, ECCO 2024 Panelist, etc.).

```html
<div class="ph">
  <div class="eyebrow">KOL Directory</div>
  <h2>KOLs</h2>
  <p>Search and discover Key Opinion Leaders across the GSK workspace.</p>
</div>

<div class="kol-toolbar">
  <div class="search-big">
    <span class="ic">🔍</span>
    <input value="" placeholder="Search KOLs by name, institution, or expertise…">
    <button class="clear">✕</button>
  </div>
  <button class="btn-secondary">⬇ Export</button>
  <button class="btn-primary">＋ Add KOL</button>
</div>

<div class="filters">
  <span class="fl">FILTER</span>
  <span class="fchip">Therapeutic Area</span>
  <span class="fchip">Focus Area</span>
  <span class="fchip">Affiliation</span>
  <span class="fchip">Country</span>
  <span class="fchip">Tags</span>
  <span class="fchip">More Filters</span>
  <button class="clear-all">Clear all</button>
  <div class="result-mini">Sort: <select><option>Relevance</option><option>Influence</option><option>Match</option></select> · <b>232</b> results</div>
</div>

<table class="kol-table">
  <thead><tr><th>KOL</th><th>AFFILIATION</th><th>EXPERTISE & FOCUS</th><th>CONGRESS ACTIVITY</th><th>INFLUENCE</th><th></th></tr></thead>
  <tbody>
    <tr onclick="location.hash='#/kols/subrata-ghosh'">
      <td>
        <div class="kol-cell">
          <div class="av">SG</div>
          <div>
            <b>Dr. Subrata Ghosh</b> <span class="chip own xs">High Match</span><br>
            <small>MD, PhD · Chicago, IL, USA</small>
          </div>
        </div>
      </td>
      <td><b>University of Chicago</b><br><small>Professor of Medicine · Gastroenterology</small></td>
      <td>
        <span class="chip line">IBD</span>
        <span class="chip line">Crohn's Disease</span>
        <span class="chip line">IL-23 Pathway</span>
        <span class="chip line">+2</span>
      </td>
      <td>
        <div class="cong-act">📅 <b>DDW 2024</b> · Presenter</div>
        <div class="cong-act">📅 <b>AGA 2023</b> · Panelist</div>
      </td>
      <td><div class="influence"><b>92</b> <small>Very High</small></div>
        <small class="mono">125 pubs · 8,432 citations</small></td>
      <td><button class="row-add" title="Add to meeting list">+</button></td>
    </tr>
    <!-- 7 more rows: Vermeire, Sandborn, Feagan, Colombel, Antonsen, Reinisch, plus 2 MASH KOLs -->
  </tbody>
</table>

<div class="pager">
  <button>‹</button>
  <span class="page act">1</span><span class="page">2</span><span class="page">3</span>
  <span class="dots">…</span><span class="page">10</span>
  <button>›</button>
</div>
```

---

### 2.7 KOL Dossier — `#/kols/[id]`

**Purpose.** The meeting-prep deliverable. Per-KOL detail with everything an MSL or director needs in one view: who they are, what they're presenting, what we know about them from prior congresses, and what to do next.

**Features to implement:**
- Dark gradient header: avatar (initials), name, credentials, primary affiliation + country, tier and sentiment pills, focus tags, **"+ Add to meeting list"** primary CTA.
- Two-column body:
  - Left: **Presenting at DDW 2026** — slots with date-block, title, session type/venue, optional chip (LB, Chair). Each slot click → Abstract Detail.
  - Right: **Field notes & history** — chronological list of notes from prior congresses and advisory boards. Each note has source attribution (Voice note 2:14 / Advisory board / Written brief).
  - Below: **Recommended follow-up** chip.
- Bottom panels:
  - **Publications & influence** — small bar chart of pub count by year.
  - **Network** — top co-authors / institutions (stub).
- Edit / Notes / Mark as priority actions.

**Things to mock:**
- Use Sarah Chen, MD PhD (UHN Toronto) as the primary mock dossier (matches Intel Feed top card author).
- 3 DDW 2026 presentation slots.
- 2 field notes (DDW 2025 voice debrief, March 2025 advisory board).
- Pub history: 8–12 years of bars trending upward.

```html
<a class="back-link" href="#/clients/gsk/kols">← Back to KOL Directory</a>

<div class="kol-hd">
  <div class="kol-av">SC</div>
  <div class="kol-meta">
    <h2>Dr. Sarah Chen, MD PhD</h2>
    <div class="inst">University Health Network · Toronto, Canada</div>
    <div class="tags">
      <span class="tag"><span class="dot"></span>Tier 1 KOL</span>
      <span class="tag">Sentiment: positive</span>
      <span class="tag">IBD · IL-23</span>
    </div>
  </div>
  <button class="addbtn">+ Add to meeting list</button>
</div>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">Presenting at DDW 2026 <span class="more">3 SESSIONS</span></div>
    <div class="panel-b">
      <a class="slot" href="#/abstracts/lba-101">
        <div class="when"><small>THU</small>9:00</div>
        <div><h4>Risankizumab vs ustekinumab in UC — SEQUENCE-UC</h4>
          <p>Late-breaking oral · Hall A</p></div>
        <span class="chip lb">LB</span></a>
      <a class="slot" href="#/abstracts/sym-04">
        <div class="when"><small>FRI</small>11:30</div>
        <div><h4>Treat-to-target endpoints in IBD</h4>
          <p>Symposium · Chair</p></div>
        <span class="chip soft">CHAIR</span></a>
      <a class="slot" href="#/abstracts/p-237">
        <div class="when"><small>SAT</small>10:00</div>
        <div><h4>Histologic remission durability poster walk</h4>
          <p>Poster · Hall C</p></div></a>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Field notes & history</div>
    <div class="panel-b">
      <div class="note">
        <div class="nh"><b>DDW 2025 · hallway debrief</b><small>MAY 2025</small></div>
        <p>Cautiously optimistic on IL-23 selectivity but flagged the lack of head-to-head data as the key gap before guideline adoption.</p>
        <div class="src">🎙 Voice note · 2:14</div>
      </div>
      <div class="note">
        <div class="nh"><b>Advisory board</b><small>MAR 2025</small></div>
        <p>Strong advocate for transmural healing as a regulatory endpoint. Open to GSK pipeline discussion.</p>
      </div>
      <span class="chip line">★ Recommended follow-up</span>
    </div>
  </div>
</div>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">Publications & influence</div>
    <div class="panel-b">
      <canvas id="pub-chart" width="500" height="180"></canvas>
      <div class="stats-row">
        <div><b>98</b><small>Publications</small></div>
        <div><b>6,210</b><small>Citations</small></div>
        <div><b>43</b><small>h-index</small></div>
      </div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Network</div>
    <div class="panel-b">
      <div class="co"><div class="av sm">BV</div><span><b>Dr. Bram Vermeire</b><small>KU Leuven · 12 co-authored</small></span></div>
      <div class="co"><div class="av sm">WS</div><span><b>Dr. William Sandborn</b><small>UC San Diego · 8 co-authored</small></span></div>
      <!-- 3 more -->
    </div>
  </div>
</div>
```

---

### 2.8 Prioritization Settings — `#/clients/gsk/settings/prioritization`

**Purpose.** Show — and tune — how the scoring engine prioritizes everything in the Intel Feed and Congress Dashboard. The page that makes the "lens" feel controllable rather than magical.

**Features to implement:**
- Breadcrumb (`GSK › Settings › Prioritization`).
- "Current Prioritization Mode" card (Balanced default; mode dropdown stub).
- "Priority Summary" row: KOLs / Sessions / Abstracts / Posters / Networking with High/Medium/Low badge each.
- Tab nav (`Overview · KOL Priorities · Session Priorities · Content Priorities · Scoring Weights · Advanced Rules`); Overview wired, rest stub.
- **Scoring Factors & Weights** panel: 7 sliders (Relevance to TA 25%, Focus Areas 20%, KOL Influence 15%, Scientific Impact 15%, Company/Competitor 10%, Collaboration 10%, Historical Engagement 5%). Sliders move; total must stay 100% (lock the total — adjusting one rebalances the rest, or simply show a warning if it doesn't sum). Sub-headline: "Weights determine how much influence each factor has on the overall priority score."
- **Your Priority Preferences** panel: Top Therapeutic Areas (chips with ✕), Focus Areas, Keywords/Topics, Companies/Competitors to Monitor (chips), Content Types (checkboxes).
- **Priority Impact Preview** at bottom: 5 small tiles (KOLs / Sessions / Abstracts / Posters / Networking) showing the live counts at the current weights, plus "Run Full Recalculate" button (toasts a fake recalc; doesn't actually re-rank).
- "Save Changes" / "Reset to Defaults" buttons.

**Things to mock:**
- Default weights as listed above (sum to 100).
- 4 TAs, 5 focus areas, 8 keywords, 5 competitor companies pre-populated.
- Impact preview numbers: 623 / 87 / 2,156 / 1,342 / 48 with priority badges.

```html
<div class="crumb">GSK › Settings › <b>Prioritization</b></div>

<div class="ph">
  <h2>Prioritization Settings</h2>
  <p>Customize how we prioritize people, sessions, abstracts, and other content for you.</p>
  <div class="ph-actions">
    <button class="btn-secondary">↻ Reset to Defaults</button>
    <button class="btn-primary">＋ Save Changes</button>
  </div>
</div>

<div class="cols-mode">
  <div class="panel">
    <div class="panel-h">Current Prioritization Mode</div>
    <div class="panel-b mode">
      <div class="mode-card">
        <div class="mc-ic">⚖</div>
        <div><b>Balanced (Default)</b><small>Balanced weighting across all priority factors</small></div>
      </div>
      <button class="btn-secondary">Change Mode ▾</button>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Priority Summary <small class="mono">Last updated: May 2, 2026</small></div>
    <div class="panel-b summary">
      <div><b>KOLs</b><span class="chip comp">High</span></div>
      <div><b>Sessions</b><span class="chip comp">High</span></div>
      <div><b>Abstracts</b><span class="chip soft">Medium</span></div>
      <div><b>Posters</b><span class="chip soft">Medium</span></div>
      <div><b>Networking</b><span class="chip comp">High</span></div>
    </div>
  </div>
</div>

<nav class="tabs">
  <a class="tab act">Overview</a>
  <a class="tab">KOL Priorities</a>
  <a class="tab">Session Priorities</a>
  <a class="tab">Content Priorities</a>
  <a class="tab">Scoring Weights</a>
  <a class="tab">Advanced Rules</a>
</nav>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">Scoring Factors & Weights</div>
    <div class="panel-b">
      <p class="muted">Adjust the importance of each factor in our prioritization engine.</p>
      <div class="slider-row">
        <div><b>Relevance to Therapeutic Areas</b><small>Match to your therapeutic focus</small></div>
        <input type="range" min="0" max="100" value="25"><span class="pct">25%</span>
      </div>
      <div class="slider-row">
        <div><b>Relevance to Focus Areas</b><small>Alignment with your focus areas</small></div>
        <input type="range" min="0" max="100" value="20"><span class="pct">20%</span>
      </div>
      <div class="slider-row">
        <div><b>KOL Influence & Expertise</b><small>Impact and authority of the person</small></div>
        <input type="range" min="0" max="100" value="15"><span class="pct">15%</span>
      </div>
      <div class="slider-row">
        <div><b>Scientific / Clinical Impact</b><small>Novelty, data quality, publication, etc.</small></div>
        <input type="range" min="0" max="100" value="15"><span class="pct">15%</span>
      </div>
      <div class="slider-row">
        <div><b>Company / Competitor Relevance</b><small>Involvement of key companies</small></div>
        <input type="range" min="0" max="100" value="10"><span class="pct">10%</span>
      </div>
      <div class="slider-row">
        <div><b>Potential for Collaboration</b><small>Opportunity for partnership or engagement</small></div>
        <input type="range" min="0" max="100" value="10"><span class="pct">10%</span>
      </div>
      <div class="slider-row">
        <div><b>Historical Engagement</b><small>Past interactions and relationships</small></div>
        <input type="range" min="0" max="100" value="5"><span class="pct">5%</span>
      </div>
      <div class="slider-total"><b>Total</b> <span class="total-pct">100%</span></div>
      <div class="note-box">Weights determine how much influence each factor has on the overall priority score.</div>
    </div>
  </div>

  <div class="panel">
    <div class="panel-h">Your Priority Preferences</div>
    <div class="panel-b">
      <div class="pref-grp">
        <label>Top Therapeutic Areas</label>
        <div class="chips-edit">
          <span class="chip line">Gastroenterology <span class="x">✕</span></span>
          <span class="chip line">Hepatology <span class="x">✕</span></span>
          <span class="chip line">Immunology <span class="x">✕</span></span>
          <span class="chip line">Infectious Disease <span class="x">✕</span></span>
          <button class="chip-add">+ Add</button>
        </div>
      </div>
      <div class="pref-grp">
        <label>Focus Areas</label>
        <div class="chips-edit">
          <span class="chip line">IBD <span class="x">✕</span></span>
          <span class="chip line">NASH <span class="x">✕</span></span>
          <span class="chip line">Microbiome <span class="x">✕</span></span>
          <span class="chip line">Fibrosis <span class="x">✕</span></span>
          <span class="chip line">IL-23 Pathway <span class="x">✕</span></span>
          <button class="chip-add">+ Add</button>
        </div>
      </div>
      <div class="pref-grp">
        <label>Key Topics / Keywords</label>
        <div class="chips-edit">
          <span class="chip line">IL-23 Inhibitors</span>
          <span class="chip line">JAK Inhibitors</span>
          <span class="chip line">Biomarkers</span>
          <span class="chip line">Real World Evidence</span>
          <span class="chip line">Combination Therapy</span>
          <span class="chip line">Treatment Paradigms</span>
          <span class="chip line">Disease Remission <span class="x">✕</span></span>
          <button class="chip-add">+ Add Keyword</button>
        </div>
      </div>
      <div class="pref-grp">
        <label>Companies / Competitors to Monitor</label>
        <div class="chips-edit">
          <span class="chip line">AbbVie</span>
          <span class="chip line">Janssen</span>
          <span class="chip line">Bristol Myers Squibb</span>
          <span class="chip line">Eli Lilly</span>
          <span class="chip line">Merck</span>
          <button class="chip-add">+ Add</button>
        </div>
      </div>
      <div class="pref-grp">
        <label>Content Types to Prioritize</label>
        <div class="checks">
          <label><input type="checkbox" checked> Oral Presentations</label>
          <label><input type="checkbox" checked> Late-Breaking Abstracts</label>
          <label><input type="checkbox" checked> Posters</label>
          <label><input type="checkbox" checked> Industry Symposia</label>
          <label><input type="checkbox" checked> Scientific Abstracts</label>
        </div>
      </div>
      <button class="clear-pref">Clear Preferences</button>
    </div>
  </div>
</div>

<div class="panel">
  <div class="panel-h">Priority Impact Preview <button class="btn-primary sm">Run Full Recalculate</button></div>
  <div class="panel-b">
    <p class="muted">See how these settings are affecting current priorities.</p>
    <div class="impact-grid">
      <div class="impact"><div class="lab">KOLs</div><b>623</b><span class="chip comp">High Priority</span></div>
      <div class="impact"><div class="lab">Sessions</div><b>87</b><span class="chip comp">High Priority</span></div>
      <div class="impact"><div class="lab">Abstracts</div><b>2,156</b><span class="chip soft">Medium Priority</span></div>
      <div class="impact"><div class="lab">Posters</div><b>1,342</b><span class="chip soft">Medium Priority</span></div>
      <div class="impact"><div class="lab">Networking</div><b>48</b><span class="chip comp">High Priority</span></div>
    </div>
    <div class="recalc-meta">Last calculated: May 2, 2026 10:30 AM</div>
  </div>
</div>
```

---

### 2.9 User Profile — `#/profile`

**Purpose.** The user's own configuration — their personal lens over the client's strategic context.

**Important fix from the PM mockup.** The original mockup conflated personal info (phone, time zone, location) with strategic context (molecules of interest, competitors, KOLs). Split into clearer sections; group personal-data on the left, strategic-context on the right. The strategic-context fields are *personal overlays* on top of the client workspace's strategic context.

**Features to implement:**
- Tab nav (`Profile · Preferences · Notifications · Security & Access · Activity History`).
- Two-column layout:
  - **Left column — Identity & role:** Personal Information (full name, email, phone, time zone, location); Role & Organization (job title, department, organization, workspace role, default workspace).
  - **Right column — Strategic interests (clearly labeled as "Your personal overlay"):** Areas of Interest (TAs, focus areas), Keywords/Topics, KOLs & Organizations of Interest, Molecules & Competitors of Interest.
- **Bottom row:** Professional Bio (editable text area), Experience & Expertise, Communication & Collaboration (preferred channels), Profile Completion meter.
- "Edit Profile" toggle.

**Things to mock:**
- Sarah Phillips, Director Medical Affairs, MedCom Agency, Chicago / Eastern Time, default workspace GSK.
- TAs: Gastroenterology, Hepatology, Infectious Disease, Immunology.
- Focus areas: IBD, Liver Disease, NASH, Microbiome.
- Molecules: Trelegy (IL-23), Depemokimab, Bimzelx, Risankizumab.
- Competitors: AbbVie, Janssen, Eli Lilly, Merck, Bristol Myers Squibb.

```html
<div class="crumb">GSK › Team › <b>Sarah Phillips</b></div>

<div class="ph">
  <h2>User Profile</h2>
</div>

<nav class="tabs">
  <a class="tab act">Profile</a>
  <a class="tab">Preferences</a>
  <a class="tab">Notifications</a>
  <a class="tab">Security & Access</a>
  <a class="tab">Activity History</a>
  <button class="btn-primary edit">✎ Edit Profile</button>
</nav>

<div class="profile-grid">
  <!-- LEFT: Identity & role -->
  <div class="panel">
    <div class="panel-h">Personal Information</div>
    <div class="panel-b">
      <div class="avatar-lg">SP</div>
      <div class="kv"><span>Full Name</span><b>Sarah Phillips</b></div>
      <div class="kv"><span>Email</span><b>sarah.phillips@medcomagency.com</b></div>
      <div class="kv"><span>Phone</span><b>+1 (312) 555-0189</b></div>
      <div class="kv"><span>Time Zone</span><b>Eastern Time (ET)</b></div>
      <div class="kv"><span>Location</span><b>Chicago, IL, USA</b></div>
    </div>
  </div>

  <div class="panel">
    <div class="panel-h">Role & Organization</div>
    <div class="panel-b">
      <div class="kv"><span>Job Title</span><b>Director, Medical Affairs</b></div>
      <div class="kv"><span>Department</span><b>Medical Affairs</b></div>
      <div class="kv"><span>Organization</span><b>MedCom Agency</b></div>
      <div class="kv"><span>Workspace Role</span><b><span class="chip comp">Admin</span></b></div>
      <div class="kv"><span>Default Client Workspace</span>
        <b><span class="ctag xs">GSK</span> GSK <span class="chev">▾</span></b></div>
    </div>
  </div>

  <!-- RIGHT: Strategic interests -->
  <div class="panel pers-strategy" style="grid-column: span 2">
    <div class="panel-h">Your strategic interests
      <small class="muted">(personal overlay on top of the GSK workspace context)</small></div>
    <div class="panel-b cols-2">
      <div>
        <label>Therapeutic Areas</label>
        <div class="chips-edit">
          <span class="chip line">Gastroenterology</span>
          <span class="chip line">Hepatology</span>
          <span class="chip line">Infectious Disease</span>
          <span class="chip line">Immunology</span>
          <button class="chip-add">+ Add</button>
        </div>
        <label>Focus Areas</label>
        <div class="chips-edit">
          <span class="chip line">IBD</span>
          <span class="chip line">Liver Disease</span>
          <span class="chip line">NASH</span>
          <span class="chip line">Microbiome</span>
          <button class="chip-add">+ Add</button>
        </div>
        <label>Keywords & Topics</label>
        <div class="chips-edit">
          <span class="chip line">IL-23 Inhibitors</span>
          <span class="chip line">Fibrosis</span>
          <span class="chip line">Biomarkers</span>
          <span class="chip line">Real World Evidence</span>
          <span class="chip line">Treatment Paradigms</span>
          <span class="chip line">Combination Therapy</span>
          <button class="chip-add">+ Add keyword</button>
        </div>
      </div>
      <div>
        <label>Molecules of Interest</label>
        <div class="chips-edit">
          <span class="chip line">Trelegy (IL-23)</span>
          <span class="chip line">Depemokimab</span>
          <span class="chip line">Bimzelx</span>
          <span class="chip line">Risankizumab</span>
          <button class="chip-add">+ Add</button>
        </div>
        <label>Competitors of Interest</label>
        <div class="chips-edit">
          <span class="chip line">AbbVie</span>
          <span class="chip line">Janssen</span>
          <span class="chip line">Eli Lilly</span>
          <span class="chip line">Merck</span>
          <span class="chip line">Bristol Myers Squibb</span>
          <button class="chip-add">+ Add</button>
        </div>
        <label>KOLs & Organizations of Interest</label>
        <div class="avatars-row">
          <div class="av sm">SC</div><div class="av sm">SG</div><div class="av sm">BV</div>
          <div class="av sm">WS</div><div class="av sm">BF</div><span class="more-av">+12</span>
        </div>
        <label>Key Organizations</label>
        <div class="chips-edit">
          <span class="chip line">AGA</span><span class="chip line">AASLD</span>
          <span class="chip line">UEG</span><span class="chip line">DDW</span>
          <span class="chip line">ECCO</span>
        </div>
      </div>
    </div>
  </div>

  <!-- bottom row -->
  <div class="panel">
    <div class="panel-h">Professional Bio</div>
    <div class="panel-b">
      <p>Medical affairs professional with 12+ years of experience in gastroenterology and immunology. Focused on scientific exchange, medical education, and building relationships with thought leaders to advance patient care.</p>
      <button class="link">Edit Bio</button>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Experience & Expertise</div>
    <div class="panel-b">
      <div class="kv"><span>Years in Industry</span><b>12+ years</b></div>
      <div class="kv"><span>Primary Expertise</span><b>Medical Affairs, Scientific Communications, KOL Engagement</b></div>
      <div class="kv"><span>Congress Experience</span><b>Attended 18 congresses in the last 3 years</b></div>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Profile Completion <span class="chip own">92% Complete</span></div>
    <div class="panel-b">
      <div class="prog-bar"><i style="width:92%"></i></div>
      <ul class="checklist">
        <li class="done">✓ Personal Information</li>
        <li class="done">✓ Role & Organization</li>
        <li class="done">✓ Areas of Interest</li>
        <li class="done">✓ Preferences</li>
        <li>○ Security & Access</li>
      </ul>
    </div>
  </div>
</div>
```

---

### 2.10 Congress Creation / Ingestion — `#/clients/gsk/congresses/new`

**Purpose.** The flow that brings a new congress into the workspace. The "missing screen" from the PM mockups — necessary to make the prototype feel like a real working tool, not a static demo.

**Features to implement:**
- Modal-style wizard with 3 steps (Basics → Ingest Sources → Confirm).
- **Step 1 — Basics:** name, acronym, year, dates, city/venue, primary therapeutic area, website URL, registration cost (optional).
- **Step 2 — Ingest Sources:** upload zone (PDFs, abstract books, screenshots) + URL paste + "Connect to ClinicalTrials.gov by TA" + "Pull from OpenAlex for related authors." Visible list of added sources with type pill and status.
- **Step 3 — Confirm:** preview of what will be created (name, dates, source count). Big "Create Congress & Start Ingestion" CTA.
- After clicking Create: full-page "Ingesting…" state with progress bars (Documents processed / Abstracts extracted / Entities resolved / Review queue), updating every second via a fake timer. When "complete," routes to the new Congress Dashboard with a success toast.
- Cancel button on every step (return to Client Workspace).

**Things to mock:**
- 3 sample sources pre-attached if the user clicks "demo data."
- Ingestion progress: 0 → 47 documents over ~10 seconds, then plateau at "complete."
- Show a fake "12 records routed to review queue (low extraction confidence)" line so the review workflow is implied.

```html
<div class="modal-shell">
  <div class="modal">
    <div class="modal-hd">
      <h2>Create New Congress</h2>
      <div class="steps">
        <span class="step act">1 · Basics</span>
        <span class="step">2 · Ingest Sources</span>
        <span class="step">3 · Confirm</span>
      </div>
      <button class="close">✕</button>
    </div>

    <!-- STEP 1 -->
    <div class="modal-body step-1">
      <div class="form-grid">
        <label><span>Congress name</span><input value="Digestive Disease Week 2026"></label>
        <label><span>Acronym</span><input value="DDW"></label>
        <label><span>Year</span><input type="number" value="2026"></label>
        <label><span>Start date</span><input type="date" value="2026-05-03"></label>
        <label><span>End date</span><input type="date" value="2026-05-06"></label>
        <label><span>City</span><input value="San Diego, CA"></label>
        <label><span>Venue</span><input value="San Diego Convention Center"></label>
        <label><span>Primary therapeutic area</span>
          <select><option>Gastroenterology</option><option>Oncology</option><option>Respiratory</option></select></label>
        <label class="span-2"><span>Website URL</span><input value="https://ddw.org"></label>
      </div>
    </div>

    <!-- STEP 2 (shown when active) -->
    <div class="modal-body step-2" style="display:none">
      <div class="upload-zone">
        <div class="uz-ic">⬆</div>
        <b>Drag & drop or click to upload</b>
        <small>PDFs, abstract books, screenshots, slide decks</small>
      </div>
      <div class="add-url">
        <input placeholder="…or paste a congress URL">
        <button class="btn-secondary">Add URL</button>
      </div>
      <div class="connectors">
        <button class="conn">📋 Connect ClinicalTrials.gov (by TA)</button>
        <button class="conn">📚 Pull from OpenAlex (related authors)</button>
      </div>
      <div class="sources-added">
        <div class="src-added">📄 DDW_2026_Abstract_Book.pdf <span class="chip soft">PDF · 47 abstracts</span> <span class="src-status">Queued</span></div>
        <div class="src-added">🔗 https://ddw.org/program <span class="chip soft">URL</span> <span class="src-status">Queued</span></div>
        <div class="src-added">📋 ClinicalTrials.gov · Gastroenterology <span class="chip soft">API</span> <span class="src-status">Queued</span></div>
      </div>
    </div>

    <!-- STEP 3 (shown when active) -->
    <div class="modal-body step-3" style="display:none">
      <div class="confirm-card">
        <h3>Digestive Disease Week 2026</h3>
        <p>May 3–6, 2026 · San Diego, CA · Gastroenterology</p>
        <ul>
          <li>3 ingest sources attached</li>
          <li>Will create the congress workspace under <b>GSK</b></li>
          <li>Abstracts and entities will be processed in the background</li>
        </ul>
      </div>
    </div>

    <div class="modal-foot">
      <button class="btn-secondary">Cancel</button>
      <div class="modal-actions">
        <button class="btn-secondary">← Back</button>
        <button class="btn-primary">Next →</button>
        <button class="btn-primary" style="display:none">✓ Create Congress & Start Ingestion</button>
      </div>
    </div>
  </div>
</div>

<!-- INGESTION PROGRESS (shown after Create) -->
<div class="ingest-progress" style="display:none">
  <h2>Ingesting DDW 2026…</h2>
  <div class="prog-grp">
    <div class="prog-row"><b>Documents processed</b><div class="bar"><i style="width:62%"></i></div><span class="mono">29 / 47</span></div>
    <div class="prog-row"><b>Abstracts extracted</b><div class="bar"><i style="width:54%"></i></div><span class="mono">1,287</span></div>
    <div class="prog-row"><b>Entities resolved</b><div class="bar"><i style="width:48%"></i></div><span class="mono">423 KOLs · 89 drugs</span></div>
    <div class="prog-row warn"><b>Review queue</b><div class="bar"><i style="width:25%;background:#B45309"></i></div><span class="mono">12 records</span></div>
  </div>
  <p class="muted">You can leave this page — ingestion continues in the background. We'll notify you when it's complete.</p>
</div>
```

---

## 3. Mock data fixtures

A single source of truth for all mock data. Define in `app.js` as a `DATA` object. The same KOLs, drugs, abstracts, and topics must appear consistently across every screen — Sarah Chen on the Intel Feed is the same Sarah Chen on the KOL Dossier.

```js
const DATA = {
  user: { name: "Sarah Phillips", title: "Director, Medical Affairs",
    org: "MedCom Agency", workspace: "GSK", initials: "SP" },

  clients: [
    { id: "gsk", name: "GSK", congresses: 6, tas: ["Gastroenterology","Respiratory","Oncology","Immunology"] },
    { id: "merck", name: "Merck", congresses: 2 },
    { id: "boehringer", name: "Boehringer Ingelheim", congresses: 2 },
    /* AstraZeneca, Novartis, Pfizer */
  ],

  strategicPriorities: [
    { rank: 1, text: "Advance leadership in IBD and GI inflammation", level: "high" },
    { rank: 2, text: "Expand respiratory portfolio and life cycle management", level: "high" },
    { rank: 3, text: "Strengthen oncology pipeline positioning", level: "medium" },
    { rank: 4, text: "Identify next-gen immunology opportunities", level: "medium" }
  ],

  kols: [
    { id: "sarah-chen", name: "Dr. Sarah Chen", credentials: "MD PhD",
      affiliation: "University Health Network", country: "Canada",
      tier: 1, sentiment: "positive", focus: ["IBD","IL-23"],
      influence: 92, pubs: 98, citations: 6210, initials: "SC" },
    { id: "subrata-ghosh", name: "Dr. Subrata Ghosh", credentials: "MD PhD",
      affiliation: "University of Chicago", country: "USA",
      focus: ["IBD","Crohn's Disease","IL-23 Pathway"], influence: 92,
      pubs: 125, citations: 8432, initials: "SG", match: "high" },
    /* Vermeire, Sandborn, Feagan, Colombel, Antonsen, Reinisch */
  ],

  drugs: [
    { name: "risankizumab", brand: "Skyrizi", class: "IL-23 inhibitor", role: "competitive" },
    { name: "ustekinumab", brand: "Stelara", class: "IL-12/23", role: "competitive" },
    { name: "semaglutide", brand: "Ozempic/Wegovy", class: "GLP-1", role: "own" },
    { name: "tirzepatide", brand: "Mounjaro", class: "GLP-1/GIP", role: "competitive" },
    { name: "resmetirom", brand: "Rezdiffra", class: "THR-β", role: "indication" },
    { name: "upadacitinib", brand: "Rinvoq", class: "JAK", role: "competitive" },
    /* etc */
  ],

  abstracts: [
    { id: "lba-101", title: "Phase III efficacy of risankizumab vs ustekinumab in moderate-to-severe ulcerative colitis: the SEQUENCE-UC trial",
      signal: "competitive", session: "late-breaking", topic: "IL-23",
      authorId: "sarah-chen", nct: "NCT05123456", priority: 94,
      schedule: "Thu · Oral · Hall A" },
    /* 11+ more matching the mix in 2.4 */
  ],

  topics: [
    { name: "IL-23 inhibitors — positioning", signal: "competitive", count: 41, coverage: 88 },
    { name: "MASH — fibrosis regression & NITs", signal: "both", count: 36, coverage: 74 },
    { name: "JAK inhibitors — safety & RWD", signal: "competitive", count: 29, coverage: 62 }
  ],

  congresses: [
    { id: "ddw-2026", name: "Digestive Disease Week 2026", acronym: "DDW", dates: "May 3–6, 2026",
      city: "San Diego, CA", status: "planning", client: "gsk", inDays: 41 },
    /* ASCO, ATS, ESMO, ACG */
  ]
};
```

---

## 4. Build order

**Phase A — Shell + entry surfaces.** Build the `index.html` shell, `app.css` with the design system from Section 1, hash routing, and the navigation. Then Agency Dashboard, Client Workspace, Congress Dashboard. End-to-end navigation works.

**Phase B — The value layer.** Intel Feed (with working filters), Abstract Detail. The full demo arc works: land on Agency Dashboard → drill into GSK → into DDW 2026 → browse the feed → open an abstract → return.

**Phase C — KOL surfaces.** KOL Directory, KOL Dossier. The dossier links from abstract authors and from the directory. The "humans" half of the demo now works.

**Phase D — Configuration & creation.** Prioritization Settings (sliders fully interactive), User Profile (the corrected version), Congress Creation flow with mock ingestion progress. The product feels controllable, not magical.

---

## 5. Definition of done

- Every nav item routes to a working page; back-buttons and breadcrumbs work.
- The full demo arc — Agency Dashboard → GSK Client Workspace → DDW 2026 Congress Dashboard → Intel Feed → an abstract → its KOL → Prioritization Settings — runs without dead ends.
- Filter chips on the Intel Feed actually filter (substring match against title/topic is enough).
- Prioritization sliders move and the bottom impact-preview counts respond (even if the math is faked).
- Congress Creation simulates ingestion progress and lands on the new Congress Dashboard.
- "Demo data" badge is visible on any screen where the data is purely illustrative.
- A short `README.md` with the demo script (the click-by-click path stakeholders will be walked through).

That's the prototype. When stakeholders are happy with the shape, the same pages map one-to-one onto the Next.js routes in the real frontend POC — and the only thing that changes is *where the data comes from*.