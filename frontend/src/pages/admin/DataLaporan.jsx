import { useState, useEffect } from 'react';
import { laporanService } from '../../services/laporanService';
import AdminReportTable from '../../components/admin/AdminReportTable';
import ReportFilter from '../../components/admin/ReportFilter';
import Pagination from '../../components/common/Pagination';

export default function DataLaporan() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: '', kategori: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLaporan = async () => {
    setLoading(true);
    try {
      const data = await laporanService.getAll();
      setLaporan(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await laporanService.updateStatus(id, status);
      fetchLaporan();
    } catch (err) {
      alert('Gagal update status: ' + err.message);
    }
  };

  const filteredData = laporan.filter(item => {
    const matchSearch = item.judul.toLowerCase().includes(filters.search.toLowerCase()) || 
                        item.users?.nama?.toLowerCase().includes(filters.search.toLowerCase()) ||
                        String(item.id).includes(filters.search);
    const matchStatus = filters.status ? item.status === filters.status : true;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-md font-montserrat font-bold text-primary">Data Laporan</h1>
        <p className="text-body-md text-outline mt-1">Kelola seluruh laporan kerusakan fasilitas dari pengguna.</p>
      </div>

      <div className="space-y-6">
        <ReportFilter onFilterChange={(f) => { setFilters(f); setCurrentPage(1); }} />
        
        <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="flex-1 overflow-auto">
            <AdminReportTable 
              laporan={currentData} 
              loading={loading} 
              onUpdateStatus={handleUpdateStatus} 
            />
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>
    </div>
  );
}
