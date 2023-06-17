import React from 'react';
import BookmarkIcon from './BookmarkIcon';

function PokemonCard({ pokemon }) {
    const handleBookmarkClick = () => {
        // Handle bookmark click here
    };

    return (
        <div className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <BookmarkIcon onClick={handleBookmarkClick} />
        </div>
    );
}

export default PokemonCard;
