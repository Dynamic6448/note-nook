import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';
import { useAuth } from '../contexts/AuthContext';
import Page from '.';

const Signin: React.FC = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState();

    const { login } = useAuth();

    const handleSubmit = () => {
        // if (!emailRef.current || !pwdRef.current) {
        //     console.log('email or password is null');
        //     return;
        // }

        // setUser(login(emailRef.current.value, pwdRef.current.value));
        console.log(emailRef.current?.value, pwdRef.current?.value);
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    return (
        <Page className='flex items-center justify-center w-full h-full'>
            <Card className='flex flex-col items-center w-[400px]'>
                <CardHeader color='blue' className='w-[300px] grid place-items-center p-4'>
                    <p className='text-slate-100 font-bold text-xl'>Sign In</p>
                </CardHeader>

                <CardBody className='w-full'>
                    <form className='flex flex-col gap-4 w-full'>
                        <Input type='email' label='Email' color='blue' ref={emailRef} />
                        <Input type='password' label='Password' color='blue' ref={pwdRef} />
                    </form>
                </CardBody>

                <CardFooter className='w-full'>
                    <Button className='bg-blue-500' variant='gradient' fullWidth onClick={handleSubmit}>
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </Page>
    );
};

export default Signin;
