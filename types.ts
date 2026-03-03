export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription?: string;
  galleryImages?: string[];
  year: string;
  location: string;
}

export interface ConceptResponse {
  title: string;
  concept: string;
  materials: string[];
  features: string[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: ServiceFeature[];
}