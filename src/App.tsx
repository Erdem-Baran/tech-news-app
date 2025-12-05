import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Reddit from './pages/Reddit';
import DevTo from './pages/Devto';
import HackerNews from './pages/Hackernews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="reddit" element={<Reddit />} />
          <Route path="devto" element={<DevTo />} />
          <Route path="hackernews" element={<HackerNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;