export interface Case {
  id: string;
  title: string;
  author: {
    name: string;
    twitter: string;
  };
  originalLink: string;
  image: string;
  prompt: string;
  requiresReferenceImage?: boolean;
  additionalNotes?: string;
  tags: string[];
}

export interface FilterOptions {
  author?: string;
  style?: string;
  requiresReference?: boolean;
} 