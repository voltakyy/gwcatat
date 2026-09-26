# DESIGN.md — gwcatat

Dokumen ini adalah sumber kebenaran visual untuk gwcatat.
Semua perubahan UI (oleh manusia maupun AI) WAJIB mengikuti aturan di bawah.
Jika ada konflik antara "ide kreatif" dan dokumen ini, dokumen ini menang.

---

## 1. Palet Warna (Spesifik & Berkarakter)

Nuansa: **earthy ledger** — buku kas kertas + tinta teal + aksen emas kuno.
Dilarang keluar dari daftar heksadesimal berikut kecuali menambah varian
opasitas dari warna yang sudah ada.

| Peran            | Token        | Hex       | Pakai untuk                              |
|------------------|--------------|-----------|------------------------------------------|
| Tinta utama      | `--teal`     | `#264653` | Teks, sidebar, tombol primer, header     |
| Tinta muda       | `--teal-lt`  | `#3A6478` | Hover, teks sekunder di atas gelap       |
| Kertas           | `--bg`       | `#F5F3EF` | Latar belakang aplikasi                  |
| Permukaan        | `--surface`  | `#FFFFFF` | Kartu, modal, panel                      |
| Emas             | `--gold`     | `#C89B3C` | Aksen: logo, angka hero, badge penting   |
| Hijau kas        | `--green`    | `#5A9367` | Pemasukan, status sehat                  |
| Merah bata       | `--red`      | `#C0604A` | Pengeluaran, status bahaya               |
| Teks             | `--text`     | `#1E2A2E` | Isi default                              |
| Teks redup       | `--muted`    | teks 50%  | Label, hint, timestamp                   |
| Garis            | `--border`   | teal 10%  | Pembatas kartu, tabel, input             |

Aturan pakai:

- Rasio aman: **70% kertas/putih, 20% teal, 10% emas**. Emas hanya aksen,
  tidak pernah jadi latar blok besar.
- Hijau/merah HANYA untuk makna data ( Pemasukan/pengeluaran, sehat/bahaya ).
  Jangan dipakai sebagai dekorasi.
- Latar halaman selalu `--bg` datar. Tidak ada latar berpola, bertekstur,
  atau bergambar.

### 1a. Larangan Warna (Anti-AI-Slop)

- DILARANG gradien ungu–biru (`#7C3AED → #2563EB` dan sejenisnya) dalam
  bentuk apa pun.
- DILARANG gradien latar belakang secara umum. Satu-satunya gradien yang
  boleh ada adalah **nol**.
- DILARANG efek glow/neon/orb bercahaya, `box-shadow` berwarna, dan
  glassmorphism (`backdrop-filter: blur` + transparansi kaca).
- DILARANG bayangan tebal/lembut ala template (`shadow-2xl`, blur > 20px).
  Bayangan resmi hanya `--shadow` dan `--shadow-lg` (netral, tipis).

---

## 2. Tipografi (Ketat)

Tiga peran, tiga font — tidak boleh tambah lagi:

```css
--font-display: 'Montserrat', 'Manrope', system-ui, sans-serif;
--font-body:    'Manrope', system-ui, -apple-system, sans-serif;
--font-numeric: 'JetBrains Mono', ui-monospace, monospace;
```

- Sumber font tunggal:
  `Montserrat 600;700;800 + Manrope 200..800 + JetBrains Mono 500;600;700`
  via Google Fonts.
- **Display = Montserrat** — judul halaman, judul kartu/seksi/modal,
  nama brand, banner. Tegas, hanya untuk teks pendek.
- **Body = Manrope** — isi, label, tombol, input teks, legend grafik.
- **Numeric = JetBrains Mono** — SEMUA angka finansial (nominal transaksi,
  ringkasan, pilar, statistik, input Rp, sumbu grafik Rp, rumus, badge
  status, hint keyboard). Monospace memberi kesan data teknis, bukan prosa.
  Trade-off yang diterima: kolom angka sedikit lebih lebar.

Skala ukuran (tidak boleh dilebarkan sembarangan):

| Elemen              | Ukuran | Weight | Keterangan                        |
|---------------------|--------|--------|-----------------------------------|
| Judul halaman       | 20px   | 800    | Satu per halaman, rata kiri       |
| Judul seksi/kartu   | 14–15px| 700    |                                   |
| Angka nominal besar | 28px   | 800    | Maks 32px, hanya 1 per halaman    |
| Isi / tabel         | 13–14px| 400–500|                                   |
| Label / hint        | 11–12px| 500–600| Uppercase hanya untuk label mikro  |

Aturan:

- Tidak ada headline raksasa (> 40px) di bagian mana pun, termasuk halaman login.
- `line-height` isi: `1.5–1.6`. Judul: `1.2–1.3`.
- Tidak ada teks gradien, teks outline, atau teks dengan bayangan.

---

## 3. Layout (Non-Template, Fungsional)

gwcatat adalah **alat kerja**, bukan landing page. Strukturnya:

- **App shell tetap**: sidebar kiri 260px (navigasi 5 halaman) + konten kanan.
  Sidebar selalu gelap teal, konten selalu kertas. Jangan dibalik, jangan
  dibuat top-navbar atau bottom-tab.
- **Konten rata kiri, kuat.** Tidak ada hero section terpusat, tidak ada
  teks tengah raksasa, tidak ada bento grid dekoratif.
- Hierarki halaman data: judul → ringkasan angka (1 baris) → filter/aksi
  → tabel/grafik → detail. Jangan sisipkan blok marketing di antaranya.
- Maksimal lebar konten: `1100px`. Kartu: `border 1px + radius 16px`,
  tanpa bayangan kecuali kartu terangkat (`--shadow`).
- Halaman login: kartu tunggal tengah, maksimal `max-w-sm`, logo + form.
  Dilarang split-screen ilustrasi, karusel testimoni, atau latar gambar.

---

## 4. Batasan Komponen (Negative Constraints)

Daftar larangan eksplisit — jangan dibuat, walau "terlihat bagus":

1. Jangan gunakan ikon abstrak mengambang / bentuk blob dekoratif.
2. Jangan pakai gradien latar (sudah diatur di §1a, ditegaskan lagi di sini).
3. Jangan buat tombol pil penuh (`border-radius: 9999px`) — radius tombol: `10–12px`.
4. Jangan buat tombol raksasa CTA dengan bayangan tebal.
5. Jangan pakai emoji sebagai ikon UI. Ikon = SVG garis tipis, `stroke` teal/emas.
6. Jangan pakai badge/chip lebih dari 2 warna dalam satu baris.
7. Jangan tampilkan lebih dari **2 grafik** dalam satu halaman; sisanya tabel.
8. Jangan buat modal bersarang (modal di dalam modal).
9. Jangan gunakan animasi masuk yang teatrikal (bounce, spring, stagger
   berlebih). Transisi resmi: `150–200ms ease` untuk hover/fade.
10. Jangan ubah struktur sidebar tanpa memperbarui dokumen ini.

Fokus desain: **kerapian struktural, keterbacaan nominal, dan kecepatan
input data** — bukan kekaguman visual.

---

## 5. Cara Memakai Dokumen Ini

- Sebelum mengubah CSS/HTML, baca §1–§4 yang relevan.
- Jika butuh warna/ukuran/komponen baru: tambahkan dulu ke dokumen ini,
  baru implementasikan.
- Setiap pull request yang menyentuh tampilan wajib menyebut bagian
  DESIGN.md yang dipatuhi.
