import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Signin = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState();

    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailRef.current || !pwdRef.current) {
            console.log('email or password is null');
            return;
        }

        setUser(login(emailRef.current.value, pwdRef.current.value));
    };

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={pwdRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type='submit'>
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default Signin;
