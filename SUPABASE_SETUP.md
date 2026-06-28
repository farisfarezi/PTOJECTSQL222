# Setup Supabase untuk SIPFAS POLINELA

## 1. Konfigurasi Environment

File `.env.local` sudah dibuat di folder `frontend/` dengan kredensial Supabase Anda:

```
VITE_SUPABASE_URL=https://wuiktpyltqjlronkahuh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 2. Setup Database di Supabase

### Langkah-langkah:
1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Buka project Anda: `wuiktpyltqjlronkahuh`
3. Pergi ke **SQL Editor** → **New Query**
4. Copy-paste semua query dari file:
   - `supabase/migrations/20240101_init_schema.sql` (untuk create tables)
   - `supabase/migrations/20240102_setup_rls.sql` (untuk Row Level Security)
5. Jalankan query

### Struktur Database yang Dibuat:
- **users** - Data user dengan role (mahasiswa, dosen, staff, admin, teknisi, superadmin)
- **kategori** - Kategori fasilitas rusak
- **lokasi** - Lokasi di kampus
- **laporan** - Data laporan kerusakan fasilitas
- **bukti_perbaikan** - Bukti foto perbaikan dari teknisi

## 3. Seed Data (Data Awal)

Jalankan query di bawah ini untuk insert data awal:

```sql
-- Insert Kategori
INSERT INTO kategori (nama_kategori) VALUES
  ('Elektronik & IT'),
  ('Kelistrikan'),
  ('Infrastruktur'),
  ('Air & Sanitasi'),
  ('Kebersihan'),
  ('Keamanan');

-- Insert Lokasi
INSERT INTO lokasi (nama_lokasi, detail_lokasi) VALUES
  ('Gedung A', 'Gedung Perkuliahan Utama'),
  ('Gedung B', 'Gedung Laboratorium'),
  ('Gedung C', 'Gedung Administrasi'),
  ('Aula Utama', 'Ruang Serbaguna Kampus'),
  ('Lab Komputer', 'Gedung B Lantai 2'),
  ('Kantin', 'Area Kantin Pusat'),
  ('Masjid', 'Masjid Kampus Polinela'),
  ('Lapangan', 'Lapangan Olahraga Utama');
```

## 4. Setup Supabase Auth

### Buat Admin User:

1. Di Supabase Dashboard, pergi ke **Authentication** → **Users**
2. Klik **Add user**
3. Masukkan:
   - Email: `superadmin@polinela.ac.id`
   - Password: `Superadmin123`
4. Copy User ID (format UUID)
5. Jalankan SQL untuk insert user ke tabel users:

```sql
INSERT INTO users (id, nama, email, identitas, no_hp, role) VALUES
  ('<PASTE_USER_ID_HERE>', 'Superadmin SIPFAS', 'superadmin@polinela.ac.id', '198001012010011001', '081234567890', 'superadmin');
```

## 5. Upload Storage untuk Foto

1. Di Supabase Dashboard, pergi ke **Storage**
2. Klik **New bucket** dan buat:
   - Nama: `laporan_fotos`
   - Buat public (centang "Public bucket")
3. Klik bucket → **Policies** untuk set permissions (opsional)

## 6. Siap Digunakan!

Sekarang Anda bisa:

```bash
cd frontend
npm install
npm run dev
```

### Test Login:
- Email: `superadmin@polinela.ac.id`
- Password: `Superadmin123`
- Role: Superadmin

## 📝 Troubleshooting

### Masalah: "Connection refused" atau "Cannot connect to Supabase"
- Pastikan `.env.local` di folder `frontend/` (bukan di root)
- Pastikan URL dan Key benar di `.env.local`
- Restart dev server: `npm run dev`

### Masalah: "User tidak ditemukan setelah login"
- Pastikan sudah insert data user ke tabel `users` dengan UUID yang sama dari Auth

### Masalah: RLS Policy error
- Pastikan sudah jalankan migration file `20240102_setup_rls.sql`
- Check Supabase Dashboard → Authentication → Policies

## 🔐 Keamanan

- **Row Level Security (RLS)** sudah aktif di semua tabel
- User hanya bisa lihat data mereka sendiri (kecuali admin)
- Foto upload disimpan di Storage bucket terpisah
- JWT token dari Supabase Auth digunakan untuk autentikasi

## 📚 Referensi

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [React + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
