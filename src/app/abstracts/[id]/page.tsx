import Link from "next/link";
import { ArrowLeft, ExternalLink, User, FlaskConical } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import {
  MOCK_ABSTRACT_DETAIL,
  MOCK_ABSTRACT_TO_KOL,
  MOCK_ABSTRACTS,
} from "@/lib/mocks/data";

const USE_MOCK =
  process.env.USE_MOCK_DATA === "true" ||
  process.env.NODE_ENV === "development";

async function getAbstract(id: string) {
  if (USE_MOCK) {
    return { data: MOCK_ABSTRACT_DETAIL[id] ?? null, isMock: true };
  }
  try {
    const API_BASE = process.env.API_BASE ?? "http://localhost:8000";
    const res = await fetch(`${API_BASE}/abstracts/${id}`, {
      headers: { "X-Principal": "demo-user" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Not found");
    return { data: await res.json(), isMock: false };
  } catch {
    return { data: MOCK_ABSTRACT_DETAIL[id] ?? null, isMock: true };
  }
}

const PHASE_LABELS: Record<string, string> = {
  phase_1: "Phase 1",
  phase_2: "Phase 2",
  phase_3: "Phase 3",
  phase_4: "Phase 4",
  rwe: "RWE",
  observational: "Observational",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AbstractPage({ params }: PageProps) {
  const { id } = await params;
  const { data: abstract, isMock } = await getAbstract(id);

  // Get extra info from mock card data
  const cardData = MOCK_ABSTRACTS.find((a) => a.abstract_id === id);
  const kolId = MOCK_ABSTRACT_TO_KOL[id];

  if (!abstract) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-500">Abstract not found.</p>
        <Link
          href="/feed"
          className="text-[#0D9488] text-sm mt-4 inline-block"
        >
          ← Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/feed"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0D9488] transition"
        >
          <ArrowLeft size={14} /> Intel Feed
        </Link>
        {isMock && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Demo
            data
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cardData?.conference_name && (
          <Tag label={cardData.conference_name} variant="navy" />
        )}
        {abstract.clinical_trial_phase &&
          PHASE_LABELS[abstract.clinical_trial_phase] && (
            <Tag
              label={PHASE_LABELS[abstract.clinical_trial_phase]}
              variant="slate"
            />
          )}
        {cardData?.is_own_pipeline && (
          <Tag label="● Own pipeline" variant="teal" />
        )}
        {cardData?.is_competitor && (
          <Tag label="▲ Competitor" variant="red" />
        )}
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold text-[#0F2A43] leading-snug mb-4">
        {abstract.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6 pb-6 border-b border-[#E2E8F0]">
        {cardData?.presenting_author && kolId && (
          <Link
            href={`/kols/${kolId}`}
            className="flex items-center gap-1.5 hover:text-[#0D9488] transition"
          >
            <User size={14} className="text-slate-400" />
            {cardData.presenting_author}
          </Link>
        )}
        {abstract.nct_number && (
          <span className="flex items-center gap-1.5 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
            <FlaskConical size={12} className="text-slate-400" />
            {abstract.nct_number}
          </span>
        )}
        {abstract.source_url && (
          <a
            href={abstract.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#0D9488] text-xs hover:underline"
          >
            <ExternalLink size={12} /> Source
          </a>
        )}
      </div>

      {/* AI Summary */}
      {abstract.ai_summary && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
              AI Summary
            </span>
            <span className="text-[10px] bg-teal-100 text-teal-600 px-1.5 py-0.5 rounded">
              system-generated
            </span>
          </div>
          <p className="text-sm text-teal-900 leading-relaxed">
            {abstract.ai_summary.replace("[AI-generated] ", "")}
          </p>
        </div>
      )}

      {/* Structured sections */}
      {[
        { label: "Background", content: abstract.background },
        { label: "Methods", content: abstract.methods },
        { label: "Results", content: abstract.results },
        { label: "Conclusions", content: abstract.conclusions },
      ]
        .filter((s) => s.content)
        .map(({ label, content }) => (
          <section key={label} className="mb-5">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {label}
            </h2>
            <p className="text-sm text-[#0F2A43] leading-relaxed">{content}</p>
          </section>
        ))}

      {/* Drugs */}
      {cardData?.drugs && cardData.drugs.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Drugs Mentioned
          </h3>
          <div className="flex flex-wrap gap-2">
            {cardData.drugs.map((d) => (
              <span
                key={d}
                className="text-xs bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full font-mono"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* KOL link */}
      {kolId && cardData?.presenting_author && (
        <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
          <Link
            href={`/kols/${kolId}`}
            className="flex items-center justify-between bg-[#F8FAFC] hover:bg-teal-50 border border-[#E2E8F0] hover:border-teal-200 rounded-xl p-4 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0F2A43] text-white flex items-center justify-center text-sm font-bold">
                {cardData.presenting_author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F2A43]">
                  {cardData.presenting_author}
                </div>
                <div className="text-xs text-slate-500">View KOL dossier</div>
              </div>
            </div>
            <ArrowLeft
              size={14}
              className="text-slate-400 rotate-180 group-hover:text-[#0D9488] transition"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
