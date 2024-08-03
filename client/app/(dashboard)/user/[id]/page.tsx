'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Avatar from 'boring-avatars';
import { getUserById } from '@/services/users';

const User = () => {
  const [profile, setProfile] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data by ID
    getUserById(Number(id)).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setProfile(data);
        });
      }
    });
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <main>
      <Container>
        <Row className="my-4">
          <Col md={4} className="text-center">
            {/* Display user avatar */}
            <Avatar size="200" name={profile?.user?.username} variant="beam" />
          </Col>
          <Col md={8}>
            <h2>{`${profile?.user.first_name} ${profile?.user.last_name}`}</h2>
            <h5>@{profile?.user?.username}</h5>
            <p className="text-muted">
              {/* Display user role */}
              {profile?.is_mentor ? 'Mentor' : 'Mentee'}
            </p>
            <p>
              <strong>Date Joined:</strong>{' '}
              {/* Format and display date joined */}
              {formatDate(profile?.date_joined ?? '')}
            </p>
            <p>
              <strong>School:</strong>{' '}
              {/* Display user schools */}
              {profile?.schools.map((school: any) => school.name).join(', ')}
            </p>
            <ListGroup>
              <ListGroup.Item>
                <strong>Degrees:</strong>{' '}
                {/* Display user degrees */}
                {profile?.degrees.map((degree: any) => degree.name).join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Classes:</strong>{' '}
                {/* Display user classes */}
                {profile?.classes.map((c: any) => c.name).join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Clubs:</strong>{' '}
                {/* Display user clubs */}
                {profile?.clubs.map((club: any) => club.name).join(', ')}
              </ListGroup.Item>
            </ListGroup>
            <p className="mt-3">
              {/* Display user bio */}
              {profile?.bio}
            </p>
            <Button variant="primary">Connect</Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default User;
