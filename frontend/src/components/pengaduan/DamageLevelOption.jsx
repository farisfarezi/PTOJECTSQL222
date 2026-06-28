export default function DamageLevelOption({ level, label, desc, selected, onChange, colorClass }) {
  return (
    <label
      className={`relative flex flex-col p-4 border rounded-card cursor-pointer transition-all ${
        selected
          ? `border-${colorClass} bg-${colorClass} bg-opacity-5 ring-1 ring-${colorClass}`
          : 'border-border-subtle hover:border-outline bg-surface'
      }`}
    >
      <input
        type="radio"
        name="tingkat_kerusakan"
        value={level}
        checked={selected}
        onChange={() => onChange(level)}
        className="sr-only"
      />
      <div className="flex items-center justify-between mb-1">
        <span className={`font-bold text-sm ${selected ? `text-${colorClass}` : 'text-text-main'}`}>
          {label}
        </span>
        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          selected ? `border-${colorClass}` : 'border-outline'
        }`}>
          {selected && <div className={`w-2 h-2 rounded-full bg-${colorClass}`} />}
        </div>
      </div>
      <p className="text-xs text-outline leading-relaxed">{desc}</p>
    </label>
  );
}
