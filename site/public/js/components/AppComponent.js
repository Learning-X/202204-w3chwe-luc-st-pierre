import ButtonComponent from "./ButtonComponent.js";
import CardComponentPokemon from "./CardComponentPokemon.js";
import Component from "./Component.js";
import ModalComponent from "./ModalComponent.js";
import NavbarComponent from "./NavbarComponent.js";

export default class AppComponent extends Component {
  clientApi;
  pokemonApi;
  pokemonData;

  constructor(parentElement, pokemonApi, clientApi) {
    super(parentElement, "container", "div");
    this.clientApi = clientApi;
    this.pokemonApi = pokemonApi;

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
          <h1 class="header__title">${
            window.location.pathname === "/index.html"
              ? "Create your collection"
              : "My Pokémon"
          }  </h1>
        </header>
      </div>

        <section>
          <ul class="grid-list">
          </ul>
        </section>
      </main>

      <div class="bottom-container ${
        window.location.pathname === "/index.html"
          ? ""
          : "bottom-container--hide"
      }">
        <div class="buttons">
        <p class="page-count">Page Count</p>
        </div>
      </div>

      <div id="snackbar"></div>
    `;

    this.renderNavbar();
    this.renderButtons();
    this.getUrl();
    AppComponent.renderModal();
  }

  getUrl() {
    return window.location.pathname === "/index.html"
      ? this.renderGridlist()
      : this.renderMyPokemonGridlist();
  }

  async renderMyPokemonGridlist() {
    const pokemons = await this.pokemonApi.getAllPokemonApi();

    const gridlist = this.element.querySelector(".grid-list");
    gridlist.innerHTML = "";

    pokemons.forEach((pokemon) => {
      const card = new CardComponentPokemon(gridlist, pokemon);

      const btnContainer = card.element.querySelector(".btn-container");

      // eslint-disable-next-line no-new
      new ButtonComponent(btnContainer, "btn", "", async () => {
        this.pokemonApi.removePokemon(pokemon.id);

        setTimeout(() => {
          this.renderMyPokemonGridlist();
        }, 300);
      });

      const buttonContainer = card.element.querySelector(".btn");
      const spanText = document.createElement("span");
      spanText.textContent = "remove";
      spanText.className = "btn-text";
      buttonContainer.append(spanText);

      const modal = document.querySelector("#myModal");

      const anchorTag = card.element.querySelector("#view-item");
      anchorTag.addEventListener("click", () => {
        modal.style.display = "block";
      });
    });

    this.getCurrentPageNumber();
  }

  static renderSnakbar(pokemon) {
    const snakbar = document.getElementById("snackbar");
    snakbar.textContent = `${pokemon.name} wad added!`;
    snakbar.className = "show";
    setTimeout(() => {
      snakbar.className = snakbar.className.replace("show", "");
    }, 3000);
  }

  async renderGridlist() {
    const pokemons = await this.clientApi.getAllPokemonClientApi();
    const gridlist = this.element.querySelector(".grid-list");
    gridlist.innerHTML = "";

    pokemons.forEach((pokemon) => {
      const card = new CardComponentPokemon(gridlist, pokemon);

      const btnContainer = card.element.querySelector(".btn-container");

      // eslint-disable-next-line no-new
      new ButtonComponent(btnContainer, "btn", "", async () => {
        this.pokemonApi.addPokemon(pokemon);
        AppComponent.renderSnakbar(pokemon);
      });

      const buttonContainer = card.element.querySelector(".btn");
      const spanText = document.createElement("span");
      spanText.textContent = "add";
      spanText.className = "btn-text";
      buttonContainer.append(spanText);

      const modal = document.querySelector("#myModal");
      const modalContent = document.querySelector(".modal-content");

      const divTag = card.element.querySelector("#view-item");

      divTag.addEventListener("click", () => {
        const name =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        modalContent.innerHTML = `
          <div class="modal-info">
            <div class="modal-info__left">
              <img src="${pokemon.imgUrl}" alt="${name}" class="card__image" />
            </div>
            <div class="modal-info__right">
              <h2 class="modal-info__title">${name}</h2>
              <p class="modal-info__abilities"><span class="modal-info--white">abilities:</span> ${pokemon.habilities[0][0].ability.name}</p>
            </div>
          </div>
        `;

        modal.style.display = "block";
      });
    });
    this.getCurrentPageNumber();
  }

  static renderModal() {
    const mainContainer = document.querySelector(".app");

    // eslint-disable-next-line no-new
    new ModalComponent(mainContainer);

    const modal = document.querySelector("#myModal");

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // eslint-disable-next-line no-new
    new ButtonComponent(mainContainer, "myBtn", "Open Modal", () => {
      modal.style.display = "block";
    });
  }

  renderNavbar() {
    const navbarContainer = this.element.querySelector(".navbar-container");

    // eslint-disable-next-line no-new
    new NavbarComponent(navbarContainer);
  }

  async nextPage() {
    this.clientApi.getNextPage();
    this.renderGridlist();
  }

  async previousPage() {
    this.clientApi.getPreviousPage();
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
    const pageNumber = await this.clientApi.getCurrentPageNumber();
    const pageCount = this.element.querySelector(".buttons .page-count");
    pageCount.textContent = `page ${pageNumber + 1} of ${
      this.clientApi.totalPages
    }`;
  }
}
