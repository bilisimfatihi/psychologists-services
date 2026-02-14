import type { Psychologist, SortOption } from "../types/types";

export const sortPsychologists = (
  data: Psychologist[],
  sortOption: SortOption
): Psychologist[] => {
  switch (sortOption) {
    case "A to Z":
      return data.sort((a, b) => a.name.localeCompare(b.name));

    case "Z to A":
      return data.sort((a, b) => b.name.localeCompare(a.name));

    case "Less than 10$":
      return data.filter((p) => p.pricePerHour < 10);

    case "Greater than 10$":
      return data.filter((p) => p.pricePerHour > 10);

    case "Popular":
      return data.filter((p) => p.rating >= 4);

    case "Not popular":
      return data.filter((p) => p.rating < 4);

    case "Show all":
    default:
      return data;
  }
};
