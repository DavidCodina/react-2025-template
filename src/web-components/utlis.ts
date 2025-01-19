///////////////////////////////////////////////////////////////////////////
//
// This is needed to convert React's className.
// For the top-level style prop, React is able to convert it automatically.
// However, that's not true for custom props like if we had a divStyle prop.
// In that case, we'd need to have a function that converted an object to a string.
// But it's even more complicated than that because you can't normally pass an object
// to a web component. You'd have to do this:
//
//   divStyle={JSON.stringify({ outline: '2px dashed green' })}
//
// Then you'd need to jump through a bunch of hoops to unparse it, etc.
//
// Fortunately, normal event handlers like onClick will just work, but you'll
// run into issues if you try to pass a lambda in some non-standard attribute.
// In that case, you'd need to do it in an HTML way.
//
///////////////////////////////////////////////////////////////////////////

export const convertReactClassName = (self: any) => {
  const className = self.getAttribute('className') || ''
  if (typeof className === 'string') {
    self.setAttribute('class', className)
  }
  self.removeAttribute('className')
}

/* ======================

====================== */

export const convertCamelCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/* ======================

====================== */

export const cssPropertiesToString = (
  styles: Record<string, string>
): string => {
  return Object.entries(styles)
    .map(([key, value]) => `${convertCamelCase(key)}: ${value};`)
    .join(' ')
}

/* ======================

====================== */

export const isStringifiedObject = (str: string): boolean => {
  return str.startsWith('{') && str.endsWith('}')
}

/* ======================

====================== */

export const isStringifiedArray = (str: string): boolean => {
  return str.startsWith('[') && str.endsWith(']')
}
