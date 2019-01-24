import { AttributeCopierService } from '../services';

export class ButtonWrapperComponent extends HTMLElement {
  private readonly attributeCopierService: AttributeCopierService;
  private readonly element: Element;
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({
      mode: 'open'
    });
    this.element = document.createElement('button');
    this.attributeCopierService = new AttributeCopierService({
      sourceElement: this,
      destinationElement: this.element
    });
  }

  connectedCallback() {
    const elementCopy = this.attributeCopierService.copy();
    elementCopy.textContent = this.getAttribute('value');

    this.shadow.appendChild(elementCopy);
  }
}
