import { ConfigurationItem, RenderPrioritySorterOptions } from '../interfaces';

export class RenderPrioritySorterService {
  private readonly configuration: ConfigurationItem[];

  constructor(private readonly options: RenderPrioritySorterOptions) {
    this.configuration = [
      ...options.configuration
    ];
  }

  compareAscending(firstConfigurationItem: ConfigurationItem, secondConfigurationItem: ConfigurationItem) {
    return firstConfigurationItem.settings.renderPriority - secondConfigurationItem.settings.renderPriority;
  }

  sort(compareFunction = this.compareAscending) {
    return this.configuration.sort(compareFunction);
  }
}
