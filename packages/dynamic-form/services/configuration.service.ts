import { ConfigurationItem } from '../interfaces';

export class ConfigurationService {
  getConfiguration() {
    const scope = window as any;
    const configuration: ConfigurationItem[] = scope.dynamicFormConfiguration;

    return configuration;
  }
}
