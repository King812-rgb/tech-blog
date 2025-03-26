import { Article } from "../types/Article";

// カテゴリごとに最新の記事を取得し、Recent に含まれないものを抽出
export function filterArticlesByCategory(
  articles: Article[],
  category: string,
): Article[] {
  return articles.filter((article) => article.category === category);
}
