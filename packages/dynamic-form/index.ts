import { ButtonWrapperComponent, FormWrapperComponent, InputWrapperComponent } from './components';
import { ComponentType } from './enums';

customElements.define(ComponentType.BUTTON_WRAPPER, ButtonWrapperComponent);
customElements.define(ComponentType.FORM_WRAPPER, FormWrapperComponent);
customElements.define(ComponentType.INPUT_WRAPPER, InputWrapperComponent);
