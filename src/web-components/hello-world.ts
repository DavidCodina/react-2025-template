/* eslint-disable @typescript-eslint/no-namespace */
import { DetailedHTMLProps, HTMLAttributes } from 'react'

/* ========================================================================

======================================================================== */
// https://web-highlights.com/blog/how-to-use-web-components-in-react/
// Web Components are reusable client-side components based on official web
// standards and supported by all major browsers. They are an excellent way
// of encapsulating functionality from the rest of our code.

// See also: https://medium.com/@mariusbongarts/the-complete-web-component-guide-part-1-custom-elements-a627af805df8
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hello-world': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

class HelloWorld extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `<h1>Hello world!</h1>`
  }
}

customElements.define('hello-world', HelloWorld)
