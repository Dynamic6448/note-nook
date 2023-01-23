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

    return <div className={className}>{children}</div>;
};

export default Page;
