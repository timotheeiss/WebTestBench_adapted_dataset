export interface Competency {
  id: string;
  name: string;
  description: string;
  level: number; // 1-5: Novice, Beginner, Intermediate, Advanced, Expert
  category: 'technical' | 'behavioral' | 'leadership' | 'domain';
  weight: number; // 0-1 importance weight
  enabled: boolean;
}

export interface CompetencyEdge {
  id: string;
  source: string;
  target: string;
  weight: number; // 0-1 strength of relationship
  type: 'dependency' | 'reinforcement';
}

export interface CompetencyModel {
  id: string;
  jobTitle: string;
  department: string;
  description: string;
  keywords: string[];
  competencies: Competency[];
  edges: CompetencyEdge[];
  createdAt: string;
  isTemplate: boolean;
}

export interface SimulationScenario {
  id: string;
  name: string;
  type: 'recruitment' | 'training' | 'promotion';
  description: string;
  adjustments: {
    competencyId: string;
    levelChange: number;
    weightChange: number;
  }[];
}

export const LEVEL_LABELS = ['Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const CATEGORY_COLORS = {
  technical: 'hsl(199, 89%, 48%)',
  behavioral: 'hsl(173, 58%, 39%)',
  leadership: 'hsl(38, 92%, 50%)',
  domain: 'hsl(142, 71%, 45%)',
};

export const competencyModels: CompetencyModel[] = [
  {
    id: 'software-engineer',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    description: 'Full-stack software engineer responsible for designing, developing, and maintaining software applications.',
    keywords: ['programming', 'coding', 'software', 'development', 'engineering', 'tech'],
    competencies: [
      { id: 'prog-lang', name: 'Programming Languages', description: 'Proficiency in multiple programming languages', level: 4, category: 'technical', weight: 0.9, enabled: true },
      { id: 'sys-design', name: 'System Design', description: 'Ability to design scalable systems', level: 3, category: 'technical', weight: 0.8, enabled: true },
      { id: 'problem-solve', name: 'Problem Solving', description: 'Analytical thinking and debugging skills', level: 4, category: 'behavioral', weight: 0.9, enabled: true },
      { id: 'collab', name: 'Collaboration', description: 'Working effectively in teams', level: 3, category: 'behavioral', weight: 0.7, enabled: true },
      { id: 'code-review', name: 'Code Review', description: 'Reviewing and improving code quality', level: 3, category: 'technical', weight: 0.6, enabled: true },
      { id: 'agile', name: 'Agile Methodology', description: 'Understanding of agile development practices', level: 3, category: 'domain', weight: 0.5, enabled: true },
    ],
    edges: [
      { id: 'e1', source: 'prog-lang', target: 'code-review', weight: 0.8, type: 'reinforcement' },
      { id: 'e2', source: 'prog-lang', target: 'sys-design', weight: 0.7, type: 'dependency' },
      { id: 'e3', source: 'problem-solve', target: 'sys-design', weight: 0.9, type: 'reinforcement' },
      { id: 'e4', source: 'collab', target: 'code-review', weight: 0.6, type: 'reinforcement' },
      { id: 'e5', source: 'agile', target: 'collab', weight: 0.5, type: 'dependency' },
    ],
    createdAt: '2024-01-15',
    isTemplate: true,
  },
  {
    id: 'product-manager',
    jobTitle: 'Product Manager',
    department: 'Product',
    description: 'Product manager responsible for product strategy, roadmap, and cross-functional team coordination.',
    keywords: ['product', 'management', 'strategy', 'roadmap', 'stakeholder'],
    competencies: [
      { id: 'prod-strategy', name: 'Product Strategy', description: 'Developing product vision and roadmap', level: 4, category: 'domain', weight: 0.95, enabled: true },
      { id: 'stakeholder', name: 'Stakeholder Management', description: 'Managing expectations across teams', level: 4, category: 'leadership', weight: 0.85, enabled: true },
      { id: 'data-analysis', name: 'Data Analysis', description: 'Using data to inform decisions', level: 3, category: 'technical', weight: 0.7, enabled: true },
      { id: 'communication', name: 'Communication', description: 'Clear and effective communication', level: 5, category: 'behavioral', weight: 0.9, enabled: true },
      { id: 'prioritization', name: 'Prioritization', description: 'Prioritizing features and initiatives', level: 4, category: 'domain', weight: 0.8, enabled: true },
      { id: 'user-research', name: 'User Research', description: 'Understanding user needs and behaviors', level: 3, category: 'domain', weight: 0.75, enabled: true },
    ],
    edges: [
      { id: 'e1', source: 'user-research', target: 'prod-strategy', weight: 0.9, type: 'dependency' },
      { id: 'e2', source: 'data-analysis', target: 'prioritization', weight: 0.8, type: 'reinforcement' },
      { id: 'e3', source: 'communication', target: 'stakeholder', weight: 0.85, type: 'reinforcement' },
      { id: 'e4', source: 'prod-strategy', target: 'prioritization', weight: 0.7, type: 'dependency' },
      { id: 'e5', source: 'stakeholder', target: 'prioritization', weight: 0.6, type: 'reinforcement' },
    ],
    createdAt: '2024-01-20',
    isTemplate: true,
  },
  {
    id: 'hr-manager',
    jobTitle: 'HR Manager',
    department: 'Human Resources',
    description: 'HR manager overseeing recruitment, employee relations, and organizational development.',
    keywords: ['hr', 'human resources', 'recruitment', 'talent', 'employee'],
    competencies: [
      { id: 'talent-acq', name: 'Talent Acquisition', description: 'Recruiting and hiring top talent', level: 4, category: 'domain', weight: 0.9, enabled: true },
      { id: 'emp-relations', name: 'Employee Relations', description: 'Managing employee concerns and conflicts', level: 4, category: 'behavioral', weight: 0.85, enabled: true },
      { id: 'hr-compliance', name: 'HR Compliance', description: 'Understanding employment laws and regulations', level: 3, category: 'domain', weight: 0.8, enabled: true },
      { id: 'leadership', name: 'Leadership', description: 'Leading and developing HR team', level: 3, category: 'leadership', weight: 0.75, enabled: true },
      { id: 'perf-mgmt', name: 'Performance Management', description: 'Designing and implementing performance systems', level: 4, category: 'domain', weight: 0.8, enabled: true },
      { id: 'org-dev', name: 'Organizational Development', description: 'Driving organizational change and culture', level: 3, category: 'leadership', weight: 0.7, enabled: true },
    ],
    edges: [
      { id: 'e1', source: 'talent-acq', target: 'perf-mgmt', weight: 0.7, type: 'reinforcement' },
      { id: 'e2', source: 'emp-relations', target: 'perf-mgmt', weight: 0.8, type: 'dependency' },
      { id: 'e3', source: 'leadership', target: 'org-dev', weight: 0.85, type: 'dependency' },
      { id: 'e4', source: 'hr-compliance', target: 'emp-relations', weight: 0.6, type: 'dependency' },
      { id: 'e5', source: 'perf-mgmt', target: 'org-dev', weight: 0.75, type: 'reinforcement' },
    ],
    createdAt: '2024-02-01',
    isTemplate: true,
  },
  {
    id: 'data-scientist',
    jobTitle: 'Data Scientist',
    department: 'Analytics',
    description: 'Data scientist focused on machine learning, statistical analysis, and data-driven insights.',
    keywords: ['data', 'machine learning', 'analytics', 'statistics', 'AI', 'python'],
    competencies: [
      { id: 'ml', name: 'Machine Learning', description: 'Building and deploying ML models', level: 4, category: 'technical', weight: 0.95, enabled: true },
      { id: 'statistics', name: 'Statistical Analysis', description: 'Advanced statistical methods', level: 4, category: 'technical', weight: 0.9, enabled: true },
      { id: 'python', name: 'Python Programming', description: 'Proficiency in Python and data libraries', level: 4, category: 'technical', weight: 0.85, enabled: true },
      { id: 'data-viz', name: 'Data Visualization', description: 'Creating compelling data visualizations', level: 3, category: 'technical', weight: 0.7, enabled: true },
      { id: 'business-acumen', name: 'Business Acumen', description: 'Understanding business context', level: 3, category: 'domain', weight: 0.65, enabled: true },
      { id: 'storytelling', name: 'Data Storytelling', description: 'Communicating insights effectively', level: 3, category: 'behavioral', weight: 0.7, enabled: true },
    ],
    edges: [
      { id: 'e1', source: 'python', target: 'ml', weight: 0.9, type: 'dependency' },
      { id: 'e2', source: 'statistics', target: 'ml', weight: 0.85, type: 'dependency' },
      { id: 'e3', source: 'data-viz', target: 'storytelling', weight: 0.8, type: 'reinforcement' },
      { id: 'e4', source: 'business-acumen', target: 'storytelling', weight: 0.7, type: 'reinforcement' },
      { id: 'e5', source: 'ml', target: 'data-viz', weight: 0.5, type: 'reinforcement' },
    ],
    createdAt: '2024-02-10',
    isTemplate: true,
  },
  {
    id: 'sales-manager',
    jobTitle: 'Sales Manager',
    department: 'Sales',
    description: 'Sales manager leading a team to achieve revenue targets and customer acquisition goals.',
    keywords: ['sales', 'revenue', 'business development', 'customer', 'negotiation'],
    competencies: [
      { id: 'negotiation', name: 'Negotiation', description: 'Closing deals and managing objections', level: 5, category: 'behavioral', weight: 0.95, enabled: true },
      { id: 'pipeline-mgmt', name: 'Pipeline Management', description: 'Managing sales pipeline and forecasting', level: 4, category: 'domain', weight: 0.85, enabled: true },
      { id: 'customer-rel', name: 'Customer Relationships', description: 'Building long-term customer partnerships', level: 4, category: 'behavioral', weight: 0.9, enabled: true },
      { id: 'team-leadership', name: 'Team Leadership', description: 'Leading and motivating sales team', level: 4, category: 'leadership', weight: 0.8, enabled: true },
      { id: 'market-knowledge', name: 'Market Knowledge', description: 'Understanding market trends and competition', level: 3, category: 'domain', weight: 0.7, enabled: true },
      { id: 'crm', name: 'CRM Proficiency', description: 'Using CRM tools effectively', level: 3, category: 'technical', weight: 0.5, enabled: true },
    ],
    edges: [
      { id: 'e1', source: 'customer-rel', target: 'negotiation', weight: 0.85, type: 'reinforcement' },
      { id: 'e2', source: 'market-knowledge', target: 'pipeline-mgmt', weight: 0.7, type: 'reinforcement' },
      { id: 'e3', source: 'crm', target: 'pipeline-mgmt', weight: 0.8, type: 'dependency' },
      { id: 'e4', source: 'team-leadership', target: 'pipeline-mgmt', weight: 0.6, type: 'reinforcement' },
      { id: 'e5', source: 'negotiation', target: 'customer-rel', weight: 0.7, type: 'reinforcement' },
    ],
    createdAt: '2024-02-15',
    isTemplate: true,
  },
];

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'new-hire',
    name: 'New Hire Assessment',
    type: 'recruitment',
    description: 'Evaluate a candidate with minimal experience for entry-level position',
    adjustments: [],
  },
  {
    id: 'senior-hire',
    name: 'Senior Candidate',
    type: 'recruitment',
    description: 'Evaluate a senior candidate with extensive experience',
    adjustments: [],
  },
  {
    id: 'upskilling',
    name: 'Technical Upskilling',
    type: 'training',
    description: 'Simulate impact of focused technical training program',
    adjustments: [],
  },
  {
    id: 'leadership-dev',
    name: 'Leadership Development',
    type: 'training',
    description: 'Simulate impact of leadership development program',
    adjustments: [],
  },
  {
    id: 'promotion-ready',
    name: 'Promotion Readiness',
    type: 'promotion',
    description: 'Assess readiness for promotion to next level',
    adjustments: [],
  },
  {
    id: 'manager-track',
    name: 'Manager Track',
    type: 'promotion',
    description: 'Evaluate potential for management role transition',
    adjustments: [],
  },
];
