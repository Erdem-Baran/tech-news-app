import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/Types";

interface PostsState {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchRedditPosts = createAsyncThunk(
  "posts/fetchRedditPosts",
  async (subreddit: string = "webdev") => {
    const response = await fetch(
      `/api/reddit/r/${subreddit}/hot.json?limit=10`
    );
    const json = await response.json();

    const posts: Post[] = json.data.children.map((child: any) => {
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
    return posts;
  }
);

export const fetchDevToPosts = createAsyncThunk(
  "posts/fetchDevToPosts",
  async (tag: string = "webdev") => {
    const response = await fetch(
      `https://dev.to/api/articles?tag=${tag}&top=7&per_page=10`
    );
    const json = await response.json();
    if (!Array.isArray(json)) {
      throw new Error("Dev.to API error");
    }
    const posts: Post[] = json.map((article: any) => {
      return {
        id: `devto-${article.id.toString()}`,
        title: article.title,
        url: article.url,
        author: article.user.name,
        source: "devto",
        timeStamp: new Date(article.published_timestamp).getTime(),
        score: article.positive_reactions_count,
        comments: article.comments_count,
        thumbnail: article.cover_image || undefined,
      };
    });
    return posts;
  }
);

export const fetchHackerNewsPosts = createAsyncThunk(
  "posts/fetchHackerNewsPosts",
  async () => {
    const topStoriesResponse = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const topStoryIds = await topStoriesResponse.json();

    const storyPromises = topStoryIds.slice(0, 10).map(async (id: number) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    });

    const stories = await Promise.all(storyPromises);

    const posts: Post[] = stories.map((story: any) => ({
      id: `hackernews-${story.id.toString()}`,
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      author: story.by,
      source: "hackernews",
      timeStamp: story.time * 1000,
      score: story.score,
      comments: story.descendants || 0,
      thumbnail: undefined,
    }));

    return posts;
  }
);

// Async thunk for searching Reddit posts
export const searchRedditPosts = createAsyncThunk(
  "posts/searchRedditPosts",
  async (query: string) => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${query}&sort=relevance&t=all&limit=10`
    );
    const json = await response.json();

    const posts: Post[] = json.data.children.map((child: any) => {
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
    return posts;
  }
);

// Async thunk for searching Dev.to posts
export const searchDevToPosts = createAsyncThunk(
  "posts/searchDevToPosts",
  async (query: string) => {
    const response = await fetch(
      `https://dev.to/api/articles?tag=${query}&top=7&per_page=10`
    );
    const json = await response.json();
    if (!Array.isArray(json)) return [];

    const posts: Post[] = json.map((article: any) => ({
      id: `devto-${article.id.toString()}`,
      title: article.title,
      url: article.url,
      author: article.user.name,
      source: "devto",
      timeStamp: new Date(article.published_timestamp).getTime(),
      score: article.positive_reactions_count,
      comments: article.comments_count,
      thumbnail: article.cover_image || undefined,
    }));
    return posts;
  }
);

// Async thunk for searching Hacker News posts
export const searchHackerNewsPosts = createAsyncThunk(
  "posts/searchHackerNewsPosts",
  async (query: string) => {
    // Hacker News için Algolia Search API kullanımı
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=10`
    );
    const json = await response.json();

    const posts: Post[] = json.hits.map((story: any) => ({
      id: `hackernews-${story.objectID}`,
      title: story.title,
      url:
        story.url || `https://news.ycombinator.com/item?id=${story.objectID}`,
      author: story.author,
      source: "hackernews",
      timeStamp: new Date(story.created_at).getTime(),
      score: story.points,
      comments: story.num_comments,
      thumbnail: undefined,
    }));
    return posts;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (
      state: PostsState,
      action: PayloadAction<Post[]>
    ) => {
      state.status = "succeeded";

      const uniqueNewItems = action.payload.filter(
        (newItem) =>
          !state.items.some((existingItem) => existingItem.id === newItem.id)
      );

      state.items = [...state.items, ...uniqueNewItems];
    };

    builder
      .addCase(fetchRedditPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchRedditPosts.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchRedditPosts.fulfilled, handleFulfilled)
      .addCase(searchRedditPosts.fulfilled, handleFulfilled)
      .addCase(fetchRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Reddit data could not be retrieved";
      });

    builder
      .addCase(fetchDevToPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchDevToPosts.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchDevToPosts.fulfilled, handleFulfilled)
      .addCase(searchDevToPosts.fulfilled, handleFulfilled)
      .addCase(fetchDevToPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Dev.to data could not be retrieved";
      });

    builder
      .addCase(fetchHackerNewsPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchHackerNewsPosts.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchHackerNewsPosts.fulfilled, handleFulfilled)
      .addCase(searchHackerNewsPosts.fulfilled, handleFulfilled)
      .addCase(fetchHackerNewsPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Hacker News data could not be retrieved";
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
