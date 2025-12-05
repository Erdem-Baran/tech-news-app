import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks/ReduxHooks';
import { useDebounce } from '../hooks/useDebounce';
import { searchRedditPosts, searchDevToPosts, searchHackerNewsPosts, fetchRedditPosts, fetchDevToPosts, fetchHackerNewsPosts } from '../redux/PostsSlice';

function MainLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
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
      if (location.pathname === '/reddit') {
        dispatch(searchRedditPosts(debouncedSearchTerm));
      } else if (location.pathname === '/devto') {
        dispatch(searchDevToPosts(debouncedSearchTerm));
      } else if (location.pathname === '/hackernews') {
        dispatch(searchHackerNewsPosts(debouncedSearchTerm));
      } else {
        dispatch(searchRedditPosts(debouncedSearchTerm));
      }
    } else if (debouncedSearchTerm === "" && searchTerm !== "") {
    }
  }, [debouncedSearchTerm, location.pathname, dispatch]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header/Navbar */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Tech News Dashboard
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                All Posts
              </Link>
              <Link
                to="/reddit"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/reddit')
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Reddit
              </Link>
              <Link
                to="/devto"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/devto')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Dev.to
              </Link>
              <Link
                to="/hackernews"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/hackernews')
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Hacker News
              </Link>
            </nav>

            {/* search input */}
            <div className="relative w-full md:w-64 order-3 md:order-2">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <svg 
                className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
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

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 grid grid-cols-2 gap-3">
              <Link
                to="/"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-lg transition-colors text-center ${
                  isActive('/')
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                All Posts
              </Link>
              <Link
                to="/reddit"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-lg transition-colors text-center ${
                  isActive('/reddit')
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Reddit
              </Link>
              <Link
                to="/devto"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-lg transition-colors text-center ${
                  isActive('/devto')
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Dev.to
              </Link>
              <Link
                to="/hackernews"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-lg transition-colors text-center ${
                  isActive('/hackernews')
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Hacker News
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Tech News Dashboard • Powered by Reddit, Dev.to & Hacker News
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;