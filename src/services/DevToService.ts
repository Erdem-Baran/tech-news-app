import type { Post } from "../types/Types";

export const DevToService = {
  getArticles: async (tag: string = "webdev"): Promise<Post[]> => {
    const response = await fetch(`https://dev.to/api/articles?tag=${tag}&top=7&per_page=10`);
    const json = await response.json();
    
    if (!Array.isArray(json)) return [];

    return json.map((article: any) => ({
      id: `devto-${article.id}`,
      title: article.title,
      url: article.url,
      author: article.user.name,
      source: "devto",
      timeStamp: article.published_timestamp,
      score: article.positive_reactions_count,
      comments: article.comments_count,
      thumbnail: article.cover_image || undefined,
    }));
  }
};