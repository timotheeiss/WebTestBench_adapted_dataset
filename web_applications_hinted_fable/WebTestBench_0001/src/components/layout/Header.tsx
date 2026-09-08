import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', semtagId: 'nav.home', semtagTarget: 'home.page' },
  { href: '/products', label: 'All Products', semtagId: 'nav.products', semtagTarget: 'products.page' },
  { href: '/category/tech', label: 'Tech', semtagId: 'nav.category.tech', semtagTarget: 'category.tech' },
  { href: '/category/home', label: 'Home', semtagId: 'nav.category.home', semtagTarget: 'category.home' },
  { href: '/category/fitness', label: 'Fitness', semtagId: 'nav.category.fitness', semtagTarget: 'category.fitness' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            data-semtag-id="nav.logo"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
          >
            <span className="font-display text-xl font-bold text-foreground">
              Curated<span className="text-primary">Picks</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-semtag-id={link.semtagId}
                data-semtag-role="navigation"
                data-semtag-target={link.semtagTarget}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & Admin */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-48 lg:w-64 h-9 bg-muted/50 border-0 focus-visible:ring-1"
                  data-semtag-id="search.query"
                  data-semtag-role="input"
                  data-semtag-state="search.query"
                />
              </div>
            </form>

            <Link
              to="/admin"
              data-semtag-id="nav.admin"
              data-semtag-role="navigation"
              data-semtag-target="admin.page"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-semtag-id="nav.menu.toggle"
              data-semtag-role="toggle"
              data-semtag-action="toggle-mobile-menu"
              data-semtag-state={isMenuOpen ? 'open' : 'closed'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full h-10 bg-muted/50 border-0"
                  data-semtag-id="search.query.mobile"
                  data-semtag-role="input"
                  data-semtag-state="search.query"
                />
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  data-semtag-id={`${link.semtagId}.mobile`}
                  data-semtag-role="navigation"
                  data-semtag-target={link.semtagTarget}
                  className={cn(
                    'px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                    location.pathname === link.href
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
