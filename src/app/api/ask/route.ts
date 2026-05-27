import { NextRequest } from "next/server";

const USE_MOCK =
  process.env.USE_MOCK_DATA === "true" ||
  process.env.NODE_ENV === "development";
const API_BASE = process.env.API_BASE ?? "http://localhost:8000";

// Mock streaming answer for demo
const MOCK_ANSWERS: Record<string, string> = {
  default: `Based on the DDW 2026 abstract corpus, here is what I found:

**Fibrosis regression** is a major theme this year, particularly in MASH. Key findings include:

1. **Semaglutide 2.4mg** (MAESTRO-NASH extension) achieved fibrosis regression ≥1 stage in 47% of patients at 72 weeks — sustained from the 48-week primary endpoint. MRI-PDFF reduction was 38%.

2. **Tirzepatide 15mg** (HARMONY-MASH) demonstrated 55% fibrosis improvement at 96 weeks, with MASH resolution in 62% vs 14% on placebo.

3. **Non-invasive biomarkers** (FIB-4 <1.3, ELF >9.8, MRI-PDFF) are being validated as surrogate endpoints — a prospective study (n=484) confirms FIB-4 as a reliable rule-out (NPV 94%).

The leading KOLs discussing fibrosis regression include **James Rodriguez** (Mount Sinai) and **Anna Mueller** (Humanitas), both presenting multiple abstracts on NIT validation and GLP-1 outcomes.`,
  kol: `**KOLs discussing fibrosis regression at DDW 2026:**

**James A. Rodriguez, PhD** — Mount Sinai
Presenting 2 abstracts on MASH fibrosis outcomes. Lead presenter on the MAESTRO-NASH 72-week extension data and co-author on FIB-4/ELF validation study.

**Anna Mueller** — Humanitas
Presented the prospective NIT validation study (n=484) confirming FIB-4 <1.3 as a reliable rule-out for advanced fibrosis (NPV 94%). Also co-authored the combination MASH therapy paper.

**Rachel Osei** — University Health Network
Presented HARMONY-MASH 96-week data for tirzepatide; strong track record in MASH histological endpoints.

These KOLs represent Tier A institutions and are highly cited in MASH fibrosis literature. Engagement priority is high given overlap with your competitor monitoring mandate.`,
};

function getMockAnswer(question: string): string {
  const q = question.toLowerCase();
  if (
    q.includes("kol") ||
    q.includes("who") ||
    q.includes("author")
  ) {
    return MOCK_ANSWERS.kol;
  }
  return MOCK_ANSWERS.default;
}

// Source chips to return with each answer
const MOCK_SOURCES = [
  {
    id: "ab-002",
    title: "Semaglutide 2.4mg in MASH: 72-Week Fibrosis Outcomes",
    score: 0.94,
  },
  {
    id: "ab-005",
    title: "Tirzepatide in MASH with Type 2 Diabetes: HARMONY-MASH",
    score: 0.87,
  },
  {
    id: "ab-006",
    title:
      "Fibrosis Regression Biomarkers in MASH: FIB-4 and ELF Validation",
    score: 0.85,
  },
];

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (USE_MOCK) {
    // Stream mock answer token by token
    const answer = getMockAnswer(question ?? "");
    const sources = MOCK_SOURCES;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        // Stream the answer word by word
        const words = answer.split(" ");
        for (const word of words) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "token", content: word + " " })}\n\n`
            )
          );
          await new Promise((r) => setTimeout(r, 30)); // 30ms per word for streaming effect
        }

        // Send sources at the end
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "sources", sources })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "done" })}\n\n`
          )
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  // Real mode: search backend + synthesize
  try {
    // 1. Search for relevant abstracts
    const searchRes = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(question)}&limit=5`,
      {
        headers: { "X-Principal": "demo-user" },
      }
    );
    const searchData = searchRes.ok
      ? await searchRes.json()
      : { results: [] };
    const topResults = searchData.results?.slice(0, 5) ?? [];

    const context = topResults
      .map(
        (r: { title: string; ai_summary?: string }, i: number) =>
          `[${i + 1}] ${r.title}\n${r.ai_summary ?? ""}`
      )
      .join("\n\n");

    const sources = topResults.map(
      (r: { abstract_id: string; title: string; rrf_score: number }) => ({
        id: r.abstract_id,
        title: r.title,
        score: r.rrf_score,
      })
    );

    // 2. Stream answer (simple synthesis without Anthropic for now)
    const synthesized = `Based on the DDW 2026 abstract corpus:\n\n${context}\n\nThis analysis is based on ${topResults.length} most relevant abstracts.`;
    const words = synthesized.split(" ");

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for (const word of words) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "token", content: word + " " })}\n\n`
            )
          );
          await new Promise((r) => setTimeout(r, 20));
        }
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "sources", sources })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "done" })}\n\n`
          )
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    // Fallback to mock
    const answer = getMockAnswer(question ?? "");
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const words = answer.split(" ");
        for (const word of words) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "token", content: word + " " })}\n\n`
            )
          );
          await new Promise((r) => setTimeout(r, 30));
        }
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "sources", sources: MOCK_SOURCES })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "done" })}\n\n`
          )
        );
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  }
}
