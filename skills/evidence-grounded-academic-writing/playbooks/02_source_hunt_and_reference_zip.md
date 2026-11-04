# Playbook 02 — Riset internet, source ZIP, Windows shortcuts dan contoh jurnal

## Goal

Create a **curated, auditable research starter kit** for the specific topic before writing: not merely 50 arbitrary links. Every included source has a purpose and metadata; the ZIP enables a later chat to open the original venue and verify an exact claim. Include authoritative writing best practices, target venue requirements, nearest comparable published studies, research-design/method references and primary contextual statistics. The `references/` folder in this skill only contains a **general verified starter catalog**; run a fresh topic-specific hunt for the new project.

## Search 5 lanes, with exact and broad strings

1. **Rules and templates**: `[competition/journal] official guidebook author instructions word template page limit citation style`; verify dates and source domain.
2. **Problem domain**: `"key construct" AND (problem/context) AND (study/population)`; include national government and professional statistics if needed.
3. **Nearest-neighbor research**: `("outcome" OR "task") AND (method) AND (population/domain)`; reverse-citation chase; pick studies most comparable, not merely most cited.
4. **Method and audit standards**: original method paper + evaluation guideline + limits or counterarguments. For ML: benchmark dataset, metric, leakage, external validation, statistics and proper comparisons. For qualitative: design/analysis standards relevant to epistemology.
5. **Writing/visual exemplars**: retrieve published papers in the genre with transparent Methods/Results, readable tables, figure captions, supplementary evidence and accessible reproducibility artifacts. Record **why** layout is exemplary and **which elements not to imitate**.

Vary synonyms and languages, use year filters and explicit inclusion criteria. Avoid the blanket rule “only last 5 years”: retrieve current work plus foundational methods. The recommended *3–10 nearest-neighbor papers* is a pragmatic screening focus, not an arbitrary bibliography cap; enlarge for actual systematic reviews.

## Evidence and status taxonomy

`source_kind`: empirical journal / conference / preprint / systematic review / book / standard / official dataset / website / technical documentation / source code / contest report.

`access_status`: publisher full-text read / full-text repository read / abstract read / metadata only / paywalled / not accessible.

`verification_status`: verified exact metadata + claim / metadata verified content partial / metadata only / unresolved / retracted/corrected (with context).

`indexing_status`: checked with source/year/category / not checked / not applicable. SJR Qx **is not** Scopus CiteScore Qx; SINTA S1–S6 is not a Scopus journal quartile. Citation count alone is not proof of relevance or quality.

**Citable threshold:** do not call it claim-verified until the relevant method, numeric table or direct statement has actually been seen. An accessible landing page is not equivalent to a full-text read. Save `supporting_quote_locator` as short paraphrase with section/table/page, not unauthorized full-article excerpts.

## Ranking sources for the current argument

Use qualitative fields `directness (high/medium/low)`, `methodological_fit`, `source_integrity`, `recency_relevance`, `scope_match`, `access`, `conflicts`. Make a top-reading list with *reasoning*, not one opaque weighted score; source choice can change when claim changes. Track limitations and contradictions. Include negative findings where evidence merits it.

## Directory contract for topic research ZIP

```
RESEARCH_SOURCES_<topic>_<date>/
  README.md
  00_SEARCH/search_strategy.md
  00_SEARCH/search_log.csv
  01_CATALOG/source_catalog.csv
  01_CATALOG/priority_reading.md
  01_CATALOG/journal_index_check.csv
  02_SHORTCUTS/
     official_guidelines/*.url
     nearest_neighbors/*.url
     methods/*.url
     domain_context/*.url
     figure_examples/*.url
  03_CARDS/SRC-001.md
  03_CARDS/SRC-002.md
  04_MATRIX/literature_matrix.csv
  04_MATRIX/citation_entailment.csv
  05_BIBLIOGRAPHY/references.bib
  05_BIBLIOGRAPHY/references.ris
  06_LICENSES/fulltext_permissions.csv
  07_OPEN_ISSUES/claim_gaps.md
  MANIFEST.json
```

For paywalled items, store metadata/link and access status; do not pirate PDF. If an open license allows redistribution and local access works, optionally include PDFs with license attribution. A `.url` file should be the Windows Internet Shortcut format:

```ini
[InternetShortcut]
URL=https://doi.org/10.1371/journal.pcbi.1003833
```

Save URL percent-encoded only where necessary; preserve exact original DOI URL. Provide direct author-instruction links and the DOI landing page separately when helpful. For each `.url`, its file name encodes the source ID, function and short slug; don't rely on filename as evidence.

## Search provenance fields

`query_id, timestamp_utc, search_engine_or_index, exact_query, filters, hits_screened, candidates_added, exclusion_rationale, operator_or_tool, notes`. For systematic reviews, document records and deduplication at adequate rigor; PRISMA is a reporting guideline for relevant reviews, not a compulsory checklist for narrative essays.

## Source card (`templates/source_card.md`)

Capture title/authors/year/type/publisher/DOI, access level, content actually inspected, claim it supports, direct quotes only if truly needed, page/section/table, population and metrics, limits, indexing basis, reuse/license, relevance to your specific RQ and follow-up required. **Differentiate paper method from paper figure:** a schematic adapted from another paper must be labeled correctly; copying its empirical result into your own Figure is unacceptable.

## Automatic shortcut generation

From this portable skill root run `python scripts/build_shortcuts.py references/source_catalog.csv references/shortcuts`. For a topic-specific research ZIP, pass the new catalog. The script only builds artifacts from **catalog URLs already curated**; it does not magically search the internet or verify PDFs. See `references/reading_index.md` and `references/source_catalog.csv` for general vetted examples.

## Release checks

Verify 100% of catalog rows have unique source IDs, valid http(s) URLs, source type, access status, verification date, purpose and reuse flag. Spot open important links in a browser or web tool; confirm exact claim support; verify `journal_index_check.csv` separately. Test generated `.url` syntax. Audit ZIP paths and entries after creation. Search logs and notes must not claim actual full-text reading unless performed.
