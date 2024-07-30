'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNavigationBar } from '@/components';

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
    </body>
  );
}
