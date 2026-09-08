import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export function SearchBar({ value, onChange, suggestions, onSelectSuggestion }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-primary/20' : ''} rounded-lg`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search templates by name, author, or field..."
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 h-12 bg-card border-border shadow-card"
          data-semtag-id="search.query"
          data-semtag-role="input"
          data-semtag-state="search.query"
          data-semtag-controls="templates.grid"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            data-semtag-id="search.clear"
            data-semtag-role="action"
            data-semtag-action="clear-search"
            data-semtag-state="search.query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-hover overflow-hidden z-50"
            data-semtag-id="search.suggestions"
            data-semtag-role="collection"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-2 text-sm"
                data-semtag-id={`search.suggestions.item.${suggestion.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                data-semtag-role="action"
                data-semtag-action="apply-suggestion"
                data-semtag-state="search.query"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                <span>{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
