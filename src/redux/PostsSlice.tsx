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
    
    const handleFulfilled = (state: PostsState, action: PayloadAction<Post[]>) => {
      state.status = "succeeded";
      
      
      const uniqueNewItems = action.payload.filter(
        newItem => !state.items.some(existingItem => existingItem.id === newItem.id)
      );
      
      state.items = [...state.items, ...uniqueNewItems];
    };

    
    builder
      .addCase(fetchRedditPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRedditPosts.fulfilled, handleFulfilled) 
      .addCase(fetchRedditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Reddit data could not be retrieved";
      });

    
    builder
      .addCase(fetchDevToPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDevToPosts.fulfilled, handleFulfilled) 
      .addCase(fetchDevToPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Dev.to data could not be retrieved";
      });

    
    builder
      .addCase(fetchHackerNewsPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHackerNewsPosts.fulfilled, handleFulfilled) 
      .addCase(fetchHackerNewsPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Hacker News data could not be retrieved";
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;