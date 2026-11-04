"""PDF halaman -> PNG (untuk QA visual). Usage: python render_pdf_png.py file.pdf [outdir] [dpi]"""
import sys, os

def render(pdf_path, outdir=None, dpi=110, pages=None):
    import fitz  # PyMuPDF
    outdir = outdir or os.path.splitext(pdf_path)[0] + "_png"
    os.makedirs(outdir, exist_ok=True)
    doc = fitz.open(pdf_path)
    paths = []
    for i, page in enumerate(doc):
        if pages and (i + 1) not in pages:
            continue
        pix = page.get_pixmap(dpi=dpi)
        p = os.path.join(outdir, f"page_{i+1:03d}.png")
        pix.save(p)
        paths.append(p)
    doc.close()
    return paths

if __name__ == "__main__":
    for p in render(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None,
                    int(sys.argv[3]) if len(sys.argv) > 3 else 110):
        print(p)
