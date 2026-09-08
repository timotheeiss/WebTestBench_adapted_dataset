import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();
  const isEmployerSection = location.pathname.startsWith('/employer');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-semtag-id="nav.logo"
          data-semtag-role="navigation"
          data-semtag-target="jobs.page"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-transform group-hover:scale-105">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">JobBoard</span>
        </Link>

        <nav className="flex items-center gap-1" data-semtag-id="nav.menu" data-semtag-role="region">
          <Link
            to="/"
            data-semtag-id="nav.find-jobs"
            data-semtag-role="navigation"
            data-semtag-target="jobs.page"
          >
            <Button
              variant={!isEmployerSection ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2',
                !isEmployerSection && 'bg-secondary'
              )}
            >
              <Briefcase className="h-4 w-4" />
              Find Jobs
            </Button>
          </Link>
          <Link
            to="/employer/dashboard"
            data-semtag-id="nav.employer"
            data-semtag-role="navigation"
            data-semtag-target="employer.dashboard"
          >
            <Button
              variant={isEmployerSection ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'gap-2',
                isEmployerSection && 'bg-secondary'
              )}
            >
              <Building2 className="h-4 w-4" />
              Employer
            </Button>
          </Link>
          <Link
            to="/employer/post-job"
            className="ml-2"
            data-semtag-id="nav.post-job"
            data-semtag-role="navigation"
            data-semtag-target="employer.post-job"
          >
            <Button variant="accent" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Post a Job
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
