import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, Users, Trash2, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobs } from '@/context/JobContext';
import { formatSalary, formatDate, getEmploymentTypeLabel } from '@/lib/formatters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Dashboard = () => {
  const { getEmployerJobs, getApplicationsForJob, deleteJob, currentEmployer } = useJobs();
  const employerJobs = getEmployerJobs();
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  const toggleJobExpanded = (jobId: string) => {
    setExpandedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const totalApplications = employerJobs.reduce(
    (acc, job) => acc + getApplicationsForJob(job.id).length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Employer Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {currentEmployer.name}
            </p>
          </div>
          <Link
            to="/employer/post-job"
            data-semtag-id="dashboard.post-job"
            data-semtag-role="navigation"
            data-semtag-target="employer.post-job"
          >
            <Button variant="accent" className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p
                    className="text-2xl font-bold"
                    data-semtag-id="dashboard.stats.active-jobs"
                    data-semtag-role="observable"
                    data-semtag-state="employer.jobs.count"
                  >{employerJobs.length}</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p
                    className="text-2xl font-bold"
                    data-semtag-id="dashboard.stats.applications"
                    data-semtag-role="observable"
                    data-semtag-state="employer.applications.count"
                  >{totalApplications}</p>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Job Listings</CardTitle>
            <CardDescription>Manage your posted jobs and view applications</CardDescription>
          </CardHeader>
          <CardContent>
            {employerJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3
                  className="text-lg font-medium mb-2"
                  data-semtag-id="dashboard.jobs.empty"
                  data-semtag-role="observable"
                  data-semtag-state="employer.jobs.count"
                >No jobs posted yet</h3>
                <p className="text-muted-foreground mb-4">Start attracting candidates by posting your first job</p>
                <Link
                  to="/employer/post-job"
                  data-semtag-id="dashboard.jobs.empty.post"
                  data-semtag-role="navigation"
                  data-semtag-target="employer.post-job"
                >
                  <Button variant="accent">Post Your First Job</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4" data-semtag-id="dashboard.jobs" data-semtag-role="collection">
                {employerJobs.map((job) => {
                  const applications = getApplicationsForJob(job.id);
                  const isExpanded = expandedJobs.has(job.id);

                  return (
                    <div key={job.id} className="border border-border rounded-lg overflow-hidden">
                      <div className="p-4 bg-card">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="accent">{job.industry}</Badge>
                              <Badge variant="secondary">{getEmploymentTypeLabel(job.employmentType)}</Badge>
                            </div>
                            <h3
                              className="font-semibold text-foreground"
                              data-semtag-id={`dashboard.jobs.item.${job.id}`}
                              data-semtag-role="observable"
                              data-semtag-state="job.title"
                            >{job.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {job.location} · {formatSalary(job.salaryMin, job.salaryMax, job.employmentType)} · Posted {formatDate(job.postedAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleJobExpanded(job.id)}
                              className="gap-1.5"
                              data-semtag-id={`dashboard.jobs.item.${job.id}.applications`}
                              data-semtag-role="action"
                              data-semtag-action="toggle-applications"
                              data-semtag-state={isExpanded ? 'open' : 'closed'}
                            >
                              <Users className="h-4 w-4" />
                              {applications.length}
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-destructive"
                                  data-semtag-id={`dashboard.jobs.item.${job.id}.delete`}
                                  data-semtag-role="action"
                                  data-semtag-action="delete-job"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent
                                className="bg-card"
                                data-semtag-id={`dashboard.jobs.item.${job.id}.delete.dialog`}
                                data-semtag-role="region"
                              >
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{job.title}" and all its applications. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    data-semtag-id={`dashboard.jobs.item.${job.id}.delete.cancel`}
                                    data-semtag-role="action"
                                    data-semtag-action="cancel-delete-job"
                                  >Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    data-semtag-id={`dashboard.jobs.item.${job.id}.delete.confirm`}
                                    data-semtag-role="action"
                                    data-semtag-action="confirm-delete-job"
                                    onClick={() => deleteJob(job.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-border bg-muted/30 p-4">
                          {applications.length === 0 ? (
                            <p
                              className="text-sm text-muted-foreground text-center py-4"
                              data-semtag-id={`dashboard.jobs.item.${job.id}.applications.empty`}
                              data-semtag-role="observable"
                              data-semtag-state="job.applications.count"
                            >
                              No applications yet
                            </p>
                          ) : (
                            <div
                              className="space-y-3"
                              data-semtag-id={`dashboard.jobs.item.${job.id}.applications.list`}
                              data-semtag-role="collection"
                            >
                              <h4
                                className="text-sm font-medium text-muted-foreground mb-3"
                                data-semtag-id={`dashboard.jobs.item.${job.id}.applications.count`}
                                data-semtag-role="observable"
                                data-semtag-state="job.applications.count"
                              >
                                Applications ({applications.length})
                              </h4>
                              {applications.map((app) => (
                                <div key={app.id} className="bg-card rounded-lg p-4 border border-border">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <h5
                                        className="font-medium"
                                        data-semtag-id={`dashboard.applications.item.${app.id}`}
                                        data-semtag-role="observable"
                                        data-semtag-state="application.name"
                                      >{app.name}</h5>
                                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                                        <span
                                          className="flex items-center gap-1"
                                          data-semtag-id={`dashboard.applications.item.${app.id}.email`}
                                          data-semtag-role="observable"
                                          data-semtag-state="application.email"
                                        >
                                          <Mail className="h-3.5 w-3.5" />
                                          {app.email}
                                        </span>
                                        {app.phone && (
                                          <span className="flex items-center gap-1">
                                            <Phone className="h-3.5 w-3.5" />
                                            {app.phone}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(app.submittedAt)}
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm text-muted-foreground mt-3 bg-muted p-3 rounded"
                                    data-semtag-id={`dashboard.applications.item.${app.id}.message`}
                                    data-semtag-role="observable"
                                    data-semtag-state="application.message"
                                  >
                                    {app.message}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
