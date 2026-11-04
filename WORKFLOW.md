# WORKFLOW RESMI — AutoResearchKit End-to-End Run #1 (Kasus PSO)

> Dokumen ini adalah **acuan kerja tunggal** untuk seluruh proses: dari analisa kode
> machine learning, pembuatan paper (DOCX), pembuatan PPT, review loop berulang,
> sampai publikasi repo GitHub `AutoResearchKit` (MIT).
>
> Status proyek: **AKTIF** · Tanggal mulai: 2026-11-04 · Kasus uji: **PSO — Sistem
> Rekomendasi Menu Makan Harian (Particle Swarm Optimization)**

---

## 0. VISI & DELIVERABLES

**Visi**: Skill AI agent bernama **AutoResearchKit** — pengguna hanya memasukkan
(1) source file kode Python machine learning dan (2) dataset-nya; skill kemudian
menghasilkan otomatis: **paper analisa teknis (DOCX publikasi-grade)** dan
**presentation deck (PPTX)** mengikuti template referensi.

| # | Deliverable | Lokasi | Masuk repo GitHub? |
|---|---|---|---|
| D1 | Skill `autoresearchkit` (SKILL.md + references + scripts) | `skills/autoresearchkit/` | ✅ YA |
| D2 | Paper DOCX 8-bab "ANALISIS KODE MACHINE LEARNING — PSO" | `results_pso/` (lokal) | ❌ TIDAK (privat) |
| D3 | PPT deck presentasi mengikuti template Livin/TEKDUS | `results_pso/` (lokal) | ❌ TIDAK (privat) |
| D4 | Laporan audit + benchmark multi-seed CSV + figures | `results_pso/audit/` (lokal) | ❌ TIDAK (privat) |
| D5 | Repo GitHub `HanifIsya/AutoResearchKit` (MIT) | GitHub | ✅ TUJUAN AKHIR |
| D6 | Panduan instalasi skill (ml-code-analysis, graphify, ponytail, academic writing) | `docs/` | ✅ YA |

---

## 1. ATURAN PRIVASI (HARD RULE — TIDAK BISA DITAWAR)

1. **SEGALA** isi `E:\AutoResearchKit\PSO_extracted\` (kode, `resep.xlsx`,
   `hasil_rekomendasi.xlsx`, `run_log.txt`) adalah **PRIVAT**.
2. Dilarang keras melakukan `git add` / push / commit terhadap:
   - Folder `PSO_extracted/`, file `.xlsx` dataset/hasil, `run_log.txt`, dan
     paper/PPT hasil generate (`results_pso/`).
   - Nama menu, nilai gizi, atau data apapun dari dataset pengguna di dalam
     file repo. Contoh di repo hanya boleh **data sintetis buatan sendiri**
     yang ditandai jelas.
3. `.gitignore` wajib memblokir: `PSO_extracted/`, `results_*/`, `*_extracted/`,
   `*.xlsx` (kecuali template sintetis), `_work/`.
4. Repo hanya berisi: skill, script, panduan, template, dokumentasi, lisensi MIT.

---

## 2. TOOLING & INSTALASI (FASE 0)

| Komponen | Fungsi | Status |
|---|---|---|
| Python 3.13 + pypdf, python-docx, python-pptx, openpyxl, matplotlib, pandas, numpy, pygments, pywin32 | Pembuatan dokumen & analisa | ✅ Terpasang |
| MS Word + PowerPoint via COM (Office16) | Render DOCX→PDF→PNG, PPTX→PNG untuk QA visual | ✅ Terverifikasi |
| `gh` CLI (auth: HanifIsya) | Buat & push repo GitHub | ✅ Login |
| Skill **ml-code-analysis** (repo user) | Engine analisa + builder DOCX 8-bab + verifier | ✅ Di-clone → di-install ke `~/.agents/skills/ml-code-analysis` |
| Skill **graphify** (Graphify-Labs) | Knowledge graph codebase → hemat token saat menjelajah kode | ✅ Terpasang `~/.agents/skills/graphify` |
| Skill **ponytail** (DietrichGebert) | Prinsip "minimal necessary code" → hemat token pada script buatan sendiri | ✅ Terpasang `~/.agents/skills/ponytail` |
| **ACADEMIC_WRITING_SYSTEM_v3** (folder user) | Gerbang kualitas penulisan akademik (evidence classes, audit, G1–G10) | ✅ Di-extract → di-install `~/.agents/skills/evidence-grounded-academic-writing` |
| Skill bawaan ZCode `presentations:pptx` + agent `visual-judge` | PPT & QA visual per-slide | ✅ Tersedia |

**Catatan penggunaan skill hemat-token:**
- `graphify`: dijalankan sebagai CLI (`python -m graphify <folder>`) pada snapshot
  kode **salinan di `_work/`** (bukan folder privat asli) — output graph-nya
  tetap tidak masuk repo.
- `ponytail`: berlaku sebagai **gaya kerja** untuk seluruh script buatan sendiri —
  kode sekecil mungkin, reuse maksimal, tanpa over-engineering. Level diaktifkan:
  *lite* (jangan sampai mengorbankan detail deliverable yang diminta user:
  "sedetail mungkin dan sesempurna mungkin").

---

## 3. STRUKTUR DIREKTORI KERJA

```
E:\AutoResearchKit\
├── WORKFLOW.md                  ← dokumen ini (acuan tunggal)
├── PSO_extracted\               ← [PRIVAT] input kasus uji
├── _work\                       ← sandbox (clone repo, salinan kode, graph output)
│   ├── ml-code-analysis-skill\  ← clone repo skill user
│   └── pso_snapshot\            ← salinan kode PSO untuk dijalankan/dimodifikasi
├── skills\autoresearchkit\      ← [REPO] skill yang dibangun (D1)
├── docs\                        ← [REPO] panduan instalasi & usage
├── results_pso\                 ← [PRIVAT] paper, PPT, audit, figures (D2–D4)
└── .gitignore                   ← pelindung privasi
```

---

## 4. PIPELINE 8 FASE

```
FASE 1          FASE 2           FASE 3            FASE 4
INGEST    →     ANALYZE    →     PAPER (DOCX) →    REVIEW LOOP PAPER
inventory       deep-dive        8 bab + audit     (render QA + parity +
profiling       benchmark        + flowchart       numeric audit, iterasi
reproduksi      multi-seed       + simulasi        sampai 0 temuan blocker)
                 ↓                                    ↓
FASE 8          FASE 7           FASE 6            FASE 5
REPO PUSH ←     FINAL QA   ←     PPT DECK    ←     REVIEW LOOP PPT
GitHub+MIT      checklist        (template         (visual judge per-slide,
+ README        + handoff        Livin/TEKDUS)     iterasi sampai pass)
```

### FASE 1 — INGEST & REPRODUKSI
1. Inventory lengkap: file (baris, fungsi, kelas, dependensi), dataset (sheet,
   baris, kolom, tipe, missing, rentang nilai), log eksekusi.
2. Salin kode ke `_work/pso_snapshot/` (sandbox). Reproduksi eksekusi dengan
   seed terkontrol (baseline tidak ber-seed → diukur juga variabilitas antar-run).
3. Profil kebutuhan gizi + hasil PSO dari run asli dipertahankan sebagai
   **ground truth** (OBSERVED). Semua angka di paper harus bisa dilacak ke sini.
4. **Gerbang**: tabel inventory lengkap + run reproduksi berhasil.

### FASE 2 — ANALYZE (engine: ml-code-analysis)
1. Alur baca kode: eksekusi flow string, ruang solusi `S = ∏ N_k`, properti
   algoritma (stokastik, dimensi 14, 100 partikel, 200 iterasi, LVIW).
2. Deep-dive per modul (4 file, ±596 baris) dengan blok kode terverifikasi.
3. Simulasi numerik 7 langkah dengan angka nyata (studi kasus sesuai run asli).
4. Flowchart resolusi tinggi (≥2400 px, 300 DPI) via matplotlib.
5. Temuan fungsional / teknis / dataset + klasisitas evidence
   (`OBSERVED | EXTERNAL_VERIFIED | ASSUMPTION | PLANNED`).
6. Patch kandidat (fix `fitness=inf`, tie-breaker RMSE, seed, dedup) +
   **benchmark empiris baseline vs patched ≥5 seed** (benar-benar dijalankan).
7. **Gerbang**: semua temuan punya bukti OBSERVED; benchmark CSV jadi.

### FASE 3 — PAPER DOCX (8 bab, builder ml-code-analysis)
Struktur wajib: Title Page → DAFTAR ISI → ALUR BACA KODE → ANALISA KODE →
HASIL EKSEKUSI → DIAGRAM ALUR + CONTOH PENGERJAAN → EVALUASI & TEMUAN →
EVALUASI LANJUTAN & REKOMENDASI → KESIMPULAN.
Ditulis dengan disiplin `ACADEMIC_WRITING_SYSTEM_v3`: bahasa Indonesia ilmiah
natural, klaim↔bukti 1↔1, tanpa fabrikasi, tabel/gambar selalu dirujuk &
ditafsirkan.
**Gerbang**: DOCX jadi + `verify_analysis_report.py` 100% parity kode.

### FASE 4 — REVIEW LOOP PAPER (berulang, tidak ada batas iterasi)
- **A. Verifikasi paritas kode**: script verify (snippet == source, byte-ke-byte).
- **B. Audit angka**: semua angka di teks/tabel/gambar dicocokkan ke benchmark CSV
  & run log (recompute independen).
- **C. QA render**: DOCX → PDF (Word COM) → PNG per halaman; periksa TOC vs
  paginasi fisik, tabel terpotong, caption yatim, margin, whitespace.
- **D. Visual judge** (agent) pada halaman kunci; temuan → perbaiki → render ulang.
- Loop berhenti hanya saat: 0 temuan blocker, semua gate G1–G10 lolos.

### FASE 5 — PPT DECK (template referensi: Livin + TEKDUS)
1. Ekstrak desain bahasa template: render halaman kunci PDF referensi → PNG,
   pelajari palet, tipografi, pola layout (cover tim, exec summary, analisa,
   metodologi, hasil, arsitektur, roadmap, kesimpulan, referensi, appendix).
2. Konten deck PSO (~16–20 slide, 16:9): Cover → Ringkasan Eksekutif → Latar
   Belakang/Masalah → Data & Metodologi → Arsitektur Pipeline (flowchart) →
   Hasil Eksekusi → Temuan → Benchmark & Rekomendasi → Roadmap → Kesimpulan →
   Terima kasih + Referensi.
3. Grafik slide dibuat dari angka benchmark nyata (matplotlib → PNG 300 DPI).
4. Dibangun via `python-pptx` mengikuti skill `presentations:pptx`.
**Gerbang**: deck jadi, konsisten template, angka sinkron dengan paper.

### FASE 6 — REVIEW LOOP PPT
- Render PPTX → PNG (PowerPoint COM) → **visual judge** per slide (agent).
- Kriteria: tak ada teks overflow/terpotong, kontras cukup, layout sejajar,
  grafik terbaca, konsistensi palet & font, tiap angka sinkron dgn paper.
- Iterasi perbaikan sampai semua slide PASS.

### FASE 7 — FINAL QA & HANDOFF
- Checklist release (SKILL.md v3 G1–G10 diadaptasi): scope, provenance, angka,
  gambar, teks, render, reproducibility, handoff.
- `PROJECT_HANDOFF_LATEST.md` + `NEXT_CHAT_PROMPT.md` di results (lokal).
- Pilih subset generik skill yang aman → siapkan repo.

### FASE 8 — REPO GITHUB `AutoResearchKit`
1. `git init` di `E:\AutoResearchKit` dengan `.gitignore` privasi (§1).
2. Struktur repo: `README.md` (panduan lengkap ID), `LICENSE` (MIT), `skills/`,
   `scripts/`, `docs/` (INSTALL, USAGE, WORKFLOW salinan generik),
   `examples/` (data sintetis ditandai), `CHANGELOG.md`.
3. Commit progresif per fase (message jelas) → `gh repo create HanifIsya/AutoResearchKit --public --source . --push`.
4. Verifikasi akhir: `git status` bersih, tidak ada file privat di history,
   README menuntun instalasi dari nol, badge lisensi MIT.

---

## 5. GERBANG KUALITAS (adaptasi G1–G10)

| Gate | Kondisi lolos |
|---|---|
| G1 Scope | Semua bab paper & slide rencana terisi, tidak ada yang dilewati diam-diam |
| G2 Provenance | Setiap angka/klaim → sumber OBSERVED (run log / benchmark CSV / kode) |
| G3 Design | Kesimpulan tidak melebihi desain (no klaim kausal dari optimasi) |
| G4 Numbers | Angka konsisten antar teks, tabel, gambar, dan CSV sumber |
| G5 Figures | Flowchart & grafik ≥300 DPI, ber-unit, ber-caption mandiri |
| G6 Text | Bahasa Indonesia ilmiah natural, tanpa pola template AI yang kaku |
| G7 Venue | Format mengikuti struktur 8-bab skill user + template deck referensi |
| G8 Reproducibility | Benchmark bisa diulang (script + seed tercatat) |
| G9 Render | QA visual semua halaman/slide lolos tanpa temuan blocker |
| G10 Handoff | Handoff + repo bersih; tidak ada data privat bocor |

## 6. DEFINITION OF DONE (SAYA DIANGGAP SELESAI HANYA JIKA…)

1. Paper DOCX 8-bab lengkap, lolos parity 100%, lolos render QA & visual judge.
2. PPTX deck mengikuti template referensi, lolos visual judge semua slide.
3. Benchmark empiris ≥5 seed dijalankan nyata, hasil masuk paper & PPT.
4. Repo `HanifIsya/AutoResearchKit` publik, MIT, README panduan instalasi
   lengkap, **nol file privat** (dicek `git log --stat` + `git ls-files`).
5. Skill `autoresearchkit` terdokumentasi sehingga agent lain bisa mengulang
   seluruh pipeline hanya dari repo.
6. Semua gerbang G1–G10 hijau.
