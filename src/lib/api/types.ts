// Types generated from FastAPI OpenAPI spec
// Backend routes: /search, /abstracts/{id}, /people/{id}, /people/{id}/appearances

export interface SearchResultItem {
  abstract_id: string;
  title: string;
  ai_summary?: string;
  rrf_score: number;
  source_url?: string;
}

export interface SearchResponse {
  results: SearchResultItem[];
  total: number;
  query: string;
}

export interface AbstractDetailResponse {
  id: string;
  title: string;
  background?: string;
  methods?: string;
  results?: string;
  conclusions?: string;
  ai_summary?: string;
  nct_number?: string;
  clinical_trial_phase?: string;
  source_url?: string;
}

export interface PersonResponse {
  id: string;
  full_name_raw: string;
  openalex_id?: string;
  orcid?: string;
}

export interface PersonAppearanceResponse {
  conference_name: string;
  abstract_title: string;
  role: string;
  year: number;
}

export interface HealthResponse {
  status: string;
  version: string;
  database: string;
  timestamp: string;
}

// Extended types for UI (not from API)
export interface AbstractCardData extends SearchResultItem {
  conference_name?: string;
  conference_year?: number;
  disease?: string;
  therapeutic_area?: string;
  drugs?: string[];
  companies?: string[];
  presenting_author?: string;
  is_competitor?: boolean;
  is_own_pipeline?: boolean;
  trial_phase?: string;
  abstract_number?: string;
  nct_number?: string;
}
