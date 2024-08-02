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

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface IUserProfile {
  user: User;
  is_mentor: boolean;
  is_active: boolean;
  date_joined: string;
  schools: any[];
  degrees: any[];
  classes: any[];
  clubs: any[];
  bio: string;
}

const User = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const { id } = useParams();

  useEffect(() => {
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
            <Avatar size="200" name={profile?.user?.username} variant="beam" />
          </Col>
          <Col md={8}>
            <h2>{`${profile?.user.first_name} ${profile?.user.last_name}`}</h2>
            <h5>@{profile?.user?.username}</h5>
            <p className="text-muted">
              {profile?.is_mentor ? 'Mentor' : 'Mentee'}
            </p>
            <p>
              <strong>Date Joined:</strong>{' '}
              {formatDate(profile?.date_joined ?? '')}
            </p>
            <p>
              <strong>School:</strong>{' '}
              {profile?.schools.map((school) => school.name).join(', ')}
            </p>
            <ListGroup>
              <ListGroup.Item>
                <strong>Degrees:</strong>{' '}
                {profile?.degrees.map((degree) => degree.name).join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Classes:</strong>{' '}
                {profile?.classes.map((c) => c.name).join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Clubs:</strong>{' '}
                {profile?.clubs.map((club) => club.name).join(', ')}
              </ListGroup.Item>
            </ListGroup>
            <p className="mt-3">{profile?.bio}</p>
            <Button variant="primary">Connect</Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default User;
