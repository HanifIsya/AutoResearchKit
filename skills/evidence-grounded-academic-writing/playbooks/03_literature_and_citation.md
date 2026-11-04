# Playbook 03 — Evidence architecture, citation entailment and literature synthesis

## Literature matrix, not an annotated bibliography only

One row per selected study: `source_id, concept, context/population, sample/unit, task/RQ, design, intervention/comparator, evaluation_metric, outcome, uncertainty, assumptions, limitation, directness, similarity_to_this_work, citation_claim`. Several papers on the same subject can still use non-comparable evaluation definitions; avoid naive ranking by their reported percentages.

Write literature in thematic contrasts. Example (illustrative placeholders):

> Penelitian kelompok A mengevaluasi [metode] pada [unit dan domain], sedangkan kelompok B menggunakan [desain berbeda]. Perbedaan tingkat [indikator] tidak dapat langsung dinilai sebagai keunggulan metode karena [data/split/denominator] tidak sama. Oleh karena itu, penelitian ini menguji [RQ] pada [unit] dengan [baseline dan pemisahan yang ditentukan].

Never paste placeholders as findings in final. Distinguish claims supported by original articles from synthesis-level interpretation.

## Three linked ledgers

1. **Claim ledger**: claim ID, manuscript location, epistemic type, maximum claim, evidence file/source, locator, verification status, alternative explanations, action.
2. **Citation entailment ledger**: citation ID, source identity, direct/partial/none entailment, scope match, metadata fidelity, access level, quote/paraphrase locator, retention decision.
3. **Reference list**: de-duplicated bibliographic records mapped to final in-text citations; automatically renumber for IEEE by **first appearance**; don't leave orphan bibliography entries.

Examples of bad matching:

- A paper reporting satisfaction supports `participants rated usability positively` but not `learning outcomes improved`.
- A model's OOF score cannot be supported by a generic BERT paper. Cite your experiment/table; cite BERT paper for the underlying architecture only.
- Dataset model outputs are not ground-truth labels. Submission predicted-positive distribution is not real outcome prevalence.
- Authors' risk hypothesis cannot be written as observed mechanism.
- An SJR quartile verified for one year/category does not automatically hold for another period or category.

## IEEE example grounded in verified guide (genre illustration)

Formal body: `Pautasso menjelaskan bahwa pencatatan sejak tahap pembacaan membantu membangun sintesis literatur yang terstruktur [1].` [1] should resolve to the real 2013 PLOS work, if citing that source in the actual work. In a *new manuscript*, numbering may differ; always recompute. For statistical evidence include period, denominator and primary source. Place bracket **inside normal sentence flow** near claim; do not place every reference solely at end of paragraphs containing disparate assertions.

## Academic paragraph logic

`Claim → evidence → inferential link → limit/next question`. This is an editorial check, **not** a rigid four-sentence formula. Be concrete about who/what did which action. Transition through concepts and evidence, not mechanical “Pertama… Kedua… Ketiga… Dengan demikian…” patterns. Avoid abstract opening inflation.

## Audit deep reading

From each claimed specific statistic, trace (1) paragraph, (2) paper or raw output, (3) exact table/page, (4) denominator and indicator definition, (5) exact date/population, (6) whether causal or descriptive, (7) recheck after editing. If only abstract seen, restrict use to what's actually visible and log access level. Cite primary sources when giving an individual study's results; review articles for field-wide synthesis.
