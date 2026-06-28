export default function StatCard({ label, value, icon, color = 'text-primary', bg = 'bg-surface' }) {
  return (
    <div className={`${bg} p-6 rounded-card border border-border-subtle flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`${color} flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border-subtle`}>
        {icon}
      </div>
      <div>
        <p className="text-display-sm font-montserrat font-bold text-text-main leading-tight">{value}</p>
        <p className="text-sm font-medium text-on-surface-variant mt-1">{label}</p>
      </div>
    </div>
  );
}
