import { NavigationBar, Footer } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
};

export default Layout;
