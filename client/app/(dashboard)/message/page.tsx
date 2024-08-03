"use client";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

const Message = () => {
  // Mock messages data
  const messages = [
    { name: "Sarah Lee", expertise: "Expert in Data Science" },
    { name: "John Doe", expertise: "Expert in Web Development" },
    { name: "Jane Doe", expertise: "Expert in Mobile Development" },
    { name: "Michael Smith", expertise: "Expert in Cybersecurity" },
    { name: "Jessica Brown", expertise: "Expert in UX/UI Design" },
    { name: "Chris Johnson", expertise: "Expert in Cloud Computing" },
    { name: "Amanda Wilson", expertise: "Expert in DevOps" },
    { name: "James Moore", expertise: "Expert in Machine Learning" },
    { name: "Emily Taylor", expertise: "Expert in Artificial Intelligence" },
    { name: "Daniel Anderson", expertise: "Expert in Blockchain" },
  ];
  
  return (
    <main className='h-100'>
      <Container className="h-100">
        <Row className="h-100">
          <Col xs={3} className="border-end">
            <Form.Control type="text" placeholder="Search Bar" className="my-2" />
            <ListGroup variant="flush">
              {messages.map((user, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary" style={{ width: 40, height: 40 }}></div>
                    <div className="ms-3">
                      <div>{user.name}</div>
                      <div className="text-muted">{user.expertise}</div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col className="d-flex flex-column p-0">
            <div className="border-bottom p-3">
              <h5 className="m-0">Sarah Lee</h5>
            </div>
            <div className="p-2" style={{ overflowY: 'auto' }}>
              {/* Chat messages will go here */}
            </div>
            <InputGroup className="p-2 border-top">
              <Form.Control placeholder="Textbox" />
              <Button variant="primary">Send</Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Message