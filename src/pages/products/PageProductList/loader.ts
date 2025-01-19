import { lazyWithPreload /* , sleep  */ } from 'utils'
export const LazyPageProductList = lazyWithPreload(() => import('./'))

export const loader = async () => {
  await LazyPageProductList.preload().then((component: any) => {
    return component
  })
  return null
}
