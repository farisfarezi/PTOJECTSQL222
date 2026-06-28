import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import TeknisiLayout from '../layouts/TeknisiLayout';

// Public & Auth Pages
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';

// User Pages
import DashboardUser from '../pages/user/DashboardUser';
import RiwayatPengaduan from '../pages/user/RiwayatPengaduan';
import DetailPengaduan from '../pages/user/DetailPengaduan';
import ProfilUser from '../pages/user/ProfilUser';
import BuatPengaduan from '../pages/pengaduan/BuatPengaduan';

// Admin Pages
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import DataLaporan from '../pages/admin/DataLaporan';
import DetailLaporan from '../pages/admin/DetailLaporan';
import DataTeknisi from '../pages/admin/DataTeknisi';
import DataKategori from '../pages/admin/DataKategori';
import DataLokasi from '../pages/admin/DataLokasi';
import PengaturanUser from '../pages/admin/PengaturanUser';

// Teknisi Pages
import DashboardTeknisi from '../pages/teknisi/DashboardTeknisi';
import TugasPerbaikan from '../pages/teknisi/TugasPerbaikan';
import DetailTugas from '../pages/teknisi/DetailTugas';

// Common
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['mahasiswa', 'dosen', 'staff', 'superadmin']}><UserLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/riwayat" element={<RiwayatPengaduan />} />
          <Route path="/pengaduan/:id" element={<DetailPengaduan />} />
          <Route path="/profil" element={<ProfilUser />} />
          <Route path="/pengaduan" element={<BuatPengaduan />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['superadmin']}><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/laporan" element={<DataLaporan />} />
          <Route path="/admin/laporan/:id" element={<DetailLaporan />} />
          <Route path="/admin/teknisi" element={<DataTeknisi />} />
          <Route path="/admin/kategori" element={<DataKategori />} />
          <Route path="/admin/lokasi" element={<DataLokasi />} />
          <Route path="/admin/user" element={<PengaturanUser />} />
        </Route>

        {/* Teknisi Routes */}
        <Route element={<ProtectedRoute allowedRoles={['teknisi', 'superadmin']}><TeknisiLayout /></ProtectedRoute>}>
          <Route path="/teknisi" element={<DashboardTeknisi />} />
          <Route path="/teknisi/tugas" element={<TugasPerbaikan />} />
          <Route path="/teknisi/tugas/:id" element={<DetailTugas />} />
        </Route>
      </Routes>
    </Router>
  );
}
