import { Bell, User } from 'lucide-react';

export default function UserTopbar() {
  return (
    <header className="h-16 bg-surface border-b border-border-subtle flex items-center justify-between px-8 flex-shrink-0">
      <div>
        <h2 className="font-montserrat font-bold text-primary text-base">Dashboard Pelapor</h2>
        <p className="text-xs text-outline">Politeknik Negeri Lampung</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors">
          <Bell size={20} className="text-on-surface-variant" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container px-3 py-2 rounded-soft transition-colors">
          <div className="w-8 h-8 bg-primary-container rounded-full flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <div className="text-sm">
            <p className="font-bold text-text-main leading-none">Mahasiswa</p>
            <p className="text-outline text-xs">Pelapor</p>
          </div>
        </div>
      </div>
    </header>
  );
}
