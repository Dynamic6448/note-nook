import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import Page from '.';

const Signin: React.FC = () => {
    const navigate = useNavigate();

    const [hasAccount, setHasAccount] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState();

    const { login, signup } = useAuth();

    const handleSignin = () => {
        if (email.length === 0 || password.length === 0) {
            console.log('email or password is empty');
            return;
        }

        setUser(login(email, password));
    };

    const handleSignup = () => {
        if (email.length === 0 || password.length === 0) {
            console.log('email or password is empty');
            return;
        }

        setUser(signup(email, password));
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    return (
        <Page className='flex items-center justify-center w-full h-full'>
            <Card className='w-[500px]'>
                <Card.Header className='flex items-center justify-center p-2 text-2xl'>{hasAccount ? 'Welcome Back' : 'Get Started'}</Card.Header>
                <Card.Body>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium'>Email</label>
                        <input className='border p-2 w-full rounded-lg' type='email' placeholder='Enter your email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 font-medium'>Password</label>
                        <input
                            className='border p-2 w-full rounded-lg'
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </Card.Body>

                <Card.Footer className='flex flex-col items-center justify-center gap-4'>
                    {hasAccount ? (
                        <>
                            <Button className='text-violet-700 hover:text-violet-800' textOnly onClick={() => setHasAccount(false)}>
                                Don't have an account? Sign up
                            </Button>
                            <Button className='w-full text-whitet text-[1rem] bg-violet-700 hover:bg-violet-800 ' onClick={handleSignin}>
                                Sign In
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className='text-violet-700 hover:text-violet-800' textOnly onClick={() => setHasAccount(true)}>
                                Already have an account? Sign in
                            </Button>
                            <Button className='w-full text-white bg-violet-700 hover:bg-violet-800 ' onClick={handleSignup}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Card.Footer>
            </Card>
        </Page>
    );
};

export default Signin;
