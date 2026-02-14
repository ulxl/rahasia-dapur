import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-primary text-white hover:bg-orange-600 hover:shadow-md",
        secondary: "bg-surface text-primary border-2 border-primary hover:bg-orange-50",
        ghost: "bg-transparent text-text hover:bg-orange-100/50 shadow-none",
        accent: "bg-accent text-white hover:bg-green-600 hover:shadow-md"
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

export default Button;
