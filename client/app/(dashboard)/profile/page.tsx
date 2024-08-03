'use client';
import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Avatar from 'boring-avatars';
import { ProfileContext } from '@/context/ProfileProvider';
import { updateUserProfile } from '@/services/auth';

const Profile = () => {
  // Get the user profile from the context
  const { profile } = useContext(ProfileContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the modal close event
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('token');

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to handle the form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const schools = formData.getAll('schools').map(Number);
    const degrees = formData.getAll('degrees').map(Number);
    const classes = formData.getAll('classes').map(Number);
    const clubs = formData.getAll('clubs').map(Number);
    const bio = formData.get('bio') as string;

    updateUserProfile(String(token), { schools, degrees, classes, clubs, bio })
      .then((response) => {
        if (response.ok) {
          response.json().then(() => {
            handleClose();
            window.location.reload();
          });
        }
      })
      .catch((err) => console.error(err));

    setLoading(false);
  };

  return (
    <>
      <main>
        <Container>
          <Row className="my-4">
            <Col md={4} className="text-center">
              <Avatar
                size="200"
                name={profile?.user?.username}
                variant="beam"
              />
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
                {profile?.schools.map((school: any) => school.name).join(', ')}
              </p>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Degrees:</strong>{' '}
                  {profile?.degrees.map((degree: any) => degree.name).join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Classes:</strong>{' '}
                  {profile?.classes.map((c: any) => c.name).join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Clubs:</strong>{' '}
                  {profile?.clubs.map((club: any) => club.name).join(', ')}
                </ListGroup.Item>
              </ListGroup>
              <p className="mt-3">{profile?.bio}</p>
              <Button variant="primary" onClick={handleShow}>
                Edit Your Profile
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="schools">
              <Form.Label>Schools:</Form.Label>
              <Form.Control as="select" multiple name="schools" defaultValue={profile?.schools.map((school: any) => school.id)}>
                <option value={1}>New Jersey Institute of Technology</option>
                <option value={2}>Rutgers University</option>
                <option value={3}>Stevens Institute of Technology</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="degrees">
              <Form.Label>Degree:</Form.Label>
              <Form.Control as="select" multiple name="degrees" defaultValue={profile?.degrees.map((degree: any) => degree.id)}>
                <option value={1}>Computer Science</option>
                <option value={2}>Information Technology</option>
                <option value={3}>Cybersecurity</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="classes">
              <Form.Label>Classes:</Form.Label>
              <Form.Control as="select" multiple name="classes" defaultValue={profile?.classes.map((clas: any) => clas.id)}>
                <option value={1}>Data Structures</option>
                <option value={2}>Algorithms</option>
                <option value={3}>Operating Systems</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="clubs">
              <Form.Label>Clubs:</Form.Label>
              <Form.Control as="select" multiple name="clubs" defaultValue={profile?.clubs.map((club: any) => club.id)}>
                <option value={1}>ACM</option>
                <option value={2}>IEEE</option>
                <option value={3}>Cybersecurity Club</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio:</Form.Label>
              <Form.Control as="textarea" name="bio" rows={2} defaultValue={profile?.bio}/>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={loading}>
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
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
