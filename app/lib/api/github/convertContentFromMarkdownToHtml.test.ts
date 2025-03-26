import { convertContentFromMarkdownToHtml } from "./getArticleDetail";
import { ArticleDetail } from "@/types/ArticleDetail";

describe("convertContentFromMarkdownToHtml", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should convert markdown content to HTML successfully", async () => {
    const mockContent: ArticleDetail = {
      title: "Test Article",
      emoji: "📖",
      topics: ["test", "article"],
      published: true,
      date: "2023-01-01T00:00:00.000Z",
      date_formatted: "Jan 1, 2023",
      content: `# Article Content
This is a test article.`,
      category: "",
    };

    const result = await convertContentFromMarkdownToHtml(mockContent);

    expect(result.title).toBe("Test Article");
    expect(result.emoji).toBe("📖");
    expect(result.topics).toEqual(["test", "article"]);
    expect(result.published).toBe(true);
    expect(result.date).toBe("2023-01-01T00:00:00.000Z");
    expect(result.date_formatted).toBe("Jan 1, 2023");
    expect(result.category).toBe("");
    expect(result.content).toContain("<h1>Article Content</h1>");
    expect(result.content).toContain("<p>This is a test article.</p>");
  });

  it("should throw an error when conversion fails", async () => {
    const mockContent: ArticleDetail = {
      title: "Test Article",
      emoji: "📖",
      topics: ["test", "article"],
      published: true,
      date: "2023-01-01T00:00:00.000Z",
      date_formatted: "Jan 1, 2023",
      category: "",
      content: null,
    };

    await expect(convertContentFromMarkdownToHtml(mockContent)).rejects.toThrow(
      "Error converting article detail from md to html:marked(): input parameter is undefined or null",
    );
  });

  it("should convert markdown content to HTML", async () => {
    const mockContent: ArticleDetail = {
      title: "Test Article",
      emoji: "📖",
      topics: ["test", "article"],
      published: true,
      date: "2023-01-01T00:00:00.000Z",
      date_formatted: "Jan 1, 2023",
      content: `
# Article Content
This is a test article.

\`\`\`javascript
console.log("Hello, world!");
\`\`\`
      `,
      category: "",
    };

    const result = await convertContentFromMarkdownToHtml(mockContent);

    expect(result.content).toContain('<pre><code class="language-javascript">');
    expect(result.content).toContain("Hello, world!");
    expect(result.content).toContain("</code></pre>");
  });

  it("should highlight code with a valid language and fallback to plaintext", async () => {
    const mockContent: ArticleDetail = {
      title: "Test Article",
      emoji: "📖",
      topics: ["test", "article"],
      published: true,
      date: "2023-01-01T00:00:00.000Z",
      date_formatted: "Jan 1, 2023",
      content: `
# Article Content
This is a test article.

\`\`\`xxx
console.log("Hello, world!");
\`\`\`
      `,
      category: "",
    };

    const result = await convertContentFromMarkdownToHtml(mockContent);
    expect(result.content).toContain('<pre><code class="language-plaintext">');
    expect(result.content).toContain("Hello, world!");
    expect(result.content).toContain("</code></pre>");
  });
});
