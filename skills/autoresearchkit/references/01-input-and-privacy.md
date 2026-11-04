# 01 — Input, Sandbox, dan Privasi

## Input minimal yang diminta dari pengguna

| Item | Wajib? | Contoh |
|---|---|---|
| Kode Python ML (`.py` / `.ipynb`) | ✅ | `pso.py`, `app.py`, `nutrisi.py` |
| Dataset (`xlsx`, `csv`, dll.) | ✅ | `resep.xlsx` (multi-sheet diperbolehkan) |
| Log eksekusi (`run_log.txt`, stdout) | Direkomendasikan | Iterasi, metrik, error |
| Template referensi paper/PPT milik pengguna | Opsional | PDF deck referensi |

Jika log eksekusi tidak ada, jalankan ulang pipeline di sandbox dengan seed
terkontrol; tandai semua angka hasil eksekusi ulang sebagai `OBSERVED (rerun)`,
bukan run asli.

## Aturan privasi keras

1. Kode & dataset pengguna **tidak pernah** masuk git (lihat `.gitignore` root:
   `PSO_extracted/`, `*_extracted/`, `results_*/`, `_work/`, `*.xlsx`, `*.docx`,
   `*.pptx`, `*.pdf`).
2. Semua modifikasi kode dilakukan pada **salinan** di `_work/<nama>_snapshot/`.
   Folder asli pengguna tidak pernah ditulis.
3. Deliverable hasil (paper, PPT, audit, figure) disimpan di `results_<nama>/`
   yang diblokir gitignore.
4. Sebelum `git push`, wajib jalankan verifikasi:
   ```bash
   git ls-files | grep -iE "extracted|results_|\.xlsx|\.docx|\.pptx|\.pdf" || echo "BERSIH"
   git log --stat | grep -iE "PSO_|hasil_|resep" || echo "BERSIH"
   ```

## Struktur kerja standar

```
<root>/
├── WORKFLOW.md                  # acuan run ini (lokal)
├── <input_pengguna>/            # [PRIVAT] kode+dataset asli — tidak disentuh
├── _work/                       # sandbox: snapshot kode, script analisa, clone
│   └── <nama>_snapshot/         # salinan kode yang boleh dijalankan/di-patch
├── skills/autoresearchkit/      # [REPO] skill ini
├── docs/                        # [REPO] panduan
└── results_<nama>/              # [PRIVAT] paper, PPT, audit, figures
```
