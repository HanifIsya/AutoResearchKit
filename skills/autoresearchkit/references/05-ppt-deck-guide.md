# 05 — Fase 5: PPT Deck (Template Referensi)

## Design language (diekstrak dari deck referensi pengguna, gaya konsultan)

| Elemen | Spesifikasi |
|---|---|
| Kanvas | 16:9, 13.33 × 7.5 in (LAYOUT_WIDE) |
| Palet | NAVY `0E2A47` (bg gelap cover/penutup), BLUE `1B72C8` (primer), CYAN `2FA8DC` (aksen sekunder), ORANGE `F5A623` (insight/highlight), INK `22364A`, MUTED `64748B`, PANEL `F1F6FB` |
| Font | Segoe UI (2 bobot: Regular + Bold) |
| Judul slide | kicker kecil caps abu + **action title** 23,5pt: kalimat klaim dengan frasa berwarna (CYAN/ORANGE), garis hairline di bawahnya |
| Motif berulang | section bar rounded biru; lingkaran bernomor; KPI box (border biru 1,4pt, angka besar); callout "Key Insight" oranye; footer agenda tracker 6 seksi + nomor halaman kotak biru |
| Kode | kotak gelap `121314`, Consolas 10pt, token GitHub-dark |
| Chart | native pptxgenjs (BAR/DOUGHNUT), `chartColors` dari palet, `dataLabelFormatCode: "0.0"` untuk desimal, sumber data dicantumkan |
| Struktur | "sandwich": cover gelap → konten terang → kesimpulan & penutup gelap |

## Kerangka 15 slide (pipeline analisa kode ML)

1. Cover gelap (motif topik: partikel swarm konvergen ke gbest)
2. Ringkasan Eksekutif (3 poin bernomor + 4 KPI + insight)
3. Konteks & Masalah (3 langkah + pertanyaan riset)
4. Data & Konfigurasi (tabel dataset + konfigurasi algoritma)
5. Arsitektur Pipeline (flowchart 300 DPI + 4 kartu modul)
6. Hasil Run Asli (tabel vs target + log + alert merah)
7. Temuan (3 kolom kategori + insight)
8. Anatomi Masalah #1 (kode + dampak + donut)
9. Patch (4 kartu bernomor + metrik domain)
10. Desain Benchmark (chevron 4 langkah + tabel ablation)
11. Hasil Benchmark (3 chart native + 3 KPI + sumber)
12. Kurva Konvergensi (gambar + 3 KPI + insight)
13. Roadmap P1–P3
14. Kesimpulan (gelap, 4 KPI)
15. Terima kasih (gelap)

## Aturan mutlak

- Semua angka **sinkron dengan paper** (sumber: audit CSV/JSON).
- Chart dari data nyata; gambar matplotlib ≥300 DPI hanya untuk visual
  yang tak bisa dibuat native (kurva 20-series log).
- Teks tidak overflow: judul ≤ 2 baris; kartu diukur terhadap isi.
- QA: render PPTX → PNG per slide (PowerPoint COM via
  `scripts/render_pptx_png.py`, atau LibreOffice headless) → inspeksi
  semua slide → perbaiki → ulangi sampai lolos.
