import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { toggleFavorite } from "../redux/PostsSlice";
import type { Post } from "../types/Types";
import { formatCompactNumber } from "../utils/NumberUtils";
import { truncateText } from "../utils/StringUtils";
import { formatTimeAgo } from "../utils/DateUtils";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();
  
  const isFavorite = useAppSelector((state) =>
    state.posts.favorites.some((fav) => fav.id === post.id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(post));
  };

  const borderColorClass =
    post.source === "reddit"
      ? "border-orange-600"
      : post.source === "devto"
      ? "border-purple-600"
      : "border-orange-500";

  return (
    <div
      className={`bg-white dark:bg-slate-800 shadow-sm p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border-l-4 ${borderColorClass} relative group`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-10">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 block"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {truncateText(post.title, 100)}
            </h3>
          </a>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            by {post.author} • {formatCompactNumber(post.comments)} comments
            {post.score > 0 && ` • ${formatCompactNumber(post.score)} points`}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {formatTimeAgo(post.timeStamp)}
          </p>
        </div>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="thumbnail"
            className="w-20 h-20 object-cover rounded ml-4 hidden sm:block"
          />
        )}
      </div>

      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          className={`w-6 h-6 ${
            isFavorite ? "text-red-500 fill-current" : "text-gray-400 dark:text-gray-500"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default PostCard;