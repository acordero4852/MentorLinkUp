"use client";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { UserCard } from '@/components';
import { getUsers } from '@/services/users';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  // Fetch mentors on component mount
  useEffect(() => {
    getUsers().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const mentors = data.filter((user: any) => user.is_mentor);
          setMentors(mentors);
        });
      }
    });
  }, []);

  return (
    <main>
      <Container className="my-5">
        <h1>Mentors</h1>
      </Container>
      <Container>
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
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default Mentors;
