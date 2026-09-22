# Project Brief: Piii & Elll — The Web Issue (Volume 01)

> **Ringkasan Singkat:** Website perayaan anniversary & digital archive perjalanan Piii & Elll (Jiel & Piii) yang dirancang khusus untuk pengalaman **Desktop Web**. Mengusung konsep *High-End Editorial Art Magazine*—berani, artistik, dan penuh pernyataan cinta personal tanpa kesan klise.
> 
> *Catatan Aset Desain:* Seluruh spesifikasi warna, tipografi, dan token styling mengacu langsung ke file pendukung di folder ini: [[Design.md.md]], [[Tailwind V4.md]], [[CSS Variables.md]], dan [[Design Token.md]].

---

## 1. Visi & Narrative Concept

Alih-alih membuat web couple biasa dengan animasi balon atau bunga pastel, web ini dikonsepkan layaknya **edisi perdana majalah mode / seni kontemporer independen (*Volume 01*)** yang didedikasikan sepenuhnya untuk kisah berdua.

- **Vibe & Mood:** Bold, confident, intimate, editorial, timeless.
- **Filosofi Tampilan:** Setiap scroll layar (*100vh full-viewport spread*) adalah satu lembar manifesto baru—memadukan tipografi raksasa, kalimat puitis yang jujur, dan arsip visual candid.

---

## 2. Struktur Konten & Ide Section (Desktop Viewport Flow)

Halaman dirancang dengan alur vertikal yang dinamis dan berkesinambungan:

```
[ 50px Circle: Index / Nav ]                  [ 50px Circle: Secret Vault ]
─────────────────────────────────────────────────────────────────────────
                      01. COVER & THE LIVING COUNTER
        Hitungan Hari & Bulan Real-Time dalam Tipografi Display Raksasa
─────────────────────────────────────────────────────────────────────────
                       02. THE EDITORIAL MANIFESTO
           Esai Narasi Pembuka & Statement Cinta (Kolom Editorial)
─────────────────────────────────────────────────────────────────────────
                      03. THE CHAPTERS (MILESTONES)
            Daftar Bab Perjalanan + Interaksi Floating Photo on Hover
─────────────────────────────────────────────────────────────────────────
                        04. CURATED VISUAL SLABS
             Galeri Foto Asimetris Resolusi Penuh Tanpa Frame Hiasan
─────────────────────────────────────────────────────────────────────────
                      05. SOUNDTRACK & AUDIO CAPSULE
           Pemutar Lagu Kenangan dengan Tampilan Minimalis Kontemporer
─────────────────────────────────────────────────────────────────────────
                      06. THE SEALED LETTER (COLOPHON)
                 Pesan Penutup Personal dari Jiel untuk Piii
```

---

### Detail Ide Tiap Section

### 01. Cover & The Living Counter (Hero Spread — 100vh)
- **Statement Utama:** Angka hari jadian raksasa yang langsung menyapa saat pertama kali dibuka.
- **Elemen Display:**
  - `XXX DAYS` & `XX MONTHS` (di-generate otomatis oleh script).
  - Teks penjelas halus: *"A LIVING RECORD OF PIII & ELLL // EST. [TANGGAL JADIAN]"*.
  - *Faded Echo Headline:* Teks bayangan samar di background bertuliskan *"STILL THE ONE // EVERY SINGLE DAY"*.

### 02. The Editorial Manifesto (Our Story in Words)
- **Konsep:** Narasi pendek berbentuk esai majalah (kolom baca maksimal `60ch` agar mata tidak lelah di layar lebar).
- **Ide Teks / Copywriting:**
  - Paragraf 1: Bagaimana awal mula ritme berdua terbentuk dari hal-hal sederhana.
  - Paragraf 2: Hal-hal kecil yang selalu dirayakan (tawa random, obrolan larut malam, perjalanan pulang).
  - Paragraf 3: Janji untuk terus tumbuh bersama.
- **Aksen Visual:** Kutipan vertikal atau pull-quote besar di samping teks: *"WE DON'T JUST COUNT THE DAYS, WE MAKE THE DAYS COUNT."*

### 03. The Chapters (Interactive Milestones)
- **Konsep:** Perjalanan waktu yang dibagi menjadi bab/edisi (*Issue*):
  - **Chapter 01:** *The Prologue* — Hari pertama saling mengenal.
  - **Chapter 02:** *Unfiltered Hours* — Kumpulan kencan santai, kulineran, dan jalan tanpa tujuan.
  - **Chapter 03:** *Growing Pains & Safe Havens* — Melewati masa lelah bersama dan jadi rumah satu sama lain.
  - **Chapter 04:** *Here, Today, and What's Next* — Refleksi hari ini menyambut tahun-tahun berikutnya.
- **Interaksi Desktop Unik:**
  - Teks bab disusun dalam baris-baris editorial elegan.
  - Saat kursor mouse diarahkan ke salah satu bab (*hover*), foto candid kenangan yang relevan langsung muncul melayang (*floating image*) di sebelah kursor/sisi layar.

### 04. Curated Visual Slabs (Editorial Photography)
- Menampilkan 4–6 foto terbaik berdua.
- **Aturan Editorial:** Foto disajikan apa adanya dalam potongan persegi/persegi panjang tegas tanpa sudut membulat, tanpa drop shadow, dan tanpa bingkai kartun.
- Dilengkapi metadata kecil di bawah tiap foto (tanggal, koordinat/lokasi, atau caption satu kalimat).

### 05. The Sound Capsule (Ambient Soundtrack)
- Widget audio minimalis di pojok atau seksi khusus.
- Memutar satu lagu yang paling merepresentasikan Piii & Elll (misal lagu pertama yang didengar bareng atau lagu favorit saat di mobil).
- Desain visual: Nama lagu & artist dengan indikator visualizer garis/titik berkedip minimalis.

### 06. The Secret Vault / Sealed Letter
- **Akses:** Bisa dibuka melalui tombol lingkaran di sudut kanan-atas layar (*brand mark*) atau di akhir halaman.
- **Bentuk:** Modal overlay penuh atau drawer samping yang elegan.
- **Isi:** Surat panjang pribadi dari Jiel khusus untuk dibaca Piii, disertai tombol kecil *"Open when you miss me"* atau *"Open on our anniversary"*.

---

## 3. Ide Interaktivitas & Micro-Interactions (Desktop)

1. **Dual Corner Anchors (Navigasi Tetap):**
   - *Kiri Atas:* Tombol lingkaran pink untuk membuka indeks bab cepat.
   - *Kanan Atas:* Tombol monogram/lambang rahasia untuk membuka surat cinta.
2. **Keyboard Navigation / Shortcut:**
   - Menekan tombol `Space` atau panah bawah menggeser layar mulus per seksi (*viewport snap*).
   - Menekan tombol `M` untuk *toggle* lagu/musik latar.
3. **Subtle Custom Cursor:**
   - Titik kursor kecil berwarna Lipstick Magenta yang membesar lembut saat menyentuh teks interaktif atau foto.

---

## 4. Checklist Kebutuhan Konten

- [ ] **Tanggal Acuan:** Tanggal awal jadian/anniversary (untuk rumus counter otomatis).
- [ ] **Kurasi Foto:** 4 – 8 foto terbaik (berkualitas jernih untuk layar desktop).
- [ ] **Data 4 Bab Kenangan:** Judul momen, tanggal/bulan kejadian, dan 1 kalimat cerita singkat.
- [ ] **Pesan / Surat Cinta:** Draft tulisan personal dari Jiel untuk dimasukkan ke dalam *Secret Vault*.
- [ ] **Audio:** Judul lagu & file audio mp3 untuk soundtrack latar.
