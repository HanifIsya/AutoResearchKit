# Playbook 04 — Methodological integrity and quantitative evidence

## Evidence chain

Determine RQ and quantity first. Statistical test, model and visualization follow from design. The minimum statistical record: independent analysis unit, n and exclusions, variable definitions, data collection/measurement, covariate availability, missingness, estimator/model, assumptions, estimand, uncertainty, multiplicity where appropriate, robustness, version and interpretation. The relation `A associated with B` should not be rewritten `A caused B` without causal design and identification.

### Quantitative / surveys

Report sampling frame, response/nonresponse, instrument validation as actually done, missingness, outliers, stratification, statistical estimand, effect size and CI if meaningful. If data are paired/grouped/time-dependent, the analysis must respect dependencies. Present p-values only with appropriate inference and never as proof of practical importance. Separate exploratory from pre-specified analyses. Denominator of every percentage is mandatory.

### ML or data science

Define `one row represents ____`, label generation, train/dev/test/fold splits, leakage risks (same person/caption/template, time, duplicates), preprocessing fitting boundaries, baseline hierarchy, metric implementation, OOF alignment, hyperparameter search budget, seeds, model config, variance, threshold/postprocessing, error taxonomy, subgroup/domain shift, calibration where needed, runtime and reproducibility. Public-leaderboard gains or validation improvements are not automatically statistically meaningful or evidence of private generalization. Never claim GPU training if only cached predictions were analyzed. Distinguish statistical metric, table of results and implementation architectural diagram.

### Qualitative

State epistemological approach, sampling/informant access, consent/privacy, interview/observation protocol, transcription, coding/analytic logic, negative/deviant cases, selection of quotes and reflexivity where pertinent. Never invent quotations or fabricated respondent demographics. Inter-rater agreement is not a universal requirement for all qualitative paradigms.

### Mixed methods

Explain *why* both strands are necessary and *where* integrated. Joint display columns: quantitative finding, qualitative evidence, convergence/divergence, integrated inference, decision or new test. A survey and several interview quotes presented separately do not constitute integrated inference.

### Systems/design-science

Map functional/nonfunctional requirements → architecture alternatives → implemented scope → behavior and quality tests → user/operational evaluation. Implementation success is not organizational impact. If testing not conducted, report evaluation plan and needed data.

### Economic, policy, market claims

Separate baseline, realized costs, forecast, assumptions, sensitivity scenarios, currencies/years and discount rate. TAM/SAM/SOM, costs avoided, budget impacts and ROI cannot be converted into observed outcomes without supporting transaction/field data. If projecting provide formula, parameter sources, and sensitivity.

## Numerical reconciliation

Maintain one `results_master.csv` or results export; figure and tables must be generated from it, rather than separately typed. For relative change use `(new - baseline)/baseline*100%` only when denominator nonzero; percentage-point differences compare two percentages by subtraction. Report units and direction (error lower is better, F1 higher is better). Distinguish SD, SE and CI, especially for clustered resampling. Inverse-check formula against actual code when model evaluation is involved.

## Equations only when useful

Introduce the quantity before the equation; number as required by venue, define symbols immediately after and explain application. For binary prediction, `F1=2TP/(2TP+FP+FN)` where zero denominators require an explicit convention. For uncertainty bands specify bootstrap unit and repeats. A complex formula that was not used in the computation is misleading decorative content.

## Required caveats examples

- `Naskah mengusulkan validasi eksternal` is a plan; it is not external validation already performed.
- `Model memiliki skor F1 0,91 pada split development` cannot assert future production precision without external evidence.
- `Sistem diproyeksikan mempercepat review` cannot be stated as saved staff-hours if no operational timed test exists.
