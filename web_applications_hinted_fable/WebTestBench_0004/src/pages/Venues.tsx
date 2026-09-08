import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { VenueCard } from "@/components/venues/VenueCard";
import { SearchAndFilter } from "@/components/ui/search-and-filter";
import { venues, locationTypes, priceRanges, Venue } from "@/data/venues";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function VenuesPage() {
  const [search, setSearch] = useState("");
  const [locationType, setLocationType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [favoriteVenueIds, setFavoriteVenueIds] = useLocalStorage<string[]>("favoriteVenues", []);

  const toggleFavorite = (id: string) => {
    setFavoriteVenueIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(search.toLowerCase()) ||
        venue.description.toLowerCase().includes(search.toLowerCase()) ||
        venue.location.toLowerCase().includes(search.toLowerCase());
      
      const matchesLocation = !locationType || venue.locationType === locationType;
      const matchesPrice = !priceRange || venue.priceRange === priceRange;

      return matchesSearch && matchesLocation && matchesPrice;
    });
  }, [search, locationType, priceRange]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center slide-up">
          <h1 className="text-4xl font-display font-bold mb-2">Wedding Venues</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect setting for your special day. From romantic gardens to elegant ballrooms,
            discover venues that match your vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div
              className="sticky top-24 bg-card rounded-xl p-6 shadow-sm"
              data-semtag-id="venues.filters"
              data-semtag-role="region"
            >
              <h2 className="font-display text-lg font-semibold mb-4">Filters</h2>
              <SearchAndFilter
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search venues..."
                semtagPrefix="venues.filters"
                semtagControls="venues.grid"
                filterGroups={[
                  {
                    label: "Venue Type",
                    options: locationTypes,
                    selectedValue: locationType,
                    onSelect: setLocationType,
                  },
                  {
                    label: "Price Range",
                    options: priceRanges,
                    selectedValue: priceRange,
                    onSelect: setPriceRange,
                  },
                ]}
              />
            </div>
          </aside>

          {/* Venue Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-muted-foreground"
                data-semtag-id="venues.results.count"
                data-semtag-role="observable"
                data-semtag-state="venues.results.count"
              >
                Showing {filteredVenues.length} of {venues.length} venues
              </p>
            </div>

            {filteredVenues.length > 0 ? (
              <div
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                data-semtag-id="venues.grid"
                data-semtag-role="collection"
              >
                {filteredVenues.map((venue, index) => (
                  <div
                    key={venue.id}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <VenueCard
                      venue={venue}
                      isFavorite={favoriteVenueIds.includes(venue.id)}
                      onToggleFavorite={toggleFavorite}
                      semtagCollection="venues.grid"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p
                  className="text-muted-foreground text-lg"
                  data-semtag-id="venues.results.empty"
                  data-semtag-role="observable"
                >No venues match your search.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
