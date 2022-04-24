import ClientApi from "./ClientApi.js";
import AppComponent from "./components/AppComponent.js";

const pokemonApiClient = new ClientApi(
  "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
);

const mainContainer = document.querySelector(".app");

// eslint-disable-next-line no-new
new AppComponent(mainContainer, pokemonApiClient);
