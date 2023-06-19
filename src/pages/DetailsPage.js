import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkIcon from '../components/BookmarkIcon';
import { getDetailPokemon } from '../api/pokemonApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBookmark } from '../Provider/Pokemon';

function DetailsPage() {
    const { pokemonId } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState({
        pokemon: false,
    })
    const [error, setError] = useState('');

    const bookmarks = useBookmark()

    const loadPokemonDetails = async () => {
        setLoading({ ...loading, pokemon: true })
        setError('');
        try {
            const response = await getDetailPokemon(pokemonId);
            setPokemon(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setLoading({ ...loading, pokemon: false })
    };

    const handleBookmarkClick = () => {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);

        const index = bookmarks.bookmarks.findIndex(e => pokemon.name == e.name);
        const temp = [...bookmarks.bookmarks];

        if (index !== -1) {
            temp.splice(index, 1);
        } else {

            temp.push(pokemon);
        }
        bookmarks.setbookmarks(temp)
    };
    console.log('pokemon', pokemon)
    const getBookmark = () => {
        const index = bookmarks.bookmarks.findIndex(e => pokemon.name == e.name);
        console.log('bookmarks, pokemon , index', bookmarks, pokemon, index)
        if (index !== -1) {
            setIsBookmarked(true)
        } else {
            setIsBookmarked(false)
        }
    };
    // load pokemin details
    useEffect(() => {
        loadPokemonDetails()
    }, [])
    //bookmark
    useEffect(() => {
        if (pokemon.id)
            getBookmark()
    }, [pokemon])

    if (!pokemon.id) {
        return
    }
    if (loading.pokemon)
        return <LoadingSpinner />

    return (

        <div className=''>
            <h1>Pokemon Details</h1>
            <BookmarkIcon
                isBookmarked={isBookmarked}
                onClick={handleBookmarkClick}
            />
            <div className='flex flex-wrap'>

                <img
                    className='w-1/3'
                    src={pokemon.sprites.front_default}
                    alt=""

                />
                <img
                    className='w-1/3'
                    src={pokemon.sprites.back_default}
                    alt=""

                />
            </div>
            <h2>Pokemon name: {pokemonId}</h2>
            <h2>Pokemon color: {pokemon.color?.name}</h2>
            <h2>Pokemon Groups: </h2>
            {
                pokemon.egg_groups?.map((item) =>
                    <p
                        key={item.name}
                        className='ml-4'
                    >{item.name}</p>
                )
            }
            <h2>Pokemon generation: {pokemon.generation?.name}</h2>
            <h2>Pokemon growth rate: {pokemon.growth_rate?.name}</h2>
            <h2>Pokemon habitat : {pokemon.habitat?.name}</h2>
            <h2>Pokemon weight : {pokemon.weight} hectograms</h2>
            <h2>Pokemon height : {pokemon.height} hectograms</h2>

        </div>
    );
}

export default DetailsPage;
