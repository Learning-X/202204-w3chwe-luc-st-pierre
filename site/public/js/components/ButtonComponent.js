import Component from "./Component.js";

export default class ButtonComponent extends Component {
  text;

  constructor(parentElement, className, text, action) {
    super(parentElement, className, "button");

    this.text = text;
    this.action = action;
    this.render();
    this.addListeners();
  }

  render() {
    this.element.type = "button";
    this.element.textContent = this.text;
  }

  addListeners() {
    this.element.addEventListener("click", this.action);
  }
}
