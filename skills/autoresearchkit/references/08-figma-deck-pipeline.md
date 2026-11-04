# 08 — Pipeline Deck Alternatif via Figma

Gunakan jalur ini bila kualitas desain native PPTX dianggap kurang setia ke
referensi, atau pengguna sudah punya desain di Figma.

## Prinsip

- **1 frame Figma (1280×720) = 1 slide PPTX full-bleed** — hindari perantara
  PDF (rasterisasi ganda); export PNG @3x langsung dari Figma.
- Konsekuensi yang harus disampaikan ke pengguna: teks di PPTX menjadi
  **gambar** (tidak editable di PowerPoint); revisi konten balik ke Figma,
  lalu export ulang.

## Tiga langkah

### 1. Bangun desain di Figma — dua cara
- **Pengguna sudah punya desain/template** → pastikan tiap slide adalah
  frame bernama `Slide 01 … Slide NN` (urutan nama = urutan slide) dalam
  satu halaman.
- **Belum ada** → jalankan plugin bawaan:
  `skills/autoresearchkit/scripts/figma_plugin_deck/` melalui
  *Menu → Plugins → Development → Import plugin from manifest…* → pilih
  folder itu → jalankan. Plugin membuat halaman `AutoResearchKit Deck`
  berisi 15 frame (konten PSO; angka dari audit; Montserrat + Roboto Mono).

### 2. Export PNG @3x — dua cara
- **Token API** (disarankan): buat personal access token (Figma → Settings →
  Security → Personal access tokens) lalu:
  ```bash
  python skills/autoresearchkit/scripts/figma_deck.py \
      --token FIG-XXXX --file-key <FILE_KEY> --out deck.pptx
  ```
  (file key = bagian URL file Figma setelah /design/)
- **Manual**: pilih semua frame → panel Export → PNG, scale 3x → simpan ke
  satu folder, lalu:
  ```bash
  python skills/autoresearchkit/scripts/figma_deck.py \
      --pngs-dir <folder> --out deck.pptx
  ```

### 3. Rakit PPTX
Otomatis oleh script di langkah 2 (16:9, satu gambar per slide, urut nama).

## QA tetap wajib

Render PPTX → PNG (`render_pptx_png.py`) → periksa ketajaman teks @3x,
urutan slide, dan sinkronitas angka dengan naskah. Slide berbasis gambar
tidak meminta paritas teks, tetapi **angka tetap wajib audit** terhadap
`observed_data.json`.
