import { ComponentType } from '../enums';

export class ComponentFactory {
  create(componentType: ComponentType) {
    return this.createComponent(componentType);
  }

  createButton() {
    return document.createElement(ComponentType.BUTTON_WRAPPER);
  }

  createComponent(componentType: ComponentType) {
    switch (componentType) {
      case ComponentType.BUTTON_WRAPPER:
        return this.createButton();
      case ComponentType.INPUT_WRAPPER:
        return this.createInput();
      default:
        throw new Error('Unexpected component type.');
    }
  }

  createInput() {
    return document.createElement(ComponentType.INPUT_WRAPPER);
  }
}
