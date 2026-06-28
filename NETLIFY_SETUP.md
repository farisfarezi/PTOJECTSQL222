# Setup Netlify untuk SIPFAS POLINELA

## 🚨 Masalah: Halaman Blank Putih di Netlify

Ini terjadi karena **environment variables tidak di-set** di Netlify. Supabase credentials perlu dikonfigurasi di deployment.

## ✅ Solusi: Setup Environment Variables di Netlify

### Langkah 1: Buka Netlify Site Settings

1. Login ke [Netlify](https://app.netlify.com)
2. Pilih site project SIPFAS Anda
3. Pergi ke **Site settings** (gigi icon) → **Build & deploy** → **Environment**

### Langkah 2: Add Environment Variables

Klik **Add environment variable** dan masukkan:

#### Variable 1:
```
Key: VITE_SUPABASE_URL
Value: https://wuiktpyltqjlronkahuh.supabase.co
```

#### Variable 2:
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1aWt0cHlsdHFqbHJvbmthaHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2Mzc5MDYsImV4cCI6MjA5ODIxMzkwNn0.16WtXhfnAkKKoEMCT9fTmpgGHA5H5meNvEBbvdsryXc
```

### Langkah 3: Trigger Redeploy

1. Pergi ke **Deploys**
2. Klik tombol **Trigger deploy** atau **Deploy site**
3. Pilih **Deploy site**
4. Tunggu sampai status berubah ke **Published**

### Langkah 4: Verifikasi

1. Buka website Netlify Anda
2. Buka **Developer Console** (F12)
3. Lihat tab **Application** → **Environment Variables**
4. Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah ada

## 📋 Troubleshooting

### Masalah: Masih blank putih setelah redeploy

**Solusi:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Reload halaman
3. Cek Console (F12) untuk error messages
4. Jika ada error CORS, tambahkan domain Netlify ke Supabase allowed URLs

### Masalah: "Cannot POST /api/..." errors

**Solusi:**
- Ini adalah masalah CORS atau API route
- Pastikan Supabase Row Level Security (RLS) sudah di-setup dengan benar
- Check Supabase Dashboard → Authentication → Policies

### Masalah: Login berhasil tapi halaman kosong setelah login

**Solusi:**
1. Pastikan user sudah ada di tabel `users` di Supabase
2. UUID di tabel `users` harus match dengan UUID dari Supabase Auth
3. Verify row level security policies

## 🔧 Build Configuration

File `netlify.toml` sudah di-konfigurasi dengan:
```toml
[build]
  base = "frontend"
  command = "npm ci && npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Redirect rule diperlukan untuk SPA (Single Page Application) React Router.

## 📚 Tips Debugging

Untuk melihat build logs di Netlify:
1. Pergi ke **Deploys**
2. Klik deployment yang failed
3. Klik **Deploy log** untuk detail error

## 🔐 Security Notes

- ❌ JANGAN commit `.env.local` ke GitHub
- ✅ Selalu gunakan `.env.example` sebagai template
- ✅ Set environment variables hanya di Netlify dashboard
- ✅ Anon Key adalah public key untuk frontend (tidak berbahaya)

## ✨ Setelah Setup Berhasil

Jika sudah berhasil, Anda seharusnya:
1. Melihat halaman landing SIPFAS
2. Bisa login ke admin panel
3. Bisa create laporan
4. Bisa lihat data di admin dashboard
