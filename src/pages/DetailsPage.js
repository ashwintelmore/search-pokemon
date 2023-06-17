import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '../components/BookmarkIcon';

function DetailsPage() {
    const { pokemonId } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    };

    return (
        <div>
            <h1>Pokemon Details</h1>
            <h2>Pokemon ID: {pokemonId}</h2>
            <h3>Other details...</h3>
            <BookmarkIcon
                isBookmarked={isBookmarked}
                onClick={handleBookmarkClick}
            />
        </div>
    );
}

export default DetailsPage;
