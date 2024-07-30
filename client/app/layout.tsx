import type { Metadata } from 'next';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  title: 'MentorLinkUp',
  description: 'MentorLinkUp is a platform that connects mentors and mentees.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en" className="h-100">
      {children}
    </html>
  );
};
