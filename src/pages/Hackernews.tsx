import { useAppSelector } from "../hooks/ReduxHooks";
import type { RootState } from "../redux/Store";
import PostCard from "../components/PostCards";

function HackerNews() {
  const { items, status, error } = useAppSelector(
    (state: RootState) => state.posts
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-2xl">Loading Hacker News posts...</div>
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
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xl">No results found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
          HACKER NEWS
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          webdev Posts
        </h2>
      </div>
      <div className="space-y-4">
        {items.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default HackerNews;
