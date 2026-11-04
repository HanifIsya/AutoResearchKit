# 04 — Fase 3: Naskah Akademik Utuh (bukan laporan kode)

Output Fase 3 adalah **manuskrip akademik** mengikuti
`evidence-grounded-academic-writing` (genre: technical report / systems
paper), BUKAN laporan analisa-kode per modul. Analisa kode adalah BAHAN
(metodologi + temuan), bukan struktur naskah.

## Struktur standar

```
Judul + Abstrak + Kata kunci
1. Pendahuluan        — urgensi konkret, gap via studi terdekat, RQ, kontribusi
2. Studi Terkait      — sintesis tematik berkontras (bukan parade sitasi)
3. Metodologi         — objek studi, protokol audit, reproduksi multi-seed,
                        desain patch, metrik domain (dengan persamaan bernomor)
4. Hasil              — hanya dari output terukur; tabel & gambar dari CSV sumber
5. Pembahasan         — interpretasi, alternatif penjelasan, batas inferensi
6. Simpulan           — jawab RQ; tanpa angka baru
Daftar Pustaka        — IEEE by first appearance; SEMUA metadata terverifikasi
Lampiran A            — protokol reproduksi + snippet terverifikasi (opsional)
```

## Urutan penulisan (playbook 05)

Metodologi → Hasil → Pembahasan → Pendahuluan → Abstrak & Simpulan
(terakhir, agar tidak mengklaim lebih dari bukti) → Pustaka + cross-ref.

## Literatur: verifikasi sebelum menulis

- Cari & verifikasi metadata tiap sitasi (DOI, venue, tahun, halaman) via
  pencarian web; simpan `search_log.csv`, `literature_matrix.csv`,
  `citation_entailment.csv` di folder audit/ledgers.
- Sitasi dekat klaim; entailment langsung/parsial dicatat; jangan pakai
  angka paper lain sebagai pembanding langsung bila metriknya tak sebanding.
- IEEE numbering **by first appearance** — audit ulang setelah revisi struktur.

## Persamaan bernomor

Helper `eq(formula, n)`: paragraf CENTER, italic TNR 12, indent 0,6 in,
nomor `"(n)"` inline di kanan. JANGAN pakai tab-stop + justification —
menyebabkan rumus tersebar dan nomor turun baris (pelajaran run #1).

## Produksi DOCX

Gunakan `scripts/ml_docx_builder.py`: TNR 12, 1.15 spacing, justified body,
caption TABEL di atas & GAMBAR di bawah, tabel header repeat + cantSplit.
Blok kode hanya di Lampiran; header `file.py line A-B` tetap wajib lolos
verifier. TOC tidak wajib untuk manuskrip gaya jurnal.

## Audit sebelum selesai (G1–G10 + playbook 07)

1. Paritas kode (snippet lampiran) — `verify_analysis_report.py`.
2. Audit sitasi 1↔1: setiap [n] di teks terpetakan ke pustaka & sebaliknya,
   urutan kemunculan benar — `audit/ledgers/citation_entailment.csv`.
3. Audit angka — `numeric_audit.py` claims vs observed.
4. QA render SEMUA halaman → PNG; perbaiki → render ulang sampai bersih.
5. Manuskrip bersih dipisah dari catatan audit (ledger tetap di audit/).

## Pelajaran run #1 (PSO, 2026-11)

- Laporan "analisa kode 8 bab" BUKAN yang diminta pengguna — manuskrip
  akademik standar-lah bentuknya.
- Judul menamai masalah + cakupan metode, bukan slogam; pembuka memakai
  fakta konkret ber-sitasi, bukan "di era digital...".
- Pembahasan wajib membatasi inferensi (ablation ≠ klaim kausal per-komponen;
  10 seed = deskriptif, bukan uji signifikansi).
