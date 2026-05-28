# Congress Intelligence Platform — Pre-Congress Prototype Build Spec

> **What this is.** A hand-off document for Claude Code to build a clickable, stakeholder-ready prototype of the pre-congress workflow. Static HTML/CSS/JS only — no backend, no framework, all data inline. Built to demo the product end-to-end and to serve as the visual spec when the real Next.js POC follows.

> **What this is not.** A production app, the real frontend POC, or anything that talks to the backend yet. This prototype freezes the visual design and interaction model so stakeholders can see and click *before* the team wires it to real services.

> **v1.1 — Step 1 setup mechanics added.** The initial spec described the *configured* state of the Client Workspace but left the onboarding mechanics underspecified. This revision adds: a Create-Client-Workspace modal (§2.1a), an empty-setup state with checklist on the Client Workspace (§2.2 state A), the gating logic on "+ New Congress" (§2.2), six Strategic Context drawers (§2.2a), the workspace-ready transition with one-time banner (§2.2 state B), additions to the User Profile (§2.9), and edge-case notices (§2.11). Cross-reference: `ux_flow_step1_workspace_setup.md`. All sections from v1.0 remain valid — this revision *adds*, it does not remove.

> **v1.2 — Pre-congress deliverables and cross-spec fixes.** Closes gaps surfaced during the v1.1 prototype audit: adds Ask Anything (§2.12), Meeting List (§2.13), and Topic Landscape Brief (§2.14) screens — three deliverables the DDW reference and Step 1 doc both name but v1.0/1.1 missed. Fixes the workspace-aware sidebar nav (§1.2 update), specifies congress status state machine (§1.4), pins down Export behavior (§1.5), reconciles the "Demo: AbbVie" state-A workspace into mock data (§3 update), adds Sarah Chen to the KOL Directory, and resolves the §2.2b re-entry ambiguity. Same surgical-patch convention as v1.1 — v1.0 and v1.1 content remain valid.

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

### 1.4 Workspace-aware sidebar (v1.2)

The sidebar nav in §1.2 must be **bound to the active client/congress**, not hardcoded to GSK. Render paths from two pieces of context held in `state.active`:

```js
state.active = { clientId: 'gsk', congressId: 'ddw-2026' }; // updated by router
```

Sidebar links become:

```html
<a class="nav-item" href="#/clients/${active.clientId}">
  ${client.name} Workspace</a>
<a class="nav-item" href="#/clients/${active.clientId}/congresses/${active.congressId}">
  ${congress.acronym} ${congress.year}</a>
<a class="nav-item" href="#/clients/${active.clientId}/congresses/${active.congressId}/feed">
  Intel Feed <span class="nav-badge">${congress.priorityCount}</span></a>
<a class="nav-item" href="#/clients/${active.clientId}/kols">KOL Directory</a>
<a class="nav-item" href="#/clients/${active.clientId}/settings/prioritization">Prioritization</a>
```

The sidebar label updates too: `Workspace · ${client.name}`. When the user switches workspaces via the topbar switcher (§2.11 C), the sidebar reflects the change.

**Topbar congress pill behavior:**
- On any congress-scoped page (Congress Dashboard, Intel Feed, Abstract Detail, Meeting List): pill shows `${congress.acronym} ${congress.year} ▾` — clicking opens a list of that client's congresses to switch between.
- On Client Workspace pages (Overview, KOL Directory, Settings): pill shows the active client name with a switch dropdown — `${client.name} ▾`.
- On the Agency Dashboard: pill is hidden (no active client/congress scope).

---

### 1.5 Congress status state machine (v1.2)

Congresses progress through four states. Status pills used across the spec must match.

| State | Pill style | When | Triggers |
|---|---|---|---|
| **Planning** | `.chip.soft` (grey) | Created but pre-event; ingestion may still be in progress. | Default after Congress Creation (§2.10) finishes. |
| **Active** | `.chip.own` (teal) | Congress is currently underway (date range covers today). | Date-based; auto-transitions. |
| **Closed** | `.chip.line` (outline) | End date passed; report-generation phase. | Date-based + manual flip. |
| **Archived** | `.chip.line.muted` | Older than current cycle; read-only. | Manual / annual roll-over. |

**Apply this fix:** §2.3 Congress Dashboard currently shows DDW 2026 with an "Active" pill. With DDW 2026 dates set to May 3–6 and the prototype's "today" set to ~March 22 (i.e. 41 days out), it should be **Planning**, not Active. Fix the pill in the §2.3 HTML to `<span class="chip soft">Planning</span>`. The mock data in §3 already says `status: "planning"` — make the rendered UI match.

---

### 1.6 Export behavior (v1.2)

The DDW reference explicitly calls out four export deliverables: a competitive summary, a curated abstract bundle, KOL dossier export, and a topic landscape brief PDF. The spec previously had "Export" buttons with undefined behavior. **Convention for the prototype:**

- Every Export button opens a small modal with three options: *PDF*, *Slide-ready PNG set*, *Copy link*.
- Clicking any option fires a toast: `Generating ${type}…` after a 1.5s simulated delay → `✓ Exported ${type}. Saved to your Downloads.`
- No file is actually generated. The point in the prototype is to demonstrate the *capability* exists in the IA, not to ship file generation.
- Export buttons live on: Intel Feed (export filtered competitive summary), KOL Directory (export selected as briefing pack), KOL Dossier (export this dossier), Topic Landscape Brief (export this brief), Meeting List (export schedule + dossiers).

```html
<!-- shared export modal -->
<div class="modal-shell" id="modal-export">
  <div class="modal xs">
    <div class="modal-hd"><h3>Export</h3><button class="close" onclick="closeModal()">✕</button></div>
    <div class="modal-body export-options">
      <button class="exp-opt"><span class="ic">📄</span><b>PDF</b><small>Formatted document, share-ready</small></button>
      <button class="exp-opt"><span class="ic">🖼</span><b>Slide-ready PNGs</b><small>One image per section, for decks</small></button>
      <button class="exp-opt"><span class="ic">🔗</span><b>Copy link</b><small>Shareable read-only URL</small></button>
    </div>
  </div>
</div>
```

---

## 2. Pages

Ten pages. Numbered routes match the URL each page lives at; pages are listed in the order to build them.

---

### 2.1 Agency Dashboard — `#/dashboard`

**Purpose.** First landing surface. The agency's view across *all* its pharma clients and their upcoming congresses. Anchors the multi-client mental model from the first click.

**Features to implement (real interactions):**
- Top metric tiles (Active Clients, Upcoming Congresses, In Progress, Reports Ready) — clickable, routing into the appropriate filtered list.
- *Upcoming Congresses* list — each row routes to the relevant Congress Dashboard (`#/clients/[client]/congresses/[congress]`).
- *My Assigned Clients* row — each tile routes to the corresponding Client Workspace. **Plus a final "+ Add Client" tile** that opens the Create New Client Workspace modal (§2.1a).
- **Topbar "+ Create New ▾" dropdown** with two items: *Create New Client Workspace* (opens the modal in §2.1a) and *Create New Congress* (opens §2.10, disabled if no client workspaces exist yet).
- *Quick Actions* — "Create New Client Workspace" (modal, §2.1a) and "Create New Congress" (flow, §2.10) are the two primary actions. Other actions can be inert with a toast.
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
  <a class="qa" href="#" onclick="openCreateClientModal();return false">
    <div class="qi">⊕</div><b>Create New Client Workspace</b><small>Set up a new pharma client</small></a>
  <a class="qa" href="#/clients/gsk/congresses/new">
    <div class="qi">＋</div><b>Create New Congress</b><small>Start a new congress workspace</small></a>
  <a class="qa" href="#/upload">
    <div class="qi">⬆</div><b>Upload Documents</b><small>PDFs, slides, screenshots</small></a>
  <a class="qa" href="#/clients/gsk/settings/prioritization">
    <div class="qi">★</div><b>View Prioritization</b><small>AI-ranked opportunities</small></a>
</div>
```

---

### 2.1a Create New Client Workspace — modal

**Purpose.** The entry point that brings a new pharma client into the agency's workspace set. Opened from the Agency Dashboard's topbar dropdown, the "+ Add Client" tile, or the Quick Action.

**Features to implement:**
- Modal overlay with header, body, footer (Cancel / Create Workspace).
- Required fields: Client name, Display short name / logo letters (2–4 chars), Primary therapeutic areas (multi-select from controlled list).
- Optional fields: Description, Initial team members (multi-select from agency users — stubbed list of 5 fake users).
- **Duplicate-name handling:** on blur of the name field, check against `DATA.clients[].name`. If matched, show inline warning "*This client workspace already exists*" with a link "Open existing workspace →" that routes to `#/clients/[id]` and closes the modal.
- **On submit:** create a new `clients` entry with a stub ID (slugify the name), then route to `#/clients/[new-id]`. The new workspace **starts in Empty-Setup state** (§2.2 State A) — this is the most important behavior to wire correctly, since it's what triggers the Step 1 setup flow.
- **Validation:** name and at least one TA required. Inline errors on blur; Create button stays disabled until valid.
- **Cancel:** closes the modal without creating anything.

**Things to mock:**
- TA controlled list: Gastroenterology, Hepatology, Oncology, Immunology, Respiratory, Neurology, Infectious Disease, Cardiology, Endocrinology, Other.
- 5 fake agency users for the team picker (Sarah Phillips, James Walker, Emily Chen, David Park, Maria Rivera).
- Existing client names to test duplicate handling: GSK, Merck, Boehringer Ingelheim, AstraZeneca, Novartis, Pfizer.

```html
<div class="modal-shell" id="modal-create-client">
  <div class="modal sm">
    <div class="modal-hd">
      <h2>Create New Client Workspace</h2>
      <button class="close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <p class="muted">Set up a new pharma client workspace. You'll configure their strategic context in the next step.</p>
      <div class="form-grid one">
        <label>
          <span>Client name <em>*</em></span>
          <input id="cc-name" placeholder="e.g. AbbVie" onblur="checkDuplicateClient(this.value)">
          <div class="inline-err" id="cc-name-err" style="display:none">
            This client workspace already exists.
            <a href="#" onclick="openExisting();return false">Open existing workspace →</a>
          </div>
        </label>
        <label>
          <span>Short name / logo letters <em>*</em></span>
          <input id="cc-short" maxlength="4" placeholder="ABV" style="text-transform:uppercase">
        </label>
        <label>
          <span>Primary therapeutic areas <em>*</em></span>
          <div class="multi-select">
            <span class="chip line">Gastroenterology <span class="x">✕</span></span>
            <span class="chip line">Immunology <span class="x">✕</span></span>
            <button class="chip-add">+ Add TA</button>
          </div>
        </label>
        <label>
          <span>Initial team (optional)</span>
          <div class="avatar-picker">
            <button class="ap-add">+ Add team members</button>
          </div>
        </label>
        <label>
          <span>Description (optional)</span>
          <textarea rows="2" placeholder="Brief notes about this client engagement…"></textarea>
        </label>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" id="cc-submit" disabled onclick="createClientWorkspace()">Create Workspace</button>
    </div>
  </div>
</div>
```

---

### 2.2 Client Workspace — `#/clients/[client]`

**Purpose.** The strategic-lens layer. Everything that scopes intelligence to *this* pharma client lives here — their pipeline, competitors, priorities, KOLs. Anchors the "lens" concept and links out to per-congress views.

#### Two states

This screen has **two distinct visual states**, both rendered at the same route. State is derived from whether the client's required configuration items (Strategic Priorities and at least one Therapeutic Area) are populated.

- **State A — Empty-Setup.** Shown when configuration is incomplete (newly created client workspaces, or any time required items are missing). Drives the user through the Step 1 onboarding via a setup checklist.
- **State B — Configured.** Shown when required items are set. The full overview with metrics, panels, and the active "+ New Congress" CTA.

The transition from A → B is one-way per workspace and triggers the one-time "You're ready" banner (described below). Re-opening the checklist later from the Settings tab does *not* revert to State A.

Persistence: progress on the checklist persists between sessions via `localStorage` keyed by client ID. Returning to an incomplete workspace lands the user back in State A with their progress intact.

#### Common to both states

- Breadcrumb (`Client Workspaces › [client]`).
- Header: client logo letters, client name, "Active Client" pill, "Client Settings" button.
- Tab nav (`Overview · Congresses · KOLs · Insights · Reports · Documents · Company Profile · Team`); only **Overview** and **Congresses** are wired, the rest show a "Coming soon" inline state.
- **"+ New Congress" button** — visible in both states. **Gating logic:**
  - State A: button is **disabled** with hover tooltip *"Configure Strategic Priorities and at least one Therapeutic Area to add a congress."*
  - State B: button is enabled and routes to `#/clients/[client]/congresses/new`.

---

#### State A — Empty-Setup (checklist mode)

**Features to implement:**
- A single full-width **"Set up your workspace"** panel replacing the metrics row.
- Inside: a checklist of seven configuration items, each with:
  - Status icon (○ pending / ✓ complete / ⊕ in progress).
  - Title + one-line description.
  - "Required" / "Recommended" pill.
  - "Configure" button that opens the corresponding drawer (§2.2a).
  - "Skip for now" link (recommended items only).
- A **progress bar** at the top of the panel: `n / 7 complete`. Required items count separately: `Required: n / 2 complete`.
- Below the checklist panel: an **empty preview** of the configured Overview (metrics greyed out, panels marked "Available once setup is complete") — gives users a sense of what they're working toward without breaking the checklist focus.

**Behavior:**
- Required items (Strategic Priorities, Therapeutic Areas) cannot be skipped. They drive the gating.
- Completing a recommended item ticks the checkbox but doesn't gate progress; skipping leaves it pending with a "you can return to this anytime" toast.
- When both required items are complete, the **"+ New Congress" button** in the header transitions from disabled to enabled with a brief pulse animation. The "You're ready" banner (see Transition below) appears at the top.

```html
<div class="crumb">Client Workspaces › <b>AbbVie</b></div>
<div class="client-hd">
  <div class="ctag-lg">ABV</div>
  <div>
    <h2>AbbVie <span class="chip soft">Setting up</span></h2>
    <p>Configure your strategic context to start tracking congresses.</p>
  </div>
  <div class="hd-actions">
    <button class="btn-secondary">⚙ Client Settings</button>
    <button class="btn-primary" disabled
            title="Configure Strategic Priorities and at least one Therapeutic Area to add a congress.">
      ＋ New Congress</button>
  </div>
</div>

<nav class="tabs">
  <a class="tab act">Overview</a>
  <a class="tab muted">Congresses</a>
  <a class="tab muted">KOLs</a>
  <a class="tab muted">Insights</a>
  <a class="tab muted">Reports</a>
  <a class="tab muted">Documents</a>
  <a class="tab muted">Company Profile</a>
  <a class="tab muted">Team</a>
</nav>

<div class="setup-panel">
  <div class="setup-hd">
    <div>
      <h3>Set up your workspace</h3>
      <p class="muted">Configure your strategic context once. The lens you set here drives everything downstream — abstract scoring, KOL surfacing, competitive flagging.</p>
    </div>
    <div class="setup-progress">
      <div class="sp-num"><b>0</b> <span>/ 7</span></div>
      <div class="bar"><i style="width:0%"></i></div>
      <small><b>Required: 0 / 2</b> · 5 recommended</small>
    </div>
  </div>

  <ol class="checklist">
    <li class="check-item pending required">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Strategic Priorities</b>
        <small>3–5 high-level priorities that shape what matters for this client.</small>
      </div>
      <span class="chip comp xs">Required</span>
      <button class="btn-primary sm" onclick="openDrawer('priorities')">Configure</button>
    </li>
    <li class="check-item pending required">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Therapeutic Areas & Focus Areas</b>
        <small>The TAs and sub-topics the client cares about.</small>
      </div>
      <span class="chip comp xs">Required</span>
      <button class="btn-primary sm" onclick="openDrawer('therapeutic-areas')">Configure</button>
    </li>
    <li class="check-item pending recommended">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Pipeline Assets</b>
        <small>Pipeline and marketed drugs — enables own-company flagging on abstracts.</small>
      </div>
      <span class="chip soft xs">Recommended</span>
      <button class="btn-secondary sm" onclick="openDrawer('pipeline')">Configure</button>
      <button class="link skip" onclick="skipItem('pipeline')">Skip for now</button>
    </li>
    <li class="check-item pending recommended">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Competitors</b>
        <small>Competitor companies and drugs — enables competitive flagging.</small>
      </div>
      <span class="chip soft xs">Recommended</span>
      <button class="btn-secondary sm" onclick="openDrawer('competitors')">Configure</button>
      <button class="link skip" onclick="skipItem('competitors')">Skip for now</button>
    </li>
    <li class="check-item pending recommended">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Priority KOLs</b>
        <small>10–20 priority KOLs for meeting prep. Can be added anytime.</small>
      </div>
      <span class="chip soft xs">Recommended</span>
      <button class="btn-secondary sm" onclick="openDrawer('kols')">Configure</button>
      <button class="link skip" onclick="skipItem('kols')">Skip for now</button>
    </li>
    <li class="check-item pending recommended">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Strategic Keywords & Topics</b>
        <small>Search vocabulary that boosts matching abstracts in the Intel Feed.</small>
      </div>
      <span class="chip soft xs">Recommended</span>
      <button class="btn-secondary sm" onclick="openDrawer('keywords')">Configure</button>
      <button class="link skip" onclick="skipItem('keywords')">Skip for now</button>
    </li>
    <li class="check-item pending recommended">
      <span class="ic">○</span>
      <div class="ci-body">
        <b>Prioritization Weights</b>
        <small>Defaults provided — open and adjust if you have specific preferences.</small>
      </div>
      <span class="chip soft xs">Defaults set</span>
      <a class="btn-secondary sm" href="#/clients/abbvie/settings/prioritization">Review</a>
      <button class="link skip" onclick="skipItem('weights')">Skip for now</button>
    </li>
  </ol>
</div>

<div class="overview-preview muted-preview">
  <div class="metrics greyed">
    <div class="metric"><div class="lab">Active Congresses</div><div class="num">—</div></div>
    <div class="metric"><div class="lab">KOLs Tracked</div><div class="num">—</div></div>
    <div class="metric"><div class="lab">Insights Captured</div><div class="num">—</div></div>
    <div class="metric"><div class="lab">Reports Generated</div><div class="num">—</div></div>
  </div>
  <div class="preview-note">Available once setup is complete.</div>
</div>
```

---

#### State B — Configured (full overview)

**Features to implement:**
- Header same as State A, but with "Active Client" pill (instead of "Setting up") and the **"+ New Congress" button enabled**.
- A small **"Setup complete · 6/7 ✓"** tag inline with the breadcrumb; clicking expands the checklist drawer (recoverable, but not the main UI).
- Metric tiles (Active Congresses, KOLs Tracked, Insights Captured, Reports Generated, Strategic Priorities).
- 3-column row: *Upcoming Congresses*, *Top Therapeutic Areas* donut, *Recent Activity*.
- *Strategic Priorities* section (4 priority cards with priority pills + "Manage priorities →" link that re-opens the priorities drawer).
- *Key Documents* section (3 documents).
- **One-time "You're ready" banner** (Transition state, below).

**Things to mock:**
- 4 strategic priorities specific to GSK.
- TA distribution: Gastroenterology 38%, Respiratory 27%, Oncology 18%, Immunology 12%, Other 5%.
- 6 active congresses, 245 tracked KOLs, 1,368 insights captured.
- 3 key documents.

```html
<div class="crumb">Client Workspaces › <b>GSK</b>
  <span class="setup-tag" onclick="toggleChecklist()">Setup complete · 6/7 ✓</span></div>
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

<!-- One-time readiness banner — see Transition section below -->
<div class="ready-banner" id="ready-banner" style="display:none">
  <div class="rb-ic">✨</div>
  <div class="rb-body">
    <b>You're ready.</b>
    <p>Add your first congress to see the lens in action.</p>
  </div>
  <a class="btn-primary" href="#/clients/gsk/congresses/new">＋ New Congress</a>
  <button class="rb-close" onclick="dismissReadyBanner()">✕</button>
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

<div class="sec-title">Strategic Priorities <a class="more" onclick="openDrawer('priorities')">MANAGE PRIORITIES ›</a><span class="ln"></span></div>
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

#### Transition: State A → State B

The moment both required items are configured, three things happen in order:

1. The **"+ New Congress" button** transitions from disabled to enabled with a brief teal pulse animation (`@keyframes pulse` on the border).
2. After a 600ms pause, the **State A view collapses** with a smooth height transition (`max-height` animation, ~400ms) and the **State B view fades in** below.
3. The **"You're ready" banner** appears at the top of the configured view with a slide-in animation. It is **dismissable** and **shown only once per workspace** (`localStorage` flag `client-[id]-ready-shown`). The banner copy: *"You're ready. Add your first congress to see the lens in action."* with a primary "+ New Congress" CTA.

After dismissal, the banner is gone forever. Returning to the workspace shows State B directly with no banner.

**Demo behavior in the prototype:** add a debug helper accessible from the topbar (or a `?reset` query param) that wipes the relevant `localStorage` keys, so the stakeholder demo can replay the empty-setup → configured transition cleanly.

#### Things to mock (both states)

- For GSK and the other 5 default clients: State B (already configured).
- For any client created via the §2.1a modal: State A (newly created → empty setup).
- 4 strategic priorities specific to GSK in State B.
- TA distribution, congresses, activity, documents same as v1.0.
- A "Demo: AbbVie" client pre-seeded in State A so stakeholders can experience the empty-setup checklist without having to create a client first.

---

### 2.2a Strategic Context Drawers — `?drawer=<id>` overlays on `#/clients/[client]`

**Purpose.** Six configuration drawers that let the user fill in the strategic context that the platform's lens depends on. Each maps directly to a checklist item in State A (§2.2) and remains accessible from the Settings tab in State B. Together they're the *mechanism* of Step 1.

**Common drawer pattern.**
- Slides in from the right at ~480px wide; the page behind it dims with a 30% black overlay.
- Header: drawer title, close (✕) button, optional "Required" / "Recommended" pill mirroring the checklist.
- Body: form fields with helper text. Empty states inside the drawer encourage starter content with example chips users can one-click add.
- Footer: "Cancel" (closes without saving) and "Save & Continue" (validates, persists to `localStorage` keyed by client ID, closes the drawer, and ticks the checklist item).
- Saving an item with **valid** data marks it complete on the checklist; saving with empty data on a required drawer is blocked until valid.
- Drawers are independent — closing one doesn't affect others. Progress on each persists; reopening shows the last saved state.

```html
<div class="drawer-overlay" onclick="closeDrawer()"></div>
<aside class="drawer" id="drawer-priorities">
  <div class="drawer-hd">
    <div>
      <h3>Strategic Priorities</h3>
      <small class="muted">3–5 high-level priorities that shape what matters for this client.</small>
    </div>
    <div class="drawer-hd-r">
      <span class="chip comp xs">Required</span>
      <button class="close" onclick="closeDrawer()">✕</button>
    </div>
  </div>
  <div class="drawer-body">
    <!-- drawer-specific content (see each section below) -->
  </div>
  <div class="drawer-foot">
    <button class="btn-secondary" onclick="closeDrawer()">Cancel</button>
    <button class="btn-primary" onclick="saveDrawer('priorities')">Save & Continue</button>
  </div>
</aside>
```

---

#### 2.2a.1 — Strategic Priorities drawer

**Drawer ID:** `priorities`. **Required.** Maps to checklist item 1.

**Body fields:**
- 1–5 rows. Each row: text input for the priority statement + dropdown (High / Medium / Low) + remove (×). Add row with "+ Add another priority."
- Suggested examples shown as ghost placeholders to break the blank-page problem:
  *"Advance leadership in IBD and GI inflammation"*, *"Identify next-gen immunology opportunities"*, *"Expand respiratory portfolio and life cycle management."*

**Validation:** At least one priority with non-empty text required to enable "Save & Continue."

**Persistence:** `client-[id]-priorities` → array of `{text, level}`.

```html
<div class="drawer-body">
  <p class="muted">Type 3–5 statements that describe what matters most for this client. These become the highest-level signal in the scoring engine.</p>
  <div class="priority-rows">
    <div class="pr-row">
      <input placeholder="e.g. Advance leadership in IBD and GI inflammation">
      <select><option>High</option><option>Medium</option><option>Low</option></select>
      <button class="rm">✕</button>
    </div>
    <!-- repeat for additional rows -->
  </div>
  <button class="link" onclick="addPriorityRow()">+ Add another priority</button>
</div>
```

---

#### 2.2a.2 — Therapeutic Areas & Focus Areas drawer

**Drawer ID:** `therapeutic-areas`. **Required.** Maps to checklist item 2.

**Body fields:**
- *Top Therapeutic Areas* — multi-select chip picker from the controlled list (Gastroenterology, Hepatology, Oncology, Immunology, Respiratory, Neurology, Infectious Disease, Cardiology, Endocrinology, Other).
- *Focus Areas* — chip picker, extensible. Pre-seeded with common ones: IBD, NASH, Microbiome, Fibrosis, IL-23 Pathway, etc. User can add a custom one.

**Validation:** At least one TA required.

**Persistence:** `client-[id]-tas` → `{areas: [], focuses: []}`.

```html
<div class="drawer-body">
  <label class="block">
    <span class="lab">Therapeutic Areas <em>*</em></span>
    <small class="muted">Choose from the controlled list. These map to the system's disease ontology.</small>
    <div class="chip-picker">
      <span class="chip line selected">Gastroenterology ✓</span>
      <span class="chip line">Hepatology</span>
      <span class="chip line">Oncology</span>
      <span class="chip line">Immunology</span>
      <span class="chip line">Respiratory</span>
      <!-- … -->
    </div>
  </label>
  <label class="block">
    <span class="lab">Focus Areas</span>
    <small class="muted">More specific sub-topics. Add your own with the "+" tile.</small>
    <div class="chips-edit">
      <span class="chip line selected">IBD ✓</span>
      <span class="chip line">NASH</span>
      <span class="chip line">Microbiome</span>
      <span class="chip line">Fibrosis</span>
      <span class="chip line">IL-23 Pathway</span>
      <button class="chip-add">+ Add custom</button>
    </div>
  </label>
</div>
```

---

#### 2.2a.3 — Pipeline Assets drawer

**Drawer ID:** `pipeline`. **Recommended.** Maps to checklist item 3.

**Body fields:**
- Drug rows: name (with autocomplete from a stubbed drug list), status (pipeline / marketed / discontinued), indication (text).
- "Add row" button.
- **Inline help on autocomplete:** when the user types "semaglutide," show a popover *"Semaglutide is also known as Ozempic, Wegovy (brand) — same molecule. We'll link them automatically."* This makes the ontology layer visible.

**Validation:** None — empty list allowed (recommended, not required). Saving empty just closes the drawer without marking complete; saving with at least one drug marks it complete.

**Persistence:** `client-[id]-pipeline` → array of `{name, status, indication, rxnorm_id (stubbed)}`.

**Empty-state surface:** when this drawer is empty, the Intel Feed (§2.4) shows an inline notice: *"Own-company flagging is disabled. Add pipeline assets in the GSK workspace setup →"* with a link back here.

```html
<div class="drawer-body">
  <p class="muted">Drugs your client owns — pipeline or marketed. We resolve brand names against the drug ontology automatically.</p>
  <div class="pipeline-rows">
    <div class="pipe-row">
      <div class="autocomplete">
        <input placeholder="e.g. semaglutide, risankizumab">
        <!-- autocomplete dropdown appears here on type -->
      </div>
      <select>
        <option>Pipeline</option><option>Marketed</option><option>Discontinued</option>
      </select>
      <input placeholder="Indication (e.g. MASH)">
      <button class="rm">✕</button>
    </div>
  </div>
  <button class="link" onclick="addPipelineRow()">+ Add another asset</button>
</div>
```

---

#### 2.2a.4 — Competitors drawer

**Drawer ID:** `competitors`. **Recommended.** Maps to checklist item 4.

**Body fields:**
- Two sub-sections in one drawer:
  - *Competitor companies* — chip picker with autocomplete from the companies index (AbbVie, Janssen, Bristol Myers Squibb, Eli Lilly, Merck, Pfizer, Novartis, Roche, Sanofi …).
  - *Competitor drugs* — same row pattern as Pipeline drawer, minus the "status" field.
- A small note at the top: *"Competitors are client-relative — what's a competitor for this client may not be for another. This list belongs to this workspace only."*

**Validation:** None — empty list allowed.

**Persistence:** `client-[id]-competitor-companies` + `client-[id]-competitor-drugs`.

**Empty-state surface:** when both empty, the Intel Feed shows *"Competitive flagging is disabled. Add competitors in the workspace setup →"*

```html
<div class="drawer-body">
  <div class="note-box subtle">Competitors are client-relative — this list belongs to this workspace only.</div>

  <label class="block">
    <span class="lab">Competitor companies</span>
    <div class="chips-edit">
      <span class="chip line selected">AbbVie ✓ <span class="x">✕</span></span>
      <span class="chip line selected">Janssen ✓ <span class="x">✕</span></span>
      <button class="chip-add">+ Add company</button>
    </div>
  </label>

  <label class="block">
    <span class="lab">Competitor drugs</span>
    <small class="muted">Track specific molecules — useful when you care about a drug but not the whole company.</small>
    <div class="comp-drug-rows">
      <div class="cd-row">
        <div class="autocomplete">
          <input placeholder="e.g. risankizumab (Skyrizi)">
        </div>
        <input placeholder="Notes (optional)">
        <button class="rm">✕</button>
      </div>
    </div>
    <button class="link" onclick="addCompDrugRow()">+ Add another drug</button>
  </label>
</div>
```

---

#### 2.2a.5 — Priority KOLs drawer

**Drawer ID:** `kols`. **Recommended.** Maps to checklist item 5.

**Body fields:**
- Two tabs: *Search & Add* (primary) and *Bulk Import* (secondary).
- **Search & Add tab:** search input → list of KOL match cards (avatar, name, affiliation, influence score), each with "+ Add" button. Selected KOLs accumulate as chip-rows at the top with "remove" and a match-confidence pill (High / Medium / Low Match) derived from the entity-resolution layer.
- **Bulk Import tab:** textarea for pasting names (one per line), "Resolve" button → table of candidates per name (Name as entered → Closest match in directory → Confidence → action). Unmatched rows are flagged for follow-up.

**Validation:** None — empty list allowed. Saving with at least one KOL marks complete.

**Persistence:** `client-[id]-priority-kols` → array of `{person_id, name, match_confidence, match_status}`.

```html
<div class="drawer-body">
  <nav class="sub-tabs">
    <button class="sub-tab act">Search & Add</button>
    <button class="sub-tab">Bulk Import</button>
  </nav>

  <div class="selected-kols">
    <span class="kchip"><div class="av xs">SC</div> Dr. Sarah Chen
      <span class="chip own xs">High Match</span><span class="x">✕</span></span>
    <span class="kchip"><div class="av xs">SG</div> Dr. Subrata Ghosh
      <span class="chip own xs">High Match</span><span class="x">✕</span></span>
  </div>

  <div class="search">
    <input placeholder="Search by name, institution, or expertise…">
  </div>

  <div class="kol-results">
    <div class="kr-row">
      <div class="av">BV</div>
      <div><b>Dr. Bram Vermeire</b><small>KU Leuven · IBD · IL-23</small></div>
      <span class="influence-mini"><b>88</b><small>Very High</small></span>
      <button class="btn-secondary sm" onclick="addKol('vermeire')">+ Add</button>
    </div>
    <!-- repeat -->
  </div>
</div>
```

---

#### 2.2a.6 — Strategic Keywords & Topics drawer

**Drawer ID:** `keywords`. **Recommended.** Maps to checklist item 6.

**Body fields:**
- Free-form chip editor for keywords (paste comma-separated or enter one at a time).
- A "Suggested for your TAs" section that surfaces topic keywords from the topic matrix based on what's been configured in the TA drawer (e.g. once IBD is selected, suggest "IL-23 inhibitors", "JAK safety", "treat-to-target") with a one-click "Add all suggested →" button.

**Validation:** None.

**Persistence:** `client-[id]-keywords` → array of strings.

```html
<div class="drawer-body">
  <label class="block">
    <span class="lab">Your keywords</span>
    <small class="muted">These boost relevance scoring on matching abstracts in the Intel Feed.</small>
    <div class="chips-edit">
      <span class="chip line selected">IL-23 inhibitors ✕</span>
      <span class="chip line selected">fibrosis regression ✕</span>
      <button class="chip-add">+ Add keyword</button>
    </div>
  </label>

  <div class="suggested-keywords">
    <div class="sk-hd">
      <b>Suggested for your TAs</b>
      <button class="link">Add all →</button>
    </div>
    <div class="chips-edit">
      <span class="chip soft">+ JAK safety</span>
      <span class="chip soft">+ treat-to-target</span>
      <span class="chip soft">+ biomarkers</span>
      <span class="chip soft">+ histologic remission</span>
      <span class="chip soft">+ real world evidence</span>
    </div>
  </div>
</div>
```

---

### 2.2b Re-entry from State B

In State B, the user can re-open any drawer from three locations — no new page required:

- **Strategic Priorities** section header → "Manage priorities →" link (already in §2.2 State B HTML) opens the `priorities` drawer.
- **Other five drawers** → each panel on the Client Workspace overview that shows configured context (Therapeutic Areas in the page header chips, Pipeline assets and Competitors when these blocks are added, KOLs via the Priority KOLs entry on the KOL Directory page) has an inline "Edit →" affordance that opens the corresponding drawer.
- **Prioritization Settings page** (§2.8) — the existing route. Already covers the weights drawer.

The drawers themselves (§2.2a) are the only UI; entry points are sprinkled where the configured data is visible. No standalone "Client Settings" page is needed for the prototype.

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
    <h2>Digestive Disease Week 2026 <span class="chip soft">Planning</span></h2>
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

<div class="panel">
  <div class="panel-h">Recent Insights <span class="demo-badge"><i></i>SEEDED</span>
    <a class="more" href="#/clients/gsk/congresses/ddw-2026/feed">VIEW ALL ›</a></div>
  <div class="panel-b">
    <div class="insight">
      <div class="iv av sm">SG</div>
      <div class="ib">
        <div class="ih"><b>Dr. Ghosh shared encouraging Phase 2b data on novel IL-23</b>
          <small>· May 2, 2026</small></div>
        <p>Risankizumab head-to-head with ustekinumab shows superior endoscopic improvement at week 52.</p>
      </div>
    </div>
    <div class="insight">
      <div class="iv soft">AV</div>
      <div class="ib">
        <div class="ih"><b>AbbVie presentation highlighted strong real-world data</b>
          <small>· May 2, 2026</small></div>
        <p>5-year safety registry data positions upadacitinib favorably vs prior JAKi concerns.</p>
      </div>
    </div>
    <div class="insight">
      <div class="iv soft">GI</div>
      <div class="ib">
        <div class="ih"><b>Emerging interest in IL-23 inhibitors for Crohn's</b>
          <small>· May 1, 2026</small></div>
        <p>Three abstracts position IL-23 selectivity as next-line for biologic-refractory CD patients.</p>
      </div>
    </div>
  </div>
</div>
```

---

### 2.3.1 Topic and KOL row click targets

Two cross-page click contracts to lock down:

- A row in **Priority Breakdown** (e.g., clicking on "IBD" or "Clinical Trials") routes to the **Topic Landscape Brief (§2.14)** filtered to that topic.
- A row in **Top KOLs to Engage** routes to that **KOL's Dossier (§2.7)**, with the active congress (DDW 2026) as the dossier's congress context.

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
- **"+ Add KOL"** button opens the **Priority KOLs drawer (§2.2a.5)** — same flow as during workspace setup, just reached from a different surface.
- **Export** button → opens the shared Export modal (§1.6).

**Things to mock:**
- **9 KOLs** including Sarah Chen, MD PhD (UHN Toronto, IBD/IL-23 — the primary dossier in §2.7), plus Ghosh, Vermeire, Sandborn, Feagan, Colombel, Antonsen, Reinisch (IBD) and 2 MASH KOLs.
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

> **Deliberate design call (resolves a v1 spec/flow inconsistency).** The Step 1 UX flow doc proposed autosave-with-debounced-toast on this page. We override that: an explicit "Save Changes" button is correct here because saving has *consequences* — it queues a recalculation of every ranked surface. Surfacing that explicitly is better than silent autosave. The sliders still rebalance live and the Impact Preview updates live; only the *commit* is gated.

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
    <div class="panel-h">Communication & Collaboration</div>
    <div class="panel-b">
      <div class="pref-grp">
        <label>Preferred channels</label>
        <div class="checks-row">
          <label><input type="checkbox" checked> ✉ Email</label>
          <label><input type="checkbox" checked> 💬 In-App</label>
          <label><input type="checkbox"> # Slack</label>
          <label><input type="checkbox"> 🟦 Microsoft Teams</label>
        </div>
      </div>
      <div class="pref-grp">
        <label>Meeting availability</label>
        <div class="checks-row">
          <label><input type="checkbox" checked> 👤 In-Person</label>
          <label><input type="checkbox" checked> 🖥 Virtual</label>
          <label><input type="checkbox"> 🌙 Evenings</label>
          <label><input type="checkbox"> 📅 Weekends</label>
        </div>
      </div>
      <small class="muted">Used when teammates invite you to KOL meetings or congress briefings.</small>
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

### 2.11 Cross-screen edge-case notices

Three pieces of polish that span multiple screens. None of them are pages — they're conditional inline elements that surface whenever Step 1 configuration is incomplete on a workspace whose pages are being viewed.

**Notice A — Own-company flagging disabled.** Renders inline on the Intel Feed (§2.4), above the filter bar, when `client-[id]-pipeline` is empty. Copy:
> *Own-company flagging is disabled — no pipeline assets configured. <a>Add pipeline assets →</a>*

The link opens the Pipeline drawer (§2.2a.3). Visually: amber-bordered notice strip with an info icon, sits above filters but below the page header.

**Notice B — Competitive flagging disabled.** Same pattern, when both `client-[id]-competitor-companies` and `client-[id]-competitor-drugs` are empty. Copy:
> *Competitive flagging is disabled — no competitors configured. <a>Add competitors →</a>*

**Notice C — Default workspace switcher (topbar context).** The topbar's congress pill (`DDW 2026 ▾`) is a dropdown showing the active congress for the current workspace. When the user has multiple workspaces (always true for agency users), it groups options by client and shows the active workspace name above the divider. Switching workspaces routes to that workspace's overview page; the topbar reflects the new active client. Persistence: `user-default-workspace` in `localStorage`. Used so the topbar feels live across the prototype rather than statically pinned to GSK.

```html
<!-- Notice A / B render at the top of Intel Feed when conditions apply -->
<div class="config-notice">
  <span class="ic">ⓘ</span>
  <span>Own-company flagging is disabled — no pipeline assets configured.</span>
  <a class="link" onclick="openDrawerFor('gsk','pipeline')">Add pipeline assets →</a>
</div>

<!-- Topbar workspace switcher (dropdown contents) -->
<div class="ws-switcher">
  <div class="ws-sw-hd">Active workspace</div>
  <div class="ws-sw-current"><div class="ctag xs">GSK</div> GSK <small>· DDW 2026</small></div>
  <div class="ws-sw-divider"></div>
  <div class="ws-sw-grp">SWITCH TO</div>
  <a class="ws-sw-row" href="#/clients/merck"><div class="ctag xs">MRK</div> Merck</a>
  <a class="ws-sw-row" href="#/clients/abbvie"><div class="ctag xs">ABV</div> AbbVie <span class="chip soft xs">Setting up</span></a>
  <!-- … -->
</div>
```

---

### 2.12 Ask Anything — `#/clients/gsk/congresses/ddw-2026/ask` (v1.2)

**Purpose.** Conversational retrieval grounded entirely in this congress's intelligence — the screen that dramatizes the AI value most directly to stakeholders. Reached by the user typing in the topbar search input on any congress-scoped page; submit-on-enter routes here.

**Features to implement:**
- Large query box at top (carries the typed query from the topbar).
- *Try one of these* suggestion chips for common queries: *"Which KOLs discussed fibrosis regression?"*, *"What were the major competitor themes?"*, *"What changed since DDW 2025?"*, *"Show all captures on IL-23 inhibitors."*
- On submit (after a 1.5s simulated streaming delay): synthesized answer with **inline citation markers** (`¹ ² ³`) that link to source chips below.
- **Sources panel** showing source cards: each source has an icon (abstract / voice note / KOL dossier / captured insight), title, sub-line, and a clickable link to the source.
- *Refine your answer* helper: smaller chips like *"focus on competitors"*, *"limit to plenary sessions"*, *"explain to a non-specialist"*.
- *History* sidebar (right) showing recent queries — click to re-run.
- **Streaming animation:** simulate by rendering one word every ~30ms (typewriter effect on the answer paragraphs); citation markers fade in as referenced. This is the polish moment that sells the AI feel.
- Topbar search input is the entry — typing and pressing Enter routes here with the query in the URL hash (`?q=...`).

**Things to mock:**
- The default suggested query is *"Which KOLs discussed fibrosis regression as a regulatory endpoint?"* — pre-load this on first visit.
- The mock answer is the same multi-paragraph response from the deck mockup (Marchetti / Nguyen / Chen on fibrosis regression).
- 3 sources tied to the existing mock data: the ESSENCE abstract (§3 `abstracts`), Nguyen voice note, Chen voice note.
- 5 entries in the history sidebar for visual depth.

```html
<div class="ph">
  <div class="eyebrow">Synthesis · Retrieval</div>
  <h2>Ask anything</h2>
  <p>Conversational retrieval grounded in DDW 2026 intelligence — every answer traces back to its sources.</p>
</div>

<div class="cols-ask">
  <div class="ask-main">
    <div class="askbar">
      <svg class="ic" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5Z"/></svg>
      <input value="Which KOLs discussed fibrosis regression as a regulatory endpoint?"
             onkeydown="if(event.key==='Enter')runAsk()">
      <button class="btn-primary" onclick="runAsk()">Ask →</button>
    </div>

    <div class="suggest">
      <span class="s" onclick="askPreset(this)">What were the major competitor themes at DDW 2026?</span>
      <span class="s" onclick="askPreset(this)">Show all captures on IL-23 inhibitors</span>
      <span class="s" onclick="askPreset(this)">What changed since DDW 2025?</span>
    </div>

    <div class="qline"><span class="q">Q</span>
      <span id="qtext">Which KOLs discussed fibrosis regression as a regulatory endpoint?</span></div>

    <div class="answer">
      <div class="alab"><span class="pulse"></span>Synthesized answer</div>
      <div class="answer-body" id="answer">
        <p>Three KOLs on your meeting list addressed fibrosis regression as a potential regulatory endpoint at DDW 2026. <strong>Dr. L. Marchetti</strong> (Humanitas) presented the plenary ESSENCE data showing biopsy-confirmed regression with semaglutide and argued NITs are nearing endpoint acceptability<a class="cite" href="#src-1">¹</a>. In a hallway debrief, <strong>Dr. P. Nguyen</strong> (Mount Sinai) emphasized FIB-4 cut-off standardization as the remaining barrier<a class="cite" href="#src-2">²</a>.</p>
        <p>Notably, <strong>Dr. Sarah Chen</strong> — primarily an IBD voice — raised the parallel between transmural healing in IBD and fibrosis regression in MASH as endpoints regulators are warming to<a class="cite" href="#src-3">³</a>. Sentiment across all three was cautiously positive, with the consistent caveat that <strong>head-to-head and standardization data</strong> remain the gating evidence gaps.</p>
      </div>

      <div class="refine">
        <span class="rlab">REFINE</span>
        <button class="rchip">+ Focus on competitors</button>
        <button class="rchip">+ Limit to plenary sessions</button>
        <button class="rchip">+ Explain to a non-specialist</button>
      </div>

      <div class="sources">
        <div class="slab">SOURCES · 3</div>
        <div class="src-grid">
          <a id="src-1" class="src-card" href="#/abstracts/lba-essence">
            <span class="ic"><svg viewBox="0 0 24 24"><path d="M4 4h11l5 5v11H4z"/><path d="M14 4v6h6"/></svg></span>
            <div><b>Abstract · ESSENCE</b><small>NCT04822181 · Plenary</small></div></a>
          <a id="src-2" class="src-card" href="#/captures/v-217">
            <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"/></svg></span>
            <div><b>Voice note · Nguyen</b><small>Hall C · Fri</small></div></a>
          <a id="src-3" class="src-card" href="#/captures/v-098">
            <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"/></svg></span>
            <div><b>Voice note · Chen</b><small>DDW 2025 · Archive</small></div></a>
        </div>
      </div>
    </div>
  </div>

  <aside class="ask-history">
    <div class="panel">
      <div class="panel-h">History</div>
      <div class="panel-b ah">
        <a class="h-row act"><b>Fibrosis regression endpoint</b><small>just now · 3 sources</small></a>
        <a class="h-row"><b>JAKi safety RWD signals</b><small>1h ago · 7 sources</small></a>
        <a class="h-row"><b>IL-23 head-to-head status</b><small>3h ago · 4 sources</small></a>
        <a class="h-row"><b>Competitor symposium agenda</b><small>yesterday · 12 sources</small></a>
        <a class="h-row"><b>Changes since DDW 2025</b><small>2 days ago · 15 sources</small></a>
      </div>
    </div>
  </aside>
</div>
```

---

### 2.13 Meeting List — `#/clients/gsk/congresses/ddw-2026/meeting-list` (v1.2)

**Purpose.** The user's curated set of KOLs to meet and sessions/abstracts to attend at this congress. The Step 1 doc explicitly names this as one of two pre-congress deliverables ("a curated meeting list with a personalized dossier attached to each KOL").

Currently the "+ Add to meeting list" button appears throughout the spec (Intel Feed, Abstract Detail, KOL Directory, KOL Dossier) but the list itself was never specified. This screen is where it lives.

**Features to implement:**
- Two-tab view at top: **KOLs (12)** and **Sessions & Abstracts (8)** with counts. KOLs tab active by default.
- **KOLs tab:** card-grid view of KOLs the user has tagged for meetings.
  - Each card: avatar, name, affiliation, tier/sentiment pills, count of their DDW sessions, a "Schedule meeting" button, an "Open dossier" link, and a "Remove from list" (✕).
  - Sort: by Tier · Influence · Day-of-week the KOL is present.
  - Bulk actions: *Export briefing pack* (opens the shared Export modal, §1.6).
- **Sessions & Abstracts tab:** chronological day-by-day schedule of saved sessions/abstracts, organized as a day-block timeline. Conflicts (overlapping sessions) flagged with an amber edge stripe.
- Empty states for both tabs with a call to action: *"Browse the Intel Feed to add abstracts to your list →"* / *"Search the KOL Directory →"*.
- **Print / PDF export** as the most prominent action — this is a deliverable an MSL prints and walks the floor with.

**Things to mock:**
- 12 KOLs in the list — re-use Sarah Chen, Ghosh, Vermeire, Sandborn, Feagan, Colombel, plus 6 others from the directory.
- 8 sessions/abstracts (the top-priority items from the Intel Feed).
- One pair of conflict-flagged sessions on the Fri 11:30 slot.

```html
<div class="crumb">Client Workspaces › GSK › DDW 2026 › <b>Meeting List</b></div>

<div class="ph">
  <div class="eyebrow">Pre-congress deliverable</div>
  <h2>Your DDW 2026 meeting list</h2>
  <p>Tagged KOLs and prioritized sessions. Print this and walk the floor — or export the full briefing pack.</p>
  <div class="ph-actions">
    <button class="btn-secondary" onclick="openExportModal('meeting-list')">⬇ Export briefing pack</button>
    <button class="btn-secondary">🖨 Print</button>
    <button class="btn-primary">＋ Add to list</button>
  </div>
</div>

<nav class="sub-tabs">
  <button class="sub-tab act">KOLs (12)</button>
  <button class="sub-tab">Sessions & Abstracts (8)</button>
</nav>

<div class="filters compact">
  <span class="fl">SORT</span>
  <span class="fchip act">Tier <span class="x">✕</span></span>
  <span class="fchip">Influence</span>
  <span class="fchip">Day at DDW</span>
</div>

<div class="ml-grid">
  <div class="ml-card">
    <div class="ml-top">
      <div class="av lg">SC</div>
      <div>
        <b>Dr. Sarah Chen, MD PhD</b>
        <div class="meta">University Health Network · Toronto</div>
        <div class="tags">
          <span class="chip own xs">Tier 1</span>
          <span class="chip soft xs">Positive sentiment</span>
        </div>
      </div>
      <button class="ml-rm" title="Remove from list">✕</button>
    </div>
    <div class="ml-slate">
      <small>3 sessions at DDW 2026 · earliest Thu 9:00</small>
    </div>
    <div class="ml-actions">
      <button class="btn-primary sm">📅 Schedule meeting</button>
      <a class="btn-secondary sm" href="#/kols/sarah-chen">Open dossier →</a>
    </div>
  </div>

  <div class="ml-card">
    <div class="ml-top">
      <div class="av lg">SG</div>
      <div>
        <b>Dr. Subrata Ghosh, MD PhD</b>
        <div class="meta">University of Chicago</div>
        <div class="tags">
          <span class="chip own xs">Tier 1</span>
          <span class="chip soft xs">Repeat speaker</span>
        </div>
      </div>
      <button class="ml-rm" title="Remove from list">✕</button>
    </div>
    <div class="ml-slate">
      <small>2 sessions at DDW 2026 · earliest Fri 11:30</small>
    </div>
    <div class="ml-actions">
      <button class="btn-primary sm">📅 Schedule meeting</button>
      <a class="btn-secondary sm" href="#/kols/subrata-ghosh">Open dossier →</a>
    </div>
  </div>
  <!-- 10 more KOL cards -->
</div>
```

Sessions & Abstracts tab uses the same `.slot` component from the KOL Dossier (§2.7) grouped under day headers (`THU 16 · FRI 17 · SAT 18 · SUN 19`), with an inline conflict notice when two saved items overlap.

---

### 2.14 Topic Landscape Brief — `#/clients/gsk/congresses/ddw-2026/topics/[topic]` (v1.2)

**Purpose.** A per-topic pre-congress brief: "everything DDW 2026 is presenting on IL-23 in UC, in one view." The DDW reference explicitly names *topic landscape briefs* as a pre-congress deliverable. The Step 1 doc lists them in the pre-congress brief outputs ("Export topic landscape briefs (one per priority topic)").

Reached from: the Priority Breakdown bars on the Congress Dashboard (§2.3.1), or the topic chip on any abstract card / detail.

**Features to implement:**
- Header: topic name, signal pill (Competitive / Own / Both), keyword list, "Configure topic →" link to the Strategic Keywords drawer (§2.2a.6), and an Export button (§1.6).
- 4 metric tiles: *Total abstracts in this topic*, *Late-breaking*, *Plenaries*, *Avg. priority score*.
- **Synthesis panel** (AI-generated, badged): 4–6 sentence narrative of what's emerging on this topic at this congress, with citation markers linking to abstracts. Same streaming animation as Ask Anything.
- **Evidence gaps panel:** bullet list of what's *missing* from the topic at this congress, sourced from the topic's `evidence_gaps` field in §3 mock data.
- **Abstracts list:** all abstracts tagged to this topic, sorted by priority. Reuses the `.acard` component from §2.4 — same visual, same hover actions.
- **KOLs in this topic:** horizontal scroll of KOL avatars/chips for people presenting on this topic, each linking to their dossier.
- **Timeline (optional, v1.2 lite):** show this topic's presentations laid out across the congress days as a small visualization.

**Things to mock:**
- Default topic: *IL-23 inhibitors — positioning* (matches `topics[0]` in §3).
- 5 abstracts tagged to it (reuse risankizumab, ustekinumab, mirikizumab, guselkumab abstracts from §2.4's Intel Feed mock list).
- 4 KOLs (Chen, Ghosh, Vermeire, Sandborn).
- 3 evidence gaps (sourced from the DDW priority matrix in the project's DDW build reference).

```html
<a class="back-link" href="#/clients/gsk/congresses/ddw-2026">← Back to DDW 2026</a>

<div class="topic-hd">
  <div>
    <div class="eyebrow">Topic landscape · DDW 2026</div>
    <h2>IL-23 inhibitors — positioning <span class="chip comp">COMPETITIVE</span></h2>
    <div class="topic-keywords">
      <span class="chip soft">IL-23</span><span class="chip soft">risankizumab</span>
      <span class="chip soft">mirikizumab</span><span class="chip soft">guselkumab</span>
      <span class="chip soft">selectivity</span><span class="chip soft">class positioning</span>
      <a class="link sm" onclick="openDrawerFor('gsk','keywords')">Configure topic →</a>
    </div>
  </div>
  <div class="hd-actions">
    <button class="btn-secondary" onclick="openExportModal('topic-brief')">⬇ Export brief</button>
    <button class="btn-primary">＋ Add to meeting list</button>
  </div>
</div>

<div class="metrics">
  <div class="metric"><div class="lab">Abstracts in this topic</div><div class="num">41</div></div>
  <div class="metric"><div class="lab">Late-breaking</div><div class="num">3</div></div>
  <div class="metric"><div class="lab">Plenaries</div><div class="num">2</div></div>
  <div class="metric"><div class="lab">Avg. priority</div><div class="num">82</div></div>
</div>

<div class="cols-2">
  <div class="panel">
    <div class="panel-h">Synthesis <span class="ai-tag">AI-GENERATED</span></div>
    <div class="panel-b">
      <p>IL-23 positioning at DDW 2026 is dominated by head-to-head readouts. <strong>SEQUENCE-UC</strong> (risankizumab vs ustekinumab) is the late-breaking centerpiece<a class="cite">¹</a>, with three additional Phase 3 selectivity studies clustered around it<a class="cite">²</a>. Class differentiation by selectivity (IL-23 vs IL-12/23) is emerging as the central framing, replacing the earlier mechanism-of-action narrative<a class="cite">³</a>.</p>
      <p>Evidence pressure on biomarker-predicted response is increasing — two abstracts attempt to define a response biomarker but neither reaches clinical-utility threshold. Sentiment from KOLs in our list trends positive on the class but skeptical on guideline-readiness without prospective H2H trials.</p>
    </div>
  </div>
  <div class="panel">
    <div class="panel-h">Evidence gaps</div>
    <div class="panel-b gaps">
      <div class="gap">
        <span class="g-ic">!</span>
        <div><b>No biomarker predicting IL-23 response</b>
          <small>Two attempts at DDW 2026; neither reaches clinical-utility threshold.</small></div>
      </div>
      <div class="gap">
        <span class="g-ic">!</span>
        <div><b>No prospective H2H IL-23 vs IL-12/23 RCT</b>
          <small>SEQUENCE-UC is the closest; designed as a non-inferiority study.</small></div>
      </div>
      <div class="gap">
        <span class="g-ic">!</span>
        <div><b>Long-term durability beyond 52 weeks</b>
          <small>No published data past week 52 across the class.</small></div>
      </div>
    </div>
  </div>
</div>

<div class="sec-title">Abstracts in this topic <small class="muted">(5 of 41 shown)</small>
  <a class="more" href="#/clients/gsk/congresses/ddw-2026/feed?topic=il-23">VIEW ALL ›</a>
  <span class="ln"></span></div>

<div class="acards">
  <!-- reuse 5 abstract cards from §2.4 filtered to IL-23 -->
</div>

<div class="sec-title">KOLs presenting on this topic <span class="ln"></span></div>
<div class="topic-kols">
  <a class="tk" href="#/kols/sarah-chen"><div class="av lg">SC</div>
    <b>Dr. Sarah Chen</b><small>3 sessions</small></a>
  <a class="tk" href="#/kols/subrata-ghosh"><div class="av lg">SG</div>
    <b>Dr. Subrata Ghosh</b><small>2 sessions</small></a>
  <a class="tk" href="#/kols/vermeire"><div class="av lg">BV</div>
    <b>Dr. Bram Vermeire</b><small>2 sessions</small></a>
  <a class="tk" href="#/kols/sandborn"><div class="av lg">WS</div>
    <b>Dr. William Sandborn</b><small>1 session</small></a>
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
    { id: "gsk", name: "GSK", state: "configured", congresses: 6,
      tas: ["Gastroenterology","Respiratory","Oncology","Immunology"] },
    { id: "merck", name: "Merck", state: "configured", congresses: 2 },
    { id: "boehringer", name: "Boehringer Ingelheim", state: "configured", congresses: 2 },
    { id: "astrazeneca", name: "AstraZeneca", state: "configured", congresses: 1 },
    { id: "novartis", name: "Novartis", state: "configured", congresses: 1 },
    { id: "pfizer", name: "Pfizer", state: "configured", congresses: 1 },
    /* v1.2 — empty-setup state demo workspace */
    { id: "abbvie", name: "AbbVie", state: "empty-setup", congresses: 0,
      tas: [], created: "2 days ago" }
  ],

  strategicPriorities: [
    { rank: 1, text: "Advance leadership in IBD and GI inflammation", level: "high" },
    { rank: 2, text: "Expand respiratory portfolio and life cycle management", level: "high" },
    { rank: 3, text: "Strengthen oncology pipeline positioning", level: "medium" },
    { rank: 4, text: "Identify next-gen immunology opportunities", level: "medium" }
  ],

  /* v1.2 — Sarah Chen moved into the KOL list at index 0 to match her role
     as primary dossier (§2.7) and Intel Feed top author (§2.4) */
  kols: [
    { id: "sarah-chen", name: "Dr. Sarah Chen", credentials: "MD PhD",
      affiliation: "University Health Network", country: "Canada",
      tier: 1, sentiment: "positive", focus: ["IBD","IL-23","UC"],
      influence: 92, pubs: 98, citations: 6210, initials: "SC", match: "high" },
    { id: "subrata-ghosh", name: "Dr. Subrata Ghosh", credentials: "MD PhD",
      affiliation: "University of Chicago", country: "USA",
      focus: ["IBD","Crohn's Disease","IL-23 Pathway"], influence: 92,
      pubs: 125, citations: 8432, initials: "SG", match: "high" },
    /* Vermeire, Sandborn, Feagan, Colombel, Antonsen, Reinisch, plus 2 MASH KOLs */
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
    /* v1.2 — referenced by Ask Anything (§2.12) as source 1 */
    { id: "lba-essence", title: "Fibrosis regression with semaglutide in MASH: 72-week biopsy-confirmed results from ESSENCE",
      signal: "own", session: "plenary", topic: "MASH",
      authorId: "marchetti", nct: "NCT04822181", priority: 91,
      schedule: "Sat · Plenary · Main Hall" },
    /* 10+ more matching the mix in 2.4 */
  ],

  /* v1.2 — captures referenced by Ask Anything and KOL Dossier */
  captures: [
    { id: "v-217", type: "voice", duration: "1:48", author: "P. Nguyen",
      location: "Hall C", congress: "ddw-2026", date: "2026-05-05",
      transcript: "FIB-4 cut-off standardization is the remaining barrier…", topic: "MASH" },
    { id: "v-098", type: "voice", duration: "2:14", author: "S. Chen",
      location: "Hallway debrief", congress: "ddw-2025", date: "2025-05-04",
      transcript: "Transmural healing in IBD as parallel to fibrosis regression…", topic: "IBD" }
  ],

  /* v1.2 — meeting list scoped per congress */
  meetingList: {
    "ddw-2026": {
      kols: ["sarah-chen","subrata-ghosh","vermeire","sandborn","feagan","colombel",
             /* 6 more */],
      items: ["lba-101","lba-essence","lba-jaki-rwd", /* 5 more */]
    }
  },

  /* v1.2 — topics now carry evidence_gaps for Topic Landscape Brief (§2.14) */
  topics: [
    { id: "il-23", name: "IL-23 inhibitors — positioning",
      signal: "competitive", count: 41, coverage: 88,
      keywords: ["IL-23","risankizumab","mirikizumab","guselkumab","selectivity","class positioning"],
      evidence_gaps: [
        "No biomarker predicting IL-23 response",
        "No prospective H2H IL-23 vs IL-12/23 RCT",
        "Long-term durability beyond 52 weeks"
      ] },
    { id: "mash-nit", name: "MASH — fibrosis regression & NITs",
      signal: "both", count: 36, coverage: 74,
      keywords: ["MASH","MASLD","FIB-4","ELF score","MRI-PDFF","fibrosis regression"],
      evidence_gaps: [
        "Regulatory acceptance of NITs as primary endpoints",
        "Cut-off standardization across imaging modalities"
      ] },
    { id: "jaki-safety", name: "JAK inhibitors — safety & RWD",
      signal: "competitive", count: 29, coverage: 62,
      keywords: ["JAK inhibitor","upadacitinib","filgotinib","MACE","VTE","malignancy"],
      evidence_gaps: ["Long-term CV safety >5 years","JAKi vs biologic patient selection"] }
  ],

  /* v1.2 — congress status uses the §1.5 state machine */
  congresses: [
    { id: "ddw-2026", name: "Digestive Disease Week 2026", acronym: "DDW", year: 2026,
      dates: "May 3–6, 2026", city: "San Diego, CA",
      status: "planning", client: "gsk", inDays: 41, priorityCount: 312 },
    /* ASCO, ATS, ESMO, ACG, AAN */
  ],

  /* v1.2 — Ask Anything pre-populated history */
  askHistory: [
    { q: "Fibrosis regression endpoint", at: "just now", sources: 3, active: true },
    { q: "JAKi safety RWD signals", at: "1h ago", sources: 7 },
    { q: "IL-23 head-to-head status", at: "3h ago", sources: 4 },
    { q: "Competitor symposium agenda", at: "yesterday", sources: 12 },
    { q: "Changes since DDW 2025", at: "2 days ago", sources: 15 }
  ]
};
```

---

## 4. Build order

**Phase A — Shell + entry surfaces.** Build the `index.html` shell, `app.css` with the design system from Section 1, hash routing, the **workspace-aware sidebar (§1.4)**, and the navigation. Then Agency Dashboard, the Create-New-Client modal (§2.1a), Client Workspace in **both states** (§2.2 A and B) with the gating logic on "+ New Congress", and Congress Dashboard. End-to-end navigation works, and a newly created client workspace correctly lands in State A.

**Phase B — The value layer.** Intel Feed (with working filters), Abstract Detail. **Topic Landscape Brief (§2.14)** reachable from the Congress Dashboard's Priority Breakdown bars. The full demo arc works: land on Agency Dashboard → drill into GSK → into DDW 2026 → browse the feed → open an abstract → drill into a topic → return.

**Phase C — KOL surfaces + Meeting List.** KOL Directory, KOL Dossier, and **Meeting List (§2.13)**. The dossier links from abstract authors and from the directory; the meeting list shows tagged KOLs and saved abstracts.

**Phase D — Strategic context configuration.** The six drawers in §2.2a, wired so each opens from the State A checklist, persists to `localStorage`, and ticks the corresponding checklist item on save. Required drawers (Priorities + TAs) drive the gating; once both have valid content, the "+ New Congress" button enables.

**Phase E — Configuration, creation, retrieval.** Prioritization Settings (sliders fully interactive, deliberate explicit Save button — see note in §2.8), User Profile (§2.9 with the corrected layout + Communication & Availability panels), Congress Creation flow with mock ingestion progress, and **Ask Anything (§2.12)** wired to the topbar search.

**Phase F — Transitions, banners, edge cases.** State A → State B transition with the one-time "You're ready" banner. Flagging-disabled notices (§2.11 A and B) on the Intel Feed when relevant. Topbar workspace switcher (§2.11 C). **Shared Export modal (§1.6)** triggered from every Export button across the app. Debug reset helper to replay the empty-setup → configured flow during the stakeholder demo.

---

## 5. Definition of done

- Every nav item routes to a working page; back-buttons and breadcrumbs work.
- The full demo arc — Agency Dashboard → GSK Client Workspace → DDW 2026 Congress Dashboard → Intel Feed → an abstract → its KOL → Prioritization Settings — runs without dead ends.
- **A second demo arc — Agency Dashboard → "+ Create New Client Workspace" → new workspace in State A → fill the Priorities drawer + TAs drawer → State B transition with the "You're ready" banner — runs cleanly.**
- **A third demo arc — Congress Dashboard → click an IL-23 topic bar → Topic Landscape Brief → click an abstract → KOL Dossier → add to meeting list → open Meeting List → export — runs cleanly.**
- **A fourth demo arc — Topbar search ("which KOLs discussed fibrosis regression…") → Ask Anything streams a synthesized answer → click a source chip → land on the cited capture/abstract — runs cleanly.**
- The Create-New-Client modal validates duplicate names and routes to the new workspace's State A.
- All six Strategic Context drawers open from the checklist, persist progress to `localStorage`, and tick the checklist item on save.
- The "+ New Congress" button is disabled in State A and enabled in State B; hover tooltip on the disabled state explains why.
- The sidebar nav reflects the active client/congress; switching workspaces updates the sidebar paths and the active label.
- Filter chips on the Intel Feed actually filter (substring match against title/topic is enough).
- Prioritization sliders move and the bottom impact-preview counts respond.
- Congress Creation simulates ingestion progress and lands on the new Congress Dashboard.
- Flagging-disabled notices appear on the Intel Feed when pipeline / competitors are empty for the active client.
- The topbar workspace switcher shows the user's workspaces and routes between them; the active workspace persists across reloads.
- The shared Export modal opens from every Export button and produces a fake "✓ Exported" toast.
- Ask Anything streams its answer with the typewriter animation and inline citation markers link to source cards below.
- Meeting List has both tabs (KOLs and Sessions & Abstracts) populated from `DATA.meetingList`.
- The Topic Landscape Brief renders for at least the IL-23 topic with synthesis, evidence gaps, abstracts, and topic-KOLs.
- DDW 2026 status pill reads "Planning" in pre-congress (matching §1.5 state machine), not "Active".
- Sarah Chen appears in the KOL Directory and is reachable from her abstract.
- "Demo data" badge is visible on any screen where the data is purely illustrative.
- A debug reset helper (URL param or hidden toggle) replays the empty-setup → configured transition for the stakeholder demo.
- A short `README.md` with the demo script — the four click-by-click paths stakeholders will be walked through.

That's the prototype. When stakeholders are happy with the shape, the same pages map one-to-one onto the Next.js routes in the real frontend POC — and the only thing that changes is *where the data comes from*.