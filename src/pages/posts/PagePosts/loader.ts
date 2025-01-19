import {
  LoaderFunction
  // LoaderFunctionArgs
  // defer
} from 'react-router'
import { getPosts } from './getPosts'
import { lazyWithPreload } from 'utils'

export const LazyPagePosts = lazyWithPreload(() => import('./'))

/* ======================
        loader()
====================== */
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
// load the component. If the component has not been loaded yet (and is lazy),
// then normally it would show the Suspense fallback. The implication in
// those examples is that component prefetching is almost always going to
// be faster than the data fetching, so there's no need to await it. Thus,
// if you're also using the same loader to fetch data, then it may make
// sense to omit the await.
//
///////////////////////////////////////////////////////////////////////////

// export const loader = (async ({ context, params, request }: LoaderFunctionArgs) => {
export const loader = (async () => {
  // await import('utils')
  //   .then(async (module) => {
  //     module.log(' Sleeping for 3 seconds. ')
  //     await module.sleep(3000)
  //     return
  //   }).catch((err) => err)

  await LazyPagePosts.preload().then((component: any) => {
    return component
  })

  return getPosts()

  // Using satisfies LoaderFunction works better than const loader: LoaderFunction = async () => {}
  // Otherwise the PostsLoaderData below becomes: DataFunctionValue
  // type DataFunctionValue = Response | NonNullable<unknown> | null;
  // Alternatively, just use LoaderFunctionArgs
}) satisfies LoaderFunction

///////////////////////////////////////////////////////////////////////////
//
// See Academind video at 35:30 for the example that uses defer(), <Await /> and <Suspense />
// https://www.youtube.com/watch?v=L2kzUg6IzxM
//
// export const loader = (async (/* { context, params, request } */) => {
//   await LazyPagePosts.preload().then((component: any) => {
//     return component
//   })
//
//   return defer({ result: getPosts() })
// }) satisfies LoaderFunction
//
///////////////////////////////////////////////////////////////////////////

// https://github.com/remix-run/react-router/discussions/9792
// Unfortunately it seems like we have to do this kind of thing.
// Unlike in Remix where you can do this: useLoaderData<typeof loader>();
// https://remix.run/docs/en/main/start/tutorial#type-inference
export type PostsLoaderData = Awaited<ReturnType<typeof loader>> // extends IResponse | infer D ? D : never
