import axios from "axios";
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
export async function getDetailPokemon(name) {
  return axios.get(`${API_BASE_URL}/pokemon/${name}`)
    .then(res => {

      return res.data
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

export async function getGenders() {
  return axios.get(`${API_BASE_URL}/gender`)
    .then(res => {

      console.log('res.data', res.data)
      return res.data.results
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });
}

export async function getTypes() {
  return axios.get(`${API_BASE_URL}/type`)
    .then(res => {

      console.log('res.data', res.data)
      return res.data.results
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });
}
export async function getGroups() {
  return axios.get(`${API_BASE_URL}/egg-group`)
    .then(res => {

      console.log('res.data', res.data)
      return res.data.results
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });
}

export async function getColors() {
  return axios.get(`${API_BASE_URL}/pokemon-color`)
    .then(res => {

      console.log('res.data', res.data)
      return res.data.results
    })
    .catch(error => {
      console.log('Error:', error);
      throw new Error('something went wrong');
    });
}
export async function getHabits() {
  return axios.get(`${API_BASE_URL}/pokemon-habitat`)
    .then(res => {

      console.log('res.data', res.data)
      return res.data.results
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
function intersectionArraysByName(property, ...arrs) {
  const set = new Set();
  const result = [];
  let arrays = arrs.filter((subArray) => subArray.length > 0);

  for (const obj of arrays[0]) {
    const key = obj[property];
    set.add(key);
  }

  for (const obj of arrays[0]) {
    const key = obj[property];
    let existsInAllArrays = true;

    for (let i = 1; i < arrays.length; i++) {

      const array = arrays[i];

      if (!array.length)
        continue

      if (!array.some(item => item[property] === key)) {
        existsInAllArrays = false;
        break;
      }
    }

    if (existsInAllArrays) {
      result.push(obj);
    }
  }

  return result;
}


export async function getPokemonFiltering({
  ability,//
  group,
  type,
  gender,
  habit,
  color
}) {

  console.log('ability', ability)

  let finalResponse = []
  let abiList = []
  let grpList = []
  let typeList = []
  let genderList = []
  let habitList = []
  let colorList = []

  if (ability) {
    const abilityResp = await axios.get(`${API_BASE_URL}/ability/${ability}`)
    abiList = abilityResp.data.pokemon.map((item) => { return item.pokemon })
  }

  if (group) {
    const groupResp = await axios.get(`${API_BASE_URL}/egg-group/${group}`)
    grpList = groupResp.data.pokemon_species
  }

  if (type) {
    const typeResp = await axios.get(`${API_BASE_URL}/type/${type}`)
    typeList = typeResp.data.pokemon.map((item) => { return item.pokemon })
  }
  if (gender) {
    const genderResp = await axios.get(`${API_BASE_URL}/gender/${gender}`)
    genderList = genderResp.data.pokemon_species_details.map((item) => { return item.pokemon_species })
  }
  if (habit) {
    const habitResp = await axios.get(`${API_BASE_URL}/pokemon-habitat/${habit}`)
    habitList = habitResp.data.pokemon_species
  }

  if (color) {
    const colorResp = await axios.get(`${API_BASE_URL}/pokemon-color/${color}`)
    colorList = colorResp.data.pokemon_species
  }

  finalResponse = intersectionArraysByName('name', typeList, abiList, grpList, genderList, colorList, habitList)

  console.log('finalResponse', finalResponse)
  const pokemonPromises = finalResponse.map(pokemon => {
    const pokemonUrl = pokemon.url;
    return axios.get(`${API_BASE_URL}/pokemon/${pokemon.name}`)
      .then(pokemonData => {


        const spriteUrl = pokemonData.data.sprites.front_default;
        const pokemonName = pokemonData.data.name;
        return { name: pokemonName, url: spriteUrl };
      })
      .catch(error => {
        return { name: pokemon.name, url: 'https://source.unsplash.com/random/notfound' };
      });
  });


  if (!pokemonPromises.length) {
    throw new Error(' No Result Found for this filter');
  }
  return Promise.all(pokemonPromises);
}