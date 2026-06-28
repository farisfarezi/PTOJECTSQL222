import { UserCheck, Wrench, CheckCircle } from 'lucide-react';

export default function TechnicianStatusCard({ teknisiList = [] }) {
  // Mock data for UI demonstration
  const stats = [
    { name: 'Budi Santoso', status: 'Tersedia', tasks: 0 },
    { name: 'Andi Wijaya', status: 'Sibuk', tasks: 2 },
    { name: 'Siti Aminah', status: 'Tersedia', tasks: 0 },
  ];

  return (
    <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden h-full">
      <div className="p-5 border-b border-border-subtle flex items-center justify-between">
        <h3 className="font-bold text-text-main">Status Teknisi</h3>
        <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">Real-time</span>
      </div>
      <div className="p-2 divide-y divide-border-subtle">
        {stats.map((t, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between hover:bg-background transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container border border-outline flex items-center justify-center text-text-main font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-text-main">{t.name}</p>
                <p className="text-xs text-outline flex items-center gap-1">
                  {t.status === 'Tersedia' ? <CheckCircle size={12} className="text-green-500" /> : <Wrench size={12} className="text-yellow-500" />}
                  {t.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-outline">Tugas Aktif</p>
              <p className="font-bold text-primary">{t.tasks}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-background border-t border-border-subtle text-center">
        <button className="text-xs font-bold text-secondary hover:underline">Lihat Semua Teknisi →</button>
      </div>
    </div>
  );
}
