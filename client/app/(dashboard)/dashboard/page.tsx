"use client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Dasboard() {
  const sessions = [
    {
      date: '2024-07-20',
      time: '10:00 AM',
      topic: 'Data Science Basics',
      mentor: 'John Doe',
    },
    {
      date: '2024-07-25',
      time: '02:00 PM',
      topic: 'Advanced Machine Learning',
      mentor: 'Jane Smith',
    },
    {
      date: '2024-07-30',
      time: '11:00 AM',
      topic: 'Web Development',
      mentor: 'Chris Johnson',
    },
    {
      date: '2024-08-05',
      time: '03:00 PM',
      topic: 'Mobile Development',
      mentor: 'Amanda Wilson',
    },
    {
      date: '2024-08-10',
      time: '01:00 PM',
      topic: 'UX/UI Design',
      mentor: 'Jessica Brown',
    },
    {
      date: '2024-08-15',
      time: '10:00 AM',
      topic: 'Cloud Computing',
      mentor: 'Michael Smith',
    },
    {
      date: '2024-08-20',
      time: '02:00 PM',
      topic: 'DevOps',
      mentor: 'James Moore',
    },
  ];

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
        <h2>Your Mentorship Sessions</h2>
        {sessions.length > 0 ? (
          <Row>
            {sessions.map((session, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{session.topic}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {session.date} at {session.time}
                    </Card.Subtitle>
                    <Card.Text>Mentor: {session.mentor}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>You have no upcoming mentorship sessions.</p>
        )}
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
      </Container>
    </main>
  );
}
