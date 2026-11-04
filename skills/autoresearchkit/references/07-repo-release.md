# 07 — Fase 8: Rilis Repo GitHub

## Pra-rilis (wajib)

1. Semua gerbang G1–G9 hijau.
2. Pilih subset generik untuk repo: skill (`skills/`), docs, examples
   sintetis. Deliverable hasil (paper/PPT/audit) **tidak** masuk repo.
3. `.gitignore` aktif memblokir data pengguna (uji dengan `git ls-files`).
4. File wajib repo: `README.md`, `LICENSE` (MIT), `CHANGELOG.md`,
   `docs/INSTALL.md`, `docs/USAGE.md`, `docs/WORKFLOW.md`.

## Rilis

```bash
git add -A
git -c user.name="<nama>" -c user.email="<email>" commit -m "..."
gh repo create <user>/AutoResearchKit --public --source . --push
```

## Verifikasi pasca-push

```bash
git ls-files | grep -iE "extracted|results_|\.xlsx|\.docx|\.pptx|\.pdf|run_log" && echo "BOCOR!" || echo "BERSIH"
git log --stat --all | grep -iE "resep|hasil_rekomendasi|run_log" && echo "BOCOR!" || echo "BERSIH"
gh repo view <user>/AutoResearchKit --json license,visibility
```

## Isi README minimum

- Apa itu AutoResearchKit + diagram pipeline 8 fase
- Instalasi cepat (dependensi + 4 skill pendukung)
- Cara pakai (prompt contoh + struktur folder)
- Kualitas: gerbang G1–G10 + loop review
- Privasi: apa yang tidak pernah masuk repo
- Lisensi MIT + atribusi skill pendukung
