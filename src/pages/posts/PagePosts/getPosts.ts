// import { sleep, randomFail } from 'utils'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Data = Post[] | null

type GetPostsResponse = Promise<{
  data: Data
  success: boolean
  message: string
}>

type GetPosts = () => GetPostsResponse

/* ======================
      getPosts() 
====================== */
////////////////////////////////////////////////////////////////////////////////
//
// https://www.youtube.com/watch?v=L2kzUg6IzxM at 5:45
// The postsLoader function can be registered on our route definition. Usage:
//
//   <Route path='/posts' element={<PagePosts />} loader={pagePostsLoader} />
//
// React Router will now call this function whenever we navigate to this route.
// Then to access the data we use the useLoaderData() hook.
//
// Note: If you want to utilize errorElement={<ErrorElement />} in the <Route />
// Then create a API function that DOES NOT catch the error.
//
//   export const getPosts = async () => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
//     return { data: json, success: true, message: 'Request success.' }
//   }
//
// The gotcha here is that we have to make sure we understand under what circumstances
// our API is going to send us back an error. If there are any circumstances in which
// we could get back a 200, but no data then that would be bad.
//
// See this Net Ninja video for examples of manually throwing an error:
// https://www.youtube.com/watch?v=n0Rvia8w7p0&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=8
//
///////////////////////////////////////////////////////////////////////////

export const getPosts: GetPosts = async () => {
  // await sleep(1500)
  // Simulate slow API
  // await import('utils')
  //   .then(async (module) => {
  //     module.log(' Sleeping for three seconds. ')
  //     await module.sleep(3000)
  //     return
  //   }).catch((err) => err)

  // Note: this will break associated tests.
  // if (randomFail(0.5)) {
  //   return {
  //     data: null,
  //     message: 'Request failed.',
  //     success: false
  //   }
  //   // Do this instead to see local error boundary get triggered when getPosts() errors.
  //   // throw new Error('Whoop! You did a bad thing.')
  // }

  try {
    const URL = 'https://jsonplaceholder.typicode.com/posts'
    const res = await fetch(URL)
    const json = (await res.json()) as Awaited<Data>

    return {
      data: json,
      success: true,
      message: 'Request success.'
    }
  } catch (_err) {
    return {
      data: null,
      message: 'Request failed.',
      success: false
    }
  }
}
