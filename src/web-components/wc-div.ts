/* eslint-disable @typescript-eslint/no-namespace */
import { DetailedHTMLProps, HTMLAttributes } from 'react'

import {
  cssPropertiesToString,
  convertReactClassName,
  isStringifiedArray,
  isStringifiedObject
} from './utlis'

///////////////////////////////////////////////////////////////////////////
//
// Declaring the type in the same file is useful for React ONLY cases, but makes
// less sense as soon as you consider that it could be implemented in other frameworks.
// Usage: In main.tsx do: import './web-components/wc-div'
// Then use anywhere as follows:
//
//   <wc-div
//     ref={wcDivRef}
//     style={{ border: '1px solid var(--color-blue-500)' }}
//     className='mx-auto max-w-[600px] cursor-pointer rounded-lg bg-white p-2 shadow-lg'
//     divClassName='font-black text-blue-500 text-3xl text-center'
//     // divStyle={JSON.stringify({ outline: '2px dashed green' })}
//     // divStyle='outline: 2px dashed orange;'
//     // divStyle={`
//     //   outline: 2px dashed orange;
//     //   background-color: var(--color-neutral-100);
//     // `}
//     onClick={() => alert('Whuddup!')}
//     globalCSSPath={'/src/styles/main.css'}
//     data={JSON.stringify(['Muffy', 1, true])}
//   >
//     Read A Book
//   </wc-div>
//
///////////////////////////////////////////////////////////////////////////

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wc-div': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        divClassName?: string
        globalCSSPath?: string
        divStyle?: string
        // Here I'm explicitly creating a myData attribute, but it's
        // actually easier to just use the actual HTML data-* attribute.
        myData?: any
      }
    }
  }
}

/* ========================================================================

======================================================================== */

class WCDiv extends HTMLElement {
  // Pass properties and methods out.
  api: Record<string, any> = {}

  // Pass data in directly by mutating, or create a setter and getter.
  state: Record<string, any> = {}

  constructor() {
    super()
  }

  handleMouseOver = () => {
    console.log('Mouse Over!')
    console.log('state:', this.state)
  }

  handleMouseOut = () => {
    console.log('Mouse Out!')
  }

  ///////////////////////////////////////////////////////////////////////////
  //
  // This approach doesn't use the shadow DOM, which makes it work with global CSS out of the box.
  // The downside is that you can't leverage the shadow DOM's encapsulation, <slots>, etc.
  // connectedCallback() {
  //   this.removeAttribute('globalCSSPath')
  //   convertReactClassName(this)
  //   this.style.display = 'block' // Default is inline
  //   const div = document.createElement('div')
  //   const divClassName = this.getAttribute('divClassName') || ''
  //   this.removeAttribute('divClassName')
  //   if (div instanceof HTMLElement) {
  //     if (typeof divClassName === 'string') {
  //       div.setAttribute('class', divClassName)
  //     }
  //   }
  //   // Move any innerHTML / children to the div.
  //   div.innerHTML = this.innerHTML
  //   this.innerHTML = ''
  //   this.appendChild(div)
  // }
  //
  ///////////////////////////////////////////////////////////////////////////

  connectedCallback() {
    convertReactClassName(this)
    // This will override CSS classes, but not the style prop.
    this.style.display = 'block'
    this.style.padding = ''
    this.style.margin = ''

    this.onmouseover = this.handleMouseOver
    this.onmouseout = this.handleMouseOut

    this.api = {
      getInfo: () =>
        console.log("I'm the API. Use me to expose methods and properties")
    }

    /* ======================
             myData
    ====================== */

    let myData: any = this.getAttribute('myData') || ''
    this.removeAttribute('myData')

    if (isStringifiedObject(myData) || isStringifiedArray(myData)) {
      myData = JSON.parse(myData)
      console.log('myData:', myData)
    }

    // let dataArray: any = this.getAttribute('data-array') || ''
    // if (isStringifiedArray(dataArray)) {
    //   dataArray = JSON.parse(dataArray)
    //   console.log('dataArray;', dataArray)
    // }

    /* ======================
            shadow
    ====================== */

    const template = document.createElement('template')
    const globalCSSPath = this.getAttribute('globalCSSPath') || ''
    this.removeAttribute('globalCSSPath')

    // If you want global CSS to work inside of your component, then you need to bring it in.
    // Rather than hardcoding `@import '/src/styles/main.css';`, we can use globalCSSPath.
    // But actually, a better approach would be to use an array in order to add multiple stylesheets.
    template.innerHTML = `
    <style>
      ${globalCSSPath && `@import '${globalCSSPath}';`}
      div {
        /* Your styles here... */
        /* outline: 2px dashed red; */
      }
    </style>

    <div>
      <slot></slot>
    </div>
    `

    // If we wanted to get the div from a ref, then we'd need to do this:
    // const div = wcDiv.shadowRoot.querySelector('div')
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(template.content.cloneNode(true))

    /* ======================
              div
    ====================== */
    // Move the divClassName attribute to the div. There's really
    // no need to do this, but it's good for demo purposes.

    const div = shadow.querySelector('div')

    const divClassName = this.getAttribute('divClassName') || ''
    this.removeAttribute('divClassName')

    let divStyle: any = this.getAttribute('divStyle') || ''
    this.removeAttribute('divStyle')

    const divStyleIsObject = isStringifiedObject(divStyle)

    if (divStyleIsObject) {
      const divStyleObject = JSON.parse(divStyle)

      if (divStyleObject && typeof divStyleObject === 'object') {
        divStyle = cssPropertiesToString(divStyleObject as any)
      }
    }

    if (div instanceof HTMLDivElement) {
      div.setAttribute('style', divStyle)

      if (typeof divClassName === 'string') {
        div.setAttribute('class', divClassName)
      }
    }
  }
}

customElements.define('wc-div', WCDiv)

/* ======================
         useEffect
  ====================== */
///////////////////////////////////////////////////////////////////////////
//
// It turns out that passing functions as attributes to web components
// does not work very well. Well, it works great with common JSX synthetic
// event handlers, but as soon as you try to use a custom attribute, the
// behavior changes.
//
//   onclick={`(${() => {
//     alert(message) // ❌ Uncaught ReferenceError: message is not defined
//     handleClick()  // ❌ Uncaught ReferenceError: handleClick is not defined
//   }})()`}
//
// It will end up looking for message or handleClick in the global scope.
// The better solution would be to use a ref to assign event handlers to internal
// parts of the component, or possibly pass in slots with event handlers on them.
//
// The third options would be to send an object with the args and a stringified function
// to revive on the other side, but that feels super hacky.
//
/////////////////////////
//
// The bigger takeaway here is that any attribute that requires complex data needs to be
// serialized before passing it to the web component as an attribute. Then it needs to
// be deserialized within the web component. Otherwise, it will be turned into [object object],
// and at that point, it's not readable.
//
// ///////////////////////////////////////////////////////////////////////////

// useEffect(() => {
//   const wcDiv = wcDivRef.current

//   wcDiv.api?.getInfo?.()
//   wcDiv.state.test = 'abc123'

//   const handleDivClick = (e: any) => {
//     // e.stopPropagation()
//     console.dir(e.currentTarget)
//   }
//   const div = wcDiv.shadowRoot.querySelector('div')

//   if (div instanceof HTMLElement) {
//     div?.addEventListener('click', handleDivClick)
//   }

//   return () => {
//     div?.removeEventListener('click', handleDivClick)
//   }
// }, [])
