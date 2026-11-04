---
name: autoresearchkit
description: "End-to-end automated research pipeline for Machine Learning code. User provides only (1) Python ML source files and (2) datasets; this skill then ingests and reproduces the run, performs deep code analysis with empirical multi-seed benchmarking, generates a publication-grade 8-chapter Word paper (DOCX) with verified codeblocks/flowchart/numerical simulation, builds a consulting-style presentation deck (PPTX) from real results, runs iterative review loops (code parity, numeric audit, render QA, visual judging) until every quality gate passes, and can publish the reusable parts to a GitHub repo. Never includes the user's private code/datasets in any published repository."
version: 1.0.0
license: MIT
author: Hanif Isya Annafi
---

# AutoResearchKit — Analisa Kode ML → Paper DOCX → PPT, Otomatis

Skill orkestrator pipeline riset otomatis. **Input pengguna cukup: folder berisi
kode Python machine learning + dataset (+ log eksekusi bila ada).** Output:
paper teknis DOCX kualitas publikasi dan deck presentasi PPTX, keduanya
teraudit berulang sampai lolos semua gerbang kualitas.

## Kapan Skill Ini Dipakai

- Pengguna memberikan folder kode ML + dataset dan meminta "dianalisa lalu dibuatkan paper dan PPT".
- Pengguna ingin laporan analisa kode ML bergaya publikasi (8 bab) + slide presentasi dari hasil nyata.
- Pengguna ingin hasil akhir yang sudah melewati review loop berulang (bukan sekadar draft).

## Prasyarat & Instalasi Komponen

1. Python ≥3.10 dengan: `python-docx`, `python-pptx`, `openpyxl`, `pypdf`,
   `pymupdf`, `matplotlib`, `pandas`, `numpy`, `pygments`, `pywin32`
   (Windows, untuk render via Office COM).
2. Skill pendukung (lihat `docs/INSTALL.md` di repo untuk panduan lengkap):
   - **ml-code-analysis** — engine analisa + builder DOCX 8 bab + verifier
     (`scripts/ml_docx_builder.py`, `scripts/verify_analysis_report.py` ikut
     disertakan di folder `scripts/` skill ini).
   - **evidence-grounded-academic-writing** — disiplin penulisan berbasis bukti
     (kelas bukti `OBSERVED / EXTERNAL_VERIFIED / ASSUMPTION / PLANNED`,
     audit klaim↔bukti, G1–G10).
   - **graphify** (opsional, hemat token) — knowledge graph codebase.
   - **ponytail** (opsional, hemat token) — prinsip kode minimal untuk script
     buatan sendiri. Jangan sampai mengorbankan kelengkapan deliverable.
3. Windows + Microsoft Office terpasang (Word & PowerPoint) untuk render QA
   visual. Di Linux/macOS, gunakan LibreOffice headless sebagai pengganti COM.

## ATURAN PRIVASI (HARD RULE)

1. Kode & dataset pengguna adalah **privat**. Tidak boleh masuk repo, commit,
   push, atau contoh dokumentasi dalam bentuk apa pun.
2. Semua pekerjaan pada kode pengguna dilakukan di folder sandbox lokal
   (`_work/`); semua deliverable hasil (paper, PPT, audit, figure) disimpan di
   folder hasil lokal (`results_<nama>/`) yang berada di luar repo atau
   diblokir `.gitignore`.
3. Repo publik hanya berisi skill, script generik, dokumentasi, dan contoh
   **data sintetis** yang ditandai jelas.

## Pipeline 8 Fase

```
FASE 1        FASE 2         FASE 3          FASE 4
INGEST   →    ANALYZE   →    PAPER DOCX →    REVIEW LOOP PAPER
inventory      deep-dive      8 bab +         parity + numeric audit +
profiling      benchmark      flowchart +     render QA + visual judge
reproduksi     multi-seed     simulasi        (iterasi sampai 0 blocker)
                ↓                              ↓
FASE 8        FASE 7         FASE 6          FASE 5
REPO     ←    FINAL QA  ←    REVIEW     ←    PPT DECK (template
GITHUB+MIT    checklist      LOOP PPT        referensi pengguna)
+ README      + handoff      (visual judge)
```

### FASE 1 — Ingest & Reproduksi
1. Inventory: file (baris, fungsi, kelas, dependensi), dataset (sheet, baris,
   kolom, tipe, missing, rentang), log eksekusi.
2. Salin kode ke sandbox; jalankan ulang dengan seed terkontrol (jika kode
   tidak ber-seed, injeksikan `np.random.RandomState(seed)` dari luar dan
   catat itu sebagai temuan reproducibility).
3. Rekonstruksi profil input yang menghasilkan log asli (verifikasi angka
   kunci cocok 1↔1). Angka log asli = ground truth `OBSERVED`.
4. Gerbang: tabel inventory + run reproduksi berhasil tersimpan JSON/CSV.

### FASE 2 — Analisa & Benchmark
1. Alur baca kode, ruang solusi `S = ∏ N_k`, properti algoritma.
2. Deep-dive per modul; kumpulkan snippet kode + nomor baris terverifikasi.
3. Simulasi numerik 7 langkah dengan angka nyata dari run asli.
4. Flowchart ≥2400 px (300 DPI) via matplotlib.
5. Temuan fungsional/teknis/dataset; tiap temuan berbukti `OBSERVED`.
6. Rancang patch (mis. fitness cap mengganti `inf`, tie-break metrik sekunder,
   seed, velocity clamp) → **benchmark empiris baseline vs patched ≥5–10 seed**,
   jalankan sungguhan, simpan CSV + kurva konvergensi.
7. **Iterasi patch**: jika patch menurunkan metrik kunci, revisi desain dan
   benchmark ulang (laporkan versi patch sebagai ablation). Jujur terhadap
   hasil negatif.
8. Gerbang: semua temuan berbukti; benchmark CSV + ringkasan statistik jadi.

### FASE 3 — Paper DOCX (8 bab)
Gunakan `scripts/ml_docx_builder.py` (class `MLReportDocx`). Struktur:
Title Page → DAFTAR ISI → ALUR BACA KODE → ANALISA KODE → HASIL EKSEKUSI →
DIAGRAM ALUR PROSES DAN CONTOH PENGERJAAN LENGKAP (new page) → EVALUASI DAN
TEMUAN → EVALUASI LANJUTAN DAN REKOMENDASI PERBAIKAN (new page) → KESIMPULAN.
Tulis dengan disiplin evidence-grounded: klaim↔bukti 1↔1, bahasa Indonesia
ilmiah natural, tabel/gambar selalu dirujuk & ditafsirkan, tanpa fabrikasi.
Gerbang: parity 100% via `scripts/verify_analysis_report.py`.

### FASE 4 — Review Loop Paper (berulang sampai lolos)
- A. Paritas kode (verifier).
- B. Audit angka: cocokkan setiap angka di teks/tabel/gambar ke CSV/JSON sumber.
- C. Render QA: DOCX→PDF (Word COM, `scripts/render_docx_pdf.py`)→PNG
  (`scripts/render_pdf_png.py`); cek TOC vs paginasi, tabel terpotong, caption
  yatim, margin.
- D. Visual judge (agent) halaman kunci. Loop sampai 0 temuan blocker.

### FASE 5 — PPT Deck (template referensi pengguna)
1. Pelajari template referensi: render halaman kunci → PNG → ekstrak palet,
   tipografi, pola layout (cover, exec summary, analisa, metodologi, hasil,
   arsitektur, roadmap, kesimpulan, referensi).
2. Bangun deck 16:9 via `python-pptx` (ikuti skill `presentations:pptx`),
   16–20 slide; grafik dari angka benchmark nyata (matplotlib 300 DPI).
3. Gerbang: angka sinkron dengan paper.

### FASE 6 — Review Loop PPT
Render PPTX→PNG (`scripts/render_pptx_png.py`) → visual judge per slide →
perbaiki → ulangi sampai semua slide PASS (tanpa overflow, kontras cukup,
layout sejajar, konsistensi palet).

### FASE 7 — Final QA & Handoff
Checklist gerbang G1–G10; tulis `PROJECT_HANDOFF_LATEST.md` +
`NEXT_CHAT_PROMPT.md` di folder hasil; pilih subset generik yang aman untuk repo.

### FASE 8 — Publikasi Repo
`git init` + `.gitignore` privasi → commit progresif per fase →
`gh repo create <user>/<nama-repo> --public --source . --push` → verifikasi
`git ls-files` bebas file privat → README panduan instalasi + LICENSE MIT.

## Gerbang Kualitas G1–G10

| Gate | Kondisi lolos |
|---|---|
| G1 Scope | Semua bab/slide rencana terisi; tidak ada yang dilewati diam-diam |
| G2 Provenance | Tiap angka/klaim → sumber OBSERVED (log/CSV/kode) |
| G3 Design | Kesimpulan tidak melebihi desain eksperimen |
| G4 Numbers | Angka konsisten antar teks, tabel, gambar, CSV sumber |
| G5 Figures | ≥300 DPI, ber-unit, caption mandiri, dirujuk teks |
| G6 Text | Bahasa ilmiah natural; tanpa pola template AI yang kaku |
| G7 Venue | Struktur mengikuti skill analisa + template deck pengguna |
| G8 Reproducibility | Benchmark bisa diulang (script + seed tercatat) |
| G9 Render | QA visual semua halaman/slide lolos tanpa temuan blocker |
| G10 Handoff | Handoff + repo bersih; nol kebocoran data privat |

## Anti-Pola (Jangan Pernah)

- Melaporkan hasil benchmark yang tidak benar-benar dijalankan.
- Membiarkan `fitness=inf`/metrik tak-diskriminatif tanpa komentar kritis.
- Memasukkan data/kode pengguna ke repo publik "sekadar sebagai contoh".
- Menyebut langkah sudah dilakukan padahal belum (mark `PLANNED`).
- Berhenti di review pertama — loop sampai semua gerbang hijau.
