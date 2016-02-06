import * as placeholders from '../../src/utils/placeholders'

describe('placeholders', () => {

  it('exports a namespace', () => {
    expect(placeholders).to.be.an('object')
  })

  it('has a `gluePlaceholder` key', () => {
    expect(placeholders).to.have.property('gluePlaceholder')
  })

  it('has a `hyphenPlaceholder` key', () => {
    expect(placeholders).to.have.property('hyphenPlaceholder')
  })

  it('has no collisions', () => {
    Object.keys(placeholders).forEach(key => {
      Object.keys(placeholders)
        .filter(otherKey => key !== otherKey)
        .forEach(otherKey => {
          expect(key).not.to.be(otherKey)
        })
    })
  })

})
