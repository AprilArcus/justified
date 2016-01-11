import { injectCallbacks } from '../src/injectCallbacks'
import {
  createdCallback,
  attachedCallback,
  detachedCallback,
  attributeChangedCallback
} from '../src/elementCallbacks'

injectCallbacks({
  createdCallback: sinon.spy(createdCallback),
  attachedCallback: sinon.spy(attachedCallback),
  detachedCallback: sinon.spy(detachedCallback),
  attributeChangedCallback: sinon.spy(attributeChangedCallback)
})

describe('document.registerElement API', () => {

  const el = document.createElement('p', 'jus-ti-fied')

  describe('createdCallback()', () => {

    it('should be called when the element is created', () => {
      expect(el.createdCallback).to.be.calledOnce()
    })

  })

  describe('attachedCallback()', () => {

    before(done => setTimeout(() => {
      document.body.appendChild(el)
      done()
    }))

    it('should be called when the element is attached', () => {
      expect(el.attachedCallback).to.be.calledOnce()
    })

  })

  describe('attributeChangedCallback()', () => {

    describe('adding an attribute', () => {

      before(done => setTimeout(() => {
        el.setAttribute('class', 'fooClass')
        done()
      }))

      it('should be called with (string, null, string)', () => {
        expect(el.attributeChangedCallback)
          .to.be.calledWith('class', null, 'fooClass')
      })

    })

    describe('altering an attribute', () => {

      before(done => setTimeout(() => {
        el.setAttribute('class', 'barClass')
        done()
      }))

      it('should be called with (string, string, string)', () => {
        expect(el.attributeChangedCallback)
          .to.be.calledWith('class', 'fooClass', 'barClass')
      })

    })

    describe('removing an attribute', () => {

      before(done => setTimeout(() => {
        el.removeAttribute('class')
        done()
      }))

      it('should be called with (string, string, null)', () => {
        expect(el.attributeChangedCallback)
          .to.be.calledWith('class', 'barClass', null)
      })

    })

  })

  describe('detachedCallback()', () => {

    before(done => setTimeout(() => {
      el.parentNode.removeChild(el)
      done()
    }))

    it('should be called when the element is detached', () => {
      expect(el.detachedCallback).to.be.calledOnce()
    })

  })

})
