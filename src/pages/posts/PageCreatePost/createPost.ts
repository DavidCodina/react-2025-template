// Third-party imports
import { ActionFunctionArgs } from 'react-router'
import axios from 'axios'

///////////////////////////////////////////////////////////////////////////
//
// createPostAction() is added to the associated <Route /> as  follows:
//
//   <Route
//     path='/posts/create'
//     element={<PageCreatePost />}
//     action={createPostAction}
//   />
//
// Additionally, the React Router Form component must receive that matching path
// for its action prop: <Form method='post' action='/posts/create'>
//
///////////////////////////////////////////////////////////////////////////

export const createPostAction = async ({
  /*params,*/ request
}: ActionFunctionArgs) => {
  ///////////////////////////////////////////////////////////////////////////
  //
  // At this point, the request has NOT yet left the client.
  // The request object will, however, contain the data that was submitted.
  // In order to actually get the data, we need to use the name attributtes.
  // In other words, the form fields MUST have name attributes.
  //
  ///////////////////////////////////////////////////////////////////////////

  const formData = await request.formData() // instanceof FormData

  ///////////////////////////////////////////////////////////////////////////
  //
  // Now we actually need to abstract the values from formData in order to
  // turn them into a usable object literal (for JSON). We would also need
  // to perform validation. Currently, it's unclear to me when that would occur,
  // and how that information would get passed back into the component.
  // Ultimately, this entire idea of processing API requests through React Router
  // is just a bad idea. It makes it much more clunky, and overcomplicated.
  //
  // The Maximillian tutorial actually does his form validation inside of a savePost()
  // function, which is just an abstraction of the following axios call. Again, it's
  // such a bad flow! Form field validation should occur in the component before we
  // ever get to this point.
  //
  ///////////////////////////////////////////////////////////////////////////
  const requestData = {
    title: formData.get('title'),
    body: formData.get('body')
  }

  ///////////////////////////////////////////////////////////////////////////
  //
  // Pretend that we did our code validataion here, and it had some invalid entries.
  // We could then return back a response object (technically it's still coming from the client).
  // We can then access the return value using: const actionData = useActionData()
  //
  ///////////////////////////////////////////////////////////////////////////

  // let isValid = true
  // isValid = false
  // if (!isValid) {
  //   return {
  //     data: null,
  //     errors: {
  //       title: 'The title sucks!',
  //       body: ''
  //     },
  //     message: 'Invalid data',
  //     status: 422,
  //     success: false
  //   }
  // }

  try {
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      requestData
    )

    ///////////////////////////////////////////////////////////////////////////
    //
    // The tutorial did return redirect('/posts')
    // to go to posts when the POST request was successful.
    //
    // However, you actually have to return redirect('/posts')
    // This means you can't return a custom response object.
    // I prefer to return a response object, that can then be
    // read by const actionData = useActionData()
    //
    // I may be wrong abou this though...
    //
    ///////////////////////////////////////////////////////////////////////////

    //# Update this to use the utility function...
    return {
      data: res.data,
      message: 'Post created!',
      status: res?.request?.status || 201,
      success: true
    }
  } catch (err: any) {
    // Notice how regardless of whether the res succeeds or fails, the API function
    // always standardizes the response object before returning it.
    return {
      data: null,
      message: 'Unable create the post!',
      status: err?.request?.status || 500,
      success: false
    }
  }
}

// https://github.com/remix-run/react-router/discussions/9792
export type PostActionData = Awaited<ReturnType<typeof createPostAction>>
