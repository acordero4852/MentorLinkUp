'use client';
import { useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ProfileContext } from '@/context/ProfileProvider';
import { DashboardNavigationBar, Footer } from '@/components';
import { getUserProfile } from '@/services/auth';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setProfile } = useContext(ProfileContext);

  // Function to fetch the user profile
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await getUserProfile(token);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }, [router, setProfile]);

  // Fetch the user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <body className="h-100">
      <header>
        <DashboardNavigationBar />
      </header>
      {children}
      <footer className="bg-body-tertiary mt-auto">
        <Footer />
      </footer>
    </body>
  );
}
