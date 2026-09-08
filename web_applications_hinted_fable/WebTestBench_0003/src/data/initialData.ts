import { Job, Application, Employer } from '@/types';

export const employers: Employer[] = [
  {
    id: 'emp-1',
    name: 'Sarah Chen',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Solutions',
  },
  {
    id: 'emp-2',
    name: 'Michael Roberts',
    email: 'michael@healthplus.com',
    company: 'HealthPlus Medical',
  },
];

export const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    description: `We're looking for an experienced Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using React and TypeScript.

**Responsibilities:**
- Build and maintain responsive web applications
- Collaborate with designers and backend engineers
- Write clean, maintainable code with comprehensive tests
- Mentor junior developers

**Requirements:**
- 5+ years of experience with React
- Strong TypeScript skills
- Experience with state management (Redux, Zustand)
- Excellent communication skills`,
    location: 'San Francisco, CA',
    salaryMin: 140000,
    salaryMax: 180000,
    skills: ['React', 'TypeScript', 'CSS', 'Node.js'],
    industry: 'Technology',
    employmentType: 'full-time',
    postedAt: '2024-01-15',
    employerId: 'emp-1',
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    company: 'TechCorp Solutions',
    description: `Join our design team to create beautiful, user-centered products. We're looking for someone who can take ownership of the entire design process.

**What you'll do:**
- Lead design projects from concept to delivery
- Create wireframes, prototypes, and high-fidelity designs
- Conduct user research and usability testing
- Build and maintain our design system

**What we're looking for:**
- 3+ years of product design experience
- Proficiency in Figma
- Strong portfolio showcasing UX/UI work
- Experience with design systems`,
    location: 'Remote',
    salaryMin: 100000,
    salaryMax: 140000,
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    industry: 'Design',
    employmentType: 'remote',
    postedAt: '2024-01-18',
    employerId: 'emp-1',
  },
  {
    id: 'job-3',
    title: 'Registered Nurse',
    company: 'HealthPlus Medical',
    description: `HealthPlus Medical is seeking compassionate Registered Nurses to join our team. Provide high-quality patient care in a supportive environment.

**Responsibilities:**
- Assess patient health and create care plans
- Administer medications and treatments
- Collaborate with healthcare team members
- Document patient information accurately

**Qualifications:**
- Active RN license
- BSN preferred
- 2+ years clinical experience
- BLS certification required`,
    location: 'New York, NY',
    salaryMin: 75000,
    salaryMax: 95000,
    skills: ['Patient Care', 'Clinical Assessment', 'EMR Systems', 'BLS'],
    industry: 'Healthcare',
    employmentType: 'full-time',
    postedAt: '2024-01-20',
    employerId: 'emp-2',
  },
  {
    id: 'job-4',
    title: 'Marketing Manager',
    company: 'BrandForward Agency',
    description: `We're seeking a creative Marketing Manager to drive our clients' growth. Lead campaigns that make an impact.

**Key Responsibilities:**
- Develop and execute marketing strategies
- Manage multi-channel campaigns
- Analyze performance metrics and optimize
- Lead a team of marketing specialists

**Requirements:**
- 4+ years in marketing
- Experience with digital advertising
- Strong analytical skills
- Excellent project management abilities`,
    location: 'Austin, TX',
    salaryMin: 85000,
    salaryMax: 110000,
    skills: ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy'],
    industry: 'Marketing',
    employmentType: 'full-time',
    postedAt: '2024-01-22',
    employerId: 'emp-1',
  },
  {
    id: 'job-5',
    title: 'Data Analyst',
    company: 'FinanceFirst',
    description: `Join our analytics team to transform data into actionable insights. Help drive business decisions with your analytical expertise.

**What you'll do:**
- Analyze large datasets to identify trends
- Create dashboards and reports
- Collaborate with stakeholders to understand needs
- Present findings to leadership

**Requirements:**
- Proficiency in SQL and Python
- Experience with visualization tools (Tableau, Power BI)
- Strong statistical knowledge
- Finance industry experience a plus`,
    location: 'Chicago, IL',
    salaryMin: 70000,
    salaryMax: 95000,
    skills: ['SQL', 'Python', 'Tableau', 'Statistics'],
    industry: 'Finance',
    employmentType: 'full-time',
    postedAt: '2024-01-25',
    employerId: 'emp-2',
  },
  {
    id: 'job-6',
    title: 'Part-Time Content Writer',
    company: 'ContentHub',
    description: `Looking for talented writers to create engaging content on a part-time basis. Perfect for freelancers wanting consistent work.

**Responsibilities:**
- Write blog posts, articles, and web copy
- Research topics and interview experts
- Edit and proofread content
- Meet deadlines consistently

**Requirements:**
- Excellent writing skills
- Portfolio of published work
- Ability to adapt to different brand voices
- SEO knowledge preferred`,
    location: 'Remote',
    salaryMin: 25,
    salaryMax: 45,
    skills: ['Writing', 'SEO', 'Research', 'Editing'],
    industry: 'Marketing',
    employmentType: 'part-time',
    postedAt: '2024-01-28',
    employerId: 'emp-1',
  },
  {
    id: 'job-7',
    title: 'DevOps Engineer (Contract)',
    company: 'CloudScale Inc',
    description: `6-month contract opportunity for an experienced DevOps Engineer. Help us build and maintain scalable cloud infrastructure.

**Project Scope:**
- Migrate services to Kubernetes
- Implement CI/CD pipelines
- Set up monitoring and alerting
- Document infrastructure decisions

**Requirements:**
- 4+ years DevOps experience
- Strong Kubernetes knowledge
- AWS or GCP certification
- Infrastructure as Code (Terraform)`,
    location: 'Seattle, WA',
    salaryMin: 80,
    salaryMax: 100,
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    industry: 'Technology',
    employmentType: 'contract',
    postedAt: '2024-01-30',
    employerId: 'emp-1',
  },
  {
    id: 'job-8',
    title: 'Elementary School Teacher',
    company: 'Bright Futures Academy',
    description: `Inspire the next generation at our innovative elementary school. We're looking for passionate educators who love working with children.

**Responsibilities:**
- Develop engaging lesson plans
- Create a positive classroom environment
- Assess student progress
- Communicate with parents regularly

**Qualifications:**
- Teaching certification required
- Bachelor's in Education
- Experience with diverse learners
- Patience and creativity`,
    location: 'Boston, MA',
    salaryMin: 50000,
    salaryMax: 70000,
    skills: ['Curriculum Development', 'Classroom Management', 'Communication', 'Assessment'],
    industry: 'Education',
    employmentType: 'full-time',
    postedAt: '2024-02-01',
    employerId: 'emp-2',
  },
];

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    name: 'Alex Johnson',
    email: 'alex.j@email.com',
    phone: '555-0101',
    message: 'I have 6 years of React experience and would love to contribute to your team. My recent work includes building a real-time collaboration platform.',
    submittedAt: '2024-01-20',
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '555-0102',
    message: 'Experienced frontend developer with a passion for clean code and user experience. Previously worked at a Fortune 500 company.',
    submittedAt: '2024-01-22',
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '555-0103',
    message: 'Product designer with 4 years experience. I specialize in creating intuitive interfaces and have led design systems at two startups.',
    submittedAt: '2024-01-25',
  },
];

export const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Marketing',
  'Education',
  'Design',
  'Sales',
  'Engineering',
];

export const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Chicago, IL',
  'Seattle, WA',
  'Boston, MA',
  'Remote',
];

export const employmentTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' },
];
