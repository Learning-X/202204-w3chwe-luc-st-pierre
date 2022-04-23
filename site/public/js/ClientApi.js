export default class ClientApi {
  nextPage;
  previousPage;
  currentPage;
  count;

  constructor(apiEntryPoint) {
    this.currentPage = apiEntryPoint;
    this.setInstanceApi();
  }

  static async fetchPokemonList(apiEndpoint) {
    const response = await fetch(apiEndpoint);
    const jsonData = await response.json();
    const data = jsonData.results;
    return data;
  }

  static async fetchPokemonData(pokemonList) {
    const promise = pokemonList.map(async (pokemon) => {
      const responseURLs = await fetch(pokemon.url);
      const jsonResponseURLs = await responseURLs.json();
      return jsonResponseURLs;
    });

    const result = await Promise.all(promise);
    return result;
  }

  async getAllPokemons() {
    const pokemonsList = await ClientApi.fetchPokemonList(this.currentPage);
    const filteredPokemons = await ClientApi.fetchPokemonData(pokemonsList);

    const pokemonArray = [];

    for (const pokemon of filteredPokemons) {
      const pokemonObject = {
        id: pokemon.id,
        name: pokemon.name,
        habilities: [], // will add later
        imgUrl: pokemon?.sprites.other.dream_world.front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        types: [], // will add later
      };
      pokemonArray.push(pokemonObject);
    }
    return pokemonArray;
  }

  async setInstanceApi() {
    const pokemonsResponse = await fetch(this.currentPage);
    const results = await pokemonsResponse.json();
    this.count = results;
  }
}
