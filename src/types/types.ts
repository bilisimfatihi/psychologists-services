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

export type SortOption = 'A to Z' | 'Z to A' | 'Less than 10$' | 'Greater than 10$' | 'Popular' | 'Not popular' | 'Show all';