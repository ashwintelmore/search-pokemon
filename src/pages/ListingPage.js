import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { getPokemon } from '../api/pokemonApi';

function ListingPage() {
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPokemonData();
    }, []);

    const loadPokemonData = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await getPokemon();
            // Handle successful API response here, e.g., store the data in state
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h1>Pokemon Listing</h1>
            {isLoading && <LoadingSpinner />}
            {error && <Error message={error} />}
            <div>
                {pokemonData.map((pokemon) => (
                    <Link key={pokemon.id} to={`/details/${pokemon.id}`}>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListingPage;
