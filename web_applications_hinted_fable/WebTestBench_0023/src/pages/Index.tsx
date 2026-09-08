import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Recycle, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { SortDropdown, SortOption } from '@/components/SortDropdown';
import { Button } from '@/components/ui/button';
import { Category, Condition } from '@/types';
import { categories } from '@/data/mockData';

const Index = () => {
  const { products, isAuthenticated } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [upcycledOnly, setUpcycledOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.isAvailable);

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Conditions
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(p => selectedConditions.includes(p.condition));
    }

    // Price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Distance
    if (maxDistance < 50) {
      filtered = filtered.filter(p => (p.distance || 0) <= maxDistance);
    }

    // Upcycled
    if (upcycledOnly) {
      filtered = filtered.filter(p => p.isUpcycled);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'distance':
        filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, selectedConditions, priceRange, maxDistance, upcycledOnly, sortBy]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setPriceRange([0, 500]);
    setMaxDistance(50);
    setUpcycledOnly(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-sage/20 to-background py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Recycle className="h-4 w-4" />
              <span>Sustainable shopping made simple</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Give Items a{' '}
              <span className="text-primary">Second Life</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover unique second-hand treasures and upcycled creations. 
              Buy and sell sustainably in your local community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated && (
                <Button variant="hero" size="xl" asChild>
                  <Link
                    to="/register"
                    data-semtag-id="home.hero.start-selling"
                    data-semtag-role="navigation"
                    data-semtag-target="register.page"
                  >
                    Start Selling
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="xl" asChild>
                <Link
                  to="#browse"
                  data-semtag-id="home.hero.browse"
                  data-semtag-role="navigation"
                  data-semtag-target="home.browse"
                >
                  Browse Items
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sage/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-terracotta-light/20 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-b border-border py-8 bg-card/50">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary mb-1">2.5K+</div>
              <p className="text-sm text-muted-foreground">Items Listed</p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary mb-1">890</div>
              <p className="text-sm text-muted-foreground">Active Sellers</p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary mb-1">15K+</div>
              <p className="text-sm text-muted-foreground">Items Saved from Landfill</p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary mb-1">45</div>
              <p className="text-sm text-muted-foreground">Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-12 border-b border-border">
        <div className="container px-4">
          <h2 className="font-display text-2xl font-semibold text-center mb-8">Shop by Category</h2>
          <div
            data-semtag-id="home.categories"
            data-semtag-role="collection"
            className="grid grid-cols-4 md:grid-cols-8 gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                data-semtag-id={`home.categories.item.${category.value}`}
                data-semtag-role="action"
                data-semtag-action="filter-category"
                data-semtag-state="filters.categories"
                data-semtag-controls="browse.products"
                onClick={() => {
                  setSelectedCategories([category.value]);
                  document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs text-center font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" data-semtag-id="home.browse" data-semtag-role="region" className="py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Browse All Items</h2>
              <p
                data-semtag-id="browse.count"
                data-semtag-role="observable"
                data-semtag-state="browse.count"
                className="text-muted-foreground"
              >
                {filteredProducts.length} items available
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="flex-1 sm:w-72"
                data-semtag-id="browse.search"
                data-semtag-role="input"
                data-semtag-state="search.query"
                data-semtag-controls="browse.products"
              />
              <div className="flex gap-2">
                <div className="lg:hidden">
                  <FilterSidebar
                    semtagMobilePrefix="browse.filters.mobile"
                    selectedCategories={selectedCategories}
                    selectedConditions={selectedConditions}
                    priceRange={priceRange}
                    maxDistance={maxDistance}
                    upcycledOnly={upcycledOnly}
                    onCategoryChange={setSelectedCategories}
                    onConditionChange={setSelectedConditions}
                    onPriceRangeChange={setPriceRange}
                    onMaxDistanceChange={setMaxDistance}
                    onUpcycledOnlyChange={setUpcycledOnly}
                    onClearFilters={clearFilters}
                  />
                </div>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <FilterSidebar
              semtagPrefix="browse.filters"
              selectedCategories={selectedCategories}
              selectedConditions={selectedConditions}
              priceRange={priceRange}
              maxDistance={maxDistance}
              upcycledOnly={upcycledOnly}
              onCategoryChange={setSelectedCategories}
              onConditionChange={setSelectedConditions}
              onPriceRangeChange={setPriceRange}
              onMaxDistanceChange={setMaxDistance}
              onUpcycledOnlyChange={setUpcycledOnly}
              onClearFilters={clearFilters}
            />

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div
                  data-semtag-id="browse.products"
                  data-semtag-role="collection"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} semtagCollection="browse.products" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3
                    data-semtag-id="browse.empty"
                    data-semtag-role="observable"
                    data-semtag-state="browse.count"
                    className="font-display text-xl font-semibold mb-2"
                  >
                    No items found
                  </h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    data-semtag-id="browse.empty.clear"
                    data-semtag-role="action"
                    data-semtag-action="clear-filters"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">ReVive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ReVive Marketplace. Giving items a second chance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
