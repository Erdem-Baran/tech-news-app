import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Reddit from './pages/Reddit';
import DevTo from './pages/Devto';
import HackerNews from './pages/Hackernews';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "reddit",
        element: <Reddit />,
      },
      {
        path: "devto",
        element: <DevTo />,
      },
      {
        path: "hackernews",
        element: <HackerNews />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;