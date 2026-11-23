import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'base',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    'danger-outline': 'btn-danger-outline'
  }[variant] || 'btn-primary';

  const sizeClass = {
    sm: 'btn-sm',
    base: '',
    lg: 'btn-lg'
  }[size] || '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
