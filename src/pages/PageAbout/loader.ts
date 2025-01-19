// import { lazy } from 'react'
import {
  lazyWithPreload
  //, sleep
} from 'utils'

///////////////////////////////////////////////////////////////////////////
//
// If you use this implementation, then MainLayout.tsx will render the
// FixedGlobalSpinner for the duration of the loader await time.
// Then MainLayout.tsx will render the Suspense fallback for the duration
// of the LazyPageAbout wait time.
//
//   export const LazyPageAbout = lazy(async () => {
//     await sleep(3000)
//     return import('./')
//   })
//
//   export const loader = async () => {
//     await sleep(3000)
//     return null
//   }
//
///////////////////////////////////////////////////////////////////////////

export const LazyPageAbout = lazyWithPreload(() => {
  return import('./')
})

export const loader = async () => {
  //^ await sleep(3000)
  await LazyPageAbout.preload().then((component: any) => {
    return component
  })
  return null
}
