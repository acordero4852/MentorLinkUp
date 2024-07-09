export default function Layout ({children}: {children: React.ReactNode}) {
  return (
    <body className='h-100 justify-content-center d-flex align-items-center bg-body-tertiary'>
      {children}
    </body>
  );
}