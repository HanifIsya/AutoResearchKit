// AutoResearchKit Deck Builder — plugin Figma (jalankan sekali via
// Plugins > Development > Import plugin from manifest... > pilih folder ini).
// Membangun 15 slide (1280x720) di halaman baru "AutoResearchKit Deck".
// Semua angka = hasil audit PSO run #1 (OBSERVED). Ganti konten sesuai kebutuhan.
const BLUE = {r:0.106,g:0.447,b:0.784}, BLUE2 = {r:0.180,g:0.545,b:0.847},
      NAVY = {r:0.055,g:0.165,b:0.278}, CYAN = {r:0.208,g:0.714,b:0.910},
      ORANGE = {r:0.961,g:0.651,b:0.137}, INK = {r:0.122,g:0.196,b:0.278},
      MUTED = {r:0.369,g:0.447,b:0.522}, PANEL = {r:0.933,g:0.957,b:0.984},
      LINE = {r:0.788,g:0.855,b:0.922}, WHITE = {r:1,g:1,b:1},
      DARKBG = {r:0.071,g:0.075,b:0.078}, RED = {r:0.702,g:0.149,b:0.118},
      ORANGE_BG = {r:0.992,g:0.953,b:0.875}, LIGHTBLUE = {r:0.863,g:0.922,b:0.980};
const F = "Montserrat";
const W = 1280, H = 720, M = 50;
const SECTIONS = ["Pendahuluan","Analisa","Hasil","Benchmark","Rekomendasi","Penutup"];

function hex(c){return c}
async function main(){
  for (const s of ["Regular","Medium","SemiBold","Bold"]) await figma.loadFontAsync({family:F,style:s});
  await figma.loadFontAsync({family:"Roboto Mono",style:"Regular"});
  const page = figma.createPage(); page.name = "AutoResearchKit Deck";
  const mk = {}; // helper factory bound to page
  const rect = (p,x,y,w,h,fill,r,stroke,sw)=>{const n=figma.createRectangle();n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:"SOLID",color:fill}];if(r)n.cornerRadius=r;if(stroke){n.strokes=[{type:"SOLID",color:stroke}];n.strokeWeight=sw||1.5}p.appendChild(n);return n};
  const txt = (p,x,y,w,chars,size,style,color,opts={})=>{const n=figma.createText();n.fontName={family:F,style:style||"Regular"};n.characters=chars;n.fontSize=size;n.fills=[{type:"SOLID",color:color||INK}];n.x=x;n.y=y;n.resize(w,n.height);if(opts.align)n.textAlignHorizontal=opts.align;if(opts.lh)n.lineHeight={value:opts.lh,unit:"PERCENT"};p.appendChild(n);return n};
  const mono = (p,x,y,w,chars,size,color)=>{const n=figma.createText();n.fontName={family:"Roboto Mono",style:"Regular"};n.characters=chars;n.fontSize=size||11;n.fills=[{type:"SOLID",color:color||{r:0.788,g:0.820,b:0.851}}];n.x=x;n.y=y;n.resize(w,n.height);p.appendChild(n);return n};
  const slide = (name)=>{const f=figma.createFrame();f.name=name;f.resize(W,H);f.x=0;f.y=(mk.i++)*(H+100);f.fills=[{type:"SOLID",color:WHITE}];page.appendChild(f);return f};
  mk.i = 0;
  const secIdx = (f,i)=>{const sw=(W-170)/6;SECTIONS.forEach((nm,j)=>{txt(f,50+j*sw,H-34,sw,nm,10,j===i?"Bold":"Regular",j===i?NAVY:{r:0.616,g:0.682,b:0.749},{align:"CENTER"})});rect(f,W-72,H-46,42,30,BLUE,4);const n=txt(f,W-72,H-46,42,String(mk.n||"").padStart(2,"0"),11,"Bold",WHITE,{align:"CENTER"});n.y=H-46+5;};
  const badge = (f)=>{rect(f,W-250,22,200,52,WHITE,10,LINE,1);const t=txt(f,W-250,22,200,"AutoResearchKit",12,"Bold",NAVY,{align:"CENTER"});t.y=22+16};
  const header = (f,i,kicker,aksiRuns)=>{
    badge(f);
    txt(f,M,24,700,kicker.toUpperCase(),12,"SemiBold",MUTED);
    let y=52; aksiRuns.forEach(r=>{const t=txt(f,M,y,760,r[0],17,"Bold",r[1]||NAVY);y+=t.height+2});
    rect(f,M,y+4,W-2*M,3,CYAN);
    secIdx(f,i);
  };
  const secBar = (f,x,y,w,label)=>{rect(f,x,y,w,40,BLUE,6);rect(f,x+w-55,y,55,40,BLUE2,6);txt(f,x,y,w,label,14,"Bold",WHITE,{align:"CENTER"}).y=y+9};
  const panel = (f,x,y,w,h,title,stroke)=>{rect(f,x,y,w,h,WHITE,8,stroke||BLUE,2);if(title){rect(f,x+10,y+12,w-20,36,BLUE,4);txt(f,x+10,y+12,w-20,title,13,"Bold",WHITE,{align:"CENTER"}).y=y+20;return y+58}return y+14};
  const statBox = (f,x,y,w,h,val,label,o={})=>{rect(f,x,y,w,h,o.fill||WHITE,6,o.border||BLUE,2);const v=txt(f,x+8,y+10,w-16,val,o.vs||19,"Bold",o.vc||NAVY,{align:"CENTER"});txt(f,x+8,y+10+v.height+6,w-16,label,o.ls||9.5,"Regular",o.lc||MUTED,{align:"CENTER",lh:115})};
  const insight = (f,x,y,w,h,text)=>{rect(f,x,y-2,100,27,ORANGE,0);txt(f,x,y-2,100,"Key Insight",9.5,"Bold",{r:0.361,g:0.259,b:0},{align:"CENTER"}).y=y+4;rect(f,x,y+25,w,h,ORANGE_BG,0,ORANGE,1.4);txt(f,x+13,y+34,w-26,text,10,"Regular",{r:0.353,g:0.275,b:0.196},{lh:120})};
  const bullets = (f,x,y,w,items,size,gap)=>{let cy=y;items.forEach(t=>{rect(f,x,cy+6,6,6,BLUE,3);const n=txt(f,x+16,cy,w-16,t,size||10.5,"Regular",INK,{lh:118});cy+=n.height+(gap||10)});return cy};

  // ══ SLIDE 01 — COVER (terang, gaya referensi) ══
  { const f=slide("Slide 01 — Cover"); f.fills=[{type:"SOLID",color:LIGHTBLUE}]; mk.n=1;
    rect(f,W-250,22,200,52,WHITE,10);txt(f,W-250,22,200,"AutoResearchKit",12,"Bold",NAVY,{align:"CENTER"}).y=38;
    rect(f,M,110,560,230,BLUE,14);
    txt(f,M+26,132,510,"ANALISIS KODE",30,"Bold",WHITE,{lh:105});
    txt(f,M+26,178,510,"MACHINE LEARNING",30,"Bold",WHITE,{lh:105});
    txt(f,M+26,232,510,"Sistem Rekomendasi Menu Harian dengan Particle Swarm Optimization",14,"Medium",{r:0.851,g:0.925,b:0.988},{lh:120});
    txt(f,M,372,620,"Audit implementasi  ·  reproduksi 10 seed  ·  benchmark patch empiris",15,"Bold",NAVY);
    txt(f,M,400,620,"4 modul Python · 596 baris · dataset 6 sheet (421 baris) · 23 blok kode terverifikasi",12,"Regular",INK);
    txt(f,M,H-95,400,"Presented by:",13,"Regular",INK);
    txt(f,M,H-68,400,"AutoResearchKit — 2026",17,"Bold",ORANGE);
    rect(f,700,H-80,530,62,WHITE,8,BLUE,2);
    txt(f,715,H-80,500,"Deliverable: Naskah akademik (DOCX) + deck presentasi (PPTX)",11,"SemiBold",NAVY,{lh:120}).y=H-66;
    // swarm mini-motif: gbest star + dots
    const cx=1020,cy=330;[...Array(16)].forEach((_,i)=>{const a=i/16*Math.PI*2,rr=150+((i*53)%120);const d=figma.createEllipse();d.resize(12,12);d.x=cx+Math.cos(a)*rr;d.y=cy+Math.sin(a)*rr*0.8;d.fills=[{type:"SOLID",color:{r:0.616,g:0.812,b:0.949}}];d.strokes=[{type:"SOLID",color:BLUE}];d.strokeWeight=1;f.appendChild(d)});
    const star=figma.createStar();star.pointCount=5;star.resize(70,70);star.x=cx-35;star.y=cy-35;star.fills=[{type:"SOLID",color:ORANGE}];f.appendChild(star);
    txt(f,cx-40,cy+45,80,"gbest",13,"Bold",ORANGE,{align:"CENTER"});
  }
  // ══ SLIDE 02 — RINGKASAN EKSEKUTIF ══
  { const f=slide("Slide 02 — Ringkasan Eksekutif"); mk.n=2;
    header(f,0,"Ringkasan Eksekutif",[["Sistem PSO menemukan menu "],[["zero-error",CYAN]],[" — tetapi hanya "],[["7 dari 100",ORANGE]],[" kandidat unik"]]);
    secBar(f,M,140,540,"Tiga Hal yang Dilakukan");
    const pts=[["Kode dianalisa menyeluruh","4 modul Python dengan 23 blok kode terverifikasi byte-per-byte, flowchart 300 DPI, simulasi numerik 7 langkah dengan angka run asli."],
      ["Anomali metrik ditemukan","Fitness = \u221E membuat semua solusi sempurna tak terbedakan: Top-5 rekomendasi identik dan 93% kandidat duplikat."],
      ["Patch tervalidasi empiris","Empat perubahan minimal diuji pada 10 seed: success rate 0,7 \u2192 0,9 dan keragaman solusi naik 6,6\u00D7."]];
    pts.forEach((p,i)=>{const y=205+i*130;const c=figma.createEllipse();c.resize(34,34);c.x=M;c.y=y;c.fills=[{type:"SOLID",color:BLUE}];f.appendChild(c);txt(f,M,y+7,34,String(i+1),13,"Bold",WHITE,{align:"CENTER"});
      rect(f,M+48,y-4,470,104,PANEL,6,LINE,1);
      txt(f,M+66,y+6,440,p[0],13.5,"Bold",NAVY);
      txt(f,M+66,y+30,440,p[1],10,"Regular",INK,{lh:120});});
    secBar(f,640,140,510,"Angka Kunci");
    statBox(f,640,205,510,80,"5,68 \u00D7 10\u00B2\u2075","ruang solusi kombinasi menu 14 dimensi");
    statBox(f,640,297,510,80,"7 dari 100","kandidat unik run asli (93% duplikat)",{border:ORANGE,vc:{r:0.722,g:0.478,b:0.055}});
    statBox(f,640,389,510,80,"0,9 vs 0,7","success rate patch v2 vs baseline (10 seed)");
    statBox(f,640,481,510,80,"6,6\u00D7","kenaikan keragaman solusi (10,5 \u2192 69,8 unik)");
    insight(f,640,580,510,70,"Satu fungsi fitness yang mengembalikan \u221E cukup untuk meruntuhkan nilai lima rekomendasi teratas.");
  }
  // ══ SLIDE 03 — KONTEKS & MASALAH ══
  { const f=slide("Slide 03 — Konteks & Masalah"); mk.n=3;
    header(f,0,"Pendahuluan",[["Aplikasi konsol yang mengoptimasi "],[["14 porsi makan per hari",CYAN]],[" terhadap kebutuhan gizi"]]);
    secBar(f,M,140,470,"Bagaimana Sistem Bekerja");
    const steps=[["Input profil","Pria/Wanita, berat, tinggi, usia, aktivitas lewat CLI"],["Rentang gizi harian","BBI Broca + koreksi usia & aktivitas \u2192 5 target nutrisi"],["PSO mencari kombinasi","100 partikel \u00D7 200 iterasi pada ruang 5,68 \u00D7 10\u00B2\u2075"]];
    steps.forEach((st,i)=>{const y=205+i*115;const c=figma.createEllipse();c.resize(32,32);c.x=M;c.y=y+2;c.fills=[{type:"SOLID",color:BLUE}];f.appendChild(c);txt(f,M,y+9,32,String(i+1),12,"Bold",WHITE,{align:"CENTER"});
      rect(f,M+46,y,424,98,PANEL,6,LINE,1);txt(f,M+62,y+8,395,st[0],12.5,"Bold",NAVY);txt(f,M+62,y+32,395,st[1],10,"Regular",INK,{lh:118});});
    insight(f,M,575,470,80,"Dengan anggaran 20.000 evaluasi, PSO hanya menjelajah 3,5 \u00D7 10\u207B\u00B2\u2070 persen ruang solusi — kualitas mekanisme eksplorasi menentukan segalanya.");
    secBar(f,560,140,570,"Pertanyaan yang Dijawab",NAVY);
    rect(f,560,205,570,225,WHITE,8,BLUE,2);
    bullets(f,582,222,530,["Apakah pipeline PSO menghasilkan kombinasi yang memenuhi target gizi?","Mengapa lima rekomendasi teratas run asli identik semua?","Seberapa stabil perilaku bila dijalankan berulang (10 seed)?","Patch minimal apa yang memberi efek terbesar dan terbukti empiris?"],11,14);
    statBox(f,560,450,570,80,"4 temuan teknis \u00B7 5 fungsional \u00B7 4 dataset","seluruhnya berbukti OBSERVED — diukur dari run nyata",{vs:14});
    insight(f,560,548,570,52,"Ketiga temuan paling berdampak berakar di satu fungsi: hitung_fitness().");
  }
  // ══ SLIDE 04 — DATA & KONFIGURASI ══
  { const f=slide("Slide 04 — Data & Konfigurasi"); mk.n=4;
    header(f,1,"Analisa \u00B7 Input",[["Enam sheet resep ("],[["421 baris",CYAN]],[") tanpa sel kosong menjadi peta 14 dimensi"]]);
    secBar(f,M,140,460,"Dataset resep.xlsx");
    const rows=[["Sarapan","35","lauk pagi"],["Makan Siang","35","lauk siang"],["Makan Malam","35","lauk malam"],["Sayur","55","sayur pagi/siang/malam"],["Buah","258","buah 4 waktu"],["Nasi","3","nasi 3 waktu (variasi minimal!)"]];
    rect(f,M,205,460,26,BLUE,0);txt(f,M+10,205,80,"Sheet",11,"Bold",WHITE).y=211;txt(f,M+110,205,60,"Baris",11,"Bold",WHITE).y=211;txt(f,M+190,205,260,"Peran",11,"Bold",WHITE).y=211;
    rows.forEach((r,i)=>{const y=231+i*38;rect(f,M,y,460,38,i%2?WHITE:PANEL,0,LINE,0.75);txt(f,M+10,y+10,90,r[0],10.5,"Regular",INK);txt(f,M+110,y+10,60,r[1],10.5,"SemiBold",NAVY);txt(f,M+190,y+10,260,r[2],10.5,"Regular",INK)});
    txt(f,M,475,460,"Kolom rating & bahan tidak dipakai algoritma \u2014 peluang multi-kriteria.",10,"Regular",MUTED);
    insight(f,M,515,460,120,"Sheet Nasi hanya 3 menu \u2192 variasi nasi dibatasi 3\u00B3 = 27 kombinasi; Buah mendominasi 6 dari 14 dimensi partikel.");
    secBar(f,560,140,570,"Konfigurasi PSO (pso.py)");
    rect(f,560,205,570,290,WHITE,8,BLUE,2);
    const cfg=[["Partikel \u00D7 iterasi","100 \u00D7 200"],["Dimensi partikel","14 (indeks menu, integer)"],["Bobot inersia (LVIW)","w = 0,9 \u2192 0,4 linier"],["Koefisien akselerasi","c\u2081 = c\u2082 = 1"],["Fitness","1000 / penalti (\u221E bila pas)"],["Seed","tidak ada \u2014 non-reproduksibel"]];
    cfg.forEach((c,i)=>{const y=225+i*45;txt(f,580,y,200,c[0],10.5,"Regular",MUTED);txt(f,790,y,320,c[1],10.5,"Bold",i===5?RED:NAVY);if(i<5)rect(f,580,y+36,530,1,LINE,0)});
    insight(f,560,520,570,90,"Target kalori status Normal adalah satu titik (min = max) \u2014 lanskap pencarian menyempit drastis di dimensi kalori.");
  }
  // ══ SLIDE 05 — ARSITEKTUR ══
  { const f=slide("Slide 05 — Arsitektur Pipeline"); mk.n=5;
    header(f,1,"Analisa \u00B7 Arsitektur",[["Empat modul dengan tanggung jawab tegas: "],[["CLI \u2192 gizi \u2192 PSO \u2192 laporan",CYAN]]]);
    const stages=[["PENGGUNA (CLI)","Input profil pengguna",NAVY],["nutrisi.py","BBI + status gizi + rentang makro",BLUE],["pso.py — init","100 partikel \u00D7 14 dimensi acak",{r:0.773,g:0.353,b:0.067}],["pso.py — evaluasi","penalti \u2192 fitness 1000/P",{r:0.773,g:0.353,b:0.067}],["pso.py — loop LVIW","200 iterasi, pbest & gbest",{r:0.773,g:0.353,b:0.067}],["pso.py — ranking","urut + dedup + RMSE/MAE",{r:0.773,g:0.353,b:0.067}],["output.py","Excel 3 sheet",{r:0.329,g:0.510,b:0.208}],["hasil_rekomendasi.xlsx","rekomendasi siap pakai",{r:0.329,g:0.510,b:0.208}]];
    stages.forEach((st,i)=>{const y=150+i*68;
      rect(f,M,y,320,56,PANEL,8,st[2],2);
      txt(f,M+12,y+6,300,st[0],11,"Bold",st[2]);
      txt(f,M+12,y+26,300,st[1],9.5,"Regular",INK);
      if(i<7){rect(f,M+152,y+56,3,12,{r:0.42,g:0.45,b:0.48},0)}});
    const mods=[["app.py \u2014 75 baris","Orkestrasi CLI: validasi input, pemanggilan pipeline, pelaporan ringkas."],["nutrisi.py \u2014 63 baris","Model domain gizi: BBI Broca, status Kurus/Normal/Gemuk, rentang makro AMDR."],["pso.py \u2014 282 baris","Inti algoritma: penalti relatif, fitness, loop LVIW, ranking + dedup."],["output.py \u2014 176 baris","Laporan Excel 3 sheet: Top-5, 100 kombinasi, kombinasi unik."]];
    mods.forEach((m,i)=>{const y=150+i*112;rect(f,470,y,760,100,WHITE,8,BLUE,2);txt(f,492,y+14,720,m[0],13,"Bold",BLUE);txt(f,492,y+42,720,m[1],10.5,"Regular",INK,{lh:118})});
    insight(f,470,610,760,52,"Pemisahan modular sehat \u2014 seluruh perbaikan cukup menyentuh pso.py tanpa membongkar modul lain.");
  }
  // ══ SLIDE 06 — HASIL RUN ASLI ══
  { const f=slide("Slide 06 — Hasil Run Asli"); mk.n=6;
    header(f,2,"Hasil \u00B7 Run Asli",[["Kalori tepat "],[["2457 kkal",CYAN]],[" \u2014 gizi sempurna, tetapi ranking rekomendasi rusak"]]);
    secBar(f,M,140,460,"Rank #1 vs Target Gizi (run asli)");
    rect(f,M,205,460,240,WHITE,8,BLUE,2);
    const cmp=[["Kalori (kkal)","2457,00","2457,0 \u2013 2457,0"],["Karbohidrat (g)","389,69","276,4 \u2013 399,3"],["Protein (g)","100,72","61,4 \u2013 122,9"],["Lemak (g)","63,32","54,6 \u2013 68,2"],["Serat (g)","33,10","25 \u2013 35"]];
    cmp.forEach((c,i)=>{const y=218+i*45;txt(f,M+18,y,170,c[0],10.5,"Regular",INK);txt(f,M+200,y,110,c[1],12,"Bold",NAVY);txt(f,M+320,y,130,c[2],10,"Regular",MUTED);if(i<4)rect(f,M+18,y+36,424,1,LINE,0)});
    statBox(f,M,470,220,80,"RMSE 0,0000","deviasi nol terhadap target",{vs:14});
    statBox(f,M+240,470,220,80,"MAE 0,0000","penalti persis nol",{vs:14});
    insight(f,M,575,460,80,"RQ1 terjawab: target gizi tercapai persis pada run asli.");
    secBar(f,560,140,570,"Log Iterasi (konsol)");
    rect(f,560,205,570,130,DARKBG,8);
    mono(f,582,222,530,"Partikel=100 | Iterasi=200",10,{r:0.545,g:0.580,b:0.616});
    mono(f,582,244,530,"Iterasi    1/200 | gbest fitness=18119.4690",10);
    mono(f,582,266,530,"Iterasi   50/200 | gbest fitness=inf",10,{r:1,g:0.482,b:0.447});
    mono(f,582,288,530,"Total kombinasi : 100 | unik: 7",10,{r:0.545,g:0.580,b:0.616});
    insight(f,560,360,570,110,"fitness = \u221E sejak sekitar iterasi ke-50: penalti nol tercapai, tetapi seluruh solusi sempurna bernilai sama \u2014 tak ada yang bisa dibedakan.");
    rect(f,560,495,570,80,WHITE,6,RED,2);
    txt(f,575,505,540,"Top-5 = 5 salinan identik",14,"Bold",RED,{align:"CENTER"});
    txt(f,575,532,540,"lima rekomendasi teratas adalah kombinasi yang sama persis",9.5,"Regular",{r:0.541,g:0.294,b:0.267},{align:"CENTER"});
  }
  // ══ SLIDE 07 — TEMUAN ══
  { const f=slide("Slide 07 — Temuan"); mk.n=7;
    header(f,2,"Hasil \u00B7 Temuan",[["13 temuan berbukti: "],[["3 memengaruhi nilai produk",ORANGE]],[" secara langsung"]]);
    const cols=[["Fungsional \u00B7 5",BLUE,["Top-5 rekomendasi identik (5 salinan)","Ranking tak bermakna saat fitness \u221E","Fitness \u221E ditulis 999999,0 di Excel","Tanpa penjelasan alasan rekomendasi","Input fisiologis tak divalidasi"]],
      ["Teknis / Algoritmik \u00B7 7",RED,["Fitness \u221E non-diskriminatif","Tidak ber-seed \u2192 tak reproduksibel","Konvergensi dini (rata-rata 10,5 unik)","Kecepatan tanpa clamp + posisi round()","c\u2081 = c\u2082 = 1 di bawah standar \u2248 2,0","Target kalori satu titik (Normal)","Tanpa early stopping"]],
      ["Dataset \u00B7 4",BLUE,["Nasi hanya 3 menu (3\u00B3 = 27 kombinasi)","Kolom rating/bahan tak terpakai","Buah mendominasi 6 dari 14 dimensi","Tanpa penanda vegetarian/halal/alergen"]]];
    cols.forEach((c,i)=>{const x=M+i*398;
      rect(f,x,140,378,455,WHITE,8,c[1],2);
      rect(f,x+12,152,354,36,c[1],4);
      txt(f,x+12,152,354,c[0],12.5,"Bold",WHITE,{align:"CENTER"}).y=160;
      bullets(f,x+24,205,340,c[2],10,10);});
    insight(f,M,615,W-2*M,50,"Tiga temuan paling berdampak \u2014 Top-5 identik, fitness non-diskriminatif, seed hilang \u2014 semuanya berakar dari pso.py dan sudah punya patch terukur.");
  }
  // ══ SLIDE 08 — ANATOMI MASALAH ══
  { const f=slide("Slide 08 — Anatomi Masalah #1"); mk.n=8;
    header(f,2,"Hasil \u00B7 Anatomi Masalah #1",[["Satu baris mencetak "],[["float('inf')",CYAN]],[" dan seluruh mekanisme ranking lumpuh"]]);
    rect(f,M,145,500,160,DARKBG,8);
    mono(f,M+18,163,470,"def hitung_fitness(total_penalti):",10.5);
    mono(f,M+18,185,470,"    if total_penalti == 0:",10.5);
    mono(f,M+18,207,470,"        return float('inf')",10.5,{r:1,g:0.482,b:0.447});
    mono(f,M+18,229,470,"    return (1.0 / total_penalti) * 1000.0",10.5);
    mono(f,M+18,258,470,"# pso.py baris 49-52 \u2014 sumber terverifikasi",9.5,{r:0.545,g:0.580,b:0.616});
    const fx=[["Dampak 1","argsort(-fitness) menempatkan semua kandidat \u221E dalam satu seri; urutan mengikuti indeks partikel, bukan kualitas gizi."],["Dampak 2","Perbandingan tetap menyalin posisi tanpa pemecah seri \u2014 lima pbest identik pun tersimpan."],["Dampak 3","output.py menulis 999999,0 untuk menampung \u221E; pembaca tak bisa membedakannya dari nilai asli."]];
    fx.forEach((d,i)=>{const y=325+i*92;rect(f,M,y,500,82,PANEL,6,LINE,1);txt(f,M+14,y+8,470,d[0]+" \u2014 "+d[1],9.8,"Regular",INK,{lh:116})});
    secBar(f,560,145,570,"Kenapa Ini Serius",NAVY);
    txt(f,572,205,545,"Nilai rekomendasi penasihat gizi ada pada variasinya. Ketika lima slot teratas berisi kombinasi yang sama, pengguna kehilangan empat dari lima pilihan yang seharusnya diterima.",11,"Regular",INK,{lh:125});
    // donut sederhana: 2 arc? gunakan ellipse dengan arcData
    const outer=figma.createEllipse();outer.resize(190,190);outer.x=600;outer.y=330;
    outer.fills=[{type:"SOLID",color:RED}];outer.arcData={startingAngle:-Math.PI/2,endingAngle:-Math.PI/2+Math.PI*2*0.93,innerRadius:0.62};f.appendChild(outer);
    const inner=figma.createEllipse();inner.resize(190,190);inner.x=600;inner.y=330;
    inner.fills=[{type:"SOLID",color:BLUE}];inner.arcData={startingAngle:-Math.PI/2+Math.PI*2*0.93,endingAngle:-Math.PI/2+Math.PI*2,innerRadius:0.62};f.appendChild(inner);
    txt(f,600+55,330+70,80,"93%",22,"Bold",RED,{align:"CENTER"});
    txt(f,600+45,330+100,100,"duplikat",9.5,"Regular",MUTED,{align:"CENTER"});
    txt(f,820,390,300,"7  dari 100 pbest benar-benar unik pada run asli",12,"Regular",INK,{lh:125});
  }
  // ══ SLIDE 09 — PATCH ══
  { const f=slide("Slide 09 — Benchmark \u00B7 Patch"); mk.n=9;
    header(f,3,"Benchmark \u00B7 Patch",[["Empat perubahan minimal di "],[["pso.py",CYAN]],[" \u2014 tanpa menyentuh modul lain"]]);
    const patches=[["v2a \u2014 Fitness cap","1e12 menggantikan inf sehingga solusi tetap terbanding dan Excel tak perlu masking."],["v2b \u2014 Tie-break RMSE/MAE","Kandidat zero-error diurutkan leksikografis: fitness \u2193, RMSE \u2191, MAE \u2191."],["v2c \u2014 Velocity clamp","Kecepatan dibatasi 20% rentang dimensi untuk meredam overshoot antar indeks."],["v2d \u2014 Parameter seed","RandomState(seed) menjadikan setiap run dapat direproduksi dan diaudit."]];
    patches.forEach((p,i)=>{const x=M+(i%2)*600,y=145+Math.floor(i/2)*140;
      rect(f,x,y,580,124,WHITE,8,BLUE,2);
      const c=figma.createEllipse();c.resize(30,30);c.x=x+16;c.y=y+14;c.fills=[{type:"SOLID",color:BLUE}];f.appendChild(c);
      txt(f,x+16,y+21,30,String(i+1),11,"Bold",WHITE,{align:"CENTER"});
      txt(f,x+58,y+10,500,p[0],12.5,"Bold",NAVY);txt(f,x+58,y+36,500,p[1],10,"Regular",INK,{lh:118});});
    secBar(f,M,440,W-2*M,"Metrik Domain yang Dipakai (menggantikan akurasi/F1 yang tak relevan)");
    const met=[["Success Rate","proporsi seed yang menemukan solusi zero-error"],["Diversity","rata-rata jumlah kombinasi unik di akhir run"],["Top-5 Distinctness","kebalikan rasio Top-5 identik \u2014 semakin rendah semakin baik"]];
    met.forEach((m,i)=>{const x=M+20+i*400;txt(f,x,500,380,m[0],12.5,"Bold",BLUE);txt(f,x,524,380,m[1],10,"Regular",MUTED,{lh:118})});
    insight(f,M,590,W-2*M,50,"Patch dinyatakan berhasil hanya bila mengungguli baseline pada populasi benih \u2014 bukan pada satu run keberuntungan.");
  }
  // ══ SLIDE 10 — DESAIN BENCHMARK ══
  { const f=slide("Slide 10 — Desain Benchmark"); mk.n=10;
    header(f,3,"Benchmark \u00B7 Desain",[["Baseline vs Patch v1 vs Patch v2 \u2014 "],[["10 seed",CYAN]],[", profil identik, tanpa perubahan lain"]]);
    const steps=[["Profil terkontrol","Pria \u00B7 63 kg \u00B7 170 cm \u00B7 25 th \u00B7 Sedang \u2192 kalori 2457 kkal"],["10 seed eksternal","Seed 1\u201310 diinjeksikan; baseline asli tidak ber-seed"],["Evaluasi penuh 200 iterasi","Tanpa early stopping agar perbandingan adil"],["Metrik per run","zero-error, konvergensi, unik, unik-zero, RMSE/MAE, Top-5"]];
    steps.forEach((st,i)=>{const x=M+i*300;
      const ch=figma.createPolygon();ch.pointCount=3;ch.resize(20,90);ch.x=x;ch.y=145;ch.rotation=90;ch.fills=[{type:"SOLID",color:i===3?NAVY:BLUE}];f.appendChild(ch);
      rect(f,x+22,145,258,90,i===3?NAVY:BLUE,0);
      txt(f,x+32,155,238,st[0],11,"Bold",WHITE,{align:"CENTER",lh:110});
      txt(f,x+10,250,280,st[1],9.5,"Regular",INK,{lh:115});});
    secBar(f,M,360,W-2*M,"Dua Iterasi Patch \u2014 Hasil Negatif Dilaporkan Juga");
    const tbl=[["Varian","Isi patch","Hasil (10 seed)"],["Patch v1","cap + \u03B5 10\u207B\u00B9\u00B2 + early stop (patience 30) + Vmax 10%","Diversity naik (67,0) tetapi success rate anjlok 0,7 \u2192 0,4 \u2014 early stop menghentikan pencarian terlalu dini"],["Patch v2","cap + tie-break + seed + Vmax 20% (tanpa early stop)","Unggul di seluruh metrik domain \u2014 success rate 0,9; diversity 69,8"]];
    tbl.forEach((r,i)=>{const y=418+i*66;const hgt=i===0?40:66;
      rect(f,M,y,W-2*M,hgt,i===0?BLUE:(i%2?PANEL:WHITE),0,LINE,0.75);
      const c=i===0?WHITE:(r[2].startsWith("Diversity")?{r:0.541,g:0.294,b:0.267}:{r:0.118,g:0.42,b:0.235});
      if(i===0){txt(f,M+14,y+10,150,r[0],11,"Bold",WHITE);txt(f,M+170,y+10,380,r[1],11,"Bold",WHITE);txt(f,M+570,y+10,420,r[2],11,"Bold",WHITE)}
      else{txt(f,M+14,y+14,140,r[0],11,"Bold",NAVY);txt(f,M+170,y+12,380,r[1],10,"Regular",INK,{lh:115});txt(f,M+570,y+12,420,r[2],10,"SemiBold",c,{lh:115})}});
    insight(f,M,580,W-2*M,55,"Perbaikan tidak bisa ditambahkan buta \u2014 tiap kelompok perubahan harus diukur (ablation bertingkat).");
  }
  // ══ SLIDE 11 — HASIL BENCHMARK (bar digambar native) ══
  { const f=slide("Slide 11 — Hasil Benchmark"); mk.n=11;
    header(f,3,"Benchmark \u00B7 Hasil",[["Patch v2 unggul di "],[["seluruh metrik domain",ORANGE]],[" \u2014 terukur pada 10 seed"]]);
    const charts=[["Success Rate \u2191",[["Base",0.7,RED],["v1",0.4,{r:0.541,g:0.541,b:0.541}],["v2",0.9,BLUE]],"1.0"],["Kombinasi Unik \u2191",[["Base",10.5,RED],["v1",67.0,{r:0.541,g:0.541,b:0.541}],["v2",69.8,BLUE]],"80"],["Top-5 Identik \u2193 (rendah=baik)",[["Base",0.8,RED],["v1",0.7,{r:0.541,g:0.541,b:0.541}],["v2",0.2,BLUE]],"1.0"]];
    charts.forEach((ch,ci)=>{const x=M+ci*400;
      secBar(f,x,140,380,ch[0]);
      rect(f,x,200,380,215,WHITE,6,LINE,1);
      const base=415-25, hMax=150, max=ch[2]==="80"?80:1;
      ch[1].forEach((b,i)=>{const bh=b[1]/max*hMax, bw=70, bx=x+55+i*115;
        rect(f,bx,base-bh,bw,bh,b[2],4);
        txt(f,bx-15,base-bh-24,100,String(b[1]).replace(".",","),11,"Bold",NAVY,{align:"CENTER"});
        txt(f,bx-15,base+8,100,b[0],10,"Regular",MUTED,{align:"CENTER"});});
      rect(f,x+40,base+1,320,1,{r:0.65,g:0.68,b:0.71},0);});
    statBox(f,M,440,380,95,"2,0 \u2192 5,7","solusi zero-error unik per run \u2014 Top-5 kini bisa berisi 5 menu berbeda",{vs:16});
    statBox(f,M+400,440,380,95,"+9 iterasi","konvergensi sedikit lebih lambat (60,7 \u2192 69,8) \u2014 konsekuensi wajar",{vs:16});
    statBox(f,M+800,440,400,95,"0,2 vs 0,8","rasio Top-5 identik \u2014 turun 75% terhadap baseline",{vs:16,border:ORANGE,vc:{r:0.722,g:0.478,b:0.055}});
    txt(f,M,552,W-2*M,"Sumber: benchmark_multiseed.csv \u2014 30 run (3 varian \u00D7 10 seed) dijalankan penuh pada profil identik.",9.5,"Regular",MUTED);
    insight(f,M,585,W-2*M,60,"Kenaikan success rate dan keragaman terjadi bersamaan \u2014 bukan trade-off satu lawan satu.");
  }
  // ══ SLIDE 12 — KONVERGENSI (small multiples native) ══
  { const f=slide("Slide 12 — Konvergensi & Stabilitas"); mk.n=12;
    header(f,3,"Benchmark \u00B7 Konvergensi",[["9 dari 10 seed mencapai zero-error \u2014 baseline hanya "],[["7 dari 10",ORANGE]]]);
    secBar(f,M,140,730,"Seed 1\u201310: apakah penalti nol tercapai?");
    const convB=[1,1,1,1,0,0,1,0,1,1], convV=[0,1,1,1,1,1,1,1,1,1];
    txt(f,M,205,300,"Baseline",13,"Bold",INK);
    convB.forEach((ok,i)=>{const x=M+120+i*60;rect(f,x,200,44,ok?90:26,ok?BLUE:RED,4);txt(f,x,295,44,String(i+1),9.5,"Regular",MUTED,{align:"CENTER"})});
    txt(f,M,345,300,"Patch v2",13,"Bold",INK);
    convV.forEach((ok,i)=>{const x=M+120+i*60;rect(f,x,340,44,ok?90:26,ok?BLUE:RED,4);txt(f,x,435,44,String(i+1),9.5,"Regular",MUTED,{align:"CENTER"})});
    txt(f,M+120,462,600,"tinggi penuh = zero-error tercapai (cap 10\u00B9\u00B2)  \u00B7  merah pendek = gagal \u2014 sumber: convergence_histories.json",9.5,"Regular",MUTED);
    statBox(f,830,140,400,105,"16\u2013153","rentang iterasi konvergensi v2 antar seed",{vs:16});
    statBox(f,830,262,400,105,"3 seed","baseline macet di fitness \u2248 2,2\u00D710\u2076 dan tak pernah zero-error",{vs:16,border:RED,vc:RED});
    statBox(f,830,384,400,105,"1 seed","v2 gagal zero-error \u2014 sistem tetap stokastik, bukan jaminan",{vs:16});
    insight(f,M,490,730,110,"Velocity clamp menahan lonjakan besar yang membuat baseline kehilangan zero-error pada seed 5, 6, dan 8. Satu seed v2 tetap gagal \u2014 PSO tetap stokastik; klaim yang sah adalah probabilitas sukses, bukan kepastian.");
  }
  // ══ SLIDE 13 — ROADMAP ══
  { const f=slide("Slide 13 — Roadmap Prioritas"); mk.n=13;
    header(f,4,"Rekomendasi",[["Roadmap tiga tingkat: "],[["P1 memperbaiki nilai produk",ORANGE]],[", P2 reproducibility, P3 pengalaman"]]);
    const prio=[["P1","KRITIS",RED,[["Fitness cap + tie-break RMSE/MAE","Top-5 langsung bermakna; ranking deterministik"],["Parameter seed + log konfigurasi","Setiap run dapat direproduksi dan diaudit"]]],
      ["P2","PENTING",ORANGE,[["Velocity clamp 20% rentang dimensi","Success rate 0,7 \u2192 0,9 (terukur)"],["Arsip kombinasi unik untuk Top-N","Variasi menu nyata untuk pengguna"]]],
      ["P3","PENINGKATAN",BLUE,[["Early stopping adaptif (patience \u2265 50)","Waktu turun tanpa menurunkan success rate"],["Rating selera & biaya sebagai kriteria sekunder","Personalisasi multi-kriteria dari kolom yang ada"]]]];
    prio.forEach((p,i)=>{const y=145+i*180;
      rect(f,M,y,125,160,p[2],10);
      txt(f,M,y+35,125,p[0],24,"Bold",WHITE,{align:"CENTER"});
      txt(f,M,y+82,125,p[1],8,"Bold",WHITE,{align:"CENTER"});
      p[3].forEach((it,j)=>{const iy=y+j*82;rect(f,M+150,iy,W-2*M-150,70,WHITE,6,p[2],1.6);
        txt(f,M+170,iy+10,W-2*M-190,it[0]+"  \u2014  "+it[1],11,"Regular",INK,{lh:118});});});
  }
  // ══ SLIDE 14 — KESIMPULAN ══
  { const f=slide("Slide 14 — Kesimpulan"); mk.n=14;
    header(f,5,"Penutup",[["Dari satu rekomendasi tak reproduksibel menjadi "],[["generator Top-N yang beragam, terukur, dan dapat diaudit",BLUE]]]);
    const concl=[["0,9","success rate (vs 0,7) \u2014 zero-error hampir selalu ditemukan"],["6,6\u00D7","keragaman solusi \u2014 69,8 kombinasi unik dari 100 partikel"],["75%","penurunan rasio Top-5 identik (0,8 \u2192 0,2)"],["4","perubahan minimal \u2014 semuanya lokal di pso.py"]];
    concl.forEach((c,i)=>{const x=M+i*300;rect(f,x,145,285,150,PANEL,8,BLUE,2);
      txt(f,x+14,158,257,c[0],24,"Bold",{r:0.722,g:0.478,b:0.055});
      txt(f,x+14,200,257,c[1],9.5,"Regular",INK,{lh:115});});
    secBar(f,M,325,W-2*M,"Jawaban Riset");
    const rq=[["RQ1","Sistem menemukan solusi zero-error (RMSE = MAE = 0,0000) tetapi fitness \u221E merusak ranking: Top-5 identik, 93% duplikat."],
      ["RQ2","Baseline SR 0,7 pada 10 seed dengan keragaman 10,5 unik; evaluasi satu run tidak memadai untuk klaim kinerja."],
      ["RQ3","Empat perubahan minimal menaikkan SR \u2192 0,9 dan keragaman 6,6\u00D7; iterasi konvergensi +9,1 sebagai konsekuensi wajar."]];
    rq.forEach((r,i)=>{const y=385+i*76;rect(f,M,y,W-2*M,66,WHITE,6,LINE,1.2);
      txt(f,M+20,y+8,W-2*M-40,r[0]+"  \u2014  "+r[1],10.5,"Regular",INK,{lh:118});});
    txt(f,M,630,W-2*M,"Seluruh temuan OBSERVED \u00B7 23 blok kode terverifikasi \u00B7 47 klaim angka lolos audit \u00B7 8 referensi DOI terverifikasi",9.5,"Regular",MUTED);
  }
  // ══ SLIDE 15 — TERIMA KASIH ══
  { const f=slide("Slide 15 — Terima Kasih"); f.fills=[{type:"SOLID",color:LIGHTBLUE}]; mk.n=15;
    txt(f,M,140,700,"TERIMA KASIH",42,"Bold",NAVY);
    rect(f,M,225,200,3,ORANGE,0);
    txt(f,M,250,640,"Naskah akademik lengkap: Particle Swarm Optimization pada Sistem Rekomendasi Menu Harian \u2014 audit implementasi, reproduksi multi-seed, validasi empiris patch (8 referensi DOI terverifikasi).",12.5,"Regular",INK,{lh:130});
    secBar(f,M,340,600,"Arsip Audit (lokal, privat)");
    rect(f,M,400,600,170,WHITE,8,BLUE,2);
    bullets(f,M+22,418,560,["benchmark_multiseed.csv \u2014 30 run penuh","observed_data.json \u2014 satu sumber kebenaran angka","ledger: search log \u00B7 literature matrix \u00B7 citation entailment","render PNG seluruh halaman naskah & slide"],10.5,8);
    const star=figma.createStar();star.pointCount=5;star.resize(110,110);star.x=900;star.y=430;star.fills=[{type:"SOLID",color:ORANGE}];f.appendChild(star);
    txt(f,830,560,250,"gbest tercapai \u2713",12,"Bold",ORANGE,{align:"CENTER"});
    txt(f,M,H-50,800,"AutoResearchKit \u2014 Analisa kode ML \u2192 Naskah \u2192 Presentasi",11,"Regular",MUTED);
  }
  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin("15 slide dibuat di halaman 'AutoResearchKit Deck'. Export: pilih semua frame \u2192 Export PNG @3x.");
}
main();
