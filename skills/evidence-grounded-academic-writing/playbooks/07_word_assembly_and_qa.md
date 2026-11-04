# Playbook 07 — Publication-grade DOCX / MD / PDF production

## Reconcile rules before applying layout

Read the user-provided *actual* Word template and instructions. Identify page size, margins, body font, headings, caption style, number of columns, header/footer, limits, reference style, appendix page counting and accessibility rules. Do not apply ACTION-like two-column layouts to thesis, essays, or journals that require another format. When a specific rule is absent, use a consistent readable default and label it a design choice, not an organizer requirement.

## Word document production contract

- Use native **paragraph styles** for Title, Heading 1–3, Normal, Caption, Bibliography; avoid formatting every paragraph manually.
- Use true table objects with controlled width, alignment and header repeat; use caption above for tables and below for figures only if appropriate to venue.
- For journal two-column layouts, be careful with full-width figures/tables and section breaks; avoid empty trailing pages and unexpected column switching.
- Equations should use genuine mathematical objects when possible; always verify operators/superscripts and right-aligned numbering after rendering.
- Insert genuine figure assets with suitable resolution and retain a data/source file; avoid screenshots of Excel cells where editable tables would work.
- Maintain stable citations with reference manager or an explicit citation map; recheck renumbering after structural edits.
- Use page numbering and section headings consistently. Include metadata only when required; avoid disclosing unpublished personal details unnecessarily.
- Ensure alt text/meaningful descriptions, accessible heading hierarchy and readable figure labels where compatible with venue.

## Render / inspect / revise — **required**

1. Save `draft.docx`.
2. Render every page to PNG or PDF via an available renderer (e.g. LibreOffice or the platform's document renderer).
3. Inspect **all pages** at final output scale. Check cropped content, overflow, table split, orphan/widow headings, caption detached from object, formula clipping, too-tiny visual labels, inconsistent indent and source notes, wrong reading order and huge whitespace.
4. Audit text/search for leftover `TODO`, internal instructions, `[PLACEHOLDER]` that should not remain and unintended `##` Markdown or broken bullet symbols.
5. Fix issues, render again, check from page 1 to final page, not just one sample page.
6. Record render tool, page count, date, number of pages inspected and unresolved defects. Do not state a visual inspection occurred if it did not.

## Manuscript versus audit separation

`manuscript.docx/md` is reader-facing. `source_ledger.csv`, `search_log.csv`, `review_findings.csv`, `notes.md`, `project_handoff.md` are internal. If there is a genuine unresolved missing figure in a **working** manuscript, use a precise explicit placeholder; do not make it look camera ready. In the **final submission** no unresolved critical placeholder may be silently hidden.

## Tables, notes, and crossreferences

Always introduce in body before or around first appearance: `Tabel 2 merangkum...`, `Gambar 4 memperlihatkan...`, `Persamaan (3) menghitung...`. Caption plus narrative must carry independent functions. Notes under a table indicate definitions, sample, tests and source, never essay-style paragraphs. Never assume table numbering conventions across venues; IEEE, APA and contest guides can differ.

## Final integrity test

- Count tables/images/citations in file and compare registry.
- Search output text for all major values/names; sample spot-check against results_master and claim ledger.
- Verify PDF/Word text extraction has correct ordering in multi-columns if file is PDF-bound.
- Check that all links in release reply correspond to files actually produced and ZIP archives pass integrity test.
