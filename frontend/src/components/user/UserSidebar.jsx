import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Clock, User, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/pengaduan', icon: <FileText size={20} />, label: 'Buat Pengaduan' },
  { to: '/riwayat', icon: <Clock size={20} />, label: 'Riwayat Laporan' },
  { to: '/profil', icon: <User size={20} />, label: 'Profil Saya' },
];

export default function UserSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-surface border-r border-border-subtle flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-montserrat font-bold text-xl">S</div>
          <div>
            <p className="font-montserrat font-bold text-primary text-sm leading-none">SIPFAS</p>
            <p className="text-xs text-outline mt-0.5">POLINELA</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(item => {
          const active = pathname === item.to;
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-soft font-medium transition-all ${
                active
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-text-main'
              }`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border-subtle">
        <Link to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-soft text-error font-medium hover:bg-red-50 transition-all">
          <LogOut size={20} />
          <span>Keluar</span>
        </Link>
      </div>
    </aside>
  );
}
