import { statusConfig, damageConfig } from '../../utils/formatStatus';

export default function StatusBadge({ type, value, size = 'sm' }) {
  if (type === 'laporan') {
    const cfg = statusConfig[value] || { label: value, bg: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400', border: 'border-gray-200' };
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold border ${cfg.bg} ${cfg.border} ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}`}>
        <span className={`rounded-full ${cfg.dot} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></span>
        {cfg.label}
      </span>
    );
  }
  
  if (type === 'damage') {
    const cfg = damageConfig[value] || { label: value, bg: 'bg-gray-100 text-gray-700' };
    return (
      <span className={`inline-flex items-center rounded font-bold capitalize ${cfg.bg} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
        {cfg.label}
      </span>
    );
  }

  return null;
}
