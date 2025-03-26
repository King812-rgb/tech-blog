import { Article } from "@/types/Article";
import { getArticleList } from "@/lib/api/zenn/getArtilceList";
import { filterArticlesByCategory } from "@/lib/filterArticlesByCategory";
import { sortArticles } from "@/lib/sortArticles";
import { ArticleCards } from "@/components/ArticleCards";
import { BackButton } from "@/components/BackButton";
import { notFound } from "next/navigation";
import { Category } from "@/types/Category";
import { toUpperFirstChar } from "@/lib/toUpperFirst";

export default async function CategoryPages({
  params,
}: {
  readonly params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!Object.values(Category).includes(category as Category)) {
    notFound();
  }

  // getAllArticles
  const articles: Article[] = await getArticleList();
  const articlesByCategory = filterArticlesByCategory(articles, category);
  const sortedArticles = sortArticles(articlesByCategory, undefined, false);

  return (
    <div className="container mx-auto px-4 py-4">
      <BackButton />
      <section className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{toUpperFirstChar(category)}</h2>
        </div>
      </section>

      {/* 記事が一件もない場合 */}
      {sortedArticles.length === 0 ? (
        <div className="flex justify-center text-center mt-20">
          <h2 className="text-2xl font-bold">
            No Articles available now.
            <br />
            Please come back later.
          </h2>
        </div>
      ) : (
        // 記事がある場合の表示
        <div className="grid md:grid-cols-3 gap-6">
          {sortedArticles.map((article) => (
            <ArticleCards
              key={article.id}
              title={article.title}
              date={article.body_updated_at_formatted}
              slug={article.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
