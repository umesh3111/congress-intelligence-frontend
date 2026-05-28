# Congress Intelligence Platform — UX Flows
## Step 1 of 5: Client Workspace Setup

> **What this document is.** A walkthrough of the first step in the pre-congress workflow, written for the developer building the prototype. It defines what the user is trying to do, what they see at each substep, what decisions they make, and what success looks like before they move on. The subsequent steps (creating a congress, working the Intel Feed, building a KOL meeting list, generating the pre-congress brief) are scoped separately.

---

## Overview

**Goal.** Establish a client workspace with enough strategic context that everything the system does afterward — abstract scoring, KOL surfacing, competitive flagging — actually reflects this client's priorities. The phrase to hold in your head: *configuring the lens.*

**Outcome.** A client workspace exists with strategic priorities, pipeline assets, competitors, priority KOLs, keywords, and prioritization weights configured. The "Add Congress" CTA is enabled and the user is ready to proceed to Step 2.

**Persona.** Sarah Phillips, Director of Medical Affairs at a MedCom agency, setting up the GSK workspace. (For pharma-direct users — e.g. a GSK in-house team — the same flow applies; the only difference is they have one client workspace, not many.)

**Frequency.** Mostly once per client. Strategic priorities and weights get revisited each planning cycle, but the structural setup is a one-time act.

**Preconditions.** User is authenticated. Agency account exists. (Both stubbed in the prototype.)

---

## The flow at a glance

```
Sign in
   │
   ▼
[ 1.1 Agency Dashboard ]
   │   ┌─ First time on this client? ─────┐
   │   ▼                                   ▼
   │  1.2a Create new client          1.2b Open existing
   │   workspace                       client workspace
   │   │                                   │
   │   └──────────────┬────────────────────┘
   │                  ▼
   │   [ 1.3 Client Workspace — Overview ]
   │   │  empty-state nudge: "Configure your context to start"
   │   │
   │   ▼
   │   1.4 Configure strategic context  ───► six sub-sections
   │   │     (priorities · TAs · pipeline · competitors · KOLs · keywords)
   │   │
   │   ▼
   │   1.5 Configure prioritization weights
   │   │
   │   ▼
   │   1.6 Configure user profile (optional, can defer)
   │   │
   │   ▼
   [ 1.7 Workspace ready  →  "Add your first congress" CTA enabled ]
```

---

## 1.1 Sign in & land on the Agency Dashboard

**Screen:** Agency Dashboard (`#/dashboard`).

**What the user sees.** A list of their assigned clients, an "Upcoming Congresses" panel, and a "+ Create New Congress" quick action. Top-right "+ Create New" dropdown also offers "+ Create New Client Workspace."

**What they do.** One of three things, depending on context:
- They are starting fresh with a new client → **proceed to 1.2a**.
- They have been added to an existing client workspace by an admin → **proceed to 1.2b** (click the client tile).
- They are returning after partial setup → **proceed to 1.3** (resume).

**Why this screen first.** The agency-level entry point is deliberately above the client level so the multi-tenant mental model is set from the first click. Even pharma-direct users benefit from seeing this — it sets the expectation that *strategic context is scoped per-client*, not stored on the user.

---

## 1.2 Create or open a client workspace

### 1.2a — Create new (first time for this client)

**Action.** "+ Create New Client Workspace" → modal opens.

**Modal fields.**
- Client name (required) — *"GSK"*
- Display short name / logo letters — *"GSK"*
- Primary therapeutic areas (multi-select, required) — *"Gastroenterology, Respiratory, Oncology, Immunology"*
- Initial team (optional, multi-select of agency users)
- Description (optional)

**On submit.** A new client record is created. The user is routed to `#/clients/[client]` — the new Client Workspace, in its empty state.

**Edge case.** If a workspace with the same name exists, show "This client workspace already exists. Open it?" with a link. Prevents accidental duplication.

### 1.2b — Open existing

**Action.** Click a client tile on the Agency Dashboard.

**Result.** Routes to `#/clients/[client]`. If configuration is incomplete, the user will see the same empty-state nudges as 1.2a.

---

## 1.3 Land in the Client Workspace (empty state)

**Screen:** Client Workspace (`#/clients/gsk`) in **empty state**.

**Critical design call:** an empty client workspace is *not* an empty product. The empty state must clearly orient the user toward what they need to do next, in order.

**What the user sees.**
- Header: client name, "Active Client" pill, "Client Settings" / "+ New Congress" buttons (the **New Congress button is disabled** until at least Strategic Priorities + Therapeutic Areas are set — see 1.7).
- A **single full-width "Set up your workspace" panel** replacing the usual metrics. Inside, a checklist of the six configuration tasks below, each with a "Configure" button. As each is completed, a green check appears next to it and progress bar updates.
- A small "Skip for now" link on each — they can return later, but the New Congress CTA stays disabled until the required ones are done.

**Checklist items:**
1. ✓ Strategic priorities  *(required)*
2. ✓ Therapeutic areas & focus areas  *(required)*
3. ○ Pipeline assets *(recommended)*
4. ○ Competitors *(recommended)*
5. ○ Priority KOLs *(recommended)*
6. ○ Strategic keywords & topics *(recommended)*
7. ○ Prioritization weights *(defaults provided)*

**Why a checklist, not a multi-step wizard.** Setup is non-linear. A team might want to add competitors before pipeline, or come back to KOLs after a brainstorm. A checklist respects that while still showing what's outstanding. A wizard would force order and break flow.

**What "required" means.** Without Strategic Priorities and Therapeutic Areas, the prioritization engine has nothing to score against — adding a congress would just produce an undifferentiated abstract list. So those two gate the "+ New Congress" CTA. The others tune precision; without them the lens is still functional, just less sharp.

---

## 1.4 Configure strategic context

Six sub-sections, all reached from the checklist or via a "Strategic Context" tab in the Client Settings page. Each opens in a focused side-panel (drawer) rather than navigating away — keeps the user anchored on the workspace overview.

### 1.4a — Strategic Priorities

**Why this matters most.** This is the highest-level signal the scoring engine uses. Everything else inherits from these.

**Inputs.** 3–5 free-text priority statements, each with a level (High / Medium / Low). Suggested examples shown as placeholder text — *"Advance leadership in IBD and GI inflammation"*, *"Identify next-gen immunology opportunities"* — to break the blank-page problem.

**Output to scoring.** Each priority is taggable to abstracts and topics downstream; the level becomes a weight modifier.

**Validation.** At least one priority required to complete this step.

### 1.4b — Therapeutic Areas & Focus Areas

**Inputs.**
- *Top Therapeutic Areas* — multi-select from a controlled list (Gastroenterology, Hepatology, Oncology, Immunology, Respiratory, Neurology, Infectious Disease, Cardiology, Endocrinology, Other). Searchable.
- *Focus Areas* — more specific sub-topics, also controlled but extensible: IBD, NASH, Microbiome, Fibrosis, IL-23 Pathway, etc. User can add a custom one.

**Why both.** TAs map to the system's `therapeutic_areas` table and disease ontology (MeSH); focus areas are the day-to-day language the team uses internally. They're not redundant — together they form the search vocabulary.

**Validation.** At least one TA required.

### 1.4c — Pipeline Assets

**Inputs.** Drug rows: name, status (pipeline / marketed / discontinued), indication. Resolves against the drug ontology (RxNorm) — typing "semaglutide" autocompletes with brand names ("Ozempic", "Wegovy") so the workspace knows they're the same molecule.

**Why this matters.** This drives the "Own Company" flag on abstracts. Without it, the Intel Feed can't distinguish *your* drugs from anyone else's.

**Empty-state suggestion.** "Add at least one pipeline asset to enable own-company flagging."

### 1.4d — Competitors

**Two parts in one drawer.**
- *Competitor companies* — multi-select with autocomplete from the companies index (AbbVie, Janssen, Bristol Myers Squibb, Eli Lilly, Merck …).
- *Competitor drugs* — drug rows with the same RxNorm autocomplete.

**Why both.** Sometimes you want to track a company broadly; sometimes a specific molecule. The scoring engine derives "competitive" status if *either* matches — that's why the schema we built keeps `client_competitor_companies` and `client_competitor_drugs` as separate join tables.

**Subtle UI point.** Competitors are *client-relative* — Pfizer's competitor is GSK's partner. Make it visually clear this list belongs to this workspace, not the user, not the system.

### 1.4e — Priority KOLs

**Two flows in one drawer.**

**Search and add (primary flow).** The KOL Directory search opens inline. Type a name, see results with affiliation and influence score, click "Add to priority list." Each addition shows match confidence (High / Medium / Low) — derived from the entity-resolution layer, surfaces honestly so the user knows whether the match is solid.

**Bulk import (secondary flow).** Paste a list of names (CSV or one-per-line), system attempts to match each, shows a review table with match candidates and confidence. User confirms or marks as "no match" — unmatched names are saved as text-only entries to be resolved later when more data comes in.

**Empty-state hint.** "Add 10–20 priority KOLs for meeting-prep value. You can add more anytime."

### 1.4f — Strategic Keywords & Topics

**Inputs.** Free-form keyword chips (*"IL-23 inhibitors", "fibrosis regression", "treat-to-target", "real world evidence"*). These become the search vocabulary surfaced in the Intel Feed and Ask-anything search, and they boost relevance scoring on matching abstracts.

**Hint pattern.** Once TAs and pipeline assets are set, suggest keywords from the topic matrix: *"Based on your TAs and pipeline, you might want to track: IL-23 inhibitors, JAK safety, fibrosis regression. Add all →"*

---

## 1.5 Configure prioritization weights

**Screen:** Prioritization Settings (`#/clients/gsk/settings/prioritization`) — full page, not a drawer (this deserves dedicated attention).

**What the user sees.** A pre-populated set of sensible defaults so the page is functional immediately. The defaults:

| Factor | Default weight |
|---|---|
| Relevance to Therapeutic Areas | 25% |
| Relevance to Focus Areas | 20% |
| KOL Influence & Expertise | 15% |
| Scientific / Clinical Impact | 15% |
| Company / Competitor Relevance | 10% |
| Potential for Collaboration | 10% |
| Historical Engagement | 5% |

**What they do.** They can:
- Adjust sliders (total must stay 100% — moving one rebalances the others proportionally).
- Pick a preset *Mode* (Balanced / Competitive Watch / KOL Engagement / Scientific Discovery) which sets weights to known good combinations for those use cases.
- See the *Priority Impact Preview* update at the bottom — counts of KOLs / Sessions / Abstracts / Posters / Networking at each priority level, so they can see the effect of their changes immediately.

**Why this isn't required.** Defaults are deliberately reasonable. A team that doesn't care about scoring nuance can ignore this page entirely and the product still works. The page exists so when scoring feels off, there's a clear place to fix it — making the engine *feel controllable*, even for users who never open it.

**Save behavior.** Auto-saves on each adjustment with a debounced toast — no Save button friction.

---

## 1.6 Configure user profile (optional)

**Screen:** User Profile (`#/profile`).

**Important framing for the developer.** This is the *user's personal overlay* on top of the workspace's strategic context — not a separate identity layer. The fields here narrow what *this user* sees and gets notified about, without changing the underlying client context that the whole team shares.

**What the user does.**
- Confirms personal info, time zone, default workspace.
- Optionally sets personal interests: TAs, focus areas, keywords, molecules of interest, competitors of interest, KOLs of interest. These narrow the feed *for them*; teammates with different interests see different ranked surfaces of the same data.
- Communication preferences (email / Slack / Teams / in-app) and meeting availability.

**Why optional.** Without personal overlays, the user sees the unfiltered client view, which is fine. With overlays, the experience personalizes. New users often skip this and come back after they've used the product for a week and know what they want filtered.

**Important UX behavior.** A small note at the top of the strategic-interests section: *"This narrows what you see — it doesn't change the GSK workspace context for your team."* The personal-vs-shared distinction is a real source of confusion in multi-tenant products; address it inline.

---

## 1.7 Workspace ready — gateway to Step 2

**Screen:** Client Workspace (`#/clients/gsk`) — now in **configured state**.

**What changes from the empty state.**
- The setup checklist collapses to a small "Setup complete · 6/7 ✓" tag at the top (clicking expands it to revisit).
- The full Overview layout from the prototype (Section 2.2) takes its place: metrics (KOLs Tracked, Insights Captured, Strategic Priorities), Strategic Priorities cards, Top Therapeutic Areas donut, Recent Activity, Key Documents.
- **The "+ New Congress" button is now enabled.** Hover state shows: *"Add your first congress to start ingesting abstracts and prioritizing sessions."*
- A small one-time onboarding banner at the top: *"You're ready. Add your first congress to see the lens in action →"* with a primary CTA. Dismissable.

**This is the handoff to Step 2.** Step 2 is congress creation and ingestion. Step 1 is structurally done.

---

## Success criteria for Step 1

- [ ] Client workspace exists with a name and at least one TA.
- [ ] At least one strategic priority recorded.
- [ ] At least one therapeutic area selected.
- [ ] Prioritization weights are set (defaults are fine).
- [ ] User has been to the workspace overview at least once in its configured state.
- [ ] "+ New Congress" CTA is enabled.

These are the bare minimum. Pipeline / competitors / KOLs / keywords sharpen the lens — without them the product still works but precision suffers. The recommended-but-not-required framing is deliberate: it lowers the barrier to seeing value while making it obvious how to deepen the configuration when the team is ready.

---

## What's deliberately *not* in Step 1

A few things that might feel like they belong here but don't:

**Adding a congress.** That's Step 2. Forcing a user to add a congress before they've configured anything produces an undifferentiated abstract list and a bad first impression. Configure first, ingest second.

**Inviting team members.** A real product needs this; the prototype doesn't. The mocked workspace pretends there's already a team. Add invitation flow only when the real frontend POC ships.

**Importing existing intelligence (e.g. last year's congress notes).** Worth doing later for organizations transitioning from existing workflows, but it would over-scope Step 1. Defer to a separate import flow tied to congress creation.

**The full Company Profile (industry-level documents, slide decks).** The "Key Documents" panel exists on the Client Workspace overview, but uploading there is post-setup. Sometimes a user pastes pipeline data into the chat with an AI assistant and gets a populated workspace back in one step — that's a Step-1.5 helper we can build later. Out of scope here.

---

## Edge cases the prototype should handle (even loosely)

- **Returning to incomplete setup.** If the user leaves halfway and comes back, the checklist remembers progress and they pick up where they left off.
- **Switching the default workspace.** A user with multiple client workspaces can change their default; the topbar context updates everywhere.
- **Restoring defaults on prioritization.** Easy "Reset to Defaults" button on the Prioritization Settings page — undo a botched configuration in one click.
- **Empty pipeline / competitor lists.** The Intel Feed still works without these, but visibly notes "Own-company flagging disabled" or "Competitive flagging disabled" so the user knows what they're missing.

---

## What comes next (Step 2 preview, just enough context for handoff)

Once the workspace is configured, the user clicks "+ New Congress" and enters the Congress Creation flow (prototype Section 2.10): naming the congress, attaching ingest sources (PDFs, URLs, API connectors), and watching the ingestion progress as abstracts are extracted, entities resolved against the configured context, and the Intel Feed populated. That's Step 2 — we'll detail it separately when this step is built and reviewed.