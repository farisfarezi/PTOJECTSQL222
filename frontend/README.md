# SIPFAS Polinela Frontend

Frontend React + Vite untuk SIPFAS Polinela.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

Isi `.env` dengan credential Supabase:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deploy ke Netlify

Repo ini sudah punya `netlify.toml` di root. Jika deploy dari root repository, Netlify akan memakai:

- Base directory: `frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `frontend/dist`

Tambahkan environment variable berikut di Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Redirect SPA juga sudah dikonfigurasi agar route seperti `/login`, `/admin`, dan `/teknisi/tugas` tetap bisa dibuka langsung.

## Supabase

Schema awal ada di `../supabase/migrations/20240101_init_schema.sql`.

Catatan: saat ini beberapa service di `src/services` masih memakai mock data. Deploy Netlify akan berhasil, tetapi integrasi database penuh baru aktif setelah service tersebut dihubungkan ke `src/lib/supabase.js`.

## Akun Demo

Saat service masih mock, gunakan akun berikut untuk masuk sebagai superadmin:

```text
Email: superadmin@polinela.ac.id
Password: Superadmin123
```
