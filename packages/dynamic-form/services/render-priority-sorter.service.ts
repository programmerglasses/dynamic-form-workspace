import { ConfigurationItem, RenderPrioritySorterOptions } from '../interfaces';

export class RenderPrioritySorterService {
  private readonly configuration: ConfigurationItem[];

  constructor(private readonly options: RenderPrioritySorterOptions) {
    this.configuration = [
      ...options.configuration
    ];
  }

  sort(compareFunction = this.compareAscending) {
    return this.configuration.sort(compareFunction);
  }

  private compareAscending(firstConfigurationItem: ConfigurationItem, secondConfigurationItem: ConfigurationItem) {
    return firstConfigurationItem.settings.renderPriority - secondConfigurationItem.settings.renderPriority;
  }
}
