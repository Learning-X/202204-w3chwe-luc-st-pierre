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
        </div>
      </div>
    `;
    this.renderGridlist();
  }

  static addPokemonToCollection(pokemon) {
    // console.log(pokemon);
    return pokemon;
  }

  async renderGridlist() {
    const pokemons = await this.applicationAPI.getAllPokemons();

    const gridlist = this.element.querySelector(".grid-list");
    gridlist.innerHTML = "";

    const buttons = this.element.querySelector(".buttons");

    // eslint-disable-next-line no-new
    new ButtonComponent(buttons, "button buttons__previous", "Prev", async () =>
      this.applicationAPI.getPreviousPage()
    );

    // eslint-disable-next-line no-new
    new ButtonComponent(buttons, "button buttons__next", "Next", async () =>
      this.applicationAPI.getNextPage()
    );

    pokemons.forEach((pokemon) => {
      const card = new CardComponentPokemon(gridlist, pokemon);

      const btnContainer = card.element.querySelector(".btn-container");

      // eslint-disable-next-line no-new
      new ButtonComponent(btnContainer, "btn", "", () =>
        AppComponent.addPokemonToCollection(pokemon)
      );

      const buttonContainer = card.element.querySelector(".btn");
      const spanText = document.createElement("span");
      spanText.textContent = "add";
      spanText.className = "btn-text";
      buttonContainer.append(spanText);
    });
  }
}
