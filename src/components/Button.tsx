import React from 'react';

interface ButtonProps {
    color: string;
    onClick: () => any;
}
export const Button: React.FC<ButtonProps> = ({ color, onClick }) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
