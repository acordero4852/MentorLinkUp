"use client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function Home()  {
  return (
    <main>
      <Container>
        <Row className="my-5">
          <Col>
            {/* Heading */}
            <h1>Connecting Students with Mentors</h1>
            {/* Description */}
            <p>Find the perfect mentor to guide your academic and professional journey.</p>
            {/* Get Started Button */}
            <Button href="/register" variant="outline-dark">Get Started</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* Why MentorLinkUp Section */}
        <h1 className="text-center mb-5">Why MentorLinkUp?</h1>
        <Row className="my-5">
          <Col>
            {/* Profile Matching */}
            <h2 className="text-center">Profile Matching</h2>
            <p>MentorLinkUp uses algorithms to match students with suitable mentors based on shared interests, skills, and goals.</p>
          </Col>
          <Col>
            {/* Chat */}
            <h2 className="text-center">Chat</h2>
            <p>Students and mentors can communicate through a built-in chat system, allowing for real-time discussions and support.</p>
          </Col>
          <Col>
            {/* Scheduling */}
            <h2 className="text-center">Scheduling</h2>
            <p>A scheduling feature enables users to book mentorship sessions at convenient times.</p>
          </Col>
          <Col>
            {/* Resource Library */}
            <h2 className="text-center">Resource Library</h2>
            <p>Access to resources like articles, videos, and templates to enhance learning and development.</p>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* Testimonials Section */}
        <h1 className="text-center mb-5">Testimonials</h1>
        <Row className="my-5">
          <Col>
            {/* Testimonial 1 */}
            <p>My mentor helped me navigate my career transition. Their guidance was invaluable!</p>
            <p className="fw-bold">- Jessica Montez (Student)</p>
          </Col>
          <Col>
            {/* Testimonial 2 */}
            <p>Being a mentor allowed me to give back and connect with motivated students.</p>
            <p className="fw-bold">- Michelle Jin (Mentor)</p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
