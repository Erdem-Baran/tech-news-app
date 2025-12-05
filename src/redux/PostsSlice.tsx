import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types/Types";
import { RedditService } from "../services/RedditService";
import { DevToService } from "../services/DevToService";
import { HackerNewsService } from "../services/HackerNewsService";

interface PostsState {
  items: Post[];
  favorites: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
} 
const savedFavorites = localStorage.getItem("favorites");

const initialState: PostsState = {
  items: [],
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
  status: "idle",
  error: null,
};


// REDDIT
export const fetchRedditPosts = createAsyncThunk("posts/fetchRedditPosts", async (subreddit: string = "webdev") => {
  return await RedditService.getHotPosts(subreddit);
});

export const searchRedditPosts = createAsyncThunk("posts/searchRedditPosts", async (query: string) => {
  return await RedditService.search(query);
});

// DEV.TO
export const fetchDevToPosts = createAsyncThunk("posts/fetchDevToPosts", async (tag: string = "webdev") => {
  return await DevToService.getArticles(tag);
});

export const searchDevToPosts = createAsyncThunk("posts/searchDevToPosts", async (query: string) => {
  return await DevToService.getArticles(query);
});

// HACKER NEWS
export const fetchHackerNewsPosts = createAsyncThunk("posts/fetchHackerNewsPosts", async () => {
  return await HackerNewsService.getTopStories();
});

export const searchHackerNewsPosts = createAsyncThunk("posts/searchHackerNewsPosts", async (query: string) => {
  return await HackerNewsService.search(query);
});

// --- SLICE ---
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    toggleFavorite(state, action: PayloadAction<Post>) {
      const post = action.payload;
      const existingIndex = state.favorites.findIndex((f) => f.id === post.id);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(post);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state: PostsState, action: PayloadAction<Post[]>) => {
      state.status = "succeeded";
      const uniqueNewItems = action.payload.filter(
        (newItem) => !state.items.some((existingItem) => existingItem.id === newItem.id)
      );
      state.items = [...state.items, ...uniqueNewItems];
    };

    const handleRejected = (state: PostsState, action: any, sourceName: string) => {
      state.status = "failed";
      state.error = action.error.message || `${sourceName} data could not be retrieved`;
    };

    builder
      // Reddit
      .addCase(fetchRedditPosts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchRedditPosts.fulfilled, handleFulfilled)
      .addCase(fetchRedditPosts.rejected, (state, action) => handleRejected(state, action, "Reddit"))
      .addCase(searchRedditPosts.pending, (state) => { state.status = "loading"; })
      .addCase(searchRedditPosts.fulfilled, handleFulfilled)
      .addCase(searchRedditPosts.rejected, (state, action) => handleRejected(state, action, "Reddit Search"))

      // Dev.to
      .addCase(fetchDevToPosts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchDevToPosts.fulfilled, handleFulfilled)
      .addCase(fetchDevToPosts.rejected, (state, action) => handleRejected(state, action, "Dev.to"))
      .addCase(searchDevToPosts.pending, (state) => { state.status = "loading"; })
      .addCase(searchDevToPosts.fulfilled, handleFulfilled)
      .addCase(searchDevToPosts.rejected, (state, action) => handleRejected(state, action, "Dev.to Search"))

      // Hacker News
      .addCase(fetchHackerNewsPosts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchHackerNewsPosts.fulfilled, handleFulfilled)
      .addCase(fetchHackerNewsPosts.rejected, (state, action) => handleRejected(state, action, "Hacker News"))
      .addCase(searchHackerNewsPosts.pending, (state) => { state.status = "loading"; })
      .addCase(searchHackerNewsPosts.fulfilled, handleFulfilled)
      .addCase(searchHackerNewsPosts.rejected, (state, action) => handleRejected(state, action, "Hacker News Search"));
  },
});

export const { clearPosts, toggleFavorite } = postsSlice.actions;
export default postsSlice.reducer;