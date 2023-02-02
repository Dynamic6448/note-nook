import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

interface PageProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}
const Page: React.FC<PageProps> = ({ children, className }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, []);

    return (
        <div className='p-16 w-full h-full'>
            <img src='/logo_w_text_black.png' alt='logo' className='w-96' />
            <div className={className}>{children}</div>
        </div>
    );
};

export default Page;
