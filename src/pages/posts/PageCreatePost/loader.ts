import { lazyWithPreload } from 'utils'

export const LazyPageCreatePost = lazyWithPreload(() => import('./'))

/* ======================
        loader()
====================== */

export const loader = async () => {
  await LazyPageCreatePost.preload().then((component: any) => {
    return component
  })
  return null
}
