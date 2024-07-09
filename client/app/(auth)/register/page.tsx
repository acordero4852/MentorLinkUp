"use client";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function Register() {
  return (
    <Card className="p-3" style={{width: 400}}>
      <Card.Body>
        <div className="mb-5">
          <h2 className='text-center'>Sign Up</h2>
          <p className='text-center'>Have an account, log in <Link href="/login">here</Link></p>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className="mb-3" controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className="mb-3" controlId='confirm-password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm your password' />
          </Form.Group>
          <Form.Group className="mb-3" controlId='username'>
            <Form.Label>I&apos;m a </Form.Label>
            <Form.Select defaultValue="Choose..." required>
              <option>Choose...</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="I accept the Terms of Condition" required/>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button variant='dark' type='submit'>Sign Up</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}
