import ClientApi from "./ClientApi.js";
import AppComponent from "./components/AppComponent.js";
import PokemonApi from "./PokemonApi.js";

const clientApi = new ClientApi(
  "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
);

const pokemonApi = new PokemonApi(
  "https://pokemon-api-luc.herokuapp.com/pokemon"
);

const mainContainer = document.querySelector(".app");

// eslint-disable-next-line no-new
new AppComponent(mainContainer, pokemonApi, clientApi);
