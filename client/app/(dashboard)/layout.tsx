import { DashboardNavigationBar } from "@/components";

export default function Layout ({children}: {children: React.ReactNode}) {
  return (
    <body className="h-100">
      <header>
        <DashboardNavigationBar />
      </header>
      {children}
    </body>
  );
}
