"use client";
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout ({children}: {children: ReactNode}) {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <body className='h-100 justify-content-center d-flex align-items-center bg-body-tertiary'>
      {children}
    </body>
  );
}
