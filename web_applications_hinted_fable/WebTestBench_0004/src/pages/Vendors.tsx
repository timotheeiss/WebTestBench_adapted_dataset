import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { VendorCard } from "@/components/vendors/VendorCard";
import { SearchAndFilter } from "@/components/ui/search-and-filter";
import { vendors, serviceTypes, priceRanges } from "@/data/vendors";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [favoriteVendorIds, setFavoriteVendorIds] = useLocalStorage<string[]>("favoriteVendors", []);

  const toggleFavorite = (id: string) => {
    setFavoriteVendorIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.description.toLowerCase().includes(search.toLowerCase()) ||
        vendor.location.toLowerCase().includes(search.toLowerCase()) ||
        vendor.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesService = !serviceType || vendor.serviceType === serviceType;
      const matchesPrice = !priceRange || vendor.priceRange === priceRange;

      return matchesSearch && matchesService && matchesPrice;
    });
  }, [search, serviceType, priceRange]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center slide-up">
          <h1 className="text-4xl font-display font-bold mb-2">Wedding Vendors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with talented professionals who will make your wedding dreams come true.
            From photographers to florists, find your perfect team.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div
              className="sticky top-24 bg-card rounded-xl p-6 shadow-sm"
              data-semtag-id="vendors.filters"
              data-semtag-role="region"
            >
              <h2 className="font-display text-lg font-semibold mb-4">Filters</h2>
              <SearchAndFilter
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search vendors..."
                semtagPrefix="vendors.filters"
                semtagControls="vendors.grid"
                filterGroups={[
                  {
                    label: "Service Type",
                    options: serviceTypes,
                    selectedValue: serviceType,
                    onSelect: setServiceType,
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

          {/* Vendor Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-muted-foreground"
                data-semtag-id="vendors.results.count"
                data-semtag-role="observable"
                data-semtag-state="vendors.results.count"
              >
                Showing {filteredVendors.length} of {vendors.length} vendors
              </p>
            </div>

            {filteredVendors.length > 0 ? (
              <div
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                data-semtag-id="vendors.grid"
                data-semtag-role="collection"
              >
                {filteredVendors.map((vendor, index) => (
                  <div
                    key={vendor.id}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <VendorCard
                      vendor={vendor}
                      isFavorite={favoriteVendorIds.includes(vendor.id)}
                      onToggleFavorite={toggleFavorite}
                      semtagCollection="vendors.grid"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p
                  className="text-muted-foreground text-lg"
                  data-semtag-id="vendors.results.empty"
                  data-semtag-role="observable"
                >No vendors match your search.</p>
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
