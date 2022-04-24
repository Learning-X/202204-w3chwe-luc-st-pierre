import ButtonComponent from "./ButtonComponent.js";
import CardComponentPokemon from "./CardComponentPokemon.js";
import Component from "./Component.js";
import NavbarComponent from "./NavbarComponent.js";

export default class AppComponent extends Component {
  applicationAPI;
  constructor(parentElement, applicationAPI) {
    super(parentElement, "container", "div");
    this.applicationAPI = applicationAPI;

    this.render();
  }

  render() {
    this.element.innerHTML = `
    <div class="navbar-container">
    </div>
    <main class="main">
      <div class="header-container">
        <header class="header">
          <p class="header__subtitle">All the Pokémon in one place</p>
          <h1 class="header__title">Create your collection</h1>
        </header>
      </div>

        <section>
          <ul class="grid-list">
          </ul>
        </section>
      </main>

      <div class="bottom-container">
        <div class="buttons">
        <p class="page-count">Page Count</p>
        </div>
      </div>
    `;
    this.renderGridlist();
    this.renderNavbar();
    this.renderButtons();
  }

  static addPokemonToCollection(pokemon) {
    // console.log(pokemon);
    return pokemon;
  }

  async renderGridlist() {
    const pokemons = await this.applicationAPI.getAllPokemons();

    const gridlist = this.element.querySelector(".grid-list");
    gridlist.innerHTML = "";

    pokemons.forEach((pokemon) => {
      const card = new CardComponentPokemon(gridlist, pokemon);

      const btnContainer = card.element.querySelector(".btn-container");

      // eslint-disable-next-line no-new
      new ButtonComponent(btnContainer, "btn", "", () =>
        window.location.assign(
          `./pokemon-details.html?id=${pokemon.id}&api=${this.applicationAPI}`
        )
      );

      const buttonContainer = card.element.querySelector(".btn");
      const spanText = document.createElement("span");
      spanText.textContent = "add";
      spanText.className = "btn-text";
      buttonContainer.append(spanText);
    });
    this.getCurrentPageNumber();
  }

  renderNavbar() {
    const navbarContainer = this.element.querySelector(".navbar-container");

    // eslint-disable-next-line no-new
    new NavbarComponent(navbarContainer);
  }

  async nextPage() {
    this.applicationAPI.getNextPage();
    this.renderGridlist();
  }

  async previousPage() {
    this.applicationAPI.getPreviousPage();
    this.renderGridlist();
  }

  async renderButtons() {
    const buttons = this.element.querySelector(".buttons");

    // eslint-disable-next-line no-new
    new ButtonComponent(buttons, "button buttons__previous", "Prev", async () =>
      this.previousPage()
    );

    // eslint-disable-next-line no-new
    new ButtonComponent(buttons, "button buttons__next", "Next", async () =>
      this.nextPage()
    );
  }

  async getCurrentPageNumber() {
    const pageNumber = await this.applicationAPI.getCurrentPageNumber();
    const pageCount = this.element.querySelector(".buttons .page-count");
    pageCount.textContent = `page ${pageNumber + 1} of ${
      this.applicationAPI.totalPages
    }`;
  }
}
