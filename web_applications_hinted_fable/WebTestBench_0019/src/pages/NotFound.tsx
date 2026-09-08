import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-warm">
            <MessageCircle className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold mb-2">404</h1>
        <p
          className="text-xl text-muted-foreground mb-6"
          data-semtag-id="error.message"
          data-semtag-role="observable"
        >Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link
            to="/"
            className="gap-2"
            data-semtag-id="nav.home"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
