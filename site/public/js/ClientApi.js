export default class ClientApi {
  nextPage;
  previousPage;
  currentPage;
  count;
  totalPages;
  itemPerPage = 20;
  pageOffset;
  pageNumber;

  constructor(apiEntryPoint) {
    this.currentPage = apiEntryPoint;

    this.setInstanceApi();
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

  static async fetchPokemonList(apiEndpoint) {
    const response = await fetch(apiEndpoint);
    const jsonData = await response.json();
    const data = jsonData.results;
    return data;
  }

  async getAllPokemonClientApi() {
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
    this.count = results.count;
    this.nextPage = results.next;
    this.previousPage = results.previous;
    this.totalPages = Math.ceil(this.count / 20);
    return this.totalPages;
  }

  async getNextPage() {
    if (this.nextPage) {
      this.currentPage = this.nextPage;
      this.setInstanceApi();
    }
  }

  async getPreviousPage() {
    if (this.previousPage) {
      this.currentPage = this.previousPage;
      this.setInstanceApi();
    }
  }

  async getCurrentPageNumber() {
    if (this.currentPage !== null) {
      const stringParameter = this.currentPage.split("?")[1];
      const queryString = new URLSearchParams(stringParameter);
      this.pageOffset = queryString.get("offset");
    }

    this.pageNumber = this.currentPage
      ? Math.floor(this.pageOffset / this.itemPerPage)
      : this.pageOffset / this.itemPerPage + 1;

    return this.pageNumber;
  }
}
