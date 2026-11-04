"""PPTX -> PNG per slide via PowerPoint COM (Windows). Usage: python render_pptx_png.py in.pptx [outdir]"""
import sys, os

def render(pptx_path, outdir=None):
    outdir = outdir or os.path.splitext(pptx_path)[0] + "_png"
    os.makedirs(outdir, exist_ok=True)
    import win32com.client
    app = win32com.client.Dispatch("PowerPoint.Application")
    try:
        pres = app.Presentations.Open(os.path.abspath(pptx_path), ReadOnly=True, WithWindow=False)
        pres.SaveAs(os.path.abspath(outdir), 18)  # 18 = ppSaveAsPNG
        pres.Close()
    finally:
        app.Quit()
    return sorted(os.path.join(outdir, f) for f in os.listdir(outdir) if f.lower().endswith(".png"))

if __name__ == "__main__":
    for p in render(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None):
        print(p)
