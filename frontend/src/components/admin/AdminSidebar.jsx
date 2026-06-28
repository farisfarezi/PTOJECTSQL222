import { Link, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Tag,
  MapPin,
  UserCog,
  Wrench,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const navGroups = [
  {
    label: 'UTAMA',
    items: [
      { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    ],
  },
  {
    label: 'MANAJEMEN',
    items: [
      { to: '/admin/laporan', icon: <ClipboardList size={18} />, label: 'Data Laporan' },
      { to: '/admin/teknisi', icon: <Wrench size={18} />, label: 'Data Teknisi' },
    ],
  },
  {
    label: 'MASTER DATA',
    items: [
      { to: '/admin/kategori', icon: <Tag size={18} />, label: 'Kategori Fasilitas' },
      { to: '/admin/lokasi', icon: <MapPin size={18} />, label: 'Lokasi / Gedung' },
    ],
  },
  {
    label: 'SISTEM',
    items: [
      { to: '/admin/user', icon: <UserCog size={18} />, label: 'Manajemen User' },
    ],
  },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <aside className="w-64 bg-primary flex flex-col h-full shadow-xl flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white border-opacity-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-montserrat font-bold text-xl shadow-sm">
            S
          </div>
          <div>
            <p className="font-montserrat font-bold text-white text-sm leading-none">SIPFAS Admin</p>
            <p className="text-xs text-white text-opacity-60 mt-0.5">POLINELA</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-white text-opacity-40 tracking-widest px-3 mb-2">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-soft font-medium transition-all text-sm group relative ${
                      isActive
                        ? 'bg-white bg-opacity-20 text-white shadow-sm'
                        : 'text-white text-opacity-65 hover:bg-white hover:bg-opacity-10 hover:text-opacity-100'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white text-opacity-70'}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="text-white text-opacity-70" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white border-opacity-20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-soft text-white text-opacity-70 font-medium hover:bg-white hover:bg-opacity-10 hover:text-opacity-100 transition-all text-sm"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
