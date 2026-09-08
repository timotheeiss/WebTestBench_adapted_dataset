import { useState } from 'react';
import { FileText, GitBranch, Star, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentList } from '@/components/DocumentList';
import { DocumentViewer } from '@/components/DocumentViewer';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { Toast } from '@/components/Toast';
import { useAppStore } from '@/store/appStore';
import { getDocumentById } from '@/data/documents';

type Tab = 'documents' | 'graph' | 'favorites';

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('documents');
  const { selectedDocumentId, getFavoriteCount } = useAppStore();

  const selectedDocument = selectedDocumentId ? getDocumentById(selectedDocumentId) : null;

  const tabs = [
    { id: 'documents' as Tab, label: 'Documents', icon: FileText, semtagId: 'nav.documents', semtagTarget: 'documents.view' },
    { id: 'graph' as Tab, label: 'Knowledge Graph', icon: GitBranch, semtagId: 'nav.graph', semtagTarget: 'graph.view' },
    { id: 'favorites' as Tab, label: 'Favorites', icon: Star, count: getFavoriteCount(), semtagId: 'nav.favorites', semtagTarget: 'favorites.view' }
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Book size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TechSpecs KB</h1>
                <p className="text-xs text-muted-foreground">Technical Specifications Knowledge Base</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  data-semtag-id={tab.semtagId}
                  data-semtag-role="navigation"
                  data-semtag-target={tab.semtagTarget}
                  data-semtag-state={activeTab === tab.id ? 'active' : undefined}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      data-semtag-id="nav.favorites.count"
                      data-semtag-role="observable"
                      data-semtag-state="favorites.count"
                      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div className="h-full flex">
                {/* Sidebar - Document List */}
                <div className="w-96 border-r border-border flex-shrink-0 bg-sidebar">
                  <DocumentList />
                </div>

                {/* Main - Document Viewer */}
                <div className="flex-1 overflow-hidden">
                  {selectedDocument ? (
                    <DocumentViewer document={selectedDocument} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <FileText size={64} className="mx-auto mb-4 text-muted-foreground/30" />
                        <h2 className="text-lg font-medium text-foreground mb-2">
                          Select a Document
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Choose a document from the sidebar to view its contents, sections, and related documents.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'graph' && (
            <motion.div
              key="graph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <KnowledgeGraph />
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div className="h-full flex">
                {/* Sidebar - Favorites List */}
                <div className="w-96 border-r border-border flex-shrink-0 bg-sidebar">
                  <DocumentList showFavoritesOnly />
                </div>

                {/* Main - Document Viewer */}
                <div className="flex-1 overflow-hidden">
                  {selectedDocument ? (
                    <DocumentViewer document={selectedDocument} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Star size={64} className="mx-auto mb-4 text-muted-foreground/30" />
                        <h2 className="text-lg font-medium text-foreground mb-2">
                          View Your Favorites
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Select a favorited document from the sidebar to view its details.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Toast */}
      <Toast />
    </div>
  );
}
