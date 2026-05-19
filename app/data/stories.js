/*
  📚 DATASPECTACLES — Stories Data
  =================================
  Teaching note: all story content lives here as a plain JS array.
  Components import this and render it — content is completely
  separate from presentation. To add a new story, just add an
  object to this array. No other file needs to change.

  Story shape:
  - id:          unique number (used as React key)
  - number:      editorial issue number (like The Pudding's #217)
  - title:       story title (short, punchy)
  - description: one sentence — what the story is about
  - category:    must match one of the CATEGORIES keys below
  - date:        display date string
  - image:       path to image in /public/images/ (or null for placeholder)
  - coverColor:  shown as bg when no image — matches category colour
  - isUpdating:  true if this story gets live data updates
  - slug:        url-friendly version of title (for future routing)
*/

export const CATEGORIES = {
  all: { label: "All", chip: "" },
  words: { label: "Words & Language", chip: "ds-chip-words" },
  culture: { label: "Cultural Trends", chip: "ds-chip-culture" },
  sports: { label: "Sports Analysis", chip: "ds-chip-sports" },
  curious: { label: "Curious Findings", chip: "ds-chip-curious" },
  odd: { label: "Odd Correlations", chip: "ds-chip-odd" },
  updating: { label: "Updating", chip: "ds-chip-updating" },
};

export const stories = [
  {
    id: 1,
    number: "#001",
    title: "Which Words Went Viral in 2024",
    description:
      "We tracked 10 million social posts to map how new words travel across languages — and which ones never make it across borders.",
    category: "words",
    date: "MAY 2025",
    image: null, // null = use coverColor as background placeholder
    coverColor: "#1A2E3D", // matches the Words & Language category colour
    isUpdating: false,
    slug: "which-words-went-viral-2024",
  },
  {
    id: 2,
    number: "#002",
    title: "The Decade Culture Shifted",
    description:
      "A data portrait of how music, film and fashion tastes changed across Southern Europe between 2010 and 2020.",
    category: "culture",
    date: "APR 2025",
    image: null,
    coverColor: "#2E1A2E", // matches Cultural Trends category colour
    isUpdating: false,
    slug: "decade-culture-shifted",
  },
  {
    id: 3,
    number: "#003",
    title: "Goals Per Temperature Degree",
    description:
      "Does heat make footballers score more? We analysed 5 seasons of Iberian league data against weather records.",
    category: "sports",
    date: "MAR 2025",
    image: null,
    coverColor: "#1A2E1A", // matches Sports Analysis category colour
    isUpdating: false,
    slug: "goals-per-temperature",
  },
  {
    id: 4,
    number: "#004",
    title: "Coffee Shops vs Nobel Prizes",
    description:
      "Countries with more coffee shops per capita win more Nobel Prizes. Coincidence? We dug into 60 years of data.",
    category: "curious",
    date: "FEB 2025",
    image: null,
    coverColor: "#2E2A1A", // matches Curious Findings category colour
    isUpdating: false,
    slug: "coffee-shops-vs-nobel-prizes",
  },
  {
    id: 5,
    number: "#005",
    title: "Why People With Cats Read More",
    description:
      "An unexpected correlation between pet ownership and library visits across 40 countries — and what it might actually mean.",
    category: "odd",
    date: "JAN 2025",
    image: null,
    coverColor: "#2E2410", // matches Odd Correlations — amber/gold, not red
    isUpdating: false,
    slug: "cats-and-reading",
  },
  {
    id: 6,
    number: "#006",
    title: "The Language of Football Twitter",
    description:
      "We are tracking how football vocabulary evolves in real time across Portuguese, Spanish and Galician social media.",
    category: "updating",
    date: "LIVE",
    image: null,
    coverColor: "#1A2A2E", // matches Updating category colour
    isUpdating: true, // triggers the live pulsing badge on the card
    slug: "language-football-twitter",
  },
];
