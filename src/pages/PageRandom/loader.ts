import { lazyWithPreload /* , sleep */ } from 'utils'
export const LazyPageRandom = lazyWithPreload(() => import('./'))

export const loader = async () => {
  ///////////////////////////////////////////////////////////////////////////
  //
  // Because by default, loaders wait for the data before transitioning,
  // We can use the loader to import the component.
  //
  // From what I can tell, .preload() will cache the import, so
  // that in subsequent requests it's essentially rendered synchronously.
  //
  // await is imortant here in order to block transitioning and avoid the
  // Supsense fallback. That said, in the following article you see
  // examples of him explicitly saying not to await.
  //
  //   https://www.infoxicator.com/en/react-router-6-4-code-splitting
  //
  // Generally, what happens is that the loader will fetch the data, then
  // load the component. If the comonent has not been loaded yet (and is lazy),
  // then normally it would show the Suspense fallback. The implication in
  // those examples is that component prefetching is almost always going to
  // be faster than the data fetching, so there's no need to await it. Thus,
  // if you're also using the same loader to fetch data, then it may make
  // sense to omit the await.
  //
  ///////////////////////////////////////////////////////////////////////////

  // Get any API data you need here, or use a separate loader...
  // await sleep(3000) // Simulate slow request

  await LazyPageRandom.preload().then((component: any) => {
    // console.log('The component has been loaded:', component)
    // console.log('Now waiting three seconds.')
    return component
  })

  // return null orAPI data.
  // React Router will complain if your return undefined.
  return null
}
