import { useState, useMemo } from 'react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { useJobs } from '@/context/JobContext';
import { FilterState } from '@/types';

const Index = () => {
  const { jobs } = useJobs();
  const [filters, setFilters] = useState<FilterState>({
    industry: '',
    location: '',
    employmentType: '',
    search: '',
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesIndustry = !filters.industry || filters.industry === 'all' || job.industry === filters.industry;
      const matchesLocation = !filters.location || filters.location === 'all' || job.location === filters.location;
      const matchesType = !filters.employmentType || filters.employmentType === 'all' || job.employmentType === filters.employmentType;
      const matchesSearch = !filters.search || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));
      
      return matchesIndustry && matchesLocation && matchesType && matchesSearch;
    });
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(222_47%_15%)_0%,hsl(222_47%_25%)_100%)]" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover thousands of opportunities from top companies. 
              Your next career move starts here.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/70 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span
                  className="text-sm"
                  data-semtag-id="jobs.hero.active-count"
                  data-semtag-role="observable"
                  data-semtag-state="jobs.count"
                >{jobs.length}+ Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">1,000+ Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Growing Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mb-6">
          <JobFilters filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p
            className="text-sm text-muted-foreground"
            data-semtag-id="jobs.results.count"
            data-semtag-role="observable"
            data-semtag-state="jobs.results.count"
          >
            Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3
              className="text-lg font-medium text-foreground mb-2"
              data-semtag-id="jobs.results.empty"
              data-semtag-role="observable"
              data-semtag-state="jobs.results.count"
            >No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid gap-4" data-semtag-id="jobs.list" data-semtag-role="collection">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
