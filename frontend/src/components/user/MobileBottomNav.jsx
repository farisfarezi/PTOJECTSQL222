import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Clock, User } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
  { to: '/pengaduan', icon: <FileText size={20} />, label: 'Lapor' },
  { to: '/riwayat', icon: <Clock size={20} />, label: 'Riwayat' },
  { to: '/profil', icon: <User size={20} />, label: 'Profil' },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border-subtle flex justify-around items-center h-16 px-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map(item => {
        const active = pathname === item.to;
        return (
          <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-1 w-16 transition-colors ${active ? 'text-primary' : 'text-outline hover:text-text-main'}`}>
            <div className={`p-1 rounded-full ${active ? 'bg-primary bg-opacity-10' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] font-bold ${active ? 'text-primary' : ''}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
