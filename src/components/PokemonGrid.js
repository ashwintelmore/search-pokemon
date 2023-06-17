import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonGrid({ pokemonData }) {
    return (
        <div className="pokemon-grid">
            {pokemonData.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default PokemonGrid;
