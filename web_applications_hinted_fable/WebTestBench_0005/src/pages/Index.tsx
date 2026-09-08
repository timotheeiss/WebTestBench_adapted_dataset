import { useState } from 'react';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ResumeEditor } from '@/components/editor/ResumeEditor';

function ResumeApp() {
  const { setActiveResumeId, activeResumeId } = useResume();
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);

  const handleEditResume = (id: string) => {
    setEditingResumeId(id);
    setActiveResumeId(id);
    setView('editor');
  };

  const handleBack = () => {
    setView('dashboard');
    setEditingResumeId(null);
    setActiveResumeId(null);
  };

  if (view === 'editor' && editingResumeId) {
    return <ResumeEditor resumeId={editingResumeId} onBack={handleBack} />;
  }

  return <Dashboard onEditResume={handleEditResume} />;
}

const Index = () => {
  return (
    <ResumeProvider>
      <ResumeApp />
    </ResumeProvider>
  );
};

export default Index;
