// tech-blog/app/lib/filterArticlesByCategory.test.ts
import { filterArticlesByCategory } from "./filterArticlesByCategory";
import { Article } from "../types/Article";

describe("filterArticlesByCategory", () => {
  it("should filter articles by category", () => {
    const articles: Article[] = [
      {
        id: 1,
        slug: "article-1",
        title: "Article 1",
        category: "tech",
        body_letters_count: 100,
        body_updated_at: "2023-01-01T00:00:00Z",
        body_updated_at_formatted: "2023-01-01",
      },
      {
        id: 2,
        slug: "article-2",
        title: "Article 2",
        category: "health",
        body_letters_count: 150,
        body_updated_at: "2023-01-02T00:00:00Z",
        body_updated_at_formatted: "2023-01-02",
      },
      {
        id: 3,
        slug: "article-3",
        title: "Article 3",
        category: "tech",
        body_letters_count: 200,
        body_updated_at: "2023-01-03T00:00:00Z",
        body_updated_at_formatted: "2023-01-03",
      },
    ];

    const filteredArticles = filterArticlesByCategory(articles, "tech");

    expect(filteredArticles).toHaveLength(2);
    expect(filteredArticles).toEqual([
      {
        id: 1,
        slug: "article-1",
        title: "Article 1",
        category: "tech",
        body_letters_count: 100,
        body_updated_at: "2023-01-01T00:00:00Z",
        body_updated_at_formatted: "2023-01-01",
      },
      {
        id: 3,
        slug: "article-3",
        title: "Article 3",
        category: "tech",
        body_letters_count: 200,
        body_updated_at: "2023-01-03T00:00:00Z",
        body_updated_at_formatted: "2023-01-03",
      },
    ]);
  });

  it("should return an empty array if no articles match the category", () => {
    const articles: Article[] = [
      {
        id: 4,
        slug: "article-4",
        title: "Article 1",
        category: "health",
        body_letters_count: 100,
        body_updated_at: "2023-01-01T00:00:00Z",
        body_updated_at_formatted: "2023-01-01",
      },
      {
        id: 5,
        slug: "article-5",
        title: "Article 2",
        category: "health",
        body_letters_count: 150,
        body_updated_at: "2023-01-02T00:00:00Z",
        body_updated_at_formatted: "2023-01-02",
      },
    ];

    const filteredArticles = filterArticlesByCategory(articles, "tech");

    expect(filteredArticles).toHaveLength(0);
  });
});
