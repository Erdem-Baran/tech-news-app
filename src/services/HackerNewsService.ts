import type { Post } from "../types/Types";

export const HackerNewsService = {
  getTopStories: async (): Promise<Post[]> => {
    const topStoriesResponse = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const topStoryIds = await topStoriesResponse.json();

    const storyPromises = topStoryIds.slice(0, 10).map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return storyResponse.json();
    });

    const stories = await Promise.all(storyPromises);

    return stories.map((story: any) => ({
      id: `hackernews-${story.id}`,
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      author: story.by,
      source: "hackernews",
      timeStamp: story.time * 1000,
      score: story.score,
      comments: story.descendants || 0,
      thumbnail: undefined,
    }));
  },

  search: async (query: string): Promise<Post[]> => {
    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=10`);
    const json = await response.json();

    return json.hits.map((story: any) => ({
      id: `hackernews-${story.objectID}`,
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.objectID}`,
      author: story.author,
      source: "hackernews",
      timeStamp: new Date(story.created_at).getTime(),
      score: story.points,
      comments: story.num_comments,
      thumbnail: undefined,
    }));
  }
};