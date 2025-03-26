import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import "../global.css";
import { FiClock } from "react-icons/fi";

type ArticleCardsProps = {
  readonly title: string;
  readonly date: string;
  readonly slug: string;
};

export function ArticleCards({ title, date, slug }: ArticleCardsProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-red-400 transition-colors">
      <CardHeader className="mb-15 h-16">
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FiClock size={16} />
          <span>{date}</span>
        </div>
        <Link
          href={`/articles/${slug}/`}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          Read →
        </Link>
      </CardFooter>
    </Card>
  );
}
