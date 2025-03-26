import { Article } from "../types/Article";

// 記事を更新日時順にソートし、最新n件を取得（nが指定されていない場合は全件）
export function sortArticles(
  articles: Article[],
  n?: number,
  ascend: boolean = false,
): Article[] {
  const sorted = articles.toSorted((a, b) => {
    const diff =
      new Date(a.body_updated_at).getTime() -
      new Date(b.body_updated_at).getTime();
    return ascend ? diff : -diff;
  });

  return n != null ? sorted.slice(0, n) : sorted;
}
