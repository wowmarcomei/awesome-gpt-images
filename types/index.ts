export interface Case {
  id: number;
  title: string;
  author: {
    name: string;
    twitter: string;
  };
  originalLink: string;
  imageUrl: string;
  prompt: string;
  requiresReferenceImage: boolean;
  additionalNotes?: string;
  tags: string[];
}

export interface FilterOptions {
  author?: string;
  style?: string;
  requiresReference?: boolean;
} 