/* @flow */

export const typeName = (value: any): string => {

  const primitiveType = typeof value
  if (typeof primitiveType !== 'object') return primitiveType

  const constructorType = Object.prototype.toString.call(value).slice(8, -1) // eslint-disable-line no-magic-numbers

  const dedupe = (m, e) => { // eslint-disable-line max-params
    m[typeName(e)] = true // eslint-disable-line no-param-reassign
    return m
  }

  if (value.hasOwnProperty('length')) {
    return `${constructorType}<${
      Object.keys(
        Array.prototype.reduce.call(value, dedupe, {})
      ).join('|')
    }>`
  }
  if (Map && value instanceof Map) {
    return `${constructorType}<${
      Object.keys(
        Array.from(value.keys()).reduce(dedupe, {})
      ).join('|')
    }, ${
      Object.keys(
        Array.from(value.values()).reduce(dedupe, {})
      ).join('|')
    }>`
  }
  if (Set && value instanceof Set) {
    return `${constructorType}<${
      Object.keys(
        Array.from(value.keys()).reduce(dedupe, {})
      ).join('|')
    }>`
  }

  return constructorType

}
