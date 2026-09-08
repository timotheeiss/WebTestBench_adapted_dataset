import { Layout } from "@/components/layout/Layout";
import { VenueCard } from "@/components/venues/VenueCard";
import { VendorCard } from "@/components/vendors/VendorCard";
import { venues } from "@/data/venues";
import { vendors } from "@/data/vendors";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Heart, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const [favoriteVenueIds, setFavoriteVenueIds] = useLocalStorage<string[]>("favoriteVenues", []);
  const [favoriteVendorIds, setFavoriteVendorIds] = useLocalStorage<string[]>("favoriteVendors", []);

  const favoriteVenues = venues.filter((v) => favoriteVenueIds.includes(v.id));
  const favoriteVendors = vendors.filter((v) => favoriteVendorIds.includes(v.id));

  const toggleVenueFavorite = (id: string) => {
    setFavoriteVenueIds((prev) => prev.filter((v) => v !== id));
  };

  const toggleVendorFavorite = (id: string) => {
    setFavoriteVendorIds((prev) => prev.filter((v) => v !== id));
  };

  const hasNoFavorites = favoriteVenues.length === 0 && favoriteVendors.length === 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center slide-up">
          <h1 className="text-4xl font-display font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All your saved venues and vendors in one place. Compare options and make your perfect choices.
          </p>
        </div>

        {hasNoFavorites ? (
          <div className="text-center py-16 fade-in">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2
              className="text-2xl font-display font-semibold mb-2"
              data-semtag-id="favorites.empty"
              data-semtag-role="observable"
            >No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring venues and vendors to save your favorites here.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/venues"
                data-semtag-id="favorites.browse.venues"
                data-semtag-role="navigation"
                data-semtag-target="venues.page"
              >
                <Button variant="default" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Browse Venues
                </Button>
              </Link>
              <Link
                to="/vendors"
                data-semtag-id="favorites.browse.vendors"
                data-semtag-role="navigation"
                data-semtag-target="vendors.page"
              >
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Browse Vendors
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Favorite Venues */}
            {favoriteVenues.length > 0 && (
              <section className="fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Saved Venues
                    <span
                      className="text-muted-foreground font-normal text-base"
                      data-semtag-id="favorites.venues.count"
                      data-semtag-role="observable"
                      data-semtag-state="favorites.venues.count"
                    >
                      ({favoriteVenues.length})
                    </span>
                  </h2>
                  <Link
                    to="/venues"
                    data-semtag-id="favorites.viewall.venues"
                    data-semtag-role="navigation"
                    data-semtag-target="venues.page"
                  >
                    <Button variant="ghost" size="sm">View all venues</Button>
                  </Link>
                </div>
                <div
                  className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  data-semtag-id="favorites.venues"
                  data-semtag-role="collection"
                >
                  {favoriteVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      isFavorite={true}
                      onToggleFavorite={toggleVenueFavorite}
                      semtagCollection="favorites.venues"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Favorite Vendors */}
            {favoriteVendors.length > 0 && (
              <section className="fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Saved Vendors
                    <span
                      className="text-muted-foreground font-normal text-base"
                      data-semtag-id="favorites.vendors.count"
                      data-semtag-role="observable"
                      data-semtag-state="favorites.vendors.count"
                    >
                      ({favoriteVendors.length})
                    </span>
                  </h2>
                  <Link
                    to="/vendors"
                    data-semtag-id="favorites.viewall.vendors"
                    data-semtag-role="navigation"
                    data-semtag-target="vendors.page"
                  >
                    <Button variant="ghost" size="sm">View all vendors</Button>
                  </Link>
                </div>
                <div
                  className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  data-semtag-id="favorites.vendors"
                  data-semtag-role="collection"
                >
                  {favoriteVendors.map((vendor) => (
                    <VendorCard
                      key={vendor.id}
                      vendor={vendor}
                      isFavorite={true}
                      onToggleFavorite={toggleVendorFavorite}
                      semtagCollection="favorites.vendors"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
