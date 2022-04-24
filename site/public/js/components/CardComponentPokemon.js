import Component from "./Component.js";

export default class CardComponentPokemon extends Component {
  name;

  constructor(parentElement, { name, imgUrl }) {
    super(parentElement, "grid-item", "li");
    this.name = name;
    this.imgUrl = imgUrl;
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="card-container">
        <a id="view-item" href="#" class="card-container__link">
          <div class="card">
          <div class="card__box"></div>
          <div class="card-image__container">
            <img src="${this.imgUrl}" class="card__image" />
          </div>
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
            <h6 class="card__content-title">${this.name}</h6>
          </a>

          <div class="card__content-info">
            <span class="info">info</span>
            <div class="btn-container">
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
