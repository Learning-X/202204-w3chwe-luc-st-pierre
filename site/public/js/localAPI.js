const pokeApiClient = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemons = async () => {
  const response = await fetch(pokeApiClient);
  const jsonData = await response.json();
  const data = jsonData.results;
  // console.log(data);
  return data;
};

const fetchPokemonData = async () => {
  const allPokemons = await fetchPokemons(pokeApiClient);

  const promise = allPokemons.map(async (pokemon) => {
    const responseURLs = await fetch(pokemon.url);
    const jsonResponseURLs = await responseURLs.json();

    return jsonResponseURLs;
  });

  const pokemonList = await Promise.all(promise);
  // console.log(pokemonList);
  return pokemonList;
};

const getFilterPokemonData = async () => {
  const pokemons = await fetchPokemonData();

  const pokemonArray = [];
  for (const pokemon of pokemons) {
    const pokemonFilterred = {
      id: pokemon.id,
      name: pokemon.name,
      habilities: [],
      imgUrl: pokemon?.sprites.other.dream_world.front_default,
      height: pokemon.height,
      weight: pokemon.weight,
      types: [],
    };
    pokemonArray.push(pokemonFilterred);
  }
  return pokemonArray;
};

const getNextPage = async () => {
  const response = await fetch(pokeApiClient);
  const jsonData = await response.json();
  const nextPage = jsonData.next;
  const previousPage = jsonData.previous;
  // console.log(nextPage);
};

getNextPage();

export default getFilterPokemonData;
