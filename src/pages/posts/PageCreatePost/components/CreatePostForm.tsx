// Third-party imports
import { useEffect } from 'react'
import {
  Form,
  // redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router'
import { toast } from 'react-toastify'

// Custom imports
import { Button } from 'components'
import { PostActionData } from '../createPost'

/* ========================================================================
                              CreatePostForm
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// When the user submits the form, control goes directly to the associated
// createPostAction() function. This means that any client-side validation
// would need to occur within that function. I don't like that at all!
//
// Overall, the use of Form/useActionData doesn't really add that much to the
// DX. All it does is automate the step between submission and the API call, but
// at the expense of adding a layer of complexity/abstraction with little added
// benefit.
//
// I understand that they began with a way of pre-fetching similar to Remix or Next,
// and then to bring it to it's logical conclusion they also added a way to automate
// form submission and API calls. However, forms are better handled srictly through
// react-hook-form/zod and API data is better handled through a dedicated caching library.
// I'm just not at all a fan of mixing routing with HTTP requests.
//
// Moreover, one could argue that it's at odds with a react-hook-form implementation.
// I'm sure there's some way to integrate the two, but it just doesn't seem worth it.
// Probably what we'd do is not use Form, and instead implement useFetcher.
// See Academind video at 42:15 : https://www.youtube.com/watch?v=L2kzUg6IzxM
//
///////////////////////////////////////////////////////////////////////////

export const CreatePostForm = () => {
  // Once submitted, we can get the response data from the mutation/action here.
  const actionData = useActionData() as PostActionData // Initially undefined
  const navigate = useNavigate()

  // navigation gives us information on the state of our action and loader functions.
  // navigation.state === 'idle' | 'loading' | 'submitting'
  const navigation = useNavigation()
  // If you want, you can use controled inputs, but there's no need to since
  // the createPostAction() function will receive the data through request.formData().
  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    // Initially, actionData will be undefined.
    if (!actionData) {
      return
    }

    // console.log('\n\nactionData: ', actionData)

    if (actionData.status === 201 || actionData.success === true) {
      toast.success(
        "The new Post has been created, but you won't actually see it in the list because this is using a fake REST API."
      )
      navigate('/posts')
    } else if (actionData.status >= 400) {
      toast.error("Something went wrong, and the post couldn't be created!")
    }
  }, [actionData, navigate])

  /* ======================
    renderCreatePostForm()
  ====================== */
  // With React Router v6.4, we no longer need to handle form submission manually.
  // It provides a new form component. On submit, React Router will generate a
  // request object and send that request to an action function that we define.

  const renderCreatePostForm = () => {
    return (
      <Form
        className='mx-auto mb-4 max-w-xl rounded-lg border border-neutral-400 p-4'
        style={{ backgroundColor: '#fafafa' }}
        method='post'
        action='/posts/create'
        ///////////////////////////////////////////////////////////////////////////
        //
        // We can actually stop the process here manually.
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   // This won't actually work to restart the flow.
        //   // const target = e.target as HTMLFormElement; target.submit()
        //   // Instead we'd need to manually use a ref to .click().
        //   //
        //   // Alternatively, put refs on each form field.
        //   // Then use const fetcher = useFetcher()
        //   // fetcher.submit({ title: titleRef.current.value, body: bodyRef.current.value, method: 'post', action: '/posts/create' })
        //   // See Academind video at 42:15 : https://www.youtube.com/watch?v=L2kzUg6IzxM
        //   // Incidentally, fetcher() is probably what we'd use integrate with react-hook-form
        //   // instead of Form.
        // }}
        //
        ///////////////////////////////////////////////////////////////////////////
      >
        <div className='mb-4'>
          <label
            className='form-label font-black text-blue-500'
            htmlFor='title'
          >
            Title:
          </label>
          <input
            className='form-control form-control-sm'
            id='title'
            name='title'
            // onChange={(e) => { setTitle(e.target.value) }}
            placeholder='Title...'
            spellCheck={false}
            type='text'
            // value={title}
          />
        </div>

        <div className='mb-4'>
          <label className='form-label font-black text-blue-500' htmlFor='body'>
            Body:
          </label>
          <textarea
            className='form-control form-control-sm'
            id='body'
            name='body'
            // onChange={(e) => { setBody(e.target.value) }}
            placeholder='Post body...'
            spellCheck={false}
            // value={body}
          />
        </div>

        {navigation.state === 'submitting' ? (
          <Button
            className='btn-blue btn-sm block w-full'
            loading
            style={{ minWidth: 150 }}
          >
            Creating Post...
          </Button>
        ) : (
          <Button
            className='btn-blue btn-sm block w-full'
            // disabled={title.trim() === '' || body.trim() === '' ? true : false}
            style={{ minWidth: 150 }}
          >
            Create Post
          </Button>
        )}
      </Form>
    )
  }

  /* ======================
          return
  ====================== */

  return renderCreatePostForm()
}
