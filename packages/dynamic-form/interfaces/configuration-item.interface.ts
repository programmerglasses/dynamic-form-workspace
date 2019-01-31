import { ComponentType } from '../enums';
import { AttributeType } from './attribute-type.interface';
import { EventType } from './event-type.interface';
import { SettingsType } from './settings-type.interface';

export interface ConfigurationItem {
  render: ComponentType;
  attributes: AttributeType;
  events: EventType;
  settings: SettingsType;
}
