import { Search, Filter, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function ReportFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    kategori: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-surface p-4 rounded-card border border-border-subtle flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="text"
          name="search"
          placeholder="Cari ID laporan, pelapor, atau judul..."
          value={filters.search}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-outline rounded-soft focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary focus:ring-opacity-20 text-sm"
        />
      </div>
      
      <div className="flex gap-4 md:w-auto w-full">
        <div className="relative flex-1 md:w-48">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full pl-9 pr-4 py-2 border border-outline rounded-soft focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary focus:ring-opacity-20 text-sm appearance-none bg-background cursor-pointer"
          >
            <option value="">Semua Status</option>
            <option value="menunggu_verifikasi">Menunggu Verifikasi</option>
            <option value="diverifikasi">Diverifikasi</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>
    </div>
  );
}
