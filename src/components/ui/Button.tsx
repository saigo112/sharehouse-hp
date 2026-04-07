import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-display text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-container text-white hover:brightness-110",
    secondary: "bg-surface-container-highest text-primary hover:bg-surface-container-low"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
