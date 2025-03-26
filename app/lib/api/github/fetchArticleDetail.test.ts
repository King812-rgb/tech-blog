import { fetchArticleDetail } from "./getArticleDetail";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
const fetchMock = fetch as jest.Mock as jest.MockedFunction<typeof fetch>;
const GITHUB_API_URL =
  "https://api.github.com/repos/King812-rgb/zenn-contents/contents/articles/";

describe("fetchArticleDetail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch article detail successfully", async () => {
    const mockSlug = "category_article-title-nomal";
    const mockResponse = {
      content: Buffer.from(
        `
  ---
  title: "Test Article"
  emoji: "📖"
  topics: ["test", "article"]
  published: true
  date: "2023-01-01"
  ---
  # Article Content
  This is a test article.
        `,
      ).toString("base64"),
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    } as unknown as Response);

    const markdownContent: string = await fetchArticleDetail(mockSlug);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(GITHUB_API_URL + mockSlug + ".md");
    expect(markdownContent).toContain('title: "Test Article"');
    expect(markdownContent).toContain("# Article Content");
  });

  it("should call notFound when the article is not found", async () => {
    const mockSlug = "category_article-title-abnormal1";

    fetchMock.mockResolvedValueOnce({
      status: 404,
    } as unknown as Response);

    await expect(fetchArticleDetail(mockSlug)).resolves.toBeNull();
  });

  it("should call notFound when the article is not found", async () => {
    const mockSlug = "category_article-title-abnormal2";

    fetchMock.mockResolvedValueOnce({
      status: 500,
    } as unknown as Response);

    await expect(fetchArticleDetail(mockSlug)).rejects.toThrow(
      "Error fetch article detail: API status is 500",
    );
  });
});
