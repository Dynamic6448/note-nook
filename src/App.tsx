import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
    return (
        // <AuthProvider>
        //     <Router>
        //         <Routes>
        //             <Route path='/' element={<Signin />} />
        //             <Route path='/login' element={<Signin />} />
        //             <Route path='/dashboard' element={<Dashboard />} />
        //         </Routes>
        //     </Router>
        // </AuthProvider>
        <div className='text-9xl font-extrabold text-blue-500'>bruh</div>
    );
};

export default App;
