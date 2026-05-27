import type {
  AbstractCardData,
  AbstractDetailResponse,
  PersonResponse,
  PersonAppearanceResponse,
} from "../api/types";

export const MOCK_ABSTRACTS: AbstractCardData[] = [
  {
    abstract_id: "ab-001",
    title:
      "Risankizumab vs Ustekinumab in Moderately-to-Severely Active Crohn's Disease: 52-Week Data from GALAXI-3",
    ai_summary:
      "[AI-generated] This phase 3 head-to-head trial demonstrated superior endoscopic response with risankizumab compared to ustekinumab at week 52 in biologic-experienced Crohn's disease patients. The GALAXI-3 trial enrolled 612 patients across 142 sites globally.",
    rrf_score: 0.98,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "Crohn's Disease",
    therapeutic_area: "Inflammatory Bowel Disease",
    drugs: ["risankizumab", "ustekinumab"],
    companies: ["AbbVie", "Johnson & Johnson"],
    presenting_author: "Sarah Chen",
    is_own_pipeline: true,
    is_competitor: false,
    trial_phase: "phase_3",
    abstract_number: "2026-001",
    source_url: "https://ddw.org/abstracts/2026-001",
  },
  {
    abstract_id: "ab-002",
    title:
      "Semaglutide 2.4mg in MASH: 72-Week Fibrosis Outcomes from the MAESTRO-NASH Extension",
    ai_summary:
      "[AI-generated] Extended data from MAESTRO-NASH demonstrate sustained fibrosis regression in 47% of patients receiving semaglutide 2.4mg at 72 weeks, with MRI-PDFF reductions of 38% from baseline. FIB-4 normalization was achieved in 52% of responders.",
    rrf_score: 0.94,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "MASH",
    therapeutic_area: "Metabolic-associated Steatohepatitis",
    drugs: ["semaglutide"],
    companies: ["Novo Nordisk"],
    presenting_author: "James Rodriguez",
    is_own_pipeline: false,
    is_competitor: true,
    trial_phase: "phase_3",
    abstract_number: "2026-002",
    nct_number: "NCT04822181",
    source_url: "https://ddw.org/abstracts/2026-002",
  },
  {
    abstract_id: "ab-003",
    title:
      "Real-World Safety of Upadacitinib in IBD: 24-Month Data from the VICTORY Registry",
    ai_summary:
      "[AI-generated] The VICTORY registry reports on 2,847 patients with IBD receiving upadacitinib in routine clinical practice. Serious adverse events occurred in 8.3% of patients, with no unexpected safety signals beyond the known JAK inhibitor class profile. MACE rate was 0.4 events per 100 patient-years.",
    rrf_score: 0.91,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "Ulcerative Colitis",
    therapeutic_area: "Inflammatory Bowel Disease",
    drugs: ["upadacitinib"],
    companies: ["AbbVie"],
    presenting_author: "Anna Mueller",
    is_own_pipeline: true,
    is_competitor: false,
    trial_phase: "rwe",
    abstract_number: "2026-003",
    source_url: "https://ddw.org/abstracts/2026-003",
  },
  {
    abstract_id: "ab-004",
    title:
      "IL-23 Inhibitor Positioning in UC Treat-to-Target: Mirikizumab vs Risankizumab — A Network Meta-Analysis",
    ai_summary:
      "[AI-generated] This network meta-analysis of 18 RCTs encompassing 6,240 patients demonstrates comparable efficacy between mirikizumab and risankizumab for induction of endoscopic remission in UC (RR 1.08, 95% CI 0.91-1.28). Maintenance data favors risankizumab on bowel urgency outcomes.",
    rrf_score: 0.89,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "Ulcerative Colitis",
    therapeutic_area: "Inflammatory Bowel Disease",
    drugs: ["mirikizumab", "risankizumab"],
    companies: ["Eli Lilly", "AbbVie"],
    presenting_author: "David Kim",
    is_own_pipeline: true,
    is_competitor: true,
    trial_phase: "phase_3",
    abstract_number: "2026-004",
    source_url: "https://ddw.org/abstracts/2026-004",
  },
  {
    abstract_id: "ab-005",
    title:
      "Tirzepatide in MASH with Type 2 Diabetes: 96-Week Histological Outcomes from HARMONY-MASH",
    ai_summary:
      "[AI-generated] HARMONY-MASH demonstrates that tirzepatide 15mg achieves MASH resolution without worsening fibrosis in 62% of patients vs 14% on placebo at 96 weeks. Fibrosis improvement ≥1 stage was observed in 55% of tirzepatide recipients.",
    rrf_score: 0.87,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "MASH",
    therapeutic_area: "Metabolic-associated Steatohepatitis",
    drugs: ["tirzepatide"],
    companies: ["Eli Lilly"],
    presenting_author: "Rachel Osei",
    is_own_pipeline: false,
    is_competitor: true,
    trial_phase: "phase_3",
    abstract_number: "2026-005",
    nct_number: "NCT05065359",
    source_url: "https://ddw.org/abstracts/2026-005",
  },
  {
    abstract_id: "ab-006",
    title:
      "Fibrosis Regression Biomarkers in MASH: Prospective Validation of FIB-4 and ELF Against Liver Biopsy",
    ai_summary:
      "[AI-generated] This prospective validation study (n=484) confirms FIB-4 <1.3 as a reliable rule-out for advanced fibrosis (NPV 94%) while ELF >9.8 demonstrates acceptable rule-in sensitivity (72%). MRI-PDFF adds incremental value for steatosis monitoring independent of fibrosis stage.",
    rrf_score: 0.85,
    conference_name: "DDW 2026",
    conference_year: 2026,
    disease: "MASH",
    therapeutic_area: "Metabolic-associated Steatohepatitis",
    drugs: [],
    companies: [],
    presenting_author: "Anna Mueller",
    is_own_pipeline: false,
    is_competitor: false,
    trial_phase: "observational",
    abstract_number: "2026-006",
    source_url: "https://ddw.org/abstracts/2026-006",
  },
];

export const MOCK_ABSTRACT_DETAIL: Record<string, AbstractDetailResponse> = {
  "ab-001": {
    id: "ab-001",
    title:
      "Risankizumab vs Ustekinumab in Moderately-to-Severely Active Crohn's Disease: 52-Week Data from GALAXI-3",
    background:
      "Risankizumab (selective IL-23p19 inhibitor) and ustekinumab (IL-12/23 p40 inhibitor) represent mechanistically distinct biologics for Crohn's disease. Direct comparative data are limited.",
    methods:
      "GALAXI-3 was a phase 3b, double-blind, double-dummy RCT. Biologic-experienced adults with moderately-to-severely active CD (CDAI 220–450, SES-CD ≥6) were randomized 1:1 to risankizumab 600mg IV induction → 360mg SC Q8W or ustekinumab per label. Primary endpoint: SES-CD response at week 52 (NCT05116774).",
    results:
      "612 patients enrolled (306/arm). At week 52, SES-CD response was achieved by 47.1% (risankizumab) vs 34.6% (ustekinumab) (OR 1.68, 95% CI 1.18–2.39; p=0.004). Endoscopic remission: 34.3% vs 24.2% (p=0.009). Clinical remission (PRO-2): 58.2% vs 49.3% (p=0.04). No new safety signals; serious AE rates comparable (8.2% vs 9.1%).",
    conclusions:
      "Risankizumab demonstrated superior endoscopic response and remission vs ustekinumab at 52 weeks in biologic-experienced CD. These data support repositioning IL-23 selective inhibition as preferred advanced therapy in this population.",
    ai_summary:
      "[AI-generated] This phase 3 head-to-head trial demonstrated superior endoscopic response with risankizumab compared to ustekinumab at week 52 in biologic-experienced Crohn's disease patients. The GALAXI-3 trial enrolled 612 patients across 142 sites globally.",
    nct_number: "NCT05116774",
    clinical_trial_phase: "phase_3",
    source_url: "https://ddw.org/abstracts/2026-001",
  },
  "ab-002": {
    id: "ab-002",
    title:
      "Semaglutide 2.4mg in MASH: 72-Week Fibrosis Outcomes from the MAESTRO-NASH Extension",
    background:
      "GLP-1 receptor agonists have demonstrated hepatic benefits in MASH. MAESTRO-NASH showed semaglutide 2.4mg achieved MASH resolution at 48 weeks. Long-term fibrosis data are now available.",
    methods:
      "Open-label extension of MAESTRO-NASH enrolling completers (n=312) for an additional 24 weeks. Key endpoints: fibrosis stage ≥1 improvement, FIB-4 normalization (<1.3), MRI-PDFF change. NCT04822181.",
    results:
      "At 72 weeks, fibrosis regression ≥1 stage: 47.3% vs 12.1% placebo extension arm. MRI-PDFF reduction: -38.2% vs -4.1%. FIB-4 normalization: 52.1% of week-48 responders maintained. ALT normalized in 68% vs 31%. Body weight -12.4kg maintained.",
    conclusions:
      "Semaglutide 2.4mg demonstrates durable fibrosis benefit to 72 weeks with sustained MRI-PDFF reduction and FIB-4 normalization. These data support semaglutide as an anchor agent in MASH treatment strategies.",
    ai_summary:
      "[AI-generated] Extended data from MAESTRO-NASH demonstrate sustained fibrosis regression in 47% of patients receiving semaglutide 2.4mg at 72 weeks, with MRI-PDFF reductions of 38% from baseline. FIB-4 normalization was achieved in 52% of responders.",
    nct_number: "NCT04822181",
    clinical_trial_phase: "phase_3",
    source_url: "https://ddw.org/abstracts/2026-002",
  },
};

export interface ExtendedPersonResponse extends PersonResponse {
  institution?: string;
  credentials?: string;
  h_index?: number;
  primary_ta?: string;
}

export const MOCK_PERSONS: Record<string, ExtendedPersonResponse> = {
  "kol-001": {
    id: "kol-001",
    full_name_raw: "Sarah J. Chen, MD",
    openalex_id: "A2345678901",
    orcid: "0000-0002-1234-5678",
    institution: "Mayo Clinic, Rochester MN",
    credentials: "MD, AGAF, FACG",
    h_index: 42,
    primary_ta: "Inflammatory Bowel Disease",
  },
  "kol-002": {
    id: "kol-002",
    full_name_raw: "James A. Rodriguez, PhD",
    openalex_id: "A3456789012",
    orcid: "0000-0003-2345-6789",
    institution: "Mount Sinai, New York NY",
    credentials: "MD PhD",
    h_index: 38,
    primary_ta: "Metabolic-associated Steatohepatitis",
  },
};

export const MOCK_APPEARANCES: Record<string, PersonAppearanceResponse[]> = {
  "kol-001": [
    {
      conference_name: "DDW 2026",
      abstract_title:
        "Risankizumab vs Ustekinumab in Moderately-to-Severely Active Crohn's Disease: 52-Week Data from GALAXI-3",
      role: "presenting_author",
      year: 2026,
    },
    {
      conference_name: "DDW 2025",
      abstract_title:
        "IL-23 Selective Inhibitors in IBD: 2-Year Safety Pooled Analysis",
      role: "presenting_author",
      year: 2025,
    },
    {
      conference_name: "DDW 2025",
      abstract_title:
        "Treat-to-Target in UC: 3-Year Outcomes from the STRIDE-II Implementation Cohort",
      role: "co_author",
      year: 2025,
    },
    {
      conference_name: "DDW 2024",
      abstract_title:
        "Risankizumab Induction in Biologic-Experienced CD: ADVANCE Extension Data",
      role: "presenting_author",
      year: 2024,
    },
  ],
  "kol-002": [
    {
      conference_name: "DDW 2026",
      abstract_title:
        "Semaglutide 2.4mg in MASH: 72-Week Fibrosis Outcomes from the MAESTRO-NASH Extension",
      role: "presenting_author",
      year: 2026,
    },
    {
      conference_name: "DDW 2026",
      abstract_title:
        "Fibrosis Regression Biomarkers in MASH: Prospective Validation of FIB-4 and ELF",
      role: "co_author",
      year: 2026,
    },
    {
      conference_name: "DDW 2025",
      abstract_title:
        "GLP-1 Agonists in MASH: Mechanistic Insights from Paired Biopsy Studies",
      role: "presenting_author",
      year: 2025,
    },
  ],
};

// Maps abstract_id to kol_id for navigation
export const MOCK_ABSTRACT_TO_KOL: Record<string, string> = {
  "ab-001": "kol-001",
  "ab-002": "kol-002",
  "ab-003": "kol-001",
  "ab-004": "kol-002",
};
