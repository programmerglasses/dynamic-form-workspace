import { ConfigurationItem, RenderPriorityProviderOptions } from '../interfaces';
import { SettingsInspector } from '../utils';

export class RenderPriorityProviderService {
  private readonly configuration: ConfigurationItem[];
  private readonly settingsInspector: SettingsInspector;

  constructor(private readonly options: RenderPriorityProviderOptions) {
    this.configuration = [
      ...options.configuration
    ];
    this.settingsInspector = new SettingsInspector();
  }

  verifyConfigurationItems() {
    const highestRenderPriority = this.findHighestRenderPriority();

    return this.configuration.map((configurationItem: ConfigurationItem, index: number) => {
      const configurationItemPosition = ++index;
      return this.verifyRenderPriority(configurationItem, configurationItemPosition, highestRenderPriority);
    });
  }

  private findHighestRenderPriority() {
    const configurationItemRenderPriorities: number[] = [];

    this.configuration.forEach((configurationItem: ConfigurationItem) => {
      const hasRenderPriorityProperty = this.settingsInspector.hasRenderPriorityProperty(configurationItem);

      if (hasRenderPriorityProperty) {
        const renderPriority = configurationItem.settings.renderPriority;
        configurationItemRenderPriorities.push(renderPriority);
      }
    });

    return Math.max.apply(this, configurationItemRenderPriorities);
  }

  private provideRenderPriority(configurationItem: ConfigurationItem, configurationItemPosition: number, highestRenderPriority: number) {
    const renderPriority = highestRenderPriority + configurationItemPosition;

    if (!this.settingsInspector.hasSettingsProperty(configurationItem)) {
      configurationItem.settings = {
        renderPriority
      };
    }

    if (!this.settingsInspector.hasRenderPriorityProperty(configurationItem)) {
      configurationItem.settings.renderPriority = renderPriority;
    }
  }

  private verifyRenderPriority(configurationItem: ConfigurationItem, configurationItemPosition: number, highestRenderPriority: number) {
    if (!this.settingsInspector.hasRenderPriorityProperty(configurationItem)) {
      this.provideRenderPriority(configurationItem, configurationItemPosition, highestRenderPriority);
    }

    return configurationItem;
  }
}
