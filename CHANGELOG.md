# Changelog

Semua perubahan penting pada AutoResearchKit didokumentasikan di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/) dan versi
[SemVer](https://semver.org/).

## [1.1.0] — 2026-11-05

### Diubah (umpan balik pengguna run pertama)
- Fase 3 diredefinisi: output paper adalah **naskah akademik utuh** (Abstrak →
  Pendahuluan → Studi Terkait → Metodologi → Hasil → Pembahasan → Simpulan →
  Pustaka IEEE by first appearance → Lampiran) mengikuti
  evidence-grounded-academic-writing, dengan verifikasi literatur (8 referensi
  DOI terverifikasi) dan 3 ledger bukti (search log, literature matrix,
  citation entailment) — menggantikan format "laporan analisa kode 8 bab".
- Deck direvisi ke fidelitas template referensi: cover terang, Montserrat,
  panel ber-border biru, section bar dua-tona, badge kanan-atas.
- `references/04` ditulis ulang (panduan naskah akademik + pelajaran
  persamaan: jangan tab-stop + justification).

## [1.0.0] — 2026-11-04

### Ditambahkan
- Skill `autoresearchkit`: SKILL.md (pipeline 8 fase) + 7 dokumen references
  + 6 script (builder DOCX, verifier paritas, audit numerik, 3 renderer QA).
- Patch pada `ml_docx_builder.py`:
  - `PythonLexer(stripnl=False, ensurenl=False)` + baris kosong = paragraf
    kosong → paritas kode byte-per-byte mungkin 100%.
  - Font kode Consolas dengan auto ukuran (9pt ≤84 karakter/baris, 8pt >84)
    dan lebar sel 7,03 in → baris sumber hingga 112 karakter tak wrap keluar
    kotak.
- `numeric_audit.py` — pencocokan klaim naskah vs sumber OBSERVED.
- Renderer QA: Word COM (DOCX→PDF), PyMuPDF (PDF→PNG), PowerPoint COM
  (PPTX→PNG).
- Docs: INSTALL, USAGE, WORKFLOW (generik), PPT_TEMPLATE_GUIDE.
- Proses run pertama terdokumentasi: kasus PSO — paper 27 halaman lolos
  parity 23/23 + audit numerik 47/47; deck 15 slide lolos QA visual;
  benchmark 30 run (baseline/patch v1/patch v2 × 10 seed) dengan hasil
  patch v2 unggul seluruh metrik domain.

### Catatan desain benchmark (pelajaran run pertama)
- Patch v1 (early stopping + Vmax 10%) menurunkan success rate 0,7→0,4 —
  dilaporkan sebagai ablation; patch v2 (cap + tie-break + seed + Vmax 20%,
  tanpa early stop) unggul seluruh metrik.
