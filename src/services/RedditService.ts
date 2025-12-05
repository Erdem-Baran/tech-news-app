import type { Post } from "../types/Types";

export const RedditService = {
  getHotPosts: async (subreddit: string = "webdev"): Promise<Post[]> => {
    const response = await fetch(`/api/reddit/r/${subreddit}/hot.json?limit=10`);
    const json = await response.json();

    return json.data.children.map((child: any) => {
      const data = child.data;
      return {
        id: `reddit-${data.id}`,
        title: data.title,
        url: data.url,
        author: data.author,
        source: "reddit",
        timeStamp: data.created_utc * 1000,
        score: data.score,
        comments: data.num_comments,
        thumbnail: data.thumbnail && data.thumbnail.startsWith("http") ? data.thumbnail : undefined,
      };
    });
  },

  search: async (query: string): Promise<Post[]> => {
    const response = await fetch(`/api/reddit/search.json?q=${query}&sort=relevance&t=all&limit=10`);
    const json = await response.json();

    return json.data.children.map((child: any) => {
      const data = child.data;
      return {
        id: `reddit-${data.id}`,
        title: data.title,
        url: data.url,
        author: data.author,
        source: "reddit",
        timeStamp: data.created_utc * 1000,
        score: data.score,
        comments: data.num_comments,
        thumbnail: data.thumbnail && data.thumbnail.startsWith("http") ? data.thumbnail : undefined,
      };
    });
  }
};