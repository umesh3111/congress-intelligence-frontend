# Congress IQ — Stakeholder Prototype

Static HTML/CSS/JS prototype of the pre-congress workflow. No framework, no build step.

## How to open

```bash
# Option A: Direct file (no server needed)
open public/prototype/index.html

# Option B: Via Next.js dev server (already running)
open http://localhost:9090/prototype/index.html
```

---

## Demo Script — Click-by-Click

### Step 1 — Agency Dashboard (`#/dashboard`)
Land here. Show the agency view across 6 clients and 8 congresses.
- Point out the metric tiles (Active Clients, Upcoming Congresses)
- Show the Upcoming Congresses list — DDW 2026 is first (In 41 days)
- **Click the "GSK" client tile** (or the "DDW 2026" congress row)

### Step 2 — GSK Client Workspace (`#/clients/gsk`)
GSK's strategic lens — pipeline, TAs, priorities.
- Show the metric tiles (245 KOLs, 1,368 insights)
- Show the TA donut chart (Gastroenterology 38%)
- Show the Strategic Priorities (IBD leadership is #1)
- **Click "DDW 2026" in the Upcoming Congresses panel**

### Step 3 — DDW 2026 Congress Dashboard (`#/clients/gsk/congresses/ddw-2026`)
The pre-congress war room.
- Show the 72% progress ring
- Show the Top Prioritized Sessions table — click rows to drill into abstracts
- Show the Priority Breakdown bars (IBD leads)
- **Click "VIEW ALL ›" next to Top Prioritized Sessions → Intel Feed**

### Step 4 — Intel Feed (`#/clients/gsk/congresses/ddw-2026/feed`)
**This is the demo centerpiece.** Every abstract scored and ranked.
- Show the 16 abstract cards: amber (competitive), teal (own), violet (indication)
- Click the **"Competitive" filter chip** → 7 cards remain
- Click **"Clear all"** to reset
- Type "IL-23" in search → 5 cards remain
- Point out score rings (94 for SEQUENCE-UC)
- **Click the SEQUENCE-UC card (score 94, amber, late-breaking)**

### Step 5 — Abstract Detail (`#/abstracts/lba-101`)
Drill-down on SEQUENCE-UC.
- Show the AI-GENERATED SUMMARY panel (teal, clearly labelled)
- Walk through Background / Methods / Results / Conclusions
- Show the right sidebar: Authors, Drugs (risankizumab ↔ Skyrizi ↔ IL-23 inhibitor), Trial NCT link
- **Click "Dr. Sarah Chen" in the Authors panel**

### Step 6 — KOL Dossier (`#/kols/sarah-chen`)
Meeting prep for Dr. Sarah Chen.
- Show the dark gradient header (Tier 1, positive sentiment)
- Show her 3 DDW 2026 presentations — click slots to navigate to abstracts
- Show Field Notes (DDW 2025 voice debrief, March 2025 advisory board)
- Show Publications bar chart
- Click **"+ Add to meeting list"** → toast confirms
- **Click "← Back to KOL Directory"**

### Step 7 — KOL Directory (`#/clients/gsk/kols`)
Search and triage 10 KOLs.
- Type "IBD" in search → filters live
- Show influence scores and match pills
- Click **"Prioritization"** in the sidebar

### Step 8 — Prioritization Settings (`#/clients/gsk/settings/prioritization`)
Show the scoring engine controls.
- Move the "Relevance to Therapeutic Areas" slider → other sliders rebalance automatically
- Show the Priority Impact Preview counts updating
- Click **"Run Full Recalculate"** → toast shows recalculation
- Click "← Back" or Dashboard in sidebar

### Bonus — Congress Creation (`#/clients/gsk/congresses/new`)
Show how a new congress is onboarded.
- Step 1: Basics form (pre-filled with DDW data)
- Click "Next →" → Step 2: Ingest Sources (upload zone + connectors)
- Click "Next →" → Step 3: Confirm (3 sources, review queue warning)
- Click "✓ Create Congress & Start Ingestion"
- Watch the animated progress bars fill (Documents → Abstracts → Entities → Review queue)
- After ~9 seconds → routes to Congress Dashboard with success toast

---

## Pages

| Route | Page |
|-------|------|
| `#/dashboard` | Agency Dashboard |
| `#/clients/gsk` | GSK Client Workspace |
| `#/clients/gsk/congresses/ddw-2026` | DDW 2026 Congress Dashboard |
| `#/clients/gsk/congresses/ddw-2026/feed` | Intel Feed |
| `#/abstracts/:id` | Abstract Detail |
| `#/clients/gsk/kols` | KOL Directory |
| `#/kols/:id` | KOL Dossier |
| `#/clients/gsk/settings/prioritization` | Prioritization Settings |
| `#/profile` | User Profile |
| `#/clients/gsk/congresses/new` | Congress Creation Wizard |

## Signal Colors (consistent everywhere)

| Signal | Color | Meaning |
|--------|-------|---------|
| Amber | Competitive | AbbVie, Janssen, competitor drugs |
| Teal | Own Pipeline | GSK / Novo Nordisk assets |
| Violet | Indication | Disease-level, both sides |
| Black | Late-Breaking | High-priority session type |

## Files

- `index.html` — Shell (sidebar, topbar, font/chart CDN links)
- `app.css` — Full design system (CSS custom properties, all component classes)
- `app.js` — DATA fixtures + hash router + 10 page renderers
- `README.md` — This file
