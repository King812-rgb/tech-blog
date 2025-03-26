import { getArticleDetail } from "./getArticleDetail";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
const fetchMock = fetch as jest.Mock as jest.MockedFunction<typeof fetch>;

describe("getArticleDetail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return complete article detail including HTML and category", async () => {
    const mockSlug = "tech_article-title";
    const mockMarkdown = `---title: "Test"
emoji: "🔥"
topics: ["code"]
published: true
date: "2023-01-01"---# Hello
This is markdown.
  `;

    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          content: Buffer.from(mockMarkdown).toString("base64"),
        }),
    } as unknown as Response);

    const result = await getArticleDetail(mockSlug);

    expect(result.title).toBe("Test");
    expect(result.content).toContain("<h1>Hello</h1>");
    expect(result.category).toBe("tech");
  });

  it("should return article detail with category as 'others' when slug is invalid", async () => {
    const mockSlug = "article-title";
    const mockMarkdown = `---title: "Test"
emoji: "🔥"
topics: ["code"]
published: true
date: "2023-01-01"---# Hello
This is markdown.
  `;

    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          content: Buffer.from(mockMarkdown).toString("base64"),
        }),
    } as unknown as Response);

    const result = await getArticleDetail(mockSlug);

    expect(result.category).toBe("others");
  });

  it("should return null when the article is not found", async () => {
    const mockSlug = "tech_article-title-not-found";
    fetchMock.mockResolvedValueOnce({
      status: 404,
    } as unknown as Response);

    const result = await getArticleDetail(mockSlug);

    expect(result).toBeNull();
  });

  it("should throw an error when the article is not found", async () => {
    const mockSlug = "tech_article-title-not-found";
    fetchMock.mockResolvedValueOnce({
      status: 500,
    } as unknown as Response);

    await expect(getArticleDetail(mockSlug)).rejects.toThrow(
      "Error fetch article detail: API status is 500",
    );
  });
});
