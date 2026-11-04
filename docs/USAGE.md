# Cara Pakai AutoResearchKit (End-to-End)

## Skenario: Anda punya kode ML + dataset

```
proyek_saya/
├── model.py / pipeline.py / app.py   # kode Python ML
├── data.xlsx / data.csv              # dataset
└── run_log.txt                       # (disarankan) log eksekusi
```

## 1. Siapkan folder kerja

```bash
mkdir AnalisaProyek && cd AnalisaProyek
git init        # AutoResearchKit membuat .gitignore pelindung privasi
# taruh folder kode+dataset Anda di sini (mis. proyek_saya/)
```

## 2. Beri instruksi ke agent

Contoh prompt satu-kalimat:

> Analisa folder `proyek_saya/` (kode Python ML + dataset). Ikuti skill
> **autoresearchkit**: reproduksi run, analisa mendalam, benchmark patch
> multi-seed, buatkan **paper DOCX 8 bab** dan **PPT presentasi** mengikuti
> template referensi saya, review loop sampai semua gerbang lolos, lalu
> rilis bagian generiknya ke repo GitHub `AutoResearchKit` (MIT) — tanpa
> memasukkan kode/dataset saya.

Atau tahap demi tahap (lebih terkendali):

1. `INGEST` — inventaris + reproduksi multi-seed (Fase 1)
2. `ANALYZE` — analisa mendalam + benchmark (Fase 2)
3. `PAPER` — DOCX 8 bab + review loop (Fase 3–4)
4. `DECK` — PPT + review loop (Fase 5–6)
5. `RELEASE` — repo GitHub (Fase 7–8)

## 3. Apa yang Anda dapatkan

```
results_proyek_saya/            # [PRIVAT — tidak masuk repo]
├── ANALISIS KODE MACHINE LEARNING - <nama>.docx
├── <nama>_presentation.pptx
├── audit/
│   ├── observed_data.json        # satu sumber kebenaran angka
│   ├── benchmark_multiseed.csv   # per-run baseline vs patch
│   ├── benchmark_summary.csv     # agregat statistik
│   ├── convergence_histories.json
│   ├── simulasi_langkah.json     # simulasi numerik 7 langkah
│   ├── claims_naskah.json + observed_claims.json  # audit numerik
│   └── paper_png/ deck_png/      # render QA visual
└── figures/                      # flowchart + grafik 300 DPI
```

## 4. Contoh terverifikasi (run pertama, November 2026)

Kasus: sistem rekomendasi menu harian dengan PSO (4 file Python, 596 baris,
dataset 6 sheet). Hasil run pertama:

| Bukti | Nilai |
|---|---|
| Paritas kode | 23/23 blok, 100% byte-per-byte |
| Audit numerik | 47/47 klaim konsisten |
| Benchmark | 30 run (3 varian × 10 seed) |
| Render QA | 27 halaman paper + 15 slide, semua lolos |
| Perbaikan patch | success rate 0,7→0,9; keragaman 6,6× |

## 5. Troubleshooting

| Gejala | Solusi |
|---|---|
| Verifier gagal padahal teks tampak sama | baris kosong/spasi — pastikan memakai `ml_docx_builder.py` bawaan repo ini (sudah dipatch) |
| TOC nomor halaman salah | jalankan dua-pass build ulang (lihat references/04) |
| Label chart terbulatkan (0,7→1) | `dataLabelFormatCode: "0.0"` di pptxgenjs |
| COM tidak tersedia | pakai LibreOffice headless untuk render; ubah `render_docx_pdf.py` |
| Repo menolak push karena file privat | cek `.gitignore` + `git ls-files` (references/07) |
