# 03 — Fase 2: Analisa & Benchmark

## Komponen wajib analisa

1. **Alur baca kode**: eksekusi flow string `a.py f() → b.py g() → ...`,
   ruang solusi `S = ∏ N_k` (dihitung dari ukuran dataset riil), properti
   algoritmik (stokastik/deterministik, dimensi, populasi, iterasi, seed).
2. **Deep-dive per modul**: snippet + nomor baris terverifikasi; analisis
   fungsi, formula matematis, edge case; callout untuk trade-off desain.
3. **Simulasi numerik 7 langkah** (sesuaikan jumlah langkah dengan pipeline):
   dari input mentah sampai output akhir dengan angka nyata run asli; tiap
   langkah disertai snippet sumber + tabel validasi antara.
4. **Flowchart** resolusi tinggi (≥2400 px lebar, 300 DPI, matplotlib) —
   pewarnaan per modul, titik keputusan, label Indonesia yang ringkas.
5. **Temuan** 3 kategori (fungsional / teknis / dataset), tiap temuan:
   ID, deskripsi, **bukti OBSERVED** (baris kode / log / CSV), dampak.

## Benchmark patch: disiplin empiris

- Rancang patch minimal yang menyasar temuan; **jangan refactor luas**.
- Benchmark = baseline vs patch, ≥5–10 seed, konfigurasi identik,
  tanpa early stopping kecuali itu bagian patch yang diuji.
- **Laporkan versi patch yang gagal** (ablation) — hasil negatif berharga.
- Jika patch menurunkan metrik kunci: revisi desain → benchmark ulang →
  tulis kedua versi.
- Simpan: `benchmark_multiseed.csv` (per run), `benchmark_summary.csv`
  (agregat), `convergence_histories.json` (kurva), script benchmark
  (bisa diulang).

## Patch yang terbukti efektif untuk kasus fitness/optimasi

| Masalah | Patch | Bukti efek |
|---|---|---|
| fitness `inf` non-diskriminatif | cap finite (mis. 1e12) | ranking bermakna |
| seri antar solusi sempurna | tie-break leksikografis metrik sekunder | Top-N beda semua |
| non-reproduksibel | parameter seed | run bisa diulang |
| overshoot / konvergensi dini | velocity clamp 10–20% rentang | success rate naik |
| iterasi terbuang | early stopping adaptif | ⚠️ uji dulu — bisa menurunkan success rate |
