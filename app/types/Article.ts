export type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  body_letters_count: number;
  body_updated_at: string;
  body_updated_at_formatted: string;
};

export type ArticleListResponse = {
  articles: Article[];
  next_page: string | null;
};
