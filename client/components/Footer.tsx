import Container from 'react-bootstrap/Container'

// Footer component
export default function Footer() {
  return (
    <Container>
      {/* Copyright notice */}
      <p className="py-3 m-0">
        &copy; {new Date().getFullYear()} MentorLinkUp Inc.
      </p>
    </Container>
  )
}