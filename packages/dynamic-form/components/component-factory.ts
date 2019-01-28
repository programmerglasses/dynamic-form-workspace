import { ComponentType } from '../enums';

export class ComponentFactory {
  create(componentType: ComponentType) {
    return this.createComponent(componentType);
  }

  private createButton() {
    return document.createElement(ComponentType.BUTTON_WRAPPER);
  }

  private createComponent(componentType: ComponentType) {
    switch (componentType) {
      case ComponentType.BUTTON_WRAPPER:
        return this.createButton();
      case ComponentType.INPUT_WRAPPER:
        return this.createInput();
      default:
        throw new Error('Unexpected component type.');
    }
  }

  private createInput() {
    return document.createElement(ComponentType.INPUT_WRAPPER);
  }
}
