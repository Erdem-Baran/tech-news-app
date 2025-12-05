import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { fetchDevToPosts } from "../redux/PostsSlice";
import type { AppDispatch, RootState } from "../redux/Store";

function DevTo() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

  const devtoPosts = items.filter((post) => post.source === "devto");

  useEffect(() => {
    dispatch(fetchDevToPosts("webdev"));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-2xl">Loading Dev.to posts...</div>
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
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold">
          DEV.TO
        </span>
        <h2 className="text-3xl font-bold text-white">Dev.to Articles</h2>
      </div>
      <div className="space-y-4">
        {devtoPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 p-6 rounded-lg hover:bg-slate-750 transition-colors border-l-4 border-purple-600"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <h3 className="text-xl text-white hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
            </a>
            <p className="text-gray-400 text-sm mt-2">
              by {post.author} • {post.comments} comments
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevTo;
