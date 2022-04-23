import AppComponent from "./components/AppComponent.js";
import getFilterPokemonData from "./localAPI.js";

const mainContainer = document.querySelector(".app");

// eslint-disable-next-line no-new
new AppComponent(mainContainer, getFilterPokemonData);
