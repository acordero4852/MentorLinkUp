import { DashboardNavigationBar } from "@/components";

export default function Layout ({children}: {children: React.ReactNode}) {
  return (
    <body>
      <header>
        <DashboardNavigationBar />
      </header>
      {children}
    </body>
  );
}
