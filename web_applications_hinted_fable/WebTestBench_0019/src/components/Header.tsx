import { Link } from "react-router-dom";
import { MessageCircle, Search, User, LogIn, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForum } from "@/context/ForumContext";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const { currentUser, logout } = useForum();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-semtag-id="nav.home"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-warm">
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-heading text-xl font-bold sm:inline-block">
            Thread<span className="text-gradient">Hive</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search threads..."
              data-semtag-id="search.query"
              data-semtag-role="input"
              data-semtag-state="search.query"
              data-semtag-controls="threads.list"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-transparent focus:border-primary/30"
            />
          </div>
        </form>

        <nav className="flex items-center gap-2">
          {currentUser ? (
            <>
              <Button asChild variant="default" size="sm" className="gap-2">
                <Link
                  to="/new-thread"
                  data-semtag-id="nav.new-thread"
                  data-semtag-role="navigation"
                  data-semtag-target="new-thread.page"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Thread</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link
                  to={`/profile/${currentUser.id}`}
                  className="gap-2"
                  data-semtag-id="nav.profile"
                  data-semtag-role="navigation"
                  data-semtag-target="profile.page"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="hidden md:inline">{currentUser.username}</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                data-semtag-id="nav.logout"
                data-semtag-role="action"
                data-semtag-action="log-out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link
                  to="/login"
                  className="gap-2"
                  data-semtag-id="nav.login"
                  data-semtag-role="navigation"
                  data-semtag-target="login.page"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link
                  to="/register"
                  data-semtag-id="nav.register"
                  data-semtag-role="navigation"
                  data-semtag-target="register.page"
                >
                  <User className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
