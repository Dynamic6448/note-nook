import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Page from '.';
import { Card, CardBody, CardFooter, CardHeader } from '../components/Card';

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
            <Card className='w-[500px]'>
                <CardHeader className='flex items-center justify-center p-2 text-2xl'>Welcome Back</CardHeader>
                <CardBody>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium' htmlFor='username'>
                            Email
                        </label>
                        <input
                            className='border p-2 w-full rounded-sm'
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='border p-2 w-full rounded-sm'
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </CardBody>

                <CardFooter className='flex flex-col items-center justify-center'>
                    <button className='text-center text-[#6153ff] hover:text-[#4838ff] mb-4'>
                        Don't have an account? Sign up
                    </button>
                    <button
                        className='bg-[#6153ff] hover:bg-[#4838ff] text-white shadow-sm hover:shadow-md py-2 rounded-sm w-full transition'
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </CardFooter>
            </Card>
        </Page>
    );
};

export default Signin;
