import { useState } from 'react';
import { useTemplates } from '@/hooks/useTemplates';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplatePreview } from '@/components/TemplatePreview';
import { SubmitTemplateModal } from '@/components/SubmitTemplateModal';
import { EmptyState } from '@/components/EmptyState';
import { Template } from '@/data/templates';
import { motion } from 'framer-motion';

const Index = () => {
  const {
    templates,
    filteredTemplates,
    favorites,
    searchQuery,
    selectedCategory,
    selectedScenario,
    sortBy,
    suggestions,
    setSearchQuery,
    setSelectedCategory,
    setSelectedScenario,
    setSortBy,
    toggleFavorite,
    isFavorite,
    addTemplate,
    getTemplateById,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = useTemplates();

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedScenario('all');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen gradient-soft">
      <Header
        onSubmitTemplate={() => setIsSubmitOpen(true)}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favorites.length}
      />

      {/* Hero Search Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 px-4 border-b border-border bg-card/50"
      >
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Find the Perfect Template
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse our curated collection of professional templates for every need
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={suggestions}
              onSelectSuggestion={setSearchQuery}
            />
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedScenario={selectedScenario}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onScenarioChange={setSelectedScenario}
            onSortChange={setSortBy}
            totalCount={templates.length}
            filteredCount={filteredTemplates.length}
          />

          <div className="flex-1">
            {filteredTemplates.length === 0 ? (
              showFavoritesOnly ? (
                <EmptyState
                  type="no-favorites"
                  onBrowseAll={() => setShowFavoritesOnly(false)}
                />
              ) : (
                <EmptyState
                  type="no-results"
                  onClearFilters={clearFilters}
                />
              )
            ) : (
              <div
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                data-semtag-id="templates.grid"
                data-semtag-role="collection"
              >
                {filteredTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isFavorite={isFavorite(template.id)}
                    onToggleFavorite={() => toggleFavorite(template.id)}
                    onSelect={() => handleSelectTemplate(template)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Template Preview */}
      <TemplatePreview
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        isFavorite={selectedTemplate ? isFavorite(selectedTemplate.id) : false}
        onToggleFavorite={() => selectedTemplate && toggleFavorite(selectedTemplate.id)}
      />

      {/* Submit Template Modal */}
      <SubmitTemplateModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={addTemplate}
      />
    </div>
  );
};

export default Index;
