'use client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UserCard } from '@/components';
import { getUsers } from '@/services/users';

const Search = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const searchParams = useSearchParams();
  const name = searchParams.get('name') as string;
  const role = searchParams.get('role') as string;


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      router.push(`/search?name=${name}`);
    } else {
      router.push(`/search?name=${name}&role=${value}`);
    }
  }

  useEffect(() => {
    getUsers().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setUsers(
            data.filter((user: any) => {
              return name &&
                (user?.user.first_name
                  .toLowerCase()
                  .includes(name.toLowerCase()) ||
                  user?.user.last_name
                    .toLowerCase()
                    .includes(name.toLowerCase()) ||
                  user?.user.username
                    .toLowerCase()
                    .includes(name.toLowerCase()));
            }).filter((user: any) => {
              if (!role) return true;
              if (role === 'mentor') return user.is_mentor;
              if (role === 'mentee') return !user.is_mentor;
            })
          );
        });
      }
    });
  }, [name, role]);


  return (
    <main>
      <Container className="my-5">
        <Row className="align-items-center">
          <Col>
            <h1>Search for: &quot;{name}&quot;</h1>
          </Col>
          <Col className="d-flex justify-content-end">
            <Form.Group style={{width: 150}} className="mb-3" controlId="is_mentor">
              <Form.Label>Filter by:</Form.Label>
              <Form.Select required name="is_mentor" onChange={handleChange} defaultValue={role}>
                <option value="all">All</option>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {users.map((user: any) => {
            return (
              <UserCard
                id={user.user.id}
                key={user.user.id}
                name={`${user.user.first_name} ${user.user.last_name}`}
                username={user.user.username}
                is_mentor={user.is_mentor}
              />
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default Search;
