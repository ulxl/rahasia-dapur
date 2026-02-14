import React from 'react';

const Input = ({ label, type = "text", className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-semibold text-text/80">{label}</label>}
            <input
                type={type}
                className={`px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-surface ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
