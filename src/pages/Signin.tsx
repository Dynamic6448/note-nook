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
        if (!emailRef.current || !pwdRef.current) {
            console.log('email or password is null');
            return;
        }

        setUser(login(emailRef.current.value, pwdRef.current.value));
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user]);

    return (
        // <Page className='flex items-center justify-center w-[400px]'>
        //     <Card className='w-full'>
        //         <CardHeader color='blue' className='text-blue-600'>
        //             Sign In
        //         </CardHeader>
        //         <CardBody>
        //             <Input label='Email' size='lg' />
        //             {/* <Form.Group id='email'>
        //                 <Form.Label>Email</Form.Label>
        //                 <Form.Control type='email' ref={emailRef} required />
        //             </Form.Group>
        //             <Form.Group id='password'>
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control type='password' ref={pwdRef} required />
        //             </Form.Group> */}
        //             <Button className='w-100 mt-4' onClick={handleSubmit}>
        //                 Sign In
        //             </Button>
        //         </CardBody>
        //     </Card>
        // </Page>
        <Card className='w-96'>
            <CardHeader variant='gradient' color='blue' className='mb-4 grid h-28 place-items-center'>
                <Typography variant='h3' color='white'>
                    Sign In
                </Typography>
            </CardHeader>
            <CardBody className='flex flex-col gap-4'>
                <Input label='Email' size='lg' />
                <Input label='Password' size='lg' />
            </CardBody>
            <CardFooter className='pt-0'>
                <Button variant='gradient' fullWidth>
                    Sign In
                </Button>
                <Typography variant='small' className='mt-6 flex justify-center'>
                    Don't have an account?
                    <Typography as='a' href='#signup' variant='small' color='blue' className='ml-1 font-bold'>
                        Sign up
                    </Typography>
                </Typography>
            </CardFooter>
        </Card>
    );
};

export default Signin;
