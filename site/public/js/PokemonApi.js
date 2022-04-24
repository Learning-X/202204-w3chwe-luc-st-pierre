export default class PokemonApi {
  apiEntryPoint;

  constructor(apiEntryPoint) {
    this.apiEntryPoint = apiEntryPoint;
  }

  async getAllPokemonApi() {
    const result = await fetch(this.apiEntryPoint);
    const json = await result.json();
    return json;
  }

  async addPokemon(pokemon) {
    const ressource = pokemon;
    const pokemonObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await JSON.stringify(ressource),
    };

    try {
      const response = await fetch(this.apiEntryPoint, pokemonObject);
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async removePokemon(id) {
    const url = `${this.apiEntryPoint}/${id}`;
    const ressource = {
      method: "DELETE",
    };
    const responseJson = (await fetch(url, ressource)).json();
    return responseJson;
  }
}
