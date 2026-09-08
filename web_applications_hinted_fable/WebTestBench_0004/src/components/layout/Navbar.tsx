import { Link, useLocation } from "react-router-dom";
import { Heart, Calendar, MapPin, Users, CheckSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Dashboard", icon: Calendar, key: "dashboard", target: "dashboard.page" },
  { to: "/venues", label: "Venues", icon: MapPin, key: "venues", target: "venues.page" },
  { to: "/vendors", label: "Vendors", icon: Users, key: "vendors", target: "vendors.page" },
  { to: "/favorites", label: "Favorites", icon: Heart, key: "favorites", target: "favorites.page" },
  { to: "/checklists", label: "Checklists", icon: CheckSquare, key: "checklists", target: "checklists.page" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-semtag-id="nav.logo"
            data-semtag-role="navigation"
            data-semtag-target="dashboard.page"
          >
            <Heart className="h-6 w-6 text-primary fill-primary group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-semibold text-foreground">
              Ever After
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, key, target }) => (
              <Link
                key={to}
                to={to}
                data-semtag-id={`nav.${key}`}
                data-semtag-role="navigation"
                data-semtag-target={target}
              >
                <Button
                  variant={location.pathname === to ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-semtag-id="nav.menu.toggle"
            data-semtag-role="toggle"
            data-semtag-state={mobileMenuOpen ? "open" : "closed"}
            data-semtag-controls="nav.menu.mobile"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1" data-semtag-id="nav.menu.mobile" data-semtag-role="region">
            {navLinks.map(({ to, label, icon: Icon, key, target }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                data-semtag-id={`nav.${key}.mobile`}
                data-semtag-role="navigation"
                data-semtag-target={target}
              >
                <Button
                  variant={location.pathname === to ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
