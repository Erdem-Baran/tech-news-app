import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { fetchRedditPosts } from "../redux/PostsSlice";
import type { AppDispatch, RootState } from "../redux/Store";
import { formatCompactNumber } from "../utils/NumberUtils";
import { truncateText } from "../utils/StringUtils";
import { formatTimeAgo } from "../utils/DateUtils";


function Reddit() {
  const dispatch = useAppDispatch<AppDispatch>();
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

  const redditPosts = items.filter((post) => post.source === "reddit");

  useEffect(() => {
    dispatch(fetchRedditPosts("webdev"));
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-2xl">Loading Reddit posts...</div>
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
        <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-semibold">
          REDDIT
        </span>
        <h2 className="text-3xl font-bold text-white">r/webdev Posts</h2>
      </div>
      <div className="space-y-4">
        {redditPosts.map((post: any) => (
          <div
            key={post.id}
            className="bg-slate-800 p-6 rounded-lg hover:bg-slate-750 transition-colors border-l-4 border-orange-600"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <h3 className="text-xl text-white hover:text-blue-400 transition-colors">
                {truncateText(post.title, 80)}
              </h3>
            </a>
            <p className="text-gray-400 text-sm mt-2">
              by {post.author} • {formatCompactNumber(post.comments)} comments
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {formatTimeAgo(post.timeStamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reddit;
