import { PieChart, BarChart3 } from 'lucide-react';

export default function ReportDistributionCard() {
  return (
    <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-border-subtle flex items-center justify-between">
        <h3 className="font-bold text-text-main">Distribusi Laporan</h3>
        <PieChart size={18} className="text-outline" />
      </div>
      <div className="flex-1 bg-background p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-surface-container text-outline rounded-full flex items-center justify-center mb-4">
          <BarChart3 size={32} />
        </div>
        <p className="font-bold text-text-main mb-1">Fitur Grafik Belum Tersedia</p>
        <p className="text-sm text-outline max-w-[200px]">Integrasi dengan library chart (seperti Recharts) akan ditambahkan pada fase berikutnya.</p>
      </div>
    </div>
  );
}
