import type { Post } from "../types/Types";

export const RedditService = {
  getHotPosts: async (subreddit: string = "webdev"): Promise<Post[]> => {
    try {
      const response = await fetch(
        `/api/reddit/r/${subreddit}/hot.json?limit=10`
      );

      if (!response.ok) {
        console.error(
          `Reddit API Hatası: ${response.status} - ${response.statusText}`
        );
        return [];
      }

      const json = await response.json();

      if (!json.data || !json.data.children) {
        console.warn("Reddit verisi beklenen formatta değil:", json);
        return [];
      }

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
          thumbnail:
            data.thumbnail && data.thumbnail.startsWith("http")
              ? data.thumbnail
              : undefined,
        };
      });
    } catch (error) {
      console.error("Reddit Servis Hatası:", error);
      return [];
    }
  },

  search: async (query: string): Promise<Post[]> => {
    try {
      const response = await fetch(
       `/api/reddit/search.json?q=${query}&sort=relevance&t=all&limit=10`
      );

      if (!response.ok) {
        console.error(`Reddit Arama API Hatası: ${response.status}`);
        return [];
      }

      const json = await response.json();

      if (!json.data || !json.data.children) {
        return [];
      }

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
          thumbnail:
            data.thumbnail && data.thumbnail.startsWith("http")
              ? data.thumbnail
              : undefined,
        };
      });
    } catch (error) {
      console.error("Reddit Arama Servis Hatası:", error);
      return [];
    }
  },
};
