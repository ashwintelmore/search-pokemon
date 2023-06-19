import React from 'react';
import { useBookmark } from '../Provider/Pokemon';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

function BookmarksPage() {

    const bookmarks = useBookmark()
    const handleBookmarkClick = (pokemon) => {

        const temp = bookmarks.bookmarks.filter(e => pokemon.name != e.name);
        bookmarks.setbookmarks(temp)
    };

    return (
        <div>
            <h1>Bookmarked Pokemon</h1>
            <p>List of bookmarked Pokemon</p>
            {
                !bookmarks.bookmarks.length ?
                    <p>no bookmarks</p>
                    :
                    <div className="movie-grid">
                        {bookmarks.bookmarks.map((pokemon, i) => (
                            <div>
                                <Link
                                    key={pokemon.name}
                                    to={`/details/${pokemon.name}`}
                                    className="movie-card">
                                    <img
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name} />
                                </Link>
                                <p>{pokemon.name}</p>
                                <p
                                    onClick={() => handleBookmarkClick(pokemon)}
                                >
                                    <i class="fa-solid fa-bookmark"></i>
                                </p>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}

export default BookmarksPage;
