# Bank before–after — original examples and QA notes

**Contoh orisinal, bukan kutipan penelitian tertentu.** Isi dalam kurung siku adalah scaffold *untuk draf kerja*, bukan temuan.

### 1. Pendahuluan

**Sebelum:** Di era digital yang semakin maju, teknologi AI memiliki peran sangat penting untuk menyelesaikan berbagai permasalahan secara efektif dan efisien.

**Sesudah:** Banyaknya pesan yang masuk tidak serta-merta menjamin semua permintaan memperoleh prioritas yang tepat. Studi ini menguji apakah pengelompokan pesan berdasarkan isi dapat membantu proses penentuan prioritas; manfaat operasional belum dapat dinyatakan tanpa pengukuran pada alur kerja nyata.

**Audit:** Kalimat baru menegaskan masalah/tujuan/batas, bukan memuji teknologi.

### 2. Kajian pustaka

**Sebelum:** Beberapa peneliti telah meneliti machine learning, dan sebagian besar menunjukkan hasil yang sangat baik [1]–[9].

**Sesudah (scaffold):** [Studi A] menguji [metode] pada [domain dan unit], sedangkan [Studi B] memakai [sumber label dan split] yang berbeda. Karena kedua studi menggunakan [perbedaan metrik], skor keduanya tidak dapat diurutkan sebagai bukti keunggulan metode. Perbandingan yang setara masih diperlukan pada [RQ penelitian].

**Audit:** Ganti placeholder dengan paper yang benar-benar sudah dibaca; tambahkan sitasi tepat di kalimat dukungannya.

### 3. Metodologi

**Sebelum:** Data diproses dan model dilatih sehingga mendapatkan hasil yang lebih optimal.

**Sesudah (scaffold):** Unit independen ditentukan pada tingkat [entitas], lalu seluruh observasi dari entitas yang sama ditempatkan dalam satu fold. Transformasi yang mempelajari parameter dari data, termasuk [normalisasi/encoding], di-fit hanya pada pelatihan setiap fold. Ambang keputusan ditetapkan menggunakan [bagian development], sedangkan [holdout] tidak digunakan saat pemilihan konfigurasi.

**Audit:** Kalimat hanya sah sebagai laporan eksekusi **jika kode dan split mendukung**; jika belum, gunakan `direncanakan`.

### 4. Hasil

**Sebelum:** Peningkatan skor sebesar 5% membuktikan bahwa sistem sangat signifikan.

**Sesudah (contoh matematis buatan):** Pada ilustrasi dua persentase, perubahan dari 70% menjadi 75% setara dengan **5 poin persentase** atau **7,14% peningkatan relatif** terhadap nilai awal. Besar perbedaan ini belum menunjukkan signifikansi statistik atau dampak praktis tanpa desain pengujian dan informasi ketidakpastian.

### 5. Pembahasan

**Sebelum:** Model telah terbukti mampu memahami bahasa daerah karena F1-nya tinggi.

**Sesudah:** Skor agregat dapat menunjukkan kinerja pada data pengujian yang dipakai, tetapi tidak mengisolasi kemampuan menghadapi variasi bahasa daerah. Klaim tersebut memerlukan anotasi atau analisis subgroup berdasarkan definisi variasi bahasa yang dapat diaudit.

### 6. Caption

**Sebelum:** Gambar 4. Hasil penelitian.

**Sesudah (template):** Gambar 4. Perubahan [indikator] menurut [kelompok] pada [periode] (n=[...]). Garis menunjukkan [estimasi]; pita menunjukkan [CI 95% dan metodenya]. Sumber: [dataset/hasil analisis versi].

### 7. Source notes and reuse

**Sebelum:** Sumber: Google.

**Sesudah (template):** Sumber: [lembaga/penulis, tahun, judul, DOI/URL, nomor tabel/gambar]. `Diadaptasi dari` digunakan hanya bila adaptasi benar-benar dilakukan dan penggunaan sah menurut lisensi/izin; `Diolah dari` untuk perhitungan baru dengan data yang hak penggunaannya sesuai.
