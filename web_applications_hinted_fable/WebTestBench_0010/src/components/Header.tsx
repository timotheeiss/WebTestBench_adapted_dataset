import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Restaurants', semtagKey: 'restaurants', semtagTarget: 'home.page' },
    { href: '/reservations', label: 'My Reservations', semtagKey: 'reservations', semtagTarget: 'reservations.page' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            data-semtag-id="nav.logo"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">TableSpot</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                data-semtag-id={`nav.${link.semtagKey}`}
                data-semtag-role="navigation"
                data-semtag-target={link.semtagTarget}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            data-semtag-id="nav.menu.toggle"
            data-semtag-role="toggle"
            data-semtag-action="toggle-menu"
            data-semtag-state={isMenuOpen ? 'open' : 'closed'}
            data-semtag-controls="nav.mobile"
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            data-semtag-id="nav.mobile"
            data-semtag-role="region"
            className="md:hidden py-4 border-t border-border animate-fade-in"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                data-semtag-id={`nav.${link.semtagKey}.mobile`}
                data-semtag-role="navigation"
                data-semtag-target={link.semtagTarget}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block py-3 text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
