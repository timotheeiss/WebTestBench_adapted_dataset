import { Resume } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  switch (resume.template) {
    case 'modern':
      return <ModernTemplate resume={resume} />;
    case 'classic':
      return <ClassicTemplate resume={resume} />;
    case 'minimal':
      return <MinimalTemplate resume={resume} />;
    default:
      return <ModernTemplate resume={resume} />;
  }
}
