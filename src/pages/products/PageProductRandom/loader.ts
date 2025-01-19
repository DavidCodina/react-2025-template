import { lazyWithPreload /* , sleep  */ } from 'utils'
export const LazyPageProductRandom = lazyWithPreload(() => import('./'))

export const loader = async () => {
  await LazyPageProductRandom.preload().then((component: any) => {
    return component
  })
  return null
}
