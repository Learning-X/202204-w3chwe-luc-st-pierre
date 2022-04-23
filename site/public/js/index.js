import AppComponent from "./components/AppComponent.js";
import getFilterPokemonData from "./localAPI.js";

const mainContainer = document.querySelector(".app");

new AppComponent(mainContainer, getFilterPokemonData);
