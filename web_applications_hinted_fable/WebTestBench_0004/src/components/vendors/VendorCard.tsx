import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vendor, priceRanges, serviceTypes } from "@/data/vendors";
import { cn } from "@/lib/utils";

interface VendorCardProps {
  vendor: Vendor;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  /** Collection id namespace for semantic hints, e.g. "vendors.grid". */
  semtagCollection?: string;
}

export function VendorCard({ vendor, isFavorite, onToggleFavorite, semtagCollection }: VendorCardProps) {
  const priceLabel = priceRanges.find(p => p.value === vendor.priceRange)?.label || vendor.priceRange;
  const serviceLabel = serviceTypes.find(s => s.value === vendor.serviceType)?.label || vendor.serviceType;
  const itemId = semtagCollection ? `${semtagCollection}.item.${vendor.id}` : undefined;
  const semtag = (suffix: string, attrs: Record<string, string>) =>
    itemId ? { "data-semtag-id": suffix ? `${itemId}.${suffix}` : itemId, ...attrs } : {};

  return (
    <Card className="hover-lift overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-card/80 hover:bg-card backdrop-blur-sm"
          onClick={() => onToggleFavorite(vendor.id)}
          {...semtag("favorite", {
            "data-semtag-role": "toggle",
            "data-semtag-action": "toggle-favorite-vendor",
            "data-semtag-state": isFavorite ? "favorited" : "not-favorited",
          })}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite ? "fill-primary text-primary scale-110" : "text-muted-foreground"
            )}
          />
        </Button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge
            variant="sage"
            {...semtag("service", { "data-semtag-role": "observable", "data-semtag-state": "vendor.serviceType" })}
          >{serviceLabel}</Badge>
          <Badge
            variant="gold"
            {...semtag("price", { "data-semtag-role": "observable", "data-semtag-state": "vendor.priceRange" })}
          >{priceLabel}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle
          className="text-lg line-clamp-1"
          {...semtag("", { "data-semtag-role": "observable", "data-semtag-state": "vendor.name" })}
        >{vendor.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {vendor.location}
          </span>
          <span
            className="flex items-center gap-1"
            {...semtag("rating", { "data-semtag-role": "observable", "data-semtag-state": "vendor.rating" })}
          >
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {vendor.rating}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {vendor.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          {...semtag("profile", { "data-semtag-role": "action", "data-semtag-action": "view-vendor-profile" })}
        >View Profile</Button>
      </CardFooter>
    </Card>
  );
}

// Re-export priceRanges for use in filters
export { priceRanges } from "@/data/vendors";
