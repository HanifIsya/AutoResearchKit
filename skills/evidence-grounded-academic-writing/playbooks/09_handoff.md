# Playbook 09 — New chat, new project, no memory dependency

## Hand-off requirement

A new chat is not guaranteed to retrieve old files, working directories, prior messages or state. Create `PROJECT_HANDOFF_LATEST.md` after every meaningful milestone. If the user wants to transfer to another account/project, ensure the ZIP contains all *shareable* sources, final numeric outputs, constraints and a precise file map. Past chat assumptions should not supersede included actual evidence. Never silently include private client records, unpublished data or personal contact details.

## Contents of handoff

- Scope, target, venue and version; updated date.
- Binding decisions and justification, including changes since last run.
- File inventory with exact paths and checksums for critical outputs.
- Dataset/code/source/analysis lineage; unit of observation, evaluation split, data limitations.
- Result table with evidence status, source files, version, units and uncertainty.
- Source catalog and literature matrix with access/verification statuses.
- Table/figure/equation registry, open placeholders, expected layout.
- Completed checks and **checks not performed**.
- Severity-ranked issues and next actions.
- Continuation prompt that refers to included handoff, not to imagined previous conversation.

## New-chat prompt example

`Ini adalah kelanjutan penelitian, tetapi jangan mengandalkan chat lain. Pelajari ZIP proyek dan SKILL.md, utamakan PROJECT_HANDOFF_LATEST.md, MANIFEST, evidence ledger dan data/output primer. Pertahankan semua keputusan terkunci dan perbedaan observed/planned. Tugas saat ini: [xx]. Jangan bertanya ulang fakta yang sudah ada; kerjakan semua bagian yang bisa diverifikasi dan serahkan file final beserta audit.`

## Archive hygiene

Use version tags (`v3.0.0` skill, `v2026-11-02` project), changelog, stable paths and SHA256s. Distinguish source ZIP (reference links) from evidence ZIP (data/code) and manuscript ZIP (final readers). Sanitize secrets and personal data; do not attach proprietary files unless allowed. Zip file integrity tests must pass; every linked path must exist.
