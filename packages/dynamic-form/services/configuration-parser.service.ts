import { ComponentFactory } from '../components';
import { ComponentType } from '../enums';
import { ConfigurationItem, ConfigurationParserOptions, Parsable } from '../interfaces';
import { AttributeParserService } from './attribute-parser.service';
import { EventParserService } from './event-parser.service';
import { RenderPriorityProviderService } from './render-priority-provider.service';
import { RenderPrioritySorterService } from './render-priority-sorter.service';

export class ConfigurationParserService implements Parsable {
  private readonly configuration: ConfigurationItem[];
  private readonly componentFactory: ComponentFactory;
  private readonly destinationElement: Element;

  constructor(private readonly options: ConfigurationParserOptions) {
    this.configuration = [
      ...options.configuration
    ];
    this.componentFactory = new ComponentFactory();
    this.destinationElement = <Element> options.destinationElement.cloneNode(true);
  }

  parse(): Element {
    const sortedConfigurationByRenderPriority = this.getSortedConfigurationByRenderPriority();

    sortedConfigurationByRenderPriority.forEach((configurationItem: ConfigurationItem) => {
      const attributes = configurationItem.attributes;
      const events = configurationItem.events;

      let customComponent = this.componentFactory.create(configurationItem.render);

      if (attributes) {
        const attributeParserService = new AttributeParserService({
          attributes,
          destinationElement: customComponent
        });
        customComponent = <HTMLElement> attributeParserService.parse();
      }

      if (events) {
        const eventParserService = new EventParserService({
          events,
          destinationElement: customComponent
        });
        customComponent = <HTMLElement> eventParserService.parse();
      }

      this.destinationElement.appendChild(customComponent);
    });

    return this.destinationElement;
  }

  private getConfigurationItems(renderType: string) {
    return this.configuration
      .filter((configurationItem: ConfigurationItem) => configurationItem.render === renderType);
  }

  private getSortedConfigurationByRenderPriority() {
    const buttonRenderPriorityProviderService = new RenderPriorityProviderService({
      configuration: this.getConfigurationItems(ComponentType.BUTTON_WRAPPER)
    });

    const formControlRenderPriorityProviderService = new RenderPriorityProviderService({
      configuration: this.getConfigurationItems(ComponentType.INPUT_WRAPPER)
    });

    const buttonRenderPrioritySorterService = new RenderPrioritySorterService({
      configuration: buttonRenderPriorityProviderService.verifyConfigurationItems()
    });

    const formControlRenderPrioritySorterService = new RenderPrioritySorterService({
      configuration: formControlRenderPriorityProviderService.verifyConfigurationItems()
    });

    const sortedButtonConfigurationItems = buttonRenderPrioritySorterService.sort();
    const sortedFormControlConfigurationItems = formControlRenderPrioritySorterService.sort();

    return sortedFormControlConfigurationItems.concat(sortedButtonConfigurationItems);
  }
}
