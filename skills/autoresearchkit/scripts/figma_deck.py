"""Figma → PPTX assembly untuk AutoResearchKit.

Cara pakai (2 jalur):

A) Via Personal Access Token (disarankan):
   python figma_deck.py --token FIG_TOKEN --file-key FILE_KEY --out deck.pptx
   - Membaca file Figma, mencari semua top-level frame bernama "Slide *"
     pada page "AutoResearchKit Deck" (atau --page-name lain), export PNG @3x
     via REST API, lalu merakit PPTX 16:9 (1 frame = 1 slide full-bleed).

B) Dari folder PNG hasil export manual (di Figma: pilih semua frame ->
   Export -> PNG, skala 3x):
   python figma_deck.py --pngs-dir ./export_png --out deck.pptx
"""
import argparse, os, sys

def collect_pngs(pngs_dir):
    exts = (".png", ".jpg", ".jpeg")
    files = [f for f in os.listdir(pngs_dir) if f.lower().endswith(exts)]
    files.sort()
    return [os.path.join(pngs_dir, f) for f in files]

def export_via_api(token, file_key, page_name, outdir, scale=3.0):
    import requests
    H = {"X-Figma-Token": token}
    meta = requests.get(f"https://api.figma.com/v1/files/{file_key}", headers=H, timeout=60).json()
    page = None
    for p in meta.get("document", {}).get("children", []):
        if page_name.lower() in p.get("name", "").lower():
            page = p; break
    if page is None:
        sys.exit(f"Page '{page_name}' tidak ditemukan. Halaman: {[p.get('name') for p in meta['document']['children']]}")
    frames = [c for c in page.get("children", []) if c.get("type") == "FRAME" and c.get("name", "").lower().startswith("slide")]
    frames.sort(key=lambda c: c.get("name", ""))
    ids = ",".join(c["id"] for c in frames)
    r = requests.get(f"https://api.figma.com/v1/images/{file_key}",
                     headers=H, params={"ids": ids, "format": "png", "scale": scale}, timeout=60).json()
    urls = r.get("images", {})
    os.makedirs(outdir, exist_ok=True)
    paths = []
    for c in frames:
        url = urls.get(c["id"])
        if not url:
            print(f"[SKIP] {c['name']}: render belum siap"); continue
        out = os.path.join(outdir, c["name"].replace(" ", "_") + ".png")
        with requests.get(url, timeout=120, stream=True) as img:
            open(out, "wb").write(img.content)
        paths.append(out)
        print("[OK]", c["name"], "->", out)
    return paths

def build_pptx(pngs, out):
    from pptx import Presentation
    from pptx.util import Inches
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
    blank = prs.slide_layouts[6]
    for p in pngs:
        s = prs.slides.add_slide(blank)
        s.shapes.add_picture(p, 0, 0, width=prs.slide_width, height=prs.slide_height)
    prs.save(out)
    print(f"Saved: {out} ({len(pngs)} slide)")

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--token"); ap.add_argument("--file-key")
    ap.add_argument("--page-name", default="AutoResearchKit Deck")
    ap.add_argument("--pngs-dir"); ap.add_argument("--out", default="figma_deck.pptx")
    ap.add_argument("--export-dir", default="figma_export"); ap.add_argument("--scale", type=float, default=3.0)
    a = ap.parse_args()
    if a.pngs_dir:
        build_pptx(collect_pngs(a.pngs_dir), a.out)
    elif a.token and a.file_key:
        pngs = export_via_api(a.token, a.file_key, a.page_name, a.export_dir, a.scale)
        if pngs: build_pptx(pngs, a.out)
    else:
        ap.error("Berikan --token + --file-key, ATAU --pngs-dir")
