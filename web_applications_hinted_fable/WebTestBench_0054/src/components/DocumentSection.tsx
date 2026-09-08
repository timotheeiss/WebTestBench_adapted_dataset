import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentSection as SectionType, getDocumentById } from '@/data/documents';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

interface DocumentSectionProps {
  section: SectionType;
  docId: string;
}

export function DocumentSection({ section, docId }: DocumentSectionProps) {
  const { isSectionExpanded, toggleSection, setSelectedDocumentId, showToast, expandSection } = useAppStore();
  const isExpanded = isSectionExpanded(docId, section.id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [section.content]);

  const handleLinkClick = (targetDocId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isExpanded) {
      showToast('Please expand the section to access links', 'warning');
      return;
    }

    const targetDoc = getDocumentById(targetDocId);
    if (!targetDoc) {
      showToast('Document not found. The link may be invalid.', 'error');
      return;
    }

    setSelectedDocumentId(targetDocId);
    // Expand first section of target document
    if (targetDoc.sections.length > 0) {
      expandSection(targetDocId, targetDoc.sections[0].id);
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card/50">
      <button
        data-semtag-id={`doc.sections.item.${section.id}`}
        data-semtag-role="toggle"
        data-semtag-action="toggle-section"
        data-semtag-state={isExpanded ? 'open' : 'closed'}
        onClick={() => toggleSection(docId, section.id)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
      >
        <h3 className="font-medium text-foreground">{section.title}</h3>
        <ChevronDown
          size={18}
          className={cn(
            'text-muted-foreground transition-transform duration-300',
            isExpanded && 'rotate-180'
          )}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div ref={contentRef} className="px-4 pb-4">
              <p
                data-semtag-id={`doc.sections.item.${section.id}.content`}
                data-semtag-role="observable"
                data-semtag-state="section.content"
                className="text-sm text-muted-foreground leading-relaxed mb-4"
              >
                {section.content}
              </p>
              
              {section.links && section.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {section.links.map((link) => (
                    <button
                      key={link.docId}
                      data-semtag-id={`doc.sections.item.${section.id}.link.${link.docId}`}
                      data-semtag-role="navigation"
                      data-semtag-target="document.detail"
                      onClick={(e) => handleLinkClick(link.docId, e)}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <LinkIcon size={12} />
                      {link.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && section.links && section.links.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {section.links.map((link) => (
            <button
              key={link.docId}
              data-semtag-id={`doc.sections.item.${section.id}.link.${link.docId}`}
              data-semtag-role="navigation"
              data-semtag-target="document.detail"
              data-semtag-state="disabled"
              onClick={(e) => handleLinkClick(link.docId, e)}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
              title="Expand section to access link"
            >
              <LinkIcon size={12} />
              {link.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
