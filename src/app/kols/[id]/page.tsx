import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { MOCK_PERSONS, MOCK_APPEARANCES } from "@/lib/mocks/data";
import type { PersonAppearanceResponse } from "@/lib/api/types";

const USE_MOCK =
  process.env.USE_MOCK_DATA === "true" ||
  process.env.NODE_ENV === "development";

async function getKOL(id: string) {
  if (USE_MOCK) {
    return {
      person: MOCK_PERSONS[id] ?? null,
      appearances: MOCK_APPEARANCES[id] ?? [],
      isMock: true,
    };
  }
  try {
    const API_BASE = process.env.API_BASE ?? "http://localhost:8000";
    const [personRes, appRes] = await Promise.all([
      fetch(`${API_BASE}/people/${id}`, {
        headers: { "X-Principal": "demo-user" },
        next: { revalidate: 300 },
      }),
      fetch(`${API_BASE}/people/${id}/appearances`, {
        headers: { "X-Principal": "demo-user" },
        next: { revalidate: 300 },
      }),
    ]);
    const person = personRes.ok ? await personRes.json() : null;
    const appearances = appRes.ok ? await appRes.json() : [];
    return { person, appearances, isMock: false };
  } catch {
    return {
      person: MOCK_PERSONS[id] ?? null,
      appearances: MOCK_APPEARANCES[id] ?? [],
      isMock: true,
    };
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KOLPage({ params }: PageProps) {
  const { id } = await params;
  const { person, appearances, isMock } = await getKOL(id);

  if (!person) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-500">KOL not found.</p>
        <Link
          href="/feed"
          className="text-[#0D9488] text-sm mt-4 inline-block"
        >
          ← Back to Feed
        </Link>
      </div>
    );
  }

  const initials = person.full_name_raw
    .split(" ")
    .filter(Boolean)
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const byYear = (appearances as PersonAppearanceResponse[]).reduce<
    Record<number, PersonAppearanceResponse[]>
  >((acc, ap) => {
    if (!acc[ap.year]) acc[ap.year] = [];
    acc[ap.year].push(ap);
    return acc;
  }, {});
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
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

      {/* KOL header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
            style={{ backgroundColor: "#0F2A43" }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#0F2A43]">
              {person.full_name_raw}
            </h1>
            {"institution" in person && person.institution && (
              <p className="text-sm text-slate-500 mt-0.5">
                {person.institution as string}
              </p>
            )}
            {"credentials" in person && person.credentials && (
              <p className="text-xs text-slate-400 mt-1">
                {person.credentials as string}
              </p>
            )}
          </div>
          <div className="text-right">
            {"h_index" in person && person.h_index && (
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0D9488]">
                  {person.h_index as number}
                </div>
                <div className="text-xs text-slate-400">h-index</div>
              </div>
            )}
          </div>
        </div>

        {/* IDs */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#E2E8F0]">
          {person.openalex_id && (
            <a
              href={`https://openalex.org/${person.openalex_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0D9488] transition"
            >
              <ExternalLink size={11} /> OpenAlex
            </a>
          )}
          {person.orcid && (
            <a
              href={`https://orcid.org/${person.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0D9488] transition"
            >
              <ExternalLink size={11} /> ORCID
            </a>
          )}
          {"primary_ta" in person && person.primary_ta && (
            <Tag label={person.primary_ta as string} variant="teal" size="xs" />
          )}
        </div>
      </div>

      {/* Presentation history */}
      <h2 className="text-base font-bold text-[#0F2A43] mb-4">
        Presentation History
      </h2>
      {years.length === 0 ? (
        <p className="text-sm text-slate-400">No presentations recorded.</p>
      ) : (
        <div className="space-y-6">
          {years.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={13} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-600">
                  {year}
                </span>
              </div>
              <div className="space-y-2 ml-5">
                {byYear[year].map((ap, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-[#0F2A43] leading-snug">
                          {ap.abstract_title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {ap.conference_name}
                        </p>
                      </div>
                      <Tag
                        label={ap.role.replace("_", " ")}
                        variant={
                          ap.role === "presenting_author" ? "teal" : "slate"
                        }
                        size="xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
