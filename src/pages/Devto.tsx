import { useAppSelector } from "../hooks/ReduxHooks";
import type { RootState } from "../redux/Store";
import { formatCompactNumber } from "../utils/NumberUtils";
import { truncateText } from "../utils/StringUtils";
import { formatTimeAgo } from "../utils/DateUtils";

function DevTo() {
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

  const devtoPosts = items.filter((post) => post.source === "devto");


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

    if (status === "succeeded" && items.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-xl">No results found.</p>
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
        {devtoPosts.map((post: any) => (
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
                {truncateText(post.title, 80)}
              </h3>
            </a>
            <p className="text-gray-400 text-sm mt-2">
              by {post.author} • {formatCompactNumber(post.comments)} comments
            </p>
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt="thumbnail"
                className="w-20 h-20 object-cover rounded mt-2 hidden sm:block"
              />
            )}
            <p className="text-gray-400 text-sm mt-1">
              {formatTimeAgo(post.timeStamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevTo;
