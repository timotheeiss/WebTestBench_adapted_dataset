import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Building2 } from 'lucide-react';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatSalary, formatDate, getEmploymentTypeLabel } from '@/lib/formatters';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      data-semtag-id={`jobs.list.item.${job.id}`}
      data-semtag-role="navigation"
      data-semtag-target="job.detail"
    >
      <Card className="group p-5 transition-all duration-300 hover:shadow-card-hover hover:border-accent/30 animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">{job.industry}</Badge>
              <Badge variant="secondary">{getEmploymentTypeLabel(job.employmentType)}</Badge>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors truncate">
              {job.title}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{job.company}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 flex-shrink-0" />
                <span
                  data-semtag-id={`jobs.list.item.${job.id}.salary`}
                  data-semtag-role="observable"
                  data-semtag-state="job.salary"
                >{formatSalary(job.salaryMin, job.salaryMax, job.employmentType)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(job.postedAt)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="skill">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="skill">+{job.skills.length - 4}</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
