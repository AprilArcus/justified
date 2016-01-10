/* @flow */
/* eslint func-style: 0, no-invalid-this: 0, max-params: 0 */

export function createdCallback (): void {
  console.log('here I am ^_^ ');
  console.log('with content: ', this.textContent);
}

export function attachedCallback (): void {
  console.log('live on DOM ;-) ');
}

export function detachedCallback (): void {
  console.log('leaving the DOM :-( )');
}

export function attributeChangedCallback (
  attributeLocalName: string,
  oldAttributeValue: ?string,
  newAttributeValue: ?string,
  attributeNamespace: ?string
): void {
  if (oldAttributeValue === null || oldAttributeValue === undefined) {
    console.log(
      'got a new attribute ', attributeLocalName,
      ' with value ', newAttributeValue
    );
  } else if (newAttributeValue === null || newAttributeValue === undefined) {
    console.log(
      'somebody removed ', attributeLocalName,
      ' its value was ', oldAttributeValue
    );
  } else {
    console.log(
      attributeLocalName,
      ' changed from ', oldAttributeValue,
      ' to ', newAttributeValue
    );
  }
}
