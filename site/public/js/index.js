import ClientApi from "./ClientApi.js";
import AppComponent from "./components/AppComponent.js";

const pokemonApiClient = new ClientApi("https://pokeapi.co/api/v2/pokemon");

const mainContainer = document.querySelector(".app");

// eslint-disable-next-line no-new
new AppComponent(mainContainer, pokemonApiClient);
