export type Review = {
  reviewer: string;
  rating: number;
  comment: string;
}

export type Psychologist = {
  id: string;
  name: string;
  avatarUrl: string;
  experience: number;
  reviews: Review[];
  pricePerHour: number;
  rating: number;
  license: string;
  specialization: string;
  initialConsultation: string;
  about: string;
}

export type SortOption = 'A to Z' | 'Z to A' | 'Price: Low to High' | 'Price: High to Low' | 'Popular' | 'Not popular' | 'Less than 100$' | 'Greater than 100$' | 'Show all';