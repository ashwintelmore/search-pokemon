import React, { useEffect, useState } from 'react'
import { getAbility, getColors, getGenders, getGroups, getHabits, getPokemonAbilityByName, getPokemonFiltering, getTypes } from '../api/pokemonApi';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import { hasNonEmptyField, isEmptyField } from './helper';

function Filtering({
    selectedabilities,
    setSelectedabilities,
    setPokemonList,
    loading,
    setLoading,
    setPagePok,

    isFillter,
    setIsFillter,
    error,
    setError
}) {
    const [abilities, setAbilities] = useState([])
    const [ability, setAbility] = useState('')

    const [genders, setGenders] = useState([])
    const [gender, setGender] = useState('')

    const [types, setTypes] = useState([])
    const [type, setType] = useState('')

    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState('')

    const [colors, setColors] = useState([])
    const [color, setColor] = useState('')

    const [habits, setHabits] = useState([])
    const [habit, setHabit] = useState('')

    const [pokemons, setPokemons] = useState([])



    // const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    // const [loading, setLoading] = useState({
    //     search: false,
    //     pagination: false,
    // })
    const loadabilitiesList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getAbility(page);
            setPage(pr => pr + 10)
            setAbilities(pr => [...pr, ...response])
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };

    const loadgenderList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getGenders();
            setGenders(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };
    const loadGroupList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getGroups();
            setGroups(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };

    const loadTypeList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getTypes();
            setTypes(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };

    const loadHabitList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getHabits();
            setHabits(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };
    const loadColorList = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await getColors();
            setColors(response)
        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setIsLoading(false);
    };

    const loadPokemonabilities = async () => {
        setLoading({ ...loading, search: true })
        setError('');
        try {
            const response = await getPokemonAbilityByName(selectedabilities);
            setPokemonList(response)

        } catch (error) {
            setError(error.message);
            console.log('error', error)
        }
        setLoading({ ...loading, search: false })
    };

    const loadPokemonList = async () => {
        setIsFillter(true)
        console.log('ability, group, type, gender, habit, color', ability, group, type, gender, habit, color)
        if (!hasNonEmptyField(ability, group, type, gender, habit, color)) {
            setError('Chose any filter option');
            setPokemonList([])

            return
        }

        setLoading({ ...loading, search: true })
        setError('');
        try {
            const response = await getPokemonFiltering({ ability, group, type, gender, habit, color });
            setPokemonList(response)
        } catch (error) {
            setPokemonList([])
            setError(error.message);
            console.log('error', error)

        }
        setLoading({ ...loading, search: false })
    };




    // useEffect(() => {
    //     if (selectedabilities) {
    //         loadPokemonabilities();
    //     } else
    //         setPagePok(0)
    // }, [selectedabilities]);

    //load list od abilities
    useEffect(() => {
        loadabilitiesList()
        loadgenderList()
        loadGroupList()
        loadTypeList()
        loadColorList()
        loadHabitList()
        return () => {
            setAbilities([])
        }
    }, [])
    return (
        <div>
            <h1 htmlFor='abilities'>abilities</h1>
            <div
                name="abilities"
                id="abilities"
                className='border flex flex-wrap'>
                {
                    abilities.map((item, i) => {
                        if (item.name == ability)
                            return <p
                                value=""
                                className='border inline m-2 p-2 cursor-pointer bg-blue-500 text-white'
                                key={item.name}
                                onClick={() => setAbility(null)}
                            >{item.name}</p>
                        return <p
                            value=""
                            className='border inline m-2 p-2 cursor-pointer'
                            key={item.name}
                            onClick={() => setAbility(item.name)}
                        >{item.name}</p>
                    })
                }
                {isLoading ?
                    <LoadingSpinner />
                    :
                    <p
                        value=""
                        className='border inline m-2 p-2 cursor-pointer'
                        onClick={loadabilitiesList}
                    >Load more</p>
                }
            </div>

            <div
                className='border flex flex-wrap justify-between'
            >
                <select
                    name=""
                    className='border p-2'
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value={''}>Select Gender</option>
                    {
                        genders.map((item) => {
                            return <option
                                value={item.name}
                                key={item.name}
                            >{item.name}</option>
                        })
                    }
                </select>
                <select
                    name=""
                    id="type"
                    value={type}
                    className='border p-2'
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value={''}>Select type</option>
                    {
                        types.map((item) => {
                            return <option
                                value={item.name}
                                key={item.name}
                            >{item.name}</option>
                        })
                    }
                </select>
                <select
                    name=""
                    id="group"
                    value={group}
                    className='border p-2'
                    onChange={(e) => setGroup(e.target.value)}
                >
                    <option value={''}>Select group</option>
                    {
                        groups.map((item) => {
                            return <option
                                value={item.name}
                                key={item.name}
                            >{item.name}</option>
                        })
                    }
                </select>
                <select
                    name=""
                    id="color"
                    className='border p-2'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option value={''}>Select color</option>
                    {
                        colors.map((item) => {
                            return <option
                                value={item.name}
                                key={item.name}
                            >{item.name}</option>
                        })
                    }
                </select>
                <select
                    name=""
                    id="habit"
                    className='border p-2'
                    value={habit}
                    onChange={(e) => setHabit(e.target.value)}
                >
                    <option value={''}>Select habit</option>
                    {
                        habits.map((item) => {
                            return <option
                                value={item.name}
                                key={item.name}
                            >{item.name}</option>
                        })
                    }
                </select>

                <button
                    className='border py-2 px-4 bg-blue-400 text-white'
                    onClick={loadPokemonList}
                >Apply Filter</button>
            </div>
        </div>
    )
}

export default Filtering