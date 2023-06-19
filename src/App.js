import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';
import BookmarksPage from './pages/BookmarkPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='mx-auto w-3/4'>

        <Header />
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/details/:pokemonId" element={<DetailsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
