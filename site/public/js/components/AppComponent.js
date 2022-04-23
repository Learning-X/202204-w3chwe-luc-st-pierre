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
        <nav class="navigation">
          <button class="btn navigation__previous">Prev</button>
          <button class="btn navigation__next">Next</button>
        </nav>
      </div>
    `;
    this.renderGridlist();
  }

  async renderGridlist() {
    const gridlist = this.element.querySelector(".grid-list");

    const pokemons = await this.applicationAPI();

    pokemons.forEach((pokemon) => new CardComponentPokemon(gridlist, pokemon));
  }
}
