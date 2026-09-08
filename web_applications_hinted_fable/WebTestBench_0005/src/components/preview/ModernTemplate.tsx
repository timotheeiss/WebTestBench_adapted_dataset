import { Resume, ResumeSection } from '@/types/resume';
import { format } from 'date-fns';

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  const sortedSections = [...resume.sections]
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), 'MMM yyyy');
  };

  const getSectionTitle = (id: string) => {
    const section = resume.sections.find(s => s.id === id);
    return section?.title || id;
  };

  const renderSection = (section: ResumeSection) => {
    switch (section.id) {
      case 'contact':
        return (
          <header className="bg-slate-800 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold mb-2" data-semtag-id="preview.contact.name" data-semtag-role="observable" data-semtag-state="contact.full-name">{resume.contact.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
              {resume.contact.email && <span data-semtag-id="preview.contact.email" data-semtag-role="observable" data-semtag-state="contact.email">{resume.contact.email}</span>}
              {resume.contact.phone && <span data-semtag-id="preview.contact.phone" data-semtag-role="observable" data-semtag-state="contact.phone">{resume.contact.phone}</span>}
              {resume.contact.location && <span data-semtag-id="preview.contact.location" data-semtag-role="observable" data-semtag-state="contact.location">{resume.contact.location}</span>}
              {resume.contact.linkedin && <span data-semtag-id="preview.contact.linkedin" data-semtag-role="observable" data-semtag-state="contact.linkedin">{resume.contact.linkedin}</span>}
              {resume.contact.website && <span data-semtag-id="preview.contact.website" data-semtag-role="observable" data-semtag-state="contact.website">{resume.contact.website}</span>}
            </div>
          </header>
        );

      case 'summary':
        if (!resume.summary) return null;
        return (
          <section className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2" data-semtag-id="preview.summary.heading" data-semtag-role="observable" data-semtag-state="section.summary.title">
              <span className="w-1 h-5 bg-orange-500 rounded" />
              {getSectionTitle('summary')}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed" data-semtag-id="preview.summary.text" data-semtag-role="observable" data-semtag-state="summary.text">{resume.summary}</p>
          </section>
        );

      case 'experience':
        if (resume.experience.length === 0) return null;
        return (
          <section className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2" data-semtag-id="preview.experience.heading" data-semtag-role="observable" data-semtag-state="section.experience.title">
              <span className="w-1 h-5 bg-orange-500 rounded" />
              {getSectionTitle('experience')}
            </h2>
            <div className="space-y-4" data-semtag-id="preview.experience.list" data-semtag-role="collection">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-slate-800" data-semtag-id={`preview.experience.item.${exp.id}`} data-semtag-role="observable" data-semtag-state="experience.position">{exp.position}</h3>
                      <p className="text-sm text-orange-600" data-semtag-id={`preview.experience.item.${exp.id}.company`} data-semtag-role="observable" data-semtag-state="experience.company">{exp.company}</p>
                    </div>
                    <span className="text-xs text-slate-500" data-semtag-id={`preview.experience.item.${exp.id}.dates`} data-semtag-role="observable" data-semtag-state="experience.dates">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2" data-semtag-id={`preview.experience.item.${exp.id}.description`} data-semtag-role="observable" data-semtag-state="experience.description">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (resume.education.length === 0) return null;
        return (
          <section className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2" data-semtag-id="preview.education.heading" data-semtag-role="observable" data-semtag-state="section.education.title">
              <span className="w-1 h-5 bg-orange-500 rounded" />
              {getSectionTitle('education')}
            </h2>
            <div className="space-y-3" data-semtag-id="preview.education.list" data-semtag-role="collection">
              {resume.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800" data-semtag-id={`preview.education.item.${edu.id}`} data-semtag-role="observable" data-semtag-state="education.institution">{edu.institution}</h3>
                    <p className="text-sm text-slate-600" data-semtag-id={`preview.education.item.${edu.id}.degree`} data-semtag-role="observable" data-semtag-state="education.degree">
                      {edu.degree} in {edu.field}
                      {edu.gpa && <span className="text-slate-400"> • GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500" data-semtag-id={`preview.education.item.${edu.id}.dates`} data-semtag-role="observable" data-semtag-state="education.dates">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (resume.skills.length === 0) return null;
        return (
          <section className="p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2" data-semtag-id="preview.skills.heading" data-semtag-role="observable" data-semtag-state="section.skills.title">
              <span className="w-1 h-5 bg-orange-500 rounded" />
              {getSectionTitle('skills')}
            </h2>
            <div className="flex flex-wrap gap-2" data-semtag-id="preview.skills.list" data-semtag-role="collection">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full"
                  data-semtag-id={`preview.skills.item.${skill.id}`}
                  data-semtag-role="observable"
                  data-semtag-state="skill.name"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="resume-preview max-w-[21cm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      data-semtag-id="preview.document"
      data-semtag-role="region"
    >
      {sortedSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
