import { useAppSelector } from "../hooks/ReduxHooks";
import { formatCompactNumber } from "../utils/NumberUtils";
import { truncateText } from "../utils/StringUtils";
import { formatTimeAgo } from "../utils/DateUtils";
import type { RootState } from "../redux/Store";

function Home() {
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

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
        {items.map((post: any) => (
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
                    {truncateText(post.title, 80)}
                  </h3>
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  by {post.author} • {formatCompactNumber(post.comments)}{" "}
                  comments
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {formatTimeAgo(post.timeStamp)}
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
