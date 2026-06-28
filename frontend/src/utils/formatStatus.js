// Format status laporan ke label Indonesia
export const statusConfig = {
  menunggu_verifikasi: {
    label: 'Menunggu Verifikasi',
    bg: 'bg-yellow-100 text-yellow-800',
    dot: 'bg-yellow-400',
    border: 'border-yellow-300',
  },
  diverifikasi: {
    label: 'Diverifikasi',
    bg: 'bg-blue-100 text-blue-800',
    dot: 'bg-blue-500',
    border: 'border-blue-300',
  },
  ditolak: {
    label: 'Ditolak',
    bg: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
    border: 'border-red-300',
  },
  diproses: {
    label: 'Diproses',
    bg: 'bg-purple-100 text-purple-800',
    dot: 'bg-purple-500',
    border: 'border-purple-300',
  },
  selesai: {
    label: 'Selesai',
    bg: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
    border: 'border-green-300',
  },
};

export const damageConfig = {
  ringan: { label: 'Ringan', bg: 'bg-gray-100 text-gray-700' },
  sedang: { label: 'Sedang', bg: 'bg-yellow-100 text-yellow-800' },
  berat: { label: 'Berat', bg: 'bg-orange-100 text-orange-800' },
  darurat: { label: 'Darurat', bg: 'bg-red-100 text-red-800' },
};

export const formatStatus = (status) => {
  return statusConfig[status]?.label || status;
};

export const formatDamage = (level) => {
  return damageConfig[level]?.label || level;
};
