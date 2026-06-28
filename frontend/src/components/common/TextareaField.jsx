export default function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="font-bold text-sm text-text-main">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-soft focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-background text-body-md text-text-main resize-y ${
          error
            ? 'border-error focus:border-error focus:ring-error'
            : 'border-outline focus:border-primary focus:ring-primary'
        }`}
      />
      {error && <p className="text-error text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}
