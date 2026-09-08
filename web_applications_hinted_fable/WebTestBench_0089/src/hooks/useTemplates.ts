import { useState, useEffect, useMemo } from 'react';
import { Template, defaultTemplates, TemplateCategory, TemplateScenario } from '@/data/templates';

const STORAGE_KEY = 'template-library';
const FAVORITES_KEY = 'template-favorites';

export type SortOption = 'popularity' | 'newest' | 'oldest' | 'alphabetical';

interface UseTemplatesReturn {
  templates: Template[];
  filteredTemplates: Template[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: TemplateCategory | 'all';
  selectedScenario: TemplateScenario | 'all';
  sortBy: SortOption;
  suggestions: string[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: TemplateCategory | 'all') => void;
  setSelectedScenario: (scenario: TemplateScenario | 'all') => void;
  setSortBy: (sort: SortOption) => void;
  toggleFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
  addTemplate: (template: Omit<Template, 'id' | 'popularity' | 'createdAt' | 'updatedAt'>) => void;
  getTemplateById: (id: string) => Template | undefined;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}

export function useTemplates(): UseTemplatesReturn {
  const [templates, setTemplates] = useState<Template[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultTemplates;
      }
    }
    return defaultTemplates;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedScenario, setSelectedScenario] = useState<TemplateScenario | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const matches = new Set<string>();
    
    templates.forEach(template => {
      if (template.title.toLowerCase().includes(query)) {
        matches.add(template.title);
      }
      template.fields.forEach(field => {
        if (field.label.toLowerCase().includes(query)) {
          matches.add(field.label);
        }
      });
    });
    
    return Array.from(matches).slice(0, 5);
  }, [searchQuery, templates]);

  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Filter by favorites
    if (showFavoritesOnly) {
      result = result.filter(t => favorites.includes(t.id));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Filter by scenario
    if (selectedScenario !== 'all') {
      result = result.filter(t => t.scenario === selectedScenario);
    }

    // Filter by search query (fuzzy match)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.author.toLowerCase().includes(query) ||
        t.fields.some(f => f.label.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [templates, searchQuery, selectedCategory, selectedScenario, sortBy, showFavoritesOnly, favorites]);

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const isFavorite = (templateId: string) => favorites.includes(templateId);

  const addTemplate = (template: Omit<Template, 'id' | 'popularity' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      popularity: 0,
      createdAt: now,
      updatedAt: now,
    };
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const getTemplateById = (id: string) => templates.find(t => t.id === id);

  return {
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
  };
}
