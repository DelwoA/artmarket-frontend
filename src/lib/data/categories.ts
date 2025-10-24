export const CATEGORIES = [
  "Painting",
  "Sculpture",
  "Photography",
  "Mixed Media",
  "Digital Art",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
