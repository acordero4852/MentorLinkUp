"use client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Dasboard() {
  const mentees = [
    { name: 'Alice Brown', topic: 'Python Programming' },
    { name: 'Bob Johnson', topic: 'Data Analysis' },
    { name: 'Charlie Wilson', topic: 'Web Development' },
    { name: 'David Smith', topic: 'Mobile Development' },
    { name: 'Eve Lee', topic: 'UX/UI Design' },
    { name: 'Frank Anderson', topic: 'Cloud Computing' },
    { name: 'Grace Moore', topic: 'DevOps' },
  ];

  const actions = [
    'Schedule a new session',
    'View past sessions',
    'Manage your profile',
    'View your mentees',
    'View your mentors',
  ];

  return (
    <main>
      <Container className="my-5">
        <h1>Welcome John!</h1>
      </Container>
      <Container className="my-5">
        <h2>Suggestions for You</h2>
        {mentees.length > 0 ? (
          <ListGroup>
            {mentees.map((mentee, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{mentee.name}</div>
                    <div className="text-muted">{mentee.topic}</div>
                  </div>
                  <Button variant="primary">Connect</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>You have no mentees.</p>
        )}
      </Container>
      <Container className="my-5">
        <h2>Quick Actions</h2>
        <Row>
          {actions.map((action, index) => (
            <Col key={index} md={4} className="mb-4">
              <Button variant="secondary" className="w-100">
                {action}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}
