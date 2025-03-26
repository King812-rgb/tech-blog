import { sortArticles } from "./sortArticles";
import { Article } from "../types/Article";

describe("sortArticles", () => {
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

  it("should sort articles by updated date in descending order", () => {
    const sortedArticles = sortArticles(articles);
    expect(sortedArticles).toEqual([articles[2], articles[1], articles[0]]);
  });

  it("should sort articles by updated date in ascending order when ascend is true", () => {
    const sortedArticles = sortArticles(articles, undefined, true);
    expect(sortedArticles).toEqual([articles[0], articles[1], articles[2]]);
  });

  it("should return the latest n articles when n is specified", () => {
    const sortedArticles = sortArticles(articles, 2);
    expect(sortedArticles).toHaveLength(2);
    expect(sortedArticles).toEqual([articles[2], articles[1]]);
  });

  it("should return all articles when n is not specified", () => {
    const sortedArticles = sortArticles(articles);
    expect(sortedArticles).toHaveLength(3);
  });
});
