export interface GoogleBook {
  id: string;
  googleId?: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
  };
}

export interface BookToSave {
  googleId: string;
  title: string;
  author?: string;
  coverUrl?: string;
  description?: string;
}

export interface DbBook {
  id: number;
  title: string;
  author?: string | null;
  coverUrl?: string | null;
  description?: string | null;
}

export type BookSource =
  | { source: "db"; book: DbBook }
  | { source: "api"; book: GoogleBook };
