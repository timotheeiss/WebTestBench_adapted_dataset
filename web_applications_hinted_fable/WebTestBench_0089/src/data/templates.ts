export type TemplateCategory = 
  | 'resume' 
  | 'weekly-report' 
  | 'meeting-minutes' 
  | 'proposal' 
  | 'email' 
  | 'other';

export type TemplateScenario = 
  | 'business' 
  | 'academic' 
  | 'personal' 
  | 'technical';

export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  type: 'text' | 'textarea' | 'date' | 'email';
}

export interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  category: TemplateCategory;
  scenario: TemplateScenario;
  content: string;
  fields: TemplateField[];
  popularity: number;
  createdAt: string;
  updatedAt: string;
  isMarkdown: boolean;
}

export const categoryLabels: Record<TemplateCategory, string> = {
  'resume': 'Resume',
  'weekly-report': 'Weekly Report',
  'meeting-minutes': 'Meeting Minutes',
  'proposal': 'Proposal',
  'email': 'Email',
  'other': 'Other',
};

export const scenarioLabels: Record<TemplateScenario, string> = {
  'business': 'Business',
  'academic': 'Academic',
  'personal': 'Personal',
  'technical': 'Technical',
};

export const defaultTemplates: Template[] = [
  {
    id: '1',
    title: 'Professional Resume',
    description: 'A clean, modern resume template perfect for job applications in any industry.',
    author: 'Sarah Chen',
    category: 'resume',
    scenario: 'business',
    content: `# {{name}}

**{{title}}** | {{email}} | {{phone}}

---

## Professional Summary
{{summary}}

## Experience
### {{company}} — {{position}}
*{{startDate}} - {{endDate}}*

{{responsibilities}}

## Education
**{{degree}}** — {{school}}, {{graduationYear}}

## Skills
{{skills}}`,
    fields: [
      { id: 'name', label: 'Full Name', placeholder: 'John Doe', required: true, type: 'text' },
      { id: 'title', label: 'Job Title', placeholder: 'Software Engineer', required: true, type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'john@example.com', required: true, type: 'email' },
      { id: 'phone', label: 'Phone', placeholder: '+1 234 567 8900', required: false, type: 'text' },
      { id: 'summary', label: 'Professional Summary', placeholder: 'Experienced professional with...', required: true, type: 'textarea' },
      { id: 'company', label: 'Company Name', placeholder: 'Tech Corp', required: true, type: 'text' },
      { id: 'position', label: 'Position', placeholder: 'Senior Developer', required: true, type: 'text' },
      { id: 'startDate', label: 'Start Date', placeholder: 'Jan 2020', required: true, type: 'text' },
      { id: 'endDate', label: 'End Date', placeholder: 'Present', required: false, type: 'text' },
      { id: 'responsibilities', label: 'Responsibilities', placeholder: 'Led team of 5 engineers...', required: true, type: 'textarea' },
      { id: 'degree', label: 'Degree', placeholder: 'B.S. Computer Science', required: true, type: 'text' },
      { id: 'school', label: 'School', placeholder: 'MIT', required: true, type: 'text' },
      { id: 'graduationYear', label: 'Graduation Year', placeholder: '2018', required: true, type: 'text' },
      { id: 'skills', label: 'Skills', placeholder: 'JavaScript, React, Node.js', required: true, type: 'textarea' },
    ],
    popularity: 1250,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01',
    isMarkdown: true,
  },
  {
    id: '2',
    title: 'Weekly Status Report',
    description: 'Keep your team informed with this comprehensive weekly report template.',
    author: 'Michael Torres',
    category: 'weekly-report',
    scenario: 'business',
    content: `# Weekly Status Report

**Reporter:** {{name}}
**Week of:** {{weekDate}}
**Department:** {{department}}

---

## Accomplishments This Week
{{accomplishments}}

## In Progress
{{inProgress}}

## Blockers & Challenges
{{blockers}}

## Goals for Next Week
{{nextWeekGoals}}

## Notes
{{notes}}`,
    fields: [
      { id: 'name', label: 'Your Name', placeholder: 'Jane Smith', required: true, type: 'text' },
      { id: 'weekDate', label: 'Week Of', placeholder: 'December 9, 2024', required: true, type: 'text' },
      { id: 'department', label: 'Department', placeholder: 'Engineering', required: true, type: 'text' },
      { id: 'accomplishments', label: 'Accomplishments', placeholder: '- Completed feature X\n- Fixed bug Y', required: true, type: 'textarea' },
      { id: 'inProgress', label: 'In Progress', placeholder: '- Working on feature Z\n- Reviewing PRs', required: true, type: 'textarea' },
      { id: 'blockers', label: 'Blockers', placeholder: 'Waiting for API documentation', required: false, type: 'textarea' },
      { id: 'nextWeekGoals', label: 'Next Week Goals', placeholder: '- Launch feature Z\n- Begin Q1 planning', required: true, type: 'textarea' },
      { id: 'notes', label: 'Additional Notes', placeholder: 'Any other updates...', required: false, type: 'textarea' },
    ],
    popularity: 890,
    createdAt: '2024-02-20',
    updatedAt: '2024-11-28',
    isMarkdown: true,
  },
  {
    id: '3',
    title: 'Meeting Minutes',
    description: 'Document your meetings efficiently with clear action items and decisions.',
    author: 'Emily Watson',
    category: 'meeting-minutes',
    scenario: 'business',
    content: `# Meeting Minutes

**Meeting Title:** {{meetingTitle}}
**Date:** {{date}}
**Time:** {{time}}
**Attendees:** {{attendees}}
**Facilitator:** {{facilitator}}

---

## Agenda
{{agenda}}

## Discussion Points
{{discussion}}

## Decisions Made
{{decisions}}

## Action Items
{{actionItems}}

## Next Meeting
**Date:** {{nextMeetingDate}}
**Topics:** {{nextTopics}}`,
    fields: [
      { id: 'meetingTitle', label: 'Meeting Title', placeholder: 'Q4 Planning Session', required: true, type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'December 10, 2024', required: true, type: 'text' },
      { id: 'time', label: 'Time', placeholder: '2:00 PM - 3:30 PM', required: true, type: 'text' },
      { id: 'attendees', label: 'Attendees', placeholder: 'John, Jane, Mike, Sarah', required: true, type: 'text' },
      { id: 'facilitator', label: 'Facilitator', placeholder: 'John Doe', required: true, type: 'text' },
      { id: 'agenda', label: 'Agenda', placeholder: '1. Review Q3 results\n2. Discuss Q4 goals', required: true, type: 'textarea' },
      { id: 'discussion', label: 'Discussion Points', placeholder: 'Key points discussed...', required: true, type: 'textarea' },
      { id: 'decisions', label: 'Decisions Made', placeholder: '- Approved budget for project X', required: true, type: 'textarea' },
      { id: 'actionItems', label: 'Action Items', placeholder: '- @John: Prepare proposal by Friday', required: true, type: 'textarea' },
      { id: 'nextMeetingDate', label: 'Next Meeting Date', placeholder: 'December 17, 2024', required: false, type: 'text' },
      { id: 'nextTopics', label: 'Next Meeting Topics', placeholder: 'Budget review, team updates', required: false, type: 'text' },
    ],
    popularity: 720,
    createdAt: '2024-03-10',
    updatedAt: '2024-11-15',
    isMarkdown: true,
  },
  {
    id: '4',
    title: 'Project Proposal',
    description: 'Present your project ideas professionally with this structured proposal template.',
    author: 'David Kim',
    category: 'proposal',
    scenario: 'business',
    content: `# Project Proposal: {{projectName}}

**Prepared by:** {{author}}
**Date:** {{date}}
**Version:** {{version}}

---

## Executive Summary
{{executiveSummary}}

## Problem Statement
{{problemStatement}}

## Proposed Solution
{{solution}}

## Timeline
{{timeline}}

## Budget
{{budget}}

## Expected Outcomes
{{outcomes}}

## Risks & Mitigation
{{risks}}

## Conclusion
{{conclusion}}`,
    fields: [
      { id: 'projectName', label: 'Project Name', placeholder: 'New CRM Implementation', required: true, type: 'text' },
      { id: 'author', label: 'Author', placeholder: 'Your Name', required: true, type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'December 2024', required: true, type: 'text' },
      { id: 'version', label: 'Version', placeholder: '1.0', required: false, type: 'text' },
      { id: 'executiveSummary', label: 'Executive Summary', placeholder: 'Brief overview of the proposal...', required: true, type: 'textarea' },
      { id: 'problemStatement', label: 'Problem Statement', placeholder: 'Describe the current challenge...', required: true, type: 'textarea' },
      { id: 'solution', label: 'Proposed Solution', placeholder: 'Our approach to solving this...', required: true, type: 'textarea' },
      { id: 'timeline', label: 'Timeline', placeholder: 'Phase 1: Jan-Feb\nPhase 2: Mar-Apr', required: true, type: 'textarea' },
      { id: 'budget', label: 'Budget', placeholder: 'Total: $50,000', required: true, type: 'textarea' },
      { id: 'outcomes', label: 'Expected Outcomes', placeholder: '- 30% efficiency improvement', required: true, type: 'textarea' },
      { id: 'risks', label: 'Risks & Mitigation', placeholder: 'Risk: Timeline delays\nMitigation: Buffer time', required: false, type: 'textarea' },
      { id: 'conclusion', label: 'Conclusion', placeholder: 'Final summary and call to action...', required: true, type: 'textarea' },
    ],
    popularity: 560,
    createdAt: '2024-04-05',
    updatedAt: '2024-10-20',
    isMarkdown: true,
  },
  {
    id: '5',
    title: 'Professional Email',
    description: 'Craft professional emails for business communications.',
    author: 'Lisa Park',
    category: 'email',
    scenario: 'business',
    content: `Subject: {{subject}}

Dear {{recipientName}},

{{opening}}

{{body}}

{{closing}}

Best regards,
{{senderName}}
{{senderTitle}}
{{senderContact}}`,
    fields: [
      { id: 'subject', label: 'Subject Line', placeholder: 'Follow-up: Project Discussion', required: true, type: 'text' },
      { id: 'recipientName', label: 'Recipient Name', placeholder: 'Mr. Johnson', required: true, type: 'text' },
      { id: 'opening', label: 'Opening', placeholder: 'I hope this email finds you well.', required: true, type: 'textarea' },
      { id: 'body', label: 'Email Body', placeholder: 'Main content of your email...', required: true, type: 'textarea' },
      { id: 'closing', label: 'Closing', placeholder: 'Thank you for your time and consideration.', required: true, type: 'textarea' },
      { id: 'senderName', label: 'Your Name', placeholder: 'Jane Smith', required: true, type: 'text' },
      { id: 'senderTitle', label: 'Your Title', placeholder: 'Senior Manager', required: false, type: 'text' },
      { id: 'senderContact', label: 'Contact Info', placeholder: 'jane@company.com | +1 234 567 8900', required: false, type: 'text' },
    ],
    popularity: 1100,
    createdAt: '2024-01-08',
    updatedAt: '2024-12-05',
    isMarkdown: false,
  },
  {
    id: '6',
    title: 'Academic Research Summary',
    description: 'Summarize your research findings in a structured academic format.',
    author: 'Dr. James Wilson',
    category: 'other',
    scenario: 'academic',
    content: `# Research Summary: {{title}}

**Researcher:** {{researcher}}
**Institution:** {{institution}}
**Date:** {{date}}

---

## Abstract
{{abstract}}

## Introduction
{{introduction}}

## Methodology
{{methodology}}

## Key Findings
{{findings}}

## Discussion
{{discussion}}

## Conclusion
{{conclusion}}

## References
{{references}}`,
    fields: [
      { id: 'title', label: 'Research Title', placeholder: 'Impact of AI on Education', required: true, type: 'text' },
      { id: 'researcher', label: 'Researcher Name', placeholder: 'Dr. Jane Doe', required: true, type: 'text' },
      { id: 'institution', label: 'Institution', placeholder: 'Stanford University', required: true, type: 'text' },
      { id: 'date', label: 'Date', placeholder: 'December 2024', required: true, type: 'text' },
      { id: 'abstract', label: 'Abstract', placeholder: 'Brief summary of your research...', required: true, type: 'textarea' },
      { id: 'introduction', label: 'Introduction', placeholder: 'Background and research questions...', required: true, type: 'textarea' },
      { id: 'methodology', label: 'Methodology', placeholder: 'Research methods used...', required: true, type: 'textarea' },
      { id: 'findings', label: 'Key Findings', placeholder: '1. Finding one\n2. Finding two', required: true, type: 'textarea' },
      { id: 'discussion', label: 'Discussion', placeholder: 'Analysis of findings...', required: true, type: 'textarea' },
      { id: 'conclusion', label: 'Conclusion', placeholder: 'Summary and implications...', required: true, type: 'textarea' },
      { id: 'references', label: 'References', placeholder: '1. Author (Year). Title.', required: false, type: 'textarea' },
    ],
    popularity: 340,
    createdAt: '2024-05-12',
    updatedAt: '2024-09-30',
    isMarkdown: true,
  },
];
