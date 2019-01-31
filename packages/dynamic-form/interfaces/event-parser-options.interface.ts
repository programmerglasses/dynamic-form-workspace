import { EventType } from './event-type.interface';

export interface EventParserOptions {
  events: EventType;
  destinationElement: Element;
}
