#!/usr/bin/env python3
"""Create a publication-ready editable illustrated handbook from the portable skill."""
from pathlib import Path
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT,WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.enum.text import WD_BREAK

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'handbook'/'ACADEMIC_WRITING_PLAYBOOK.docx'
D=Document(); sec=D.sections[0]
sec.page_width=Cm(21);sec.page_height=Cm(29.7)
sec.top_margin=Cm(2.2);sec.bottom_margin=Cm(2);sec.left_margin=Cm(2.45);sec.right_margin=Cm(2.35)
sec.header_distance=Cm(1.05);sec.footer_distance=Cm(1.05)
styles=D.styles
norm=styles['Normal'];norm.font.name='Aptos';norm.font.size=Pt(9.6);norm.font.color.rgb=RGBColor(44,49,54)
norm.paragraph_format.space_after=Pt(6);norm.paragraph_format.line_spacing=1.17
for name,size,col,space in [('Title',25,(25,50,72),16),('Heading 1',15.5,(25,50,72),12),('Heading 2',11.4,(19,78,101),8),('Heading 3',10,(44,49,54),6)]:
    st=styles[name];st.font.name='Aptos Display' if name in ('Title','Heading 1') else 'Aptos';st.font.size=Pt(size);st.font.bold=True;st.font.color.rgb=RGBColor(*col);st.paragraph_format.space_before=Pt(space);st.paragraph_format.space_after=Pt(5);st.paragraph_format.keep_with_next=True
for sty in ['Quote','Caption']:
    st=styles[sty];st.font.name='Aptos';st.font.size=Pt(8.8)
head=sec.header.paragraphs[0];head.text='RESEARCH  /  EVIDENCE  /  MANUSCRIPT  /  AUDIT';head.alignment=WD_ALIGN_PARAGRAPH.RIGHT
for run in head.runs: run.font.size=Pt(7.5);run.font.color.rgb=RGBColor(110,120,130)
foot=sec.footer.paragraphs[0];foot.text='Evidence-Grounded Academic Writing System  •  v3.0  |  '
foot.alignment=WD_ALIGN_PARAGRAPH.RIGHT
for run in foot.runs:run.font.size=Pt(7.5)
fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');foot._p.append(fld)

def p(t='',style=None):
    return D.add_paragraph(t,style=style)
def h(t,level=1):return D.add_heading(t,level=level)
def bullets(items):
    for x in items:p(x,'List Bullet')
def tbl(headers,rows,widths=None):
    t=D.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=True
    for i,x in enumerate(headers):
        c=t.rows[0].cells[i];c.text=str(x);c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
        for r in c.paragraphs[0].runs:r.font.bold=True;r.font.size=Pt(8.2)
    trPr=t.rows[0]._tr.get_or_add_trPr();e=OxmlElement('w:tblHeader');e.set(qn('w:val'),'true');trPr.append(e)
    for row in rows:
        cells=t.add_row().cells
        for i,x in enumerate(row):
            cells[i].text=str(x);cells[i].vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            for pg in cells[i].paragraphs:
                pg.paragraph_format.space_after=Pt(2)
                for r in pg.runs:r.font.size=Pt(8.2)
    # minimal horizontal academic rules
    for rid,row in enumerate(t.rows):
        for cell in row.cells:
            tcPr=cell._tc.get_or_add_tcPr();b=tcPr.find(qn('w:tcBorders'))
            if b is None:b=OxmlElement('w:tcBorders');tcPr.append(b)
            for side in ['top','bottom','left','right']:
                old=b.find(qn(f'w:{side}'))
                if old is not None:b.remove(old)
                e=OxmlElement(f'w:{side}');e.set(qn('w:val'),'single' if (side=='bottom' and (rid==0 or rid==len(t.rows)-1)) or (side=='top' and rid==0) else 'nil')
                if e.get(qn('w:val'))=='single':e.set(qn('w:sz'),'7');e.set(qn('w:color'),'787F86')
                b.append(e)
    for rid,row in enumerate(t.rows):
        for cell in row.cells:
            for pg in cell.paragraphs:
                pg.paragraph_format.keep_with_next=(rid < len(t.rows)-1)
            trPr=row._tr.get_or_add_trPr()
            if trPr.find(qn('w:cantSplit')) is None:
                cs=OxmlElement('w:cantSplit');trPr.append(cs)
    D.add_paragraph().paragraph_format.space_after=Pt(1)
    return t

def caption(s):
    a=p(s,'Caption');a.paragraph_format.space_before=Pt(3);a.paragraph_format.space_after=Pt(9)

def callout(tag, body):
    par=D.add_paragraph();par.style='Quote';rr=par.add_run(tag+'  ');rr.bold=True;par.add_run(body)

def add_link(par, label, url):
    rid=par.part.relate_to(url,RT.HYPERLINK,is_external=True)
    h=OxmlElement('w:hyperlink');h.set(qn('r:id'),rid)
    run=OxmlElement('w:r');rp=OxmlElement('w:rPr')
    color=OxmlElement('w:color');color.set(qn('w:val'),'126A87');rp.append(color)
    under=OxmlElement('w:u');under.set(qn('w:val'),'single');rp.append(under)
    run.append(rp); txt=OxmlElement('w:t');txt.text=label;run.append(txt);h.append(run);par._p.append(h)

# Cover
for _ in range(3):p('')
p('REUSABLE ACADEMIC SKILL  /  2026').runs[0].font.color.rgb=RGBColor(15,96,122)
D.add_paragraph('Academic Writing\n& Evidence Playbook','Title')
p('Multigenre skill • source research ZIP • citation integrity • tables, scientific figures and equations • Word QA • next-chat handoff')
p('Versi 3.0  |  2 November 2026  |  Bahasa Indonesia',style='Subtitle')
p('Manual ini adalah companion untuk file SKILL.md, playbook modul, templat CSV/Markdown, serta shortcut web yang terdapat pada ZIP. Ini bukan naskah penelitian dan bukan pengganti instruksi venue.')
D.add_page_break()
h('Petunjuk pemakaian dan lingkup',1)
p('Mulai dari folder 00_START dan pilih prompt singkat atau panjang. Unggah paket skill pada chat baru bersama brief, template dan data yang relevan. Penugasan melalui chat tidak membuat skill terinstal permanen; AI baru harus membaca berkas yang disediakan.')
tbl(['Mode','Input minimum','Output yang diharapkan'],[
('RESEARCH_ZIP','Topik + genre + venue/brief','Katalog, log, source cards, .url shortcuts, ZIP'),
('FULL_MANUSCRIPT','Brief + sumber + data/hasil','DOCX/MD utuh, tabel/figure/equations, audit'),
('REVISE_AND_AUDIT','Manuskrip + template + bukti','Revisi naskah utuh + issue register'),
('NEW_CHAT_HANDOFF','Berkas terakhir + keputusan','Updated handoff + continuation prompt')])
p('Keputusan tertinggi: benar secara sumber/data lebih penting daripada jumlah halaman, visual, atau gaya jurnal yang tampak meyakinkan. Tidak satu template yang cocok untuk semua genre.')

h('01  Peta kerja dari riset sampai rilis',1)
p('Urutan ini diadopsi sebagai proses produksi, bukan sebagai urutan subbab di dalam artikel.')
tbl(['Tahap','Pertanyaan kritis','Artefak kerja'],[
('Intake','Apa yang benar-benar diwajibkan?','project_brief, file inventory'),('Framing','Apa RQ, kontribusi dan batasnya?','RQ–evidence map'),
('Source hunt','Sumber primer dan paper terdekat mana?','reference catalog, .url ZIP'),('Synthesis','Studi mana yang betul-betul comparable?','literature matrix, citation ledger'),
('Method / data','Apa yang dikerjakan dan diukur?','protocol, results master'),('Writing','Apa argumen tiap bagian?','section map, manuscript'),
('Visual','Apa keputusan yang dibantu display ini?','visual register, assets'),('Audit','Klaim mana yang bisa dibantah?','red-team log'),
('Production','Apakah Word semua halamannya layak?','render + layout check'),('Handoff','Bisakah chat baru melanjutkan tanpa guess?','latest handoff, manifest')])
D.add_picture(str(ROOT/'examples'/'example_evidence_flow.png'),width=Cm(12.6))
D.paragraphs[-1].paragraph_format.keep_with_next=True
caption('Gambar 1. Diagram orisinal yang merangkum rantai klaim–bukti. Ini skema metodologis, bukan hasil pengujian sistem.')

h('02  Enam genre, enam logika penulisan',1)
tbl(['Genre','Kerangka argumentasi yang relevan','Bahaya lazim'],[
('Esai','Status quo → thesis → evidence → counterargument → implication','Mengarang hasil survei untuk memperindah ide'),
('KTI/proposal','Need → gap → proposed intervention → feasibility → planned evaluation','Menulis target sebagai hasil'),
('Artikel empiris','RQ → design → actual results → discussion/limitations','Overclaim dan sampling bias'),
('Technical report','Data → split → model → metric → errors → reproduction','Cache/OOF disebut full training'),
('Systems paper','Requirement → design → implementation → verification → outcome','Fitur prototipe dianggap efek operasional'),
('Literature review','Question → reproducible search (if systematic) → synthesis','Parade ringkasan paper dan PRISMA palsu')])
p('Terapkan instruksi jurnal/kompetisi tujuan ketika berbeda. IMRaD sering berguna untuk empiris, tetapi esai argumentatif dan proposal tidak selalu harus menyerupai artikel eksperimen.')

h('03  Riset internet dan ZIP shortcut',1)
p('Kumpulkan lima kategori: (1) aturan venue, (2) masalah dan statistik domain, (3) nearest-neighbor studies, (4) metodologi dan evaluasi, (5) artikel contoh gaya penulisan atau visual. Log string kueri, database, tanggal, kriteria dan keterbatasan akses.')
bullets(['Buka situs penerbit dan DOI; cross-check metadata dan bagian paper yang menyokong klaim.','Untuk Q1/Q2, catat basis kuartil, tahun dan kategori. SCImago SJR dan Scopus CiteScore tidak identik. SINTA dicek lewat indeks resmi dan masa akreditasi.','Simpan source card dengan tujuan, evidence locator, population, sampel, metrik, limit dan status.','Bangun file .url di Windows untuk tautan, bukan untuk mengklaim memiliki PDF yang belum diunduh.','Jangan redistribusi PDF atau figure pihak ketiga tanpa hak; tautan dan metadata aman sebagai default.'])
p('Windows shortcut format: [InternetShortcut] pada baris pertama dan URL=https://... pada baris berikutnya. Dalam paket ini tersedia 21 link, katalog CSV, index Markdown, dan script pembuat shortcut baru.')
callout('BEST PRACTICE', 'Urutkan bacaan berdasarkan kedekatan penelitian terhadap RQ (domain, populasi, metode, outcome), bukan sekadar impact factor atau daftar panjang.')

h('04  Citation entailment — empat tingkat verifikasi',1)
tbl(['Pemeriksaan','Pertanyaan','Keputusan'],[
('Existence','Apakah karya ada?','Jika tidak: hapus'),
('Metadata','Apakah judul, penulis, tahun, venue, DOI tepat?','Koreksi referensi'),
('Entailment','Apakah isi benar mendukung klaim?','Keep / narrow / replace'),
('Scope','Apakah populasi/outcome/waktu sebanding?','Klaim diberi batas')])
p('Misal artikel tentang usability tidak boleh dijadikan bukti bahwa hasil belajar meningkat. Paper arsitektur BERT boleh disitasi untuk metode BERT, bukan untuk nilai F1 model tim. Tabel internal dari data sendiri perlu data provenance, bukan referensi tidak berkaitan.')
p('Contoh kalimat ilmiah bernomor IEEE yang mengikuti sumber relevan: “Pedoman penyusunan artikel IEEE menekankan bahwa hasil perlu dilengkapi interpretasi dan batasan [1].” Angka [1] mengacu pada pedoman IEEE pada daftar bacaan manual ini; penomoran manuskrip baru harus diulang sesuai urutan muncul.')

h('05  Metode dan angka yang bisa dipertanggungjawabkan',1)
p('Pertanyaan penelitian menentukan estimand, unit, desain, data, analisis, ketidakpastian, dan klaim maksimum. Jika analisis observasional, jangan menyelundupkan kesimpulan kausal. Jika penelitian ML, cek split berdasarkan unit independen, data leakage, baseline, kesebandingan metrik, error analysis dan pemilihan threshold. Jika penelitian kualitatif, jelaskan proses sampling dan interpretasi tanpa menciptakan kutipan informan.')
callout('DID / DID NOT', 'Pisahkan OBSERVED, EXTERNAL_VERIFIED, ASSUMPTION_OR_SCENARIO, HYPOTHESIZED, PLANNED, dan UNVERIFIED; seluruh evaluasi yang belum dieksekusi tetap rencana.')
p('Dalam pelaporan persentase, sertakan numerator dan denominator. Peningkatan 70% menjadi 75% berarti 5 poin persentase dan 7,14% perubahan relatif, bukan “naik 5% relatif”. Untuk evaluasi inferensial, laporkan besar efek dan uncertainty dengan desain serta unit resampling yang benar.')

h('06  Tabel, figure, math, dan notes yang bermakna',1)
p('Tabel digunakan ketika nilai yang tepat penting; grafik untuk pola, distribusi dan ketidakpastian; diagram untuk proses/arsitektur. Setiap figure/tabel punya ID, data source, unit, denominator, caption, status, serta paragraf interpretasi. Hindari visual yang dibuat hanya demi jumlah halaman.')
tbl(['Jika ingin menjawab ...','Pilih ...','Wajib sebutkan ...'],[
('Berapa tiap kategori?','Tabel / bar chart','n, denominator, waktu'),
('Bagaimana trennya?','Time-series line','time zero, interval, unit'),
('Seberapa tersebar?','Distribution/ECDF/box','n, outlier, skala'),
('Bagaimana ketidakpastian?','Forest plot / interval','CI/method, group'),
('Bagaimana alur metode?','Process diagram','implemented vs planned'),
('Apa kesalahan model?','FP/FN/confusion matrix','gold labels & evaluation set')])
p('Contoh caption yang baik bukan “Gambar 2. Hasil penelitian,” melainkan “Gambar 2. Distribusi [indikator] menurut [kelompok] pada [periode], n=[...], skala=[...]. Sumber: [dataset dan kode].” Caption menerangkan isi; paragraf membahas temuan dan batasnya. Catatan di bawah tabel menguraikan definisi dan satuan, bukan menggantikan diskusi.')

h('07  Worked example: simulation with valid denominator',1)
p('KASUS SIMULASI: Sepuluh pesan ilustratif memiliki TP=3, FP=1, FN=3, TN=3. Ini bukan eksperimen pengguna, bukan hasil di lapangan. Precision = 3/4 = 0,75; recall = 3/6 = 0,50; F1 = 2PR/(P+R) = 0,60.')
caption('Tabel 1. Matriks kesalahan biner **simulasi** (n = 10 pesan hipotetis).')
tbl(['Prediksi / Rujukan','Relevan','Tidak relevan','Total'],[
('Diprioritaskan','3 (TP)','1 (FP)','4'),('Tidak diprioritaskan','3 (FN)','3 (TN)','6'),('Total','6','4','10')])
p('Catatan Tabel 1. Semua nilai contoh adalah simulasi. Denominator precision = 4 dan recall = 6, sehingga tidak boleh diklaim sebagai kinerja model empiris.')
D.add_picture(str(ROOT/'examples'/'example_metrics.png'),width=Cm(15.2))
D.paragraphs[-1].paragraph_format.keep_with_next=True
caption('Gambar 2. Presisi, recall dan F1 berdasarkan sepuluh observasi simulasi Tabel 1. Sumber: perhitungan contoh, file hypothetical_metrics.csv; tanpa uncertainty karena bukan sampel empiris.')
p('Perbedaan antara recall dan precision menunjukkan banyaknya FN relatif terhadap TP dan FP pada contoh. Ia tidak menyatakan akar linguistik kesalahan, generalisasi atau dampak pada proses kerja; semua itu memerlukan studi independen. Dengan demikian, visual membantu interpretasi sambil mempertahankan batas klaim.')

h('08  Before–after, bahasa akademik natural',1)
tbl(['Hindari','Perbaikan yang memenuhi fungsi analitis'],[
('“Di era digital AI sangat penting...”','“Studi ini menguji [fungsi terukur] pada [populasi] karena [bukti masalah].”'),
('“Sistem terbukti memperbaiki layanan.”','“Model diuji pada [data]; dampak layanan belum diukur.”'),
('“Studi A... B... C...”','“Studi A dan B berbeda pada [split/metrik], sehingga belum comparable.”'),
('“Hasil naik 5% signifikan.”','“Dari 70% ke 75%: +5 p.p. (simulasi), CI belum tersedia.”'),
('“Sumber: Google.”','“Sumber: [institusi/paper, DOI/URL, tabel/halaman, tahun].”')])
p('Transisi muncul karena alasan logis, bukan repetisi pertama–kedua–selain itu–dengan demikian. Kalimat pasif, terminology Inggris yang dimiringkan, dan frasa ketidakpastian tetap dipakai ketika memang meningkatkan ketepatan.')

h('09  Word assembly dan reviewer tiga putaran',1)
bullets(['A — Destructive logic: cari titik lemah metodologis, alternatif dan causal overclaim.','B — Backwards evidence: Conclusion → Discussion → Result → Analysis → Data/source.','C — Compression: hapus jargon, template-like prose dan pengulangan tanpa menghapus caveat.','Word: gunakan heading styles, tabel asli, figure resolusi sesuai venue, native equation jika mungkin, referensi silang dan footnote/notes yang jelas.','Render semua halaman dan inspect clipping, caption, nomor halaman, dua kolom, rumus, heading terpisah dan orphan tables.'])
p('Severity: critical (salah data/sumber), major (metode/dukungan utama tidak cukup), minor (format/kalimat). Audit hasil dan manifest diserahkan terpisah; isi manuskrip pembaca tidak memuat pesan AI, chat konfirmasi, atau prompt.')

h('10  Handoff lintas chat tanpa kehilangan konteks',1)
p('Simpan PROJECT_HANDOFF_LATEST.md dengan keputusan, daftar sumber aktual, hasil yang sudah direcompute, rentang klaim, file/folder dan checksum, visual registry, audit yang sudah dikerjakan, masalah terbuka serta satu next-chat prompt. Chat lain diberi ZIP, handoff dan input proyek nyata; jangan berasumsi bahwa konteks percakapan lama otomatis tersedia.')

h('Bacaan dan standar resmi',1)
for title,url in [
('IEEE — Structure Your Article','https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/structure-your-article/'),
('IEEE — Editorial Style Manual','https://journals.ieeeauthorcenter.ieee.org/your-role-in-article-production/ieee-editorial-style-manual/'),
('APA — Journal Article Reporting Standards','https://apastyle.apa.org/jars'),
('PRISMA — 2020 Statement','https://www.prisma-statement.org/prisma-2020'),
('EQUATOR — Reporting Guidelines','https://equator-network.org/reporting-guidelines/index.html'),
('PLOS — Better Figures (Rougier et al., 2014)','https://doi.org/10.1371/journal.pcbi.1003833'),
('PLOS — Literature Review (Pautasso, 2013)','https://doi.org/10.1371/journal.pcbi.1003149'),
('Crossref — References Best Practices','https://www.crossref.org/documentation/principles-practices/best-practices/references/'),
('SINTA — Jurnal','https://sinta.kemdiktisaintek.go.id/journals/index/'),
('SCImago — FAQ','https://www.scimagolab.com/faqs-2/'),
('ACM CHI — Successful Submission','https://chi2026.acm.org/guide-to-a-successful-submission/')]:
    par=D.add_paragraph()
    add_link(par,title,url)
callout('BATAS', 'Sumber di atas adalah pedoman umum/visual exemplar; riset baru memerlukan sumber primer sesuai topik. Tidak ada klaim telah menelaah semua teks penuh hanya dari tautan.')

D.core_properties.title='Evidence-Grounded Academic Writing — Playbook v3.0'
D.core_properties.subject='Portable research-to-publication skill with worked examples'
D.core_properties.author='Academic Writing Skill Toolkit'
OUT.parent.mkdir(parents=True,exist_ok=True)
D.save(OUT)
print('Wrote',OUT,'bytes',OUT.stat().st_size,'paragraphs',len(D.paragraphs),'tables',len(D.tables))
