"""DOCX -> PDF via Microsoft Word COM (Windows). Usage: python render_docx_pdf.py in.docx [out.pdf]"""
import sys, os

def render(docx_path, pdf_path=None):
    pdf_path = pdf_path or os.path.splitext(docx_path)[0] + ".pdf"
    import win32com.client
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    try:
        doc = word.Documents.Open(os.path.abspath(docx_path), ReadOnly=True)
        doc.ExportAsFixedFormat(os.path.abspath(pdf_path), 17)  # 17 = wdExportFormatPDF
        doc.Close(False)
    finally:
        word.Quit()
    return pdf_path

if __name__ == "__main__":
    print("PDF:", render(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None))
