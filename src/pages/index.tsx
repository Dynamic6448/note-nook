import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { auth } from '../firebase';

interface PageProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    style?: React.CSSProperties;
}
const Page: React.FC<PageProps> = ({ children, className, style }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, []);

    return (
        <Container className={className} style={style}>
            {children}
        </Container>
    );
};

export default Page;
