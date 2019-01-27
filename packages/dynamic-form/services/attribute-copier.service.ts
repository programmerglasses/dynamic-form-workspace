import { AttributeCopierOptions } from '../interfaces';

export class AttributeCopierService {
  private readonly sourceElement: Element;
  private readonly destinationElement: Element;

  constructor(private readonly options: AttributeCopierOptions) {
    this.sourceElement = this.options.sourceElement;
    this.destinationElement = <Element> this.options.destinationElement.cloneNode(true);
  }

  copy() {
    const attributes = this.sourceElement.attributes;

    Array
      .from(attributes)
      .forEach(attribute => this.destinationElement.setAttribute(attribute.name, attribute.value));

    return this.destinationElement;
  }
}
