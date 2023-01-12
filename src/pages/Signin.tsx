import React, { useRef, useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

const Signin = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail(emailRef.current?.value as string);
        setPwd(pwdRef.current?.value as string);
    };

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
                    <p>email: {email}</p>
                    <p>pwd: {pwd}</p>
                </Card.Body>
            </Card>
        </>
    );
};

export default Signin;
