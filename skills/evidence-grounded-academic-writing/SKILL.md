---
name: evidence-grounded-academic-writing-system
description: >
  Portable, evidence-first academic research and writing workflow for essays,
  scientific papers (KTI), proposals, empirical manuscripts, technical reports,
  systems papers and literature reviews. Includes targeted internet research,
  traceable source ZIPs with Windows .url shortcuts, claim–evidence tracking,
  quantitative and methodological auditing, equations, data-grounded charts,
  caption and cross-reference systems, native Word production, three-pass review,
  and versioned handoff to a new chat/project.
version: 3.0.0
language: id
entrypoint: SKILL.md
---

# Evidence-Grounded Academic Writing System — portable SKILL v3.0

## Purpose, precedence and non-negotiables

**Objective:** produce a defensible academic document whose arguments, sources, data, visuals and formatting agree; not merely a polished text. This is a reusable task skill, not an account-level installed connector. Read and apply it when uploaded to a chat/project. No previous ACTION project memory is required. The output may be a conceptual essay, KTI, report, proposal, journal manuscript, systems paper, literature review or mixed-methods study; select its branch instead of imposing one universal IMRaD template.

**Priority:** (1) truth, source and data integrity; (2) user's brief, organizer and target-venue template; (3) valid design/inference; (4) cogent structure and natural language; (5) visuals/typesetting; (6) extra polish. A specific official template can override presentation defaults below but never license invented results. Never imply Q1/Q2 acceptance or assign a journal a quartile without checking *metric, year and category*. Distinguish SJR quartile from Scopus/CiteScore quartile and SINTA accreditation.

**Do not invent** authors, DOIs, datasets, observations, sample sizes, thresholds, percentages, p-values, effect sizes, study procedures, causal claims, figures sourced from publications, approvals, journal ranking, leaderboard evidence, licenses or measurements. Mark factual gaps in working notes; do not fill them by plausible-sounding prose. Never describe an unexecuted step as already completed. Charts based on nonexistent data are **mockups labeled as illustrative**, never results. Avoid reusing third-party figures without checking permission and attribution.

**Four distinct evidence classes:** `OBSERVED` (actual primary data/outputs), `EXTERNAL_VERIFIED` (source content inspected), `ASSUMPTION_OR_SCENARIO` (declared), `PLANNED` (not executed). Also mark `HYPOTHESIZED` and `INTERPRETATION` as needed. Distinguish source *existence*, *bibliographic metadata*, *claim entailment* and *scope applicability*. A valid DOI alone does not validate a quantitative claim.

## Trigger and dispatch

| User intent | Route | Essential evidence | Deliverable |
|---|---|---|---|
| Academic essay / scientific competition essay | `genres/essay.md` | contest prompt + literature | coherent essay, evidence notes, visuals only if needed |
| KTI / scientific proposal | `genres/kti_proposal.md` | guideline, problem, data availability | structured paper/proposal, feasibility and evidence plans |
| Empirical journal paper | `genres/research_article.md` | actual dataset/protocol | methods, results, limitations + audit |
| Technical / data science report | `genres/technical_report.md` | code, logs, datasets, metrics, rules | reproducible and quantitative report |
| System design / design science | `genres/systems_paper.md` | requirements, architecture, verification | requirements-to-evaluation argument |
| Systematic/narrative literature review | `genres/literature_review.md` | documented search/screening | synthesis and, for systematic review, applicable guideline |
| Adapt/revise existing draft | same genre + `playbooks/08_red_team_release.md` | existing document and source evidence | annotated issue register + complete revised draft |

## End-to-end stage gates

**0 — Intake and source-of-truth.** Inspect attachments, brief, original templates, old drafts, code and evidence before drafting. Extract venue, language, page/word count, citation style, audience, rubric, deadlines, data/source restrictions, reproducibility, mandatory sections and exclusion rules. Confirm a genuinely blocking choice if necessary; do not repeatedly ask what existing files answer. Produce `templates/project_brief.md` and an inventory. Distinguish `available`, `missing`, `conflicting`, `unverified`.

**1 — Research architecture.** Write the actual problem, target reader, contribution, scope, RQ/hypothesis/decision question, estimand or target quantity if applicable, unit/grain, method, evaluation, threat to inference and maximum legitimate conclusion. Use the mapping `RQ → quantity → unit → design → data → analysis → uncertainty → claim` where relevant. Essay arguments may use premise–counterargument–warrant instead of estimands.

**2 — Evidence-first online source hunt (before drafting).** Search authoritative guideline, primary empirical literature, nearest-neighbor papers, current statistics, and methods sources. Prefer publisher/DOI/Crossref/official SINTA and Scopus/SCImago records. Search both problem-domain and proposed-method references. Log query, date, database, screening rationale and access level; classify publication type. Source ranking is not the same as relevance. See `playbooks/02_source_hunt_and_reference_zip.md` for multi-pass strings, quota guidance, evidence cards and `.url` ZIP release. Give the user a reference ZIP **before, or alongside** major writing when they explicitly request it.

**3 — Synthesis, not a bibliography dump.** Compare directly adjacent studies by population, task, design, samples, metric, conclusion and limits. Build `literature_matrix.csv`, `claim_ledger.csv` and `citation_audit.csv`. For every major claim, record source URL/DOI, exact evidence location (section/table/page), what it *does and does not* entail, directness and status. Identify a gap through comparison, not “there is no research”. Priority of sources is grounded primary evidence over secondary summaries. Use selectively recent papers plus essential foundational work.

**4 — Methods and actual analytical work.** Choose methods based on research questions and inferential limits, not fashionable algorithms. If data/code exist, use tools to calculate and validate real metrics, denominator, split, uncertainty and visuals; preserve data provenance and runnable commands. For AI/ML inspect leakage, unit of independence, baselines, calibration, training vs inference, tuning boundaries and result reproducibility. For qualitative research inspect sampling rationale, coding/interpretation and negative cases; don't fake quotes. For proposals explain planned evaluation instead of fabricated results.

**5 — Manuscript architecture and argument skeleton.** Create a section-by-section plan with `purpose → claim → supporting evidence → figure/table/equation → limitation → transition`. Match the organizer/journal template. Allocate detail to method/results/discussion according to scoring rubric. Write paragraph logic before optimizing page count. Do not force three bullets per subsection. Keep abstract, body, figures and conclusion synchronized.

**6 — Draft with traceable citations and real visuals.** Write natural, precise academic Indonesian or English. Use inline IEEE `[n]` for IEEE tasks and re-number by first appearance; use APA 7, Vancouver, Chicago etc only when required. Citation near the claim; paragraph-end citation wallpaper is not acceptable for different claims. For own analysis, describe data/output instead of attaching unrelated literature. Every quantitative figure/table has a provenance record. Visuals serve questions. Place a specific placeholder only for a needed unavailable object, with the source, required shape and validation task.

**7 — Table, figure, equation and note system.** Maintain `visual_registry.csv`, ensure every display is cited in text and interpreted for a decision, not merely repeated. Put table captions above and figure captions below **unless venue specifies otherwise**; avoid decorative vertical rules, unnecessary shading or unreadable dense text. Label source/notes and units/denominators. Math equations must match implemented calculations, define symbols, carry equation numbers if template requires. Separate useful *notes*, *source notes*, footnotes, appendix notes and editorial TODO; no prompts or internal instructions in submission manuscripts.

**8 — Assemble publishable deliverables.** Produce requested `DOCX` / `MD` / PDF if explicitly asked; don't stop after outline. For Word use styles, native equations where possible, consistent captions, automatic page numbers, proper margins/columns and real cross-references where supported. Never blindly copy an old competition's two-column template to an unrelated genre. `playbooks/07_word_assembly_and_qa.md` details formatting and render→inspect. Make one clean reader-facing manuscript plus separate internal ledgers; don't paste the assistant's plan/confirmations into the manuscript.

**9 — Critical review then recheck.** Run (A) destructive scientific review; (B) backwards evidence audit `conclusion → discussion → result → analysis → data/source`; (C) compression/natural-language review. Recompute key numbers, inspect all figure data and captions, verify references two ways, confirm appendix links and layout. Critical unresolved integrity failures block claims; record limitations transparently. Only report tests performed. Review journal/contest formatting and any ethics/AI disclosure rules.

**10 — Release and handoff.** Deliver named requested files plus `audit_report.md` and `project_handoff.md` (separate from clean manuscript). `project_handoff.md` explains updated scope, immovable decisions, evidence index, files, claim statuses, unresolved issues, next safe steps and a **short continuation prompt**. Reopen or check final ZIP integrity and required path existence. New chat must inspect handoff and artifacts rather than trust pasted memory.

## Operational execution policy

1. If the user asks for **research first**, first produce a credible `REFERENCES_AND_BEST_PRACTICES.zip`: verified URLs/DOIs, `.url` shortcuts, source index, access/licensing flags, nearest-neighbor classification, extraction cards, and search log. Do not pretend URL shortcuts contain downloaded full texts. Download only lawful accessible full texts when requested and available; preserve terms/licenses.
2. If the user asks for **draft now**, research and evidence extraction happen within the same task; deliver draft, not only a plan.
3. If files or internet are unavailable, continue with the verified remainder; log precise missing elements and mark related claims `UNVERIFIED`. Never construct fictitious citations or download links.
4. For **long documents**, stage body by section but maintain a single shared table of verified results and central citation IDs. Include an appendix when useful but not to conceal methodological flaws.
5. **Multiple roles are reviewer lenses, not credentials**: domain scholar, methodologist, statistician, literature researcher, academic writer, visualization editor, reference auditor, production designer, and adversarial reviewer. Different roles resolve disagreements by evidence hierarchy.
6. Article-format rules are conditional, not universal. The target journal/contest has final authority over body length, heading levels, number of columns, reference style and appendix eligibility.
7. Do not optimize to bypass AI detectors. Remove formulaic patterns because they obscure specific arguments; preserve legitimate uncertainty, passive constructions and terminology.

## Quality contract / release gates

| Gate | Pass condition | Blocker example |
|---|---|---|
| G1 Scope | Every required section/rule mapped | silently ignoring page limit |
| G2 Provenance | Every important fact traceable | DOI exists but claim unsupported |
| G3 Design | Inference supported by design | claim causal effect from a satisfaction survey |
| G4 Numbers | denominators, units, provenance consistent | figure different from table |
| G5 Figures | purposeful, readable, correctly sourced | third-party figure relabeled as author's result |
| G6 Text | coherent, natural, nonredundant | synthetic 'first/second/therefore' paragraphs |
| G7 Venue | style, source notes, author rules respected | fixed IEEE when venue demands APA |
| G8 Reproducibility | evidence and audit files independently inspectable | asserted rerun without execution |
| G9 Render | full DOCX/PDF page visual QA | cropped table/isolated caption |
| G10 Handoff | clean artifact plus exact continuation context | chat-only explanation with missing files |

**Delivery language:** State what was actually created, what is verified, and what remains unverified, briefly. Do not overclaim a journal quartile, originality, or acceptance probability. Check `README.md`, `00_START/START_HERE.md`, playbooks, and templates for details. Keep all examples clearly marked as **illustrative**.
