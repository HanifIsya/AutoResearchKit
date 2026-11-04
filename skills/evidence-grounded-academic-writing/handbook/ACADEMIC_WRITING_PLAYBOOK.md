# Academic Writing Playbook — panduan baca cepat (v3.0)

**Bukan pengganti `SKILL.md`.** Dokumen ini adalah buku ringkas dengan best-practice dan contoh. Modul lengkap serta SOP eksekusi ada di folder `playbooks/`, `genres/`, `templates/`, `references/` dan `scripts/`. Semua contoh numerik di dalam handbook adalah simulasi yang tidak dapat dikutip sebagai temuan nyata.

## 1. Tujuan dan pembedaan genre

Sebuah tulisan profesional harus membangun rantai masalah–bukti–metode/argumen–temuan–batas–implikasi. KTI dan esai tidak wajib memiliki hasil eksperimen; laporan teknis harus membedakan training, cache replay, hasil lokal dan skor eksternal. Struktur selalu mengikuti brief atau instruksi penulis dari venue.

## 2. Alur utama sepuluh tahap

Intake → Research framing → Source hunt + URL research ZIP → Evidence map → Method/analytics → Manuscript skeleton → Draft + visual registry → Word/MD assembly → Three-pass audit → Portable handoff.

## 3. Source-first research ZIP

Cari sumber pada lima lane: venue; masalah; nearest neighbors; metodologi; writing/figure exemplars. Simpan pencarian, katalog, source cards, status akses dan directness. Folder `.url` adalah **shortcut internet**, bukan file PDF. Kuartil dan SINTA perlu pengecekan terpisah; jangan mengasumsikan label dari tahun berbeda.

## 4. Evidence fidelity

Uji keberadaan publikasi, metadata, kesesuaian isi dengan klaim dan cakupan. Unit, periode, definisi angka, denominator dan status hasil/target/asumsi wajib jelas. Jangan menyebut pernyataan interpretatif sebagai hasil observasi.

## 5. Academic prose

Jangan memulai dengan klaim generik “di era digital”. Fokus pada masalah spesifik, apa yang belum dapat dijawab dan bagaimana pendekatan mempersempitnya. Literatur disintesis lintas studi, bukan paragraf per-penulis. Discussion menimbang alternatif penjelasan, bukan menyalin tabel hasil.

## 6. Visual grammar

Tabel untuk angka tepat; diagram untuk metode dan alur; grafik untuk pola, distribusi, hubungan, ketidakpastian. Setiap visual ditautkan ke sumber data atau paper terverifikasi. Caption menjelaskan *apa*; paragraf menginterpretasi *mengapa penting*; catatan menyatakan unit, denominator, singkatan, status simulasi dan sumber. Rumus hanya jika dipakai, simbol didefinisikan dan nomor menyesuaikan template.

## 7. Best-practice before/after

**Bad:** “Sistem AI ini terbukti meningkatkan kualitas pelayanan secara signifikan.”

**Better:** “Model diuji untuk mengidentifikasi pesan yang diprioritaskan pada data validasi yang tersedia. Dampak terhadap kualitas pelayanan belum dapat disimpulkan karena waktu penyelesaian dan outcome pengguna tidak diukur.”

**Bad:** “Hasil naik 5%.”

**Better (simulasi):** “Nilai 70% ke 75% meningkat lima poin persentase (7,14% secara relatif); contoh ini tidak memuat pengujian signifikansi.”

**Bad caption:** “Gambar 1. Hasil penelitian.”

**Better template:** “Gambar 1. Prevalensi [kategori] pada [N] [unit] selama [periode]. Sumbu vertikal menunjukkan [indikator/denominator]. Sumber: [data/analisis versi].”

## 8. Worked example

Gunakan `examples/mini_manuscript_demonstration.md`. Matriks kesalahan dari 10 pesan **simulasi** memakai TP=3, FP=1, FN=3, TN=3. Precision=3/4=0,75, recall=3/6=0,50, F1=0,60. Kesimpulan yang sah: contoh menjelaskan kesesuaian rumus dan denominator. Kesimpulan yang tidak sah: kemampuan memahami bahasa tertentu, efektivitas dalam pelayanan publik atau signifikan secara statistik.

## 9. Reviewer and production QA

Three-pass review: destructive method/logic → backwards evidence → compression. Severity critical/major/minor; perbaiki lalu recheck. Render seluruh halaman DOCX dan audit tabel, grafik, rumus, cross-reference, jumlah halaman, appendix, font, footnote, source note serta daftar pustaka. Manuskrip pembaca tidak boleh memuat prompt atau konfirmasi.

## 10. Handoff portable

`PROJECT_HANDOFF_LATEST.md` mencatat keputusan terkunci, inventaris, checksum, versi hasil, source catalog, konten visual, status cek, kelemahan dan prompt kelanjutan. Chat baru hanya bisa bekerja andal dari berkas yang diunggah dan dibaca; bukan dari asumsi bahwa semua pesan lama ikut terbawa.

## Bacaan yang perlu benar-benar diperiksa

- IEEE Article Structure: https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/structure-your-article/
- IEEE Style: https://journals.ieeeauthorcenter.ieee.org/your-role-in-article-production/ieee-editorial-style-manual/
- PLOS better figures: https://doi.org/10.1371/journal.pcbi.1003833
- PLOS writing a literature review: https://doi.org/10.1371/journal.pcbi.1003149
- PRISMA: https://www.prisma-statement.org/prisma-2020
- APA JARS: https://apastyle.apa.org/jars
- SINTA journals: https://sinta.kemdiktisaintek.go.id/journals/index/
- SCImago FAQ: https://www.scimagolab.com/faqs-2/

**Keterangan:** Referensi di atas adalah standar dan contoh umum. Sumber empiris yang benar-benar membahas proyek pengguna harus dicari dan diverifikasi ulang secara topik-spesifik.
