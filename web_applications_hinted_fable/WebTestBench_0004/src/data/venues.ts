export interface Venue {
  id: string;
  name: string;
  description: string;
  locationType: "garden" | "beach" | "ballroom" | "barn" | "vineyard" | "rooftop";
  priceRange: "budget" | "moderate" | "luxury";
  capacity: number;
  location: string;
  rating: number;
  image: string;
  amenities: string[];
}

export const venues: Venue[] = [
  {
    id: "v1",
    name: "Rosewood Garden Estate",
    description: "An enchanting garden venue with century-old oak trees, romantic rose gardens, and a charming stone gazebo perfect for outdoor ceremonies.",
    locationType: "garden",
    priceRange: "luxury",
    capacity: 200,
    location: "Napa Valley, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    amenities: ["Catering Kitchen", "Bridal Suite", "Parking", "Outdoor Ceremony"],
  },
  {
    id: "v2",
    name: "Sunset Beach Resort",
    description: "Say your vows with toes in the sand at this stunning oceanfront resort featuring panoramic sunset views and elegant reception spaces.",
    locationType: "beach",
    priceRange: "luxury",
    capacity: 150,
    location: "Malibu, CA",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800",
    amenities: ["Beach Access", "Resort Rooms", "Full Catering", "Event Coordinator"],
  },
  {
    id: "v3",
    name: "The Grand Ballroom",
    description: "Classic elegance meets modern luxury in this stunning ballroom featuring crystal chandeliers, marble floors, and floor-to-ceiling windows.",
    locationType: "ballroom",
    priceRange: "luxury",
    capacity: 400,
    location: "Manhattan, NY",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    amenities: ["Valet Parking", "Gourmet Catering", "Bridal Suite", "Sound System"],
  },
  {
    id: "v4",
    name: "Willow Creek Barn",
    description: "A lovingly restored 19th-century barn offering rustic charm with modern amenities, surrounded by rolling hills and wildflower meadows.",
    locationType: "barn",
    priceRange: "moderate",
    capacity: 180,
    location: "Austin, TX",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    amenities: ["Outdoor Space", "Farm Tables", "String Lights", "Fire Pit"],
  },
  {
    id: "v5",
    name: "Vineyard Heights",
    description: "Nestled among award-winning vineyards, this Tuscan-inspired venue offers wine tastings, stunning views, and intimate celebration spaces.",
    locationType: "vineyard",
    priceRange: "luxury",
    capacity: 120,
    location: "Sonoma, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    amenities: ["Wine Tasting", "Vineyard Tours", "Chef's Kitchen", "Guest Cottages"],
  },
  {
    id: "v6",
    name: "Sky Terrace",
    description: "A modern rooftop venue with breathtaking city skyline views, perfect for couples seeking an urban chic celebration under the stars.",
    locationType: "rooftop",
    priceRange: "moderate",
    capacity: 100,
    location: "Chicago, IL",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    amenities: ["Skyline Views", "Indoor Backup", "Full Bar", "Dance Floor"],
  },
  {
    id: "v7",
    name: "Meadow Brook Gardens",
    description: "A botanical wonderland featuring themed gardens, cascading fountains, and a romantic greenhouse for all-season celebrations.",
    locationType: "garden",
    priceRange: "moderate",
    capacity: 175,
    location: "Portland, OR",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
    amenities: ["Multiple Gardens", "Greenhouse", "Fountains", "Photo Opportunities"],
  },
  {
    id: "v8",
    name: "Coastal Haven",
    description: "An intimate beachfront cottage perfect for small gatherings, featuring a private beach, cozy interiors, and unforgettable ocean views.",
    locationType: "beach",
    priceRange: "budget",
    capacity: 50,
    location: "Cape Cod, MA",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    amenities: ["Private Beach", "Cottage Rental", "Bonfire Area", "Kayaks"],
  },
];

export const locationTypes = [
  { value: "garden", label: "Garden" },
  { value: "beach", label: "Beach" },
  { value: "ballroom", label: "Ballroom" },
  { value: "barn", label: "Barn" },
  { value: "vineyard", label: "Vineyard" },
  { value: "rooftop", label: "Rooftop" },
];

export const priceRanges = [
  { value: "budget", label: "Budget ($)" },
  { value: "moderate", label: "Moderate ($$)" },
  { value: "luxury", label: "Luxury ($$$)" },
];
