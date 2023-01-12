import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Signin />} />
                            <Route path='/login' element={<Signin />} />
                            <Route path='/home' element={<Home />} />
                        </Routes>
                    </Router>
                </div>
            </Container>
        </AuthProvider>
    );
};

export default App;
