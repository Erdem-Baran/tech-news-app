export interface Post{
   id: string;
   title: string;
   author: string;
   score: number;
   comments: number;
   url: string;
   thumbnail?: string;
   subreddit?: string;
   source: 'reddit' | 'devto' | 'hackernews';
   content?: string;
   timeStamp: number;
}

export interface PostsState{
    posts: Post[];
    loading: boolean;
    error: string | null;
    favorites: string[];
}

export interface FilterState{
    searchTerm: string;
    source: 'all' | 'reddit' | 'devto' | 'hackernews';
    sortBy: 'popular' | 'recent' | 'comments';
    timeRange: 'today' | 'week' | 'month' | 'all';
}

export interface RootState{
    posts: PostsState;
    filters: FilterState;
}
