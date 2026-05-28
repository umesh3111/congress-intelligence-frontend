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
      dates:"May 3–6, 2026", city:"San Diego, CA", status:"planning", client:"gsk", inDays:41 },
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
  ]
};

// De-duplicate abstracts by id
(function() {
  const seen = new Set(), deduped = [];
  DATA.abstracts.forEach(a => { if (!seen.has(a.id)) { seen.add(a.id); deduped.push(a); } });
  DATA.abstracts = deduped;
})();

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
  const h = location.hash || '#/dashboard';
  const page = document.getElementById('page');
  page.scrollTop = 0;

  if (h === '#/dashboard' || h === '#/' || h === '') {
    renderDashboard(); highlightNav('dashboard');
  } else if (h === '#/clients/gsk') {
    renderClientWorkspace(); highlightNav('client');
  } else if (h === '#/clients/gsk/congresses/ddw-2026') {
    renderCongressDashboard(); highlightNav('congress');
  } else if (h === '#/clients/gsk/congresses/ddw-2026/feed') {
    renderIntelFeed(); highlightNav('feed');
  } else if (h === '#/clients/gsk/kols') {
    renderKolDirectory(); highlightNav('kols');
  } else if (h === '#/clients/gsk/settings/prioritization') {
    renderPrioritizationSettings(); highlightNav('settings');
  } else if (h === '#/profile') {
    renderProfile(); highlightNav('profile');
  } else if (h === '#/clients/gsk/congresses/new') {
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
}

function highlightNav(key) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('act'));
  const nav = document.querySelector(`[data-nav="${key}"]`);
  if (nav) nav.classList.add('act');
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
  ).join('');

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
      <a class="qa" href="#/clients/gsk/congresses/new">
        <div class="qi">＋</div><b>Create New Congress</b><small>Start a new congress workspace</small>
      </a>
      <a class="qa" onclick="showToast('Upload feature coming soon — use the Congress workspace to ingest documents'); return false" href="#">
        <div class="qi">⬆</div><b>Upload Documents</b><small>PDFs, slides, screenshots</small>
      </a>
      <a class="qa" href="#/clients/gsk/settings/prioritization">
        <div class="qi">★</div><b>View Prioritization</b><small>AI-ranked opportunities</small>
      </a>
      <a class="qa" onclick="showToast('✓ Capture feature coming soon — use the KOL Dossier to add field notes'); return false" href="#">
        <div class="qi">●</div><b>Add Capture</b><small>Voice, photo, or note</small>
      </a>
    </div>
  `);
}

// ==========================================================
// PAGE 2: CLIENT WORKSPACE
// ==========================================================
function renderClientWorkspace() {
  const gskCongresses = DATA.congresses.filter(c => c.client === 'gsk' && c.inDays > 0);
  const congRows = gskCongresses.slice(0,5).map(c =>
    `<a class="cong-mini" href="#/clients/gsk/congresses/${c.id}">
      <div class="cmark sm ${cmarkClass(c.acronym)}">${c.acronym}</div>
      <div><b>${c.acronym} ${c.dates.split(',')[0]}</b><div class="meta">${c.dates} · ${c.city}</div></div>
      <span class="when">In ${c.inDays}d</span>
    </a>`
  ).join('');

  const priorities = DATA.strategicPriorities.map(p =>
    `<div class="pri pri-${p.level}"><div class="pri-n">${p.rank}</div>
      <b>${p.text}</b>
      <span class="chip ${p.level === 'high' ? 'comp xs' : 'soft xs'}">${p.level.toUpperCase()}</span>
    </div>`
  ).join('');

  setPage(`
    <div class="crumb">Client Workspaces › <b>GSK</b></div>
    <div class="client-hd">
      <div class="ctag-lg">GSK</div>
      <div>
        <h2>GSK <span class="chip own">Active Client</span></h2>
        <p>GlaxoSmithKline · Therapeutic areas: Gastroenterology, Respiratory, Oncology, Immunology</p>
      </div>
      <div class="hd-actions">
        <button class="btn-secondary" onclick="showToast('Client Settings panel coming soon')">⚙ Client Settings</button>
        <a class="btn-primary" href="#/clients/gsk/congresses/new">＋ New Congress</a>
      </div>
    </div>

    <nav class="tabs">
      <a class="tab act">Overview</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026">Congresses</a>
      <a class="tab" href="#/clients/gsk/kols">KOLs</a>
      <a class="tab" onclick="showTabStub(this,'Insights')">Insights</a>
      <a class="tab" onclick="showTabStub(this,'Reports')">Reports</a>
      <a class="tab" onclick="showTabStub(this,'Documents')">Documents</a>
      <a class="tab" onclick="showTabStub(this,'Company Profile')">Company Profile</a>
      <a class="tab" onclick="showTabStub(this,'Team')">Team</a>
    </nav>

    <div class="metrics stagger">
      <div class="metric">${metricIcon('📅','teal')}<div class="lab">Active Congresses</div><div class="num">6</div><div class="sub">Across 2026</div></div>
      <div class="metric">${metricIcon('👥','ink')}<div class="lab">KOLs Tracked</div><div class="num">245</div><div class="sub">All TAs</div></div>
      <div class="metric">${metricIcon('⚡','amber')}<div class="lab">Insights Captured</div><div class="num">1,368</div><div class="sub">This year</div></div>
      <div class="metric">${metricIcon('📊','violet')}<div class="lab">Reports Generated</div><div class="num">28</div><div class="sub">This year</div></div>
      <div class="metric">${metricIcon('⚙','green')}<div class="lab">Strategic Priorities</div><div class="num">4</div><div class="sub">Configured</div></div>
    </div>

    <div class="cols-3">
      <div class="panel">
        <div class="panel-h">Upcoming Congresses <a class="more" href="#/clients/gsk/congresses/ddw-2026">VIEW ALL ›</a></div>
        <div class="panel-b" style="padding:4px 16px">${congRows}</div>
      </div>
      <div class="panel">
        <div class="panel-h">Top Therapeutic Areas</div>
        <div class="panel-b" style="display:flex;flex-direction:column;align-items:center">
          <canvas id="ta-donut" width="180" height="180"></canvas>
          <div class="legend">
            <div><span class="d" style="background:#0D9488"></span>Gastroenterology <b>38%</b></div>
            <div><span class="d" style="background:#6D5BD0"></span>Respiratory <b>27%</b></div>
            <div><span class="d" style="background:#B45309"></span>Oncology <b>18%</b></div>
            <div><span class="d" style="background:#48607A"></span>Immunology <b>12%</b></div>
            <div><span class="d" style="background:#AEBECD"></span>Other <b>5%</b></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">Recent Activity</div>
        <div class="panel-b">
          <div class="tl">
            <div class="tl-i"><span class="dt">2H AGO</span><b>New congress: DDW 2026 ingested</b><p>4,789 abstracts processed</p></div>
            <div class="tl-i"><span class="dt">5H AGO</span><b>Dr. Walter Reinisch added to KOL list</b></div>
            <div class="tl-i"><span class="dt">1D AGO</span><b>11 insights from ASCO 2024</b></div>
            <div class="tl-i"><span class="dt">3D AGO</span><b>Prioritization settings updated</b></div>
          </div>
        </div>
      </div>
    </div>

    <div class="sec-title">Strategic Priorities <a class="more" href="#/clients/gsk/settings/prioritization">MANAGE PRIORITIES ›</a><span class="ln"></span></div>
    <div class="priorities-grid">${priorities}</div>

    <div class="sec-title">Key Documents <a class="more" onclick="showToast('Document library coming soon')">VIEW ALL ›</a><span class="ln"></span></div>
    <div class="docs">
      <div class="doc"><div class="dic pdf">PDF</div><div><b>GSK Clinical Pipeline Overview</b><small>Updated Apr 25, 2026</small></div></div>
      <div class="doc"><div class="dic ppt">PPTX</div><div><b>GSK Therapeutic Area Strategy 2026</b><small>Updated Apr 20, 2026</small></div></div>
      <div class="doc"><div class="dic xls">XLSX</div><div><b>GSK Competitor Landscape</b><small>Updated Apr 18, 2026</small></div></div>
    </div>
  `);

  // Chart.js TA donut
  requestAnimationFrame(() => {
    const canvas = document.getElementById('ta-donut');
    if (canvas && window.Chart) {
      chartInstances['ta-donut'] = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: ['Gastroenterology','Respiratory','Oncology','Immunology','Other'],
          datasets: [{ data: [38,27,18,12,5],
            backgroundColor: ['#0D9488','#6D5BD0','#B45309','#48607A','#AEBECD'],
            borderWidth: 2, borderColor: '#fff' }]
        },
        options: { plugins: { legend: { display: false } }, cutout: '70%', animation: { duration: 600 } }
      });
    }
  });
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
        <button class="btn-primary" onclick="showToast('✓ Capture added to DDW 2026')">＋ Capture Insight</button>
      </div>
    </div>

    <nav class="tabs">
      <a class="tab act">Overview</a>
      <a class="tab" href="#/clients/gsk/congresses/ddw-2026/feed">Abstracts</a>
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
          ${chipBySignal(a.signal)}
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
        ${chipBySignal(a.signal)}
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
      <td><button class="row-add" title="Add to meeting list" onclick="event.stopPropagation();showToast('✓ ${k.name} added to meeting list')">+</button></td>
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
          <span class="tag">Sentiment: ${kol.sentiment}</span>
          ${kol.focus.slice(0,2).map(f => `<span class="tag">${f}</span>`).join('')}
        </div>
      </div>
      <button class="addbtn" onclick="showToast('✓ ${kol.name.replace(/'/g,"\\'")} added to meeting list')">+ Add to meeting list</button>
    </div>

    <div class="cols-2">
      <div class="panel">
        <div class="panel-h">Presenting at DDW 2026 <span class="more">${presentations.length} SESSIONS</span></div>
        <div class="panel-b" style="padding:4px 16px">${slots}</div>
      </div>
      <div class="panel">
        <div class="panel-h">Field notes & history</div>
        <div class="panel-b">
          <div class="note">
            <div class="nh"><b>DDW 2025 · hallway debrief</b><small>MAY 2025</small></div>
            <p>Cautiously optimistic on IL-23 selectivity but flagged the lack of head-to-head data as the key gap before guideline adoption.</p>
            <div class="src">🎙 Voice note · 2:14</div>
          </div>
          <div class="note">
            <div class="nh"><b>Advisory board</b><small>MAR 2025</small></div>
            <p>Strong advocate for transmural healing as a regulatory endpoint. Open to pipeline discussion. Expressed interest in real-world evidence programs.</p>
          </div>
          <div class="note">
            <div class="nh"><b>ECCO 2025 · post-session notes</b><small>FEB 2025</small></div>
            <p>Very engaged in histologic remission debate. Would be a strong voice for a future advisory board on mucosal healing endpoints.</p>
            <div class="src">✍ Written brief</div>
          </div>
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
// INIT
// ==========================================================
window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
  if (!location.hash || location.hash === '#') {
    location.hash = '#/dashboard';
  } else {
    route();
  }
});
