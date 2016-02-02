let mutate
let measure

if (window.fastdom) {
  mutate = window.fastdom.mutate
  measure = window.fastdom.measure
} else {
  console.warn(`Install fastdom to avoid layout thrashing.
https://github.com/wilsonpage/fastdom`)
  mutate = measure = callback => callback()
}

export { mutate as mutate }
export { measure as measure }
