'use client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { UserCard } from '@/components';
import { ProfileContext } from '@/context/ProfileProvider';
import { getUsers, getMatchedMentors } from '@/services/users';

export default function Dasboard() {
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [matchedMentors, setMatchMentors] = useState([])

  const { profile } = useContext(ProfileContext);

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
    const token = localStorage.getItem('token');
    getMatchedMentors(String(token)).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setMatchMentors(data);
        });
      }
    });
  }, []);
  
  return (
    <main>
      <Container className="my-5">
        <h1>Hi, {profile?.user?.first_name}!</h1>
      </Container>
      <Container className="my-5">
        <h2 className='mb-5'>Suggestions for You</h2>
        {!profile?.is_mentor && <Row className="mb-3">
          <h3 className='mb-2'>Recommended Mentors</h3>
          <Row>
            {matchedMentors.map((mentor: any) => {
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
        </Row>}
        {!profile?.is_mentor && <Row className="mb-3">
          <Row className='mb-2 align-items-center'>
            <Col>
              <h3>Mentors</h3>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link href="/mentors">
                View All
              </Link>
            </Col>
          </Row>
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
        </Row>}
        {profile?.is_mentor && <Row className="mb-3">
          <Row className='mb-2 align-items-center'>
            <Col>
              <h3>Mentees</h3>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link href="/mentees">
                View All
              </Link>
            </Col>
          </Row>
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
        </Row>}
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
