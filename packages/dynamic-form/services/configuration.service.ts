import { ConfigurationItem } from '../interfaces';

export class ConfigurationService {
  getConfiguration() {
    const globalObj = window as any;
    const configuration: ConfigurationItem[] = globalObj.DYNAMIC_FORM_CONFIGURATION;

    return configuration;
  }
}
