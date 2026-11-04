# WORKFLOW AutoResearchKit (Template Generik)

> Salinan generik dari workflow yang dipakai pada run pertama. Ganti
> `<PROYEK>` dengan nama kasus Anda. Versi terisi (contoh nyata) ada di
> folder kerja lokal run masing-masing — tidak dipublikasikan karena
> memuat rujukan data privat.

## Visi & deliverables

Input pengguna: (1) kode Python ML, (2) dataset, (3) opsional log + template
referensi. Output: **paper DOCX 8 bab** + **deck PPTX** + **audit lengkap**,
semuanya teraudit berulang; bagian generik dirilis ke repo GitHub (MIT).

| Deliverable | Lokasi | Masuk repo? |
|---|---|---|
| D1 Skill + script | `skills/autoresearchkit/` | ✅ |
| D2 Paper DOCX 8 bab | `results_<PROYEK>/` | ❌ privat |
| D3 PPT deck | `results_<PROYEK>/` | ❌ privat |
| D4 Audit + benchmark + figures | `results_<PROYEK>/audit/` | ❌ privat |
| D5 Repo GitHub `<user>/AutoResearchKit` | GitHub | ✅ tujuan akhir |

## Aturan privasi (hard rule)

1. Kode & dataset pengguna = privat; tidak pernah di-commit/push.
2. Pekerjaan pada kode di `_work/<PROYEK>_snapshot/` (salinan).
3. `.gitignore` memblokir: `<PROYEK>/`, `results_*/`, `_work/`, `*.xlsx`,
   `*.docx`, `*.pptx`, `*.pdf`, `*.zip`, `*.log`.
4. Contoh di repo hanya data sintetis bertanda.

## Pipeline 8 fase

```
FASE 1        FASE 2         FASE 3          FASE 4
INGEST   →    ANALYZE   →    PAPER DOCX →    REVIEW LOOP PAPER
inventory      deep-dive      8 bab +         parity + numeric audit +
profiling      benchmark      flowchart +     render QA + visual judge
reproduksi     multi-seed     simulasi        (iterasi sampai 0 blocker)
                ↓                              ↓
FASE 8        FASE 7         FASE 6          FASE 5
REPO     ←    FINAL QA  ←    REVIEW     ←    PPT DECK (template
GITHUB+MIT    G1–G10         LOOP PPT        referensi pengguna)
+ README      + handoff      (visual judge)
```

## Gerbang kualitas G1–G10

| Gate | Kondisi lolos |
|---|---|
| G1 Scope | Semua bab/slide rencana terisi |
| G2 Provenance | Tiap angka/klaim → sumber OBSERVED |
| G3 Design | Kesimpulan tidak melebihi desain eksperimen |
| G4 Numbers | Konsisten antar teks, tabel, gambar, CSV |
| G5 Figures | ≥300 DPI, ber-unit, caption mandiri |
| G6 Text | Bahasa ilmiah natural |
| G7 Venue | Struktur 8 bab + template deck pengguna |
| G8 Reproducibility | Benchmark dapat diulang (seed tercatat) |
| G9 Render | QA visual semua halaman/slide lolos |
| G10 Handoff | Repo bersih; nol kebocoran data privat |

## Definition of done

1. Paper lolos parity 100% + audit numerik + QA visual.
2. Deck lolos QA visual semua slide, angka sinkron paper.
3. Benchmark ≥5 seed dijalankan nyata (bukan klaim).
4. Repo publik MIT; `git ls-files` bebas file privat.
5. Semua gerbang hijau.
