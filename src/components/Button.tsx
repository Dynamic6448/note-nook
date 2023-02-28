import React from 'react';

interface ButtonProps {
    className: string;
    textOnly?: boolean;
    onClick: () => any;
    children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ className, textOnly = false, onClick, children }) => {
    return (
        <button className={`${className} ${textOnly ? '' : 'px-3 py-2 rounded-sm shadow-sm hover:shadow-md text-white text-sm'} transition`} onClick={onClick}>
            {children}
        </button>
    );
};
