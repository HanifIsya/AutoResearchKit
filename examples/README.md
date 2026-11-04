# Contoh Input (SYNTHETIC — bukan data sungguhan)

Folder ini berisi **data sintetis buatan** yang hanya menunjukkan STRUKTUR
input yang diharapkan AutoResearchKit. Tidak ada data pengguna sungguhan.

```
examples/
├── synthetic_optimizer/        # contoh proyek mini
│   ├── demo_optimizer.py       # ~40 baris: optimasi PSO sederhana
│   └── demo_dataset.csv        # data sintetis 20 baris
└── README.md
```

Cara mencoba cepat (tanpa Office COM):

```bash
python synthetic_optimizer/demo_optimizer.py          # menghasilkan log
# lalu minta agent Anda menjalankan Fase 1–2 pada folder ini
```

Struktur input yang diharapkan (lihat references/01):

| File | Peran |
|---|---|
| `*.py` | kode ML/optimasi yang dianalisa |
| `*.csv` / `*.xlsx` | dataset; multi-sheet diperbolehkan |
| `*.log` / `*.txt` (opsional) | log eksekusi sebagai ground truth |
