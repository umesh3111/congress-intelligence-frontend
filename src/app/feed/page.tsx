import { Suspense } from "react";
import { SearchBar } from "@/components/feed/SearchBar";
import { AbstractCard } from "@/components/feed/AbstractCard";
import { mockSearch } from "@/lib/mocks/search";
import type { AbstractCardData } from "@/lib/api/types";

const USE_MOCK =
  process.env.USE_MOCK_DATA === "true" ||
  process.env.NODE_ENV === "development";

async function getResults(query: string): Promise<{
  results: AbstractCardData[];
  total: number;
  query: string;
  isMock: boolean;
}> {
  if (USE_MOCK) {
    const data = mockSearch(query || "IBD MASH fibrosis");
    return { ...data, results: data.results as AbstractCardData[], isMock: true };
  }

  try {
    const API_BASE = process.env.API_BASE ?? "http://localhost:8000";
    const qs = new URLSearchParams({ q: query || "IBD MASH", limit: "20" });
    const res = await fetch(`${API_BASE}/search?${qs}`, {
      headers: { "X-Principal": "demo-user" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return { ...data, isMock: false };
  } catch {
    const data = mockSearch(query || "IBD MASH fibrosis");
    return { ...data, results: data.results as AbstractCardData[], isMock: true };
  }
}

interface FeedPageProps {
  searchParams: Promise<{ q?: string; ta?: string; phase?: string }>;
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const { results, total, isMock } = await getResults(query);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2A43]">Intel Feed</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            DDW 2026 · {total} abstracts
            {query && (
              <span className="ml-1">
                matching <em>&quot;{query}&quot;</em>
              </span>
            )}
          </p>
        </div>
        {isMock && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Demo data
          </span>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar defaultValue={query} />
      </div>

      {/* Quick filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "IBD", "MASH", "Phase 3", "Own pipeline", "Competitor"].map(
          (f) => (
            <button
              key={f}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#E2E8F0] bg-white text-slate-600 hover:border-[#0D9488] hover:text-[#0D9488] transition"
            >
              {f}
            </button>
          )
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg font-medium mb-1">No results found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((abstract) => (
            <AbstractCard key={abstract.abstract_id} abstract={abstract} />
          ))}
        </div>
      )}
    </div>
  );
}
