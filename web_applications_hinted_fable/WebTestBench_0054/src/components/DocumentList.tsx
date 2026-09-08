import { useMemo } from 'react';
import { documents, TechDocument, ModuleType, getDocumentById } from '@/data/documents';
import { useAppStore } from '@/store/appStore';
import { ModuleBadge } from './ModuleBadge';
import { FavoriteButton } from './FavoriteButton';
import { EmptyState } from './EmptyState';
import { Search, Calendar, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentListProps {
  showFavoritesOnly?: boolean;
}

export function DocumentList({ showFavoritesOnly = false }: DocumentListProps) {
  const {
    selectedDocumentId,
    setSelectedDocumentId,
    selectedModule,
    setSelectedModule,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    favorites,
    expandSection
  } = useAppStore();

  const modules: (ModuleType | null)[] = [null, 'api', 'auth', 'data', 'ui', 'core'];

  // Semantic-hint id namespace: the same list component serves the Documents
  // and Favorites views, so scope every id by view to keep ids unique page-wide.
  const ns = showFavoritesOnly ? 'favorites' : 'library';

  const filteredAndSortedDocs = useMemo(() => {
    let filtered = showFavoritesOnly
      ? documents.filter(doc => favorites.includes(doc.id))
      : documents;

    // Apply module filter
    if (selectedModule) {
      filtered = filtered.filter(doc => doc.module === selectedModule);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.sections.some(s => 
          s.title.toLowerCase().includes(query) ||
          s.content.toLowerCase().includes(query)
        )
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'module':
          return a.module.localeCompare(b.module);
        default:
          return 0;
      }
    });
  }, [documents, showFavoritesOnly, favorites, selectedModule, searchQuery, sortBy]);

  const handleDocumentClick = (doc: TechDocument) => {
    setSelectedDocumentId(doc.id);
    // Expand first section by default
    if (doc.sections.length > 0) {
      expandSection(doc.id, doc.sections[0].id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters */}
      <div
        data-semtag-id={`${ns}.filters`}
        data-semtag-role="region"
        className="p-4 border-b border-border space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-semtag-id={`${ns}.search`}
            data-semtag-role="input"
            data-semtag-state="search.query"
            data-semtag-controls={`${ns}.list`}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Module Tabs */}
        {!showFavoritesOnly && (
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <button
                key={module ?? 'all'}
                data-semtag-id={`library.filter.module.${module ?? 'all'}`}
                data-semtag-role="toggle"
                data-semtag-action="filter-by-module"
                data-semtag-controls="library.list"
                data-semtag-state={selectedModule === module ? 'selected' : undefined}
                onClick={() => setSelectedModule(module)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedModule === module
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {module ? module.toUpperCase() : 'All'}
              </button>
            ))}
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'date' | 'module')}
            data-semtag-id={`${ns}.sort`}
            data-semtag-role="select"
            data-semtag-action="sort-documents"
            data-semtag-state="sort.by"
            data-semtag-controls={`${ns}.list`}
            data-semtag-options="title|Title;date|Last Updated;module|Module"
            className="bg-input border border-border rounded-md px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="title">Title</option>
            <option value="date">Last Updated</option>
            <option value="module">Module</option>
          </select>
        </div>
      </div>

      {/* Document List */}
      <div
        data-semtag-id={`${ns}.list`}
        data-semtag-role="collection"
        className="flex-1 overflow-auto p-4"
      >
        {filteredAndSortedDocs.length === 0 ? (
          <EmptyState
            data-semtag-id={`${ns}.list.empty`}
            data-semtag-role="observable"
            data-semtag-state="list.empty-message"
            title={showFavoritesOnly ? 'No favorites yet' : 'No documents found'}
            description={
              showFavoritesOnly
                ? 'Star documents to add them to your favorites'
                : 'Try adjusting your search or filter criteria'
            }
          />
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {filteredAndSortedDocs.map((doc, index) => (
                <motion.button
                  key={doc.id}
                  data-semtag-id={`${ns}.list.item.${doc.id}`}
                  data-semtag-role="navigation"
                  data-semtag-target="document.detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => handleDocumentClick(doc)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedDocumentId === doc.id
                      ? 'border-primary bg-primary/5 shadow-glow'
                      : 'border-border bg-card/50 hover:border-primary/30 hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <ModuleBadge module={doc.module} />
                    <FavoriteButton
                      docId={doc.id}
                      data-semtag-id={`${ns}.list.item.${doc.id}.favorite`}
                      data-semtag-role="toggle"
                      data-semtag-action="toggle-favorite"
                    />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{doc.lastUpdated}</span>
                    <span className="text-border">•</span>
                    <span>v{doc.version}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
