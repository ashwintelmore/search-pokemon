import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';
import BookmarksPage from './pages/BookmarkPage';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<SearchPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/details/:pokemonId" element={<DetailsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
