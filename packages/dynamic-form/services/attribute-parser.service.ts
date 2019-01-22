import { AttributeParserOptions, Parsable } from '../interfaces';

export class AttributeParserService implements Parsable {
  private readonly attributes: any;
  private readonly destinationElement: Element;

  constructor(private readonly options: AttributeParserOptions) {
    this.attributes = {
      ...options.attributes
    };
    this.destinationElement = <Element> options.destinationElement.cloneNode(true);
  }

  private addAttribute(sourceElement: Element, name: string, value: string) {
    sourceElement.setAttribute(name, value);
  }

  parse(): Element {
    for (const attribute in this.attributes) {
      if (this.attributes.hasOwnProperty(attribute)) {
        this.addAttribute(this.destinationElement, attribute, this.attributes[attribute]);
      }
    }

    return this.destinationElement;
  }
}
