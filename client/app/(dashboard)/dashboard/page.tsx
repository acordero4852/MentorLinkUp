import Container from "react-bootstrap/Container";

export default function Dasboard () {
  return (
    <main>
      <Container className="my-5">
        <h1>Welcome John!</h1>
      </Container>
      <Container className="my-5">
        <h2>Your Mentorship Sessions</h2>
        <p>You have no upcoming mentorship sessions.</p>
      </Container>
      <Container className="my-5">
        <h2>Suggestion for You</h2>
        <p>You have no mentees.</p>
      </Container>
      <Container className="my-5">
        <h2>Quick Actions</h2>
      </Container>
    </main>
  )
}
