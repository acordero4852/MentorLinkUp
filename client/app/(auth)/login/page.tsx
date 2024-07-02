"use client";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const Login = () => {
  return (
    <Card className="p-3" style={{width: 400}}>
      <Card.Body>
        <div className="mb-5">
          <h2 className='text-center'>Login</h2>
          <p className='text-center'>Don&apos;t have an account, sign up <Link href="/register">here</Link></p>
        </div>
        <Form className="mb-5">
          <Form.Group className="mb-3" controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button variant='dark' type='submit'>Login</Button>
          </Form.Group>
        </Form>
        <p className='text-center'><Link href="/reset-password">Forgot Password?</Link></p>
      </Card.Body>
    </Card>
  )
}

export default Login