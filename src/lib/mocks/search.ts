import type { SearchResponse } from "../api/types";
import { MOCK_ABSTRACTS } from "./data";

export function mockSearch(query: string): SearchResponse {
  const q = query.toLowerCase();
  const filtered = MOCK_ABSTRACTS.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.disease?.toLowerCase().includes(q) ||
      a.drugs?.some((d) => d.toLowerCase().includes(q)) ||
      a.ai_summary?.toLowerCase().includes(q)
  );
  const results = (filtered.length > 0 ? filtered : MOCK_ABSTRACTS).slice(
    0,
    20
  );
  return {
    results,
    total: results.length,
    query,
  };
}
