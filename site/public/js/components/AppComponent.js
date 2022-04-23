import ButtonComponent from "./ButtonComponent.js";
import CardComponentPokemon from "./CardComponentPokemon.js";
import Component from "./Component.js";

export default class AppComponent extends Component {
  applicationAPI;

  constructor(parentElement, applicationAPI) {
    super(parentElement, "container", "div");
    this.applicationAPI = applicationAPI;

    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="header-container">
        <header class="header">
          <p class="header__subtitle">All the Pokémon in one place</p>
          <h1 class="header__title">Create your collection</h1>
        </header>
      </div>

      <main class="main">
        <section>
          <ul class="grid-list">
          </ul>
        </section>
      </main>

      <div class="bottom-container">
        <div class="buttons">
          <button class="button buttons__previous">Prev</button>
        </div>
      </div>
    `;
    this.renderGridlist();
  }

  async renderGridlist() {
    const gridlist = this.element.querySelector(".grid-list");
    const buttons = this.element.querySelector(".buttons");
    const pokemons = await this.applicationAPI.getAllPokemons();

    // eslint-disable-next-line no-new
    new ButtonComponent(
      buttons,
      "button buttons__next",
      "Next",
      this.getNextPage
    );

    pokemons.forEach((pokemon) => new CardComponentPokemon(gridlist, pokemon));
  }
}
