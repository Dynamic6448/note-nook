import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Page from '.';
import { Card, CardBody, CardHeader } from '../components/Card';

const Signin: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState();

    const { login } = useAuth();

    const handleSubmit = () => {
        if (email.length === 0 || password.length === 0) {
            console.log('email or password is empty');
            return;
        }

        setUser(login(email, password));
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    return (
        <Page className='flex items-center justify-center w-full h-full'>
            <Card className='w-[400px]'>
                <CardHeader>Login</CardHeader>
                <CardBody>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='border p-2 w-full'
                            type='email'
                            id='username'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='border p-2 w-full'
                            type='password'
                            id='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </CardBody>

                <button
                    className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition shadow-sm hover:shadow-md'
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </Card>
        </Page>
    );
};

export default Signin;
