import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Typography, Checkbox } from '@material-tailwind/react';
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
        // <Page className='flex flex-row items-center justify-center w-full h-screen'>
        //     <Card className='text-center'>
        //         <CardHeader color='blue'>Sign In</CardHeader>
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
        <div className='flex flex-col rounded-xl bg-white bg-clip-border shadow-card'>
            <div className='mx-4 -mt-6 translate-y-0'>
                <div className='shadow-pink pe-1 rounded-lg bg-pink-500 py-3'>
                    <h4 className='mt-2 mb-0 text-center font-bold text-white'>Sign in</h4>
                </div>
            </div>
            <div className='text-secondary flex-1 p-6'>
                <form action='role'>
                    <div className='flex flex-col gap-4'>
                        <div className='relative h-10 w-full min-w-[200px]'>
                            <input
                                type='email'
                                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                        </div>
                        <div className='relative h-10 w-full min-w-[200px]'>
                            <input
                                type='password'
                                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                        </div>
                    </div>
                </form>
                <div className='form-check form-switch my-7 ml-1 flex items-center'>
                    <input className='absolute z-10 h-5 w-8 cursor-pointer opacity-0' data-attribute='toggle' id='remember' />
                    <div className='form-check-input'></div>
                    <label className='form-check-label mb-0 ml-2 cursor-pointer'>Remember me</label>
                </div>
                <button className='middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Signin;
