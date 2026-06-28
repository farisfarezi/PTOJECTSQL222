-- ============================================
-- SEED DATA UNTUK SIPFAS POLINELA
-- ============================================

-- Insert Kategori Fasilitas
INSERT INTO kategori (nama_kategori) VALUES
  ('Elektronik & IT'),
  ('Kelistrikan'),
  ('Infrastruktur'),
  ('Air & Sanitasi'),
  ('Kebersihan'),
  ('Keamanan'),
  ('Furniture & Perlengkapan'),
  ('Komunikasi & Jaringan')
ON CONFLICT DO NOTHING;

-- Insert Lokasi Kampus
INSERT INTO lokasi (nama_lokasi, detail_lokasi) VALUES
  ('Gedung A', 'Gedung Perkuliahan Utama Lantai 1-4'),
  ('Gedung B', 'Gedung Laboratorium Lantai 1-3'),
  ('Gedung C', 'Gedung Administrasi dan Kantor Dekan'),
  ('Aula Utama', 'Ruang Serbaguna Kapasitas 500 Orang'),
  ('Lab Komputer', 'Lab Komputer Gedung B Lantai 2'),
  ('Lab Elektronika', 'Lab Elektronika Gedung B Lantai 3'),
  ('Kantin Utama', 'Area Kantin Pusat Lantai Dasar'),
  ('Masjid Kampus', 'Masjid Politeknik Negeri Lampung'),
  ('Lapangan Olahraga', 'Lapangan Sepak Bola dan Basket'),
  ('Perpustakaan', 'Gedung Perpustakaan Lantai 1-2'),
  ('Mushola Putri', 'Mushola Putri Gedung A'),
  ('Parking Area', 'Area Parkir Utama Gedung A'),
  ('Toilet Pria Gedung A', 'Toilet Pria Lantai 1 Gedung A'),
  ('Toilet Wanita Gedung A', 'Toilet Wanita Lantai 1 Gedung A')
ON CONFLICT DO NOTHING;

-- ============================================
-- NOTE: User creation harus melalui Supabase Auth
-- Setelah user terdaftar, insert ke tabel users
-- dengan UUID dari Supabase Auth
-- ============================================

-- CONTOH: Setelah create user di Supabase Auth Dashboard
-- INSERT INTO users (id, nama, email, identitas, no_hp, role) VALUES
--   ('<UUID_FROM_AUTH>', 'Superadmin SIPFAS', 'superadmin@polinela.ac.id', '198001012010011001', '081234567890', 'superadmin'),
--   ('<UUID_FROM_AUTH>', 'Budi Santoso', 'budi@polinela.ac.id', '197502011999031001', '082345678901', 'teknisi'),
--   ('<UUID_FROM_AUTH>', 'Andi Wijaya', 'andi@polinela.ac.id', '198803152012011002', '083456789012', 'teknisi');
