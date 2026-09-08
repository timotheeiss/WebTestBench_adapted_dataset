import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { RestaurantCard } from '@/components/RestaurantCard';
import { FilterBar } from '@/components/FilterBar';
import { restaurants } from '@/data/restaurants';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const cuisines = useMemo(
    () => [...new Set(restaurants.map(r => r.cuisine))],
    []
  );

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCuisine =
        selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;

      const matchesPrice =
        selectedPrice === 'all' || restaurant.priceRange === selectedPrice;

      return matchesSearch && matchesCuisine && matchesPrice;
    });
  }, [searchQuery, selectedCuisine, selectedPrice]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Reserve Your Perfect
              <span className="text-primary block mt-1">Dining Experience</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover exceptional restaurants and book your table in seconds.
              From intimate bistros to award-winning fine dining.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Restaurant Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <FilterBar
            onSearch={setSearchQuery}
            onCuisineChange={setSelectedCuisine}
            onPriceChange={setSelectedPrice}
            cuisines={cuisines}
          />
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <p
              data-semtag-id="restaurants.empty"
              data-semtag-role="observable"
              data-semtag-state="restaurants.count"
              className="text-lg text-muted-foreground"
            >
              No restaurants found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <p
              data-semtag-id="restaurants.count"
              data-semtag-role="observable"
              data-semtag-state="restaurants.count"
              className="text-sm text-muted-foreground mb-6"
            >
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} available
            </p>
            <div
              data-semtag-id="restaurants.grid"
              data-semtag-role="collection"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 TableSpot. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
