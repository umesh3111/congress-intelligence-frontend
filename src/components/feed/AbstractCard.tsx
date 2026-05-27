import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { ChevronRight } from "lucide-react";
import type { AbstractCardData } from "@/lib/api/types";

interface AbstractCardProps {
  abstract: AbstractCardData;
}

const PHASE_LABELS: Record<string, string> = {
  phase_1: "Phase 1",
  phase_2: "Phase 2",
  phase_3: "Phase 3",
  phase_4: "Phase 4",
  rwe: "RWE",
  observational: "Observational",
  unknown: "",
};

export function AbstractCard({ abstract }: AbstractCardProps) {
  const absId = abstract.abstract_id;

  return (
    <article className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow group">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {abstract.conference_name && (
            <Tag label={`${abstract.conference_name}`} variant="navy" size="xs" />
          )}
          {abstract.trial_phase && PHASE_LABELS[abstract.trial_phase] && (
            <Tag
              label={PHASE_LABELS[abstract.trial_phase]}
              variant="slate"
              size="xs"
            />
          )}
          {abstract.is_own_pipeline && (
            <Tag label="● Own pipeline" variant="teal" size="xs" />
          )}
          {abstract.is_competitor && (
            <Tag label="▲ Competitor" variant="red" size="xs" />
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-mono shrink-0">
          {abstract.abstract_number}
        </span>
      </div>

      {/* Title */}
      <Link href={`/abstracts/${absId}`}>
        <h3 className="font-semibold text-[#0F2A43] text-sm leading-snug mb-2 group-hover:text-[#0D9488] transition-colors line-clamp-2">
          {abstract.title}
        </h3>
      </Link>

      {/* Summary */}
      {abstract.ai_summary && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
          {abstract.ai_summary.replace("[AI-generated] ", "")}
        </p>
      )}

      {/* Drugs */}
      {abstract.drugs && abstract.drugs.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {abstract.drugs.map((d) => (
            <span
              key={d}
              className="text-[10px] bg-teal-50 text-teal-700 border border-teal-100 px-2 py-0.5 rounded-full font-mono"
            >
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
        <div className="text-xs text-slate-500">
          {abstract.presenting_author && (
            <span className="font-medium text-slate-600">
              {abstract.presenting_author}
            </span>
          )}
          {abstract.disease && (
            <span className="ml-1 text-slate-400">· {abstract.disease}</span>
          )}
        </div>
        <Link
          href={`/abstracts/${absId}`}
          className="flex items-center gap-1 text-xs text-[#0D9488] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View <ChevronRight size={12} />
        </Link>
      </div>
    </article>
  );
}
