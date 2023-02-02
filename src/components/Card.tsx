import React from 'react';

interface CardProps {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
}
export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ className, children }) => {
    return <div className={`text-lg font-medium mb-4 ${className}`}>{children}</div>;
};

export const CardBody: React.FC<CardProps> = ({ className = '', children }) => {
    return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({ className = '', children }) => {
    return <div className={`text-md ${className}`}>{children}</div>;
};
