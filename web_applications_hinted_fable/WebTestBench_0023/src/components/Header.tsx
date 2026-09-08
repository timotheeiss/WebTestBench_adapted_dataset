import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Plus, Search, Leaf, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { isAuthenticated, currentUser, cart, logout } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          data-semtag-id="header.logo"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">ReVive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            data-semtag-id="header.nav.browse"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          <Link
            to="/categories"
            data-semtag-id="header.nav.categories"
            data-semtag-role="navigation"
            data-semtag-target="categories.page"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/about"
            data-semtag-id="header.nav.about"
            data-semtag-role="navigation"
            data-semtag-target="about.page"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                variant="hero"
                size="sm"
                onClick={() => navigate('/create-listing')}
                data-semtag-id="header.sell"
                data-semtag-role="navigation"
                data-semtag-target="create-listing.page"
                className="hidden sm:flex"
              >
                <Plus className="h-4 w-4" />
                Sell
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/cart')}
                data-semtag-id="header.cart"
                data-semtag-role="navigation"
                data-semtag-target="cart.page"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span
                    data-semtag-id="header.cart.count"
                    data-semtag-role="observable"
                    data-semtag-state="cart.count"
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground font-medium"
                  >
                    {cart.length}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-semtag-id="header.user-menu"
                    data-semtag-role="action"
                    data-semtag-action="open-user-menu"
                    className="rounded-full"
                  >
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    data-semtag-id="header.user-menu.profile"
                    data-semtag-role="navigation"
                    data-semtag-target="profile.page"
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate('/my-listings')}
                    data-semtag-id="header.user-menu.my-listings"
                    data-semtag-role="navigation"
                    data-semtag-target="my-listings.page"
                  >
                    <Leaf className="mr-2 h-4 w-4" />
                    My Listings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    data-semtag-id="header.user-menu.logout"
                    data-semtag-role="action"
                    data-semtag-action="log-out"
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                data-semtag-id="header.login"
                data-semtag-role="navigation"
                data-semtag-target="login.page"
                className="hidden sm:flex"
              >
                Log in
              </Button>
              <Button
                variant="hero"
                onClick={() => navigate('/register')}
                data-semtag-id="header.signup"
                data-semtag-role="navigation"
                data-semtag-target="register.page"
                className="hidden sm:flex"
              >
                Sign up
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-semtag-id="header.menu.mobile"
                data-semtag-role="action"
                data-semtag-action="open-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  data-semtag-id="header.nav.browse.mobile"
                  data-semtag-role="navigation"
                  data-semtag-target="home.page"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse
                </Link>
                <Link
                  to="/categories"
                  data-semtag-id="header.nav.categories.mobile"
                  data-semtag-role="navigation"
                  data-semtag-target="categories.page"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/about"
                  data-semtag-id="header.nav.about.mobile"
                  data-semtag-role="navigation"
                  data-semtag-target="about.page"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                {isAuthenticated ? (
                  <>
                    <hr className="border-border" />
                    <Link
                      to="/create-listing"
                      data-semtag-id="header.sell.mobile"
                      data-semtag-role="navigation"
                      data-semtag-target="create-listing.page"
                      className="text-lg font-medium text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      + Create Listing
                    </Link>
                    <Link
                      to="/my-listings"
                      data-semtag-id="header.my-listings.mobile"
                      data-semtag-role="navigation"
                      data-semtag-target="my-listings.page"
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Listings
                    </Link>
                    <Link
                      to="/cart"
                      data-semtag-id="header.cart.mobile"
                      data-semtag-role="navigation"
                      data-semtag-target="cart.page"
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cart ({cart.length})
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      data-semtag-id="header.logout.mobile"
                      data-semtag-role="action"
                      data-semtag-action="log-out"
                      className="text-lg font-medium text-destructive text-left"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <hr className="border-border" />
                    <Link
                      to="/login"
                      data-semtag-id="header.login.mobile"
                      data-semtag-role="navigation"
                      data-semtag-target="login.page"
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      data-semtag-id="header.signup.mobile"
                      data-semtag-role="navigation"
                      data-semtag-target="register.page"
                      className="text-lg font-medium text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
