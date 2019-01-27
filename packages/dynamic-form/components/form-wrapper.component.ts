import { AttributeCopierService, ConfigurationParserService, ConfigurationService } from '../services';

export class FormWrapperComponent extends HTMLElement {
  private readonly attributeCopierService: AttributeCopierService;
  private readonly configurationService: ConfigurationService;
  private readonly element: Element;
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({
      mode: 'open'
    });
    this.element = document.createElement('form');
    this.attributeCopierService = new AttributeCopierService({
      sourceElement: this,
      destinationElement: this.element
    });
    this.configurationService = new ConfigurationService();
  }

  connectedCallback() {
    const elementCopy = this.attributeCopierService.copy();
    this.shadow.appendChild(elementCopy);

    this.createFormFromConfiguration();
  }

  createFormFromConfiguration() {
    const configuration = this.configurationService.getConfiguration();

    if (configuration) {
      const formElement = <HTMLElement> this.shadow.querySelector('form');

      const configurationParserService = new ConfigurationParserService({
        configuration,
        destinationElement: formElement
      });
      const parsedFormElement = configurationParserService.parse();

      this.shadow.replaceChild(parsedFormElement, formElement);
    }
  }
}
