import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

interface PageProps {
    children: React.ReactNode | React.ReactNode[];
}
const Page: React.FC<PageProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, []);

    return <>{children}</>;
};

export default Page;
