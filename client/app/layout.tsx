import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ProfileProvider } from '@/context/ProfileProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'MentorLinkUp',
  description: 'MentorLinkUp is a platform that connects mentors and mentees.',
};

// Define the RootLayout component
export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en" className="h-100">
      {/* Wrap the children with the ProfileProvider context */}
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </html>
  );
};
