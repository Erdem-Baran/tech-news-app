import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import {
  fetchRedditPosts,
  fetchDevToPosts,
  fetchHackerNewsPosts,
} from "../redux/PostsSlice";
import type { AppDispatch, RootState } from "../redux/Store";

function Home() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchRedditPosts("webdev"));
    dispatch(fetchDevToPosts("webdev"));
    dispatch(fetchHackerNewsPosts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">All Tech News</h2>
      <div className="space-y-4">
        {items.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 p-6 rounded-lg hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    post.source === "reddit"
                      ? "bg-orange-600"
                      : post.source === "devto"
                      ? "bg-purple-600"
                      : "bg-orange-500"
                  } text-white inline-block mb-2`}
                >
                  {post.source}
                </span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  <h3 className="text-xl text-white mt-2 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  by {post.author} • {post.comments} comments
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
