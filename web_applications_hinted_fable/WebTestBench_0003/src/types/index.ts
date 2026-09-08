export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  industry: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'remote';
  postedAt: string;
  employerId: string;
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export interface Employer {
  id: string;
  name: string;
  email: string;
  company: string;
}

export type Industry = 
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Marketing'
  | 'Education'
  | 'Design'
  | 'Sales'
  | 'Engineering';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'remote';

export interface FilterState {
  industry: string;
  location: string;
  employmentType: string;
  search: string;
}
