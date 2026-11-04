# 04 — Fase 3: Paper DOCX (8 Bab)

Bangun dengan `scripts/ml_docx_builder.py` (class `MLReportDocx`):

```python
import sys; sys.path.insert(0, "skills/autoresearchkit/scripts")
from ml_docx_builder import MLReportDocx
b = MLReportDocx()
b.add_title_page("ANALISIS KODE MACHINE LEARNING", "<subjudul>", "<metadata>")
b.doc.add_page_break()          # DAFTAR ISI di halaman sendiri
b.add_toc_header()
b.add_toc_entry(0, "ALUR BACA KODE", 3)   # nomor halaman fisik (dua-pass)
b.h1("ALUR BACA KODE"); b.h2("..."); b.para("..."); b.callout(...)
b.code_block("app.py line 10-29", src_text_exact)   # WAJIB persis = sumber
b.table_caption(1, "..."); b.data_table(headers, rows, col_widths)
b.figure(path, width_in, number, caption)
b.save("results_<nama>/ANALISIS KODE MACHINE LEARNING - <nama>.docx")
```

## Struktur 8 bab

1. Title page → 2. DAFTAR ISI → 3. ALUR BACA KODE → 4. ANALISA KODE
(inventaris + deep-dive per modul) → 5. HASIL EKSEKUSI →
6. DIAGRAM ALUR + CONTOH PENGERJAAN LENGKAP (new page) →
7. EVALUASI DAN TEMUAN → 8. EVALUASI LANJUTAN & REKOMENDASI (new page:
metrik domain, baseline, patch runnable, benchmark multi-seed, roadmap
P1–P3) → 9. KESIMPULAN.

## Aturan penting yang terbukti di lapangan

- **Paritas kode**: teks blok harus identik byte-per-byte dengan
  `file.py line A-B`. Verifier: `scripts/verify_analysis_report.py`.
  Builder sudah dipatch: `PythonLexer(stripnl=False)` + baris kosong =
  paragraf kosong + font Consolas auto (9pt ≤84 karakter, 8pt >84)
  + sel kode 7,03 in. Blok >45 baris dipecah jadi beberapa blok agar
  `cantSplit` tidak menciptakan ruang kosong/orphan header.
- **Header blok patch** (kode usulan, bukan kutipan sumber) jangan memuat
  pola `file.py line A-B` agar tidak ikut diverifikasi; format yang aman:
  `Patch v2a — hitung_fitness (pso.py, ganti baris 49–52)`.
- **TOC dua-pass**: build (nomor 0) → render PDF → ekstrak halaman fisik
  tiap judul (mulai cari SETELAH halaman TOC) → build ulang → render →
  assert stabil.
- **Angka**: satu sumber kebenaran (audit JSON/CSV); audit numerik akhir
  dengan `scripts/numeric_audit.py`.
- Bahasa Indonesia ilmiah natural; klaim↔bukti 1↔1; tabel/gambar selalu
  dirujuk dan ditafsirkan; caption di bawah gambar, di atas tabel.
