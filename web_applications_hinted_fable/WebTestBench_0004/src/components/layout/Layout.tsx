import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col romantic-gradient">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Ever After. Made with love for your perfect day.
          </p>
        </div>
      </footer>
    </div>
  );
}
