import { ComponentType } from '../enums';

export interface ConfigurationItem {
  render: ComponentType;
  attributes?: any;
  events?: any;
  settings?: any;
}
