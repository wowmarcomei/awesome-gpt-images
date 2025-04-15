export interface Author {
  name: string;
  twitter: string;
}

export interface Case {
  id: string;
  title: string;
  image: string;
  prompt: string;
  author: Author;
  tags: string[];
  originalLink: string;
  requiresReferenceImage: boolean;
} 