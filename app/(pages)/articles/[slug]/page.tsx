import { getArticleDetail } from "@/lib/api/github/getArticleDetail";
import { ShareButton } from "@/components/ShareButton";
import { BackButton } from "@/components/BackButton";
import { FiClock } from "react-icons/fi";
import { notFound } from "next/navigation";

export default async function ArticlePages({
  params,
}: {
  readonly params: Promise<{ readonly slug: string }>;
}) {
  const { slug } = await params;
  const articleDetail = await getArticleDetail(slug);
  if (!articleDetail) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-8xl mx-auto">
        <BackButton />
        {/* category */}
        <div className="flex items-center gap-2 text-sm text-red-400 mt-8 mb-2">
          <span>{articleDetail.category}</span>
        </div>

        {/* title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {articleDetail.title}
        </h1>

        {/* date */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <FiClock size={16} />
          <div>{articleDetail.date_formatted}</div>
        </div>

        {/* share button */}
        <ShareButton></ShareButton>

        {/* content */}
        <div
          className="prose prose-invert prose-purple max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-gray-300 prose-pre:bg-gray-800 prose-pre:text-gray-300 prose-headings:border-b prose-headings:border-gray-700 prose-headings:pb-2 prose-headings:mb-4 prose-img:w-full prose-img:h-auto prose-img:max-w-2xl prose-img:mx-auto md:prose-img:mx-0 mt-8"
          dangerouslySetInnerHTML={{ __html: articleDetail.content }}
        />
      </div>
    </div>
  );
}
