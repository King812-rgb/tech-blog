import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // 必要な言語を明示的にimport
import { format } from "date-fns";
import { ArticleDetail } from "../../../types/ArticleDetail";
const GITHUB_API_URL =
  "https://api.github.com/repos/King812-rgb/zenn-contents/contents/articles/";

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {
  const validLang = Prism.languages[lang] ? lang : "plaintext";
  const highlighted = Prism.highlight(
    text,
    Prism.languages[validLang],
    validLang,
  );
  return `<pre><code class="language-${validLang}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

export async function getArticleDetail(slug: string): Promise<ArticleDetail> {
  const markdownContent = await fetchArticleDetail(slug);
  if (!markdownContent) {
    return null;
  }
  const formatedMarkdownContent = formatMetaBlock(markdownContent);
  const articleDetail = await convertContentFromMarkdownToHtml(
    formatedMarkdownContent,
  );

  // get category info from slug
  const parts = slug.split("_");
  const category = parts.length == 2 ? parts[0] : "others";
  return {
    ...articleDetail,
    category,
  };
}

export async function fetchArticleDetail(slug: string): Promise<string> {
  try {
    let markdownContent = "";
    const response = await fetch(`${GITHUB_API_URL}${slug}.md`);

    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`API status is ${response.status}`);
    }
    const json = await response.json();
    markdownContent = Buffer.from(json.content, "base64").toString("utf-8");

    return markdownContent;
  } catch (error) {
    throw new Error(`Error fetch article detail: ${(error as Error).message}`);
  }
}

export const formatMetaBlock = (content: string): ArticleDetail => {
  try {
    const metadataRegex = /^---([\s\S]+?)---/;
    const metadataMatch = metadataRegex.exec(content);
    if (!metadataMatch) {
      throw new Error("Invalid article format: Missing metadata section");
    }
    const metadataBlock = metadataMatch[1];

    const metadata: Partial<ArticleDetail> = {};
    metadataBlock.split("\n").forEach((line) => {
      const lineRegex = /^(\w+):\s*(.*)$/;
      const match = lineRegex.exec(line);
      if (match) {
        const key = match[1];
        let value: string | boolean = match[2];

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        if (value.startsWith("[") && value.endsWith("]")) {
          try {
            value = JSON.parse(value);
          } catch {
            throw new Error(`Invalid JSON array in key: ${key}`);
          }
        } else if (value === "true" || value === "false") {
          value = value === "true";
        } else if (key === "date") {
          value = new Date(value.replace(/['"]/g, "")).toISOString();
        }
        metadata[key] = value as ArticleDetail[keyof ArticleDetail];
      }
    });
    const articleContent = content.replace(metadataMatch[0], "").trim();
    const formattedDate = metadata.date
      ? format(new Date(metadata.date), "MMM d, yyyy")
      : "";
    return {
      title: metadata.title || "",
      emoji: metadata.emoji || "",
      topics: metadata.topics || [],
      published: metadata.published || false,
      date: metadata.date || new Date().toISOString(),
      date_formatted: formattedDate,
      content: articleContent,
      category: "",
    };
  } catch (error) {
    throw new Error(`Error pasing metadata:${(error as Error).message}`);
  }
};

export async function convertContentFromMarkdownToHtml(
  content: ArticleDetail,
): Promise<ArticleDetail> {
  try {
    const contentHtml = await marked.parse(content.content);
    return {
      ...content,
      content: contentHtml,
    };
  } catch (error) {
    throw new Error(
      `Error converting article detail from md to html:${(error as Error).message}`,
    );
  }
}
