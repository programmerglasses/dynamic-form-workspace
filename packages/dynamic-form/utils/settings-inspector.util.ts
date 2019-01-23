import { ConfigurationItem } from '../interfaces';

export class SettingsInspector {
  hasRenderPriorityProperty(configurationItem: ConfigurationItem) {
    if (configurationItem && this.hasSettingsProperty(configurationItem)) {
      const settings = configurationItem.settings;
      return settings.hasOwnProperty('renderPriority');
    }

    return false;
  }

  hasSettingsProperty(configurationItem: ConfigurationItem) {
    if (configurationItem) {
      return configurationItem.hasOwnProperty('settings');
    }

    return false;
  }
}
