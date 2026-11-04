# 02 — Fase 1: Ingest & Reproduksi

## 1. Inventory (hasilkan JSON/CSV, jangan narasi panjang)

- **Kode**: per file — jumlah baris, daftar fungsi/kelas, dependensi import, peran.
- **Dataset**: per sheet/tabel — jumlah baris & kolom, daftar kolom, tipe, jumlah
  missing, rentang nilai numerik.
- **Log**: parameter konfigurasi yang tercetak, metrik per iterasi, anomali
  (`inf`, `nan`, plateau, duplikat).

## 2. Rekonstruksi profil input run asli

Jika log asli memuat output numerik (mis. target kalori 2457 kkal), cari input
profil yang **mereproduksi angka tersebut persis** lewat rumus di kode. Verifikasi
1↔1 terhadap ≥3 angka independen sebelum mengklaim "profil run asli berhasil
direkonstruksi". Catat proses ini di audit — jangan menebak diam-diam.

## 3. Reproduksi multi-seed

- Kode tidak ber-seed → injeksikan `np.random.RandomState(seed)` **dari luar**
  (salinan sandbox), catat sebagai temuan reproducibility.
- Jalankan ≥5 seed (disarankan 10); simpan per-run: metrik akhir, iterasi
  konvergensi, jumlah solusi unik, anomali.
- Semua angka OBSERVED tersimpan di `results_<nama>/audit/*.json|csv` —
  **satu-satunya sumber kebenaran** untuk paper & PPT.

## 4. Gerbang fase

- [ ] Tabel inventory lengkap (kode + dataset + log)
- [ ] Profil run asli terverifikasi 1↔1 (≥3 angka)
- [ ] Reproduksi multi-seed berhasil & tersimpan JSON
- [ ] Tidak ada tulisan ke folder asli pengguna
