import React from 'react';

interface ButtonProps {
    className: string;
    textOnly?: boolean;
    onClick: () => any;
    children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ className, textOnly = false, onClick, children }) => {
    return (
        <button
            className={`${className} ${textOnly ? '' : 'py-2 rounded-sm shadow-sm hover:shadow-md'} transition`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
