# Playbook 01 — Intake, penetapan kontrak dan arsitektur argumen

## Input discovery

Baca berkas asli lebih dahulu, tanpa membatasi hanya pada nama file. Ringkas untuk tiap file: path/version, tipe, status dibaca, alasan relevan, metrik yang bisa diekstrak, pertentangan dengan source-of-truth lain. Pastikan file final vs draft dapat dibedakan; tanggal unggah dan nama `FINAL` saja bukan bukti finalitas.

### Intake matrix

| Field | Isi | Jika tidak ada |
|---|---|---|
| Manuscript genre | essay / KTI / empirical / report / systems / review | pilih berdasarkan brief dengan flag provisional |
| Audience/venue | reviewer akademik, panitia, jurnal | target reader sementara |
| Required outline | bab/subbab wajib | gunakan struktur genre, beri label sementara |
| Format | .docx, .md, PDF, LaTeX | ikuti permintaan terkini |
| Page limit | batas/appendix/abstract counting | jangan mengarang; tetap tulis koheren |
| Citation | IEEE, APA, Vancouver, spesifik template | default sementara tanpa klaim resmi |
| Data/protocol | raw, cleaned, instruments, model | tandai per-method status |
| Evidence | published papers, official statistics | mulai source-hunt |
| Ethics/permissions | consent, use rights, affiliations | jangan mengklaim telah diperoleh |
| Scope limits | no-training, no external datasets, time/compute | patuhi secara literal |

## Issue → question → evidence → answer map

Genre empiris:

`Problem measured → RQ/hypothesis → estimand/target quantity → independent unit → design → available data → analysis → uncertainty → interpretation → boundary`.

Genre esai argumentatif:

`Status quo/evidence → tension or competing explanations → thesis → reasons → counterevidence → qualification → implication → feasible action`.

Genre proposal:

`Problem → evidence of need → proposed mechanism → feasibility → planned validation → risks/fallback → expected contribution (not an observed result)`.

Genre systems:

`Requirement/problem → design alternative → mechanism → implementation evidence → behavior/function test → user/operational evaluation → trade-offs`.

## Section map template

| Section | Question answered | Key claim | Data/source | Figure/table/equation | Limitation | Word budget |
|---|---|---|---|---|---|---|
| Introduction | Why this exact problem? | [K...] | [C...] | optional contextual chart | local evidence may not generalize | user-specific |
| Methods | Why can design answer RQ? | [K...] | method/code | pipeline schematic | assumption | user-specific |
| Results | What was observed? | [K...] | raw output | plot + table | missing/unobserved | user-specific |
| Discussion | What do results mean? | [K...] | own data + literature | contrast if useful | inference boundary | user-specific |

**Gate:** A heading without a question or evidence function is subject to removal. Do not invent equal paragraph lengths or a universal section count.
