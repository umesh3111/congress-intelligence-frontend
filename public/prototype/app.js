/* ============================================================
   CONGRESS IQ — APP DATA + ROUTER + PAGE RENDERERS
   ============================================================ */

// ==========================================================
// DATA FIXTURES
// ==========================================================
const DATA = {
  user: {
    name: "Sarah Phillips", initials: "SP",
    title: "Director, Medical Affairs", org: "MedCom Agency",
    workspace: "GSK", email: "sarah.phillips@medcomagency.com",
    phone: "+1 (312) 555-0189", tz: "Eastern Time (ET)", location: "Chicago, IL, USA"
  },

  clients: [
    { id:"gsk", name:"GSK", abbr:"GSK", congresses:6, kols:245, insights:1368, reports:28,
      tas:["Gastroenterology","Respiratory","Oncology","Immunology"], prog:62 },
    { id:"merck", name:"Merck", abbr:"MRK", congresses:2, kols:89, insights:445, reports:12, prog:45 },
    { id:"boehringer", name:"Boehringer Ingelheim", abbr:"BI", congresses:2, kols:67, insights:312, reports:8, prog:38 },
    { id:"astrazeneca", name:"AstraZeneca", abbr:"AZ", congresses:3, kols:134, insights:678, reports:15, prog:71 },
    { id:"novartis", name:"Novartis", abbr:"NVS", congresses:2, kols:98, insights:489, reports:11, prog:55 },
    { id:"pfizer", name:"Pfizer", abbr:"PFE", congresses:1, kols:45, insights:201, reports:6, prog:30 }
  ],

  congresses: [
    { id:"ddw-2026", name:"Digestive Disease Week 2026", acronym:"DDW",
      dates:"May 3–6, 2026", city:"San Diego, CA", status:"active", client:"gsk", inDays:41 },
    { id:"asco-2026", name:"ASCO Annual Meeting 2026", acronym:"ASCO",
      dates:"May 31–Jun 4, 2026", city:"Chicago, IL", status:"planning", client:"merck", inDays:69 },
    { id:"ats-2026", name:"ATS International Conference 2026", acronym:"ATS",
      dates:"May 15–20, 2026", city:"San Francisco, CA", status:"active", client:"boehringer", inDays:54 },
    { id:"esmo-2026", name:"ESMO Congress 2026", acronym:"ESMO",
      dates:"Sep 12–16, 2026", city:"Barcelona, Spain", status:"planning", client:"astrazeneca", inDays:173 },
    { id:"acg-2026", name:"ACG Annual Scientific Meeting 2026", acronym:"ACG",
      dates:"Oct 23–28, 2026", city:"Philadelphia, PA", status:"planning", client:"gsk", inDays:214 },
    { id:"aan-2026", name:"AAN Annual Meeting 2026", acronym:"AAN",
      dates:"Apr 5–9, 2026", city:"New Orleans, LA", status:"completed", client:"novartis", inDays:-22 },
    { id:"ueg-2026", name:"UEG Week 2026", acronym:"UEG",
      dates:"Oct 4–8, 2026", city:"Vienna, Austria", status:"planning", client:"gsk", inDays:195 },
    { id:"ecco-2026", name:"ECCO Congress 2026", acronym:"ECCO",
      dates:"Feb 19–21, 2026", city:"Prague, CZ", status:"completed", client:"gsk", inDays:-95 }
  ],

  kols: [
    { id:"sarah-chen", name:"Dr. Sarah Chen", credentials:"MD PhD", initials:"SC",
      affiliation:"University Health Network", city:"Toronto, Canada",
      tier:1, sentiment:"positive", focus:["IBD","IL-23","Ulcerative Colitis"],
      influence:92, pubs:98, citations:6210, hIndex:43, match:"high",
      activity:[{congress:"DDW 2025",role:"Presenter"},{congress:"ECCO 2025",role:"Chair"}] },
    { id:"subrata-ghosh", name:"Dr. Subrata Ghosh", credentials:"MD PhD", initials:"SG",
      affiliation:"University of Chicago", city:"Chicago, IL, USA",
      tier:1, sentiment:"positive", focus:["IBD","Crohn's Disease","IL-23 Pathway"],
      influence:92, pubs:125, citations:8432, hIndex:51, match:"high",
      activity:[{congress:"DDW 2024",role:"Presenter"},{congress:"AGA 2023",role:"Panelist"}] },
    { id:"bram-vermeire", name:"Dr. Bram Vermeire", credentials:"MD PhD", initials:"BV",
      affiliation:"KU Leuven", city:"Leuven, Belgium",
      tier:1, sentiment:"neutral", focus:["IBD","Crohn's Disease","Biomarkers"],
      influence:89, pubs:143, citations:9876, hIndex:58, match:"high",
      activity:[{congress:"ECCO 2025",role:"Presenter"},{congress:"DDW 2024",role:"Panelist"}] },
    { id:"william-sandborn", name:"Dr. William Sandborn", credentials:"MD", initials:"WS",
      affiliation:"UC San Diego", city:"San Diego, CA, USA",
      tier:1, sentiment:"positive", focus:["IBD","UC","Clinical Trials"],
      influence:95, pubs:201, citations:14532, hIndex:72, match:"medium",
      activity:[{congress:"DDW 2025",role:"Plenary Chair"},{congress:"ECCO 2024",role:"Keynote"}] },
    { id:"brian-feagan", name:"Dr. Brian Feagan", credentials:"MD", initials:"BF",
      affiliation:"Western University", city:"London, ON, Canada",
      tier:1, sentiment:"positive", focus:["IBD","RCT Design","Endpoints"],
      influence:91, pubs:178, citations:11244, hIndex:65, match:"high",
      activity:[{congress:"DDW 2024",role:"Session Chair"},{congress:"UEGW 2024",role:"Panelist"}] },
    { id:"jean-frederic-colombel", name:"Dr. Jean-Frédéric Colombel", credentials:"MD", initials:"JC",
      affiliation:"Icahn School of Medicine at Mount Sinai", city:"New York, NY, USA",
      tier:1, sentiment:"neutral", focus:["Crohn's Disease","Tight Control","Biologics"],
      influence:88, pubs:156, citations:10123, hIndex:61, match:"medium",
      activity:[{congress:"ECCO 2025",role:"Moderator"},{congress:"DDW 2023",role:"Presenter"}] },
    { id:"ole-antonsen", name:"Dr. Ole Antonsen", credentials:"MD PhD", initials:"OA",
      affiliation:"University of Copenhagen", city:"Copenhagen, Denmark",
      tier:2, sentiment:"positive", focus:["IBD Surgery","Crohn's","Microbiome"],
      influence:76, pubs:89, citations:4321, hIndex:34, match:"medium",
      activity:[{congress:"ECCO 2025",role:"Presenter"},{congress:"DDW 2024",role:"Poster"}] },
    { id:"walter-reinisch", name:"Dr. Walter Reinisch", credentials:"MD", initials:"WR",
      affiliation:"Medical University of Vienna", city:"Vienna, Austria",
      tier:1, sentiment:"positive", focus:["UC","Induction Therapy","Mucosal Healing"],
      influence:87, pubs:134, citations:7893, hIndex:47, match:"high",
      activity:[{congress:"ECCO 2026",role:"Presenter"},{congress:"DDW 2025",role:"Panelist"}] },
    { id:"rohit-loomba", name:"Dr. Rohit Loomba", credentials:"MD MHSc", initials:"RL",
      affiliation:"UC San Diego", city:"San Diego, CA, USA",
      tier:1, sentiment:"positive", focus:["MASH","NASH","Fibrosis","NITs"],
      influence:90, pubs:167, citations:9234, hIndex:55, match:"medium",
      activity:[{congress:"AASLD 2025",role:"Presenter"},{congress:"DDW 2025",role:"Keynote"}] },
    { id:"vlad-ratziu", name:"Dr. Vlad Ratziu", credentials:"MD PhD", initials:"VR",
      affiliation:"Sorbonne University / Pitié-Salpêtrière", city:"Paris, France",
      tier:1, sentiment:"neutral", focus:["NASH","Liver Fibrosis","Clinical Trials"],
      influence:85, pubs:112, citations:6789, hIndex:48, match:"low",
      activity:[{congress:"EASL 2025",role:"Plenary Chair"},{congress:"AASLD 2025",role:"Keynote"}] }
  ],

  abstracts: [
    { id:"lba-101", signal:"competitive", session:"late-breaking", topic:"IL-23", priority:94,
      authorId:"sarah-chen", author:"Dr. Sarah Chen", affiliation:"UHN Toronto",
      nct:"NCT05123456", schedule:"Thu · Oral · Hall A", date:"May 15",
      drugs:["risankizumab","ustekinumab"],
      title:"Phase III efficacy of risankizumab vs ustekinumab in moderate-to-severe ulcerative colitis: the SEQUENCE-UC trial",
      aiSummary:"SEQUENCE-UC is a Phase III head-to-head trial comparing risankizumab to ustekinumab in 824 patients with moderate-to-severe UC. At week 52, risankizumab demonstrated superior endoscopic improvement (45.2% vs 32.7%, p&lt;0.001) and histologic remission (38.9% vs 27.1%). Safety profiles were comparable with no new signals. These data may shift positioning of IL-23 monotherapy in UC ahead of ustekinumab and are expected to have significant guideline impact.",
      background:"Ulcerative colitis management has been transformed by advanced therapies targeting specific inflammatory pathways. While both risankizumab (IL-23p19 inhibitor) and ustekinumab (IL-12/23 inhibitor) are approved for UC, prospective head-to-head data have been lacking, leaving clinicians without direct comparative evidence to guide treatment selection.",
      methods:"Multicenter, randomized, double-blind, active-controlled Phase III trial. 824 adult patients with moderate-to-severe UC (Mayo Score 6–12) randomized 1:1 to risankizumab 600mg IV induction ×3 then 180mg SC q8w vs ustekinumab 520mg IV induction then 90mg SC q12w. Primary endpoint: clinical remission at week 52.",
      results:"At week 52, clinical remission was achieved in 49.3% (risankizumab) vs 41.2% (ustekinumab) [Δ8.1%, 95% CI 2.4–13.8, p=0.006]. Endoscopic improvement: 45.2% vs 32.7% (p&lt;0.001). Histologic-endoscopic mucosal improvement: 38.9% vs 27.1% (p=0.002). Serious adverse events were comparable (9.4% vs 10.2%). No new safety signals identified.",
      conclusions:"Risankizumab demonstrated superior efficacy on both endoscopic and histologic endpoints vs ustekinumab at week 52. These data support risankizumab as a preferred IL-23 option for moderate-to-severe UC.",
      topics:["IL-23 positioning","UC treat-to-target","Endoscopic remission"],
      relatedIds:["oral-415","lba-103","oral-156"] },

    { id:"oral-203", signal:"competitive", session:"oral", topic:"JAK safety", priority:87,
      authorId:"bram-vermeire", author:"Dr. Bram Vermeire", affiliation:"KU Leuven",
      nct:"NCT04567890", schedule:"Fri · Oral · Hall B", date:"May 16",
      drugs:["upadacitinib","filgotinib"],
      title:"Real-world safety and effectiveness of JAK inhibitors in IBD: 5-year registry data from REAL-JAK",
      aiSummary:"REAL-JAK is a multi-center registry of 2,341 IBD patients on JAK1 inhibitors over 5 years. Herpes zoster incidence was 8.2 per 100 PY, MACE 0.4 per 100 PY — must be contextualized against baseline risk. Effectiveness was maintained at 5 years for 67% on upadacitinib.",
      topics:["JAK safety","Real-world evidence","Long-term outcomes"],
      relatedIds:["post-334","oral-289"] },

    { id:"plen-12", signal:"own", session:"plenary", topic:"GLP-1", priority:91,
      authorId:"rohit-loomba", author:"Dr. Rohit Loomba", affiliation:"UC San Diego",
      nct:"NCT05012254", schedule:"Thu · Plenary · Main Hall", date:"May 15",
      drugs:["semaglutide"],
      title:"Semaglutide 2.4mg for liver fibrosis regression in MASH: 72-week results of the ESSENCE trial",
      aiSummary:"The ESSENCE trial demonstrates significant fibrosis regression with semaglutide 2.4mg in MASH patients (F2-F3). At 72 weeks, 43% achieved ≥1-stage fibrosis improvement vs 27% placebo (p&lt;0.001), alongside reductions in liver steatosis and inflammation. These data support the dual metabolic-hepatic benefit of GLP-1 therapy in MASH.",
      topics:["GLP-1 in MASH","Fibrosis regression","NASH endpoints"],
      relatedIds:["post-512","post-445"] },

    { id:"oral-156", signal:"competitive", session:"oral", topic:"IL-23", priority:85,
      authorId:"william-sandborn", author:"Dr. William Sandborn", affiliation:"UC San Diego",
      nct:"NCT05192837", schedule:"Fri · Oral · Hall A", date:"May 16",
      drugs:["mirikizumab"],
      title:"Mirikizumab versus adalimumab as first-line biologic in Crohn's disease: VIVID-2 head-to-head trial",
      aiSummary:"VIVID-2 compares mirikizumab vs adalimumab in biologic-naive Crohn's disease. At week 52, mirikizumab achieved superior endoscopic response (61% vs 43%, p&lt;0.001) with comparable safety. These data support IL-23p19 inhibition as first-line advanced therapy for CD.",
      topics:["IL-23 in Crohn's","First-line biologic","Head-to-head"],
      relatedIds:["lba-101","oral-415"] },

    { id:"oral-415", signal:"competitive", session:"oral", topic:"IL-23", priority:88,
      authorId:"bram-vermeire", author:"Dr. Bram Vermeire", affiliation:"KU Leuven",
      nct:"NCT03104413", schedule:"Thu · Oral · Hall A", date:"May 15",
      drugs:["risankizumab"],
      title:"Risankizumab 2-year durability and long-term remission rates in Crohn's disease",
      aiSummary:"Long-term extension from ADVANCE, MOTIVATE, and FORTIFY showing 73% of risankizumab-maintained patients in clinical remission at year 2. Endoscopic remission: 58%. Safety remains consistent with no new signals. Strong durability data for long-term treatment planning.",
      topics:["Long-term remission","IL-23 durability","Crohn's maintenance"],
      relatedIds:["lba-101","oral-156"] },

    { id:"lba-103", signal:"competitive", session:"late-breaking", topic:"IL-23 vs anti-TNF", priority:86,
      authorId:"walter-reinisch", author:"Dr. Walter Reinisch", affiliation:"Medical U Vienna",
      nct:null, schedule:"Sat · Late-Breaking · Hall A", date:"May 17",
      drugs:["risankizumab","ustekinumab"],
      title:"IL-23 inhibitors versus anti-TNF in biologic-naive IBD: large-scale propensity-matched real-world cohort",
      aiSummary:"Propensity-matched real-world comparison of IL-23 inhibitors vs anti-TNF in 4,892 biologic-naive IBD patients across 18 European centers. IL-23 inhibitors: higher 1-year clinical remission (54% vs 46%, HR 1.28), lower immunogenicity, comparable safety. Supports earlier positioning of IL-23 inhibition.",
      topics:["Real-world evidence","IL-23 vs anti-TNF","Treatment positioning"],
      relatedIds:["lba-101","oral-415"] },

    { id:"oral-289", signal:"competitive", session:"oral", topic:"JAK vs vedolizumab", priority:83,
      authorId:"ole-antonsen", author:"Dr. Ole Antonsen", affiliation:"University of Copenhagen",
      nct:"NCT04678901", schedule:"Sat · Oral · Hall B", date:"May 17",
      drugs:["vedolizumab","upadacitinib"],
      title:"Vedolizumab versus upadacitinib in biologic-naive UC: NOR-SWITCH-IBD randomized trial",
      aiSummary:"NOR-SWITCH-IBD randomizes biologic-naive moderate UC patients to vedolizumab vs upadacitinib 45mg induction. Clinical remission at week 16: upadacitinib 58% vs vedolizumab 41% (p=0.002). Week 52 differences narrow. Rapid induction benefit for upadacitinib with comparable 1-year outcomes.",
      topics:["UC biologic selection","JAK vs integrin","Induction speed"],
      relatedIds:["oral-203","post-334"] },

    { id:"post-334", signal:"competitive", session:"poster", topic:"JAK safety", priority:78,
      authorId:"brian-feagan", author:"Dr. Brian Feagan", affiliation:"Western University",
      nct:"NCT03077607", schedule:"Fri · Poster Hall · P-334", date:"May 16",
      drugs:["filgotinib"],
      title:"Long-term safety of filgotinib in IBD: 5-year DARWIN follow-up safety data",
      aiSummary:"5-year safety extension of filgotinib trials in CD and UC. MACE rate 0.3 per 100 PY; VTE 0.2 per 100 PY — comparable to placebo-adjusted estimates. No new safety signals. Supports the favorable long-term safety profile of selective JAK1 inhibition.",
      topics:["JAK safety","Long-term follow-up","MACE"],
      relatedIds:["oral-203","oral-289"] },

    { id:"sym-04", signal:"indication", session:"symposium", topic:"T2T", priority:82,
      authorId:"sarah-chen", author:"Dr. Sarah Chen", affiliation:"UHN Toronto",
      nct:null, schedule:"Fri · Symposium · Hall C", date:"May 16",
      drugs:[],
      title:"Treat-to-target endpoints in IBD: consensus update and implications for clinical practice",
      aiSummary:"Updated international consensus on treat-to-target (T2T) endpoints in IBD. The panel endorses histologic remission as the aspirational endpoint for UC, with transmural healing gaining traction for CD. Practical implementation emphasizes composite endpoints combining endoscopic and biomarker assessments.",
      topics:["Treat-to-target","Endpoints","Histologic remission"],
      relatedIds:["p-237","lba-101"] },

    { id:"plen-12", signal:"own", session:"plenary", topic:"GLP-1", priority:91,
      authorId:"rohit-loomba", author:"Dr. Rohit Loomba", affiliation:"UC San Diego",
      nct:"NCT05012254", schedule:"Thu · Plenary · Main Hall", date:"May 15",
      drugs:["semaglutide"],
      title:"Semaglutide 2.4mg for liver fibrosis regression in MASH: 72-week results of the ESSENCE trial",
      aiSummary:"The ESSENCE trial demonstrates significant fibrosis regression with semaglutide 2.4mg in MASH. At 72 weeks, 43% achieved ≥1-stage fibrosis improvement vs 27% placebo. Supports dual metabolic-hepatic benefit of GLP-1 therapy.",
      topics:["GLP-1 in MASH","Fibrosis regression","NASH endpoints"],
      relatedIds:["post-512","post-445"] },

    { id:"lba-102", signal:"indication", session:"late-breaking", topic:"Microbiome", priority:77,
      authorId:"ole-antonsen", author:"Dr. Ole Antonsen", affiliation:"University of Copenhagen",
      nct:"NCT04456789", schedule:"Thu · Late-Breaking · Hall A", date:"May 15",
      drugs:[],
      title:"Fecal microbiota transplantation for refractory Crohn's disease: FLORA multicenter RCT",
      aiSummary:"FLORA is the largest RCT of FMT in Crohn's disease (n=242). Clinical remission at week 24: FMT 38% vs sham 24% (p=0.04). Donor selection and preparation protocol influenced outcomes significantly. Microbiome modulation as viable adjunct for refractory CD.",
      topics:["FMT","Microbiome","Refractory Crohn's"],
      relatedIds:["post-621","oral-178"] },

    { id:"post-445", signal:"indication", session:"poster", topic:"NITs", priority:73,
      authorId:"vlad-ratziu", author:"Dr. Vlad Ratziu", affiliation:"Sorbonne University",
      nct:null, schedule:"Sat · Poster Hall · P-445", date:"May 17",
      drugs:[],
      title:"Validation of FIB-4 and MRI-PDFF as non-invasive tests for MASH disease activity assessment",
      aiSummary:"Cross-sectional validation of NITs for MASH assessment. FIB-4 AUROC 0.82 for advanced fibrosis; MRI-PDFF correlated strongly with biopsy-proven steatosis grade. Combining both tests improved sensitivity for MASH diagnosis to 91%.",
      topics:["Non-invasive tests","MASH diagnosis","Biomarkers"],
      relatedIds:["plen-12","post-512"] },

    { id:"post-512", signal:"indication", session:"poster", topic:"MASH combination", priority:71,
      authorId:"rohit-loomba", author:"Dr. Rohit Loomba", affiliation:"UC San Diego",
      nct:"NCT05567891", schedule:"Sat · Poster Hall · P-512", date:"May 17",
      drugs:["resmetirom","semaglutide"],
      title:"Combination resmetirom + semaglutide in MASH: safety and early efficacy signals",
      aiSummary:"Phase 2 open-label study of resmetirom + semaglutide combination in 89 MASH patients. At week 24, greater MRI-PDFF reduction (58% vs 41% monotherapy) with no unexpected safety signals. Supports mechanistically distinct combination approaches in MASH.",
      topics:["MASH combination","THR-β + GLP-1","Fibrosis"],
      relatedIds:["plen-12","post-445"] },

    { id:"oral-178", signal:"indication", session:"oral", topic:"Biomarkers", priority:72,
      authorId:"bram-vermeire", author:"Dr. Bram Vermeire", affiliation:"KU Leuven",
      nct:null, schedule:"Fri · Oral · Hall C", date:"May 16",
      drugs:[],
      title:"Point-of-care intestinal ultrasound for disease activity monitoring in IBD",
      aiSummary:"Prospective validation of bedside intestinal ultrasound (IUS) against ileocolonoscopy in 312 IBD patients. IUS: 87% sensitivity, 91% specificity for endoscopic disease activity, strong inter-rater agreement (κ=0.84). Supports IUS as practical non-invasive monitoring.",
      topics:["Intestinal ultrasound","Non-invasive monitoring","IBD activity"],
      relatedIds:["post-445","sym-04"] },

    { id:"sym-11", signal:"own", session:"symposium", topic:"Oncology", priority:76,
      authorId:"jean-frederic-colombel", author:"Dr. Jean-Frédéric Colombel", affiliation:"Mount Sinai",
      nct:null, schedule:"Sat · Symposium · Main Hall", date:"May 17",
      drugs:[],
      title:"Novel GI oncology targets: from bench to bedside — ASCO-DDW Joint Symposium",
      aiSummary:"Joint oncology-gastroenterology symposium on emerging GI cancer targets. Focus on checkpoint inhibitor combinations for colorectal cancer in IBD, HER2 targeting in gastric cancer, and CAR-T applications. Highlights convergence of oncology and gastroenterology pipelines.",
      topics:["GI oncology","Checkpoint inhibitors","CAR-T"],
      relatedIds:["lba-103","oral-415"] },

    { id:"post-621", signal:"indication", session:"poster", topic:"S1P modulation", priority:69,
      authorId:"walter-reinisch", author:"Dr. Walter Reinisch", affiliation:"Medical U Vienna",
      nct:"NCT04074590", schedule:"Sat · Poster Hall · P-621", date:"May 17",
      drugs:[],
      title:"Obefazimod in moderate ulcerative colitis: 52-week results of the OPAL phase 2b trial",
      aiSummary:"Obefazimod, an oral S1P receptor modulator, shows durable response in moderate UC. At week 52: clinical remission 34% vs 14% placebo. Distinct mechanism supports use in patients with prior IL-23/JAK failure. Phase 3 program being planned.",
      topics:["S1P modulation","Oral small molecule","Biologic failure"],
      relatedIds:["lba-102","oral-203"] },

    { id:"p-237", signal:"indication", session:"poster", topic:"Histologic remission", priority:74,
      authorId:"sarah-chen", author:"Dr. Sarah Chen", affiliation:"UHN Toronto",
      nct:null, schedule:"Sat · Poster Hall · P-237", date:"May 17",
      drugs:[],
      title:"Histologic remission durability in UC: 3-year follow-up of mucosal healing endpoints",
      aiSummary:"3-year follow-up of a prospective UC cohort achieving histologic remission. Patients maintaining histologic remission at year 1 had 81% sustained deep remission at year 3, vs 54% for endoscopic-only remission. Validates histologic remission as key long-term therapeutic target.",
      topics:["Histologic remission","Mucosal healing","Long-term outcomes"],
      relatedIds:["sym-04","lba-101"] }
  ],

  strategicPriorities: [
    { rank:1, text:"Advance leadership in IBD and GI inflammation", level:"high" },
    { rank:2, text:"Expand respiratory portfolio and life cycle management", level:"high" },
    { rank:3, text:"Strengthen oncology pipeline positioning", level:"medium" },
    { rank:4, text:"Identify next-gen immunology opportunities", level:"medium" }
  ],

  topics: [
    { name:"IL-23 inhibitors — positioning", signal:"competitive", count:41, coverage:88 },
    { name:"MASH — fibrosis regression & NITs", signal:"indication", count:36, coverage:74 },
    { name:"JAK inhibitors — safety & RWD", signal:"competitive", count:29, coverage:62 }
  ],

  team: [
    { id: "sarah-p", name: "Sarah Phillips", initials: "SP", role: "Director" },
    { id: "james-w", name: "James Walker", initials: "JW", role: "MSL" },
    { id: "emily-c", name: "Emily Chen", initials: "EC", role: "Medical Affairs Lead" },
    { id: "david-p", name: "David Park", initials: "DP", role: "MSL" },
    { id: "maria-r", name: "Maria Rivera", initials: "MR", role: "Scientific Communications" }
  ],

  captures: [],
  captureDripFeed: [
    { author: "emily-c", type: "voice", capture_type: "Session reaction", visibility: "shared",
      text: "AbbVie symposium room overflowing — standing room only for Skyrizi durability data.",
      attached_companies: ["AbbVie"], attached_topics: ["il-23"], congress: "ddw-2026", day: 1 },
    { author: "david-p", type: "text", capture_type: "General", visibility: "shared",
      text: "Plenary just announced extended Q&A — expect 15 min overrun on ESSENCE fibrosis session.",
      attached_abstracts: ["plen-12"], congress: "ddw-2026", day: 1 },
    { author: "james-w", type: "photo", capture_type: "Competitive intel", visibility: "shared",
      caption: "JAKi safety poster session — packed booth, Janssen messaging on MACE rates.",
      attached_topics: ["jaki-safety"], congress: "ddw-2026", day: 1 },
    { author: "maria-r", type: "text", capture_type: "Q&A highlight", visibility: "shared",
      text: "Audience question on transmural healing endpoints — panel agreed FDA timeline ~2027.",
      attached_kols: ["sarah-chen"], attached_topics: ["il-23"], congress: "ddw-2026", day: 2 },
    { author: "emily-c", type: "voice", capture_type: "Hallway", visibility: "private",
      text: "Quick hallway with Dr. Vermeire — skeptical on IL-23 selectivity claims without biomarker data.",
      attached_kols: ["bram-vermeire"], congress: "ddw-2026", day: 2 }
  ]
};

const CAPTURE_DAY_LABELS = { 1: "SUN 3", 2: "MON 4", 3: "TUE 5", 4: "WED 6" };
const CURRENT_USER_ID = "sarah-p";

function seedCaptures() {
  const base = [
    { id: "v-217", type: "voice", duration: "1:48", author: "sarah-p", visibility: "shared", capture_type: "Spotlight meeting",
      location: "Hall A · San Diego Convention Center", congress: "ddw-2026", day: 1, timestamp: "2026-05-03T14:34:00",
      attached_kols: ["sarah-chen"], attached_abstracts: ["lba-101"], attached_topics: ["il-23"],
      transcript: "Just came out of a 20-minute with Sarah Chen. Her read on the SEQUENCE-UC late-breaker is that the H2H risankizumab vs ustekinumab effect size is real but smaller than the field was hoping. She's bullish on transmural healing as a regulatory endpoint — said FDA is reviewing transmural for a labelled endpoint by 2027. Open to a Q3 discussion on the GSK pipeline." },
    { id: "p-410", type: "photo", author: "james-w", visibility: "shared", capture_type: "Competitive intel",
      caption: "AbbVie poster on Skyrizi 5-year safety. Strong RWE numbers — no new safety signals at 5 years.",
      image_url: "", congress: "ddw-2026", day: 1, timestamp: "2026-05-03T14:20:00",
      attached_companies: ["AbbVie"], attached_drugs: ["risankizumab"], attached_topics: ["il-23"] },
    { id: "n-091", type: "text", author: "sarah-p", visibility: "private", capture_type: "Session reaction",
      text: "Late-breaker LB01 audience: smaller than expected, ~60% capacity. Crowd reaction muted on the H2H secondary endpoint.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T13:50:00", attached_abstracts: ["lba-101"] },
    { id: "v-218", type: "voice", duration: "0:92", author: "james-w", visibility: "shared", capture_type: "Competitive intel",
      transcript: "AbbVie booth claims 5-year safety data holds — reps pushing head-to-head narrative vs ustekinumab.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T12:10:00", attached_companies: ["AbbVie"], attached_topics: ["il-23"] },
    { id: "n-092", type: "text", author: "emily-c", visibility: "shared", capture_type: "Session reaction",
      text: "REAL-JAK registry presentation — 5-year MACE rates lower than boxed warning suggests; audience skeptical.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T11:30:00", attached_abstracts: ["oral-203"], attached_topics: ["jaki-safety"] },
    { id: "v-219", type: "voice", duration: "2:05", author: "david-p", visibility: "shared", capture_type: "Hallway",
      transcript: "Dr. Sandborn in hallway — treat-to-target symposium timing works for advisory board outreach post-congress.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T10:45:00", attached_kols: ["william-sandborn"] },
    { id: "n-093", type: "text", author: "maria-r", visibility: "shared", capture_type: "Q&A highlight",
      text: "ESSENCE plenary Q&A: fibrosis regression as registrational endpoint gaining traction — Loomba very bullish.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T10:00:00", attached_abstracts: ["plen-12"], attached_topics: ["mash-nit"] },
    { id: "p-411", type: "photo", author: "james-w", visibility: "shared", capture_type: "Competitive intel",
      caption: "Merck booth — mirikizumab durability wall chart. Positioning vs risankizumab selectivity.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T09:15:00", attached_drugs: ["mirikizumab"], attached_topics: ["il-23"] },
    { id: "v-220", type: "voice", duration: "1:22", author: "emily-c", visibility: "private", capture_type: "Spotlight meeting",
      transcript: "Pre-meeting prep note: Chen wants histologic remission data before pipeline discussion.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T08:30:00", attached_kols: ["sarah-chen"] },
    { id: "n-094", type: "text", author: "sarah-p", visibility: "shared", capture_type: "General",
      text: "Registration desk — congress app down for 20 min. Team using paper schedules.",
      congress: "ddw-2026", day: 1, timestamp: "2026-05-03T07:45:00" },
    { id: "v-221", type: "voice", duration: "1:55", author: "james-w", visibility: "shared", capture_type: "Session reaction",
      transcript: "VIVID-2 oral — audience engaged on mirikizumab vs adalimumab. Competitive undertone in Q&A.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T15:00:00", attached_abstracts: ["oral-156"], attached_topics: ["il-23"] },
    { id: "n-095", type: "text", author: "david-p", visibility: "shared", capture_type: "Competitive intel",
      text: "Janssen suite — Stelara lifecycle messaging heavy on established safety vs IL-23 novelty.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T14:20:00", attached_companies: ["Janssen"], attached_topics: ["il-23"] },
    { id: "p-412", type: "photo", author: "maria-r", visibility: "shared", capture_type: "Session reaction",
      caption: "Symposium hall B — packed for treat-to-target IBD consensus. Chen chairing.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T13:00:00", attached_kols: ["sarah-chen"], attached_abstracts: ["sym-04"] },
    { id: "v-222", type: "voice", duration: "1:10", author: "sarah-p", visibility: "shared", capture_type: "Hallway",
      transcript: "Bram Vermeire — cautious on IL-23 class differentiation without biomarker. Wants RWE on switching.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T12:30:00", attached_kols: ["bram-vermeire"], attached_topics: ["il-23"] },
    { id: "n-096", type: "text", author: "emily-c", visibility: "private", capture_type: "General",
      text: "Internal: client wants daily digest by 6pm — prioritize LB captures.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T11:00:00" },
    { id: "v-223", type: "voice", duration: "2:30", author: "maria-r", visibility: "shared", capture_type: "Q&A highlight",
      transcript: "JAK safety panel — Feagan pushed back on registry MACE interpretation. Heated exchange.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T10:15:00", attached_kols: ["brian-feagan"], attached_topics: ["jaki-safety"] },
    { id: "n-097", type: "text", author: "james-w", visibility: "shared", capture_type: "Session reaction",
      text: "Poster walk P-237 — Chen presenting histologic remission durability. Strong interest from KOL crowd.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T09:30:00", attached_kols: ["sarah-chen"], attached_abstracts: ["p-237"] },
    { id: "p-413", type: "photo", author: "david-p", visibility: "shared", capture_type: "Competitive intel",
      caption: "Filgotinib poster — Jyseleca long-term data. EU positioning vs upadacitinib.",
      congress: "ddw-2026", day: 2, timestamp: "2026-05-04T08:45:00", attached_drugs: ["filgotinib"], attached_topics: ["jaki-safety"] },
    { id: "v-224", type: "voice", duration: "1:40", author: "sarah-p", visibility: "shared", capture_type: "Spotlight meeting",
      transcript: "Subrata Ghosh — interested in GSK semaglutide MASH program. Wants biopsy endpoint discussion.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T16:00:00", attached_kols: ["subrata-ghosh"], attached_topics: ["mash-nit"] },
    { id: "n-098", type: "text", author: "james-w", visibility: "shared", capture_type: "Competitive intel",
      text: "Risankizumab 2-year CD durability oral — crowd size moderate. No surprise on efficacy narrative.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T14:30:00", attached_abstracts: ["oral-415"], attached_topics: ["il-23"] },
    { id: "v-225", type: "voice", duration: "0:88", author: "emily-c", visibility: "shared", capture_type: "Hallway",
      transcript: "Walter Reinisch — open to post-congress advisory on mucosal healing endpoints.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T13:15:00", attached_kols: ["walter-reinisch"] },
    { id: "n-099", type: "text", author: "maria-r", visibility: "private", capture_type: "Session reaction",
      text: "OPAL obefazimod poster — niche audience but positive on oral mechanism in biologic failures.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T12:00:00", attached_abstracts: ["lba-102"] },
    { id: "p-414", type: "photo", author: "sarah-p", visibility: "shared", capture_type: "General",
      caption: "Team war room — daily synthesis board updated with IL-23 themes.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T11:30:00", attached_topics: ["il-23"] },
    { id: "v-226", type: "voice", duration: "1:15", author: "david-p", visibility: "shared", capture_type: "Q&A highlight",
      transcript: "Loomba keynote follow-up — NIT standardization still the blocker for fibrosis regression label.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T10:00:00", attached_kols: ["rohit-loomba"], attached_topics: ["mash-nit"] },
    { id: "n-100", type: "text", author: "james-w", visibility: "shared", capture_type: "Competitive intel",
      text: "Vedolizumab vs JAK head-to-head poster — Entyvio positioning on safety-first narrative.",
      congress: "ddw-2026", day: 3, timestamp: "2026-05-05T09:20:00", attached_abstracts: ["oral-289"], attached_topics: ["jaki-safety"] },
    { id: "v-227", type: "voice", duration: "2:00", author: "sarah-p", visibility: "shared", capture_type: "Spotlight meeting",
      transcript: "Colombel — tight control paradigm aligns with GSK messaging. Suggested joint publication on treat-to-target.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T15:30:00", attached_kols: ["jean-frederic-colombel"] },
    { id: "n-101", type: "text", author: "emily-c", visibility: "shared", capture_type: "General",
      text: "Final day — client debrief scheduled 5pm. Export capture digest requested.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T14:00:00" },
    { id: "p-415", type: "photo", author: "maria-r", visibility: "shared", capture_type: "Session reaction",
      caption: "Closing plenary hall — ESSENCE fibrosis data referenced again in wrap-up.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T12:45:00", attached_abstracts: ["plen-12"] },
    { id: "n-102", type: "text", author: "david-p", visibility: "private", capture_type: "Hallway",
      text: "Personal note: schedule follow-up with Chen advisory board for Q3.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T11:00:00", attached_kols: ["sarah-chen"] },
    { id: "v-228", type: "voice", duration: "1:33", author: "james-w", visibility: "shared", capture_type: "Session reaction",
      transcript: "Post-congress sentiment: IL-23 class winners unclear — durability and biomarkers dominate hallway talk.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T10:30:00", attached_topics: ["il-23"] },
    { id: "n-103", type: "text", author: "sarah-p", visibility: "shared", capture_type: "General",
      text: "47 captures logged team-wide for DDW Day 1–4. Digest export queued.",
      congress: "ddw-2026", day: 4, timestamp: "2026-05-06T09:00:00" }
  ];
  DATA.captures = base;
  const now = Date.now();
  DATA.captures.slice(0, 6).forEach((c, i) => {
    c.timestamp = new Date(now - (i + 1) * 8 * 60000).toISOString();
  });
}
seedCaptures();

// De-duplicate abstracts by id
(function() {
  const seen = new Set(), deduped = [];
  DATA.abstracts.forEach(a => { if (!seen.has(a.id)) { seen.add(a.id); deduped.push(a); } });
  DATA.abstracts = deduped;
})();

// Demo seed client for setup-state walkthrough (v2 spec)
if (!DATA.clients.some(c => c.id === 'abbvie')) {
  DATA.clients.push({
    id: 'abbvie', name: 'AbbVie', abbr: 'ABV', congresses: 0, kols: 0, insights: 0, reports: 0, prog: 8
  });
}

// ==========================================================
// WORKSPACE STATE (v2 setup mechanics)
// ==========================================================
const DEFAULT_SETUP = {
  priorities: [],
  tas: [],
  focuses: [],
  pipeline: [],
  competitorCompanies: [],
  competitorDrugs: [],
  priorityKols: [],
  keywords: []
};
let APP_STATE = {
  activeClientId: 'gsk',
  activeCongressId: 'ddw-2026',
  openDrawer: null,
  activeNavKey: 'dashboard'
};

function setupKey(clientId) { return `client-${clientId}-setup`; }
function readyBannerKey(clientId) { return `client-${clientId}-ready-shown`; }
function defaultWorkspaceKey() { return 'user-default-workspace'; }
function competitiveTagsKey(clientId) { return `client-${clientId}-competitive-tags`; }

function getClient(clientId) {
  return DATA.clients.find(c => c.id === clientId) || DATA.clients[0];
}

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getSetup(clientId) {
  const raw = localStorage.getItem(setupKey(clientId));
  if (raw) {
    try { return { ...DEFAULT_SETUP, ...JSON.parse(raw) }; } catch (e) {}
  }
  const client = getClient(clientId);
  if (clientId === 'gsk' || (client && client.tas && client.tas.length > 0)) {
    return {
      ...DEFAULT_SETUP,
      priorities: [...DATA.strategicPriorities.map(p => ({ text: p.text, level: p.level }))],
      tas: [...(client?.tas || ['Gastroenterology'])],
      focuses: ['IBD', 'NASH', 'Microbiome', 'Fibrosis', 'IL-23 Pathway'],
      pipeline: [{ name: 'semaglutide', status: 'marketed', indication: 'MASH' }],
      competitorCompanies: ['AbbVie', 'Janssen', 'Merck'],
      competitorDrugs: ['risankizumab'],
      priorityKols: ['sarah-chen', 'subrata-ghosh', 'bram-vermeire'],
      keywords: ['IL-23 inhibitors', 'fibrosis regression', 'real world evidence']
    };
  }
  return { ...DEFAULT_SETUP };
}

function saveSetup(clientId, setup) {
  localStorage.setItem(setupKey(clientId), JSON.stringify(setup));
}

function isRequiredSetupComplete(clientId) {
  const setup = getSetup(clientId);
  return setup.priorities.length > 0 && setup.tas.length > 0;
}

function checklistStatus(clientId) {
  const setup = getSetup(clientId);
  return {
    priorities: setup.priorities.length > 0,
    therapeuticAreas: setup.tas.length > 0,
    pipeline: setup.pipeline.length > 0,
    competitors: setup.competitorCompanies.length > 0 || setup.competitorDrugs.length > 0,
    kols: setup.priorityKols.length > 0,
    keywords: setup.keywords.length > 0,
    weights: true
  };
}

function getCompetitiveTags(clientId) {
  const raw = localStorage.getItem(competitiveTagsKey(clientId));
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return {
        kolIds: Array.isArray(parsed.kolIds) ? parsed.kolIds : [],
        abstractIds: Array.isArray(parsed.abstractIds) ? parsed.abstractIds : []
      };
    } catch (e) {}
  }
  return { kolIds: [], abstractIds: [] };
}

function saveCompetitiveTags(clientId, tags) {
  localStorage.setItem(competitiveTagsKey(clientId), JSON.stringify({
    kolIds: Array.from(new Set(tags.kolIds || [])),
    abstractIds: Array.from(new Set(tags.abstractIds || []))
  }));
}

// ==========================================================
// UTILITIES
// ==========================================================
let chartInstances = {};

function destroyCharts() {
  Object.keys(chartInstances).forEach(k => {
    try { chartInstances[k].destroy(); } catch(e) {}
    delete chartInstances[k];
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function scoreRing(score, color) {
  const sig = color || '#0D9488';
  const offset = (157 * (1 - score / 100)).toFixed(1);
  return `<div class="score"><div class="ring">
    <svg width="58" height="58">
      <circle cx="29" cy="29" r="25" fill="none" stroke="#E7EDF3" stroke-width="5"/>
      <circle cx="29" cy="29" r="25" fill="none" stroke="${sig}" stroke-width="5"
        stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="${offset}"/>
    </svg><b>${score}</b></div><small>priority</small></div>`;
}

function scoreRingColor(signal) {
  if (signal === 'competitive') return '#B45309';
  if (signal === 'own') return '#0D9488';
  return '#6D5BD0';
}

function chipBySignal(signal) {
  if (signal === 'competitive') return '<span class="chip comp">COMPETITIVE</span>';
  if (signal === 'own') return '<span class="chip own">OWN PIPELINE</span>';
  return '<span class="chip both">INDICATION</span>';
}

function chipBySession(session) {
  if (session === 'late-breaking') return '<span class="chip lb">LATE-BREAKING</span>';
  if (session === 'plenary') return '<span class="chip lb">PLENARY</span>';
  if (session === 'oral') return '<span class="chip soft">ORAL</span>';
  if (session === 'poster') return '<span class="chip soft">POSTER</span>';
  if (session === 'symposium') return '<span class="chip soft">SYMPOSIUM</span>';
  return '';
}

function cardClass(signal) {
  if (signal === 'competitive') return 'k-comp';
  if (signal === 'own') return 'k-own';
  return 'k-both';
}

function matchChip(match) {
  if (match === 'high') return '<span class="chip own xs">High Match</span>';
  if (match === 'medium') return '<span class="chip soft xs">Medium Match</span>';
  return '<span class="chip line xs">Low Match</span>';
}

function getKol(id) { return DATA.kols.find(k => k.id === id); }
function getAbstract(id) { return DATA.abstracts.find(a => a.id === id); }
function getTeamMember(id) { return DATA.team.find(t => t.id === id); }
function getCapture(id) { return DATA.captures.find(c => c.id === id); }

function capturesStorageKey() { return 'prototype-captures-v1'; }

function loadCaptures() {
  const raw = localStorage.getItem(capturesStorageKey());
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved)) return;
    const ids = new Set(DATA.captures.map(c => c.id));
    saved.forEach(c => { if (c.id && !ids.has(c.id)) { DATA.captures.unshift(c); ids.add(c.id); } });
  } catch (e) {}
}

function persistCaptures() {
  const userCreated = DATA.captures.filter(c => c.userCreated);
  localStorage.setItem(capturesStorageKey(), JSON.stringify(userCreated));
}

function formatTimeAgo(iso) {
  if (!iso) return 'just now';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function captureTypeIcon(type) {
  if (type === 'voice') return '🎙';
  if (type === 'photo') return '📷';
  return '✍';
}

function captureBodyPreview(c, maxLen = 120) {
  const raw = c.transcript || c.text || c.caption || '';
  if (raw.length <= maxLen) return raw;
  return raw.slice(0, maxLen) + '…';
}

function getCapturesForCongress(congressId, filters = {}) {
  const viewerId = CURRENT_USER_ID;
  let list = DATA.captures.filter(c => c.congress === congressId);
  list = list.filter(c => c.visibility === 'shared' || c.author === viewerId);
  if (filters.type && filters.type !== 'all') list = list.filter(c => c.type === filters.type);
  if (filters.visibility === 'mine') list = list.filter(c => c.author === viewerId);
  if (filters.visibility === 'shared') list = list.filter(c => c.visibility === 'shared');
  if (filters.author && filters.author !== 'all') list = list.filter(c => c.author === filters.author);
  if (filters.capture_type && filters.capture_type !== 'all') {
    list = list.filter(c => (c.capture_type || '').toLowerCase().includes(filters.capture_type.toLowerCase()));
  }
  if (filters.day && filters.day !== 'all') list = list.filter(c => String(c.day) === String(filters.day));
  if (filters.kolId) list = list.filter(c => (c.attached_kols || []).includes(filters.kolId));
  if (filters.abstractId) {
    list = list.filter(c => (c.attached_abstracts || []).includes(filters.abstractId));
  }
  if (filters.topicSlug) {
    const slug = (filters.topicSlug || '').toLowerCase();
    list = list.filter(c => (c.attached_topics || []).some(t => t.toLowerCase().includes(slug) || slug.includes(t.toLowerCase())));
  }
  list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  return list;
}

function getCapturesForKol(kolId) {
  return getCapturesForCongress(APP_STATE.activeCongressId || 'ddw-2026')
    .filter(c => (c.attached_kols || []).includes(kolId));
}

function getCapturesForAbstract(abstractId) {
  const a = getAbstract(abstractId);
  const byAbstract = getCapturesForCongress(APP_STATE.activeCongressId || 'ddw-2026')
    .filter(c => (c.attached_abstracts || []).includes(abstractId));
  const byAuthor = a && a.authorId
    ? getCapturesForCongress(APP_STATE.activeCongressId || 'ddw-2026')
      .filter(c => (c.attached_kols || []).includes(a.authorId) && !byAbstract.find(x => x.id === c.id))
    : [];
  return [...byAbstract, ...byAuthor].sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp));
}

function getCapturesForTopic(topicSlug) {
  return getCapturesForCongress(APP_STATE.activeCongressId || 'ddw-2026', { topicSlug });
}

function capturesLastHourCount(congressId) {
  const hourAgo = Date.now() - 3600000;
  return DATA.captures.filter(c =>
    c.congress === congressId &&
    (c.visibility === 'shared' || c.author === CURRENT_USER_ID) &&
    new Date(c.timestamp || 0).getTime() > hourAgo
  ).length;
}

function groupCapturesByDay(captures) {
  const groups = {};
  captures.forEach(c => {
    const d = c.day || 1;
    if (!groups[d]) groups[d] = [];
    groups[d].push(c);
  });
  return Object.keys(groups).sort((a, b) => Number(b) - Number(a)).map(day => ({
    day: Number(day),
    label: CAPTURE_DAY_LABELS[day] || `Day ${day}`,
    captures: groups[day]
  }));
}

function relatedCaptures(capture, limit = 3) {
  if (!capture) return [];
  const tags = new Set([
    ...(capture.attached_kols || []),
    ...(capture.attached_abstracts || []),
    ...(capture.attached_topics || [])
  ]);
  return DATA.captures.filter(c =>
    c.id !== capture.id &&
    c.congress === capture.congress &&
    (c.visibility === 'shared' || c.author === CURRENT_USER_ID) &&
    [...(c.attached_kols || []), ...(c.attached_abstracts || []), ...(c.attached_topics || [])].some(t => tags.has(t))
  ).slice(0, limit);
}

function renderCaptureTags(c) {
  const parts = [];
  (c.attached_kols || []).forEach(id => {
    const k = getKol(id);
    if (k) parts.push(`<span class="chip line"><span class="av xs">${k.initials}</span> ${k.name}</span>`);
  });
  (c.attached_abstracts || []).forEach(id => {
    const a = getAbstract(id);
    if (a) parts.push(`<span class="chip soft">${a.id.toUpperCase()}</span>`);
  });
  (c.attached_topics || []).forEach(t => parts.push(`<span class="chip soft">${t}</span>`));
  if (c.capture_type) parts.push(`<span class="chip soft">${c.capture_type}</span>`);
  return parts.join(' ');
}

function renderCaptureCard(c, opts = {}) {
  const compact = opts.compact;
  const member = getTeamMember(c.author) || { initials: '??', name: 'Unknown' };
  const visClass = c.visibility === 'private' ? 'private' : 'shared';
  const body = captureBodyPreview(c, compact ? 100 : 120);
  const href = `#/captures/${c.id}`;
  const typeLine = c.type === 'voice'
    ? `${captureTypeIcon(c.type)} Voice · ${c.duration || '1:00'}`
    : `${captureTypeIcon(c.type)} ${c.type === 'photo' ? 'Photo' : 'Note'}`;
  const photoBlock = c.type === 'photo'
    ? `<div class="cap-photo"><div class="cap-photo-ph">📷</div></div>`
    : '';
  const wave = c.type === 'voice' && !compact
    ? `<div class="waveform"><svg viewBox="0 0 200 30" preserveAspectRatio="none"><path d="M0,15 Q25,5 50,15 T100,15 T150,20 T200,10" fill="none" stroke="var(--teal)" stroke-width="2"/></svg></div>`
    : '';
  return `<a class="cap-card ${c.type} ${visClass}${compact ? ' compact' : ''}${c._new ? ' new' : ''}" href="${href}">
    <div class="cap-hd">
      <div class="av sm">${member.initials}</div>
      <div class="cap-meta"><b>${member.name}</b> <small>· ${formatTimeAgo(c.timestamp)} · ${typeLine}</small></div>
      <span class="vis-pill ${visClass}"><span class="d"></span> ${c.visibility === 'private' ? 'PRIVATE' : 'SHARED'}</span>
    </div>
    <div class="cap-body${c.type === 'photo' ? ' photo-body' : ''}">
      ${photoBlock}
      ${wave}
      <p>${body ? `"${body}"` : ''}${!compact && body.length >= 100 ? ' <span class="more">Read more →</span>' : ''}</p>
    </div>
    <div class="cap-tags">${renderCaptureTags(c)}</div>
  </a>`;
}

function cmarkClass(acronym) {
  const map = {
    DDW:'ddw', ASCO:'asco', ATS:'ats', ESMO:'esmo',
    ACG:'acg', AAN:'aan', UEG:'ueg', ECCO:'ecco'
  };
  return map[acronym] || '';
}

function influenceClass(score) {
  if (score >= 90) return 'inf-vhi';
  if (score >= 80) return 'inf-hi';
  return 'inf-mod';
}

function metricIcon(emoji, color) {
  return `<div class="metric-icon ${color}">${emoji}</div>`;
}

// ==========================================================
// ROUTER
// ==========================================================
function route() {
  destroyCharts();
  stopCaptureDripFeed();
  removeCaptureFab();
  const h = location.hash || '#/dashboard';
  const page = document.getElementById('page');
  page.scrollTop = 0;
  const hashOnly = h.split('?')[0];
  const qParams = new URLSearchParams((h.split('?')[1] || '').split('#')[0]);
  const clientMatch = hashOnly.match(/^#\/clients\/([^/]+)$/);
  const congressMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)$/);
  const feedMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)\/feed$/);
  const askMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)\/ask$/);
  const meetingMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)\/meeting-list$/);
  const topicMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)\/topics\/([^/]+)$/);
  const competitiveMatch = hashOnly.match(/^#\/clients\/([^/]+)\/competitive$/);
  const kolsMatch = hashOnly.match(/^#\/clients\/([^/]+)\/kols$/);
  const settingsMatch = hashOnly.match(/^#\/clients\/([^/]+)\/settings\/prioritization$/);
  const newCongressMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/new$/);
  const capturesMatch = hashOnly.match(/^#\/clients\/([^/]+)\/congresses\/([^/]+)\/captures$/);
  const captureDetailMatch = hashOnly.match(/^#\/captures\/([^/]+)$/);

  if (h === '#/dashboard' || h === '#/' || h === '') {
    renderDashboard(); highlightNav('dashboard');
  } else if (clientMatch) {
    APP_STATE.activeClientId = clientMatch[1];
    renderClientWorkspace(clientMatch[1], qParams.get('drawer')); highlightNav('client');
  } else if (congressMatch) {
    APP_STATE.activeClientId = congressMatch[1];
    APP_STATE.activeCongressId = congressMatch[2];
    renderCongressDashboard(); highlightNav('congress');
  } else if (feedMatch) {
    APP_STATE.activeClientId = feedMatch[1];
    APP_STATE.activeCongressId = feedMatch[2];
    renderIntelFeed(); highlightNav('feed');
  } else if (capturesMatch) {
    APP_STATE.activeClientId = capturesMatch[1];
    APP_STATE.activeCongressId = capturesMatch[2];
    renderCaptureStream(); highlightNav('captures');
  } else if (captureDetailMatch) {
    const cap = getCapture(captureDetailMatch[1]);
    if (cap) {
      const cong = DATA.congresses.find(c => c.id === cap.congress);
      if (cong) {
        APP_STATE.activeClientId = cong.client;
        APP_STATE.activeCongressId = cong.id;
      }
    }
    renderCaptureDetail(captureDetailMatch[1]); highlightNav('captures');
  } else if (askMatch) {
    APP_STATE.activeClientId = askMatch[1];
    APP_STATE.activeCongressId = askMatch[2];
    renderAskAnything(qParams.get('q') || 'Which KOLs discussed fibrosis regression as a regulatory endpoint?'); highlightNav('ask');
  } else if (meetingMatch) {
    APP_STATE.activeClientId = meetingMatch[1];
    APP_STATE.activeCongressId = meetingMatch[2];
    renderMeetingList(); highlightNav('meeting');
  } else if (topicMatch) {
    APP_STATE.activeClientId = topicMatch[1];
    APP_STATE.activeCongressId = topicMatch[2];
    renderTopicLandscape(topicMatch[3]); highlightNav('topic');
  } else if (competitiveMatch) {
    APP_STATE.activeClientId = competitiveMatch[1];
    renderCompetitiveWorkspace(); highlightNav('competitive');
  } else if (kolsMatch) {
    APP_STATE.activeClientId = kolsMatch[1];
    renderKolDirectory(); highlightNav('kols');
  } else if (settingsMatch) {
    APP_STATE.activeClientId = settingsMatch[1];
    renderPrioritizationSettings(); highlightNav('settings');
  } else if (h === '#/profile') {
    renderProfile(); highlightNav('profile');
  } else if (newCongressMatch) {
    APP_STATE.activeClientId = newCongressMatch[1];
    renderCongressCreation(); highlightNav('congress');
  } else if (h.startsWith('#/abstracts/')) {
    const id = h.replace('#/abstracts/', '');
    renderAbstractDetail(id); highlightNav('feed');
  } else if (h.startsWith('#/kols/')) {
    const id = h.replace('#/kols/', '');
    renderKolDossier(id); highlightNav('kols');
  } else {
    renderDashboard(); highlightNav('dashboard');
  }
  syncShellContext();
  if (isCongressScoped()) mountCaptureFab();
  if (qParams.get('capture') === 'new') setTimeout(() => openCapture(), 100);
}

function highlightNav(key) {
  APP_STATE.activeNavKey = key;
  renderSidebar();
}

function syncShellContext() {
  const client = getClient(APP_STATE.activeClientId);
  const cName = client ? client.name : 'Workspace';
  const congress = DATA.congresses.find(c => c.id === APP_STATE.activeCongressId && c.client === APP_STATE.activeClientId)
    || DATA.congresses.find(c => c.client === APP_STATE.activeClientId)
    || DATA.congresses[0];
  const cEl = document.querySelector('.nav-client-name');
  if (cEl) cEl.textContent = `${cName} Workspace`;

  const topbarCongress = document.querySelector('.tb-congress');
  const congressActive = congress && congress.status === 'active';
  const liveLink = isCongressScoped() && congressActive
    ? `<span class="tb-live" onclick="event.stopPropagation();location.hash='#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/captures'" title="Capture stream">LIVE</span>`
    : '';
  if (topbarCongress) {
    topbarCongress.innerHTML = `<span class="dot"></span> ${congress.acronym} 2026 ${liveLink} <span class="chev">▾</span>`;
    topbarCongress.onclick = (e) => {
      if (e.target.closest('.tb-live')) return;
      e.stopPropagation();
      toggleWorkspaceSwitcher();
    };
    topbarCongress.title = `Switch to ${cName} workspace`;
  }

  ensureTopbarCreateMenu();
  localStorage.setItem(defaultWorkspaceKey(), APP_STATE.activeClientId);
  const askInput = document.getElementById('global-search');
  if (askInput && !askInput.dataset.boundAsk) {
    askInput.dataset.boundAsk = '1';
    askInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = encodeURIComponent(askInput.value.trim() || 'Which KOLs discussed fibrosis regression as a regulatory endpoint?');
        location.hash = `#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/ask?q=${q}`;
      }
    });
  }
}

function renderSidebar() {
  const side = document.querySelector('.side');
  if (!side) return;
  const client = getClient(APP_STATE.activeClientId);
  const congress = DATA.congresses.find(c => c.id === APP_STATE.activeCongressId && c.client === APP_STATE.activeClientId)
    || DATA.congresses.find(c => c.client === APP_STATE.activeClientId)
    || DATA.congresses[0];
  const configured = isRequiredSetupComplete(client.id);
  const disabledClass = configured ? '' : ' nav-item-dis';
  const disabledClick = configured ? '' : `onclick="event.preventDefault();showToast('Complete required setup items to unlock this module')"`; 
  const isActiveClientRoute = ['client', 'congress', 'feed', 'kols', 'settings', 'ask', 'meeting', 'topic', 'competitive', 'captures'].includes(APP_STATE.activeNavKey);
  const recentCapCount = capturesLastHourCount(congress.id);
  const liveNavDot = congress.status === 'active' ? '<span class="nav-live-dot"></span>' : '';

  const clientItems = DATA.clients.map(c => {
    const cConfigured = isRequiredSetupComplete(c.id);
    const active = APP_STATE.activeClientId === c.id && isActiveClientRoute ? 'act' : '';
    return `<a class="nav-item client-ws-item ${active}" href="#/clients/${c.id}">
      <span class="nav-icon">◉</span>${c.name}
      <span class="chip ${cConfigured ? 'own' : 'soft'} xs" style="margin-left:auto">${cConfigured ? 'Active' : 'Setup'}</span>
    </a>`;
  }).join('');

  side.innerHTML = `
    <div class="brand">
      <div class="logo"><span>IQ</span></div>
      <div><h1>Congress IQ</h1><p>ORCHESTRATE AI</p></div>
    </div>

    <div class="nav-client-block">
      <div class="nav-client-dot"></div>
      <div>
        <div class="nav-client-name">${client.name} Workspace</div>
        <div class="nav-client-sub">MedCom Agency</div>
      </div>
    </div>

    <div class="nav-label">Agency</div>
    <a class="nav-item agency-item ${APP_STATE.activeNavKey === 'dashboard' ? 'act' : ''}" href="#/dashboard">
      <span class="nav-icon">⌂</span>Home
    </a>
    <a class="nav-item agency-item" href="#" onclick="showToast('My tasks view coming soon');return false;">
      <span class="nav-icon">☑</span>My Tasks <span class="nav-badge">12</span>
    </a>
    <a class="nav-item agency-item" href="#" onclick="showToast('Notifications view coming soon');return false;">
      <span class="nav-icon">🔔</span>Notifications <span class="nav-badge">5</span>
    </a>

    <div class="nav-label">Client Workspaces</div>
    ${clientItems}
    <a class="nav-item client-ws-item" href="#" onclick="openCreateClientModal(); return false;">
      <span class="nav-icon">＋</span>Add Client Workspace
    </a>

    <div class="nav-label">Client Modules</div>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'client') ? 'act' : ''}" href="#/clients/${client.id}">
      <span class="nav-icon">▣</span>${client.name} Overview
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'congress') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}" ${disabledClick}>
      <span class="nav-icon">◈</span>Congress Dashboard
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'feed') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}/feed" ${disabledClick}>
      <span class="nav-icon">☰</span>Intel Feed <span class="nav-badge">312</span>
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'captures') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}/captures" ${disabledClick}>
      <span class="nav-icon">◉</span>Capture Stream ${liveNavDot}${recentCapCount ? `<span class="nav-badge">${recentCapCount}</span>` : ''}
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'ask') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}/ask" ${disabledClick}>
      <span class="nav-icon">✦</span>Ask Anything
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'meeting') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}/meeting-list" ${disabledClick}>
      <span class="nav-icon">☷</span>Meeting List
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'topic') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/congresses/${congress.id}/topics/IL-23" ${disabledClick}>
      <span class="nav-icon">◎</span>Topic Brief
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'kols') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/kols" ${disabledClick}>
      <span class="nav-icon">⊛</span>KOL Directory
    </a>
    <a class="nav-item module-item ${(APP_STATE.activeNavKey === 'competitive') ? 'act' : ''}${disabledClass}" href="#/clients/${client.id}/competitive" ${disabledClick}>
      <span class="nav-icon">◍</span>Competitive
    </a>

    <div class="nav-label">Configuration</div>
    <a class="nav-item config-item ${(APP_STATE.activeNavKey === 'settings') ? 'act' : ''}" href="#/clients/${client.id}/settings/prioritization">
      <span class="nav-icon">⚙</span>Priority Settings
    </a>
    <a class="nav-item config-item ${(APP_STATE.activeNavKey === 'profile') ? 'act' : ''}" href="#/profile">
      <span class="nav-icon">◎</span>My Profile
    </a>

    <div class="side-foot">
      <div class="who">
        <div class="av">SP</div>
        <div><b>Sarah Phillips</b><small>MedCom Agency · Director</small></div>
      </div>
    </div>
  `;
}

function ensureTopbarCreateMenu() {
  const host = document.querySelector('.tb-actions');
  if (!host || document.getElementById('top-create-wrap')) return;
  const wrap = document.createElement('div');
  wrap.id = 'top-create-wrap';
  wrap.className = 'top-create-wrap';
  wrap.innerHTML = `<button class="btn-secondary sm" onclick="toggleCreateMenu(event)">＋ Create New ▾</button>
    <div class="top-create-menu" id="top-create-menu">
      <button class="menu-row" onclick="openCreateClientModal()">Create New Client Workspace</button>
      <button class="menu-row" onclick="location.hash='#/clients/${APP_STATE.activeClientId}/congresses/new'">Create New Congress</button>
    </div>`;
  host.prepend(wrap);
  document.addEventListener('click', () => {
    document.getElementById('top-create-menu')?.classList.remove('show');
    document.getElementById('ws-switcher-menu')?.classList.remove('show');
  });
}

function toggleCreateMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('top-create-menu');
  if (!menu) return;
  menu.classList.toggle('show');
}

function toggleWorkspaceSwitcher() {
  let menu = document.getElementById('ws-switcher-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'ws-switcher-menu';
    menu.className = 'ws-switcher-menu';
    document.body.appendChild(menu);
  }
  const activeClient = getClient(APP_STATE.activeClientId);
  const items = DATA.clients.map(c =>
    `<button class="menu-row" onclick="switchWorkspace('${c.id}')">
      <span class="ctag xs">${c.abbr}</span> ${c.name} ${isRequiredSetupComplete(c.id) ? '' : '<span class="chip soft xs">Setting up</span>'}
    </button>`).join('');
  menu.innerHTML = `<div class="ws-sw-hd">Active workspace</div>
    <div class="ws-sw-current"><span class="ctag xs">${activeClient.abbr}</span> ${activeClient.name}</div>
    <div class="ws-sw-divider"></div>
    <div class="ws-sw-grp">Switch to</div>${items}`;
  const trigger = document.querySelector('.tb-congress');
  if (trigger) {
    const r = trigger.getBoundingClientRect();
    menu.style.top = `${r.bottom + 8}px`;
    menu.style.left = `${r.left}px`;
  }
  menu.classList.toggle('show');
}

function switchWorkspace(clientId) {
  APP_STATE.activeClientId = clientId;
  const firstCongress = DATA.congresses.find(c => c.client === clientId) || DATA.congresses[0];
  APP_STATE.activeCongressId = firstCongress.id;
  document.getElementById('ws-switcher-menu')?.classList.remove('show');
  location.hash = `#/clients/${clientId}`;
}

function setPage(html) {
  document.getElementById('page').innerHTML = html;
}

// ==========================================================
// PAGE 1: AGENCY DASHBOARD
// ==========================================================
function renderDashboard() {
  const upcoming = DATA.congresses.filter(c => c.inDays > 0).slice(0, 6);
  const congressRows = upcoming.map(c => {
    const client = DATA.clients.find(cl => cl.id === c.client);
    const clientName = client ? client.abbr : c.client.toUpperCase();
    const status = c.status === 'active' ? 'active' : c.status === 'planning' ? 'planning' : 'completed';
    return `<a class="congress-row" href="#/clients/${c.client}/congresses/${c.id}">
      <div class="cmark ${cmarkClass(c.acronym)}">${c.acronym}</div>
      <div class="cinfo">
        <b>${c.name}</b>
        <div class="meta">${c.dates} · ${c.city} · <span class="chip line" style="font-size:9px;padding:2px 6px">${clientName}</span></div>
      </div>
      <span class="chip ${status === 'active' ? 'own' : 'soft'}">${c.status.charAt(0).toUpperCase()+c.status.slice(1)}</span>
      <span class="when">In ${c.inDays} days</span>
    </a>`;
  }).join('');

  const clientTiles = DATA.clients.map(c =>
    `<a class="client-tile" href="#/clients/${c.id}">
      <div class="ctag">${c.abbr}</div>
      <b>${c.name}</b><small>${c.congresses} Congresses</small>
      <div class="prog"><i style="width:${c.prog}%"></i></div>
    </a>`
  ).join('') + `
    <a class="client-tile" href="#" onclick="openCreateClientModal(); return false;">
      <div class="ctag" style="background:var(--bg);color:var(--teal);border:1px dashed var(--teal)">＋</div>
      <b>Add Client</b><small>Create client workspace</small>
      <div class="prog"><i style="width:12%"></i></div>
    </a>`;

  setPage(`
    <div class="ph">
      <div class="eyebrow">Agency Overview</div>
      <h2>Welcome back, Sarah <span class="wave">👋</span></h2>
      <p>Here's what's happening across your clients and congresses.</p>
    </div>

    <div class="metrics stagger">
      <a class="metric" href="#/clients/gsk">
        ${metricIcon('🏢','ink')}
        <div class="lab">Active Clients</div>
        <div class="num">6</div>
        <span class="view-all">View all →</span>
      </a>
      <a class="metric" href="#/clients/gsk/congresses/ddw-2026">
        ${metricIcon('📅','teal')}
        <div class="lab">Upcoming Congresses</div>
        <div class="num">8</div>
        <div class="sub">Next: DDW 2026 in 41 days</div>
      </a>
      <div class="metric">
        ${metricIcon('⚡','amber')}
        <div class="lab">In Progress</div>
        <div class="num">3</div>
        <div class="sub">2 active, 1 finalizing</div>
      </div>
      <div class="metric">
        ${metricIcon('📊','violet')}
        <div class="lab">Reports Ready</div>
        <div class="num">5</div>
        <div class="sub">3 awaiting client review</div>
      </div>
    </div>

    <div class="cols">
      <div class="panel">
        <div class="panel-h">Upcoming Congresses <a class="more" href="#/clients/gsk">VIEW ALL ›</a></div>
        <div style="padding:6px 0">${congressRows}</div>
      </div>
      <div class="panel">
        <div class="panel-h">Recent Activity</div>
        <div class="panel-b">
          <div class="tl">
            <div class="tl-i"><span class="dt">2H AGO</span><b>Capture added for Dr. Walter Reinisch</b><p>DDW 2026 · GSK</p></div>
            <div class="tl-i"><span class="dt">5H AGO</span><b>Abstract prioritized — SEQUENCE-UC</b><p>DDW 2026 · GSK · Score 94</p></div>
            <div class="tl-i"><span class="dt">1D AGO</span><b>Report generated</b><p>ASCO 2025 Post-Congress · Merck</p></div>
            <div class="tl-i"><span class="dt">2D AGO</span><b>DDW 2026 congress workspace created</b><p>GSK · 4,789 abstracts ingested</p></div>
            <div class="tl-i"><span class="dt">3D AGO</span><b>Dr. Sarah Chen added to KOL list</b><p>GSK · DDW 2026 · Tier 1</p></div>
          </div>
        </div>
      </div>
    </div>

    <div class="sec-title">My Assigned Clients <span class="ln"></span></div>
    <div class="client-grid stagger">${clientTiles}</div>

    <div class="sec-title">Quick Actions <span class="ln"></span></div>
    <div class="qa-grid">
      <a class="qa" href="#" onclick="openCreateClientModal(); return false;">
        <div class="qi">⊕</div><b>Create New Client Workspace</b><small>Set up a new pharma client</small>
      </a>
      <a class="qa" href="#/clients/${APP_STATE.activeClientId}/congresses/new">
        <div class="qi">＋</div><b>Create New Congress</b><small>Start a new congress workspace</small>
      </a>
      <a class="qa" onclick="showToast('Upload feature coming soon — use the Congress workspace to ingest documents'); return false" href="#">
        <div class="qi">⬆</div><b>Upload Documents</b><small>PDFs, slides, screenshots</small>
      </a>
      <a class="qa" href="#/clients/${APP_STATE.activeClientId}/settings/prioritization">
        <div class="qi">★</div><b>View Prioritization</b><small>AI-ranked opportunities</small>
      </a>
      <a class="qa" href="#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/captures?capture=new">
        <div class="qi">●</div><b>Add Capture</b><small>Voice, photo, or note</small>
      </a>
    </div>
  `);
}

// ==========================================================
// PAGE 2: CLIENT WORKSPACE
// ==========================================================
function renderClientWorkspace(clientId = APP_STATE.activeClientId, drawerId = null) {
  APP_STATE.activeClientId = clientId;
  const client = getClient(clientId);
  const setup = getSetup(clientId);
  const status = checklistStatus(clientId);
  const requiredDone = Number(status.priorities) + Number(status.therapeuticAreas);
  const doneCount = Object.values(status).filter(Boolean).length;
  const isConfigured = isRequiredSetupComplete(clientId);

  const congresses = DATA.congresses.filter(c => c.client === clientId && c.inDays > 0);
  const firstCongress = congresses[0] || DATA.congresses.find(c => c.client === 'gsk');
  if (firstCongress) APP_STATE.activeCongressId = firstCongress.id;
  const congressPath = `#/clients/${clientId}/congresses/${APP_STATE.activeCongressId}`;

  const setupTag = isConfigured ? `<span class="setup-tag" onclick="showToast('Setup checklist available via drawer actions')">Setup complete · ${doneCount}/7 ✓</span>` : '';
  const readyShown = localStorage.getItem(readyBannerKey(clientId)) === '1';
  const showReady = isConfigured && !readyShown;
  if (showReady) localStorage.setItem(readyBannerKey(clientId), '1');

  const setupPanel = `
    <div class="setup-panel">
      <div class="setup-hd">
        <div><h3>Set up your workspace</h3><p class="muted">Configure your strategic context once. This lens drives abstract scoring, KOL surfacing, and competitive flagging.</p></div>
        <div class="setup-progress">
          <div class="sp-num"><b>${doneCount}</b> <span>/ 7</span></div>
          <div class="bar"><i style="width:${(doneCount/7)*100}%"></i></div>
          <small><b>Required: ${requiredDone} / 2</b> · 5 recommended</small>
        </div>
      </div>
      <ol class="checklist">
        ${setupChecklistItem('priorities','Strategic Priorities','3–5 high-level priorities that shape what matters for this client.',true,status.priorities)}
        ${setupChecklistItem('therapeutic-areas','Therapeutic Areas & Focus Areas','The TAs and sub-topics the client cares about.',true,status.therapeuticAreas)}
        ${setupChecklistItem('pipeline','Pipeline Assets','Pipeline and marketed drugs — enables own-company flagging on abstracts.',false,status.pipeline)}
        ${setupChecklistItem('competitors','Competitors','Competitor companies and drugs — enables competitive flagging.',false,status.competitors)}
        ${setupChecklistItem('kols','Priority KOLs','10–20 priority KOLs for meeting prep. Can be added anytime.',false,status.kols)}
        ${setupChecklistItem('keywords','Strategic Keywords & Topics','Search vocabulary that boosts matching abstracts in the Intel Feed.',false,status.keywords)}
        <li class="check-item ${status.weights ? 'done' : 'pending'}">
          <span class="ic">${status.weights ? '✓' : '○'}</span>
          <div class="ci-body"><b>Prioritization Weights</b><small>Defaults provided — review if you want to tune scoring.</small></div>
          <span class="chip soft xs">Defaults set</span>
          <a class="btn-secondary sm" href="#/clients/${clientId}/settings/prioritization">Review</a>
        </li>
      </ol>
    </div>
    <div class="overview-preview muted-preview">
      <div class="metrics"><div class="metric"><div class="lab">Active Congresses</div><div class="num">—</div></div><div class="metric"><div class="lab">KOLs Tracked</div><div class="num">—</div></div><div class="metric"><div class="lab">Insights Captured</div><div class="num">—</div></div></div>
      <div class="preview-note">Available once setup is complete.</div>
    </div>
  `;

  const congRows = congresses.slice(0,5).map(c =>
    `<a class="cong-mini" href="#/clients/${clientId}/congresses/${c.id}">
      <div class="cmark sm ${cmarkClass(c.acronym)}">${c.acronym}</div>
      <div><b>${c.acronym} ${c.dates.split(',')[0]}</b><div class="meta">${c.dates} · ${c.city}</div></div>
      <span class="when">In ${c.inDays}d</span>
    </a>`
  ).join('') || `<div class="empty" style="padding:22px"><h3>No congresses yet</h3><p>Add your first congress when setup is complete.</p></div>`;

  const priorities = (setup.priorities.length ? setup.priorities : DATA.strategicPriorities.map(p => ({ text:p.text, level:p.level }))).map((p, idx) =>
    `<div class="pri pri-${p.level || 'medium'}"><div class="pri-n">${idx+1}</div><b>${p.text}</b><span class="chip ${(p.level || 'medium') === 'high' ? 'comp xs' : 'soft xs'}">${(p.level || 'medium').toUpperCase()}</span></div>`
  ).join('');

  setPage(`
    <div class="crumb">Client Workspaces › <b>${client.name}</b> ${setupTag}</div>
    <div class="client-hd">
      <div class="ctag-lg">${client.abbr}</div>
      <div>
        <h2>${client.name} <span class="chip ${isConfigured ? 'own' : 'soft'}">${isConfigured ? 'Active Client' : 'Setting up'}</span></h2>
        <p>${isConfigured ? `${client.name} workspace configured for strategic congress planning.` : 'Configure your strategic context to start tracking congresses.'}</p>
      </div>
      <div class="hd-actions">
        <button class="btn-secondary" onclick="showToast('Client Settings panel coming soon')">⚙ Client Settings</button>
        ${isConfigured ? `<a class="btn-primary" href="#/clients/${clientId}/congresses/new">＋ New Congress</a>` : `<button class="btn-primary pulse-cta" disabled title="Configure Strategic Priorities and at least one Therapeutic Area to add a congress.">＋ New Congress</button>`}
      </div>
    </div>

    ${showReady ? `<div class="ready-banner"><div class="rb-ic">✨</div><div class="rb-body"><b>You're ready.</b><p>Add your first congress to see the lens in action.</p></div><a class="btn-primary" href="#/clients/${clientId}/congresses/new">＋ New Congress</a></div>` : ''}

    <nav class="tabs">
      <a class="tab act">Overview</a>
      <a class="tab" href="${congressPath}">Congresses</a>
      <a class="tab" href="#/clients/${clientId}/kols">KOLs</a>
      <a class="tab" href="#/clients/${clientId}/competitive">Competitive</a>
      <a class="tab" onclick="showTabStub(this,'Insights')">Insights</a>
      <a class="tab" onclick="showTabStub(this,'Reports')">Reports</a>
      <a class="tab" onclick="showTabStub(this,'Documents')">Documents</a>
      <a class="tab" onclick="showTabStub(this,'Company Profile')">Company Profile</a>
      <a class="tab" onclick="showTabStub(this,'Team')">Team</a>
    </nav>

    ${isConfigured ? `
      <div class="metrics stagger">
        <div class="metric">${metricIcon('📅','teal')}<div class="lab">Active Congresses</div><div class="num">${client.congresses || 0}</div><div class="sub">Across 2026</div></div>
        <div class="metric">${metricIcon('👥','ink')}<div class="lab">KOLs Tracked</div><div class="num">${client.kols || 0}</div><div class="sub">All TAs</div></div>
        <div class="metric">${metricIcon('⚡','amber')}<div class="lab">Insights Captured</div><div class="num">${(client.insights || 0).toLocaleString()}</div><div class="sub">This year</div></div>
        <div class="metric">${metricIcon('📊','violet')}<div class="lab">Reports Generated</div><div class="num">${client.reports || 0}</div><div class="sub">This year</div></div>
        <div class="metric">${metricIcon('⚙','green')}<div class="lab">Strategic Priorities</div><div class="num">${setup.priorities.length || 4}</div><div class="sub">Configured</div></div>
      </div>
      <div class="cols-3">
        <div class="panel"><div class="panel-h">Upcoming Congresses <a class="more" href="${congressPath}">VIEW ALL ›</a></div><div class="panel-b" style="padding:4px 16px">${congRows}</div></div>
        <div class="panel"><div class="panel-h">Top Therapeutic Areas</div><div class="panel-b" style="display:flex;flex-direction:column;align-items:center"><canvas id="ta-donut" width="180" height="180"></canvas><div class="legend"><div><span class="d" style="background:#0D9488"></span>Gastroenterology <b>38%</b></div><div><span class="d" style="background:#6D5BD0"></span>Respiratory <b>27%</b></div><div><span class="d" style="background:#B45309"></span>Oncology <b>18%</b></div><div><span class="d" style="background:#48607A"></span>Immunology <b>12%</b></div><div><span class="d" style="background:#AEBECD"></span>Other <b>5%</b></div></div></div></div>
        <div class="panel"><div class="panel-h">Recent Activity</div><div class="panel-b"><div class="tl"><div class="tl-i"><span class="dt">2H AGO</span><b>New congress setup progress updated</b></div><div class="tl-i"><span class="dt">5H AGO</span><b>Strategic context saved</b></div><div class="tl-i"><span class="dt">1D AGO</span><b>Prioritization settings updated</b></div></div></div></div>
      </div>
      <div class="sec-title">Strategic Priorities <a class="more" onclick="openDrawer('${clientId}','priorities')">MANAGE PRIORITIES ›</a><span class="ln"></span></div>
      <div class="priorities-grid">${priorities}</div>
      <div class="sec-title">Key Documents <a class="more" onclick="showToast('Document library coming soon')">VIEW ALL ›</a><span class="ln"></span></div>
      <div class="docs"><div class="doc"><div class="dic pdf">PDF</div><div><b>${client.name} Clinical Pipeline Overview</b><small>Updated Apr 25, 2026</small></div></div><div class="doc"><div class="dic ppt">PPTX</div><div><b>${client.name} Therapeutic Area Strategy 2026</b><small>Updated Apr 20, 2026</small></div></div><div class="doc"><div class="dic xls">XLSX</div><div><b>${client.name} Competitor Landscape</b><small>Updated Apr 18, 2026</small></div></div></div>
    ` : setupPanel}
  `);

  if (isConfigured) {
    requestAnimationFrame(() => {
      const canvas = document.getElementById('ta-donut');
      if (canvas && window.Chart) {
        chartInstances['ta-donut'] = new Chart(canvas, {
          type: 'doughnut',
          data: { labels: ['Gastroenterology','Respiratory','Oncology','Immunology','Other'], datasets: [{ data: [38,27,18,12,5], backgroundColor: ['#0D9488','#6D5BD0','#B45309','#48607A','#AEBECD'], borderWidth: 2, borderColor: '#fff' }] },
          options: { plugins: { legend: { display: false } }, cutout: '70%', animation: { duration: 600 } }
        });
      }
    });
  }
  if (drawerId) openDrawer(clientId, drawerId);
}

function setupChecklistItem(id, title, description, required, done) {
  const chip = required ? '<span class="chip comp xs">Required</span>' : '<span class="chip soft xs">Recommended</span>';
  return `<li class="check-item ${done ? 'done' : 'pending'} ${required ? 'required' : 'recommended'}">
    <span class="ic">${done ? '✓' : '○'}</span>
    <div class="ci-body"><b>${title}</b><small>${description}</small></div>
    ${chip}
    <button class="${required ? 'btn-primary' : 'btn-secondary'} sm" onclick="openDrawer('${APP_STATE.activeClientId}','${id}')">Configure</button>
    ${required ? '' : `<button class="link skip" onclick="showToast('You can return to this anytime')">Skip for now</button>`}
  </li>`;
}

function showTabStub(el, name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('act'));
  el.classList.add('act');
  const stub = document.querySelector('.coming-soon') || document.createElement('div');
  const sections = document.querySelectorAll('.priorities, .docs, .sec-title, .metrics, .cols-3');
  sections.forEach(s => s.style.display = 'none');
  let cs = document.getElementById('tab-stub');
  if (!cs) {
    cs = document.createElement('div');
    cs.id = 'tab-stub';
    cs.className = 'coming-soon';
    document.getElementById('page').appendChild(cs);
  }
  cs.innerHTML = `<h3>${name}</h3><p>This tab is not yet wired in the prototype.<br>The full demo arc runs through Overview → DDW 2026 → Intel Feed.</p>`;
  cs.style.display = 'block';
  return false;
}

// ==========================================================
// PAGE 3: CONGRESS DASHBOARD
// ==========================================================
function renderCongressDashboard() {
  setPage(`
    <div class="crumb">Client Workspaces › GSK › Congresses › <b>Digestive Disease Week 2026</b></div>
    <div class="cong-hd">
      <div class="cmark lg ddw">DDW</div>
      <div class="cong-info">
        <h2>Digestive Disease Week 2026 <span class="chip own">Active</span></h2>
        <div class="meta">📅 May 3–6, 2026 · 📍 San Diego, CA · #DDW2026</div>
      </div>
      <div class="hd-actions">
        <button class="btn-secondary" onclick="showToast('Sharing link copied to clipboard')">⤴ Share</button>
        <button class="btn-secondary" onclick="location.hash='#/clients/gsk/congresses/new'">⬆ Upload / Ingest</button>
        <button class="btn-primary" onclick="openCapture()">＋ Capture Insight</button>
      </div>
    </div>

    <nav class="tabs">
      <a class="tab act">Overview</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026/feed">Abstracts</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026/ask">Ask</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026/meeting-list">Meeting List</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026/topics/IL-23">Topics</a>
      <a class="tab" onclick="showToast('Sessions view coming soon')">Sessions</a>
      <a class="tab" onclick="showToast('Posters view coming soon')">Posters</a>
      <a class="tab" href="#/clients/gsk/kols">People</a>
      <a class="tab" onclick="showToast('Companies view coming soon')">Companies</a>
      <a class="tab" onclick="showToast('Insights view coming soon')">Insights</a>
      <a class="tab" onclick="showToast('Tasks view coming soon')">Tasks</a>
      <a class="tab" onclick="showToast('Reports view coming soon')">Reports</a>
      <a class="tab" onclick="showToast('Files view coming soon')">Files</a>
    </nav>

    <div class="metrics stagger">
      <div class="metric">${metricIcon('📋','teal')}<div class="lab">Total Sessions</div><div class="num">1,342</div><div class="sub">Across all tracks</div></div>
      <div class="metric">${metricIcon('📄','ink')}<div class="lab">Abstracts</div><div class="num">4,789</div><div class="sub"><b>2,156</b> prioritized</div></div>
      <div class="metric">${metricIcon('👥','violet')}<div class="lab">KOLs Identified</div><div class="num">623</div><div class="sub"><b>158</b> to connect with</div></div>
      <div class="metric">${metricIcon('⭐','amber')}<div class="lab">My Prioritized Items</div><div class="num">87</div><div class="sub">Sessions · abstracts · people</div></div>
      <div class="metric prog-tile">
        <div class="lab">Congress Progress</div>
        <div class="ring-wrap">
          <svg class="big-ring" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E7EDF3" stroke-width="8"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0D9488" stroke-width="8"
              stroke-linecap="round" stroke-dasharray="251.3" stroke-dashoffset="70.4"
              transform="rotate(-90 50 50)"/>
          </svg>
          <div class="ring-pct"><b>72%</b><small>Prep done</small></div>
        </div>
      </div>
    </div>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">Top Prioritized Sessions <a class="more" href="#/clients/gsk/congresses/ddw-2026/feed">VIEW ALL ›</a></div>
        <table class="ttbl">
          <thead><tr><th>SESSION</th><th>DATE & TIME</th><th>PRIORITY</th></tr></thead>
          <tbody>
            <tr onclick="location.hash='#/abstracts/lba-101'" style="cursor:pointer">
              <td><b>LB01 — Phase III Risankizumab vs Ustekinumab UC</b><br><small>Late-Breaking Research</small></td>
              <td>Thu May 3 · 9:00–9:30</td><td><span class="chip comp">High</span></td>
            </tr>
            <tr onclick="location.hash='#/abstracts/plen-12'" style="cursor:pointer">
              <td><b>PLEN12 — Semaglutide MASH Fibrosis ESSENCE</b><br><small>Plenary</small></td>
              <td>Thu May 3 · 10:30–11:00</td><td><span class="chip comp">High</span></td>
            </tr>
            <tr onclick="location.hash='#/abstracts/oral-415'" style="cursor:pointer">
              <td><b>175 — Risankizumab 2-Year Durability CD</b><br><small>Scientific Oral</small></td>
              <td>Thu May 3 · 13:30–14:00</td><td><span class="chip comp">High</span></td>
            </tr>
            <tr onclick="location.hash='#/abstracts/oral-156'" style="cursor:pointer">
              <td><b>212 — Mirikizumab vs Adalimumab VIVID-2</b><br><small>Scientific Oral</small></td>
              <td>Fri May 4 · 09:00–09:30</td><td><span class="chip soft">Medium</span></td>
            </tr>
            <tr onclick="location.hash='#/abstracts/sym-04'" style="cursor:pointer">
              <td><b>SYM04 — Treat-to-Target IBD Consensus</b><br><small>Symposium</small></td>
              <td>Fri May 4 · 11:30–13:00</td><td><span class="chip soft">Medium</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel">
        <div class="panel-h">Top KOLs to Engage <a class="more" href="#/clients/gsk/kols">VIEW ALL ›</a></div>
        <div class="panel-b" style="padding:4px 16px">
          ${['sarah-chen','subrata-ghosh','bram-vermeire','william-sandborn','brian-feagan'].map(id => {
            const k = getKol(id);
            return `<a class="kol-row" href="#/kols/${k.id}">
              <div class="av">${k.initials}</div>
              <div><b>${k.name}</b><small>${k.affiliation}</small></div>
              <span class="chip ${k.match === 'high' ? 'comp' : 'soft'}">${k.match === 'high' ? 'High' : 'Medium'}</span>
            </a>`;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">My Tasks (7) <a class="more" onclick="showToast('Full task list coming soon')">VIEW ALL ›</a></div>
        <div class="panel-b tasks">
          <div class="ph-grp">PRE-CONGRESS</div>
          <label class="task"><input type="checkbox"> Review 18 high-priority abstracts <span class="due">Due May 3</span></label>
          <label class="task"><input type="checkbox"> Confirm meetings with 5 KOLs <span class="due">Due May 3</span></label>
          <label class="task"><input type="checkbox" checked> Update KOL dossiers for top 10 <span class="due">Done</span></label>
          <div class="ph-grp">ONSITE</div>
          <label class="task"><input type="checkbox"> Attend LB01 session <span class="due">May 3, 9:00</span></label>
          <label class="task"><input type="checkbox"> Capture insights from GSK symposium <span class="due">May 3, 12:30</span></label>
          <div class="ph-grp">POST-CONGRESS</div>
          <label class="task"><input type="checkbox"> Submit daily report — Day 1 <span class="due">May 3, 18:00</span></label>
          <label class="task"><input type="checkbox"> Final congress summary <span class="due">May 10</span></label>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">Priority Breakdown <a class="more" href="#/clients/gsk/settings/prioritization">CONFIGURE ›</a></div>
        <div class="panel-b breakdown">
          <div>
            <div class="bd-h">Therapeutic Areas</div>
            <div class="bd-row"><b>IBD</b><div class="bar"><i style="width:88%;background:#0D9488"></i></div><span>42</span></div>
            <div class="bd-row"><b>Hepatology</b><div class="bar"><i style="width:60%;background:#6D5BD0"></i></div><span>28</span></div>
            <div class="bd-row"><b>Pancreatology</b><div class="bar"><i style="width:38%;background:#B45309"></i></div><span>18</span></div>
            <div class="bd-row"><b>GI Oncology</b><div class="bar"><i style="width:18%;background:#48607A"></i></div><span>8</span></div>
          </div>
          <div>
            <div class="bd-h">Data Types</div>
            <div class="bd-row"><b>Clinical Trials</b><div class="bar"><i style="width:92%;background:#0D9488"></i></div><span>46</span></div>
            <div class="bd-row"><b>Safety Data</b><div class="bar"><i style="width:46%;background:#B45309"></i></div><span>22</span></div>
            <div class="bd-row"><b>Real World Data</b><div class="bar"><i style="width:34%;background:#6D5BD0"></i></div><span>16</span></div>
            <div class="bd-row"><b>Basic Science</b><div class="bar"><i style="width:14%;background:#48607A"></i></div><span>6</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="panel-h">Recent Insights <a class="more" href="#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/captures">VIEW ALL ›</a></div>
      <div class="panel-b capture-embed-list">${renderRecentCapturesPanel(3)}</div>
    </div>
  `);
}

function autoCompetitiveAbstractIds(clientId = APP_STATE.activeClientId) {
  const setup = getSetup(clientId);
  const competitorDrugs = (setup.competitorDrugs || []).map(d => String(d).toLowerCase());
  return DATA.abstracts.filter(a => {
    if (a.signal === 'competitive') return true;
    const drugs = (a.drugs || []).map(d => String(d).toLowerCase());
    return drugs.some(d => competitorDrugs.includes(d));
  }).map(a => a.id);
}

function autoCompetitiveKolIds(clientId = APP_STATE.activeClientId) {
  const abstractIdSet = new Set(autoCompetitiveAbstractIds(clientId));
  return DATA.abstracts
    .filter(a => abstractIdSet.has(a.id))
    .map(a => a.authorId)
    .filter(Boolean);
}

function isAbstractCompetitiveTagged(abstractId, clientId = APP_STATE.activeClientId) {
  const tags = getCompetitiveTags(clientId);
  const autoSet = new Set(autoCompetitiveAbstractIds(clientId));
  return autoSet.has(abstractId) || tags.abstractIds.includes(abstractId);
}

function isKolCompetitiveTagged(kolId, clientId = APP_STATE.activeClientId) {
  const tags = getCompetitiveTags(clientId);
  const autoSet = new Set(autoCompetitiveKolIds(clientId));
  return autoSet.has(kolId) || tags.kolIds.includes(kolId);
}

function toggleKolCompetitiveTag(kolId) {
  const clientId = APP_STATE.activeClientId;
  const tags = getCompetitiveTags(clientId);
  if (tags.kolIds.includes(kolId)) {
    tags.kolIds = tags.kolIds.filter(id => id !== kolId);
    showToast('KOL removed from competitive tags');
  } else {
    tags.kolIds.push(kolId);
    showToast('KOL tagged as competitive');
  }
  saveCompetitiveTags(clientId, tags);
  route();
}

function toggleAbstractCompetitiveTag(abstractId) {
  const clientId = APP_STATE.activeClientId;
  const tags = getCompetitiveTags(clientId);
  if (tags.abstractIds.includes(abstractId)) {
    tags.abstractIds = tags.abstractIds.filter(id => id !== abstractId);
    showToast('Abstract removed from competitive tags');
  } else {
    tags.abstractIds.push(abstractId);
    showToast('Abstract tagged as competitive');
  }
  saveCompetitiveTags(clientId, tags);
  route();
}

function renderCompetitiveWorkspace(clientId = APP_STATE.activeClientId) {
  const client = getClient(clientId);
  const setup = getSetup(clientId);
  const tags = getCompetitiveTags(clientId);

  const autoAbs = new Set(autoCompetitiveAbstractIds(clientId));
  const autoKols = new Set(autoCompetitiveKolIds(clientId));

  const taggedAbstracts = DATA.abstracts.filter(a => autoAbs.has(a.id) || tags.abstractIds.includes(a.id));
  const taggedKols = DATA.kols.filter(k => autoKols.has(k.id) || tags.kolIds.includes(k.id));

  const kolRows = taggedKols.slice(0, 10).map(k => `
    <tr>
      <td><b>${k.name}</b><br><small>${k.affiliation}</small></td>
      <td>${k.focus.slice(0,2).map(f => `<span class="chip line" style="margin:2px">${f}</span>`).join('')}</td>
      <td>${autoKols.has(k.id) ? '<span class="chip soft xs">Auto</span>' : '<span class="chip line xs">Manual</span>'}</td>
      <td><button class="btn-secondary sm" onclick="toggleKolCompetitiveTag('${k.id}')">${tags.kolIds.includes(k.id) ? 'Untag' : 'Tag'}</button></td>
    </tr>
  `).join('');

  const abstractCards = taggedAbstracts.slice(0, 8).map(a => `
    <a class="acard ${cardClass(a.signal)}" href="#/abstracts/${a.id}">
      <div class="acard-body">
        <div class="acard-chips">
          <span class="chip comp">COMPETITIVE</span>
          ${chipBySession(a.session)}
          <span class="chip soft xs">${a.topic}</span>
          ${autoAbs.has(a.id) ? '<span class="chip soft xs">Auto</span>' : '<span class="chip line xs">Manual</span>'}
        </div>
        <div class="acard-title">${a.title}</div>
        <div class="acard-meta">${a.author} · ${a.affiliation}</div>
      </div>
      <div class="acard-score-col">
        <div class="acard-priority-label">Priority</div>
        ${scoreRing(a.priority, '#B45309')}
        <div class="acard-acts">
          <button title="Toggle tag" onclick="event.preventDefault();event.stopPropagation();toggleAbstractCompetitiveTag('${a.id}')">${tags.abstractIds.includes(a.id) ? '−' : '+'}</button>
        </div>
      </div>
    </a>
  `).join('');

  setPage(`
    <div class="crumb">Client Workspaces › <b>${client.name}</b> › Competitive</div>
    <div class="ph">
      <div class="eyebrow">${client.name} workspace</div>
      <h2>Competitive Intelligence</h2>
      <p>Tag competitor-relevant KOLs and abstracts to sharpen meeting prep and narrative tracking.</p>
      <div class="ph-actions">
        <button class="btn-secondary" onclick="openDrawer('${clientId}','competitors')">Configure competitors</button>
        <a class="btn-primary" href="#/clients/${clientId}/congresses/${APP_STATE.activeCongressId}/feed">Review Intel Feed</a>
      </div>
    </div>

    <nav class="tabs">
      <a class="tab" href="#/clients/${clientId}">Overview</a>
      <a class="tab" href="#/clients/${clientId}/kols">KOLs</a>
      <a class="tab act">Competitive</a>
    </nav>

    <div class="metrics">
      <div class="metric"><div class="lab">Competitor Companies</div><div class="num">${setup.competitorCompanies.length}</div></div>
      <div class="metric"><div class="lab">Competitor Drugs</div><div class="num">${setup.competitorDrugs.length}</div></div>
      <div class="metric"><div class="lab">Tagged KOLs</div><div class="num">${taggedKols.length}</div></div>
      <div class="metric"><div class="lab">Tagged Abstracts</div><div class="num">${taggedAbstracts.length}</div></div>
    </div>

    <div class="cols-2" style="align-items:start">
      <div class="panel">
        <div class="panel-h">Competitor Registry</div>
        <div class="panel-b">
          <div class="comp-list">
            <h4>Companies</h4>
            <div>${(setup.competitorCompanies || []).map(c => `<span class="chip comp" style="margin:2px">${c}</span>`).join('') || '<span class="muted">No competitor companies configured</span>'}</div>
            <h4 style="margin-top:10px">Drugs</h4>
            <div>${(setup.competitorDrugs || []).map(d => `<span class="chip line" style="margin:2px">${d}</span>`).join('') || '<span class="muted">No competitor drugs configured</span>'}</div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">Competitive KOLs</div>
        <div class="panel-b" style="padding:0">
          <table class="kol-table">
            <thead><tr><th>KOL</th><th>Focus</th><th>Source</th><th></th></tr></thead>
            <tbody>${kolRows || '<tr><td colspan="4"><div class="empty"><h3>No tagged KOLs yet</h3><p>Tag KOLs from the KOL Directory or inferred abstract activity.</p></div></td></tr>'}</tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="panel-h">Competitive Abstracts</div>
      <div class="panel-b">
        <div class="acards">${abstractCards || '<div class="empty"><h3>No competitive abstracts yet</h3><p>Use feed tagging once competitor assets are configured.</p></div>'}</div>
      </div>
    </div>
  `);
}

// ==========================================================
// PAGE 4: INTEL FEED
// ==========================================================
let feedFilters = [];
let feedSearch = '';
let feedSort = 'priority';

function renderIntelFeed() {
  feedFilters = [];
  feedSearch = '';
  feedSort = 'priority';

  const filterDefs = [
    { key:'all',          label:'All',          cls:'' },
    { key:'competitive',  label:'Competitive',  cls:'comp-f' },
    { key:'own',          label:'Own Pipeline', cls:'own-f' },
    { key:'indication',   label:'Indication',   cls:'both-f' },
    { key:'late-breaking',label:'Late-Breaking',cls:'lb-f' },
    { key:'poster',       label:'Posters',      cls:'soft-f' }
  ];

  const chips = filterDefs.map(f =>
    `<span class="fchip ${f.cls}${f.key === 'all' ? ' act' : ''}" data-filter="${f.key}" onclick="toggleFeedFilter('${f.key}')">${f.label}</span>`
  ).join('');

  const setup = getSetup(APP_STATE.activeClientId);
  const ownDisabled = setup.pipeline.length === 0;
  const compDisabled = setup.competitorCompanies.length === 0 && setup.competitorDrugs.length === 0;
  const configNotices = `
    ${ownDisabled ? `<div class="config-notice"><span class="ic">ⓘ</span><span>Own-company flagging is disabled — no pipeline assets configured.</span><a class="link" onclick="openDrawer('${APP_STATE.activeClientId}','pipeline')">Add pipeline assets →</a></div>` : ''}
    ${compDisabled ? `<div class="config-notice"><span class="ic">ⓘ</span><span>Competitive flagging is disabled — no competitors configured.</span><a class="link" onclick="openDrawer('${APP_STATE.activeClientId}','competitors')">Add competitors →</a></div>` : ''}
  `;

  setPage(`
    <div class="feed-hd">
      <div class="feed-hd-left">
        <span class="eyebrow">Intel Feed · DDW 2026</span>
        <h2>Prioritized Abstracts</h2>
      </div>
      <div class="feed-hd-right">
        <span class="feed-stat"><b id="feed-count">${DATA.abstracts.length}</b> <span class="muted">of 4,789 abstracts</span></span>
        <div class="sort">
          <select onchange="onFeedSort(this.value)">
            <option value="priority">Priority score</option>
            <option value="date">Session date</option>
            <option value="session">Session type</option>
          </select>
        </div>
      </div>
    </div>
    ${configNotices}

    <div class="feed-bar">
      <div class="feed-search-wrap">
        <span class="feed-search-ic">⌕</span>
        <input id="feed-search" class="feed-search-inp" placeholder="Search abstracts, drugs, topics, authors…" oninput="onFeedSearch(this.value)">
        <button class="feed-search-clear" onclick="clearFeedSearch()" title="Clear">✕</button>
      </div>
      <div class="feed-chips">
        ${chips}
        <button class="feed-clear-all" onclick="clearFeedFilters()">Clear</button>
      </div>
    </div>

    <div id="feed-cards" class="acards"></div>
  `);

  renderFeedCards();
}

function getFilteredAbstracts() {
  let results = [...DATA.abstracts];
  if (feedFilters.length > 0 && !feedFilters.includes('all')) {
    results = results.filter(a => {
      return feedFilters.some(f => {
        if (f === 'competitive') return a.signal === 'competitive';
        if (f === 'own') return a.signal === 'own';
        if (f === 'indication') return a.signal === 'indication';
        if (f === 'late-breaking') return a.session === 'late-breaking';
        if (f === 'poster') return a.session === 'poster';
        return true;
      });
    });
  }
  if (feedSearch) {
    const q = feedSearch.toLowerCase();
    results = results.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.topic.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      (a.drugs || []).some(d => d.toLowerCase().includes(q))
    );
  }
  if (feedSort === 'priority') results.sort((a, b) => b.priority - a.priority);
  else if (feedSort === 'session') results.sort((a, b) => a.session.localeCompare(b.session));
  return results;
}

function renderFeedCards() {
  const results = getFilteredAbstracts();
  const el = document.getElementById('feed-cards');
  const count = document.getElementById('feed-count');
  if (count) count.textContent = results.length;
  if (!el) return;

  if (results.length === 0) {
    el.innerHTML = `<div class="empty">
      <div class="ei">🔍</div>
      <h3>No abstracts match your filters</h3>
      <p>Try clearing some filters or adjusting your search.</p>
    </div>`;
    return;
  }

  el.innerHTML = results.map(a => {
    const kol = getKol(a.authorId);
    const isCompetitive = isAbstractCompetitiveTagged(a.id);
    const kolLink = kol
      ? `<span class="acard-author-link" role="link" tabindex="0" onclick="event.preventDefault();event.stopPropagation();location.hash='#/kols/${kol.id}'" onkeydown="if(event.key==='Enter'){event.preventDefault();event.stopPropagation();location.hash='#/kols/${kol.id}'}">${a.author}</span>`
      : `<span class="acard-author">${a.author}</span>`;
    const rawSummary = a.aiSummary
      ? a.aiSummary.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]+>/g,'')
      : '';
    const snippet = rawSummary.length > 0
      ? rawSummary.slice(0, 140) + (rawSummary.length > 140 ? '…' : '')
      : '';
    const nct = a.nct ? `<span class="acard-sep">·</span><span class="acard-nct">${a.nct}</span>` : '';
    return `<a class="acard ${cardClass(a.signal)}" href="#/abstracts/${a.id}">
      <div class="acard-body">
        <div class="acard-chips">
          ${isCompetitive ? '<span class="chip comp">COMPETITIVE</span>' : chipBySignal(a.signal)}
          ${chipBySession(a.session)}
          <span class="chip soft xs">${a.topic}</span>
        </div>
        <div class="acard-title">${a.title}</div>
        ${snippet ? `<div class="acard-snippet">${snippet}</div>` : ''}
        <div class="acard-meta">
          ${kolLink}
          <span class="acard-sep">·</span>
          <span>${a.affiliation}</span>
          ${nct}
          <span class="acard-sep">·</span>
          <span>${a.schedule}</span>
        </div>
      </div>
      <div class="acard-score-col">
        <div class="acard-priority-label">Priority</div>
        ${scoreRing(a.priority, scoreRingColor(a.signal))}
        <div class="acard-priority-band">${a.priority >= 90 ? 'Very High' : a.priority >= 80 ? 'High' : 'Medium'}</div>
        <div class="acard-acts">
          <button title="Save" onclick="event.preventDefault();event.stopPropagation();showToast('Saved to your list')">☆</button>
          <button title="Add" onclick="event.preventDefault();event.stopPropagation();showToast('Added to meeting list')">+</button>
          <button title="Tag competitive" onclick="event.preventDefault();event.stopPropagation();toggleAbstractCompetitiveTag('${a.id}')">${isCompetitive ? '◉' : '○'}</button>
        </div>
      </div>
    </a>`;
  }).join('');
}

function toggleFeedFilter(key) {
  if (key === 'all') {
    feedFilters = [];
  } else {
    const idx = feedFilters.indexOf(key);
    if (idx >= 0) feedFilters.splice(idx, 1);
    else feedFilters.push(key);
  }
  // Update chip states
  document.querySelectorAll('.fchip').forEach(c => {
    const f = c.dataset.filter;
    if (f === 'all') c.classList.toggle('act', feedFilters.length === 0);
    else c.classList.toggle('act', feedFilters.includes(f));
  });
  renderFeedCards();
}

function onFeedSearch(val) { feedSearch = val; renderFeedCards(); }
function clearFeedSearch() {
  feedSearch = '';
  const el = document.getElementById('feed-search');
  if (el) el.value = '';
  renderFeedCards();
}
function clearFeedFilters() {
  feedFilters = [];
  feedSearch = '';
  const el = document.getElementById('feed-search');
  if (el) el.value = '';
  document.querySelectorAll('.fchip').forEach(c => {
    c.classList.toggle('act', c.dataset.filter === 'all');
  });
  renderFeedCards();
}
function onFeedSort(val) { feedSort = val; renderFeedCards(); }

// ==========================================================
// PAGE 5: ABSTRACT DETAIL
// ==========================================================
function renderAbstractDetail(id) {
  const a = getAbstract(id);
  if (!a) {
    setPage(`<div class="empty"><div class="ei">⚠️</div><h3>Abstract not found</h3>
      <p><a class="back-link" href="#/clients/gsk/congresses/ddw-2026/feed">← Back to Intel Feed</a></p></div>`);
    return;
  }

  const kol = getKol(a.authorId);
  const isCompetitive = isAbstractCompetitiveTagged(a.id);
  const related = (a.relatedIds || []).map(rid => getAbstract(rid)).filter(Boolean).slice(0, 3);

  const drugList = (a.drugs || []).map(d => {
    const drug = DATA.drugs ? null : null;
    const synonyms = {
      'risankizumab': ['Skyrizi','IL-23 inhibitor'],
      'ustekinumab': ['Stelara','IL-12/23'],
      'semaglutide': ['Ozempic','Wegovy','GLP-1'],
      'upadacitinib': ['Rinvoq','JAK1'],
      'filgotinib': ['Jyseleca','JAK1'],
      'mirikizumab': ['Omvoh','IL-23p19'],
      'vedolizumab': ['Entyvio','Anti-integrin'],
      'resmetirom': ['Rezdiffra','THR-β'],
      'tirzepatide': ['Mounjaro','GLP-1/GIP']
    };
    const syns = synonyms[d] || [];
    return `<div class="drug">
      <b>${d}</b>
      <div class="syn">${syns.map(s => `<span class="chip line">${s}</span>`).join('')}</div>
    </div>`;
  }).join('');

  const relatedCards = related.map(r =>
    `<a class="rcard" href="#/abstracts/${r.id}">
      <div class="rtop">${chipBySignal(r.signal)}${chipBySession(r.session)}</div>
      <h4>${r.title}</h4>
      <div class="rmeta">${r.author} · Score ${r.priority}</div>
    </a>`
  ).join('');

  setPage(`
    <a class="back-link" href="#/clients/gsk/congresses/ddw-2026/feed">← Back to Intel Feed</a>

    <div class="abstract-hd">
      <div class="top">
        ${isCompetitive ? '<span class="chip comp">COMPETITIVE</span>' : chipBySignal(a.signal)}
        ${chipBySession(a.session)}
        <span class="chip soft">${a.topic}</span>
      </div>
      <h2>${a.title}</h2>
      <div class="meta">
        <span>🗓 ${a.date || 'DDW 2026'} · ${a.schedule}</span>
        ${a.nct ? `<span class="mono">Abstract ${a.id.toUpperCase()} · ${a.nct}</span>` : `<span class="mono">Abstract ${a.id.toUpperCase()}</span>`}
      </div>
      <div class="hd-actions">
        <button class="btn-primary" onclick="showToast('✓ Added to meeting list')">＋ Add to meeting list</button>
        <button class="btn-secondary" onclick="toggleAbstractCompetitiveTag('${a.id}')">${isCompetitive ? '◉ Tagged competitive' : '○ Tag as competitive'}</button>
        <button class="btn-secondary" onclick="showToast('★ Marked as high priority')">★ Mark priority</button>
        <button class="btn-secondary" onclick="showToast('☆ Saved to your list')">☆ Save</button>
        ${scoreRing(a.priority, scoreRingColor(a.signal))}
      </div>
    </div>

    <div class="cols-2" style="align-items:start">
      <div class="abstract-body">
        <div class="ai-summary">
          <div class="ai-lab">AI-GENERATED SUMMARY</div>
          <p>${a.aiSummary || 'Summary not available.'}</p>
        </div>
        <div class="panel" style="margin:16px 0">
          <div class="panel-h">Field reactions
            <button class="btn-secondary sm" style="margin-left:auto" onclick="openCapture('text')">＋ New capture about this abstract</button>
          </div>
          <div class="panel-b">${renderAbstractFieldReactions(a.id)}</div>
        </div>
        ${a.background ? `<section><h3>Background</h3><p>${a.background}</p></section>` : ''}
        ${a.methods ? `<section><h3>Methods</h3><p>${a.methods}</p></section>` : ''}
        ${a.results ? `<section><h3>Results</h3><p>${a.results}</p></section>` : ''}
        ${a.conclusions ? `<section><h3>Conclusions</h3><p>${a.conclusions}</p></section>` : ''}
        <div class="source"><b>Source:</b> Gastroenterology Supplement (forthcoming) ·
          <a href="#" class="ext" onclick="showToast('External links are disabled in the prototype'); return false">View on congress site →</a>
        </div>
      </div>

      <div class="abstract-side">
        <div class="panel">
          <div class="panel-h">Authors</div>
          <div class="panel-b" style="padding:4px 16px">
            ${kol ? `<a class="kol-row" href="#/kols/${kol.id}">
              <div class="av">${kol.initials}</div>
              <div><b>${kol.name}</b><small>${kol.affiliation} · Presenting</small></div>
              <span class="chip own xs">Tier ${kol.tier}</span>
            </a>` : `<div class="kol-row"><div class="av">${a.author.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div><b>${a.author}</b><small>${a.affiliation}</small></div></div>`}
            <div class="kol-row" style="opacity:.6">
              <div class="av" style="background:#6D5BD0">+4</div>
              <div><b>4 additional co-authors</b><small>View full author list on congress site</small></div>
            </div>
          </div>
        </div>

        ${drugList ? `<div class="panel"><div class="panel-h">Drugs mentioned</div><div class="panel-b">${drugList}</div></div>` : ''}

        ${a.nct ? `<div class="panel">
          <div class="panel-h">Trial</div>
          <div class="panel-b">
            <b class="mono">${a.nct}</b><br>
            <span style="font-size:13px;color:var(--slate)">Phase 3 · Active, recruiting</span>
            <div class="ext-link" onclick="showToast('External links are disabled in the prototype')">View on ClinicalTrials.gov →</div>
          </div>
        </div>` : ''}

        <div class="panel">
          <div class="panel-h">Topics</div>
          <div class="panel-b">
            ${(a.topics || []).map(t => `<span class="chip soft" style="margin:2px">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>

    ${relatedCards ? `
    <div class="sec-title">Related Abstracts <span class="ln"></span></div>
    <div class="related-cards">${relatedCards}</div>` : ''}
  `);
}

// ==========================================================
// PAGE 6: KOL DIRECTORY
// ==========================================================
let kolSearch = '';

function renderKolDirectory() {
  kolSearch = '';
  setPage(`
    <div class="ph">
      <div class="eyebrow">KOL Directory</div>
      <h2>Key Opinion Leaders</h2>
      <p>Search and discover Key Opinion Leaders across the GSK workspace.</p>
    </div>

    <div class="kol-toolbar">
      <div class="search-big">
        <span class="ic">🔍</span>
        <input id="kol-search" placeholder="Search KOLs by name, institution, or expertise…" oninput="onKolSearch(this.value)">
        <button class="clear" onclick="clearKolSearch()">✕</button>
      </div>
      <button class="btn-secondary" onclick="showToast('Export feature coming soon')">⬇ Export</button>
      <button class="btn-primary" onclick="showToast('✓ KOL added — they will appear after approval')">＋ Add KOL</button>
    </div>

    <div class="filters">
      <span class="fl">FILTER</span>
      <span class="fchip act">All KOLs</span>
      <span class="fchip" onclick="showToast('TA filter coming soon')">Therapeutic Area</span>
      <span class="fchip" onclick="showToast('Focus filter coming soon')">Focus Area</span>
      <span class="fchip" onclick="showToast('Affiliation filter coming soon')">Affiliation</span>
      <span class="fchip" onclick="showToast('Country filter coming soon')">Country</span>
      <div class="result-mini">Sort:
        <select onchange="showToast('Sorting applied')"><option>Relevance</option><option>Influence</option><option>Match</option></select>
        · <b id="kol-count">${DATA.kols.length}</b> results
      </div>
    </div>

    <div id="kol-table-wrap">
      <table class="kol-table">
        <thead>
          <tr>
            <th>KOL</th><th>AFFILIATION</th><th>EXPERTISE & FOCUS</th>
            <th>CONGRESS ACTIVITY</th><th>INFLUENCE</th><th></th>
          </tr>
        </thead>
        <tbody id="kol-tbody"></tbody>
      </table>
    </div>

    <div class="pager">
      <button onclick="showToast('Prev page')">‹</button>
      <span class="page act">1</span>
      <span class="page" onclick="showToast('Page 2 coming soon')">2</span>
      <span class="page" onclick="showToast('Page 3 coming soon')">3</span>
      <span class="dots">…</span>
      <span class="page" onclick="showToast('Page 10 coming soon')">10</span>
      <button onclick="showToast('Next page')">›</button>
    </div>
  `);
  renderKolRows();
}

function renderKolRows() {
  const q = kolSearch.toLowerCase();
  let kols = DATA.kols;
  if (q) {
    kols = kols.filter(k =>
      k.name.toLowerCase().includes(q) ||
      k.affiliation.toLowerCase().includes(q) ||
      k.city.toLowerCase().includes(q) ||
      k.focus.some(f => f.toLowerCase().includes(q))
    );
  }
  const countEl = document.getElementById('kol-count');
  if (countEl) countEl.textContent = kols.length;

  const tbody = document.getElementById('kol-tbody');
  if (!tbody) return;
  if (kols.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty"><div class="ei">🔍</div><h3>No KOLs match your search</h3></div></td></tr>`;
    return;
  }
  tbody.innerHTML = kols.map(k => `
    <tr onclick="location.hash='#/kols/${k.id}'">
      <td>
        <div class="kol-cell">
          <div class="av">${k.initials}</div>
          <div>
            <b>${k.name}</b> ${matchChip(k.match)}<br>
            <small>${k.credentials} · ${k.city}</small>
            ${isKolCompetitiveTagged(k.id) ? '<br><span class="chip comp xs">COMPETITIVE</span>' : ''}
          </div>
        </div>
      </td>
      <td><b>${k.affiliation}</b><br><small>Gastroenterology · Tier ${k.tier}</small></td>
      <td>
        ${k.focus.slice(0,3).map(f => `<span class="chip line" style="margin:2px">${f}</span>`).join('')}
        ${k.focus.length > 3 ? `<span class="chip line" style="margin:2px">+${k.focus.length-3}</span>` : ''}
      </td>
      <td>
        ${k.activity.map(a => `<div class="cong-act">📅 <b>${a.congress}</b> · ${a.role}</div>`).join('')}
      </td>
      <td>
        <div class="influence ${influenceClass(k.influence)}"><b>${k.influence}</b><small>${k.influence >= 90 ? 'Very High' : k.influence >= 80 ? 'High' : 'Moderate'}</small></div>
        <small class="mono">${k.pubs} pubs · ${k.citations.toLocaleString()} citations</small>
      </td>
      <td>
        <button class="row-add" title="Add to meeting list" onclick="event.stopPropagation();showToast('✓ ${k.name} added to meeting list')">+</button>
        <button class="row-add" title="Toggle competitive tag" onclick="event.stopPropagation();toggleKolCompetitiveTag('${k.id}')">${isKolCompetitiveTagged(k.id) ? '◉' : '○'}</button>
      </td>
    </tr>
  `).join('');
}

function onKolSearch(val) { kolSearch = val; renderKolRows(); }
function clearKolSearch() {
  kolSearch = '';
  const el = document.getElementById('kol-search');
  if (el) el.value = '';
  renderKolRows();
}

// ==========================================================
// PAGE 7: KOL DOSSIER
// ==========================================================
function renderKolDossier(id) {
  const kol = getKol(id) || getKol('sarah-chen');
  const isCompetitive = isKolCompetitiveTagged(kol.id);

  // Publication bar chart data
  const pubYears = [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
  const pubCounts = [4,5,6,7,9,10,11,13,12,14,12,10];

  const presentations = id === 'sarah-chen' ? [
    { time:'THU 9:00', title:'Risankizumab vs ustekinumab in UC — SEQUENCE-UC', meta:'Late-breaking oral · Hall A', chip:'<span class="chip lb">LB</span>', href:'#/abstracts/lba-101' },
    { time:'FRI 11:30', title:'Treat-to-target endpoints in IBD', meta:'Symposium · Chair', chip:'<span class="chip soft">CHAIR</span>', href:'#/abstracts/sym-04' },
    { time:'SAT 10:00', title:'Histologic remission durability poster walk', meta:'Poster · Hall C', chip:'', href:'#/abstracts/p-237' }
  ] : [
    { time:'THU 14:00', title:`${kol.name} — Keynote presentation`, meta:'Scientific oral · Hall A', chip:'', href:'#/clients/gsk/congresses/ddw-2026/feed' },
    { time:'FRI 09:30', title:'Panel discussion: IBD management advances', meta:'Symposium · Panelist', chip:'<span class="chip soft">PANEL</span>', href:'#/clients/gsk/congresses/ddw-2026/feed' }
  ];

  const slots = presentations.map(p =>
    `<a class="slot" href="${p.href}">
      <div class="when"><small>${p.time.split(' ')[0]}</small><b>${p.time.split(' ')[1]}</b></div>
      <div><h4>${p.title}</h4><p>${p.meta}</p></div>
      ${p.chip}
    </a>`
  ).join('');

  setPage(`
    <a class="back-link" href="#/clients/gsk/kols">← Back to KOL Directory</a>

    <div class="kol-hd">
      <div class="kol-av">${kol.initials}</div>
      <div class="kol-meta">
        <h2>${kol.name}, ${kol.credentials}</h2>
        <div class="inst">${kol.affiliation} · ${kol.city}</div>
        <div class="tags">
          <span class="tag"><span class="dot"></span>Tier ${kol.tier} KOL</span>
          ${isCompetitive ? '<span class="tag">Competitive</span>' : ''}
          <span class="tag">Sentiment: ${kol.sentiment}</span>
          ${kol.focus.slice(0,2).map(f => `<span class="tag">${f}</span>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-secondary" onclick="toggleKolCompetitiveTag('${kol.id}')">${isCompetitive ? '◉ Competitive tagged' : '○ Tag competitive'}</button>
        <button class="addbtn" onclick="showToast('✓ ${kol.name.replace(/'/g,"\\'")} added to meeting list')">+ Add to meeting list</button>
      </div>
    </div>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">Presenting at DDW 2026 <span class="more">${presentations.length} SESSIONS</span></div>
        <div class="panel-b" style="padding:4px 16px">${slots}</div>
      </div>
      <div class="panel">
        <div class="panel-h">Field notes & history
          <button class="btn-secondary sm" onclick="openCapture('voice')">＋ New capture about this KOL</button>
        </div>
        <div class="panel-b">${renderKolCaptureNotes(kol.id)}
          <div style="margin-top:10px"><span class="chip line">★ Recommended follow-up</span></div>
        </div>
      </div>
    </div>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">Publications & influence</div>
        <div class="panel-b">
          <canvas id="pub-chart" width="500" height="180"></canvas>
          <div class="stats-row">
            <div><b>${kol.pubs}</b><small>Publications</small></div>
            <div><b>${kol.citations.toLocaleString()}</b><small>Citations</small></div>
            <div><b>${kol.hIndex}</b><small>h-index</small></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">Network</div>
        <div class="panel-b">
          ${[
            {initials:'BV', name:'Dr. Bram Vermeire', inst:'KU Leuven · 12 co-authored'},
            {initials:'WS', name:'Dr. William Sandborn', inst:'UC San Diego · 8 co-authored'},
            {initials:'BF', name:'Dr. Brian Feagan', inst:'Western University · 7 co-authored'},
            {initials:'JC', name:'Dr. Jean-Frédéric Colombel', inst:'Mount Sinai · 5 co-authored'},
            {initials:'WR', name:'Dr. Walter Reinisch', inst:'Medical U Vienna · 4 co-authored'}
          ].map(c => `<div class="co">
            <div class="av sm">${c.initials}</div>
            <span><b>${c.name}</b><small>${c.inst}</small></span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  `);

  // Publications bar chart
  requestAnimationFrame(() => {
    const canvas = document.getElementById('pub-chart');
    if (canvas && window.Chart) {
      chartInstances['pub-chart'] = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: pubYears,
          datasets: [{
            label: 'Publications',
            data: pubCounts,
            backgroundColor: '#0D9488',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#E7EDF3' } },
            x: { grid: { display: false } }
          },
          animation: { duration: 600 }
        }
      });
    }
  });
}

// ==========================================================
// PAGE 8: PRIORITIZATION SETTINGS
// ==========================================================
const sliderWeights = [25, 20, 15, 15, 10, 10, 5];
const sliderDefs = [
  { label: 'Relevance to Therapeutic Areas', desc: 'Match to your therapeutic focus' },
  { label: 'Relevance to Focus Areas', desc: 'Alignment with your focus areas' },
  { label: 'KOL Influence & Expertise', desc: 'Impact and authority of the person' },
  { label: 'Scientific / Clinical Impact', desc: 'Novelty, data quality, publication, etc.' },
  { label: 'Company / Competitor Relevance', desc: 'Involvement of key companies' },
  { label: 'Potential for Collaboration', desc: 'Opportunity for partnership or engagement' },
  { label: 'Historical Engagement', desc: 'Past interactions and relationships' }
];

function renderPrioritizationSettings() {
  const sliderRows = sliderDefs.map((s, i) =>
    `<div class="slider-row">
      <div><b>${s.label}</b><small>${s.desc}</small></div>
      <input type="range" min="0" max="100" value="${sliderWeights[i]}"
        oninput="onSliderChange(${i}, parseInt(this.value))">
      <span class="pct" id="pct-${i}">${sliderWeights[i]}%</span>
    </div>`
  ).join('');

  setPage(`
    <div class="crumb">GSK › Settings › <b>Prioritization</b></div>

    <div class="ph">
      <h2>Prioritization Settings</h2>
      <p>Customize how we prioritize people, sessions, abstracts, and other content for you.</p>
      <div class="ph-actions">
        <button class="btn-secondary" onclick="resetSliders()">↻ Reset to Defaults</button>
        <button class="btn-primary" onclick="showToast('✓ Changes saved — recalculation queued')">＋ Save Changes</button>
      </div>
    </div>

    <div class="cols-mode">
      <div class="panel">
        <div class="panel-h">Current Prioritization Mode</div>
        <div class="panel-b mode">
          <div class="mode-card">
            <div class="mc-ic">⚖</div>
            <div><b>Balanced (Default)</b><small>Balanced weighting across all priority factors</small></div>
          </div>
          <button class="btn-secondary" onclick="showToast('Mode selection coming soon')">Change Mode ▾</button>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">Priority Summary <small class="mono" style="font-weight:400;color:var(--slate-l)">Last updated: May 2, 2026</small></div>
        <div class="panel-b summary">
          <div><b>KOLs</b><span class="chip comp">High</span></div>
          <div><b>Sessions</b><span class="chip comp">High</span></div>
          <div><b>Abstracts</b><span class="chip soft">Medium</span></div>
          <div><b>Posters</b><span class="chip soft">Medium</span></div>
          <div><b>Networking</b><span class="chip comp">High</span></div>
        </div>
      </div>
    </div>

    <nav class="tabs">
      <a class="tab act">Overview</a>
      <a class="tab" onclick="showToast('KOL Priorities tab coming soon')">KOL Priorities</a>
      <a class="tab" onclick="showToast('Session Priorities tab coming soon')">Session Priorities</a>
      <a class="tab" onclick="showToast('Content Priorities tab coming soon')">Content Priorities</a>
      <a class="tab" onclick="showToast('Scoring Weights tab coming soon')">Scoring Weights</a>
      <a class="tab" onclick="showToast('Advanced Rules tab coming soon')">Advanced Rules</a>
    </nav>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">Scoring Factors & Weights</div>
        <div class="panel-b">
          <p class="muted" style="margin-bottom:12px;font-size:12px">Adjust the importance of each factor in the prioritization engine.</p>
          ${sliderRows}
          <div class="slider-total">
            <b>Total weight</b>
            <span class="total-pct" id="total-pct">100%</span>
          </div>
          <div class="note-box">Weights determine how much influence each factor has on the overall priority score. Adjusting one slider proportionally rebalances the others.</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Your Priority Preferences</div>
        <div class="panel-b">
          <div class="pref-grp">
            <label>Top Therapeutic Areas</label>
            <div class="chips-edit">
              <span class="chip line">Gastroenterology <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">Hepatology <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">Immunology <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">Infectious Disease <span class="x" onclick="showToast('Removed')">✕</span></span>
              <button class="chip-add" onclick="showToast('Add TA form coming soon')">+ Add</button>
            </div>
          </div>
          <div class="pref-grp">
            <label>Focus Areas</label>
            <div class="chips-edit">
              <span class="chip line">IBD <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">NASH <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">Microbiome <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">Fibrosis <span class="x" onclick="showToast('Removed')">✕</span></span>
              <span class="chip line">IL-23 Pathway <span class="x" onclick="showToast('Removed')">✕</span></span>
              <button class="chip-add" onclick="showToast('Add focus area form coming soon')">+ Add</button>
            </div>
          </div>
          <div class="pref-grp">
            <label>Key Topics / Keywords</label>
            <div class="chips-edit">
              <span class="chip line">IL-23 Inhibitors</span>
              <span class="chip line">JAK Inhibitors</span>
              <span class="chip line">Biomarkers</span>
              <span class="chip line">Real World Evidence</span>
              <span class="chip line">Combination Therapy</span>
              <span class="chip line">Treatment Paradigms</span>
              <span class="chip line">Disease Remission <span class="x" onclick="showToast('Removed')">✕</span></span>
              <button class="chip-add" onclick="showToast('Add keyword form coming soon')">+ Add Keyword</button>
            </div>
          </div>
          <div class="pref-grp">
            <label>Companies / Competitors to Monitor</label>
            <div class="chips-edit">
              <span class="chip line">AbbVie</span>
              <span class="chip line">Janssen</span>
              <span class="chip line">Bristol Myers Squibb</span>
              <span class="chip line">Eli Lilly</span>
              <span class="chip line">Merck</span>
              <button class="chip-add" onclick="showToast('Add company form coming soon')">+ Add</button>
            </div>
          </div>
          <div class="pref-grp">
            <label>Content Types to Prioritize</label>
            <div class="checks">
              <label><input type="checkbox" checked> Oral Presentations</label>
              <label><input type="checkbox" checked> Late-Breaking Abstracts</label>
              <label><input type="checkbox" checked> Posters</label>
              <label><input type="checkbox" checked> Industry Symposia</label>
              <label><input type="checkbox" checked> Scientific Abstracts</label>
            </div>
          </div>
          <button class="clear-pref" onclick="showToast('Preferences cleared')">Clear Preferences</button>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h">Priority Impact Preview
        <button class="btn-primary sm" onclick="runRecalculate()">▶ Run Full Recalculate</button>
      </div>
      <div class="panel-b">
        <p class="muted" style="font-size:12px;margin-bottom:10px">See how these settings affect current priorities.</p>
        <div class="impact-grid">
          <div class="impact"><div class="lab">KOLs</div><b id="imp-kols">623</b><span class="chip comp">High Priority</span></div>
          <div class="impact"><div class="lab">Sessions</div><b id="imp-sessions">87</b><span class="chip comp">High Priority</span></div>
          <div class="impact"><div class="lab">Abstracts</div><b id="imp-abstracts">2,156</b><span class="chip soft">Medium Priority</span></div>
          <div class="impact"><div class="lab">Posters</div><b id="imp-posters">1,342</b><span class="chip soft">Medium Priority</span></div>
          <div class="impact"><div class="lab">Networking</div><b id="imp-net">48</b><span class="chip comp">High Priority</span></div>
        </div>
        <div class="recalc-meta">Last calculated: May 2, 2026 10:30 AM</div>
      </div>
    </div>
  `);
}

function onSliderChange(idx, newVal) {
  const weights = [...sliderWeights];
  const oldVal = weights[idx];
  const diff = newVal - oldVal;
  weights[idx] = newVal;

  // Proportionally rebalance others
  const otherTotal = weights.reduce((s, v, i) => i !== idx ? s + v : s, 0);
  if (otherTotal > 0 && diff !== 0) {
    for (let i = 0; i < weights.length; i++) {
      if (i !== idx) {
        weights[i] = Math.max(0, Math.round(weights[i] - diff * (weights[i] / otherTotal)));
      }
    }
  }

  // Snap to 100
  const sum = weights.reduce((s, v) => s + v, 0);
  if (sum !== 100) {
    const biggest = weights.reduce((mi, v, i) => v > weights[mi] && i !== idx ? i : mi, idx === 0 ? 1 : 0);
    weights[biggest] += (100 - sum);
  }

  // Update DOM
  weights.forEach((w, i) => {
    sliderWeights[i] = w;
    const pctEl = document.getElementById(`pct-${i}`);
    if (pctEl) pctEl.textContent = w + '%';
    const inputs = document.querySelectorAll('.slider-row input[type=range]');
    if (inputs[i]) inputs[i].value = w;
  });

  const total = weights.reduce((s, v) => s + v, 0);
  const totalEl = document.getElementById('total-pct');
  if (totalEl) {
    totalEl.textContent = total + '%';
    totalEl.style.color = total === 100 ? 'var(--teal)' : 'var(--amber)';
  }

  // Update impact preview with fake variation
  updateImpactPreview(newVal);
}

function updateImpactPreview(weight) {
  const base = [623, 87, 2156, 1342, 48];
  const variation = Math.floor((weight - 50) * 0.5);
  const ids = ['imp-kols','imp-sessions','imp-abstracts','imp-posters','imp-net'];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = Math.max(10, base[i] + variation * (i+1)).toLocaleString();
  });
}

function resetSliders() {
  const defaults = [25, 20, 15, 15, 10, 10, 5];
  defaults.forEach((v, i) => {
    sliderWeights[i] = v;
    const pctEl = document.getElementById(`pct-${i}`);
    if (pctEl) pctEl.textContent = v + '%';
    const inputs = document.querySelectorAll('.slider-row input[type=range]');
    if (inputs[i]) inputs[i].value = v;
  });
  const totalEl = document.getElementById('total-pct');
  if (totalEl) { totalEl.textContent = '100%'; totalEl.style.color = 'var(--teal)'; }
  showToast('✓ Reset to default weights');
}

function runRecalculate() {
  showToast('⚙ Recalculating priorities across 4,789 abstracts…');
  setTimeout(() => showToast('✓ Recalculation complete — 312 abstracts re-ranked'), 2000);
}

// ==========================================================
// PAGE 9: USER PROFILE
// ==========================================================
function renderProfile() {
  setPage(`
    <div class="crumb">GSK › Team › <b>Sarah Phillips</b></div>

    <div class="ph"><h2>User Profile</h2></div>

    <nav class="tabs" style="margin-bottom:20px">
      <a class="tab act">Profile</a>
      <a class="tab" onclick="showToast('Preferences tab coming soon')">Preferences</a>
      <a class="tab" onclick="showToast('Notifications tab coming soon')">Notifications</a>
      <a class="tab" onclick="showToast('Security & Access tab coming soon')">Security & Access</a>
      <a class="tab" onclick="showToast('Activity History tab coming soon')">Activity History</a>
      <button class="btn-primary" style="margin-left:auto" onclick="showToast('✓ Profile saved')">✎ Edit Profile</button>
    </nav>

    <div class="profile-grid">
      <div class="panel">
        <div class="panel-h">Personal Information</div>
        <div class="panel-b" style="text-align:center">
          <div class="avatar-lg">SP</div>
          <div class="kv"><span>Full Name</span><b>Sarah Phillips</b></div>
          <div class="kv"><span>Email</span><b>sarah.phillips@medcomagency.com</b></div>
          <div class="kv"><span>Phone</span><b>+1 (312) 555-0189</b></div>
          <div class="kv"><span>Time Zone</span><b>Eastern Time (ET)</b></div>
          <div class="kv"><span>Location</span><b>Chicago, IL, USA</b></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Role & Organization</div>
        <div class="panel-b">
          <div class="kv"><span>Job Title</span><b>Director, Medical Affairs</b></div>
          <div class="kv"><span>Department</span><b>Medical Affairs</b></div>
          <div class="kv"><span>Organization</span><b>MedCom Agency</b></div>
          <div class="kv"><span>Workspace Role</span><b><span class="chip comp">Admin</span></b></div>
          <div class="kv"><span>Default Workspace</span><b><span class="ctag xs">GSK</span> GSK <span class="chev">▾</span></b></div>
        </div>
      </div>

      <div class="panel" style="grid-column:span 2">
        <div class="panel-h">Your strategic interests <small style="font-weight:400;color:var(--slate-l)">(personal overlay on top of the GSK workspace context)</small></div>
        <div class="panel-b cols-2" style="gap:24px">
          <div>
            <div class="pref-grp">
              <label>Therapeutic Areas</label>
              <div class="chips-edit">
                <span class="chip line">Gastroenterology</span>
                <span class="chip line">Hepatology</span>
                <span class="chip line">Infectious Disease</span>
                <span class="chip line">Immunology</span>
                <button class="chip-add" onclick="showToast('Add TA coming soon')">+ Add</button>
              </div>
            </div>
            <div class="pref-grp">
              <label>Focus Areas</label>
              <div class="chips-edit">
                <span class="chip line">IBD</span>
                <span class="chip line">Liver Disease</span>
                <span class="chip line">NASH</span>
                <span class="chip line">Microbiome</span>
                <button class="chip-add" onclick="showToast('Add focus area coming soon')">+ Add</button>
              </div>
            </div>
            <div class="pref-grp">
              <label>Keywords & Topics</label>
              <div class="chips-edit">
                <span class="chip line">IL-23 Inhibitors</span>
                <span class="chip line">Fibrosis</span>
                <span class="chip line">Biomarkers</span>
                <span class="chip line">Real World Evidence</span>
                <span class="chip line">Treatment Paradigms</span>
                <span class="chip line">Combination Therapy</span>
                <button class="chip-add" onclick="showToast('Add keyword coming soon')">+ Add keyword</button>
              </div>
            </div>
          </div>
          <div>
            <div class="pref-grp">
              <label>Molecules of Interest</label>
              <div class="chips-edit">
                <span class="chip line">Trelegy (IL-23)</span>
                <span class="chip line">Depemokimab</span>
                <span class="chip line">Bimzelx</span>
                <span class="chip line">Risankizumab</span>
                <button class="chip-add" onclick="showToast('Add molecule coming soon')">+ Add</button>
              </div>
            </div>
            <div class="pref-grp">
              <label>Competitors of Interest</label>
              <div class="chips-edit">
                <span class="chip line">AbbVie</span>
                <span class="chip line">Janssen</span>
                <span class="chip line">Eli Lilly</span>
                <span class="chip line">Merck</span>
                <span class="chip line">Bristol Myers Squibb</span>
                <button class="chip-add" onclick="showToast('Add competitor coming soon')">+ Add</button>
              </div>
            </div>
            <div class="pref-grp">
              <label>KOLs & Organizations of Interest</label>
              <div class="avatars-row">
                <div class="av sm">SC</div><div class="av sm">SG</div><div class="av sm">BV</div>
                <div class="av sm">WS</div><div class="av sm">BF</div><span class="more-av">+12</span>
              </div>
              <label style="margin-top:10px">Key Organizations</label>
              <div class="chips-edit">
                <span class="chip line">AGA</span><span class="chip line">AASLD</span>
                <span class="chip line">UEG</span><span class="chip line">DDW</span>
                <span class="chip line">ECCO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Professional Bio</div>
        <div class="panel-b">
          <p style="font-size:13.5px;color:var(--ink);line-height:1.6">Medical affairs professional with 12+ years of experience in gastroenterology and immunology. Focused on scientific exchange, medical education, and building relationships with thought leaders to advance patient care.</p>
          <button class="link" onclick="showToast('Bio editor coming soon')" style="margin-top:8px">Edit Bio</button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Experience & Expertise</div>
        <div class="panel-b">
          <div class="kv"><span>Years in Industry</span><b>12+ years</b></div>
          <div class="kv"><span>Primary Expertise</span><b>Medical Affairs, Scientific Communications, KOL Engagement</b></div>
          <div class="kv"><span>Congress Experience</span><b>Attended 18 congresses in last 3 years</b></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Communication & Collaboration</div>
        <div class="panel-b">
          <div class="kv"><span>Preferred channels</span><b>Email · Slack · In-app</b></div>
          <div class="kv"><span>Meeting availability</span><b>Thu-Fri 8:00-17:00 local congress time</b></div>
          <div class="kv"><span>Digest cadence</span><b>Daily during congress week</b></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">Profile Completion <span class="chip own">92% Complete</span></div>
        <div class="panel-b">
          <div class="prog-bar"><i style="width:92%"></i></div>
          <ul class="checklist">
            <li class="done">✓ Personal Information</li>
            <li class="done">✓ Role & Organization</li>
            <li class="done">✓ Areas of Interest</li>
            <li class="done">✓ Preferences</li>
            <li>○ Security & Access</li>
          </ul>
        </div>
      </div>
    </div>
  `);
}

// ==========================================================
// PAGE 10: CONGRESS CREATION
// ==========================================================
let wizardStep = 1;

function renderCongressCreation() {
  wizardStep = 1;
  setPage(`
    <div class="modal-shell">
      <div class="modal">
        <div class="modal-hd">
          <h2>Create New Congress</h2>
          <div class="steps">
            <span class="step act" id="step-ind-1">1 · Basics</span>
            <span class="step" id="step-ind-2">2 · Ingest Sources</span>
            <span class="step" id="step-ind-3">3 · Confirm</span>
          </div>
          <button class="close" onclick="location.hash='#/clients/gsk'">✕</button>
        </div>

        <!-- STEP 1 -->
        <div class="modal-body step-1" id="wiz-step-1">
          <div class="form-grid">
            <label class="span-2"><span>Congress name</span><input value="Digestive Disease Week 2026"></label>
            <label><span>Acronym</span><input value="DDW"></label>
            <label><span>Year</span><input type="number" value="2026"></label>
            <label><span>Start date</span><input type="date" value="2026-05-03"></label>
            <label><span>End date</span><input type="date" value="2026-05-06"></label>
            <label><span>City</span><input value="San Diego, CA"></label>
            <label><span>Venue</span><input value="San Diego Convention Center"></label>
            <label class="span-2"><span>Primary therapeutic area</span>
              <select><option>Gastroenterology</option><option>Oncology</option><option>Respiratory</option><option>Immunology</option></select>
            </label>
            <label class="span-2"><span>Website URL</span><input value="https://ddw.org"></label>
          </div>
        </div>

        <!-- STEP 2 -->
        <div class="modal-body step-2" id="wiz-step-2" style="display:none">
          <div class="upload-zone">
            <div class="uz-ic">⬆</div>
            <b>Drag & drop or click to upload</b>
            <small>PDFs, abstract books, screenshots, slide decks</small>
          </div>
          <div class="add-url">
            <input placeholder="…or paste a congress URL">
            <button class="btn-secondary" onclick="showToast('URL queued for ingestion')">Add URL</button>
          </div>
          <div class="connectors">
            <button class="conn" onclick="showToast('✓ ClinicalTrials.gov connected — will pull Gastroenterology trials')">📋 Connect ClinicalTrials.gov (by TA)</button>
            <button class="conn" onclick="showToast('✓ OpenAlex connected — will pull related authors')">📚 Pull from OpenAlex (related authors)</button>
          </div>
          <div class="sources-added">
            <div class="src-added">📄 DDW_2026_Abstract_Book.pdf <span class="chip soft">PDF · 47 abstracts</span> <span class="src-status">Queued</span></div>
            <div class="src-added">🔗 https://ddw.org/program <span class="chip soft">URL</span> <span class="src-status">Queued</span></div>
            <div class="src-added">📋 ClinicalTrials.gov · Gastroenterology <span class="chip soft">API</span> <span class="src-status">Queued</span></div>
          </div>
        </div>

        <!-- STEP 3 -->
        <div class="modal-body step-3" id="wiz-step-3" style="display:none">
          <div class="confirm-card">
            <h3>Digestive Disease Week 2026</h3>
            <p>May 3–6, 2026 · San Diego, CA · Gastroenterology</p>
            <ul>
              <li>3 ingest sources attached (PDF, URL, ClinicalTrials.gov)</li>
              <li>Will create the congress workspace under <b>GSK</b></li>
              <li>Abstracts and entities will be processed in the background</li>
              <li>Estimated processing time: ~8 minutes for 4,789 abstracts</li>
            </ul>
          </div>
          <p style="font-size:12px;color:var(--slate-l);margin-top:12px">
            ⚠ 12 records will be routed to the review queue (low extraction confidence)
          </p>
        </div>

        <div class="modal-foot">
          <button class="btn-secondary" onclick="location.hash='#/clients/gsk'">Cancel</button>
          <div class="modal-actions">
            <button class="btn-secondary" id="wiz-back" style="display:none" onclick="wizBack()">← Back</button>
            <button class="btn-primary" id="wiz-next" onclick="wizNext()">Next →</button>
            <button class="btn-primary" id="wiz-create" style="display:none" onclick="startIngestion()">✓ Create Congress & Start Ingestion</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

function wizNext() {
  if (wizardStep < 3) {
    wizardStep++;
    updateWizard();
  }
}
function wizBack() {
  if (wizardStep > 1) {
    wizardStep--;
    updateWizard();
  }
}

function updateWizard() {
  [1,2,3].forEach(i => {
    const step = document.getElementById(`wiz-step-${i}`);
    const ind = document.getElementById(`step-ind-${i}`);
    if (step) step.style.display = i === wizardStep ? 'block' : 'none';
    if (ind) ind.classList.toggle('act', i === wizardStep);
  });
  const back = document.getElementById('wiz-back');
  const next = document.getElementById('wiz-next');
  const create = document.getElementById('wiz-create');
  if (back) back.style.display = wizardStep > 1 ? '' : 'none';
  if (next) next.style.display = wizardStep < 3 ? '' : 'none';
  if (create) create.style.display = wizardStep === 3 ? '' : 'none';
}

function startIngestion() {
  // Replace wizard with ingestion progress
  document.getElementById('page').innerHTML = `
    <div class="ingest-shell">
      <div class="ingest-card">
        <span class="ingest-spinner">⚙</span>
        <h2>Ingesting DDW 2026…</h2>
        <p>Processing documents, extracting abstracts, and resolving entities.</p>
        <div class="prog-grp">
          <div class="prog-row">
            <b>Documents processed</b>
            <div class="bar"><i id="prog-docs" style="width:0%;background:var(--teal)"></i></div>
            <span class="mono" id="prog-docs-n">0 / 47</span>
          </div>
          <div class="prog-row">
            <b>Abstracts extracted</b>
            <div class="bar"><i id="prog-abs" style="width:0%;background:var(--teal)"></i></div>
            <span class="mono" id="prog-abs-n">0</span>
          </div>
          <div class="prog-row">
            <b>Entities resolved</b>
            <div class="bar"><i id="prog-ent" style="width:0%;background:var(--teal)"></i></div>
            <span class="mono" id="prog-ent-n">0 KOLs · 0 drugs</span>
          </div>
          <div class="prog-row warn">
            <b>Review queue</b>
            <div class="bar"><i id="prog-rev" style="width:0%;background:var(--amber)"></i></div>
            <span class="mono" id="prog-rev-n">0 records</span>
          </div>
        </div>
        <p class="ingest-note">You can leave this page — ingestion continues in the background. We'll notify you when complete.</p>
      </div>
    </div>
  `;
  runIngestionAnimation();
}

function runIngestionAnimation() {
  let tick = 0;
  const total = 28; // ticks
  const interval = setInterval(() => {
    tick++;
    const pct = tick / total;

    const docsN = Math.round(47 * Math.min(pct * 1.2, 1));
    const absN = Math.round(4789 * Math.min(pct * 1.1, 1));
    const kolsN = Math.round(623 * Math.min(pct, 1));
    const drugsN = Math.round(89 * Math.min(pct, 1));
    const revN = Math.round(12 * Math.min(pct, 1));

    const set = (id, pct, text) => {
      const bar = document.getElementById(id);
      const label = document.getElementById(id + '-n');
      if (bar) bar.style.width = Math.min(pct * 100, 100) + '%';
      if (label) label.textContent = text;
    };

    set('prog-docs', Math.min(pct * 1.2, 1), `${docsN} / 47`);
    set('prog-abs', Math.min(pct * 1.1, 1), docsN > 0 ? absN.toLocaleString() : '0');
    set('prog-ent', pct, `${kolsN} KOLs · ${drugsN} drugs`);
    set('prog-rev', Math.min(pct * 0.6, 1), `${revN} records`);

    if (tick >= total) {
      clearInterval(interval);
      setTimeout(() => {
        showToast('✓ DDW 2026 ingested — 4,789 abstracts ready');
        location.hash = '#/clients/gsk/congresses/ddw-2026';
      }, 800);
    }
  }, 320);
}

// ==========================================================
// V2: CLIENT CREATION + STRATEGIC DRAWERS
// ==========================================================
function openCreateClientModal() {
  const id = 'create-client-modal';
  if (document.getElementById(id)) return;
  const m = document.createElement('div');
  m.id = id;
  m.className = 'overlay-modal';
  m.innerHTML = `
    <div class="modal">
      <div class="modal-hd"><h2>Create New Client Workspace</h2><button class="close" onclick="closeModal()">✕</button></div>
      <div class="modal-body">
        <div class="form-grid">
          <label><span>Client name *</span><input id="cc-name" placeholder="e.g. GSK" oninput="validateCreateClient()"></label>
          <label><span>Short name *</span><input id="cc-abbr" placeholder="e.g. GSK" oninput="validateCreateClient()"></label>
          <label class="span-2"><span>Primary therapeutic areas *</span><input id="cc-ta" placeholder="Comma-separated: Gastroenterology, Immunology" oninput="validateCreateClient()"></label>
          <label class="span-2"><span>Description</span><textarea rows="2" placeholder="Brief notes about this client engagement..."></textarea></label>
        </div>
        <small id="cc-error" class="muted" style="display:block;margin-top:8px"></small>
      </div>
      <div class="modal-foot"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-primary" id="cc-submit" disabled onclick="createClientWorkspace()">Create Workspace</button></div>
    </div>`;
  document.body.appendChild(m);
}

function closeModal() {
  document.getElementById('create-client-modal')?.remove();
  document.getElementById('export-modal')?.remove();
}

function validateCreateClient() {
  const name = document.getElementById('cc-name')?.value.trim() || '';
  const abbr = document.getElementById('cc-abbr')?.value.trim() || '';
  const tas = document.getElementById('cc-ta')?.value.split(',').map(s => s.trim()).filter(Boolean) || [];
  const existing = DATA.clients.find(c => c.name.toLowerCase() === name.toLowerCase());
  const error = document.getElementById('cc-error');
  const submit = document.getElementById('cc-submit');
  if (existing) {
    error.innerHTML = `This client workspace already exists. <a href="#/clients/${existing.id}" onclick="closeModal()">Open existing workspace →</a>`;
    submit.disabled = true;
    return;
  }
  error.textContent = '';
  submit.disabled = !(name && abbr && tas.length > 0);
}

function createClientWorkspace() {
  const name = document.getElementById('cc-name')?.value.trim() || '';
  const abbr = (document.getElementById('cc-abbr')?.value.trim() || '').toUpperCase().slice(0, 4);
  const tas = document.getElementById('cc-ta')?.value.split(',').map(s => s.trim()).filter(Boolean) || [];
  if (!name || !abbr || tas.length === 0) return;
  const id = slugify(name);
  if (DATA.clients.some(c => c.id === id)) {
    showToast('Client already exists.');
    return;
  }
  DATA.clients.push({ id, name, abbr, congresses: 0, kols: 0, insights: 0, reports: 0, prog: 5, tas: [] });
  saveSetup(id, { ...DEFAULT_SETUP, tas: [] });
  closeModal();
  location.hash = `#/clients/${id}`;
}

function openDrawer(clientId, drawerId) {
  APP_STATE.activeClientId = clientId;
  APP_STATE.openDrawer = drawerId;
  const setup = getSetup(clientId);
  document.getElementById('workspace-drawer-overlay')?.remove();
  const ov = document.createElement('div');
  ov.id = 'workspace-drawer-overlay';
  ov.className = 'drawer-overlay-shell';
  ov.innerHTML = `
    <div class="drawer-overlay" onclick="closeDrawer()"></div>
    <aside class="drawer">
      <div class="drawer-hd"><div><h3>${drawerTitle(drawerId)}</h3><small class="muted">${drawerHint(drawerId)}</small></div><button class="close" onclick="closeDrawer()">✕</button></div>
      <div class="drawer-body">${drawerBody(drawerId, setup)}</div>
      <div class="drawer-foot"><button class="btn-secondary" onclick="closeDrawer()">Cancel</button><button class="btn-primary" onclick="saveDrawer('${clientId}','${drawerId}')">Save & Continue</button></div>
    </aside>`;
  document.body.appendChild(ov);
}

function closeDrawer() {
  APP_STATE.openDrawer = null;
  document.getElementById('workspace-drawer-overlay')?.remove();
}

function drawerTitle(id) {
  return ({
    priorities: 'Strategic Priorities',
    'therapeutic-areas': 'Therapeutic Areas & Focus Areas',
    pipeline: 'Pipeline Assets',
    competitors: 'Competitors',
    kols: 'Priority KOLs',
    keywords: 'Strategic Keywords & Topics'
  })[id] || 'Configure';
}
function drawerHint(id) {
  return ({
    priorities: '3–5 high-level priorities that shape what matters for this client.',
    'therapeutic-areas': 'The TAs and sub-topics this client cares about.',
    pipeline: 'Own-company drug list used for flagging in Intel Feed.',
    competitors: 'Competitor companies and drugs tracked for this workspace.',
    kols: 'Add your priority KOLs for meeting prep.',
    keywords: 'Keywords that boost relevance and topic matching.'
  })[id] || '';
}
function drawerBody(id, setup) {
  if (id === 'priorities') return `<textarea id="dr-priorities" rows="8" placeholder="One priority per line">${(setup.priorities || []).map(p => p.text).join('\n')}</textarea>`;
  if (id === 'therapeutic-areas') return `<label>Therapeutic Areas (comma-separated)<input id="dr-tas" value="${(setup.tas || []).join(', ')}"></label><label style="margin-top:10px;display:block">Focus Areas (comma-separated)<input id="dr-focuses" value="${(setup.focuses || []).join(', ')}"></label>`;
  if (id === 'pipeline') return `<textarea id="dr-pipeline" rows="6" placeholder="Drug names, comma-separated">${(setup.pipeline || []).map(p => p.name).join(', ')}</textarea>`;
  if (id === 'competitors') return `<label>Competitor companies<input id="dr-companies" value="${(setup.competitorCompanies || []).join(', ')}"></label><label style="margin-top:10px;display:block">Competitor drugs<input id="dr-compdrugs" value="${(setup.competitorDrugs || []).join(', ')}"></label>`;
  if (id === 'kols') return `<textarea id="dr-kols" rows="6" placeholder="KOL ids or names, comma-separated">${(setup.priorityKols || []).join(', ')}</textarea>`;
  return `<textarea id="dr-keywords" rows="6" placeholder="Keyword list, comma-separated">${(setup.keywords || []).join(', ')}</textarea>`;
}

function saveDrawer(clientId, drawerId) {
  const setup = getSetup(clientId);
  if (drawerId === 'priorities') {
    const items = (document.getElementById('dr-priorities')?.value || '').split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length === 0) { showToast('At least one strategic priority is required.'); return; }
    setup.priorities = items.map(text => ({ text, level: 'high' }));
  } else if (drawerId === 'therapeutic-areas') {
    const tas = (document.getElementById('dr-tas')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    if (tas.length === 0) { showToast('At least one therapeutic area is required.'); return; }
    setup.tas = tas;
    setup.focuses = (document.getElementById('dr-focuses')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  } else if (drawerId === 'pipeline') {
    setup.pipeline = (document.getElementById('dr-pipeline')?.value || '').split(',').map(s => s.trim()).filter(Boolean).map(name => ({ name, status: 'pipeline', indication: '' }));
  } else if (drawerId === 'competitors') {
    setup.competitorCompanies = (document.getElementById('dr-companies')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    setup.competitorDrugs = (document.getElementById('dr-compdrugs')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  } else if (drawerId === 'kols') {
    setup.priorityKols = (document.getElementById('dr-kols')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  } else if (drawerId === 'keywords') {
    setup.keywords = (document.getElementById('dr-keywords')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
  }
  saveSetup(clientId, setup);
  closeDrawer();
  showToast('Saved.');
  renderClientWorkspace(clientId);
}

function openExportModal(type) {
  closeModal();
  const m = document.createElement('div');
  m.id = 'export-modal';
  m.className = 'overlay-modal';
  m.innerHTML = `<div class="modal">
      <div class="modal-hd"><h2>Export ${type === 'topic-brief' ? 'Topic Brief' : 'Briefing Pack'}</h2><button class="close" onclick="closeModal()">✕</button></div>
      <div class="modal-body">
        <div class="checks">
          <label><input type="checkbox" checked> Include priority rationale</label>
          <label><input type="checkbox" checked> Include KOL dossiers</label>
          <label><input type="checkbox" checked> Include session schedule</label>
          <label><input type="checkbox"> Include raw abstract text appendix</label>
        </div>
      </div>
      <div class="modal-foot"><button class="btn-secondary" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="confirmExport('${type}')">Export</button></div>
    </div>`;
  document.body.appendChild(m);
}

function confirmExport(type) {
  closeModal();
  showToast(`✓ ${type === 'topic-brief' ? 'Topic brief' : 'Briefing pack'} queued for export`);
}

// ==========================================================
// V2: EXTRA PAGES
// ==========================================================
function renderAskAnything(query) {
  const q = query || 'Which KOLs discussed fibrosis regression as a regulatory endpoint?';
  const capSources = DATA.captures
    .filter(c => c.congress === APP_STATE.activeCongressId && (c.visibility === 'shared' || c.author === CURRENT_USER_ID))
    .filter(c => (c.transcript || c.text || '').toLowerCase().includes('fibrosis') || (c.transcript || c.text || '').toLowerCase().includes('transmural') || c.id === 'v-217')
    .slice(0, 2);
  const captureDocs = capSources.map(c => {
    const icon = c.type === 'voice' ? 'VOX' : c.type === 'photo' ? 'IMG' : 'NOTE';
    const cls = c.type === 'voice' ? 'ppt' : c.type === 'photo' ? 'xls' : 'pdf';
    const title = c.capture_type || 'Onsite capture';
    const sub = `${captureTypeIcon(c.type)} ${formatTimeAgo(c.timestamp)} · DDW 2026`;
    return `<a class="doc src-card" href="#/captures/${c.id}"><div class="dic ${cls}">${icon}</div><div><b>${title}</b><small>${sub}</small></div></a>`;
  }).join('');
  setPage(`<div class="ph"><div class="eyebrow">Synthesis · Retrieval</div><h2>Ask anything</h2><p>Conversational retrieval grounded in DDW 2026 intelligence.</p></div>
    <div class="cols"><div class="panel"><div class="panel-b"><div class="search-big"><span class="ic">✦</span><input id="ask-query" value="${q.replace(/"/g, '&quot;')}" onkeydown="if(event.key==='Enter'){runAsk()}"><button class="btn-primary sm" onclick="runAsk()">Ask →</button></div>
      <div class="feed-chips" style="margin-top:8px"><span class="chip soft" onclick="askPreset('Which KOLs discussed fibrosis regression?')">Which KOLs discussed fibrosis regression?</span><span class="chip soft" onclick="askPreset('What changed since DDW 2025?')">What changed since DDW 2025?</span><span class="chip soft" onclick="askPreset('Show all captures on IL-23 inhibitors')">Show all captures on IL-23 inhibitors</span></div>
      <div class="note-box" style="margin-top:10px"><b>Q:</b> <span id="ask-q">${q}</span></div><div id="ask-answer" style="margin-top:10px;line-height:1.6;color:var(--ink)"></div>
      <div class="sec-title" style="margin-top:14px">Sources <span class="ln"></span></div>
      <div class="docs">${captureDocs}<a class="doc" href="#/abstracts/plen-12"><div class="dic pdf">ABS</div><div><b>ESSENCE plenary abstract</b><small>NCT05012254 · DDW 2026</small></div></a><a class="doc" href="#/kols/sarah-chen"><div class="dic ppt">KOL</div><div><b>Dr. Sarah Chen dossier</b><small>KOL profile + captures</small></div></a></div>
    </div></div>
    <div class="panel"><div class="panel-h">History</div><div class="panel-b"><div class="tl"><div class="tl-i"><b>Fibrosis regression endpoint</b><p>just now · 3 sources</p></div><div class="tl-i"><b>JAK safety RWD signals</b><p>1h ago · 7 sources</p></div><div class="tl-i"><b>IL-23 head-to-head status</b><p>3h ago · 4 sources</p></div><div class="tl-i"><b>Competitor symposium agenda</b><p>Yesterday · 12 sources</p></div></div></div></div></div>`);
  streamAskAnswer();
}

function runAsk() {
  const q = document.getElementById('ask-query')?.value || '';
  location.hash = `#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/ask?q=${encodeURIComponent(q)}`;
}

function askPreset(text) {
  const el = document.getElementById('ask-query');
  if (!el) return;
  el.value = text;
  runAsk();
}

function streamAskAnswer() {
  const el = document.getElementById('ask-answer');
  if (!el) return;
  const answer = "Three KOLs on your list addressed fibrosis regression as a potential regulatory endpoint at DDW 2026. Dr. Loomba emphasized biopsy-confirmed regression with semaglutide and the role of NITs in operationalizing endpoint readiness. Dr. Ratziu reinforced that FIB-4 cut-off standardization remains the key blocker before broad regulatory confidence. Dr. Sarah Chen drew a parallel to treat-to-target endpoint evolution in IBD, suggesting fibrosis regression is nearing an analogous acceptance curve. Net sentiment is cautiously positive, but stakeholders still want prospective head-to-head and longer durability data before definitive positioning.";
  el.textContent = '';
  const words = answer.split(' ');
  let idx = 0;
  const timer = setInterval(() => {
    el.textContent += (idx === 0 ? '' : ' ') + words[idx];
    idx++;
    if (idx >= words.length) clearInterval(timer);
  }, 18);
}

function renderMeetingList() {
  const kols = DATA.kols.slice(0, 8);
  const sessions = DATA.abstracts.slice(0, 8);
  setPage(`<div class="crumb">Client Workspaces › ${getClient(APP_STATE.activeClientId).name} › DDW 2026 › <b>Meeting List</b></div>
    <div class="ph"><div class="eyebrow">Pre-congress deliverable</div><h2>Your DDW 2026 meeting list</h2><p>Tagged KOLs and prioritized sessions.</p><div class="ph-actions"><button class="btn-secondary" onclick="openExportModal('meeting-list')">⬇ Export briefing pack</button><button class="btn-secondary" onclick="showToast('Print dialog coming soon')">🖨 Print</button></div></div>
    <nav class="tabs"><a class="tab act" onclick="toggleMeetingTab('kols')">KOLs (${kols.length})</a><a class="tab" onclick="toggleMeetingTab('sessions')">Sessions & Abstracts (${sessions.length})</a></nav>
    <div id="meeting-kols" class="cols-2">${kols.map(k => `<div class="panel"><div class="panel-b"><div class="kol-cell"><div class="av lg">${k.initials}</div><div><b>${k.name}</b><div class="meta">${k.affiliation}</div><div class="feed-chips"><span class="chip own xs">Tier ${k.tier}</span><span class="chip soft xs">${k.sentiment}</span></div></div></div><div class="note-box" style="margin-top:8px">Sessions at DDW 2026: ${k.activity.length + 1}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn-primary sm" onclick="showToast('Scheduling flow coming soon')">📅 Schedule meeting</button><a class="btn-secondary sm" href="#/kols/${k.id}">Open dossier →</a></div></div></div>`).join('')}</div>
    <div id="meeting-sessions" class="panel" style="display:none"><div class="panel-b">${sessions.map((a, i) => `<a class="slot ${i===2 ? 'warn-slot' : ''}" href="#/abstracts/${a.id}"><div class="when"><small>${a.date?.split(' ')[0] || 'THU'}</small><b>${(a.schedule || '').split('·')[0].trim()}</b></div><div><h4>${a.title}</h4><p>${a.schedule}</p>${i===2 ? '<small style="color:var(--amber)">Conflict: overlaps with another saved session</small>' : ''}</div></a>`).join('')}</div></div>`);
}

function toggleMeetingTab(which) {
  const k = document.getElementById('meeting-kols');
  const s = document.getElementById('meeting-sessions');
  if (!k || !s) return;
  k.style.display = which === 'kols' ? '' : 'none';
  s.style.display = which === 'sessions' ? '' : 'none';
  document.querySelectorAll('.tabs .tab').forEach((t, idx) => t.classList.toggle('act', (which === 'kols' && idx === 0) || (which === 'sessions' && idx === 1)));
}

function renderTopicLandscape(topicSlug) {
  const topicName = decodeURIComponent(topicSlug || 'IL-23');
  const topicAbstracts = DATA.abstracts.filter(a => (a.topic || '').toLowerCase().includes(topicName.toLowerCase()) || (a.topics || []).join(' ').toLowerCase().includes(topicName.toLowerCase())).slice(0,5);
  setPage(`<a class="back-link" href="#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}">← Back to congress</a>
    <div class="ph"><div class="eyebrow">Topic landscape · DDW 2026</div><h2>${topicName} <span class="chip comp">COMPETITIVE</span></h2><p>Per-topic pre-congress brief.</p><div class="ph-actions"><button class="btn-secondary" onclick="openDrawer('${APP_STATE.activeClientId}','keywords')">Configure topic →</button><button class="btn-secondary" onclick="openExportModal('topic-brief')">⬇ Export brief</button><button class="btn-primary" onclick="location.hash='#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/meeting-list'">＋ Add to meeting list</button></div></div>
    <div class="metrics"><div class="metric"><div class="lab">Abstracts in this topic</div><div class="num">41</div></div><div class="metric"><div class="lab">Late-breaking</div><div class="num">3</div></div><div class="metric"><div class="lab">Plenaries</div><div class="num">2</div></div><div class="metric"><div class="lab">Avg. priority</div><div class="num">82</div></div></div>
    <div class="cols"><div class="panel"><div class="panel-h">Synthesis <span class="chip own xs">AI-GENERATED</span></div><div class="panel-b">IL-23 positioning at DDW 2026 is dominated by head-to-head readouts and long-term durability data, with mounting pressure for class differentiation by selectivity. Competitive sentiment is positive on efficacy but skeptical on biomarker-guided selection and post-week-52 durability confidence.</div></div><div class="panel"><div class="panel-h">Evidence gaps</div><div class="panel-b"><div class="note"><b>No validated response biomarker</b><p>Current attempts remain exploratory.</p></div><div class="note"><b>Limited >52 week outcomes</b><p>Durability evidence still sparse across class.</p></div><div class="note"><b>No prospective H2H IL-23 vs IL-12/23 RCT</b><p>Comparative certainty remains constrained.</p></div></div></div></div>
    <div class="sec-title">Abstracts in this topic <span class="ln"></span></div><div class="acards">${topicAbstracts.map(a => `<a class="acard ${cardClass(a.signal)}" href="#/abstracts/${a.id}"><div class="acard-body"><div class="acard-chips">${chipBySignal(a.signal)} ${chipBySession(a.session)}</div><div class="acard-title">${a.title}</div><div class="acard-meta"><span>${a.author}</span><span class="acard-sep">·</span><span>${a.schedule}</span></div></div><div class="acard-score-col"><div class="acard-priority-label">Priority</div>${scoreRing(a.priority, scoreRingColor(a.signal))}</div></a>`).join('')}</div>
    <div class="sec-title">KOLs presenting on this topic <span class="ln"></span></div><div class="feed-chips">${DATA.kols.slice(0,4).map(k => `<a class="chip line" href="#/kols/${k.id}">${k.name}</a>`).join('')}</div>
    <div class="panel" style="margin-top:20px">
      <div class="panel-h">What the team is capturing on this topic</div>
      <div class="panel-b capture-embed-list">${getCapturesForTopic(topicSlug).slice(0, 5).map(c => renderCaptureCard(c, { compact: true })).join('') || '<p class="muted">No captures on this topic yet.</p>'}</div>
    </div>`);
  mountCaptureFab();
}

// ==========================================================
// ONSITE CAPTURE LAYER
// ==========================================================
let CAPTURE_STATE = {
  mode: 'voice',
  context: {},
  recording: false,
  recordTimer: null,
  recordSeconds: 0,
  filters: { type: 'all', visibility: 'all', author: 'all', capture_type: 'all', day: 'all' },
  dripIndex: 0,
  lastStreamUpdate: Date.now()
};
let captureDripInterval = null;

function isCongressScoped() {
  const key = APP_STATE.activeNavKey;
  if (['congress', 'feed', 'ask', 'meeting', 'topic', 'captures'].includes(key)) return true;
  const h = (location.hash || '').split('?')[0];
  if (h.startsWith('#/abstracts/') || h.startsWith('#/kols/')) return true;
  return false;
}

function deriveCaptureContext() {
  const h = (location.hash || '').split('?')[0];
  const ctx = {
    congress: APP_STATE.activeCongressId || 'ddw-2026',
    kols: [],
    abstracts: [],
    topics: [],
    capture_type: 'Hallway'
  };
  const kolM = h.match(/^#\/kols\/([^/]+)/);
  const absM = h.match(/^#\/abstracts\/([^/]+)/);
  const topicM = h.match(/\/topics\/([^/]+)$/);
  if (kolM) {
    ctx.kols = [kolM[1]];
    ctx.capture_type = 'Spotlight meeting';
  } else if (absM) {
    const a = getAbstract(absM[1]);
    ctx.abstracts = [absM[1]];
    if (a && a.authorId) ctx.kols = [a.authorId];
    if (a && a.topics && a.topics[0]) ctx.topics = [slugify(a.topics[0])];
    ctx.capture_type = 'Session reaction';
  } else if (topicM) {
    ctx.topics = [decodeURIComponent(topicM[1])];
    ctx.capture_type = 'Session reaction';
  }
  return ctx;
}

function mountCaptureFab() {
  removeCaptureFab();
  if (!isCongressScoped()) return;
  const fab = document.createElement('button');
  fab.className = 'fab-capture';
  fab.setAttribute('aria-label', 'New capture');
  fab.innerHTML = '＋';
  fab.onclick = () => openCapture();
  document.body.appendChild(fab);
}

function removeCaptureFab() {
  document.querySelector('.fab-capture')?.remove();
}

function ensureCaptureModal() {
  if (document.getElementById('modal-capture')) return;
  const shell = document.createElement('div');
  shell.className = 'overlay-modal capture-modal-shell';
  shell.id = 'modal-capture';
  shell.style.display = 'none';
  shell.onclick = (e) => { if (e.target === shell) closeCapture(); };
  shell.innerHTML = `
    <div class="modal capture-modal-inner" onclick="event.stopPropagation()">
      <div class="modal-hd capture-modal-hd">
        <div><h2>New capture</h2>
          <div class="context-pill" id="capture-context-pill"></div>
        </div>
        <button class="close" onclick="closeCapture()">✕</button>
      </div>
      <nav class="mode-picker" id="capture-mode-picker">
        <button type="button" class="mp-tab act" data-mode="voice" onclick="setCaptureMode('voice')">🎙 Voice</button>
        <button type="button" class="mp-tab" data-mode="text" onclick="setCaptureMode('text')">✍ Quick note</button>
        <button type="button" class="mp-tab" data-mode="photo" onclick="setCaptureMode('photo')">📷 Photo</button>
      </nav>
      <div class="capture-body mode-voice" id="capture-mode-voice">
        <div class="record-area">
          <button type="button" class="rec-btn" id="rec-btn" onclick="toggleRecord()"><span class="rec-dot"></span></button>
          <div class="rec-meta">
            <div class="rec-time mono" id="rec-time">00:00</div>
            <div class="rec-status" id="rec-status">Tap to start recording</div>
          </div>
        </div>
        <div class="transcript-area">
          <label>Live transcript</label>
          <div class="transcript" id="capture-transcript"><em class="muted">Transcript will appear here as you speak…</em></div>
        </div>
      </div>
      <div class="capture-body mode-text" id="capture-mode-text" style="display:none">
        <textarea id="capture-note-text" rows="6" placeholder="Type your observation…" oninput="updateCaptureCharCount()"></textarea>
        <div class="char-count"><span id="capture-cc">0</span> characters</div>
      </div>
      <div class="capture-body mode-photo" id="capture-mode-photo" style="display:none">
        <div class="upload-zone" id="capture-upload-zone" onclick="document.getElementById('capture-photo-input').click()">
          <div class="uz-ic">📷</div>
          <b>Drag a photo or click to choose</b>
          <small>Camera access disabled in demo</small>
        </div>
        <input type="file" id="capture-photo-input" accept="image/*" style="display:none" onchange="onCapturePhotoChosen(event)">
        <div class="photo-preview" id="capture-photo-preview" style="display:none">
          <img id="capture-photo-img" alt="">
          <input type="text" id="capture-photo-caption" placeholder="Caption (optional)">
        </div>
      </div>
      <div class="tag-panel" id="capture-tag-panel"></div>
      <div class="visibility-row">
        <div>
          <input type="radio" name="cap-vis" id="cap-vp" value="private" checked>
          <label for="cap-vp">Private to me</label>
          <input type="radio" name="cap-vis" id="cap-vt" value="shared" style="margin-left:14px">
          <label for="cap-vt">Share with team</label>
        </div>
        <small class="muted">Private captures still feed your personal Ask Anything; shared captures feed everyone's.</small>
      </div>
      <div class="modal-foot">
        <button class="btn-secondary" onclick="closeCapture()">Cancel</button>
        <button class="btn-primary" onclick="saveCapture()">Save capture</button>
      </div>
    </div>`;
  document.body.appendChild(shell);
}

function renderCaptureContextPill(ctx) {
  const el = document.getElementById('capture-context-pill');
  if (!el) return;
  const pills = [];
  ctx.kols.forEach(id => {
    const k = getKol(id);
    if (k) pills.push(`<span class="chip soft"><span class="av xs">${k.initials}</span> ${k.name}</span>`);
  });
  ctx.abstracts.forEach(id => {
    const a = getAbstract(id);
    if (a) pills.push(`<span class="chip soft">${a.id.toUpperCase()}</span>`);
  });
  const cong = DATA.congresses.find(c => c.id === ctx.congress);
  if (cong) pills.push(`<span class="chip soft">${cong.acronym} 2026</span>`);
  el.innerHTML = `<small>Attaching to:</small> ${pills.join(' ') || '<span class="chip soft">Congress only</span>'}`;
}

function renderCaptureTagPanel(ctx) {
  const el = document.getElementById('capture-tag-panel');
  if (!el) return;
  const types = ['Spotlight meeting', 'Hallway', 'Session reaction', 'Competitive intel', 'Q&A highlight', 'General'];
  const kolChips = ctx.kols.map(id => {
    const k = getKol(id);
    if (!k) return '';
    return `<span class="chip line selected" data-kol="${id}"><span class="av xs">${k.initials}</span> ${k.name} ✓</span>`;
  }).join('');
  const topicChips = (ctx.topics || []).map(t =>
    `<span class="chip line selected">${t} ✓</span>`
  ).join('');
  const typeChips = types.map(t =>
    `<button type="button" class="chip-pick${t === ctx.capture_type ? ' act' : ''}" onclick="setCaptureType('${t.replace(/'/g, "\\'")}')">${t}</button>`
  ).join('');
  el.innerHTML = `
    <div class="tg-grp"><label>Person</label><div class="tg-chips">${kolChips || '<span class="muted">None detected</span>'}</div></div>
    <div class="tg-grp"><label>Topic</label><div class="tg-chips">${topicChips || '<span class="muted">Congress context</span>'}</div></div>
    <div class="tg-grp"><label>Capture type</label><div class="tg-chips">${typeChips}</div></div>`;
}

function setCaptureType(t) {
  CAPTURE_STATE.context.capture_type = t;
  renderCaptureTagPanel(CAPTURE_STATE.context);
}

function openCapture(mode) {
  if (!localStorage.getItem('capture-perms-ok')) {
    showToast('Allow camera/mic access? (demo — proceeding)');
    localStorage.setItem('capture-perms-ok', '1');
  }
  ensureCaptureModal();
  CAPTURE_STATE.context = deriveCaptureContext();
  CAPTURE_STATE.mode = mode || 'voice';
  CAPTURE_STATE.recording = false;
  CAPTURE_STATE.recordSeconds = 0;
  const shell = document.getElementById('modal-capture');
  shell.style.display = 'flex';
  renderCaptureContextPill(CAPTURE_STATE.context);
  renderCaptureTagPanel(CAPTURE_STATE.context);
  setCaptureMode(CAPTURE_STATE.mode);
  document.getElementById('capture-transcript').innerHTML = '<em class="muted">Transcript will appear here as you speak…</em>';
  document.getElementById('capture-note-text').value = '';
  document.getElementById('rec-time').textContent = '00:00';
  document.getElementById('rec-status').textContent = 'Tap to start recording';
  document.getElementById('rec-btn')?.classList.remove('recording');
  updateCaptureCharCount();
}

function closeCapture() {
  const shell = document.getElementById('modal-capture');
  if (shell) shell.style.display = 'none';
  if (CAPTURE_STATE.recordTimer) {
    clearInterval(CAPTURE_STATE.recordTimer);
    CAPTURE_STATE.recordTimer = null;
  }
  CAPTURE_STATE.recording = false;
}

function setCaptureMode(mode) {
  CAPTURE_STATE.mode = mode;
  document.querySelectorAll('#capture-mode-picker .mp-tab').forEach(t =>
    t.classList.toggle('act', t.dataset.mode === mode));
  document.getElementById('capture-mode-voice').style.display = mode === 'voice' ? '' : 'none';
  document.getElementById('capture-mode-text').style.display = mode === 'text' ? '' : 'none';
  document.getElementById('capture-mode-photo').style.display = mode === 'photo' ? '' : 'none';
  if (mode === 'text') setTimeout(() => document.getElementById('capture-note-text')?.focus(), 50);
}

function updateCaptureCharCount() {
  const ta = document.getElementById('capture-note-text');
  const cc = document.getElementById('capture-cc');
  if (ta && cc) cc.textContent = ta.value.length;
}

function mockTranscriptForContext(ctx) {
  const k = ctx.kols[0] ? getKol(ctx.kols[0]) : null;
  if (k) return `Just wrapped a hallway with ${k.name}. Flagged transmural healing as the next regulatory inflection — open to GSK pipeline discussion next quarter.`;
  const a = ctx.abstracts[0] ? getAbstract(ctx.abstracts[0]) : null;
  if (a) return `Session reaction on ${a.title.slice(0, 60)}… Effect size read as real but below field expectations on secondary endpoint.`;
  return 'Quick onsite note — competitive IL-23 narrative intensifying in hallway conversations.';
}

function toggleRecord() {
  const btn = document.getElementById('rec-btn');
  const status = document.getElementById('rec-status');
  if (CAPTURE_STATE.recording) {
    CAPTURE_STATE.recording = false;
    btn?.classList.remove('recording');
    status.textContent = 'Recording stopped';
    clearInterval(CAPTURE_STATE.recordTimer);
    CAPTURE_STATE.recordTimer = null;
    document.getElementById('capture-transcript').textContent = mockTranscriptForContext(CAPTURE_STATE.context);
    return;
  }
  CAPTURE_STATE.recording = true;
  CAPTURE_STATE.recordSeconds = 0;
  btn?.classList.add('recording');
  status.textContent = 'Recording…';
  const duration = 8 + Math.floor(Math.random() * 8);
  CAPTURE_STATE.recordTimer = setInterval(() => {
    CAPTURE_STATE.recordSeconds++;
    const m = String(Math.floor(CAPTURE_STATE.recordSeconds / 60)).padStart(2, '0');
    const s = String(CAPTURE_STATE.recordSeconds % 60).padStart(2, '0');
    document.getElementById('rec-time').textContent = `${m}:${s}`;
    if (CAPTURE_STATE.recordSeconds >= duration) toggleRecord();
  }, 1000);
}

function onCapturePhotoChosen(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('capture-upload-zone').style.display = 'none';
    const prev = document.getElementById('capture-photo-preview');
    prev.style.display = 'block';
    document.getElementById('capture-photo-img').src = reader.result;
  };
  reader.readAsDataURL(file);
}

function saveCapture() {
  const ctx = CAPTURE_STATE.context;
  const mode = CAPTURE_STATE.mode;
  const vis = document.querySelector('input[name="cap-vis"]:checked')?.value || 'private';
  const id = `${mode === 'voice' ? 'v' : mode === 'photo' ? 'p' : 'n'}-${Date.now().toString(36).slice(-4)}`;
  const cap = {
    id,
    type: mode === 'photo' ? 'photo' : mode === 'voice' ? 'voice' : 'text',
    author: CURRENT_USER_ID,
    visibility: vis,
    capture_type: ctx.capture_type || 'General',
    congress: ctx.congress,
    day: 1,
    timestamp: new Date().toISOString(),
    attached_kols: [...ctx.kols],
    attached_abstracts: [...ctx.abstracts],
    attached_topics: [...ctx.topics],
    location: 'San Diego Convention Center',
    userCreated: true
  };
  if (mode === 'voice') {
    const tr = document.getElementById('capture-transcript')?.textContent?.trim();
    cap.transcript = tr && !tr.includes('will appear') ? tr : mockTranscriptForContext(ctx);
    cap.duration = document.getElementById('rec-time')?.textContent || '1:00';
  } else if (mode === 'text') {
    cap.text = document.getElementById('capture-note-text')?.value || '';
  } else {
    cap.caption = document.getElementById('capture-photo-caption')?.value || 'Onsite photo capture';
    cap.image_url = document.getElementById('capture-photo-img')?.src || '';
  }
  DATA.captures.unshift(cap);
  persistCaptures();
  closeCapture();
  showCaptureSavedToast(id);
  if (APP_STATE.activeNavKey === 'captures') renderCaptureStream();
  else route();
}

function showCaptureSavedToast(captureId) {
  const t = document.createElement('div');
  t.className = 'toast toast-capture';
  t.innerHTML = `✓ Capture saved · <a href="#/captures/${captureId}" style="color:#fff;text-decoration:underline">view</a>`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

let captureStreamFiltersBound = false;

function renderCaptureStream() {
  const client = getClient(APP_STATE.activeClientId);
  const congressId = APP_STATE.activeCongressId;
  const filters = CAPTURE_STATE.filters;
  const list = getCapturesForCongress(congressId, filters);
  const groups = groupCapturesByDay(list);
  const lastMin = Math.max(1, Math.floor((Date.now() - CAPTURE_STATE.lastStreamUpdate) / 60000));
  const recentHour = list.filter(c => Date.now() - new Date(c.timestamp).getTime() < 3600000).length;

  const filterChips = [
    { key: 'type-all', label: 'All types', group: 'type', val: 'all' },
    { key: 'type-voice', label: '🎙 Voice', group: 'type', val: 'voice' },
    { key: 'type-text', label: '✍ Note', group: 'type', val: 'text' },
    { key: 'type-photo', label: '📷 Photo', group: 'type', val: 'photo' },
    { key: 'vis-mine', label: 'Mine only', group: 'visibility', val: 'mine' },
    { key: 'vis-shared', label: 'Shared with team', group: 'visibility', val: 'shared' },
    { key: 'day-1', label: 'Day 1', group: 'day', val: '1' },
    { key: 'day-2', label: 'Day 2', group: 'day', val: '2' }
  ];

  const chipsHtml = filterChips.map(f => {
    const act = filters[f.group] === f.val ? ' act' : '';
    return `<span class="fchip${act}" data-fg="${f.group}" data-fv="${f.val}" onclick="toggleCaptureFilter('${f.group}','${f.val}')">${f.label}</span>`;
  }).join('');

  const streamHtml = groups.length
    ? groups.map(g => `
      <div class="day-group">
        <div class="dg-hd"><b>${g.label}</b> <small>Day ${g.day}${g.day === 1 ? ' · today' : ''}</small></div>
        ${g.captures.map(c => renderCaptureCard(c)).join('')}
      </div>`).join('')
    : `<div class="empty"><h3>No captures match your filters</h3><p>Quiet so far — be the first to capture something. Tap the + button.</p></div>`;

  setPage(`
    <div class="crumb">Client Workspaces › ${client.name} › DDW 2026 › <b>Captures</b></div>
    <div class="ph">
      <div class="eyebrow">Onsite intelligence · Day 1 of 4</div>
      <h2>Capture stream <span class="live-dot"><i></i> Live</span></h2>
      <p>Every capture from the team, in real time. Filter to your view; tag to make it permanent.</p>
      <div class="ph-actions">
        <button class="btn-secondary" onclick="openExportModal('captures')">⬇ Export digest</button>
        <button class="btn-primary" onclick="openCapture()">＋ New capture</button>
      </div>
    </div>
    <div class="filters capture-filters">
      <span class="fl">FILTER</span>
      ${chipsHtml}
      <button class="feed-clear-all" onclick="clearCaptureFilters()">Clear all</button>
      <div class="result-mini"><b id="capture-count">${list.length}</b> captures · last 30 min: <b>${recentHour}</b> · updated <span id="cap-live-ago">${lastMin}</span> min ago</div>
    </div>
    <div class="capture-stream" id="capture-stream-list">${streamHtml}</div>
  `);
  startCaptureDripFeed();
  mountCaptureFab();
}

function toggleCaptureFilter(group, val) {
  const f = CAPTURE_STATE.filters;
  if (f[group] === val) f[group] = 'all';
  else f[group] = val;
  renderCaptureStream();
}

function clearCaptureFilters() {
  CAPTURE_STATE.filters = { type: 'all', visibility: 'all', author: 'all', capture_type: 'all', day: 'all' };
  renderCaptureStream();
}

function refreshCaptureStreamList() {
  const el = document.getElementById('capture-stream-list');
  if (!el || APP_STATE.activeNavKey !== 'captures') return;
  const list = getCapturesForCongress(APP_STATE.activeCongressId, CAPTURE_STATE.filters);
  const groups = groupCapturesByDay(list);
  CAPTURE_STATE.lastStreamUpdate = Date.now();
  const countEl = document.getElementById('capture-count');
  if (countEl) countEl.textContent = list.length;
  const agoEl = document.getElementById('cap-live-ago');
  if (agoEl) agoEl.textContent = '0';
  el.innerHTML = groups.length
    ? groups.map(g => `
      <div class="day-group">
        <div class="dg-hd"><b>${g.label}</b> <small>Day ${g.day}</small></div>
        ${g.captures.map(c => renderCaptureCard(c)).join('')}
      </div>`).join('')
    : `<div class="empty"><h3>No captures match your filters</h3></div>`;
  renderSidebar();
}

function startCaptureDripFeed() {
  stopCaptureDripFeed();
  captureDripInterval = setInterval(() => {
    const item = DATA.captureDripFeed[CAPTURE_STATE.dripIndex % DATA.captureDripFeed.length];
    CAPTURE_STATE.dripIndex++;
    if (!item) return;
    const id = `drip-${Date.now().toString(36).slice(-4)}`;
    const cap = {
      id,
      type: item.type,
      author: item.author,
      visibility: item.visibility || 'shared',
      capture_type: item.capture_type || 'General',
      congress: item.congress || APP_STATE.activeCongressId,
      day: item.day || 1,
      timestamp: new Date().toISOString(),
      text: item.text,
      caption: item.caption,
      transcript: item.text,
      attached_kols: item.attached_kols || [],
      attached_abstracts: item.attached_abstracts || [],
      attached_topics: item.attached_topics || [],
      attached_companies: item.attached_companies || [],
      _new: true
    };
    DATA.captures.unshift(cap);
    refreshCaptureStreamList();
    setTimeout(() => { const c = getCapture(id); if (c) delete c._new; }, 3000);
  }, 30000);
}

function stopCaptureDripFeed() {
  if (captureDripInterval) {
    clearInterval(captureDripInterval);
    captureDripInterval = null;
  }
}

function renderCaptureDetail(id) {
  const c = getCapture(id);
  if (!c) {
    setPage(`<div class="empty"><h3>Capture not found</h3><a class="back-link" href="#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/captures">← Back</a></div>`);
    return;
  }
  const member = getTeamMember(c.author) || { name: 'Unknown', initials: '??' };
  const isOwner = c.author === CURRENT_USER_ID;
  const rel = relatedCaptures(c);
  const streamUrl = `#/clients/${APP_STATE.activeClientId}/congresses/${c.congress || APP_STATE.activeCongressId}/captures`;

  let content = '';
  if (c.type === 'voice') {
    content = `
      <div class="player">
        <button type="button" class="play" onclick="showToast('Playback stubbed in demo')">▶</button>
        <div class="waveform-lg"><svg viewBox="0 0 600 60" preserveAspectRatio="none"><path d="M0,30 Q50,10 100,30 T200,25 T300,35 T400,20 T500,30 T600,25" fill="none" stroke="var(--teal)" stroke-width="2"/></svg></div>
        <div class="player-meta mono">00:00 / ${c.duration || '1:48'}</div>
      </div>
      <div class="transcript-block">
        <label>Transcript</label>
        <p>${(c.transcript || '').split('\n').map(p => p.trim()).filter(Boolean).map(p => `"${p}"`).join('</p><p>')}</p>
      </div>`;
  } else if (c.type === 'photo') {
    content = `
      <div class="cap-photo-full">${c.image_url ? `<img src="${c.image_url}" alt="">` : '<div class="cap-photo-ph lg">📷</div>'}</div>
      <div class="transcript-block"><label>Caption</label><p>${c.caption || ''}</p></div>`;
  } else {
    content = `<div class="transcript-block"><label>Note</label><p>${c.text || ''}</p></div>`;
  }

  const attachRows = [];
  (c.attached_kols || []).forEach(kid => {
    const k = getKol(kid);
    if (k) attachRows.push(`<a class="att-row" href="#/kols/${k.id}"><div class="av sm">${k.initials}</div><div><b>${k.name}</b><small>${k.affiliation}</small></div></a>`);
  });
  (c.attached_abstracts || []).forEach(aid => {
    const a = getAbstract(aid);
    if (a) attachRows.push(`<a class="att-row" href="#/abstracts/${a.id}"><div class="ic-sq">📄</div><div><b>${a.title.slice(0, 50)}…</b><small>${a.schedule}</small></div></a>`);
  });

  setPage(`
    <a class="back-link" href="${streamUrl}">← Back to capture stream</a>
    <div class="cap-detail-hd">
      <div class="cap-type">${captureTypeIcon(c.type)} ${c.type} capture</div>
      <h2>${c.capture_type || 'Onsite capture'}</h2>
      <div class="cap-meta-row">
        <div class="av sm">${member.initials}</div>
        <b>${member.name}</b>
        <small>· ${new Date(c.timestamp).toLocaleString()} · ${c.duration || ''} · DDW 2026</small>
        <span class="vis-pill ${c.visibility}"><span class="d"></span> ${c.visibility === 'private' ? 'PRIVATE' : 'SHARED WITH TEAM'}</span>
      </div>
      <div class="cap-actions">
        ${c.visibility === 'private' ? `<button class="btn-secondary" onclick="shareCapture('${c.id}')">⤴ Share</button>` : ''}
        ${isOwner ? `<button class="btn-secondary" onclick="showToast('Edit mode coming soon')">✎ Edit</button>` : ''}
        ${c.type === 'voice' ? `<button class="btn-secondary" onclick="showToast('Download stubbed in demo')">⬇ Download audio</button>` : ''}
        ${isOwner ? `<button class="btn-danger-ghost" onclick="deleteCapture('${c.id}')">✕ Delete</button>` : ''}
      </div>
    </div>
    <div class="cols-2 cap-detail-cols">
      <div class="cap-content">${content}</div>
      <aside class="cap-side">
        <div class="panel">
          <div class="panel-h">Attached to</div>
          <div class="panel-b">${attachRows.join('') || '<span class="muted">Congress only</span>'}
            <div class="tag-list" style="margin-top:8px">${renderCaptureTags(c)}</div>
          </div>
        </div>
        ${rel.length ? `<div class="panel"><div class="panel-h">Related captures</div><div class="panel-b">
          ${rel.map(r => {
            const m = getTeamMember(r.author);
            return `<a class="rel-row" href="#/captures/${r.id}"><div class="av xs">${m?.initials || '??'}</div><small><b>${m?.name}</b> · ${formatTimeAgo(r.timestamp)}</small><p>"${captureBodyPreview(r, 60)}"</p></a>`;
          }).join('')}
        </div></div>` : ''}
      </aside>
    </div>
    <div class="provenance">Captured ${new Date(c.timestamp).toLocaleString()} · iPhone · ${c.location || 'San Diego Convention Center'}</div>
  `);
  mountCaptureFab();
}

function shareCapture(id) {
  const c = getCapture(id);
  if (!c) return;
  c.visibility = 'shared';
  persistCaptures();
  showToast('✓ Capture shared with team');
  route();
}

function deleteCapture(id) {
  DATA.captures = DATA.captures.filter(c => c.id !== id);
  persistCaptures();
  showToast('Capture deleted');
  location.hash = `#/clients/${APP_STATE.activeClientId}/congresses/${APP_STATE.activeCongressId}/captures`;
}

function renderRecentCapturesPanel(limit = 3) {
  const caps = getCapturesForCongress(APP_STATE.activeCongressId)
    .filter(c => c.visibility === 'shared')
    .slice(0, limit);
  if (!caps.length) return '<div class="muted" style="padding:12px">No team captures yet.</div>';
  return caps.map(c => renderCaptureCard(c, { compact: true })).join('');
}

function renderKolCaptureNotes(kolId) {
  const caps = getCapturesForKol(kolId);
  if (!caps.length) {
    return `<div class="note"><div class="nh"><b>DDW 2025 · hallway debrief</b><small>MAY 2025</small></div>
      <p>Cautiously optimistic on IL-23 selectivity but flagged the lack of head-to-head data as the key gap.</p>
      <div class="src">🎙 Voice note · 2:14</div></div>`;
  }
  return caps.slice(0, 6).map(c => {
    const m = getTeamMember(c.author);
    return `<a class="note cap-note-embed" href="#/captures/${c.id}">
      <div class="nh"><b>${c.capture_type || 'Capture'}</b><small>${formatTimeAgo(c.timestamp)}</small></div>
      <p>${captureBodyPreview(c, 180)}</p>
      <div class="src">${captureTypeIcon(c.type)} ${m?.name || 'Team'} · ${c.visibility === 'private' ? 'Private' : 'Shared'}</div>
    </a>`;
  }).join('');
}

function renderAbstractFieldReactions(abstractId) {
  const caps = getCapturesForAbstract(abstractId);
  if (!caps.length) return '<p class="muted">No field reactions yet for this abstract.</p>';
  return `<div class="capture-embed-list">${caps.slice(0, 4).map(c => renderCaptureCard(c, { compact: true })).join('')}</div>`;
}

// ==========================================================
// INIT
// ==========================================================
window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
  const preferred = localStorage.getItem(defaultWorkspaceKey());
  if (preferred && DATA.clients.some(c => c.id === preferred)) APP_STATE.activeClientId = preferred;
  loadCaptures();
  if (location.search.includes('reset=1')) {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('client-') || k === defaultWorkspaceKey() || k === capturesStorageKey() || k === 'capture-perms-ok') localStorage.removeItem(k);
    });
    seedCaptures();
    showToast('Demo state reset.');
  }
  if (!location.hash || location.hash === '#') {
    location.hash = '#/dashboard';
  } else {
    route();
  }
  ensureTopbarCreateMenu();
});
