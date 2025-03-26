import React from "react";
import { getArticleList } from "./lib/api/zenn/getArtilceList";
import { Article } from "./types/Article";
import { ArticleCards } from "./components/ArticleCards";
import { ArticleCarousel } from "./components/ArticleCarousel";
import { sortArticles } from "./lib/sortArticles";
import { filterArticlesByCategory } from "./lib/filterArticlesByCategory";
import "./global.css";
import { SocialLinks } from "./components/SocaiLinks";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  // getAllArticles
  const articles: Article[] = await getArticleList();

  // Separate recent&notRecenet
  const [a, b, c, ...notlatestArticles] = sortArticles(
    articles,
    undefined,
    false,
  );
  const latestArticles = [a, b, c].filter(Boolean);

  // getLatest
  const issueArticles = filterArticlesByCategory(
    notlatestArticles,
    "issues",
  ).slice(0, 3);

  const researchArticles = filterArticlesByCategory(
    notlatestArticles,
    "researches",
  ).slice(0, 3);

  const othersArticles = filterArticlesByCategory(
    notlatestArticles,
    "others",
  ).slice(0, 3);

  return (
    <div className="container mx-auto px-4">
      {/* TitleSection */}
      <section
        id="Top"
        className="h-[calc(100vh-100px)] flex flex-col justify-center items-center text-center bg-black text-white fade-in-up"
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          TSURE <span className="text-red-400">ZURE</span>
        </h1>
        <p className="text-lg md:text-2xl mt-4 whitespace-pre-line">
          This is my tech blog.
          {"\n"}write about issues, researches, and others
          <span className="text-red-400 block mt-2">
            &quot;徒然なるままに&quot;
          </span>
        </p>
        <SocialLinks />
      </section>

      {/* 記事が一件もない場合 */}
      {articles.length == 0 && (
        <section className="mb-20">
          <div className="flex justify-center text-center mb-8">
            <h2 className="text-2xl font-bold">
              No Articles available now.
              <br />
              Please come back later.
            </h2>
          </div>
        </section>
      )}

      {/* RecentSection */}
      {latestArticles.length !== 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-4 mt-4">
            <h2 className="text-2xl font-bold">Recent</h2>
          </div>
          <div className="md:hidden">
            <ArticleCarousel articles={latestArticles} />
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {latestArticles.map((article) => (
              <ArticleCards
                key={article.id}
                title={article.title}
                date={article.body_updated_at_formatted}
                slug={article.slug}
              />
            ))}
          </div>
          {/* </div> */}
        </section>
      )}
      {/* IssuesSection */}
      {issueArticles.length !== 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Issues</h2>
            <Link
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              href="/categories/issues"
            >
              All Articles
              <ArrowRight className="h-4 w-4 mr-2" />
            </Link>
          </div>

          <div className="md:hidden">
            <ArticleCarousel articles={issueArticles} />
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {issueArticles.map((article) => (
              <ArticleCards
                key={article.id}
                title={article.title}
                date={article.body_updated_at_formatted}
                slug={article.slug}
              />
            ))}
          </div>
        </section>
      )}
      {/* ResearchSection */}
      {researchArticles.length !== 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Researches</h2>
            <Link
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              href="/categories/researches"
            >
              All Articles
              <ArrowRight className="h-4 w-4 mr-2" />
            </Link>
          </div>

          <div className="md:hidden">
            <ArticleCarousel articles={researchArticles} />
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {researchArticles.map((article) => (
              <ArticleCards
                key={article.id}
                title={article.title}
                date={article.body_updated_at_formatted}
                slug={article.slug}
              />
            ))}
          </div>
        </section>
      )}
      {/* OthersSection */}
      {othersArticles.length !== 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Others</h2>
            <Link
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              href="/categories/others"
            >
              All Articles
              <ArrowRight className="h-4 w-4 mr-2" />
            </Link>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:hidden">
              <ArticleCarousel articles={othersArticles} />
            </div>
            <div className="hidden md:grid md:grid-cols-3 md:gap-6">
              {othersArticles.map((article) => (
                <ArticleCards
                  key={article.id}
                  title={article.title}
                  date={article.body_updated_at_formatted}
                  slug={article.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
