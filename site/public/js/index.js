import AppComponent from "./components/AppComponent.js";
import getFilterPokemonData, {
  getNextPage,
  getPreviousPage,
} from "./localAPI.js";

const mainContainer = document.querySelector(".app");

// eslint-disable-next-line no-new
new AppComponent(
  mainContainer,
  getFilterPokemonData,
  getNextPage,
  getPreviousPage
);
