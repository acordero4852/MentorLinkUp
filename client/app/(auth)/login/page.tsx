'use client';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response: Response = await loginUser({ email, password });

    if (response.ok) {
      response.json().then((data) => {
        try {
          localStorage.setItem('token', data.token);
          setError(null)
          router.push('/dashboard');
        } catch {
          setError(data.non_field_errors[0]);
        }
      }).catch((error) => console.error(error));
    }

    setLoading(false);
  };

  return (
    <Card className="p-3" style={{ width: 400 }}>
      <Card.Body>
        <div className="mb-5">
          <h2 className="text-center">Login</h2>
          <p className="text-center">
            Don&apos;t have an account, sign up{' '}
            <Link href="/register">here</Link>
            {error && <Alert variant="danger">{error}</Alert>}
          </p>
        </div>
        <Form className="mb-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Remember Me" />
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
                  Logging In...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form.Group>
        </Form>
        <p className="text-center">
          <Link href="/reset-password">Forgot Password?</Link>
        </p>
      </Card.Body>
    </Card>
  );
}
