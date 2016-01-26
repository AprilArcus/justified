2015-12-27
==========

* Polyfills & DevServer
* Subclassed HTMLParagraphElement with an is="jus-ti-fied" attribute.

2015-12-28
==========

Immediate Goals:
  * reproduce the functionality of the React Responsive Linebreaker in [AprilArcus/typeset](https://github.com/AprilArcus/typeset)
  * Code should be
    * readable
    * modular (ES6 Modules + webpack)
    * tested
    * linted (ESLint)
    * statically typed (Flow)
  * Native Component API: document.registerElement() [WebReflection/document-register-element](https://github.com/WebReflection/document-register-element)
  * Targeted Component APIs:
    * jQuery Plugin
    * React Component
    * Angular Directive

Non-goals:
  * shadow DOM
  * speed

Target:
  * IE8+

2016-01-21
==========

React interop strategy:

1.) after the component renders, walk the DOM tree starting at the component root. whenever we encounter a text node:
  * record it, its parent, and its index
  * remove it from the DOM
  * for each of its syllables:
    * generate a `<span>` element
    * enqeue a DOM write:
      * append it to the DOM
      * enqueue a DOM read:
        * measure it
        * enqueue a DOM write:
          * append the next syllable
          * enqueue a DOM read
            * measure it, find the kern
            * generate a penalty box object

3.) before resolution or unmounting, restore the component to the state the React expects:
  * remove all the syllables
  * restore all the text nodes
