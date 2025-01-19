// Third-party imports
import {
  useEffect
  // Suspense
} from 'react'
import {
  useLoaderData,
  useNavigate,
  useRevalidator
  // See Academind video at 35:30 : https://www.youtube.com/watch?v=L2kzUg6IzxM
  // Await
} from 'react-router'
import { toast } from 'react-toastify'

// Custom imports
import { useThemeContext } from 'contexts'
import { Alert, Button, HR } from 'components'

import { PostsLoaderData } from './loader'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                              PagePosts                  
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Pros of using the loader feature:
//
// 1. You don't have to manually initialize the data fetching within a useEffect().
//
// 2. You don't have to manage any loading state because the page component only
//    renders once the data is available.
//
// 3. You don't necessarily have to check for errors. Instead you can pass the
//    associated <Route /> component an errorElement, which will render in place
//    of the page when an API request errors (i.e., goes to the catch block).
//    That said, such an approach seems kind of heavy handed. More than likey,
//    we wouldn't want to replace our ENTIRE page.
//
// That said, it's pretty clunky to use. I wouldn't recommend it, but still
// wanted to make an example.
//
///////////////////////////////////////////////////////////////////////////

const PagePosts = () => {
  const navigate = useNavigate()
  // What if we needed to make multiple API requests?
  // What if we wanted to cache data?

  const loaderData = useLoaderData() as PostsLoaderData
  const revalidator = useRevalidator()

  const { data: posts, success } = loaderData
  const { mode } = useThemeContext()

  /* ======================
        useEffect()
  ====================== */
  // Even though the React Router <Route errorElement={<PostErrorElement />} /> prop
  // makes it so this type of thing is no longer necessary, I still prefer catching
  // errors in the API function, then using this approach, rather than replacing the
  // ENTIRE page with an error boundary component when an uncaught error occurs.

  useEffect(() => {
    // Don't do !success because you may be dealing with a pending Promise
    if (success === false) {
      toast.error('Unable to get posts!')
    }
  }, [success])

  /* ======================
        renderPosts()
  ====================== */

  const renderPosts = () => {
    if (revalidator.state === 'loading') {
      return (
        <div
          aria-label='Loading'
          className='pointer-events-none fixed inset-0 flex items-center justify-center'
          style={{ zIndex: 9999 }}
        >
          <div className='relative flex h-20 w-20'>
            <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_ease_infinite] rounded-full border-[6px] border-solid border-t-transparent border-r-transparent border-b-violet-800 border-l-transparent'></i>
            <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_linear_infinite] rounded-full border-[6px] border-dotted border-t-transparent border-r-transparent border-b-violet-800 border-l-transparent opacity-75'></i>
          </div>
        </div>
      )
    }

    if (success === false) {
      return (
        <Alert
          className='alert-red mx-auto my-12 max-w-2xl'
          leftSection={
            <svg
              style={{ height: '3em' }}
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z' />
              <path d='M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z' />
            </svg>
          }
          rightSection={
            <button
              className={`${Alert.redButtonFix} flex w-full active:scale-[0.99]`}
              onClick={() => {
                revalidator.revalidate()
              }}
              style={{ minWidth: 100 }}
            >
              Retry
            </button>
          }
          rightClassName='items-end flex'
          centerClassName='flex-1'
        >
          <Alert.Heading>Error!</Alert.Heading>

          <p className='text-sm'>Unable to get posts.</p>
        </Alert>
      )
    }

    if (success === true && Array.isArray(posts)) {
      if (posts.length === 0) {
        return (
          <Alert
            className='alert-blue mx-auto my-12 max-w-2xl'
            leftSection={
              <svg
                style={{ height: '3em' }}
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
              </svg>
            }
            rightClassName='items-end flex'
            centerClassName='flex-1'
          >
            <Alert.Heading>Whoops!</Alert.Heading>

            <p className='text-sm'>It looks like there aren't any posts.</p>
          </Alert>
        )
      }

      return (
        <ul
          className='mx-auto overflow-hidden rounded-xl border border-gray-500'
          style={{ fontSize: 12, maxWidth: 600 }}
        >
          {posts.map((post: any) => {
            return (
              <li
                className='border-b border-gray-500 last:border-none'
                key={post.id}
                style={{ cursor: 'pointer' }}
              >
                <button
                  className='block w-full bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
                  onClick={() => {
                    navigate(`/posts/${post.id}`)
                  }}
                  // If using a <div> instead:
                  // Visible, non-interactive elements with click handlers must have
                  // at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events)
                  // onKeyDown={(e) => { console.log(e) }}
                  // role='button'
                  // tabIndex={0}
                >
                  {post.title}
                </button>
              </li>
            )
          })}
        </ul>
      )
    }

    return null
  }

  /* ======================
          return
  ====================== */

  if (!mode) {
    return null
  }

  return (
    <div
      className={`mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative' }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Posts
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Posts
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        <Button
          className='btn-green btn-sm mx-auto mb-6 block'
          onClick={() => navigate('/posts/create')}
        >
          Create A Post
        </Button>

        {renderPosts()}
      </div>
    </div>
  )
}

export default PagePosts

/* =============================================================================
                                PagePostsDeferred
============================================================================= */
////////////////////////////////////////////////////////////////////////////////
//
// For the defer example to work make sure that you're using a loader that implements defer().
//
//   export const loader = (async (/* { context, params, request } */) => {
//     await LazyPagePosts.preload().then((component: any) => { return component })
//     return defer({ getPostsResponse: getPosts() })
//   }) satisfies LoaderFunction
//
// Additionally, getPosts() should implement some kind of sleep() function to
// make it slow for the demo.:
//
//   await sleep(1500)
//   if (randomFail(0.5)) {
//     throw new Error('Whoop! You did a bad thing.')
//   }
//
// With those two steps in place, PagePosts will render immediately, and show the local
// Suspense fallback.
//
// Note: It's not technically necessary to use defer() with Await/Suspense.
// We probably (?) can use defer(), but then also wait until our response is
// defined, but at that point it's probably better to just implement a standard
// useEffect implementation.
//
////////////////////////////////////////////////////////////////////////////////

// function PagePostsDeferred() {
//   const { mode } = useThemeContext()
//   const navigate = useNavigate()
//   // What if we needed to make multiple API requests?
//   // What if we wanted to cache data?
//   const loaderData: any = useLoaderData()
//   const revalidator = useRevalidator()

//   /* ======================
//       suspenseFallback
//   ====================== */

//   const suspenseFallback = (
//     <div
//       aria-label='Loading'
//       className='pointer-events-none flex h-[200px] items-center justify-center'
//     >
//       <div className='relative flex h-20 w-20'>
//         <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_ease_infinite] rounded-full border-[6px] border-solid border-b-pink-500 border-l-transparent border-r-transparent border-t-transparent'></i>
//         <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_linear_infinite] rounded-full border-[6px] border-dotted border-b-pink-500 border-l-transparent border-r-transparent border-t-transparent opacity-75'></i>
//       </div>
//     </div>
//   )

//   /* ======================
//         errorAlert
//   ====================== */

//   const errorAlert = (
//     <Alert
//       className='alert-red mx-auto my-12 max-w-2xl'
//       leftSection={
//         <svg style={{ height: '3em' }} fill='currentColor' viewBox='0 0 16 16'>
//           <path d='M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z' />
//           <path d='M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z' />
//         </svg>
//       }
//       rightSection={
//         <button
//           className={`${Alert.redButtonFix} flex w-full active:scale-[0.99]`}
//           onClick={() => {
//             revalidator.revalidate()
//           }}
//           style={{ minWidth: 100 }}
//         >
//           Retry
//         </button>
//       }
//       rightClassName='items-end flex'
//       centerClassName='flex-1'
//     >
//       <Alert.Heading>Error!</Alert.Heading>

//       <p className='text-sm'>Unable to get posts.</p>
//     </Alert>
//   )

//   /* ======================
//         renderPosts()
//   ====================== */

//   const renderPosts = () => {
//     if (revalidator.state === 'loading') {
//       return suspenseFallback
//     }

//     return (
//       <>
//         <Suspense fallback={suspenseFallback}>
//           <Await
//             resolve={loaderData?.result}
//             // This would trigger if getPosts() threw an uncaught error.
//             // However, at present all errors are caught from within getPosts()
//             // and a standardized result object is returned.
//             // errorElement={errorAlert}
//           >
//             {(result) => {
//               const { data: posts, success } = result
//               // Because getPosts() catches errors internally, we do this instead of using errorElement.
//               if (success === false) {
//                 return errorAlert
//               }

//               if (success === true && Array.isArray(posts)) {
//                 if (posts.length === 0) {
//                   return (
//                     <Alert
//                       className='alert-blue mx-auto my-12 max-w-2xl'
//                       leftSection={
//                         <svg
//                           style={{ height: '3em' }}
//                           fill='currentColor'
//                           viewBox='0 0 16 16'
//                         >
//                           <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
//                           <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
//                         </svg>
//                       }
//                       rightClassName='items-end flex'
//                       centerClassName='flex-1'
//                     >
//                       <Alert.Heading>Whoops!</Alert.Heading>

//                       <p className='text-sm'>
//                         It looks like there aren't any posts.
//                       </p>
//                     </Alert>
//                   )
//                 }

//                 return (
//                   <ul
//                     className='mx-auto overflow-hidden rounded-xl border border-gray-500'
//                     style={{ fontSize: 12, maxWidth: 600 }}
//                   >
//                     {posts &&
//                       posts.map((post: any) => {
//                         return (
//                           <li
//                             className='border-b border-gray-500 last:border-none'
//                             key={post.id}
//                             style={{ cursor: 'pointer' }}
//                           >
//                             <button
//                               className='block w-full bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
//                               onClick={() => {
//                                 navigate(`/posts/${post.id}`)
//                               }}
//                             >
//                               {post.title}
//                             </button>
//                           </li>
//                         )
//                       })}
//                   </ul>
//                 )
//               }

//               return null
//             }}
//           </Await>
//         </Suspense>
//       </>
//     )
//   }

//   /* ======================
//           return
//   ====================== */

//   return (
//     <div
//       className={`
//       mx-auto flex w-full flex-1 flex-wrap`}
//       style={{
//         backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
//       }}
//     >
//       <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
//         <h1
//           className='text-center text-5xl font-black'
//           style={{ position: 'relative' }}
//         >
//           <span
//             style={{
//               position: 'absolute',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               textShadow:
//                 '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
//               width: '100%',
//               height: '100%'
//             }}
//           >
//             Posts (Deferred)
//           </span>
//           <span
//             className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
//             style={{
//               position: 'relative'
//             }}
//           >
//             Posts (Deferred)
//           </span>
//         </h1>
//         <HR style={{ marginBottom: 50 }} />

//         <Button
//           className='btn-green btn-sm mx-auto mb-6 block'
//           onClick={() => navigate('/posts/create')}
//         >
//           Create A Post
//         </Button>

//         {renderPosts()}
//       </div>
//     </div>
//   )
// }

// export default PagePostsDeferred
