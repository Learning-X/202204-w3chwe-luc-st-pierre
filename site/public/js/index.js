import AppComponent from "./components/AppComponent.js";
import getFilterPokemonData from "./localAPI.js";

const mainContainer = document.querySelector(".app");

const App = new AppComponent(mainContainer, getFilterPokemonData);
