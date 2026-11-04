# BEST-PRACTICE MINI MANUSCRIPT — SIMULASI PENDIDIKAN, BUKAN HASIL RISET

> **PERINGATAN:** Semua unit dan nilai pada contoh ini adalah **data ilustratif yang sengaja dibuat**, bukan data lapangan, bukan evaluasi ACTION, dan tidak dapat disitasi sebagai bukti empiris. Tujuannya memperagakan struktur argumen, tabel, rumus, gambar, catatan dan batas inferensi.

## Judul

**Mengukur Kegagalan Deteksi pada Sistem Triase Pesan: Contoh Evaluasi Berbasis Matriks Kesalahan**

## Abstrak

Contoh metodologis ini menunjukkan cara menghubungkan pertanyaan evaluasi, unit analisis dan batas klaim pada sistem triase pesan biner. Sebanyak sepuluh observasi simulasi digunakan untuk menjelaskan perhitungan presisi, recall dan F1 serta perbedaan kesalahan positif dan negatif. Nilai presisi 0,75, recall 0,50 dan F1 0,60 hanya berlaku untuk tabel ilustratif. Contoh ini tidak menguji generalisasi model, perbaikan layanan atau manfaat operasional.

## 1. Pendahuluan

Penilaian sistem triase memerlukan definisi kesalahan yang berkaitan dengan keputusan penggunaan. Satu angka akurasi dapat menyamarkan perbedaan antara pesan relevan yang terlewat dan pesan tidak relevan yang diprioritaskan. Contoh ini bertujuan memperagakan pelaporan evaluasi yang dapat ditelusuri dari matriks kesalahan menuju interpretasi, bukan menilai perangkat lunak tertentu. Pedoman penulisan IEEE membedakan peran tabel sebagai pembawa nilai eksak dan gambar sebagai penyaji pola [1].

## 2. Metode ilustratif

Unit analisis adalah satu pesan hipotetis. Tabel dibuat dengan asumsi enam pesan benar-benar relevan: tiga di antaranya berhasil terdeteksi dan tiga tidak terdeteksi. Dari empat pesan tidak relevan, satu salah ditandai sebagai relevan dan tiga dengan tepat ditolak. Total sepuluh pesan: TP=3, FP=1, FN=3 dan TN=3. Tidak ada data mentah dari organisasi nyata. Label rujukan dianggap sudah benar semata-mata untuk demonstrasi hitungan.

Presisi, recall dan F1 dihitung sebagai:

\[
P=\frac{TP}{TP+FP},\qquad R=\frac{TP}{TP+FN},\qquad F_1=\frac{2PR}{P+R}. \tag{1}
\]

TP adalah positif benar; FP positif salah; FN negatif salah. Batas definisi ketika denominator nol perlu ditetapkan pada penerapan aktual.

**Tabel 1. Matriks kesalahan hipotetis (n=10, simulasi).**

| Prediksi / Rujukan | Relevan | Tidak relevan | Jumlah |
|---|---:|---:|---:|
| Diprioritaskan | 3 (TP) | 1 (FP) | 4 |
| Tidak diprioritaskan | 3 (FN) | 3 (TN) | 6 |
| Jumlah | 6 | 4 | 10 |

*Catatan:* Tabel 1 menggunakan angka **simulasi**, bukan hasil model. Angka 6 pada jumlah relevan adalah denominator recall; jumlah 4 pada pesan diprioritaskan adalah denominator precision.

## 3. Hasil ilustratif

Dari Tabel 1 diperoleh presisi 3/4 = 0,75, recall 3/6 = 0,50 dan F1 = 0,60. Ketiga nilai tersebut tidak memiliki interval ketidakpastian karena tabel merupakan contoh buatan. Selisih precision–recall menunjukkan secara aritmetis bahwa sebagian pesan relevan tertinggal, tetapi tidak mengidentifikasi alasan kegagalannya. Gambar 1 pada folder aset menampilkan perbandingan ketiga metrik dari data contoh ini; grafik tidak menambah bukti di luar matriks yang sama.

**Gambar 1. Perbandingan metrik dari matriks ilustratif (n=10; tanpa interval karena simulasi).** Sumber: Tabel 1 pada dokumen ini; grafik dibuat melalui `scripts/create_example_figures.py`.

## 4. Pembahasan

Recall yang lebih kecil dari precision pada contoh mencerminkan jumlah FN yang lebih besar daripada FP, bukan bukti bahwa model cenderung gagal pada suatu dialek atau kategori pesan. Penjelasan linguistik memerlukan data teks dan pengodean kesalahan tersendiri. Sistem dengan pola seperti ini mungkin membutuhkan pengaturan ulang ambang keputusan, tetapi manfaat perubahan harus diperiksa pada label nyata dan split yang independen. Contoh ini sengaja tidak memuat klaim peningkatan produktivitas, sebab tidak ada pengukuran waktu kerja maupun biaya.

## 5. Kesimpulan

Contoh sepuluh pesan memperlihatkan hubungan antara confusion matrix, presisi, recall dan batas interpretasinya. Kelengkapan denominator, status simulasi dan ketidakhadiran data operasional menghalangi klaim efektivitas empiris.

## Referensi untuk pedoman penyajian

[1] IEEE Author Center, “Structure Your Article,” [Online]. Available: https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/structure-your-article/. [Pedoman penulisan; bukan sumber hasil simulasi].

## Pelajaran dari contoh

- Rumus cocok dengan hitungan tabel.
- Klaim menyebut **angka dan denominator**, tidak menebak mekanisme.
- Notes mengungkap status data; judul/caption dan narasi saling melengkapi.
- Literatur umum digunakan untuk **prinsip penulisan**, bukan untuk menjustifikasi hasil hitungan contoh.
