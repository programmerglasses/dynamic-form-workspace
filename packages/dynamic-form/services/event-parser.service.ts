import { EventParserOptions, Parsable } from '../interfaces';

export class EventParserService implements Parsable {
  private readonly events: any;
  private readonly destinationElement: Element;

  constructor(private readonly options: EventParserOptions) {
    this.events = {
      ...options.events
    };
    this.destinationElement = <Element> options.destinationElement.cloneNode(true);
  }

  addEvent(sourceElement: Element, name: string, handler: EventListenerObject) {
    sourceElement.addEventListener(name, handler);
  }

  parse(): Element {
    for (const event in this.events) {
      if (this.events.hasOwnProperty(event)) {
        this.addEvent(this.destinationElement, event, this.events[event]);
      }
    }

    return this.destinationElement;
  }
}
