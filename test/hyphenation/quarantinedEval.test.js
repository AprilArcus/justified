/* global module exports */

import { quarantinedEval } from '../../src/hyphenation/quarantinedEval'

const originalExports = exports

/* eslint-disable no-eval */
describe('eval()', () => {

  describe('allows mutation of local variables', () => {

    it('primitive types', () => {
      let original = 'original' // eslint-disable-line prefer-const
      eval("original = 'mutated'")
      expect(original).to.be('mutated')
    })

    it('object types', () => {
      const original = {}
      eval("original.bogusProp = 'touched'")
      expect(original).to.have.property('bogusProp', 'touched')
    })

  })

  describe('allows mutation of global variables', () => {

    beforeEach(() => {
      expect(window).not.to.have.property('bogusProp')
      expect(Math).not.to.have.property('bogusProp')
      expect(exports).not.to.have.property('namedExport')
      expect(exports).not.to.have.a('string')
    })

    afterEach(() => {
      delete window.bogusProp
      delete Math.bogusProp
      delete HTMLElement.bogusProp
      delete exports.namedExport
      module.exports = originalExports
    })

    it('properties on window', () => {
      eval("window.bogusProp = 'touched'")
      expect(window).to.have.property('bogusProp', 'touched')
    })

    it('properties on global JS objects', () => {
      quarantinedEval("Math.bogusProp = 'touched'")
      expect(Math).to.have.property('bogusProp', 'touched')
    })

    it('properties on DOM objects', () => {
      quarantinedEval("HTMLElement.bogusProp = 'touched'")
      expect(HTMLElement).to.have.property('bogusProp', 'touched')
    })

    it('exports', () => {
      eval("exports.namedExport = 'exported string'")
      expect(exports).to.have.property('namedExport', 'exported string')
    })

    it('module.exports', () => {
      eval("module.exports = 'exported string'")
      expect(module).to.have.property('exports', 'exported string')
    })

  })

})
/* eslint-enable no-eval */

describe('quarantinedEval()', () => {

  describe('forbids mutation of local variables', () => {

    it('primitive types', () => {
      let original = 'original' // eslint-disable-line prefer-const
      quarantinedEval("original = 'mutated'")
      expect(original).to.be('original')
    })

    it('object types', () => {
      const original = {}
      // expect(() =>
        quarantinedEval("original.bogusProp = 'touched'")
      // ).to.throwException(/original is undefined/)
      expect(original).not.to.have.property('bogusProp')
    })

  })

  describe('forbids mutation of global variables', () => {

    it('properties on window', () => {
      quarantinedEval("window.bogusProp = 'touched'")
      expect(window.bogusProp).to.be(undefined)
    })

    it.skip('properties on global JS objects', () => {
      quarantinedEval("Math.bogusProp = 'touched'")
      expect(Math).not.to.have.property('bogusProp')
    })

    it.skip('properties on DOM objects', () => {
      quarantinedEval("HTMLElement.bogusProp = 'touched'")
      expect(HTMLElement).not.to.have.property('bogusProp')
    })

    it('exports', () => {
      quarantinedEval("exports.namedExport = 'exported string'")
      expect(exports.namedExport).to.be(undefined)
    })

    it('module.exports', () => {
      quarantinedEval("module.exports = 'exported string'")
      expect(module.exports).to.be(originalExports)
    })

  })

  describe('returns the exported value of a commonJS module', () => {

    it('via exports', () => {
      expect(quarantinedEval(
        "exports.namedExport = 'exported string'"
      ).namedExport).to.be('exported string')
    })

    it('via module.exports', () => {
      expect(quarantinedEval(
        "module.exports = 'exported string'"
      )).to.be('exported string')
    })

  })

})
