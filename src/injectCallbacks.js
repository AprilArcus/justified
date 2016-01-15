/* @flow */

declare class HTMLParagraphElement extends HTMLElement {
  align: string;
}

export const injectCallbacks = ({
  createdCallback,
  attachedCallback,
  detachedCallback,
  attributeChangedCallback
}: {
  createdCallback: () => void,
  attachedCallback: () => void,
  detachedCallback: () => void,
  attributeChangedCallback: (
    attributeLocalName: string,
    oldAttributeValue: ?string,
    newAttributeValue: ?string,
    attributeNamespace: ?string
  ) => void
}): void => {
  window.HTMLJustifiedParagraphElement = document.registerElement(
    'jus-ti-fied', {
      extends: 'p',
      prototype: Object.create(
        HTMLParagraphElement.prototype, {
          createdCallback: { value: createdCallback },
          attachedCallback: { value: attachedCallback },
          detachedCallback: { value: detachedCallback },
          attributeChangedCallback: { value: attributeChangedCallback }
        }
      )
    }
)
}
