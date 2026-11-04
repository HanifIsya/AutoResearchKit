# Playbook 06 — Tables, figures, captions, equations, source notes, appendices

## Functional display selection

| Reader's question | Preferred display | Quality check |
|---|---|---|
| How much and in what categories? | Table, sorted bar, prevalence plot | n and denominator clear |
| How does an outcome change over time? | Time series line | no fake evenly spaced dates |
| What is the spread and outliers? | box/violin/ECDF/raw points | sample size, scale and units |
| How different are models/treatments? | estimates + uncertainty/forest | same evaluation protocol |
| Which errors matter? | confusion matrix, FP/FN, error taxonomy | validated labels, no misclassification of unlabeled data |
| What mechanism/architecture was implemented? | labelled process flow, diagram | distinguish design from executed implementation |
| What is the literature landscape? | evidence map/comparison table | source IDs, incomparable metrics flagged |
| How was a systematic review screened? | PRISMA flow, when design appropriate | counts from real screening |
| How sensitive is forecast to assumptions? | scenario tornado or uncertainty plot | explicit scenarios, not observed effects |

## Table contract

Every table needs: numbered title **above** if target venue asks; column definitions; unit/denominator/time; note on missing/rounding; source/provenance; statistical uncertainty where useful; consistent decimal precision. Avoid vertical lines unless a template requires them. Repeat header if broken across pages. Do not transcribe all table values into the narrative: identify most important pattern and its implications. Use supplementary/appendix for long hyperparameter or subgroup matrices, but never hide primary contradictory results.

### Example — illustration, not empirical results

**Tabel 1.** Contoh hipotetis perbandingan dua konfigurasi pada evaluasi yang sama (nilai simulasi, bukan eksperimen).

| Konfigurasi | F1 | n validasi | Status |
|---|---:|---:|---|
| Baseline ilustratif | 0,71 | 100 | Simulasi |
| Kandidat ilustratif | 0,74 | 100 | Simulasi |

**Catatan:** Perbedaan 0,03 hanya menunjukkan cara menulis perbandingan; tidak memberi dasar klaim signifikan karena pasangan prediksi, variasi dan interval tidak tersedia.

## Figure contract

`Figure ID, research question, source data, source file/hash, display type, axis, unit, n, denominator, statistical uncertainty, version, caption, manuscript reference, reuse license, review status`. Include a plain-text description/alt text for meaningful nondecorative figures. Avoid using color as only distinguisher; verify contrast, axis origin and log scales. Export SVG/vector or ≥300dpi raster when compatible with venue. Use consistent font size that remains legible in final column width. Data graphics cannot be generated accurately by a text-to-image illustration tool; use plotting from data.

### Example captions

**Gambar 1.** Distribusi jumlah label per sampel pada data pengembangan (n = [terverifikasi]). Sumbu vertikal menyatakan proporsi sampel. Sumber: hasil penghitungan dari `[file/versi]`. Catatan: kelas tanpa label positif tetap dihitung dalam denominator.

**Gambar 2.** Alur pemrosesan dokumen dari masukan hingga keluaran tervalidasi. Garis penuh menandakan komponen yang telah diimplementasikan; garis putus-putus menunjukkan komponen yang masih direncanakan. Sumber: rekonstruksi dari `[kode/arsitektur]`.

**Gambar 3.** [Judul Fig. X paper terverifikasi], diadaptasi dari [sitasi], [nomor halaman/gambar], sesuai izin/lisensi [status]. Jika lisensi belum jelas: gunakan `[PLACEHOLDER DIAGRAM ASLI: jelaskan konsep dengan rancangan orisinal, tanpa menyalin sumber]`.

## Narrative reference, interpretation and note placement

Narrative: `Pada Gambar 2, langkah validasi manusia berada setelah pemeringkatan kandidat, sehingga jalur produksi tidak identik dengan prediksi otomatis. Prosedur ini mengurangi ruang keputusan tanpa pengawasan, tetapi dampaknya terhadap waktu pemeriksaan belum diukur.` This is a structure example; only use as a true implementation claim if proven by code.

Caption states *what* is shown. The paragraph states *why* it matters and the limit. A `Source:` note identifies evidence. A `Notes:` note clarifies abbreviations, unit, denominator or exceptions. Editorial note (internal only) records pending work and must not leak into the final manuscript. Footnotes should not be used to carry crucial design assumptions excluded from Methods.

## Equation system

Keep consistent symbol definitions, typographic treatment, numbering and references. For F1:

\[F_1 = \frac{2TP}{2TP+FP+FN}.\tag{1}\]

Define TP/FP/FN and handling when denominator is zero. If this formula differs from actual scoring (e.g. class-balanced macro or multi-label averaging), write the **real** formula instead. Numbered equations should be implemented in Word native math if supported; a static bitmap of maths is fallback only with legibility and accessibility verified. Figure/table/equation numbering follows venue and order of appearance, not arbitrarily inherited from another document.

## Appendix decision rule

Main body contains decisions that determine validity and results needed to answer RQ. Appendices contain reproducibility detail: search strings, protocol, raw/extended tables, feature definitions, parameter search, instrument, extra robustness plots, open issues. Refer to exact appendix IDs from body (e.g. `Lampiran A.2`), maintain bidirectional links where viable. Appendices are not automatically excluded from contest page count.
