'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationBar, Footer } from '@/components';

// This is a functional component called "Layout" that takes a single prop called "children"
export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Retrieve the token from the local storage
    const token = localStorage.getItem('token');
    
    // If a token exists, redirect the user to the '/dashboard' route using the router
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  // The component returns JSX that represents the layout structure of the page
  return (
    <body className="h-100 d-flex flex-column">
      <header>
        {/* Render the NavigationBar component */}
        <NavigationBar />
      </header>
      {/* Render the children components passed to the Layout component */}
      {children}
      <footer className="bg-body-tertiary mt-auto">
        {/* Render the Footer component */}
        <Footer />
      </footer>
    </body>
  );
}