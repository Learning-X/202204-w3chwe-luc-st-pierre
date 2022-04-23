import Component from "./Component.js";

export default class AppComponent extends Component {
  applicationAPI;

  constructor(parentElement, applicationAPI) {
    super(parentElement, "container", "div");
    this.pokemonAPI = applicationAPI;

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
    `;
    this.renderGridlist();
  }

  async renderGridlist() {
    const gridlist = this.element.querySelector(".grid-list");

    gridlist.innerHTML = `
    <li class="grid-item">
              <div class="card-container">
                <a href="#" class="card-container__link">
                  <div class="card">
                    <div class="card__box"></div>
                    <div class="card__image"></div>
                    <div class="card-media__root">
                      <div class="root-container">
                        <div class="root-container__left space">
                          <i class="icon space">icon</i>
                          <span class="icon-info space">info</span>
                        </div>

                        <div class="root-container__right space">
                          <i class="icon space">icon</i>
                          <span class="icon-info space">info</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                <div class="card__content">
                  <a href="#" class="card__content-wrapper">
                    <h6 class="card__content-title">title</h6>
                  </a>

                  <div class="card__content-info">
                    <span class="info">info</span>

                    <div class="btn-container">
                      <button type="button" class="btn">
                        <span class="btn-text">view</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
       </li>
    `;
  }
}
