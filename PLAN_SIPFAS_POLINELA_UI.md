# PLAN.md
## Website Pengaduan Fasilitas Rusak Politeknik Negeri Lampung

## 1. Nama Proyek

**SIPFAS POLINELA**  
*Sistem Informasi Pengaduan Fasilitas Politeknik Negeri Lampung*

---

## 2. Deskripsi Singkat

SIPFAS POLINELA adalah website pengaduan fasilitas rusak di lingkungan Politeknik Negeri Lampung. Sistem ini digunakan untuk melaporkan fasilitas kampus yang bermasalah seperti AC, proyektor, meja, kursi, toilet, listrik, jaringan internet, ruang kelas, laboratorium, area parkir, kantin, dan fasilitas umum lainnya.

Website ini dirancang agar proses pengaduan menjadi lebih cepat, rapi, transparan, dan mudah dipantau oleh mahasiswa, dosen, staff, admin, teknisi, serta super admin.

UI yang digunakan dalam project ini mengacu pada desain **Academic Infrastructure Framework** dengan tampilan modern, profesional, clean, dan cocok untuk sistem kampus.

---

## 3. Tujuan Proyek

1. Memudahkan civitas akademika Politeknik Negeri Lampung dalam melaporkan fasilitas rusak.
2. Membantu admin sarana dan prasarana mengelola laporan secara terstruktur.
3. Memberikan transparansi status pengaduan kepada pelapor.
4. Membantu teknisi mengetahui tugas perbaikan yang harus ditangani.
5. Menyediakan rekap data kerusakan fasilitas untuk evaluasi kampus.
6. Membuat sistem pengaduan yang responsif, modern, dan mudah digunakan di laptop maupun HP.

---

## 4. Target Pengguna

| Pengguna | Keterangan |
|---|---|
| Mahasiswa | Membuat laporan fasilitas rusak dan melihat status laporan |
| Dosen | Melaporkan fasilitas pembelajaran yang rusak |
| Staff | Melaporkan fasilitas kantor atau layanan kampus |
| Admin | Memverifikasi, menolak, mengelola, dan menugaskan laporan |
| Teknisi | Menangani laporan yang ditugaskan dan upload bukti perbaikan |
| Super Admin | Mengelola user, role, kategori, lokasi, dan seluruh data sistem |

---

## 5. Role dan Hak Akses

| Role | Hak Akses |
|---|---|
| Mahasiswa | Login, buat laporan, lihat riwayat, lihat detail laporan, lihat status |
| Dosen | Login, buat laporan, lihat riwayat, lihat detail laporan, lihat status |
| Staff | Login, buat laporan, lihat riwayat, lihat detail laporan, lihat status |
| Admin | Kelola laporan, verifikasi, tolak, beri catatan, assign teknisi |
| Teknisi | Lihat tugas, update status, upload bukti perbaikan |
| Super Admin | Kelola semua data, user, role, kategori, lokasi, laporan, dan konfigurasi |

---

## 6. Fitur Utama

## 6.1 Authentication

Fitur authentication digunakan agar setiap pengguna memiliki akun dan akses sesuai role masing-masing.

### Fitur:

- Register
- Login
- Logout
- Validasi role pengguna
- Proteksi halaman berdasarkan role
- Supabase Auth (Email/Password, Magic Link)
- Proteksi database menggunakan Row Level Security (RLS)

### Data Register:

- Nama lengkap
- NPM / NIP / ID pengguna
- Email
- Nomor HP
- Password
- Role pengguna

---

## 6.2 Pengaduan Fasilitas

Fitur ini digunakan oleh pelapor untuk membuat laporan fasilitas rusak.

### Form Pengaduan:

- Judul laporan
- Kategori fasilitas
- Lokasi kerusakan
- Deskripsi kerusakan
- Tingkat kerusakan
- Upload foto bukti kerusakan

### Kategori Fasilitas:

- AC
- Proyektor
- Meja / Kursi
- Toilet
- Listrik
- Internet
- Ruang Kelas
- Laboratorium
- Fasilitas Umum

### Lokasi Awal:

- Gedung A
- Gedung B
- Gedung C
- Gedung D
- Lab Terpadu
- Auditorium
- Kantin
- Perpustakaan
- Gedung Serba Guna
- Area Parkir

### Tingkat Kerusakan:

- Ringan
- Sedang
- Berat
- Darurat

---

## 6.3 Dashboard Pelapor

Dashboard pelapor digunakan untuk melihat ringkasan dan riwayat laporan.

### Isi Dashboard:

- Total laporan
- Laporan menunggu verifikasi
- Laporan sedang diproses
- Laporan selesai
- Tabel laporan terbaru
- Tombol buat laporan baru
- Akses peta fasilitas kampus
- Detail laporan
- Status laporan

---

## 6.4 Dashboard Admin

Dashboard admin digunakan untuk mengelola semua laporan masuk.

### Fitur Admin:

- Melihat total laporan hari ini
- Melihat laporan menunggu verifikasi
- Melihat perbaikan aktif
- Filter laporan berdasarkan status
- Filter laporan berdasarkan lokasi
- Melihat detail laporan
- Verifikasi laporan
- Tolak laporan
- Tambahkan catatan admin
- Tentukan prioritas
- Tugaskan teknisi
- Unduh laporan PDF
- Pantau status teknisi
- Lihat sebaran laporan berdasarkan lokasi

---

## 6.5 Dashboard Teknisi

Dashboard teknisi digunakan untuk melihat tugas perbaikan yang diberikan admin.

### Fitur Teknisi:

- Melihat daftar tugas perbaikan
- Melihat detail laporan
- Mengubah status menjadi diproses
- Upload foto bukti selesai
- Memberikan catatan teknisi
- Mengubah status menjadi selesai

---

## 6.6 Manajemen Data

Fitur ini digunakan oleh admin dan super admin.

### Data yang dikelola:

- Data pengguna
- Data teknisi
- Data kategori fasilitas
- Data lokasi kampus
- Data laporan
- Data bukti perbaikan

---

## 7. Status Laporan

| Status | Keterangan | Warna UI |
|---|---|---|
| Menunggu Verifikasi | Laporan baru dibuat dan belum dicek admin | Kuning / Amber |
| Diverifikasi | Laporan valid dan diterima admin | Biru |
| Ditolak | Laporan tidak valid atau tidak sesuai | Merah |
| Diproses | Laporan sedang ditangani teknisi | Kuning |
| Selesai | Fasilitas sudah diperbaiki | Hijau |

---

# 8. Integrasi UI dari ZIP

UI yang digabungkan ke dalam plan ini berasal dari desain **SIPFAS POLINELA Facility Reporting System**. Di dalam ZIP terdapat 4 rancangan halaman utama dan 1 design system.

## 8.1 Daftar UI yang Digunakan

| Folder UI | Halaman | Fungsi |
|---|---|---|
| `sipfas_polinela_landing_page` | Landing Page | Halaman utama website SIPFAS POLINELA |
| `buat_pengaduan_form` | Form Pengaduan | Halaman untuk membuat laporan fasilitas rusak |
| `user_dashboard` | Dashboard User | Halaman ringkasan laporan milik pelapor |
| `admin_dashboard` | Dashboard Admin | Halaman pengelolaan laporan oleh admin |
| `academic_infrastructure_framework` | Design System | Panduan warna, typography, spacing, dan komponen |

---

## 8.2 Konsep UI

Konsep tampilan menggunakan gaya:

- Modern
- Profesional
- Clean
- Corporate
- Responsif
- Cocok untuk sistem kampus
- Berbasis warna utama hijau tua Polinela
- Data-heavy dashboard tetapi tetap rapi dan mudah dibaca

UI menggunakan pendekatan **Academic Infrastructure Framework**, yaitu desain sistem informasi kampus yang mengutamakan kejelasan data, transparansi status, dan kemudahan penggunaan.

---

## 8.3 Design System

### Warna Utama

| Token | Warna | Fungsi |
|---|---|---|
| Primary | `#00342b` | Warna utama brand SIPFAS POLINELA |
| Primary Container | `#004d40` | Header, navigasi aktif, elemen utama |
| Secondary | `#325ab2` | Aksen akademik dan tombol sekunder |
| Background | `#f8f9fa` | Background halaman |
| Surface | `#ffffff` | Card, form, modal, tabel |
| Text Main | `#2E363A` | Teks utama |
| Outline | `#707975` | Border komponen |
| Border Subtle | `#E0E0E0` | Border card dan tabel |
| Error | `#D32F2F` | Status darurat, ditolak, error |
| Progress | `#FBC02D` | Status sedang diproses |
| Completed | `#2E7D32` | Status selesai |
| Verified | `#1976D2` | Status diverifikasi |

### Typography

| Jenis | Font | Ukuran | Fungsi |
|---|---|---|---|
| Display LG | Montserrat | 48px | Hero title landing page |
| Headline LG | Montserrat | 32px | Judul section utama |
| Headline MD | Montserrat | 24px | Judul dashboard / card besar |
| Title LG | Inter | 20px | Judul card / menu |
| Body LG | Inter | 16px | Paragraf utama |
| Body MD | Inter | 14px | Isi tabel, deskripsi, form |
| Label LG | Inter | 12px | Label status, tombol, badge |

### Spacing dan Layout

- Menggunakan sistem spacing 8px.
- Desktop menggunakan 12-column grid.
- Mobile menggunakan 4-column grid.
- Padding section desktop minimal 64px.
- Margin mobile 16px.
- Margin desktop 40px.
- Container maksimal 1280px.

### Bentuk Komponen

| Komponen | Radius |
|---|---|
| Button | 4px |
| Input | 4px |
| Card | 8px |
| Modal | 8px |
| Badge Status | 2px |

---

## 8.4 Mapping UI ke Halaman React

| UI dari ZIP | File React yang Dibuat | Route |
|---|---|---|
| Landing Page | `LandingPage.jsx` | `/` |
| Buat Pengaduan Form | `BuatPengaduan.jsx` | `/pengaduan/buat` |
| User Dashboard | `DashboardUser.jsx` | `/dashboard` |
| Admin Dashboard | `DashboardAdmin.jsx` | `/admin/dashboard` |

---

## 8.5 Detail UI Landing Page

Landing page digunakan sebagai halaman awal website.

### Struktur Landing Page:

1. Navbar
2. Hero section
3. CTA Buat Pengaduan
4. CTA Lihat Status
5. Preview laporan terverifikasi
6. Statistik laporan
7. Kategori pengaduan
8. Misi sistem
9. CTA akhir
10. Footer

### Komponen Landing Page:

- `Navbar.jsx`
- `HeroSection.jsx`
- `StatsSection.jsx`
- `CategoryCard.jsx`
- `MissionSection.jsx`
- `Footer.jsx`

### Konten Utama Landing Page:

- Judul: **SIPFAS POLINELA**
- Deskripsi: Sistem Informasi Pengaduan Fasilitas Politeknik Negeri Lampung.
- CTA utama: **Buat Pengaduan**
- CTA sekunder: **Lihat Status**

### Kategori di Landing Page:

| Kategori | Deskripsi |
|---|---|
| Learning Facilities | AC, proyektor, sound system, papan tulis, ruang kelas |
| Infrastructure | Toilet, saluran air, listrik, atap, jalan kampus |
| General & Digital | Internet, WiFi, kebersihan, peminjaman ruangan |

---

## 8.6 Detail UI Form Buat Pengaduan

Halaman ini digunakan pelapor untuk membuat laporan fasilitas rusak.

### Struktur Halaman:

1. Navbar
2. Judul halaman
3. Deskripsi singkat
4. Form pengaduan
5. Upload foto bukti
6. Tombol batal
7. Tombol kirim pengaduan
8. Footer

### Field Form:

| Field | Tipe Input | Keterangan |
|---|---|---|
| Judul Laporan | Text | Judul singkat kerusakan |
| Kategori | Select | Pilihan kategori fasilitas |
| Lokasi | Select | Pilihan lokasi kerusakan |
| Deskripsi Kerusakan | Textarea | Penjelasan detail kerusakan |
| Tingkat Kerusakan | Radio / Card Option | Ringan, sedang, berat, darurat |
| Foto Bukti | Upload File | JPG / PNG maksimal 5MB |

### Komponen Form:

- `FormPengaduan.jsx`
- `InputField.jsx`
- `SelectField.jsx`
- `TextareaField.jsx`
- `DamageLevelOption.jsx`
- `UploadBox.jsx`
- `Button.jsx`

### Validasi Form:

- Judul laporan wajib diisi.
- Kategori wajib dipilih.
- Lokasi wajib dipilih.
- Deskripsi minimal 10 karakter.
- Tingkat kerusakan wajib dipilih.
- Foto hanya menerima JPG dan PNG.
- Ukuran foto maksimal 5MB.

---

## 8.7 Detail UI Dashboard User

Dashboard user digunakan oleh pelapor untuk melihat ringkasan laporan.

### Struktur Dashboard User:

1. Sidebar menu
2. Topbar mobile
3. Header overview
4. Search bar
5. Tombol buat laporan baru
6. Card statistik
7. Tabel laporan terbaru
8. Card informasi fasilitas kampus
9. Akses peta kampus
10. Bottom navigation mobile

### Menu Sidebar User:

- Dashboard
- Buat Pengaduan
- Riwayat Laporan
- Profil
- Logout

### Card Statistik User:

| Card | Keterangan |
|---|---|
| Total Reports | Total laporan user |
| Waiting Verification | Laporan menunggu verifikasi |
| Processing | Laporan sedang diproses |
| Completed | Laporan selesai |

### Tabel Laporan Terbaru:

| Kolom | Keterangan |
|---|---|
| ID | Nomor laporan |
| Date | Tanggal laporan |
| Title | Judul laporan |
| Category | Kategori fasilitas |
| Status | Status laporan |

### Komponen Dashboard User:

- `UserSidebar.jsx`
- `UserTopbar.jsx`
- `StatCard.jsx`
- `ReportTable.jsx`
- `StatusBadge.jsx`
- `CampusMapCard.jsx`
- `MobileBottomNav.jsx`

---

## 8.8 Detail UI Dashboard Admin

Dashboard admin digunakan untuk mengelola laporan fasilitas rusak.

### Struktur Dashboard Admin:

1. Sidebar admin
2. Topbar admin
3. Overview sistem
4. Tombol unduh laporan PDF
5. Card statistik admin
6. Filter status
7. Filter lokasi
8. Tabel laporan masuk
9. Pagination
10. Sebaran laporan
11. Status teknisi
12. Floating button buat laporan baru
13. Footer

### Menu Sidebar Admin:

- Dashboard
- Kelola Laporan
- Data Teknisi
- Manajemen Lokasi
- Kategori
- Pengaturan User
- Konfigurasi
- Logout

### Card Statistik Admin:

| Card | Keterangan |
|---|---|
| Total Laporan Hari Ini | Jumlah laporan yang masuk hari ini |
| Menunggu Verifikasi | Laporan yang belum diverifikasi |
| Perbaikan Aktif | Laporan yang sedang diproses teknisi |

### Tabel Laporan Admin:

| Kolom | Keterangan |
|---|---|
| ID Laporan | Nomor laporan |
| Pelapor | Nama dan role pelapor |
| Kategori & Lokasi | Jenis kerusakan dan lokasi |
| Status | Status laporan |
| Prioritas | Tingkat prioritas laporan |
| Aksi | Verifikasi, tolak, detail, assign teknisi |

### Komponen Dashboard Admin:

- `AdminSidebar.jsx`
- `AdminTopbar.jsx`
- `AdminStatCard.jsx`
- `AdminReportTable.jsx`
- `ReportFilter.jsx`
- `TechnicianStatusCard.jsx`
- `ReportDistributionCard.jsx`
- `Pagination.jsx`
- `FloatingActionButton.jsx`

---

## 8.9 UI Responsif

Website harus nyaman digunakan di desktop dan mobile.

### Desktop:

- Sidebar tampil penuh.
- Tabel laporan menggunakan layout horizontal.
- Card statistik berjajar.
- Filter status dan lokasi tampil sejajar.

### Mobile:

- Sidebar berubah menjadi drawer atau bottom navigation.
- Card statistik menjadi 1 kolom atau 2 kolom.
- Tabel laporan berubah menjadi card list.
- Tombol utama memiliki tinggi minimal 48px.
- Upload area tetap mudah digunakan dengan sentuhan jari.

---

## 8.10 Aturan Implementasi UI

1. UI dari file `code.html` harus dikonversi ke React component.
2. Styling tetap menggunakan Tailwind CSS.
3. Warna harus mengikuti design token dari `DESIGN.md`.
4. Data dummy pada UI diganti dengan data dari API backend.
5. Komponen yang berulang harus dipisah menjadi reusable components.
6. Dashboard user dan admin harus memakai protected route.
7. Tampilan mobile wajib diuji.
8. Jangan mengubah konsep desain utama dari UI ZIP.
9. Gunakan icon dari `lucide-react` atau `Material Symbols` sesuai kebutuhan.
10. Hindari animasi berlebihan agar dashboard tetap ringan.

---

## 9. Struktur Halaman Final

## 9.1 Halaman Public

- Landing Page
- Login
- Register
- Tentang Website
- Facility Map
- Guidelines

## 9.2 Halaman Pelapor

- Dashboard Pelapor
- Buat Pengaduan
- Riwayat Pengaduan
- Detail Pengaduan
- Profil Pengguna

## 9.3 Halaman Admin

- Dashboard Admin
- Data Laporan
- Detail Laporan
- Verifikasi Laporan
- Data Teknisi
- Data Lokasi
- Data Kategori
- Pengaturan User
- Konfigurasi Sistem
- Rekap Laporan

## 9.4 Halaman Teknisi

- Dashboard Teknisi
- Tugas Perbaikan
- Detail Tugas
- Upload Bukti Perbaikan

## 9.5 Halaman Super Admin

- Dashboard Super Admin
- Manajemen User
- Manajemen Role
- Manajemen Kategori
- Manajemen Lokasi
- Semua Laporan

---

## 10. Struktur Folder Final Proyek (Frontend & Backend)

Berikut adalah struktur folder utama dari repositori proyek ini, yang memisahkan antara frontend (React/Vite) dan backend (Supabase configurations).

`ash
sipfas-polinela/
├── frontend/                 # Kode Frontend React (Netlify)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   ├── services/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── supabase/                 # Konfigurasi Backend & Database (Supabase)
│   ├── migrations/
│   │   ├── 20240101_init_schema.sql
│   │   └── 20240102_setup_rls.sql
│   ├── seed.sql
│   └── config.toml
│
├── README.md
└── PLAN.md
`

### Detail Struktur Folder Frontend


```bash
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── TextareaField.jsx
│   │   │   ├── UploadBox.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── landing/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── MissionSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── user/
│   │   │   ├── UserSidebar.jsx
│   │   │   ├── UserTopbar.jsx
│   │   │   ├── ReportTable.jsx
│   │   │   ├── CampusMapCard.jsx
│   │   │   └── MobileBottomNav.jsx
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminTopbar.jsx
│   │   │   ├── AdminReportTable.jsx
│   │   │   ├── ReportFilter.jsx
│   │   │   ├── TechnicianStatusCard.jsx
│   │   │   └── ReportDistributionCard.jsx
│   │   └── pengaduan/
│   │       ├── FormPengaduan.jsx
│   │       └── DamageLevelOption.jsx
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   ├── PublicLayout.jsx
│   │   ├── UserLayout.jsx
│   │   ├── AdminLayout.jsx
│   │   └── TeknisiLayout.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── user/
│   │   │   ├── DashboardUser.jsx
│   │   │   ├── RiwayatPengaduan.jsx
│   │   │   ├── DetailPengaduan.jsx
│   │   │   └── ProfilUser.jsx
│   │   ├── pengaduan/
│   │   │   └── BuatPengaduan.jsx
│   │   ├── admin/
│   │   │   ├── DashboardAdmin.jsx
│   │   │   ├── DataLaporan.jsx
│   │   │   ├── DetailLaporan.jsx
│   │   │   ├── DataTeknisi.jsx
│   │   │   ├── DataKategori.jsx
│   │   │   ├── DataLokasi.jsx
│   │   │   └── PengaturanUser.jsx
│   │   └── teknisi/
│   │       ├── DashboardTeknisi.jsx
│   │       ├── TugasPerbaikan.jsx
│   │       └── DetailTugas.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── laporanService.js
│   │   ├── kategoriService.js
│   │   ├── lokasiService.js
│   │   └── userService.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── formatStatus.js
│   │   └── validation.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 11. Konfigurasi Tailwind Berdasarkan UI

Tambahkan token warna dan font ke dalam `tailwind.config.js`.

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00342b',
        'primary-container': '#004d40',
        secondary: '#325ab2',
        background: '#f8f9fa',
        surface: '#ffffff',
        'surface-container': '#edeeef',
        'on-surface': '#191c1d',
        'on-surface-variant': '#3f4945',
        outline: '#707975',
        'border-subtle': '#E0E0E0',
        error: '#D32F2F',
        'status-progress': '#FBC02D',
        'status-completed': '#2E7D32',
        'status-verified': '#1976D2',
        'text-main': '#2E363A',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        soft: '4px',
        card: '8px',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
```

---

# BAGIAN 2: KONTEKS BACKEND

## 12. Struktur Backend (Supabase)

Proyek ini menggunakan **Supabase** sebagai Backend as a Service (BaaS), sehingga tidak memerlukan custom backend (Node.js). Semua logika database, auth, dan storage di-handle oleh Supabase.

```bash
supabase/
├── migrations/
│   ├── 20240101_init_schema.sql
│   └── 20240102_setup_rls.sql
├── seed.sql
└── config.toml
```

---

## 13. Rencana Database (Supabase PostgreSQL)

Catatan: Autentikasi akan menggunakan fitur tabel bawaan `auth.users` dari Supabase. Tabel `public.users` digunakan untuk menyimpan profil.

## 13.1 Tabel users

```sql
CREATE TYPE user_role AS ENUM ('mahasiswa', 'dosen', 'staff', 'admin', 'teknisi', 'superadmin');

CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nama TEXT NOT NULL,
  identitas TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  no_hp TEXT,
  role user_role DEFAULT 'mahasiswa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 13.2 Tabel kategori

```sql
CREATE TABLE kategori (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  nama_kategori TEXT NOT NULL
);
```

## 13.3 Tabel lokasi

```sql
CREATE TABLE lokasi (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  nama_lokasi TEXT NOT NULL,
  detail_lokasi TEXT
);
```

## 13.4 Tabel laporan

```sql
CREATE TYPE damage_level AS ENUM ('ringan', 'sedang', 'berat', 'darurat');
CREATE TYPE report_status AS ENUM ('menunggu_verifikasi', 'diverifikasi', 'ditolak', 'diproses', 'selesai');

CREATE TABLE laporan (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  id_user UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_kategori BIGINT NOT NULL REFERENCES kategori(id),
  id_lokasi BIGINT NOT NULL REFERENCES lokasi(id),
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  tingkat_kerusakan damage_level DEFAULT 'ringan',
  foto_kerusakan TEXT, -- URL dari Supabase Storage
  status report_status DEFAULT 'menunggu_verifikasi',
  catatan_admin TEXT,
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 13.5 Tabel bukti_perbaikan

```sql
CREATE TABLE bukti_perbaikan (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  id_laporan BIGINT NOT NULL REFERENCES laporan(id) ON DELETE CASCADE,
  id_teknisi UUID NOT NULL REFERENCES users(id),
  foto_selesai TEXT, -- URL dari Supabase Storage
  catatan_teknisi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 14. Akses Data (Supabase Client)

Akses data tidak lagi menggunakan REST API konvensional, melainkan langsung menggunakan `supabase-js`.

## 14.1 Auth
- **Register**: `supabase.auth.signUp()`
- **Login**: `supabase.auth.signInWithPassword()`
- **Logout**: `supabase.auth.signOut()`
- **Get User**: `supabase.auth.getUser()`

## 14.2 Laporan
- **Get Laporan**: `supabase.from('laporan').select('*, kategori(*), lokasi(*)')`
- **Insert**: `supabase.from('laporan').insert([...])`
- **Update**: `supabase.from('laporan').update([...]).eq('id', ...)`
- **Upload Foto**: `supabase.storage.from('laporan_images').upload(...)`

## 14.3 Admin & Teknisi
- Data difilter langsung di client dengan `.eq('status', 'menunggu_verifikasi')` dsb.
- **Assign Teknisi**: `supabase.from('laporan').update({ assigned_to: ... })`
- **Upload Bukti**: `supabase.storage.from('bukti_perbaikan').upload(...)`

---

# BAGIAN 3: IMPLEMENTASI & DEPLOYMENT

## 15. Teknologi yang Digunakan

## 15.1 Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- SweetAlert2
- Material Symbols / Google Icons jika ingin mengikuti UI awal

## 15.2 Backend

- Supabase (BaaS)
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

## 15.3 Database

- PostgreSQL (disediakan oleh Supabase)

## 15.4 Hosting

- Frontend: Netlify
- Backend & Database: Supabase

---

## 16. Alur Sistem

## 16.1 Alur Pelapor

1. Pengguna membuka landing page.
2. Pengguna login atau register.
3. Pengguna masuk ke dashboard user.
4. Pengguna klik tombol **Buat Laporan Baru**.
5. Pengguna mengisi form pengaduan.
6. Pengguna memilih kategori, lokasi, dan tingkat kerusakan.
7. Pengguna upload foto bukti kerusakan.
8. Pengguna klik **Kirim Pengaduan**.
9. Sistem menyimpan laporan dengan status `menunggu_verifikasi`.
10. Pengguna dapat melihat laporan di dashboard dan riwayat.

## 16.2 Alur Admin

1. Admin login.
2. Admin masuk ke dashboard admin.
3. Admin melihat overview laporan.
4. Admin membuka tabel laporan masuk.
5. Admin memfilter laporan berdasarkan status atau lokasi.
6. Admin membuka detail laporan.
7. Admin verifikasi atau tolak laporan.
8. Admin memberi prioritas laporan.
9. Admin menugaskan teknisi.
10. Admin memantau status laporan sampai selesai.

## 16.3 Alur Teknisi

1. Teknisi login.
2. Teknisi melihat daftar tugas.
3. Teknisi membuka detail laporan.
4. Teknisi mengubah status menjadi `diproses`.
5. Teknisi melakukan perbaikan fasilitas.
6. Teknisi upload bukti perbaikan.
7. Teknisi mengubah status menjadi `selesai`.

---

## 17. Tahapan Pengerjaan

## Minggu 1 — Analisis dan Persiapan

### Task:

- Menentukan kebutuhan sistem.
- Membuat PRD.
- Membuat PLAN.md.
- Menggabungkan UI dari ZIP ke PLAN.md.
- Membaca design system dari `DESIGN.md`.
- Menentukan warna, typography, dan struktur komponen.
- Membuat desain database.

### Output:

- PRD selesai.
- PLAN.md selesai.
- UI plan selesai.
- Database design selesai.

---

## Minggu 2 — Setup Project dan UI Base

### Task Frontend:

- Setup React Vite.
- Install Tailwind CSS.
- Setup `tailwind.config.js` sesuai design system.
- Setup React Router.
- Setup layout public, user, admin, teknisi.
- Konversi UI Landing Page dari HTML ke React.

### Task Backend (Supabase):

- Buat project di Supabase.
- Setup tabel PostgreSQL via SQL Editor.
- Konfigurasi Row Level Security (RLS).
- Setup Storage Buckets untuk foto laporan.

### Output:

- Frontend berjalan.
- Project terhubung ke Supabase.
- Landing page tampil sesuai UI.
- Database tables siap digunakan.

---

## Minggu 3 — Authentication dan Layout Dashboard

### Task:

- Membuat register user.
- Membuat login user.
- Setup Supabase Auth.
- Implementasi login/register dengan `supabase.auth`.
- Melindungi routes dengan pengecekan session.
- Membuat role middleware.
- Membuat UserLayout.
- Membuat AdminLayout.
- Konversi UI dashboard user dari HTML ke React.
- Konversi UI dashboard admin dari HTML ke React.

### Output:

- User dapat register.
- User dapat login.
- Role pengguna berjalan.
- Dashboard user tampil.
- Dashboard admin tampil.

---

## Minggu 4 — Fitur Buat Pengaduan

### Task:

- Konversi UI form pengaduan dari HTML ke React.
- Membuat form pengaduan.
- Membuat validasi form.
- Membuat upload foto kerusakan.
- Menyimpan data laporan ke database.
- Menampilkan riwayat laporan pengguna.

### Output:

- Pengguna dapat membuat laporan.
- Foto kerusakan dapat diupload.
- Laporan tampil di dashboard user.

---

## Minggu 5 — Dashboard Admin dan Kelola Laporan

### Task:

- Menghubungkan dashboard admin ke API laporan.
- Menampilkan semua laporan masuk.
- Membuat detail laporan admin.
- Membuat fitur verifikasi laporan.
- Membuat fitur tolak laporan.
- Membuat fitur catatan admin.
- Membuat fitur filter laporan.
- Membuat fitur assign teknisi.

### Output:

- Admin dapat mengelola laporan.
- Admin dapat memverifikasi laporan.
- Admin dapat menolak laporan.
- Admin dapat menugaskan laporan ke teknisi.

---

## Minggu 6 — Dashboard Teknisi

### Task:

- Membuat dashboard teknisi.
- Menampilkan daftar tugas teknisi.
- Menampilkan detail tugas.
- Mengubah status laporan menjadi diproses.
- Upload bukti perbaikan.
- Mengubah status laporan menjadi selesai.

### Output:

- Teknisi dapat melihat tugas.
- Teknisi dapat menyelesaikan laporan.
- Bukti perbaikan tersimpan.

---

## Minggu 7 — Rekap, Filter, dan Export

### Task:

- Membuat card statistik dashboard.
- Membuat rekap laporan berdasarkan status.
- Membuat rekap laporan berdasarkan kategori.
- Membuat rekap laporan berdasarkan lokasi.
- Membuat fitur export PDF.
- Membuat manajemen kategori.
- Membuat manajemen lokasi.
- Membuat manajemen user.

### Output:

- Admin dapat melihat statistik laporan.
- Admin dapat export PDF.
- Super admin dapat mengelola data utama.

---

## Minggu 8 — Testing, Responsiveness, dan Deploy

### Task:

- Testing register dan login.
- Testing role access.
- Testing form pengaduan.
- Testing upload foto.
- Testing dashboard user.
- Testing dashboard admin.
- Testing dashboard teknisi.
- Testing tampilan mobile.
- Perbaikan bug.
- Deploy frontend ke Netlify.
- Finalisasi Supabase (RLS rules & Production settings).
- Membuat dokumentasi akhir.

### Output:

- Website siap digunakan.
- Website sudah online.
- Dokumentasi proyek selesai.

---

## 18. Prioritas Fitur

## 18.1 Prioritas Utama

- Landing page sesuai UI.
- Register.
- Login.
- Role user.
- Dashboard user sesuai UI.
- Buat pengaduan sesuai UI.
- Upload foto.
- Riwayat laporan.
- Dashboard admin sesuai UI.
- Verifikasi laporan.
- Update status laporan.

## 18.2 Prioritas Menengah

- Dashboard teknisi.
- Assign teknisi.
- Upload bukti perbaikan.
- Rekap laporan.
- Filter laporan.
- Export PDF.

## 18.3 Prioritas Tambahan

- Notifikasi email.
- Notifikasi WhatsApp.
- Export Excel.
- Grafik laporan.
- Reset password.
- Peta fasilitas kampus interaktif.

---

## 19. Testing Checklist

## 19.1 UI dan Responsiveness

- [ ] Landing page sesuai UI ZIP.
- [ ] Form pengaduan sesuai UI ZIP.
- [ ] Dashboard user sesuai UI ZIP.
- [ ] Dashboard admin sesuai UI ZIP.
- [ ] Warna sesuai design system.
- [ ] Font Montserrat dan Inter berhasil digunakan.
- [ ] Tampilan rapi di laptop.
- [ ] Tampilan rapi di tablet.
- [ ] Tampilan rapi di HP.
- [ ] Sidebar responsif.
- [ ] Tabel laporan tidak berantakan di layar kecil.
- [ ] Button minimal 48px untuk mobile.
- [ ] Upload box mudah digunakan di HP.

## 19.2 Authentication

- [ ] User dapat register.
- [ ] User dapat login.
- [ ] Password tersimpan dalam bentuk hash.
- [ ] User tidak bisa masuk dashboard tanpa login.
- [ ] Role user berjalan sesuai hak akses.

## 19.3 Pengaduan

- [ ] User dapat membuat laporan.
- [ ] User dapat upload foto.
- [ ] Form tidak bisa dikirim jika data penting kosong.
- [ ] Laporan tersimpan ke database.
- [ ] Status awal laporan adalah `menunggu_verifikasi`.

## 19.4 Admin

- [ ] Admin dapat melihat semua laporan.
- [ ] Admin dapat melihat detail laporan.
- [ ] Admin dapat verifikasi laporan.
- [ ] Admin dapat menolak laporan.
- [ ] Admin dapat memberi catatan.
- [ ] Admin dapat menugaskan teknisi.
- [ ] Admin dapat filter laporan.
- [ ] Admin dapat export PDF.

## 19.5 Teknisi

- [ ] Teknisi dapat melihat tugas.
- [ ] Teknisi dapat update status menjadi diproses.
- [ ] Teknisi dapat upload bukti perbaikan.
- [ ] Teknisi dapat update status menjadi selesai.

---

## 20. Risiko dan Solusi

| Risiko | Solusi |
|---|---|
| UI dari HTML sulit dikonversi ke React | Pecah menjadi komponen kecil lalu konversi bertahap |
| Warna tidak konsisten | Simpan semua warna di `tailwind.config.js` |
| Tampilan dashboard berantakan di HP | Buat versi mobile card list untuk tabel |
| User membuat laporan palsu | Admin wajib melakukan verifikasi |
| Foto terlalu besar | Batasi ukuran upload maksimal 5MB |
| Data laporan terlalu banyak | Gunakan pagination dan filter |
| Role tidak aman | Gunakan middleware role access |
| Backend error saat deploy | Gunakan environment variable yang benar |
| Database tidak terkoneksi | Pastikan konfigurasi host, user, password, dan database benar |

---

## 21. MVP

MVP adalah versi awal yang harus selesai terlebih dahulu.

### Fitur MVP:

- Landing page sesuai UI.
- Login.
- Register.
- Dashboard user.
- Buat laporan.
- Upload foto.
- Riwayat laporan.
- Dashboard admin.
- Verifikasi laporan.
- Update status laporan.

### Fitur yang belum wajib di MVP:

- Dashboard teknisi lengkap.
- Notifikasi.
- Export Excel.
- Grafik laporan.
- Reset password.
- Peta fasilitas interaktif.

---

## 22. Target Akhir

Target akhir dari proyek ini adalah membuat website pengaduan fasilitas rusak yang:

1. Menggunakan UI modern dari desain SIPFAS POLINELA.
2. Memiliki landing page profesional.
3. Memiliki form pengaduan yang mudah digunakan.
4. Memiliki dashboard user yang informatif.
5. Memiliki dashboard admin yang lengkap.
6. Terhubung dengan backend dan database.
7. Responsif di desktop dan mobile.
8. Siap dipresentasikan sebagai proyek website fullstack.

---

## 23. Kesimpulan

Website SIPFAS POLINELA dibuat sebagai solusi digital untuk pengaduan fasilitas rusak di lingkungan Politeknik Negeri Lampung. Dengan penggabungan UI dari file ZIP ke dalam PLAN.md ini, arah pengembangan project menjadi lebih jelas karena sudah mencakup kebutuhan sistem, struktur fitur, database, API, serta panduan tampilan UI.

Project ini cocok dikembangkan sebagai website fullstack karena memiliki fitur lengkap mulai dari authentication, CRUD laporan, upload foto, role access, dashboard admin, dashboard user, hingga manajemen perbaikan fasilitas.
