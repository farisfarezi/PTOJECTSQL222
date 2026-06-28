import { Outlet } from 'react-router-dom';

export default function TeknisiLayout() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 bg-surface shadow-md p-4 flex flex-col gap-4 border-r border-border-subtle">
        <h1 className="text-headline-md font-montserrat font-bold text-primary">Panel Teknisi</h1>
        <nav className="flex flex-col gap-2">
          <a href="/teknisi" className="p-2 bg-primary-container text-white rounded-soft">Daftar Tugas</a>
          <a href="/login" className="p-2 hover:bg-surface-container rounded-soft text-error mt-auto">Logout</a>
        </nav>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
