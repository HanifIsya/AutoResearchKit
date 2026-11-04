# Playbook 08 — Multirole adversarial audit and release gates

## Reviewer passes (must happen in this order)

**A: Destructive logic:** Could the central conclusion be invalid with the same data? Is the comparison fair? Are unit, split, mechanism and generalization assumptions defensible? Is data selection post-hoc? Does a headline novelty merely rename a known method? Could a reader reproduce figure and table values? For essays, does counterargument meaningfully stress the thesis rather than a straw man?

**B: Backward evidence audit:** Work backward for each main conclusion: `conclusion → discussion → results → estimator/model → dataset/protocol/source`. Mark missing links as *critical*, *major* or *minor*. Verify actual evidence cited and that it supports exact direction and magnitude of claim. Handle correction/retraction status where applicable.

**C: Compression and natural style:** Remove redundant transitions, praise words, repetitive triads, vague “significantly”, repeated table values, irrelevant frameworks and citations pasted as decoration. Preserve all necessary limitations and numerical metadata. After style edit recheck changes didn't strengthen claims.

## Severity and acceptance

| Severity | Example | Action |
|---|---|---|
| Critical | nonexistent paper, fabricated data, wrong scoring, leakage invalidating central result | remove/recompute claim; release as working draft only until fixed |
| Major | citation only partially supports main number, no relevant baseline, journal-fit mismatch, unverified central chart | revise/restrict conclusion and document outstanding action |
| Minor | awkward transition, label typo, style inconsistency, dangling figure reference | repair + check affected part |

## Audit table

`finding_id, document_section, quoted_problem, severity, exact_evidence, impact_on_claim, correction, recheck_method, status`. Report meaningful strengths and remaining uncertainty as well as defects. Do not convert subjective audit score into admission probability.

## Validation and confidentiality

Check not only textual correctness but `data/sources permission`, research approvals when applicable, pseudonymization, confidential business information, copyright of figures, authorship and generative AI disclosure as specified by publisher/organizer. AI assistant is not an author; researchers own responsibility for claims and permissions. No fabricated researcher signatures or ethics approvals.

## Release envelope

`MANUSCRIPT_FINAL.docx`, `MANUSCRIPT_FINAL.md` (if requested), `assets/` (data-derived images and their source scripts), `evidence/`, `REFERENCES_<topic>.zip`, `AUDIT_REPORT.md`, `PROJECT_HANDOFF_LATEST.md`, `NEXT_CHAT_PROMPT.md`, `MANIFEST.json`. Don't include enormous raw data or private files without user instruction and sharing rights. All report conclusions remain within observed findings, not unfounded future operational impact.
