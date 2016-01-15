import React from 'react'
import ReactDOM from 'react-dom'
import { JustifiedParagraph } from '../src/reactComponent'

describe('React Component API', () => {

  let prototype
  let mountPoint
  let el

  before(() => {
    prototype = window.HTMLJustifiedParagraphElement.prototype
    mountPoint = document.createElement('div')
    document.body.appendChild(mountPoint)
  })

  describe('mounting the React wrapper', () => {

    before(done => {
      prototype.createdCallback.reset()
      prototype.attachedCallback.reset()
      ReactDOM.render(<JustifiedParagraph />, mountPoint)
      setTimeout(done)
    })

    it('calls createdCallback()', () => {
      expect(prototype.createdCallback).to.be.calledOnce()
    })

    it('calls attachedCallback()', () => {
      expect(prototype.attachedCallback).to.be.calledOnce()
    })

    it("mounts a custom element in the React wrapper's view hierarchy...",
      () => {
        el = mountPoint.childNodes[0]
        expect(el).to.be.a(window.HTMLJustifiedParagraphElement)
      }
    )

    it('containing no children', () => {
      expect(el.childNodes).to.be.empty()
    })

  })

  const text = 'hello world'

  describe('updating the contents of the React Wrapper', () => {

    before(done => {
      ReactDOM.render(
        <JustifiedParagraph>{text}</JustifiedParagraph>,
        mountPoint
      )
      setTimeout(done)
    })

    it('should not replace the paragraph element', () => {
      expect(mountPoint.childNodes[0]).to.be(el)
    })

    it('should append a child node', () => {
      expect(el.childNodes).to.have.length(1)
      const child = el.childNodes[0]
      expect(child.childNodes).to.be.empty()
      expect(child.textContent).to.be(text)
    })

  })

  describe('replacing the React Wrapper', () => {

    before(done => {
      prototype.detachedCallback.reset()
      ReactDOM.render(<div>{text}</div>, mountPoint)
      setTimeout(done)
    })

    it('should replace the paragraph element', () => {
      expect(mountPoint.childNodes[0]).not.to.be(el)
    })

    it('should call detachedCallback()', () => {
      expect(prototype.detachedCallback).to.be.calledOnce()
    })

  })

  after(() => {
    ReactDOM.unmountComponentAtNode(mountPoint)
    document.body.removeChild(mountPoint)
  })

})
