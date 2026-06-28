import { useState, useEffect, useRef } from 'react';
import { Bell, ChevronDown, LogOut, Shield, Clock, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { authService } from '../../services/authService';
import { useLocation, Link } from 'react-router-dom';

const pageTitles = {
  '/admin': { title: 'Dashboard', sub: 'Ringkasan aktivitas sistem' },
  '/admin/laporan': { title: 'Data Laporan', sub: 'Kelola semua laporan fasilitas' },
  '/admin/teknisi': { title: 'Data Teknisi', sub: 'Daftar tenaga teknis' },
  '/admin/kategori': { title: 'Kategori Fasilitas', sub: 'Master data kategori' },
  '/admin/lokasi': { title: 'Lokasi / Gedung', sub: 'Master data lokasi kampus' },
  '/admin/user': { title: 'Manajemen Pengguna', sub: 'Kelola akun & hak akses' },
};

const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Laporan Darurat Masuk',
    message: 'Saluran Air Kantin tersumbat — Tingkat Darurat',
    time: '5 menit lalu',
    read: false,
    link: '/admin/laporan',
  },
  {
    id: 2,
    type: 'new',
    title: 'Laporan Baru Masuk',
    message: 'AC Ruang Kelas A1 dilaporkan tidak dingin',
    time: '12 menit lalu',
    read: false,
    link: '/admin/laporan',
  },
  {
    id: 3,
    type: 'done',
    title: 'Perbaikan Selesai',
    message: 'Proyektor Lab Komputer telah selesai diperbaiki',
    time: '1 jam lalu',
    read: true,
    link: '/admin/laporan',
  },
  {
    id: 4,
    type: 'new',
    title: 'Laporan Baru Masuk',
    message: 'Lampu Aula Utama dilaporkan mati total',
    time: '2 jam lalu',
    read: true,
    link: '/admin/laporan',
  },
];

const typeIcon = {
  urgent: <AlertTriangle size={16} className="text-error flex-shrink-0" />,
  new: <Bell size={16} className="text-primary flex-shrink-0" />,
  done: <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />,
};

export default function AdminTopbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const { pathname } = useLocation();

  const page = pageTitles[pathname] || { title: 'Panel Admin', sub: 'Manajemen Laporan Fasilitas' };
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    authService.getUser().then((u) => setUser(u));
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await authService.logout();
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotif = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="h-16 bg-surface border-b border-border-subtle flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
      {/* Page Title */}
      <div>
        <h2 className="font-montserrat font-bold text-primary text-base leading-none">{page.title}</h2>
        <p className="text-xs text-outline mt-0.5">{page.sub}</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* ── Notification Bell ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(prev => !prev); setDropdownOpen(false); }}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              notifOpen ? 'border-primary bg-primary bg-opacity-5 text-primary shadow-sm' : 'border-border-subtle hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-surface">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border-subtle rounded-card shadow-xl z-50 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-border-subtle bg-background flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-primary" />
                  <p className="font-bold text-text-main text-sm">Notifikasi</p>
                  {unreadCount > 0 && (
                    <span className="bg-error text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-bold text-secondary hover:underline"
                  >
                    Tandai semua dibaca
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-border-subtle">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center text-outline">
                    <Bell size={32} className="mx-auto mb-2 text-border-subtle" />
                    <p className="text-sm">Tidak ada notifikasi</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <Link
                      key={notif.id}
                      to={notif.link}
                      onClick={() => setNotifOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-background transition-colors relative group ${
                        !notif.read ? 'bg-primary bg-opacity-[0.03]' : ''
                      }`}
                    >
                      {/* Unread dot */}
                      {!notif.read && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                      )}

                      {/* Icon */}
                      <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notif.type === 'urgent' ? 'bg-red-50' :
                        notif.type === 'done' ? 'bg-green-50' : 'bg-primary bg-opacity-10'
                      }`}>
                        {typeIcon[notif.type]}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold ${!notif.read ? 'text-text-main' : 'text-outline'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-outline mt-0.5 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={10} className="text-outline" />
                          <p className="text-[10px] text-outline">{notif.time}</p>
                        </div>
                      </div>

                      {/* Dismiss button */}
                      <button
                        onClick={(e) => dismissNotif(notif.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-surface-container text-outline hover:text-error transition-all flex-shrink-0"
                      >
                        <X size={12} />
                      </button>
                    </Link>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border-subtle bg-background text-center">
                <Link
                  to="/admin/laporan"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-bold text-secondary hover:underline"
                >
                  Lihat semua laporan →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── User Dropdown ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => { setDropdownOpen(prev => !prev); setNotifOpen(false); }}
            className={`flex items-center gap-2.5 bg-background border px-3 py-2 rounded-soft cursor-pointer transition-all ${
              dropdownOpen ? 'border-primary shadow-sm' : 'border-border-subtle hover:border-primary'
            }`}
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user?.nama?.charAt(0) || 'A'}
            </div>
            <div className="text-sm text-left">
              <p className="font-bold text-text-main leading-none text-xs">{user?.nama || 'Administrator'}</p>
              <p className="text-outline text-[11px] mt-0.5 capitalize">{user?.role || 'admin'}</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-outline transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-primary' : ''}`}
            />
          </button>

          {/* User Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border-subtle rounded-card shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border-subtle bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {user?.nama?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-text-main text-sm">{user?.nama}</p>
                    <p className="text-xs text-outline">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-outline">
                  <Shield size={15} className="text-primary" />
                  <span className="font-medium capitalize">{user?.role}</span>
                </div>
              </div>

              <div className="border-t border-border-subtle py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut size={15} />
                  Keluar dari Akun
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
