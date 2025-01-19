import {
  // LoaderFunction,
  LoaderFunctionArgs
} from 'react-router'
import { getPost } from './getPost'
import { lazyWithPreload } from 'utils'

export const LazyPagePost = lazyWithPreload(() => import('./'))

/* ======================
        loader()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// Note: If you use loader: LoaderFunction it will appease Typescript here,
// but in PagePost you will get red squigglies for:
//
//   const { data: post, success } = useLoaderData() as PostLoaderData
//
//   // Property 'data' does not exist on type 'PostLoaderData'.
//   // Property 'success' does not exist on type 'PostLoaderData'.
//
/////////////////////////
//
// Because by default, loaders wait for the data before transitioning,
// We can use the loader to import the component.
//
// From what I can tell, .preload() will cache the import, so
// that in subsequent requests it's essentially rendered synchronously.
//
// await is important here in order to block transitioning and avoid the
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params.postId as string

  // await import('utils')
  //   .then(async (module) => {
  //     module.log('Sleeping for three seconds.')
  //     await module.sleep(3000)
  //     return
  //   }).catch((err) => err)

  await LazyPagePost.preload().then((component: any) => {
    return component
  })

  return getPost(postId)
}

// https://github.com/remix-run/react-router/discussions/9792
export type PostLoaderData = Awaited<ReturnType<typeof loader>>
