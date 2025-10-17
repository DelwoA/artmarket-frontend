export type Country = {
  code: string; // ISO alpha-2 when possible
  name: string;
  slug: string; // lowercase name for filters
};

const RAW_COUNTRIES: Country[] = [
  { code: "US", name: "United States", slug: "united states" },
  { code: "CA", name: "Canada", slug: "canada" },
  { code: "GB", name: "United Kingdom", slug: "united kingdom" },
  { code: "AU", name: "Australia", slug: "australia" },
  { code: "NZ", name: "New Zealand", slug: "new zealand" },
  { code: "LK", name: "Sri Lanka", slug: "sri lanka" },
  { code: "IN", name: "India", slug: "india" },
  { code: "ES", name: "Spain", slug: "spain" },
  { code: "JP", name: "Japan", slug: "japan" },
  { code: "KR", name: "South Korea", slug: "south korea" },
  { code: "CN", name: "China", slug: "china" },
  { code: "RU", name: "Russia", slug: "russia" },
  { code: "DE", name: "Germany", slug: "germany" },
  { code: "FR", name: "France", slug: "france" },
  { code: "IT", name: "Italy", slug: "italy" },
  { code: "AE", name: "United Arab Emirates", slug: "united arab emirates" },
  { code: "SA", name: "Saudi Arabia", slug: "saudi arabia" },
  { code: "QA", name: "Qatar", slug: "qatar" },
];

export const COUNTRIES: readonly Country[] = [...RAW_COUNTRIES].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default COUNTRIES;
