import '@testing-library/jest-dom'

// jsdom does not implement window.matchMedia; provide a minimal stub.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// jsdom does not implement scrollIntoView, which the hash-scroll effect calls.
Element.prototype.scrollIntoView = () => {}

// jsdom does not implement window.scrollTo either; the route-change effect calls it.
window.scrollTo = () => {}
