import { EventParserOptions, EventType, Parsable } from '../interfaces';

export class EventParserService implements Parsable {
  private readonly events: EventType;
  private readonly destinationElement: Element;

  constructor(private readonly options: EventParserOptions) {
    this.events = {
      ...options.events
    };
    this.destinationElement = <Element> options.destinationElement.cloneNode(true);
  }

  parse(): Element {
    for (const event in this.events) {
      if (this.events.hasOwnProperty(event)) {
        this.addEvent(this.destinationElement, event, this.events[event]);
      }
    }

    return this.destinationElement;
  }

  private addEvent(sourceElement: Element, name: string, handler: EventListenerObject) {
    sourceElement.addEventListener(name, handler);
  }
}
