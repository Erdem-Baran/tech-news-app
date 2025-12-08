import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/ReduxHooks";
import { useDebounce } from "../hooks/useDebounce";
import ThemeToggle from "../components/ThemeToggle";
import {
  clearPosts,
  searchDevToPosts,
  searchHackerNewsPosts,
  fetchDevToPosts,
  fetchHackerNewsPosts,
} from "../redux/PostsSlice";

function MainLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 2) {
      dispatch(clearPosts());

       if (location.pathname === "/devto") {
        dispatch(searchDevToPosts(debouncedSearchTerm));
      } else if (location.pathname === "/hackernews") {
        dispatch(searchHackerNewsPosts(debouncedSearchTerm));
      } else {
        dispatch(searchDevToPosts(debouncedSearchTerm));
        dispatch(searchHackerNewsPosts(debouncedSearchTerm));
      }
    } else {
      dispatch(clearPosts());

       if (location.pathname === "/devto") {
        dispatch(fetchDevToPosts("webdev"));
      } else if (location.pathname === "/hackernews") {
        dispatch(fetchHackerNewsPosts());
      } else {
        dispatch(fetchDevToPosts("webdev"));
        dispatch(fetchHackerNewsPosts());
      }
    }
  }, [debouncedSearchTerm, location.pathname, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header/Navbar */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/" className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Tech News <span className="text-blue-500">Dashboard</span>
                </h1>
              </Link>

              {/* Mobile Controls (Theme Toggle + Hamburger) */}
              <div className="flex items-center gap-2 md:hidden">
                <ThemeToggle />
                
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72 order-2 md:order-0 flex items-center gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search the news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              {/* Desktop Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All Posts
              </Link>
              <Link
                to="/devto"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/devto")
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Dev.to
              </Link>
              <Link
                to="/hackernews"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/hackernews")
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Hacker News
              </Link>
              <Link
                to="/favorites"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/favorites")
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Favorites
              </Link>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-600/30"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All Posts
              </Link>
              <Link
                to="/devto"
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive("/devto")
                    ? "bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-600/30"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Dev.to
              </Link>
              <Link
                to="/hackernews"
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive("/hackernews")
                    ? "bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Hacker News
              </Link>
              <Link
                to="/favorites"
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive("/favorites")
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Favorites
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Tech News Dashboard • Powered by Dev.to & Hacker News
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;