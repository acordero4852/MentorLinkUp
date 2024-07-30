"use client";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth';

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const is_mentor = formData.get('is_mentor') as boolean | null;

    const response: Response = await registerUser({
      first_name,
      last_name,
      email,
      password,
      is_mentor,
    });

    if (response.ok) {
      response.json().then((data) => {
        localStorage.setItem('token', data.token);
        setError(null);
        router.push('/dashboard');
      }).catch((error) => console.error(error));
    }

    setLoading(false);
  }

  return (
    <Card className="p-3" style={{ width: 400 }}>
      <Card.Body>
        <div className="mb-5">
          <h2 className="text-center">Sign Up</h2>
          <p className="text-center">
            Have an account, log in <Link href="/login">here</Link>
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required
              name="first_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              required
              name="last_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="is_mentor">
            <Form.Label>I&apos;m a </Form.Label>
            <Form.Select required name="is_mentor">
              <option value="">Choose...</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="terms_cond">
            <Form.Check
              type="checkbox"
              label="I accept the Terms of Condition"
              required
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
