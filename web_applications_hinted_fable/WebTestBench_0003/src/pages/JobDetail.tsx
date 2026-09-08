import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Building2, Briefcase } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ApplicationForm } from '@/components/jobs/ApplicationForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useJobs } from '@/context/JobContext';
import { formatSalary, formatDate, getEmploymentTypeLabel } from '@/lib/formatters';
import { semtagSlug } from '@/lib/semtag';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getJobById } = useJobs();
  const job = getJobById(id || '');

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h1
            className="text-2xl font-bold mb-2"
            data-semtag-id="job.detail.notfound"
            data-semtag-role="observable"
            data-semtag-state="job.status"
          >Job not found</h1>
          <p className="text-muted-foreground mb-6">This job listing may have been removed or doesn't exist.</p>
          <Link
            to="/"
            data-semtag-id="job.detail.notfound.browse"
            data-semtag-role="navigation"
            data-semtag-target="jobs.page"
          >
            <Button variant="accent">Browse all jobs</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-semtag-id="job.detail.back"
          data-semtag-role="navigation"
          data-semtag-target="jobs.page"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="accent"
                    data-semtag-id="job.detail.industry"
                    data-semtag-role="observable"
                    data-semtag-state="job.industry"
                  >{job.industry}</Badge>
                  <Badge
                    variant="secondary"
                    data-semtag-id="job.detail.type"
                    data-semtag-role="observable"
                    data-semtag-state="job.employment-type"
                  >{getEmploymentTypeLabel(job.employmentType)}</Badge>
                </div>

                <h1
                  className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                  data-semtag-id="job.detail.title"
                  data-semtag-role="observable"
                  data-semtag-state="job.title"
                >
                  {job.title}
                </h1>

                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                  <Building2 className="h-5 w-5" />
                  <span
                    className="font-medium"
                    data-semtag-id="job.detail.company"
                    data-semtag-role="observable"
                    data-semtag-state="job.company"
                  >{job.company}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span
                      data-semtag-id="job.detail.location"
                      data-semtag-role="observable"
                      data-semtag-state="job.location"
                    >{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    <span
                      data-semtag-id="job.detail.salary"
                      data-semtag-role="observable"
                      data-semtag-state="job.salary"
                    >{formatSalary(job.salaryMin, job.salaryMax, job.employmentType)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span
                      data-semtag-id="job.detail.posted"
                      data-semtag-role="observable"
                      data-semtag-state="job.posted-date"
                    >Posted {formatDate(job.postedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  data-semtag-id="job.detail.description"
                  data-semtag-role="region"
                >
                  {job.description.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className="font-semibold text-foreground mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4">
                          {paragraph.replace('- ', '')}
                        </li>
                      );
                    }
                    return paragraph ? <p key={index}>{paragraph}</p> : null;
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
                <div
                  className="flex flex-wrap gap-2"
                  data-semtag-id="job.detail.skills"
                  data-semtag-role="collection"
                >
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="skill"
                      className="px-3 py-1.5"
                      data-semtag-id={`job.detail.skills.item.${semtagSlug(skill)}`}
                      data-semtag-role="observable"
                      data-semtag-state="job.skill"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <ApplicationForm jobId={job.id} jobTitle={job.title} company={job.company} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
