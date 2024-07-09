import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  title: 'MentorLinkUp',
  description: 'MentorLinkUp is a platform that connects mentors and mentees.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="h-100">
      {children}
    </html>
  );
};
