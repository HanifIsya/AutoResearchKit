# 06 — Review Loop & Gerbang Kualitas (Fase 4 & 6)

Prinsip: **loop berulang sampai lolos, bukan satu kali review.** Setiap
temuan blocker diperbaiki lalu seluruh rantai verifikasi dijalankan ulang
(rebuild → render → cek) karena perbaikan bisa menggeser paginasi/layout.

## Fase 4 — Review loop paper

| Langkah | Alat | Lolos bila |
|---|---|---|
| A. Paritas kode | `scripts/verify_analysis_report.py` | `VERIFICATION PASSED (100% Code Parity)`, 0 mismatch |
| B. Audit numerik | `scripts/numeric_audit.py` + `claims_naskah.json` | 0 MISMATCH (semua angka naskah = sumber OBSERVED) |
| C. QA render | `render_docx_pdf.py` → `render_pdf_png.py` → inspeksi PNG | tanpa overflow, caption yatim, tabel terpotong, halaman kosong abnormal |
| D. TOC stabil | dua-pass build + assert | `pass2 == pass1: True` |
| E. Visual judge | agent visual-judge (atau inspeksi mandiri bila tidak tersedia) | semua halaman PASS |

## Fase 6 — Review loop PPT

1. `render_pptx_png.py` → PNG per slide.
2. Cek tiap slide: overflow teks, kontras, perataan, konsistensi palet,
   label chart benar (desimal tidak terbulatkan), tidak menimpa footer.
3. Perbaiki → rebuild → render ulang → cek ulang. Ulangi sampai semua slide PASS.

## Contoh temuan nyata yang tertangkap loop (run PSO, 2026-11)

1. Blok kode 100 baris melampaui tinggi halaman → header orphan + body
   terpotong → solusi: pecah blok >45 baris.
2. Baris sumber 112 karakter wrap keluar kotak gelap → solusi: Consolas +
   auto font-size 8pt + sel 7,03 in.
3. Caption duplikat (`Gambar 1. Gambar 1.`) → builder menambah prefix sendiri.
4. Label chart PowerPoint membulatkan 0,7 → "1" → `dataLabelFormatCode`.
5. Angka metadata salah (431 vs 421 baris dataset) → tertangkap audit numerik.

## Gerbang G1–G10

| Gate | Kondisi |
|---|---|
| G1 Scope | semua bab & slide terisi |
| G2 Provenance | tiap angka → sumber OBSERVED |
| G3 Design | kesimpulan ≤ desain eksperimen |
| G4 Numbers | konsisten teks↔tabel↔gambar↔CSV |
| G5 Figures | ≥300 DPI, ber-unit, caption mandiri |
| G6 Text | bahasa natural, tanpa pola AI kaku |
| G7 Venue | struktur 8 bab + template deck pengguna |
| G8 Reproducibility | benchmark dapat diulang |
| G9 Render | QA visual lolos tanpa blocker |
| G10 Handoff | repo bersih + handoff lengkap |
