import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Avatar from 'boring-avatars'

// Define the interface for the UserCard props
interface IUserCard {
  id: number
  name: string
  username: string
  is_mentor: string
}

// Define the UserCard component
const UserCard = ({ id, name, username, is_mentor }: IUserCard) => {
  return (
    <Col className="mb-3">
      <Card style={{width: 200}}>
        <Card.Body>
          {/* Avatar */}
          <div className="mb-3 d-flex justify-content-center">
            <Link href={`/user/${id}`}>
              <Avatar name={username} variant="beam" size="80" />
            </Link>
          </div>
          {/* User name */}
          <Card.Title className="text-center">{name}</Card.Title>
          {/* User type */}
          <Card.Text className="text-center text-muted">{is_mentor ? "Mentor" : "Mentee"}</Card.Text>
          {/* Connect button */}
          <div className="d-flex justify-content-center">
            <Button variant="primary">Connect</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default UserCard;
