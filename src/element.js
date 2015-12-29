import { createdCallback } from './createdCallback';
import { attachedCallback } from './attachedCallback';
import { detachedCallback } from './detachedCallback';
import { attributeChangedCallback } from './attributeChangedCallback';

var MyElement = document.registerElement(
  'jus-ti-fied',
  {
    extends: 'p',
    prototype: Object.create(
      HTMLParagraphElement.prototype, {
      createdCallback: {value: createdCallback},
      attachedCallback: {value: attachedCallback},
      detachedCallback: {value: detachedCallback},
      attributeChangedCallback: {value: attributeChangedCallback}
    })
  }
);
