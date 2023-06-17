const API_BASE_URL = 'https://pokeapi.co/api/v2'; // Replace with the actual API base URL

export async function searchPokemon(pokemonName) {


  const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonName}`);
  console.log('response', response)
  if (!response.ok) {
    throw new Error('No Result Found');
  }
  const data = await response.json();
  return [{ name: data.name, url: data.sprites.front_default }];
}

export async function getPokemon(page) {
  return fetch(`${API_BASE_URL}/pokemon?offset=${page}&limit=10`)
    .then(response => response.json())
    .then(data => {

      const pokemonPromises = data.results.map(pokemon => {
        const pokemonUrl = pokemon.url;
        return fetch(pokemonUrl)
          .then(response => response.json())
          .then(pokemonData => {
            const spriteUrl = pokemonData.sprites.front_default;
            const pokemonName = pokemonData.name;

            return { name: pokemonName, url: spriteUrl };
          });
      });

      if (!pokemonPromises.length)
        throw new Error('No pokemon found');
      return Promise.all(pokemonPromises);
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });


}
export async function getAbility(page) {
  return fetch(`${API_BASE_URL}/ability?offset=${page}&limit=10`)
    .then(response => response.json())
    .then(data => {

      console.log('data', data)
      return data.results
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });
}
export async function getPokemonAbilityByName(data) {
  console.log(data)

  const response = await fetch(`${API_BASE_URL}/ability/${data.name}`);
  console.log('response', response)
  if (!response.ok) {
    throw new Error('No Result Found');
  }
  const _data = await response.json();


  const pokemonPromises = _data.pokemon.map(pokemon => {
    const pokemonUrl = pokemon.pokemon.url;
    return fetch(pokemonUrl)
      .then(response => response.json())
      .then(pokemonData => {
        const spriteUrl = pokemonData.sprites.front_default;
        const pokemonName = pokemonData.name;

        return { name: pokemonName, url: spriteUrl };
      });
  });





  console.log('_data', _data)
  if (!pokemonPromises.length) {
    throw new Error('No pokemon available for this ability');
  }
  return Promise.all(pokemonPromises);
  // return [{ name: data.name, url: data.sprites.front_default }];
}
export async function getPokemonFiltering({
  ability = null,
  group = null,
  type = null,
  gender = null,
  color = null,
  habit = null,
  shape = null
}) {

  // console.log(data)

  let finalResponse = []



  const response = await fetch(`${API_BASE_URL}/ability/${ability}`);
  const _data = await response.json();





  console.log('response', response)
  if (!response.ok) {
    throw new Error('No Result Found');
  }






  const pokemonPromises = _data.pokemon.map(pokemon => {
    const pokemonUrl = pokemon.pokemon.url;
    return fetch(pokemonUrl)
      .then(response => response.json())
      .then(pokemonData => {
        const spriteUrl = pokemonData.sprites.front_default;
        const pokemonName = pokemonData.name;

        return { name: pokemonName, url: spriteUrl };
      });
  });





  console.log('_data', _data)
  if (!pokemonPromises.length) {
    throw new Error('No pokemon available for this ability');
  }
  return Promise.all(pokemonPromises);
  // return [{ name: data.name, url: data.sprites.front_default }];
}