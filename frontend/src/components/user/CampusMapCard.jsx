import { MapPin } from 'lucide-react';

export default function CampusMapCard() {
  return (
    <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border-subtle flex items-center gap-2">
        <MapPin size={20} className="text-primary" />
        <h3 className="text-title-lg font-bold text-text-main">Peta Fasilitas</h3>
      </div>
      <div className="flex-1 bg-background p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-primary-container text-white rounded-full flex items-center justify-center mb-4">
          <MapPin size={32} />
        </div>
        <p className="font-bold text-text-main mb-1">Fitur Sedang Dikembangkan</p>
        <p className="text-sm text-outline max-w-[200px]">Peta interaktif kampus akan segera hadir di update selanjutnya.</p>
      </div>
    </div>
  );
}
