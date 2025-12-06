import { useAppSelector } from "../hooks/ReduxHooks";
import PostCard from "../components/PostCards";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useAppSelector((state) => state.posts);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="bg-slate-800 p-6 rounded-full mb-4">
          <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No favorites yet</h2>
        <p className="text-gray-400 mb-6">Click the heart icon to save the news you like.</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          Discover News &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
          FAVORITES
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Posts ({favorites.length})</h2>
      </div>

      <div className="space-y-4">
        {favorites.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;