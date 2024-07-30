'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationBar, Footer } from '@/components';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <body className="h-100 d-flex flex-column">
      <header>
        <NavigationBar />
      </header>
      {children}
      <footer className="bg-body-tertiary mt-auto">
        <Footer />
      </footer>
    </body>
  );
}
