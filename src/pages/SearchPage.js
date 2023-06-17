import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { getAbilityByName, getPokemon, getPokemonAbilityByName, searchPokemon } from '../api/pokemonApi';
import ListingPage from './ListingPage';
import Filtering from '../components/Filtering';

function SearchPage() {
    // const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState({
        search: false,
        pagination: false,
    })
    const [error, setError] = useState('');
    const [selectedAbility, setSelectedAbility] = useState(null)

    const handleSearch = async () => {
        setLoading({ ...loading, search: true })
        setError('');
        if (searchQuery == '') {
            setSelectedAbility(null)
            setPage(0)
            setPokemonList([])
            setLoading({ ...loading, search: false })
            return
        }
        try {
            const response = await searchPokemon(searchQuery);
            setPokemonList(response)
            console.log('response', response)
        } catch (error) {
            setPokemonList([])
            setError(error.message);
        }
        setLoading({ ...loading, search: false })
    };

    const loadPokemonList = async () => {
        setLoading({ ...loading, pagination: true })
        setError('');
        try {
            const response = await getPokemon(page);
            setPokemonList(pr => [...pr, ...response])
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setLoading({ ...loading, pagination: false })
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1
            >= document.documentElement.scrollHeight
        ) {
            setPage(p => p + 10)
        }
    };


    useEffect(() => {
        if (page == 0)
            setPokemonList([])
        if (!selectedAbility)
            loadPokemonList();
    }, [page]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setPokemonList([])
        };
    }, []);

    return (
        <div className='mx-auto w-3/4'>
            <h1 className='text-center text-5xl my-7 font-bold'>Pokemon Search</h1>
            <Filtering
                selectedAbility={selectedAbility}
                setSelectedAbility={(value) => setSelectedAbility(value)}
                setPokemonList={(value) => setPokemonList(value)}
                loading={loading}
                setLoading={(value) => setLoading(value)}
                setPagePok={(value) => setPage(value)}
            />
            <div className="search-container my-3">
                <input
                    type="text"
                    id="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    id="search-button"
                >Search</button>
            </div>

            {
                loading.search ?
                    <LoadingSpinner />
                    :

                    <div className="movie-grid">
                        {pokemonList.map((pokemon, i) => (

                            <Link
                                key={pokemon.name}
                                to={`/details/${pokemon.name}`}
                                className="movie-card">
                                <img
                                    src={pokemon.url}
                                    alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </Link>
                        ))}
                    </div>
            }
            {loading.pagination && <LoadingSpinner />}
            {error && <Error message={error} />}
        </div>
    );
}

export default SearchPage;
