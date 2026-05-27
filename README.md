# Congress Intelligence Platform — Frontend POC

A Next.js thin BFF that proxies to the FastAPI backend, with mock fallbacks for all screens.

## Quick Start

### 1. Start the backend (in `congress-be/`)
```bash
cd ../congress-be
docker compose up postgres -d
DATABASE_URL="postgresql+psycopg://congress:congress@localhost:5433/congress" \
  ANTHROPIC_API_KEY="..." \
  .venv/bin/python -m scripts.seed        # seed DDW 2026 data once
source .venv/bin/activate
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Start the frontend
```bash
npm install
npm run dev
# → http://localhost:9090
```

### 3. Configure (`.env.local`)
| Variable | Default | Notes |
|---|---|---|
| `API_BASE` | `http://localhost:8000` | Backend URL — server-side only, never exposed to browser |
| `USE_MOCK_DATA` | `false` | `true` forces mock data on every screen |

In **development mode** the app falls back to mock data automatically when the backend is unreachable. Every mocked screen shows an orange **"Demo data"** badge.

---

## Demo Script (10 minutes)

### 1. Intel Feed (`/feed`)
- Open `http://localhost:9090` — lands on DDW 2026 abstract cards
- Note **"● Own pipeline"** (teal) and **"▲ Competitor"** (red) tags
- Type **"fibrosis regression"** in search → results rerank

### 2. Abstract Detail (`/abstracts/ab-002`)
- Click the MAESTRO-NASH semaglutide abstract
- AI Summary panel (teal, labelled system-generated), structured sections, NCT number
- No full abstract text — copyright boundary enforced structurally
- Click the presenting author → KOL dossier

### 3. KOL Dossier (`/kols/kol-002`)
- James Rodriguez: h-index, OpenAlex/ORCID links
- Presentation history grouped by year — DDW 2025 + 2026 (cross-congress person resolution)

### 4. Ask Anything (`/ask`) — headline feature
- Click suggested: **"Which KOLs discussed fibrosis regression at DDW 2026?"**
- Watch tokens stream word-by-word
- Source chips appear — click one → jumps to that abstract
- Ask: **"Compare risankizumab vs ustekinumab"** — competitive framing in answer

### 5. Capture (`/capture`)
- Drag a PDF → spinner → "queued for extraction"
- Mock team captures feed (Demo data badge) shows what real-time teammate captures look like

---

## Architecture

```
Browser (port 9090)
    │  same-origin — no CORS
    ▼
Next.js App Router (BFF)
    ├── Server Components  → fetch via API_BASE (private env)
    │                        X-Principal: demo-user (stub auth)
    ├── /api/ask           → SSE streaming route handler
    └── Fallback           → mock data (same types)
    ▼
FastAPI (port 8000)
    ├── GET /search
    ├── GET /abstracts/{id}
    ├── GET /people/{id}
    ├── GET /people/{id}/appearances
    └── POST /uploads
```

## Real vs Mocked Screens

| Route | Data |
|---|---|
| `/feed` | **REAL** (mock fallback) |
| `/abstracts/[id]` | **REAL** (mock fallback) |
| `/kols/[id]` | **REAL** (mock fallback) |
| `/ask` | **REAL streaming** (mock streams pre-written answer) |
| `/capture` | Upload: **REAL** · Live feed: **MOCKED** |

## Project Layout

```
src/
├── app/                     # Next.js App Router pages + route handlers
│   ├── feed/page.tsx        # Intel Feed (REAL)
│   ├── abstracts/[id]/      # Abstract Detail (REAL)
│   ├── kols/[id]/           # KOL Dossier (REAL)
│   ├── ask/page.tsx         # Ask Anything (REAL streaming)
│   ├── capture/page.tsx     # Capture (upload REAL, feed MOCKED)
│   └── api/ask/route.ts     # SSE streaming route handler
├── components/
│   ├── nav/Sidebar.tsx
│   ├── feed/{SearchBar,AbstractCard}.tsx
│   ├── ask/ChatInterface.tsx
│   └── ui/{DemoBadge,Tag}.tsx
└── lib/
    ├── api/       # Real FastAPI calls (server-side)
    └── mocks/     # Mock data — identical TypeScript types
```
