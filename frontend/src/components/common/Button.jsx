import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  className = '',
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all rounded-soft border focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const variants = {
    primary: 'bg-primary border-primary text-white hover:bg-primary-container hover:border-primary-container focus:ring-primary shadow-sm hover:shadow-md',
    secondary: 'bg-secondary border-secondary text-white hover:bg-opacity-90 focus:ring-secondary shadow-sm hover:shadow-md',
    outline: 'bg-transparent border-outline text-text-main hover:border-primary hover:text-primary focus:ring-primary',
    ghost: 'bg-transparent border-transparent text-text-main hover:bg-surface-container focus:ring-primary',
    danger: 'bg-error border-error text-white hover:bg-opacity-90 focus:ring-error shadow-sm hover:shadow-md',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
