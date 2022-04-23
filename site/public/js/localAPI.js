const pokeApiClient = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemons = async () => {
  const response = await fetch(pokeApiClient);
  const jsonData = await response.json();
  const data = jsonData.results;
  // console.log(data);
  return data;
};

const getPokemonData = async () => {
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

export default getPokemonData;
