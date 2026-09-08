import { useState, useMemo } from 'react';
import { useResume } from '@/context/ResumeContext';
import { ResumeCard } from './ResumeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, FileText, ArrowUpDown } from 'lucide-react';

interface DashboardProps {
  onEditResume: (id: string) => void;
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export function Dashboard({ onEditResume }: DashboardProps) {
  const { resumes, createResume } = useResume();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedResumes = useMemo(() => {
    let filtered = resumes.filter(resume =>
      resume.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [resumes, searchQuery, sortBy]);

  const handleCreateResume = () => {
    const newResume = createResume();
    onEditResume(newResume.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">ResumeBuilder</h1>
            </div>
            <Button
              variant="accent"
              onClick={handleCreateResume}
              data-semtag-id="dashboard.create"
              data-semtag-role="action"
              data-semtag-action="create-resume"
            >
              <Plus className="w-4 h-4" />
              New Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-10 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Resumes</h2>
          <p className="text-muted-foreground">
            Create, customize, and manage your professional resumes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up stagger-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-semtag-id="dashboard.search"
              data-semtag-role="input"
              data-semtag-state="dashboard.search.query"
              data-semtag-controls="dashboard.resumes"
            />
          </div>
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger
              className="w-full sm:w-48"
              data-semtag-id="dashboard.sort"
              data-semtag-role="select"
              data-semtag-action="sort-resumes"
              data-semtag-state="dashboard.sort"
              data-semtag-controls="dashboard.resumes"
              data-semtag-options="newest|Newest First;oldest|Oldest First;title-asc|Title A-Z;title-desc|Title Z-A"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest" data-semtag-id="dashboard.sort.option.newest" data-semtag-role="option">Newest First</SelectItem>
              <SelectItem value="oldest" data-semtag-id="dashboard.sort.option.oldest" data-semtag-role="option">Oldest First</SelectItem>
              <SelectItem value="title-asc" data-semtag-id="dashboard.sort.option.title-asc" data-semtag-role="option">Title A-Z</SelectItem>
              <SelectItem value="title-desc" data-semtag-id="dashboard.sort.option.title-desc" data-semtag-role="option">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resumes Grid */}
        {filteredAndSortedResumes.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up stagger-2">
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3
              className="text-xl font-semibold text-foreground mb-2"
              data-semtag-id="dashboard.empty-message"
              data-semtag-role="observable"
              data-semtag-state="dashboard.resumes.empty"
            >
              {searchQuery ? 'No resumes found' : 'No resumes yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? 'Try a different search term'
                : 'Create your first resume to get started'
              }
            </p>
            {!searchQuery && (
              <Button
                variant="accent"
                onClick={handleCreateResume}
                data-semtag-id="dashboard.create.empty"
                data-semtag-role="action"
                data-semtag-action="create-resume"
              >
                <Plus className="w-4 h-4" />
                Create Resume
              </Button>
            )}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-semtag-id="dashboard.resumes"
            data-semtag-role="collection"
          >
            {filteredAndSortedResumes.map((resume, index) => (
              <div 
                key={resume.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ResumeCard resume={resume} onEdit={onEditResume} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
