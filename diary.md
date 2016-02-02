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

2016-02-01
==========

IE8 support has been / will be dropped in
  jQuery 2      (2013-04-18)
  AngularJS 1.3 (2014-10-13)
  Ember.js 2    (2015-08-13)
  lodash 4      (2016-01-12)
  Sinon.js 2    (TBA)
  React 0.15    (TBA)
  Redux 4       (TBA)


An an arbitrary time, the DRE may contain these node types:

1.) HTMLElement nodes specified in the DOM tree.
    These are never added, removed, or mutated.

2.) Text nodes specified in the DOM tree, child nodes to the DRE
    or its children. These are never added or removed, but
    may exist in two states:

    2a.) As specified in the DOM tree
    2b.) With their text content set to the empty string

3.) Spans (and their text node children) introduced for the purpose
    of obtaining text metrics

4.) Spans (and their text node children) used to set text.

The DRE has three states:

Clean: contains only (1) and (2a)

Measuring: contains (1), (2a), and (3)

Set: contains (1), (2b), (intermittently 3), and (4)

Upon attachedCallback:
  The DRE enters state "Measuring"
    * Intrusive elements of type (3) are appended into the DRE.
    * Intrusive elements of type (3) may be removed from the DRE.

  At a subsequent point, asynchronously:
    The DRE enters state "Set"
      * Intrusive elements of type (3) may be removed from the DRE.
      * The DRE has an Array<Glue|Box|Penalty>.
      * The DRE may have an Array<number> of breakpoint indices.
      * Intrusive elements of type (4) may be appended into the DRE.
      * Intrusive elements of type (4) may be removed from the DRE.

  At any point, synchronously:
    The DRE may enter state "Clean"
      * All intrusive elements are removed from the DRE
      * All elements of type (2b) are converted to type (2a)
      * All pending DOM manipulations are cancelled.

???

Each TextNode contains the following properties, encoded either
directly on the object or in a WeakMap:
  * Original text content
  * Cancel codes for enqueeued measurement operations

