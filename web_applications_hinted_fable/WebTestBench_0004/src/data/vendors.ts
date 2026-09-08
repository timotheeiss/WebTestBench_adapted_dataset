export interface Vendor {
  id: string;
  name: string;
  description: string;
  serviceType: "photography" | "catering" | "florist" | "music" | "cake" | "beauty" | "videography" | "officiant";
  priceRange: "budget" | "moderate" | "luxury";
  location: string;
  rating: number;
  image: string;
  specialties: string[];
}

export const vendors: Vendor[] = [
  {
    id: "vn1",
    name: "Eternal Moments Photography",
    description: "Award-winning wedding photographers specializing in candid, romantic imagery that tells your unique love story.",
    serviceType: "photography",
    priceRange: "luxury",
    location: "Los Angeles, CA",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800",
    specialties: ["Candid Shots", "Drone Photography", "Same-Day Edits", "Albums"],
  },
  {
    id: "vn2",
    name: "Gourmet Celebrations",
    description: "Farm-to-table catering with customizable menus that blend culinary artistry with locally sourced ingredients.",
    serviceType: "catering",
    priceRange: "luxury",
    location: "San Francisco, CA",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
    specialties: ["Farm-to-Table", "Custom Menus", "Dietary Accommodations", "Tastings"],
  },
  {
    id: "vn3",
    name: "Bloom & Petal Studio",
    description: "Artisanal florists creating stunning, romantic arrangements from bridal bouquets to grand centerpieces.",
    serviceType: "florist",
    priceRange: "moderate",
    location: "Seattle, WA",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
    specialties: ["Bouquets", "Centerpieces", "Ceremony Arches", "Boutonnieres"],
  },
  {
    id: "vn4",
    name: "Harmony Wedding Band",
    description: "A versatile live band that keeps guests dancing all night with everything from classic standards to modern hits.",
    serviceType: "music",
    priceRange: "moderate",
    location: "Nashville, TN",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    specialties: ["Live Music", "Ceremony Music", "MC Services", "Custom Songs"],
  },
  {
    id: "vn5",
    name: "Sweet Celebrations Bakery",
    description: "Master cake artists creating edible works of art that taste as amazing as they look.",
    serviceType: "cake",
    priceRange: "moderate",
    location: "Chicago, IL",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800",
    specialties: ["Custom Cakes", "Cupcake Towers", "Dessert Tables", "Tastings"],
  },
  {
    id: "vn6",
    name: "Bridal Glow Studio",
    description: "Expert makeup artists and hair stylists dedicated to making you look and feel your absolute best.",
    serviceType: "beauty",
    priceRange: "luxury",
    location: "Miami, FL",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    specialties: ["Bridal Makeup", "Hair Styling", "Trial Sessions", "Bridal Party"],
  },
  {
    id: "vn7",
    name: "Cinematic Love Films",
    description: "Creating timeless wedding films that capture every precious moment in stunning cinematic quality.",
    serviceType: "videography",
    priceRange: "luxury",
    location: "New York, NY",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
    specialties: ["Cinematic Films", "Drone Footage", "Same-Day Edits", "Highlight Reels"],
  },
  {
    id: "vn8",
    name: "Rev. Sarah Mitchell",
    description: "A warm and personable officiant who crafts meaningful ceremonies tailored to your love story.",
    serviceType: "officiant",
    priceRange: "budget",
    location: "Denver, CO",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    specialties: ["Personalized Ceremonies", "Multiple Faiths", "Rehearsal Support", "Vow Writing"],
  },
  {
    id: "vn9",
    name: "Budget Blooms",
    description: "Beautiful, affordable floral arrangements that prove elegance doesn't have to break the bank.",
    serviceType: "florist",
    priceRange: "budget",
    location: "Phoenix, AZ",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800",
    specialties: ["Affordable Packages", "Seasonal Flowers", "DIY Options", "Rentals"],
  },
  {
    id: "vn10",
    name: "DJ Spark Entertainment",
    description: "High-energy DJ services with state-of-the-art sound and lighting to create an unforgettable party.",
    serviceType: "music",
    priceRange: "budget",
    location: "Atlanta, GA",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571266028243-d220c6a8b8d1?w=800",
    specialties: ["DJ Services", "Lighting", "MC Services", "Photo Booth"],
  },
];

export const serviceTypes = [
  { value: "photography", label: "Photography" },
  { value: "catering", label: "Catering" },
  { value: "florist", label: "Florist" },
  { value: "music", label: "Music & DJ" },
  { value: "cake", label: "Cake & Desserts" },
  { value: "beauty", label: "Hair & Makeup" },
  { value: "videography", label: "Videography" },
  { value: "officiant", label: "Officiant" },
];

export const priceRanges = [
  { value: "budget", label: "Budget ($)" },
  { value: "moderate", label: "Moderate ($$)" },
  { value: "luxury", label: "Luxury ($$$)" },
];
