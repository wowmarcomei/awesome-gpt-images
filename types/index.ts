export interface I18nText {
  zh: string;
  en: string;
}

export interface I18nArray {
  zh: string[];
  en: string[];
}

export interface Case {
  id: string;
  title: I18nText;
  author: {
    name: string;
    twitter: string;
  };
  originalLink: string;
  image: string;
  prompt: I18nText;
  requiresReferenceImage?: boolean;
  additionalNotes?: I18nText;
  tags: I18nArray;
}

export interface FilterOptions {
  author?: string;
  style?: string;
  requiresReference?: boolean;
} 