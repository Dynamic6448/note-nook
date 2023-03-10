import React from 'react';

interface CardProps {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
    [x: string]: any; // some github copilot type stuff (idk what it does)
}
interface CardSubComponents {
    Header: React.FC<CardProps>;
    Body: React.FC<CardProps>;
    Footer: React.FC<CardProps>;
}
export const Card: React.FC<CardProps> & CardSubComponents = ({ className, children, ...props }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardHeader: React.FC<CardProps> = ({ className, children }) => {
    return <div className={`text-lg font-medium mb-4 ${className}`}>{children}</div>;
};

const CardBody: React.FC<CardProps> = ({ className = '', children }) => {
    return <div className={`mb-4 ${className}`}>{children}</div>;
};

const CardFooter: React.FC<CardProps> = ({ className = '', children }) => {
    return <div className={`text-md ${className}`}>{children}</div>;
};

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;
