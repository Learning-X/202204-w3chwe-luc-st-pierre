const pokeApiClient = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  const response = await fetch(pokeApiClient);
  const data = await response.json();
  // console.log(data);
  return data;
};

getAllPokemons();
