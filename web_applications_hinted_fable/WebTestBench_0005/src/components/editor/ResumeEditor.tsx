import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Resume, SectionType } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactForm } from './ContactForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { SummaryForm } from './SummaryForm';
import { TemplateSelector } from './TemplateSelector';
import { SectionManager } from './SectionManager';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Lightbulb,
  FileText,
  Layout,
  Settings2,
  Eye,
  EyeOff,
  Pencil
} from 'lucide-react';

interface ResumeEditorProps {
  resumeId: string;
  onBack: () => void;
}

export function ResumeEditor({ resumeId, onBack }: ResumeEditorProps) {
  const { resumes, updateResume, renameResume, updateTemplate, updateSections } = useResume();
  const [activeTab, setActiveTab] = useState<string>('contact');
  const [showPreview, setShowPreview] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const resume = resumes.find(r => r.id === resumeId);

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Resume not found</p>
      </div>
    );
  }

  const handleTitleEdit = () => {
    setTitleInput(resume.title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (titleInput.trim()) {
      renameResume(resume.id, titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  const tabItems = [
    { id: 'contact', label: 'Contact', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'template', label: 'Template', icon: Layout },
    { id: 'sections', label: 'Sections', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-semtag-id="editor.back"
                data-semtag-role="navigation"
                data-semtag-target="dashboard.screen"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              {isEditingTitle ? (
                <Input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                  className="h-9 max-w-[200px]"
                  autoFocus
                  data-semtag-id="editor.title.input"
                  data-semtag-role="input"
                  data-semtag-state="resume.title"
                />
              ) : (
                <button
                  onClick={handleTitleEdit}
                  className="flex items-center gap-2 group min-w-0"
                  data-semtag-id="editor.title"
                  data-semtag-role="action"
                  data-semtag-action="edit-title"
                  data-semtag-state="resume.title"
                >
                  <h1 className="font-semibold text-foreground truncate">{resume.title}</h1>
                  <Pencil className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="flex-shrink-0"
              data-semtag-id="editor.preview.toggle"
              data-semtag-role="toggle"
              data-semtag-state="editor.preview.visible"
              data-semtag-controls="editor.preview"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Show Preview</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex-1 flex flex-col border-r border-border ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border bg-card/30 overflow-x-auto">
              <TabsList
                className="h-auto p-1 bg-transparent w-full justify-start"
                data-semtag-id="editor.tabs"
                data-semtag-role="collection"
              >
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-secondary gap-2 px-3 py-2"
                    data-semtag-id={`editor.tabs.item.${tab.id}`}
                    data-semtag-role="navigation"
                    data-semtag-target={`editor.${tab.id}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-6 max-w-2xl">
                <TabsContent value="contact" className="mt-0" data-semtag-id="editor.contact" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <ContactForm
                    contact={resume.contact}
                    onChange={(contact) => updateResume(resume.id, { contact })}
                  />
                </TabsContent>

                <TabsContent value="summary" className="mt-0" data-semtag-id="editor.summary" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Professional Summary</h2>
                  <SummaryForm
                    summary={resume.summary}
                    onChange={(summary) => updateResume(resume.id, { summary })}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0" data-semtag-id="editor.experience" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
                  <ExperienceForm
                    experiences={resume.experience}
                    onChange={(experience) => updateResume(resume.id, { experience })}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0" data-semtag-id="editor.education" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Education</h2>
                  <EducationForm
                    education={resume.education}
                    onChange={(education) => updateResume(resume.id, { education })}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0" data-semtag-id="editor.skills" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Skills</h2>
                  <SkillsForm
                    skills={resume.skills}
                    onChange={(skills) => updateResume(resume.id, { skills })}
                  />
                </TabsContent>

                <TabsContent value="template" className="mt-0" data-semtag-id="editor.template" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Template Style</h2>
                  <TemplateSelector
                    selected={resume.template}
                    onSelect={(template) => updateTemplate(resume.id, template)}
                  />
                </TabsContent>

                <TabsContent value="sections" className="mt-0" data-semtag-id="editor.sections" data-semtag-role="region">
                  <h2 className="text-lg font-semibold mb-4">Section Order & Visibility</h2>
                  <SectionManager
                    sections={resume.sections}
                    onChange={(sections) => updateSections(resume.id, sections)}
                  />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div
            className="w-1/2 bg-muted/30 overflow-hidden flex flex-col"
            data-semtag-id="editor.preview"
            data-semtag-role="region"
          >
            <div className="p-3 border-b border-border bg-card/50">
              <h3 className="text-sm font-medium text-muted-foreground">Live Preview</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 min-h-full">
                <div className="transform scale-[0.7] origin-top">
                  <ResumePreview resume={resume} />
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
