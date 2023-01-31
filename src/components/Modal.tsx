import React from 'react';

interface ModalProps {
    title: string;
    show: boolean;
    children: React.ReactNode | React.ReactNode[];
}
export const Modal: React.FC<ModalProps> = ({ title, show, children }) => {
    return (
        <>
            {show && (
                <div className='fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 transition w-full h-full'>
                    <div className='bg-white rounded-2xl'>
                        <div className='flex flex-col justify-between p-6 w-full h-full'>
                            <h1 className='text-2xl font-medium mb-6'>{title}</h1>

                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
