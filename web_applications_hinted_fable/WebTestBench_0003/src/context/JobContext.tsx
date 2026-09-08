import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Application, Employer } from '@/types';
import { initialJobs, initialApplications, employers } from '@/data/initialData';

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  currentEmployer: Employer;
  addJob: (job: Omit<Job, 'id' | 'postedAt' | 'employerId'>) => void;
  deleteJob: (jobId: string) => void;
  addApplication: (application: Omit<Application, 'id' | 'submittedAt'>) => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationsForJob: (jobId: string) => Application[];
  getEmployerJobs: () => Job[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [currentEmployer] = useState<Employer>(employers[0]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'employerId'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedAt: new Date().toISOString().split('T')[0],
      employerId: currentEmployer.id,
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setApplications((prev) => prev.filter((app) => app.jobId !== jobId));
  };

  const addApplication = (appData: Omit<Application, 'id' | 'submittedAt'>) => {
    const newApplication: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setApplications((prev) => [newApplication, ...prev]);
  };

  const getJobById = (id: string) => jobs.find((job) => job.id === id);

  const getApplicationsForJob = (jobId: string) =>
    applications.filter((app) => app.jobId === jobId);

  const getEmployerJobs = () =>
    jobs.filter((job) => job.employerId === currentEmployer.id);

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        currentEmployer,
        addJob,
        deleteJob,
        addApplication,
        getJobById,
        getApplicationsForJob,
        getEmployerJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
