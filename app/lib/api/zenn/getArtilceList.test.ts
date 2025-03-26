import { getArticleList } from "./getArtilceList";
import { Article } from "../../../types/Article";
import { jest } from "@jest/globals";

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
const fetchMock = fetch as jest.Mock as jest.MockedFunction<typeof fetch>;
const ZENN_API_URL = "https://zenn.dev/api/articles";
const USERNAME = "pizzarapper";
describe("getArticleList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch articles successfully", async () => {
    const mockResponse = {
      articles: [
        {
          id: 1,
          slug: "category1_article1",
          body_updated_at: "2023-01-01T00:00:00Z",
          title: "Test Article 1",
        },
        {
          id: 2,
          slug: "category2_article2",
          body_updated_at: "2023-01-02T00:00:00Z",
          title: "Test Article 2",
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as unknown as Response);

    const articles: Article[] = await getArticleList();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      ZENN_API_URL + "?username=" + USERNAME,
    );
    expect(articles).toHaveLength(2);
    expect(articles[0]).toEqual({
      id: 1,
      slug: "category1_article1",
      body_updated_at: "2023-01-01T00:00:00Z",
      title: "Test Article 1",
      category: "category1",
      body_updated_at_formatted: "Jan 1, 2023",
    });
  });

  it("should throw an error when the response is not ok", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(getArticleList()).rejects.toThrow(
      "Error fetching article list: article list API status:404",
    );
  });

  it("should return [] when no article", async () => {
    const mockResponse = {
      articles: [],
    };

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as unknown as Response);

    const articles: Article[] = await getArticleList();

    expect(articles).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledWith("no articles");
  });

  it("should return [] when articles is null", async () => {
    const mockResponse = {
      articles: null,
    };

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as unknown as Response);

    const articles: Article[] = await getArticleList();

    expect(articles).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledWith("no articles");
  });

  it("should return [] when data is null", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(null),
    } as unknown as Response);

    const articles: Article[] = await getArticleList();

    expect(articles).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledWith("no articles");

    consoleLogSpy.mockRestore();
  });
  it("should set category to 'others' when slug is invalid", async () => {
    const mockResponse = {
      articles: [
        {
          id: 3,
          slug: "invalidslug", // アンダースコアが含まれないスラグ
          body_updated_at: "2023-01-03T00:00:00Z",
          title: "Test Article 3",
        },
      ],
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as unknown as Response);

    const articles: Article[] = await getArticleList();

    expect(articles).toHaveLength(1);
    expect(articles[0]).toEqual({
      id: 3,
      slug: "invalidslug",
      body_updated_at: "2023-01-03T00:00:00Z",
      title: "Test Article 3",
      category: "others", // カテゴリが"others"に設定されることを確認
      body_updated_at_formatted: "Jan 3, 2023",
    });
  });
});
