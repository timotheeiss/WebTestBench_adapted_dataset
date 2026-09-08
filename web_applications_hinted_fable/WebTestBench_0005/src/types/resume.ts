export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export type SectionType = 'contact' | 'experience' | 'education' | 'skills' | 'summary';

export interface ResumeSection {
  id: SectionType;
  title: string;
  visible: boolean;
  order: number;
}

export type TemplateStyle = 'modern' | 'classic' | 'minimal';

export interface Resume {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  template: TemplateStyle;
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  sections: ResumeSection[];
}
