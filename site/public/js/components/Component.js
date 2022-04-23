export default class Component {
  element;

  constructor(parentElement, className, htmlTag) {
    this.element = document.createElement(htmlTag);
    this.className = className;
    parentElement.append(this.element);
  }
}
