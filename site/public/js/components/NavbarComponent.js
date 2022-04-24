import Component from "./Component.js";

export default class NavbarComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "navbar-container", "div");

    this.render();
  }

  render() {
    this.element.innerHTML = `
        <nav class="navbar">
          <img
            class="navbar__image"
            src="images/pokemon-logo.svg"
            width="200"
            alt=""
          />

          <ul class="navbar__menu">
            <li class="menu__item">
              <a href="index.html" class="menu__item-link">Home</a>
            </li>
            <li class="menu__item" class="menu__item-link">
              <a href="my-pokemon.html" class="menu__item-link">My Pokémon</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
