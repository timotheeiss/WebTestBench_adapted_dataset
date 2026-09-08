import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, BookOpen, BarChart3 } from 'lucide-react';
import JobSearch from '@/components/competency/JobSearch';
import ModelDetailView from '@/components/competency/ModelDetailView';
import { CompetencyModel } from '@/data/competencyModels';

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<CompetencyModel | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl">CompetencyHub</h1>
                <p className="text-xs text-muted-foreground">Job Competency Modeling System</p>
              </div>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <a
                href="#"
                data-semtag-id="nav.models"
                data-semtag-role="navigation"
                data-semtag-target="models.page"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSelectedModel(null)}
              >
                <BookOpen className="w-4 h-4" />
                Models
              </a>
              <a
                href="#"
                data-semtag-id="nav.analytics"
                data-semtag-role="navigation"
                data-semtag-target="analytics.page"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedModel ? (
            <ModelDetailView
              key={selectedModel.id}
              model={selectedModel}
              onBack={() => setSelectedModel(null)}
            />
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                    <span className="gradient-text">Competency Modeling</span>
                    <br />
                    Made Simple
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Search, visualize, and simulate job competency models. Build and customize
                    frameworks for recruitment, training, and promotion decisions.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
                  data-semtag-id="home.stats"
                  data-semtag-role="collection"
                >
                  {[
                    { label: 'Job Models', value: '5+' },
                    { label: 'Competencies', value: '30+' },
                    { label: 'Templates', value: '5' },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      data-semtag-id={`home.stats.item.${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                      data-semtag-role="observable"
                      data-semtag-state={`stats.${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-center p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="text-2xl font-bold font-display text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </section>

              {/* Search Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold font-display">Browse Job Models</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select a job to view and customize its competency model
                    </p>
                  </div>
                </div>
                <JobSearch onSelectJob={setSelectedModel} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 CompetencyHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
