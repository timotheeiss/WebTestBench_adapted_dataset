import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Resume, TemplateStyle, ResumeSection } from '@/types/resume';
import { defaultResumes, createEmptyResume } from '@/data/defaultResumes';

interface ResumeContextType {
  resumes: Resume[];
  activeResumeId: string | null;
  activeResume: Resume | null;
  setActiveResumeId: (id: string | null) => void;
  createResume: () => Resume;
  updateResume: (id: string, updates: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => Resume;
  renameResume: (id: string, title: string) => void;
  updateTemplate: (id: string, template: TemplateStyle) => void;
  updateSections: (id: string, sections: ResumeSection[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>(defaultResumes);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const activeResume = resumes.find(r => r.id === activeResumeId) || null;

  const createResume = useCallback(() => {
    const newResume = createEmptyResume();
    setResumes(prev => [newResume, ...prev]);
    return newResume;
  }, []);

  const updateResume = useCallback((id: string, updates: Partial<Resume>) => {
    setResumes(prev => prev.map(resume => 
      resume.id === id 
        ? { ...resume, ...updates, updatedAt: new Date() }
        : resume
    ));
  }, []);

  const deleteResume = useCallback((id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
    if (activeResumeId === id) {
      setActiveResumeId(null);
    }
  }, [activeResumeId]);

  const duplicateResume = useCallback((id: string) => {
    const resumeToDuplicate = resumes.find(r => r.id === id);
    if (!resumeToDuplicate) {
      throw new Error('Resume not found');
    }

    const newResume: Resume = {
      ...resumeToDuplicate,
      id: Math.random().toString(36).substring(2, 15),
      title: `${resumeToDuplicate.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setResumes(prev => [newResume, ...prev]);
    return newResume;
  }, [resumes]);

  const renameResume = useCallback((id: string, title: string) => {
    updateResume(id, { title });
  }, [updateResume]);

  const updateTemplate = useCallback((id: string, template: TemplateStyle) => {
    updateResume(id, { template });
  }, [updateResume]);

  const updateSections = useCallback((id: string, sections: ResumeSection[]) => {
    updateResume(id, { sections });
  }, [updateResume]);

  return (
    <ResumeContext.Provider value={{
      resumes,
      activeResumeId,
      activeResume,
      setActiveResumeId,
      createResume,
      updateResume,
      deleteResume,
      duplicateResume,
      renameResume,
      updateTemplate,
      updateSections,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
