import React from 'react';
import Signin from './pages/Signin';
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Signin />
            </div>
        </Container>
    );
};

export default App;
