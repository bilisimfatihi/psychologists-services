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

    case "Price: Low to High":
      return data.sort((a, b) => a.pricePerHour - b.pricePerHour);

    case "Price: High to Low":
      return data.sort((a, b) => b.pricePerHour - a.pricePerHour);

    case "Popular":
      return data.filter((p) => p.rating >= 4);

    case "Not popular":
      return data.filter((p) => p.rating < 4);

    case "Less than 100$":
      return data.filter((p) => p.pricePerHour < 100);

    case "Greater than 100$":
      return data.filter((p) => p.pricePerHour > 100);

    case "Show all":
    default:
      return data;
  }
};
