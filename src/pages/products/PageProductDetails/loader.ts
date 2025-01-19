import { lazyWithPreload /* , sleep  */ } from 'utils'
export const LazyPageProductDetails = lazyWithPreload(() => import('./'))

export const loader = async () => {
  await LazyPageProductDetails.preload().then((component: any) => {
    return component
  })
  return null
}
