import { formatMetaBlock } from "./getArticleDetail";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("formatMetaBlock", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should format meta block successfully", async () => {
    const mockContent = `---title: "Test Article"
emoji: "📖"
topics: ["test", "article"]
published: true
date: '2023-01-01'---# Article Content
This is a test article.
`;

    const formattedContent = formatMetaBlock(mockContent);
    expect(formattedContent).toEqual({
      title: "Test Article",
      emoji: "📖",
      topics: ["test", "article"],
      published: true,
      date: "2023-01-01T00:00:00.000Z",
      date_formatted: "Jan 1, 2023",
      content: "# Article Content\nThis is a test article.",
      category: "",
    });
  });

  it("should throw an error for invalid format", () => {
    const invalidMarkdownContent = `
# Article Content
This is a test article without metadata.
    `;

    expect(() => formatMetaBlock(invalidMarkdownContent)).toThrow(
      "Invalid article format: Missing metadata section",
    );
  });

  it("should throw an error if topics is not a valid JSON array", () => {
    const markdownContent = `---
title: "Test Article"
topics: ["valid", "array", "but", "invalid_json]---# Article Content
This is a test article.
    `;

    expect(() => formatMetaBlock(markdownContent)).toThrow(
      "Invalid JSON array in key: topics",
    );
  });

  it("should set default values if metadata is missing", async () => {
    const mockContent = `---
---# Article Content
This is a test article.
`;

    const formattedContent = formatMetaBlock(mockContent);
    expect(formattedContent.title).toBe("");
    expect(formattedContent.emoji).toBe("");
    expect(formattedContent.topics).toEqual([]);
    expect(formattedContent.published).toBe(false);
    expect(formattedContent.date).toBeDefined();
    expect(formattedContent.date_formatted).toBeDefined();
  });
});
