import Component from "./Component.js";

export default class CardComponentPokemon extends Component {
  name;

  constructor(parentElement, { name, imgUrl, height, weight }) {
    super(parentElement, "grid-item", "li");
    this.name = name;
    this.imgUrl = imgUrl;
    this.height = height;
    this.weight = weight;
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="card-container">
        <div id="view-item" class="card-container__link">
          <div class="card">
          <div class="card__box"></div>
          <div class="card-image__container">
            <img src="${this.imgUrl}" class="card__image" />
          </div>
          <div class="card-media__root">
            <div class="root-container">
              <div class="root-container__left space">
                <span class="icon-info space height">Height:</span>
                <span class="icon-info space">${this.height}</span>
              </div>

              <div class="root-container__right space">
                <span class="icon-info space weight">Weight:</span>
                <span class="icon-info space">${this.weight}</span>
              </div>
            </div>
          </div>
          </div>
        </div>

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
