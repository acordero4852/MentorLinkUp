'use client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { UserCard } from '@/components';
import { useState, useEffect, ReactNode } from 'react';
import { getUsers } from '@/services/users';

export default function Dasboard() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [profileName, setProfileName] = useState<string | null>(null);

  useEffect(() => {
    getUsers().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const mentees = data.filter((user: any) => !user.is_mentor);
          const mentors = data.filter((user: any) => user.is_mentor);
          setMentees(mentees.slice(0, 5));
          setMentors(mentors.slice(1, 6));
        });
      }
    });
  }, []);
  
  return (
    <main>
      <Container className="my-5">
        <h1>Welcome</h1>
      </Container>
      <Container className="my-5">
        <h2 className='mb-5'>Suggestions for You</h2>
        <div className="mb-3">
          <h3 className='mb-2'>Mentors</h3>
          <Row>
            {mentors.map((mentor: any) => {
              return (
                <UserCard
                  id={mentor.user.id}
                  key={mentor.user.id}
                  name={`${mentor.user.first_name} ${mentor.user.last_name}`}
                  username={mentor.user.username}
                  is_mentor={mentor.is_mentor}
                />
              )
            })}
          </Row>
        </div>
        <div className="mb-3">
          <h3 className='mb-2'>Mentees</h3>
          <Row>
            {mentees.map((mentee: any) => {
              return (
                <UserCard
                  id={mentee.user.id}
                  key={mentee.user.id}
                  name={`${mentee.user.first_name} ${mentee.user.last_name}`}
                  username={mentee.user.username}
                  is_mentor={mentee.is_mentor}
                />
              )
            })}
          </Row>
        </div>
      </Container>
      {/*<Container className="my-5">
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
      </Container>*/}
    </main>
  );
}
