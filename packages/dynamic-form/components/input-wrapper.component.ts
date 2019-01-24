import { AttributeCopierService } from '../services';

export class InputWrapperComponent extends HTMLElement {
  private readonly attributeCopierService: AttributeCopierService;
  private readonly element: Element;
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({
      mode: 'open'
    });
    this.element = document.createElement('input');
    this.attributeCopierService = new AttributeCopierService({
      sourceElement: this,
      destinationElement: this.element
    });
  }

  connectedCallback() {
    const elementCopy = this.attributeCopierService.copy();
    this.shadow.appendChild(elementCopy);
  }
}
