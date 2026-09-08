import { TechDocument, getDocumentById } from '@/data/documents';
import { ModuleBadge } from './ModuleBadge';
import { FavoriteButton } from './FavoriteButton';
import { DocumentSection } from './DocumentSection';
import { useAppStore } from '@/store/appStore';
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentViewerProps {
  document: TechDocument;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const { setSelectedDocumentId, expandSection, showToast } = useAppStore();

  const handleRelatedDocClick = (docId: string) => {
    const targetDoc = getDocumentById(docId);
    if (!targetDoc) {
      showToast('Related document not found', 'error');
      return;
    }
    setSelectedDocumentId(docId);
    if (targetDoc.sections.length > 0) {
      expandSection(docId, targetDoc.sections[0].id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-auto"
    >
      <div className="p-6">
        {/* Back button */}
        <button
          data-semtag-id="doc.back"
          data-semtag-role="navigation"
          data-semtag-target="documents.list"
          onClick={() => setSelectedDocumentId(null)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to documents
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <ModuleBadge module={document.module} />
              <FavoriteButton
                docId={document.id}
                data-semtag-id="doc.favorite"
                data-semtag-role="toggle"
                data-semtag-action="toggle-favorite"
              />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span
                data-semtag-id="doc.updated"
                data-semtag-role="observable"
                data-semtag-state="document.last-updated"
                className="flex items-center gap-1.5"
              >
                <Calendar size={12} />
                {document.lastUpdated}
              </span>
              <span
                data-semtag-id="doc.version"
                data-semtag-role="observable"
                data-semtag-state="document.version"
                className="flex items-center gap-1.5"
              >
                <Tag size={12} />
                v{document.version}
              </span>
            </div>
          </div>
          
          <h1
            data-semtag-id="doc.title"
            data-semtag-role="observable"
            data-semtag-state="document.title"
            className="text-2xl font-bold text-foreground mb-3"
          >
            {document.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {document.description}
          </p>
        </div>

        {/* Sections */}
        <div data-semtag-id="doc.sections" data-semtag-role="collection" className="space-y-4 mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Content Sections
          </h2>
          {document.sections.map((section) => (
            <DocumentSection
              key={section.id}
              section={section}
              docId={document.id}
            />
          ))}
        </div>

        {/* Related Documents */}
        {document.relatedDocs.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Related Documents
            </h2>
            <div data-semtag-id="doc.related" data-semtag-role="collection" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {document.relatedDocs.map((docId) => {
                const relatedDoc = getDocumentById(docId);
                if (!relatedDoc) return null;
                
                return (
                  <button
                    key={docId}
                    data-semtag-id={`doc.related.item.${docId}`}
                    data-semtag-role="navigation"
                    data-semtag-target="document.detail"
                    onClick={() => handleRelatedDocClick(docId)}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <ModuleBadge module={relatedDoc.module} />
                      </div>
                      <span className="text-sm font-medium text-foreground truncate block">
                        {relatedDoc.title}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
