# V2 Onsite Capture — Spec Patch

> **What this is.** A self-contained spec patch that extends the existing `prototype_build_spec.md` (currently at v1.2) with the onsite live-capture layer. Written in the same surgical-patch convention as v1.1 and v1.2 — additive only, references existing sections by number, plugs into the same data model and design system.

> **Scope.** This is V2 in the roadmap. We're specifying it for the prototype so the demo can show the full three-phase story (Prepare · Capture · Synthesise) end-to-end, not because it ships to customers in V1. Onsite is what makes the platform feel real to stakeholders — without it, the demo stops at "we ingested abstracts" and never reaches "we capture intelligence the field actually generates."

> **Important architectural call.** Onsite capture is **not one page**. The temptation to build a single "Captures" page that lists all notes/files is wrong for this product. Captures must remain *attached* to the entities they're about (KOL, session, abstract, topic) — that attachment is what makes them flow into KOL Dossiers, Intel Feed signal, and Ask Anything sources. So instead of one page, we add three coordinated surfaces:
> 
> 1. A **capture action** — fast mobile-first input, reachable from anywhere.
> 2. A **capture stream** — per-congress chronological feed of all team captures.
> 3. **Capture embedding** — every entity (KOL Dossier, Abstract Detail, Topic Brief) shows the captures attached to it.
> 
> The user thinks "I'm capturing a thought about Dr. Chen," not "I'm filing a note in the notes app." The platform handles attachment so the user doesn't have to.

---

## 0. Section numbering

This patch adds the following sections to the main spec:

- **§1.7** — Mobile considerations (cross-cutting design notes)
- **§2.15** — Capture Composer (action surface, reachable globally)
- **§2.16** — Capture Stream (per-congress feed)
- **§2.17** — Capture Detail (single capture view, edit, re-attach)
- **§2.18** — Updates to existing screens to surface captures (KOL Dossier, Abstract Detail, Topic Landscape Brief, Congress Dashboard)
- **§3 update** — Mock data additions (more captures, team members, auto-tag results)
- **§4 update** — Build order: Phase G added
- **§5 update** — Definition of done: three new demo arcs

---

## 1.7 Mobile considerations (new cross-cutting section)

Onsite capture is fundamentally a mobile-first concern. A field user holding a phone in a hallway between sessions is the canonical context. The desktop versions of these surfaces work, but the design baseline is the phone.

**Responsive breakpoints for the capture layer:**
- **`<= 480px` mobile** — single-column, capture composer takes the full viewport, capture stream is a vertical list, no sidebar visible. Tap targets minimum 44pt.
- **`481–1024px` tablet** — sidebar collapses to icon rail; capture composer modal centered; capture stream remains single-column for scannability.
- **`> 1024px` desktop** — full layout with sidebar; capture composer opens as a centered modal at 600px wide.

**Capture composer is reachable globally** via a persistent floating action button (FAB) in the bottom-right of every congress-scoped page (Congress Dashboard, Intel Feed, Abstract Detail, KOL Dossier, Topic Landscape Brief, Meeting List, Capture Stream). Position: `fixed; bottom: 24px; right: 24px;` with a teal background, white plus icon, 56pt diameter on mobile / 64pt on desktop. The FAB is **not shown** on agency-level surfaces or pre-congress screens where there's no active congress in scope.

**Permissions stubbed in the prototype.** Real onsite capture needs microphone, camera, and location permissions. For the prototype, fake these with a one-time "Allow camera/mic access?" toast on first use, then proceed. No real device access required.

```css
/* FAB — used on every congress-scoped page */
.fab-capture {
  position: fixed; bottom: 24px; right: 24px;
  width: 56pt; height: 56pt; border-radius: 50%;
  background: var(--teal); color: white; font-size: 24pt;
  box-shadow: 0 4px 16px rgba(13,148,136,0.4);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 100;
  transition: transform 0.15s ease;
}
.fab-capture:hover { transform: scale(1.05); }
@media (min-width: 1024px) { .fab-capture { width: 64pt; height: 64pt; } }
```

---

## 2.15 Capture Composer — modal opened via FAB or `?capture=new` URL param

**Purpose.** The fast input surface. Three modes (voice / quick note / photo), pre-selected from the FAB's long-press menu or the modal's mode picker. The composer's job is to *vanish* — capture, auto-tag, save, dismiss. Anything that slows the user down breaks the use case.

**Features to implement:**

- **Mode picker at top** — three tabs: 🎙 Voice · ✍ Quick note · 📷 Photo. Active mode highlighted.
- **Voice mode:** large record button (red circle when active), live transcription appearing in real-time below, recording duration counter, pause and stop controls. For the prototype: simulate recording with a fake 8–15 second progress bar, then populate the transcript field with mock text from `DATA.captures` based on the active context (current page).
- **Quick note mode:** focused textarea, autofocus on open, character count, no formatting toolbar — speed over polish.
- **Photo mode:** for the prototype, a stub upload dropzone showing "Camera access disabled in demo — drag a photo file here or click to choose." Accept any image upload, show a small thumbnail preview.
- **Auto-tag panel** (visible while the user is composing, updates live):
  - Suggested KOL — derived from the active page context (e.g. on Sarah Chen's KOL Dossier, she's pre-suggested) plus any names detected in the transcript/note text. Shows a small avatar + name with a "✓" to confirm or "✕" to remove.
  - Suggested session/abstract — derived from the current URL context.
  - Suggested topic — pattern-matched against the client's keyword vocabulary.
  - Capture type chips: *Spotlight meeting · Hallway · Session reaction · Competitive intel · Q&A highlight · General* — one is auto-suggested, user can change.
- **Visibility toggle:** *Private to me* (default) / *Share with team*. A small note next to it: *"Private captures still feed your personal Ask Anything; shared captures feed everyone's."*
- **Save action:** primary button "Save capture." Saves to `DATA.captures`, attaches to all confirmed tags, dismisses the modal, and shows a toast confirmation that links to the saved capture: *"✓ Capture saved · view"*

**Context-awareness rules (the magic):**

When the composer opens, it reads the URL of the page underneath:

| URL pattern | Auto-suggested attachments |
|---|---|
| `#/kols/[id]` | The KOL · current active congress |
| `#/abstracts/[id]` | The abstract's presenting author (KOL) · the abstract · the abstract's topic · current active congress |
| `#/clients/[c]/congresses/[g]/topics/[t]` | The topic · current active congress |
| `#/clients/[c]/congresses/[g]/feed` or `/[g]` | The current active congress (no entity context) |
| Any other page | The current active congress only |

The user can always override or add tags, but the defaults should be right 80%+ of the time so they don't have to.

```html
<!-- Capture Composer modal -->
<div class="modal-shell capture-modal" id="modal-capture">
  <div class="modal capture-modal-inner">
    <div class="modal-hd">
      <h2>New capture</h2>
      <div class="context-pill">
        <small>Attaching to:</small>
        <span class="chip soft"><div class="av xs">SC</div> Dr. Sarah Chen</span>
        <span class="chip soft">DDW 2026</span>
      </div>
      <button class="close" onclick="closeCapture()">✕</button>
    </div>

    <nav class="mode-picker">
      <button class="mp-tab act" data-mode="voice">🎙 Voice</button>
      <button class="mp-tab" data-mode="text">✍ Quick note</button>
      <button class="mp-tab" data-mode="photo">📷 Photo</button>
    </nav>

    <!-- VOICE MODE -->
    <div class="capture-body mode-voice">
      <div class="record-area">
        <button class="rec-btn" onclick="toggleRecord()">
          <span class="rec-dot"></span>
        </button>
        <div class="rec-meta">
          <div class="rec-time mono">00:00</div>
          <div class="rec-status">Tap to start recording</div>
        </div>
      </div>
      <div class="transcript-area">
        <label>Live transcript</label>
        <div class="transcript" id="transcript">
          <em class="muted">Transcript will appear here as you speak…</em>
        </div>
      </div>
    </div>

    <!-- QUICK NOTE MODE (hidden by default) -->
    <div class="capture-body mode-text" style="display:none">
      <textarea autofocus rows="6" placeholder="Type your observation…
For example: Dr. Chen flagged transmural healing as the next regulatory inflection. Open to GSK pipeline discussion."></textarea>
      <div class="char-count"><span id="cc">0</span> characters</div>
    </div>

    <!-- PHOTO MODE (hidden by default) -->
    <div class="capture-body mode-photo" style="display:none">
      <div class="upload-zone">
        <div class="uz-ic">📷</div>
        <b>Drag a photo or click to choose</b>
        <small>Camera access disabled in demo</small>
      </div>
      <div class="photo-preview" style="display:none">
        <img id="photo-prev" alt="">
        <input type="text" placeholder="Caption (optional)">
      </div>
    </div>

    <!-- AUTO-TAG PANEL (always visible) -->
    <div class="tag-panel">
      <div class="tg-grp">
        <label>Person</label>
        <div class="tg-chips">
          <span class="chip line selected">
            <div class="av xs">SC</div> Dr. Sarah Chen ✓
            <span class="x">✕</span>
          </span>
          <button class="chip-add">+ Add person</button>
        </div>
      </div>
      <div class="tg-grp">
        <label>Topic</label>
        <div class="tg-chips">
          <span class="chip line selected">IL-23 positioning ✓ <span class="x">✕</span></span>
          <button class="chip-add">+ Add topic</button>
        </div>
      </div>
      <div class="tg-grp">
        <label>Capture type</label>
        <div class="tg-chips">
          <button class="chip-pick">Spotlight meeting</button>
          <button class="chip-pick act">Hallway</button>
          <button class="chip-pick">Session reaction</button>
          <button class="chip-pick">Competitive intel</button>
          <button class="chip-pick">Q&amp;A highlight</button>
        </div>
      </div>
    </div>

    <div class="visibility-row">
      <div>
        <input type="radio" name="vis" id="vp" checked>
        <label for="vp">Private to me</label>
        <input type="radio" name="vis" id="vt" style="margin-left:14pt">
        <label for="vt">Share with team</label>
      </div>
      <small class="muted">Private captures still feed your personal Ask Anything; shared captures feed everyone's.</small>
    </div>

    <div class="modal-foot">
      <button class="btn-secondary" onclick="closeCapture()">Cancel</button>
      <button class="btn-primary" onclick="saveCapture()">Save capture</button>
    </div>
  </div>
</div>
```

---

## 2.16 Capture Stream — `#/clients/[client]/congresses/[congress]/captures`

**Purpose.** The team's shared feed of all captures from this congress. Chronological, filterable, scannable. This is where "live across the team" gets demonstrated — what one person saw five minutes ago is here for everyone.

**Features to implement:**

- **Filter bar** at top:
  - Type: All · 🎙 Voice · ✍ Note · 📷 Photo
  - Visibility: All · Mine · Shared with team
  - Author: All · [list of team members]
  - Capture type: All · Spotlight · Hallway · Session · Competitive · Q&A
  - Tag filter: All · attached to KOL X · attached to topic Y (chip pickers)
  - Date: All days · Day 1 · Day 2 · Day 3 (auto-derived from congress dates)
- **Day groupings** in the feed — captures grouped under day headers (`THU 16 · FRI 17 · SAT 18 · SUN 19`).
- **Capture cards** in the stream — one card per capture, showing:
  - Author avatar + name + timestamp ("15 min ago")
  - Type icon (voice / note / photo)
  - For voice: duration + waveform stub + first ~120 chars of transcript with "Read more →"
  - For text: full note up to ~200 chars then truncate
  - For photo: thumbnail (left, ~80pt square) + caption
  - Auto-tag chips below: attached KOL · session/abstract · topic · capture type
  - Hover actions: 👁 view detail · ⤴ share (if private) · ✎ edit · ✕ delete
- **Live indicator** — small green pulse dot in the top right showing "Live · last update 2 min ago." Updates every ~30s in the prototype via setInterval that injects a new mock capture from a stream of pre-baked ones.
- **"+ New capture" CTA** at the top of the list (in addition to the FAB).
- **Empty state** for the day filter when no captures yet: *"Quiet so far on Day 1 — be the first to capture something. Tap the + button."*

**Things to mock:**
- 30 pre-baked captures distributed across the four DDW 2026 days, with:
  - Mix of authors (Sarah Phillips, plus 4 other team members from mock data)
  - Mix of types (~50% voice, ~35% note, ~15% photo)
  - Mix of visibility (~30% private, ~70% shared)
  - Realistic content tied to the existing abstracts and KOLs in `DATA`
- 5 "incoming" captures that drip-feed in during the demo via setInterval (every 30s).

```html
<div class="crumb">Client Workspaces › GSK › DDW 2026 › <b>Captures</b></div>

<div class="ph">
  <div class="eyebrow">Onsite intelligence · Day 1 of 4</div>
  <h2>Capture stream <span class="live-dot"><i></i> Live</span></h2>
  <p>Every capture from the team, in real time. Filter to your view; tag to make it permanent.</p>
  <div class="ph-actions">
    <button class="btn-secondary" onclick="openExportModal('captures')">⬇ Export digest</button>
    <button class="btn-primary" onclick="openCapture()">＋ New capture</button>
  </div>
</div>

<div class="filters">
  <span class="fl">FILTER</span>
  <span class="fchip act">All types <span class="x">✕</span></span>
  <span class="fchip">🎙 Voice</span>
  <span class="fchip">✍ Note</span>
  <span class="fchip">📷 Photo</span>
  <span class="fchip">Mine only</span>
  <span class="fchip">Shared with team</span>
  <span class="fchip">Day 1</span>
  <button class="clear-all">Clear all</button>
  <div class="result-mini"><b>47</b> captures · last 30 min: <b>6</b></div>
</div>

<div class="capture-stream">
  <div class="day-group">
    <div class="dg-hd"><b>THU 16</b> <small>Day 1 · today</small></div>

    <a class="cap-card voice shared" href="#/captures/v-217">
      <div class="cap-hd">
        <div class="av sm">SP</div>
        <div class="cap-meta">
          <b>Sarah Phillips</b> <small>· 5 min ago · 🎙 Voice · 1:48</small>
        </div>
        <span class="vis-pill"><span class="d"></span> SHARED</span>
      </div>
      <div class="cap-body">
        <div class="waveform"><svg viewBox="0 0 200 30"><!-- stub waveform --></svg></div>
        <p>"Chen flagged transmural healing as the next regulatory inflection — said the FDA is reviewing transmural as a labelled endpoint by 2027. Open to GSK pipeline discussion next quarter…" <span class="more">Read more →</span></p>
      </div>
      <div class="cap-tags">
        <span class="chip line"><div class="av xs">SC</div> Dr. Sarah Chen</span>
        <span class="chip soft">IL-23 positioning</span>
        <span class="chip soft">Spotlight meeting</span>
      </div>
    </a>

    <a class="cap-card photo shared" href="#/captures/p-410">
      <div class="cap-hd">
        <div class="av sm">JW</div>
        <div class="cap-meta"><b>James Walker</b> <small>· 18 min ago · 📷 Photo</small></div>
        <span class="vis-pill"><span class="d"></span> SHARED</span>
      </div>
      <div class="cap-body photo-body">
        <div class="cap-photo"><img src="data:image/svg+xml,..." alt="Poster"></div>
        <p>AbbVie poster on Skyrizi 5-year safety. Strong RWE numbers — no new safety signals at 5 years.</p>
      </div>
      <div class="cap-tags">
        <span class="chip line">AbbVie</span>
        <span class="chip line">risankizumab</span>
        <span class="chip soft">Competitive intel</span>
      </div>
    </a>

    <a class="cap-card text private" href="#/captures/n-091">
      <div class="cap-hd">
        <div class="av sm">SP</div>
        <div class="cap-meta"><b>Sarah Phillips</b> <small>· 42 min ago · ✍ Note</small></div>
        <span class="vis-pill private"><span class="d"></span> PRIVATE</span>
      </div>
      <div class="cap-body">
        <p>Late-breaker LB01 audience: smaller than expected, ~60% capacity. Crowd reaction muted on the H2H secondary endpoint — sense is the effect size came in below expectations.</p>
      </div>
      <div class="cap-tags">
        <span class="chip lb">LB01</span>
        <span class="chip soft">Session reaction</span>
      </div>
    </a>

    <!-- … more cards for Day 1 -->
  </div>

  <div class="day-group">
    <div class="dg-hd"><b>FRI 17</b> <small>Day 2</small></div>
    <!-- Day 2 captures -->
  </div>
</div>

<!-- FAB — also reachable from this page -->
<button class="fab-capture" onclick="openCapture()" aria-label="New capture">＋</button>
```

---

## 2.17 Capture Detail — `#/captures/[id]`

**Purpose.** Single capture view. Reached by clicking any capture card. Shows the full content, the auto-tagged context, the edit/share/delete actions, and the entity context that lets the user navigate to whatever the capture is about.

**Features to implement:**

- **Header:** type icon + author + timestamp + visibility pill + share button (if private) + edit / delete (only if the user owns it).
- **Content block:**
  - Voice: large waveform player with playback controls, transcript below (editable inline).
  - Text: the full note, editable inline.
  - Photo: full-resolution image with caption editable below.
- **Attached entities panel (right rail):**
  - People — list of attached KOLs with avatars; each links to the KOL Dossier.
  - Sessions/abstracts — list of attached items; each links to Abstract Detail.
  - Topics — chip list; each links to the Topic Landscape Brief.
  - Drugs/companies — chip list.
  - Capture type — single chip.
- **Back to stream** link at top.
- **Related captures** at the bottom — small horizontal-scroll strip of other captures sharing one or more tags ("3 other captures about Dr. Chen", "5 other captures on IL-23").
- **Provenance footer** — timestamp, device, location (mocked: *"Captured Thu May 16, 2:34 PM · iPhone · San Diego Convention Center · Hall A"*).

```html
<a class="back-link" href="#/clients/gsk/congresses/ddw-2026/captures">← Back to capture stream</a>

<div class="cap-detail-hd">
  <div class="cap-type">🎙 Voice capture</div>
  <h2>Spotlight meeting with Dr. Sarah Chen</h2>
  <div class="cap-meta-row">
    <div class="av sm">SP</div>
    <b>Sarah Phillips</b>
    <small>· Thu May 16, 2:34 PM · 1:48 duration · DDW 2026</small>
    <span class="vis-pill shared"><span class="d"></span> SHARED WITH TEAM</span>
  </div>
  <div class="cap-actions">
    <button class="btn-secondary">⤴ Share</button>
    <button class="btn-secondary">✎ Edit</button>
    <button class="btn-secondary">⬇ Download audio</button>
    <button class="btn-danger-ghost">✕ Delete</button>
  </div>
</div>

<div class="cols-2">
  <div class="cap-content">
    <div class="player">
      <button class="play">▶</button>
      <div class="waveform-lg"><svg viewBox="0 0 600 60"><!-- waveform --></svg></div>
      <div class="player-meta mono">00:00 / 01:48</div>
    </div>

    <div class="transcript-block">
      <label>Transcript <button class="link sm">✎ Edit</button></label>
      <p>"Just came out of a 20-minute with Sarah Chen. Her read on the SEQUENCE-UC late-breaker is that the H2H risankizumab vs ustekinumab effect size is real but smaller than the field was hoping — superiority on endoscopic improvement, but the histologic remission curves are within noise.</p>
      <p>The more interesting thread: she's bullish on transmural healing as a regulatory endpoint, said FDA is reviewing transmural for a labelled endpoint by 2027 and that this opens a real positioning window. Open to a Q3 discussion on the GSK pipeline if we want to set up an advisory engagement."</p>
    </div>
  </div>

  <aside class="cap-side">
    <div class="panel">
      <div class="panel-h">Attached to</div>
      <div class="panel-b">
        <a class="att-row" href="#/kols/sarah-chen">
          <div class="av sm">SC</div>
          <div><b>Dr. Sarah Chen</b><small>UHN Toronto · KOL</small></div></a>
        <a class="att-row" href="#/abstracts/lba-101">
          <div class="ic-sq">📄</div>
          <div><b>SEQUENCE-UC late-breaker</b><small>LB01 · Thu 9:00</small></div></a>
        <div class="tag-list">
          <span class="chip soft">IL-23 positioning</span>
          <span class="chip soft">UC treat-to-target</span>
          <span class="chip soft">Transmural healing</span>
        </div>
        <div class="tag-list">
          <span class="chip own">Spotlight meeting</span>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h">Related captures</div>
      <div class="panel-b">
        <a class="rel-row" href="#/captures/v-218">
          <div class="av xs">JW</div>
          <small><b>James Walker</b> · 12 min ago</small>
          <p>"AbbVie booth claims 5-year safety…"</p>
        </a>
        <a class="rel-row" href="#/captures/n-091">
          <div class="av xs">SP</div>
          <small><b>Sarah Phillips</b> · 42 min ago</small>
          <p>"LB01 audience: smaller than expected…"</p>
        </a>
      </div>
    </div>
  </aside>
</div>

<div class="provenance">
  Captured Thu May 16, 2:34 PM · iPhone · San Diego Convention Center · Hall A
</div>
```

---

## 2.18 Updates to existing screens

Captures are not a separate world — they thread through the rest of the app. These are small additions to screens already specified in v1.0–1.2:

### 2.18.1 — KOL Dossier (§2.7) update

The existing "Field notes & history" panel already shows captures attached to this KOL. Three additions:

- **Promote it to a more prominent position** on the page — it should be the second panel after the presentation slate, not buried.
- **Add a "+ New capture about this KOL" button** in the panel header. Opens the Capture Composer with this KOL pre-tagged.
- **Show capture provenance correctly** — author avatar, timestamp, type icon. Same card shape as the Capture Stream cards but compact.

### 2.18.2 — Abstract Detail (§2.5) update

Add a new panel below the AI summary: **"Field reactions"** — captures attached to this abstract or its presenting author. Same card shape, compact. Same "+ New capture about this abstract" button in the panel header.

### 2.18.3 — Topic Landscape Brief (§2.14) update

Add a panel: **"What the team is capturing on this topic"** — chronological list of captures attached to the topic. Useful for stakeholders to see the connection from topic intelligence to field signal.

### 2.18.4 — Congress Dashboard (§2.3) update

The existing "Recent Insights" panel currently shows mock seeded data with a "SEEDED" badge. Replace its data source with **real captures from the Capture Stream**, sorted by recency. Most recent 3 shown; "VIEW ALL" links to the Capture Stream. Drop the "SEEDED" badge once this is wired.

### 2.18.5 — Sidebar nav (§1.2 / §1.4) update

Add a nav item under the active congress: **"Capture Stream"** with a small live-dot indicator next to a count badge showing captures from the last hour. Position: between "Intel Feed" and "KOL Directory." Path: `#/clients/[c]/congresses/[g]/captures`.

### 2.18.6 — Topbar (§1.4) update

When on a congress-scoped page, add a small "🔴 LIVE" indicator next to the congress pill if the congress is in `Active` status (per §1.5 state machine). Clicking it routes to the Capture Stream.

### 2.18.7 — Ask Anything (§2.12) update

Captures already appear as Ask Anything sources (the source card with the voice-note icon). Confirm this is wired to the real `DATA.captures` array, not a hard-coded mock. Each source-card click should now route to the new Capture Detail page (§2.17).

---

## §3 update — Mock data additions

```js
DATA.team = [
  { id: "sarah-p", name: "Sarah Phillips", initials: "SP", role: "Director" },
  { id: "james-w", name: "James Walker", initials: "JW", role: "MSL" },
  { id: "emily-c", name: "Emily Chen", initials: "EC", role: "Medical Affairs Lead" },
  { id: "david-p", name: "David Park", initials: "DP", role: "MSL" },
  { id: "maria-r", name: "Maria Rivera", initials: "MR", role: "Scientific Communications" }
];

/* Expanded captures — 30 baseline + 5 drip-feed */
DATA.captures = [
  /* Existing v1.2 captures kept */
  { id: "v-217", type: "voice", duration: "1:48", author: "sarah-p",
    visibility: "shared", capture_type: "Spotlight meeting",
    location: "Hall A · San Diego Convention Center",
    congress: "ddw-2026", day: 1, timestamp: "2026-05-16T14:34:00",
    attached_kols: ["sarah-chen"],
    attached_abstracts: ["lba-101"],
    attached_topics: ["il-23"],
    transcript: "Just came out of a 20-minute with Sarah Chen…" /* full text */ },
  
  { id: "p-410", type: "photo", author: "james-w",
    visibility: "shared", capture_type: "Competitive intel",
    image_url: "/mock/abbvie-poster.jpg",
    caption: "AbbVie poster on Skyrizi 5-year safety. No new safety signals at 5 years.",
    congress: "ddw-2026", day: 1, timestamp: "2026-05-16T14:20:00",
    attached_companies: ["abbvie"], attached_drugs: ["risankizumab"],
    attached_topics: ["il-23"] },
  
  { id: "n-091", type: "text", author: "sarah-p",
    visibility: "private", capture_type: "Session reaction",
    text: "Late-breaker LB01 audience: smaller than expected, ~60% capacity. Crowd reaction muted on the H2H secondary endpoint — sense is the effect size came in below expectations.",
    congress: "ddw-2026", day: 1, timestamp: "2026-05-16T13:50:00",
    attached_abstracts: ["lba-101"] },
  
  /* … 27 more captures across Days 1–4, spread across authors/types/topics */
];

/* Drip-feed queue — for the live demo simulation */
DATA.captureDripFeed = [
  { author: "emily-c", type: "voice", text: "AbbVie symposium room overflowing…",
    attached_companies: ["abbvie"], delay_seconds: 30 },
  { author: "david-p", type: "text", text: "Plenary just announced…",
    delay_seconds: 60 },
  { author: "james-w", type: "photo", caption: "JAKi safety poster session — packed booth",
    attached_topics: ["jaki-safety"], delay_seconds: 90 },
  /* etc */
];
```

---

## §4 update — Build order

Add as a new phase at the end:

**Phase G — Onsite capture layer.** Capture Composer modal (§2.15) reachable from the FAB on all congress-scoped pages. Capture Stream (§2.16) with day groupings, filters, and the live drip-feed simulation. Capture Detail (§2.17). Wire captures into the existing screens per §2.18. Confirm Ask Anything (§2.12) now cites real captures. Add the LIVE indicator to the topbar and the live-dot to the sidebar.

---

## §5 update — Definition of done

Append:

- **A fifth demo arc — Open the Capture Stream → click + (FAB) → record a voice capture (mocked) with auto-tagged context → save → see it appear in the stream → click into Capture Detail → click the attached KOL → see the new capture appear in their dossier — runs cleanly.**
- **A sixth demo arc — Sit on the Capture Stream and wait ~30s → a new capture from a teammate drip-feeds in with a subtle animation → click it → read the detail → return — demonstrates live-team behavior.**
- The Capture Composer's auto-tag panel correctly pre-populates based on URL context (KOL Dossier → that KOL pre-tagged; Abstract Detail → that abstract pre-tagged; etc.).
- The FAB appears on every congress-scoped page and never on agency-level or pre-congress surfaces.
- Captures attached to KOLs appear in the KOL Dossier's Field notes panel; captures attached to abstracts appear in the Abstract Detail's new Field reactions panel.
- Ask Anything source cards link to the real Capture Detail page, not a stub.
- The Capture Stream filters actually filter (substring + tag match).
- Visibility toggle (private / shared) is respected — private captures from other team members never appear in the user's stream.

---

## What this deliberately does NOT include

Worth being explicit about — same discipline as the v1.2 patch:

- **Real device access.** No actual microphone/camera. Voice "recording" is a fake timer; photos are file uploads. The prototype demos the UX, not the device integration.
- **Real-time sync to a backend.** Drip-feed is a setInterval injecting from a pre-baked queue. In production this is WebSocket-driven from the real backend.
- **Audio waveform generation.** Stubbed SVG patterns. Real waveforms come from the audio analysis pipeline in production.
- **OCR on photo captures.** Stubbed — the photo just has the caption. Real OCR is a V2 backend concern.
- **Transcription accuracy.** Mock transcripts are pre-written. Real transcription is Whisper-class in production.
- **Native mobile app.** This is responsive web only. The PM comment in the requirements doc (Neeraj Kumar) is right — production V2 needs a native app for continuous voice recording. Prototype proves the UX, doesn't ship the production capture pipeline.

These exclusions are intentional and aligned with the v1.2 patch convention: build the *story* in the prototype, defer the *production reality* to the real build.

---

## What stakeholders should walk away seeing

After this patch is built, the demo gains a second-act capability:

> *"Sarah is in a Spotlight meeting with Dr. Chen at DDW 2026. She taps the + button on her phone, records what she heard. The capture is tagged to Dr. Chen automatically, attached to the SEQUENCE-UC abstract she was just discussing, and tagged to the IL-23 topic. Sarah marks it shared with the team.*
>
> *Two minutes later, James is in another session and his Capture Stream shows Sarah's capture pop in live. He sees the tags, opens it, listens to the 90-second voice clip. He's now caught up on what Sarah heard, while she's still in the meeting.*
>
> *Three days later, when Sarah opens Dr. Chen's KOL Dossier to prep for the post-congress debrief, her capture is sitting in the Field notes panel right alongside last year's notes. When the post-congress executive report is generated, that capture is one of the cited sources in the Ask Anything synthesis. Nothing was filed; nothing was lost."*

That's the loop. The platform's value is the loop. This patch closes it.