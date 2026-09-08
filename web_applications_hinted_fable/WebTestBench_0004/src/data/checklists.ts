export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  category: "planning" | "ceremony" | "reception" | "attire" | "honeymoon";
  icon: string;
  items: ChecklistItem[];
}

export const checklists: Checklist[] = [
  {
    id: "cl1",
    title: "12+ Months Before",
    description: "Get a head start on the big decisions that take time to plan.",
    category: "planning",
    icon: "calendar",
    items: [
      { id: "cl1-1", title: "Set a budget", description: "Determine your total wedding budget and allocate funds to different categories.", completed: false },
      { id: "cl1-2", title: "Choose a wedding date", description: "Consider season, availability, and any significant dates.", completed: false },
      { id: "cl1-3", title: "Book your venue", description: "Popular venues book up quickly, so start touring early.", completed: false },
      { id: "cl1-4", title: "Start your guest list", description: "Create a preliminary list to help determine venue size.", completed: false },
      { id: "cl1-5", title: "Hire a wedding planner", description: "If desired, a planner can help manage the entire process.", completed: false },
      { id: "cl1-6", title: "Book photographer & videographer", description: "Top professionals book 12-18 months in advance.", completed: false },
    ],
  },
  {
    id: "cl2",
    title: "8-10 Months Before",
    description: "Time to secure your key vendors and make design decisions.",
    category: "planning",
    icon: "clipboard",
    items: [
      { id: "cl2-1", title: "Book caterer", description: "Schedule tastings and finalize your menu style.", completed: false },
      { id: "cl2-2", title: "Book florist", description: "Share your vision and color palette.", completed: false },
      { id: "cl2-3", title: "Book entertainment", description: "Secure your band, DJ, or other entertainment.", completed: false },
      { id: "cl2-4", title: "Shop for wedding attire", description: "Start trying on dresses/suits - alterations take time!", completed: false },
      { id: "cl2-5", title: "Send save-the-dates", description: "Give guests plenty of notice, especially for destination weddings.", completed: false },
      { id: "cl2-6", title: "Book officiant", description: "Confirm availability and discuss ceremony details.", completed: false },
    ],
  },
  {
    id: "cl3",
    title: "Ceremony Planning",
    description: "Create a meaningful ceremony that reflects your relationship.",
    category: "ceremony",
    icon: "heart",
    items: [
      { id: "cl3-1", title: "Write your vows", description: "Personal vows add a heartfelt touch to your ceremony.", completed: false },
      { id: "cl3-2", title: "Choose ceremony music", description: "Select processional, recessional, and any special songs.", completed: false },
      { id: "cl3-3", title: "Plan ceremony readings", description: "Choose meaningful readings and ask loved ones to participate.", completed: false },
      { id: "cl3-4", title: "Obtain marriage license", description: "Check your local requirements and timing.", completed: false },
      { id: "cl3-5", title: "Plan ceremony rehearsal", description: "Schedule and plan the rehearsal dinner.", completed: false },
    ],
  },
  {
    id: "cl4",
    title: "Reception Details",
    description: "Make your reception memorable with these important details.",
    category: "reception",
    icon: "music",
    items: [
      { id: "cl4-1", title: "Create seating chart", description: "Thoughtfully arrange guests to encourage mingling.", completed: false },
      { id: "cl4-2", title: "Plan first dance", description: "Choose your song and consider dance lessons.", completed: false },
      { id: "cl4-3", title: "Finalize menu", description: "Confirm final menu choices and dietary accommodations.", completed: false },
      { id: "cl4-4", title: "Order wedding cake", description: "Schedule tasting and finalize design.", completed: false },
      { id: "cl4-5", title: "Plan reception timeline", description: "Coordinate with DJ/band for key moments.", completed: false },
      { id: "cl4-6", title: "Arrange transportation", description: "Book transportation for wedding party and guests.", completed: false },
    ],
  },
  {
    id: "cl5",
    title: "Wedding Attire",
    description: "Look your best on your special day with proper planning.",
    category: "attire",
    icon: "sparkles",
    items: [
      { id: "cl5-1", title: "Schedule dress fittings", description: "Allow time for multiple fittings and alterations.", completed: false },
      { id: "cl5-2", title: "Choose accessories", description: "Select jewelry, veil, shoes, and other accessories.", completed: false },
      { id: "cl5-3", title: "Book hair & makeup trial", description: "Test your look before the big day.", completed: false },
      { id: "cl5-4", title: "Coordinate wedding party attire", description: "Ensure bridal party has their outfits ready.", completed: false },
      { id: "cl5-5", title: "Break in your shoes", description: "Wear them around the house to avoid blisters.", completed: false },
    ],
  },
  {
    id: "cl6",
    title: "Honeymoon Planning",
    description: "Plan your perfect getaway after the celebration.",
    category: "honeymoon",
    icon: "plane",
    items: [
      { id: "cl6-1", title: "Choose destination", description: "Decide on your dream honeymoon location.", completed: false },
      { id: "cl6-2", title: "Book flights & accommodations", description: "Secure the best deals by booking early.", completed: false },
      { id: "cl6-3", title: "Check passport validity", description: "Ensure passports are valid for 6+ months past travel dates.", completed: false },
      { id: "cl6-4", title: "Plan activities", description: "Research and book any special experiences.", completed: false },
      { id: "cl6-5", title: "Arrange pet/house sitting", description: "Ensure everything at home is taken care of.", completed: false },
    ],
  },
];

export const checklistCategories = [
  { value: "planning", label: "Planning" },
  { value: "ceremony", label: "Ceremony" },
  { value: "reception", label: "Reception" },
  { value: "attire", label: "Attire" },
  { value: "honeymoon", label: "Honeymoon" },
];
