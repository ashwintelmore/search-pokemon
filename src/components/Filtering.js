import React, { useEffect, useState } from 'react'
import { getAbility, getPokemonAbilityByName } from '../api/pokemonApi';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

function Filtering({
    selectedAbility,
    setSelectedAbility,
    setPokemonList,
    loading,
    setLoading,
    setPagePok,
}) {
    const [ability, setAbility] = useState([])
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    // const [loading, setLoading] = useState({
    //     search: false,
    //     pagination: false,
    // })
    const loadAbilityList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getAbility(page);
            setPage(pr => pr + 10)
            setAbility(pr => [...pr, ...response])
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };
    const loadPokemonAbility = async () => {
        setLoading({ ...loading, search: true })
        setError('');
        try {
            const response = await getPokemonAbilityByName(selectedAbility);
            setPokemonList(response)
            console.log('response', response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setLoading({ ...loading, search: false })
    };

    useEffect(() => {
        if (selectedAbility) {
            loadPokemonAbility();
        } else
            setPagePok(0)
    }, [selectedAbility]);

    //load list od abilities
    useEffect(() => {
        loadAbilityList()
        return () => {
            setAbility([])
        }
    }, [])

    return (
        <div>
            <h2>Ability</h2>

            <div name="" id="" className='border flex flex-wrap'>
                {
                    ability.map((item, i) => {
                        if (item.name == selectedAbility?.name)
                            return <p
                                value=""
                                className='border inline m-2 p-2 cursor-pointer bg-blue-500 text-white'
                                key={item.name}
                                onClick={() => setSelectedAbility(null)}
                            >{item.name}</p>
                        return <p
                            value=""
                            className='border inline m-2 p-2 cursor-pointer'
                            key={item.name}
                            onClick={() => setSelectedAbility(item)}
                        >{item.name}</p>
                    })
                }
                {isLoading ?
                    <LoadingSpinner />
                    :
                    <p
                        value=""
                        className='border inline m-2 p-2 cursor-pointer'
                        onClick={loadAbilityList}
                    >Load more</p>
                }
            </div>
            {error && <Error message={error} />}
        </div>
    )
}

export default Filtering