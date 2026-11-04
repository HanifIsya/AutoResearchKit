# AutoResearchKit 🧪→📄→📊

**Skill AI agent untuk pipeline riset otomatis:** Anda hanya memasukkan
**(1) kode Python machine learning** dan **(2) dataset** — AutoResearchKit
menghasilkan **paper teknis DOCX kualitas publikasi (8 bab)** dan
**presentation deck PPTX** lengkap dengan benchmark empiris, lalu men-audit
hasilnya secara berulang sampai semua gerbang kualitas lolos.

> Terinspirasi dan dibangun bersama skill
> [ml-code-analysis](https://github.com/HanifIsya/ml-code-analysis-skill) —
> engine analisa kode ML milik penulis.

---

## Pipeline 8 Fase

```
FASE 1        FASE 2         FASE 3          FASE 4
INGEST   →    ANALYZE   →    PAPER DOCX →    REVIEW LOOP PAPER
inventory      deep-dive      8 bab +         parity 100% + audit numerik
profiling      benchmark      flowchart +     + render QA + visual judge
reproduksi     multi-seed     simulasi 7      (iterasi sampai 0 blocker)
multi-seed                    langkah
                ↓                              ↓
FASE 8        FASE 7         FASE 6          FASE 5
REPO     ←    FINAL QA  ←    REVIEW     ←    PPT DECK
GITHUB+MIT    gerbang        LOOP PPT        (mengikuti template
+ README      G1–G10         per slide       referensi Anda)
```

**Prinsip utama:** tidak ada angka yang dikarang. Setiap klaim di paper & PPT
harus terlacak ke sumber `OBSERVED` (log eksekusi, benchmark CSV, baris kode
terverifikasi). Review dilakukan berulang — perbaikan memicu verifikasi ulang
seluruh rantai.

---

## Instalasi Cepat

### 1. Dependensi Python

```bash
python -m pip install python-docx python-pptx openpyxl pypdf pymupdf \
    matplotlib pandas numpy pygments
python -m pip install pywin32    # Windows: render QA via Office COM
```

### 2. Pasang skill-nya

```bash
git clone https://github.com/HanifIsya/AutoResearchKit.git
mkdir -p ~/.agents/skills
cp -r AutoResearchKit/skills/autoresearchkit ~/.agents/skills/
```

### 3. Skill pendukung (opsional tapi disarankan)

```bash
# Engine analisa + builder DOCX (sudah ikut disertakan di scripts/, ini versi originalnya)
git clone https://github.com/HanifIsya/ml-code-analysis-skill.git
cp -r ml-code-analysis-skill/skills/ml-code-analysis ~/.agents/skills/

# Hemat token: knowledge graph codebase
git clone https://github.com/Graphify-Labs/graphify.git
cp graphify/graphify/skill.md ~/.agents/skills/graphify/SKILL.md

# Hemat token: gaya kode minimal
git clone https://github.com/DietrichGebert/ponytail.git
cp ponytail/.openclaw/skills/ponytail/SKILL.md ~/.agents/skills/ponytail/SKILL.md
```

Panduan lengkap (termasuk skill penulisan akademik berbasis bukti):
**[docs/INSTALL.md](docs/INSTALL.md)** · Cara pakai: **[docs/USAGE.md](docs/USAGE.md)**

---

## Cara Pakai

Siapkan folder berisi kode + dataset, lalu minta agent Anda:

> Analisa folder `proyek_saya/` (kode Python ML + dataset) mengikuti skill
> **autoresearchkit**: reproduksi run dengan multi-seed, analisa mendalam,
> benchmark patch, buatkan paper DOCX 8 bab dan PPT presentasi, review loop
> sampai semua gerbang lolos, lalu rilis bagian generik ke repo GitHub (MIT)
> — tanpa memasukkan kode/dataset saya.

### Yang dihasilkan

| Deliverable | Isi |
|---|---|
| **Paper DOCX** | 8 bab: Alur Baca Kode → Analisa Kode (blok kode terverifikasi byte-per-byte) → Hasil Eksekusi → Diagram Alur + Simulasi Numerik 7 Langkah → Temuan → Patch + Benchmark Multi-Seed → Kesimpulan |
| **PPT Deck** | 15 slide mengikuti design language template referensi (action title, KPI box, section bar, chart native dari data nyata) |
| **Audit** | `observed_data.json`, `benchmark_multiseed.csv`, kurva konvergensi, `claims_naskah.json` (audit numerik), render PNG semua halaman/slide |
| **Figures** | Flowchart 300 DPI, grafik benchmark, motif topik |

---

## Gerbang Kualitas G1–G10

| Gate | Kondisi |
|---|---|
| G1 Scope | semua bab & slide rencana terisi |
| G2 Provenance | tiap angka → sumber OBSERVED |
| G3 Design | kesimpulan ≤ desain eksperimen |
| G4 Numbers | konsisten teks ↔ tabel ↔ gambar ↔ CSV |
| G5 Figures | ≥300 DPI, ber-unit, caption mandiri |
| G6 Text | bahasa ilmiah natural |
| G7 Venue | struktur 8 bab + template deck pengguna |
| G8 Reproducibility | benchmark dapat diulang (seed tercatat) |
| G9 Render | QA visual semua halaman/slide lolos |
| G10 Handoff | repo bersih; nol kebocoran data privat |

Verifikasi otomatis yang disertakan:

```bash
# paritas kode paper vs sumber (byte-per-byte)
python skills/autoresearchkit/scripts/verify_analysis_report.py paper.docx <folder_kode>
# audit angka naskah vs sumber OBSERVED
python skills/autoresearchkit/scripts/numeric_audit.py claims.json observed.json
# render QA
python skills/autoresearchkit/scripts/render_docx_pdf.py paper.docx
python skills/autoresearchkit/scripts/render_pptx_png.py deck.pptx
```

---

## 🔒 Privasi (Hard Rule)

AutoResearchKit dirancang untuk data yang **tidak boleh bocor**:

1. Kode & dataset pengguna **tidak pernah** masuk repo/commit/push —
   `.gitignore` bawaan memblokirnya, dan release wajib lolos
   `git ls-files` check (lihat [references/07](skills/autoresearchkit/references/07-repo-release.md)).
2. Semua modifikasi kode dilakukan pada **salinan** di `_work/`.
3. Paper, PPT, dan audit hasil analisa disimpan di `results_*/` (lokal).
4. Contoh di repo ini hanya **data sintetis** yang ditandai jelas
   (lihat [examples/](examples/)).

---

## Struktur Repo

```
AutoResearchKit/
├── skills/autoresearchkit/     # SKILL-nya (entrypoint + 7 references + 6 scripts)
├── docs/                       # INSTALL.md · USAGE.md · WORKFLOW.md · PPT_TEMPLATE_GUIDE.md
├── examples/                   # contoh input sintetis + struktur output
├── WORKFLOW.md                 # template workflow generik 8 fase
├── CHANGELOG.md
└── LICENSE                     # MIT
```

---

## Contoh Hasil Run Pertama (kasus PSO, November 2026)

Input: 4 modul Python (596 baris) sistem rekomendasi menu harian berbasis
Particle Swarm Optimization + dataset resep 6 sheet. Hasil terverifikasi:

| Verifikasi | Hasil |
|---|---|
| Paritas kode paper | 23/23 blok, 100% byte-per-byte |
| Audit numerik | 47/47 klaim konsisten dengan sumber |
| Benchmark empiris | 30 run (baseline + 2 patch × 10 seed) |
| Render QA | 27 halaman paper + 15 slide lolos |
| Temuan benchmark | patch menaikkan success rate 0,7→0,9 dan keragaman 6,6× |

*(Data, kode, dan deliverable kasus ini bersifat privat — tidak dipublikasikan di repo.)*

---

## Lisensi

[MIT](LICENSE) © 2026 Hanif Isya Annafi

Atribusi skill pendukung: [ml-code-analysis](https://github.com/HanifIsya/ml-code-analysis-skill) (MIT, penulis sama) · [graphify](https://github.com/Graphify-Labs/graphify) · [ponytail](https://github.com/DietrichGebert/ponytail) (MIT)
