import { injectCallbacks } from '../src/injectCallbacks'
import * as callbacks from '../src/elementCallbacks'

// set up spies
Object.keys(callbacks).forEach(key => {
  if (typeof callbacks[key] === 'function') {
    callbacks[key] = sinon.spy(callbacks[key])
  }
})
injectCallbacks(callbacks)

describe('document.registerElement API', () => {

  let prototype
  let el

  describe('HTMLJustifiedParagraphElement', () => {

    it('should be set as a property on `window`', () => {
      expect(window.HTMLJustifiedParagraphElement).to.be.a('function')
    });

    (Object.__proto__ ? it : it.skip)( // eslint-disable-line no-ternary, no-proto
    'should be a constructor when invoked with "new"', () => {
      expect(new window.HTMLJustifiedParagraphElement())
        .to.be.a(window.HTMLJustifiedParagraphElement)
    });

    (Object.__proto__ ? it : it.skip)( // eslint-disable-line no-ternary, no-proto
    '...as well as document.createElement()', () => {
      expect(document.createElement('p', 'jus-ti-fied'))
        .to.be.a(window.HTMLJustifiedParagraphElement)
    })

    after(() => {
      prototype = window.HTMLJustifiedParagraphElement.prototype
      prototype.createdCallback.reset()
    })

  })

  describe('createdCallback()', () => {

    before(() => {
      prototype.createdCallback.reset()
      el = document.createElement('p', 'jus-ti-fied')
    })

    it('should exist on the prototype', () => {
      expect(prototype.createdCallback).to.be.a('function')
    })

    it('should be called when the element is created', () => {
      expect(prototype.createdCallback).to.be.calledOnce()
    })

  })

  describe('attachedCallback()', () => {

    before((done) => {
      prototype.attachedCallback.reset()
      document.body.appendChild(el)
      setTimeout(done)
    })

    it('should exist on the prototype', () => {
      expect(prototype.attachedCallback).to.be.a('function')
    })

    it('should be called when the element is attached', () => {
      expect(prototype.attachedCallback).to.be.calledOnce()
    })

  })

  describe('attributeChangedCallback()', () => {

    it('should exist on the prototype', () => {
      expect(prototype.attributeChangedCallback).to.be.a('function')
    })

    describe('adding an attribute', () => {

      before((done) => {
        el.setAttribute('class', 'fooClass')
        setTimeout(done)
      })

      it('should be called with (string, null, string)', () => {
        expect(prototype.attributeChangedCallback)
          .to.be.calledWith('class', null, 'fooClass')
      })

    })

    describe('altering an attribute', () => {

      before((done) => {
        el.setAttribute('class', 'barClass')
        setTimeout(done)
      })

      it('should be called with (string, string, string)', () => {
        expect(prototype.attributeChangedCallback)
          .to.be.calledWith('class', 'fooClass', 'barClass')
      })

    })

    describe('removing an attribute', () => {

      before((done) => {
        el.removeAttribute('class')
        setTimeout(done)
      })

      it('should be called with (string, string, null)', () => {
        expect(prototype.attributeChangedCallback)
          .to.be.calledWith('class', 'barClass', null)
      })

    })

    after(() => {
      prototype.attributeChangedCallback.reset()
    })

  })

  describe('detachedCallback()', () => {

    before((done) => {
      prototype.detachedCallback.reset()
      document.body.removeChild(el)
      setTimeout(done)
    })

    it('should exist on the prototype', () => {
      expect(prototype.detachedCallback).to.be.a('function')
    })

    it('should be called when the element is detached', () => {
      expect(prototype.detachedCallback).to.be.calledOnce()
    })

  })

})
