// import { sleep, randomFail } from 'utils'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Data = Post | null

type GetPostResponse = Promise<{
  data: Data
  success: boolean
  message: string
}>

type GetPost = (postId: string) => GetPostResponse

/* ======================
        getPost() 
====================== */

export const getPost: GetPost = async (postId) => {
  try {
    // await sleep(1500)
    // await import('utils')
    //   .then(async (module) => {
    //     module.log('Sleeping for three seconds...')
    //     await module.sleep(3000)
    //     return
    //   })
    //   .catch((err) => err)

    // Note: this will break associated tests.
    // if (randomFail(0.5)) {
    //   return {
    //     data: null,
    //     message: 'Request failed.',
    //     success: false
    //   }
    // }

    const URL = `https://jsonplaceholder.typicode.com/posts/${postId}`
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
