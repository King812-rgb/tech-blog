"use client";
import useEmblaCarousel from "embla-carousel-react";
import { Article } from "../types/Article";
import { ArticleCards } from "./ArticleCards";

type ArticleCarouselProps = {
  readonly articles: readonly Article[];
};

export function ArticleCarousel({ articles }: ArticleCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {articles.map((article) => (
          <div key={article.id} className="flex-[0_0_85%] min-w-0">
            <ArticleCards
              title={article.title}
              date={article.body_updated_at_formatted}
              slug={article.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
