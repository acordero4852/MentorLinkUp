import Container from 'react-bootstrap/Container'

export default function Footer() {
  return (
    <Container>
      <p className="py-3 m-0">
        &copy; {new Date().getFullYear()} MentorLinkUp Inc.
      </p>
    </Container>
  )
}