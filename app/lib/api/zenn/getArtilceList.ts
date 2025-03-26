import { Article, ArticleListResponse } from "../../../types/Article";
import { format } from "date-fns";
const ZENN_API_URL = "https://zenn.dev/api/articles";
const USERNAME = "pizzarapper";

export async function getArticleList(): Promise<Article[]> {
  try {
    const response = await fetch(`${ZENN_API_URL}?username=${USERNAME}`);
    if (!response.ok) {
      throw new Error(`article list API status:${response.status}`);
    }
    const data: ArticleListResponse = await response.json();

    if (!data?.articles || data.articles.length === 0) {
      console.log("no articles");
      return [];
    }

    const articles = data.articles.map((article) => {
      const parts = article.slug.split("_");
      const category = parts.length === 2 ? parts[0] : "others";
      const body_updated_at_formatted = format(
        new Date(article.body_updated_at),
        "MMM d, yyyy",
      );

      return {
        ...article,
        category,
        body_updated_at_formatted,
      };
    });

    return articles;
  } catch (error) {
    throw new Error(`Error fetching article list: ${error.message}`);
  }
}
