'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNavigationBar, Footer } from '@/components';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

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
