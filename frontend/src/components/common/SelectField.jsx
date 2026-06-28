import { ChevronDown } from 'lucide-react';

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Pilih salah satu',
  error,
  required = false,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="font-bold text-sm text-text-main">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 appearance-none border rounded-soft focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-background text-body-md text-text-main pr-10 ${
            error
              ? 'border-error focus:border-error focus:ring-error'
              : 'border-outline focus:border-primary focus:ring-primary'
          }`}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none" />
      </div>
      {error && <p className="text-error text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}
