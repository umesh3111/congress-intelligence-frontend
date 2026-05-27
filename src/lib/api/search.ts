import { backendGet } from "./backend";
import type { SearchResponse } from "./types";

export interface SearchParams {
  q: string;
  ta?: string;
  conference?: string;
  phase?: string;
  limit?: number;
}

export async function searchAbstracts(params: SearchParams): Promise<SearchResponse> {
  const qs = new URLSearchParams();
  qs.set("q", params.q);
  if (params.ta) qs.set("ta", params.ta);
  if (params.conference) qs.set("conference", params.conference);
  if (params.phase) qs.set("phase", params.phase);
  qs.set("limit", String(params.limit ?? 20));

  return backendGet<SearchResponse>(`/search?${qs}`);
}
