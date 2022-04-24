import Component from "./Component.js";

export default class ModalComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "", "div");

    this.render();
  }

  render() {
    this.element.innerHTML = `

    <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Content Modal..</p>
    </div>
    `;
  }
}
