/* @flow */

declare class HTMLParagraphElement extends HTMLElement {
  align: string;
}

document.registerElement(
  'jus-ti-fied',
  {
    extends: 'p',
    prototype: Object.create(
      HTMLParagraphElement.prototype,
      {
        createdCallback: {
          value: function createdCallback() {
            console.log('here I am ^_^ ');
            console.log('with content: ', this.textContent);
          }
        },
        attachedCallback: {
          value: function attachedCallback() {
            console.log('live on DOM ;-) ');
          }
        },
        detachedCallback: {
          value: function detachedCallback() {
            console.log('leaving the DOM :-( )');
          }
        },
        attributeChangedCallback: {
          value: function attributeChangedCallback(
            name,
            previousValue,
            value
          ) {
            if (previousValue === null || previousValue === undefined) {
              console.log(
                'got a new attribute ', name,
                ' with value ', value
              );
            } else if (value === null || value === undefined) {
              console.log(
                'somebody removed ', name,
                ' its value was ', previousValue
              );
            } else {
              console.log(
                name,
                ' changed from ', previousValue,
                ' to ', value
              );
            }
          }
        }
      }
    )
  }
);
