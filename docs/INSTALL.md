# Panduan Instalasi AutoResearchKit

Panduan ini menyiapkan seluruh toolchain dari nol pada mesin Windows
(di Linux/macOS ganti bagian COM dengan LibreOffice headless — lihat catatan
di akhir).

## 1. Prasyarat

```bash
# Python 3.10+ beserta pustaka dokumen & data
python -m pip install python-docx python-pptx openpyxl pypdf pymupdf \
    matplotlib pandas numpy pygments requests
# Windows saja — render QA memakai Office COM
python -m pip install pywin32

# GitHub CLI (untuk rilis repo) — opsional
winget install GitHub.cli
```

Render QA visual DOCX/PPTX memakai **Microsoft Word + PowerPoint** via COM
(paling setia pada tampilan akhir). Alternatif lintas-platform:
LibreOffice headless (`soffice --headless --convert-to pdf`).

## 2. Instal skill AutoResearchKit

Salin folder skill ke direktori skills milik agent Anda:

| Agent | Lokasi |
|---|---|
| ZCode | `%USERPROFILE%\.agents\skills\autoresearchkit\` |
| Claude Code | `%USERPROFILE%\.claude\skills\autoresearchkit\` |
| OpenCode/ lain | folder skills setara (baca dokumentasi agent) |

```bash
git clone https://github.com/HanifIsya/AutoResearchKit.git
mkdir -p ~/.agents/skills
cp -r AutoResearchKit/skills/autoresearchkit ~/.agents/skills/
```

Isi folder skill:

```
skills/autoresearchkit/
├── SKILL.md              # entrypoint pipeline 8 fase
├── references/           # 7 dokumen rujukan per fase
│   ├── 01-input-and-privacy.md
│   ├── 02-ingest-and-reproduction.md
│   ├── 03-analysis-and-benchmark.md
│   ├── 04-paper-docx-guide.md
│   ├── 05-ppt-deck-guide.md
│   ├── 06-review-loops-and-gates.md
│   └── 07-repo-release.md
└── scripts/
    ├── ml_docx_builder.py        # builder DOCX 8 bab (dari skill ml-code-analysis)
    ├── verify_analysis_report.py # verifier paritas kode 100%
    ├── numeric_audit.py          # audit angka naskah vs sumber
    ├── render_docx_pdf.py        # Word COM → PDF
    ├── render_pdf_png.py         # PDF → PNG (PyMuPDF)
    └── render_pptx_png.py        # PowerPoint COM → PNG
```

## 3. Instal skill pendukung

### 3a. ml-code-analysis (engine analisa — dibuat oleh penulis yang sama)

```bash
git clone https://github.com/HanifIsya/ml-code-analysis-skill.git
cp -r ml-code-analysis-skill/skills/ml-code-analysis ~/.agents/skills/
```

> `scripts/ml_docx_builder.py` dan `verify_analysis_report.py` sudah ikut
> disertakan di AutoResearchKit (versi yang dipatch: paritas baris kosong,
> font Consolas, pemecahan blok panjang).

### 3b. evidence-grounded-academic-writing (disiplin penulisan berbasis bukti)

Sumber: paket `ACADEMIC_WRITING_SYSTEM_v3` milik penulis. Ekstrak ke folder
skill:

```bash
mkdir -p ~/.agents/skills/evidence-grounded-academic-writing
cd ~/.agents/skills/evidence-grounded-academic-writing
python -c "import zipfile; zipfile.ZipFile('ACADEMIC_WRITING_SYSTEM_v3.zip').extractall('.')"
# pindahkan isi ACADEMIC_WRITING_SYSTEM_v3/ ke root folder skill
```

### 3c. graphify (opsional — hemat token saat menjelajah codebase)

```bash
git clone https://github.com/Graphify-Labs/graphify.git
cp graphify/graphify/skill.md ~/.agents/skills/graphify/SKILL.md
# CLI-nya: python -m graphify <folder> — jalankan pada SALINAN kode, bukan folder privat asli
```

### 3d. ponytail (opsional — gaya kode minimal untuk script buatan sendiri)

```bash
git clone https://github.com/DietrichGebert/ponytail.git
cp ponytail/.openclaw/skills/ponytail/SKILL.md ~/.agents/skills/ponytail/SKILL.md
```

> Catatan: ponytail menekankan kode seminimal mungkin. Gunakan level *lite* —
> jangan sampai mengorbankan kelengkapan deliverable.

## 4. Verifikasi instalasi

```bash
python -c "import docx, pptx, openpyxl, fitz, matplotlib, pygments; print('pustaka OK')"
python skills/autoresearchkit/scripts/render_docx_pdf.py --help 2>/dev/null || echo "COM siap di Windows"
ls ~/.agents/skills/ | grep -E "autoresearchkit|ml-code-analysis|graphify|ponytail"
```

Restart sesi agent agar skill baru terdeteksi, lalu lanjut ke `docs/USAGE.md`.
