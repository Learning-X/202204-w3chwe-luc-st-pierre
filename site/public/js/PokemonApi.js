export default class PokemonApi {
  apiEntryPoint;

  constructor(apiEntryPoint) {
    this.apiEntryPoint = apiEntryPoint;
  }

  async sendPokemon(pokemon) {
    const data = pokemon;

    const pokemonObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await JSON.stringify(data),
    };

    const response = await fetch(this.apiEntryPoint, pokemonObject);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
}
