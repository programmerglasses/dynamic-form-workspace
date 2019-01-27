export class ConfigurationService {
  getConfiguration() {
    const scope = window as any;
    const configuration = scope.dynamicFormConfiguration;

    return configuration;
  }
}
