/* @flow */

export default function injectCallbacks (
  callbacks: {
    createdCallback: () => void,
    attachedCallback: () => void,
    detachedCallback: () => void,
    attributeChangedCallback: (
      attributeLocalName: string,
      oldAttributeValue: ?string,
      newAttributeValue: ?string,
      attributeNamespace: ?string
    ) => void
  }
): void {
  const {
    createdCallback,
    attachedCallback,
    detachedCallback,
    attributeChangedCallback
  } = callbacks
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
