# PPT Template Guide — Design Language AutoResearchKit

Design language yang diekstrak dari template referensi pengguna (pitch deck
konsultan gaya korporat) dan dibakukan agar setiap deck yang dihasilkan
pipeline konsisten.

## Token desain

```js
const NAVY   = "0E2A47";  // background gelap (cover, kesimpulan, penutup)
const BLUE   = "1B72C8";  // primer: section bar, chart utama, KPI border
const CYAN   = "2FA8DC";  // aksen sekunder: frasa judul, highlight
const ORANGE = "F5A623";  // aksen tajam: Key Insight, angka penting (5–10%)
const INK    = "22364A";  // teks utama
const MUTED  = "64748B";  // teks sekunder/kicker
const PANEL  = "F1F6FB";  // kartu/tinted band
const LINE   = "D6E2EE";  // hairline separator
const DARK   = "121314";  // kotak kode
```

Font: **Segoe UI** (Regular + Bold) — tersedia di semua Windows/Office.
Kanvas: **16:9, 13.33 × 7.5 in** (`LAYOUT_WIDE`).

## Komponen berulang (motif)

1. **Header slide konten**: kicker kecil caps (`BAB · SEKSI`) → action title
   23,5pt berupa **kalimat klaim** dengan frasa berwarna (CYAN/ORANGE) →
   hairline. Judul menyatakan temuan, bukan topik.
2. **Section bar**: rounded rectangle biru, teks putih bold center.
3. **Numbered circle**: lingkaran biru 0,34 in dengan nomor putih.
4. **KPI box**: putih, border biru 1,4pt, angka besar bold + label kecil muted.
5. **Key Insight**: chip oranye "Key Insight" + box tint oranye muda —
   untuk satu kalimat penafsiran, bukan pengulangan data.
6. **Kotak kode**: latar `121314`, Consolas 10pt, token GitHub-dark.
7. **Footer tracker**: 6 seksi (Pendahuluan · Analisa · Hasil · Benchmark ·
   Rekomendasi · Penutup), seksi aktif bold navy + underline biru; nomor
   halaman dalam kotak biru kanan-bawah.
8. **Sandwich**: cover & penutup gelap (NAVY) dengan motif topik; konten terang.

## Chart

- Native pptxgenjs (`BAR`, `DOUGHNUT`, `LINE`) — `chartColors` dari palet,
  `dataLabelFormatCode: "0.0"` untuk desimal, tanpa legend bila satu seri.
- Visual non-native (kurva 20-seri skala log) → matplotlib 300 DPI → gambar.
- Setiap chart/slide data mencantumkan **sumber** (file CSV/JSON).

## Anti-pola

- Tidak ada teks overflow / menimpa footer & nomor halaman.
- Tidak ada chart dengan label terbulatkan salah (0,7 → "1").
- Tidak ada slide full-teks tanpa elemen visual.
- Angka slide = angka paper (sumber tunggal: audit JSON/CSV).
