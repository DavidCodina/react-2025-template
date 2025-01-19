// Third-party imports
import { useEffect, useState } from 'react'
import { useLoaderData, useParams, useRevalidator } from 'react-router'
import { toast } from 'react-toastify'

// Custom imports
import { Alert, Button, HR } from 'components'
import { useThemeContext } from 'contexts'
import { PostLoaderData } from './loader'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                                PagePost
======================================================================== */

function PagePost() {
  const { mode } = useThemeContext()
  const { postId } = useParams()
  const { data: post, success } = useLoaderData() as PostLoaderData
  const revalidator = useRevalidator()
  const [items, setItems] = useState<any>([])

  /* ======================
        useEffect()
  ====================== */
  // Even though the React Router <Route /> errorElement prop,
  // makes it so this type of thing is no longer necessary, I
  // still prefer this approach, rather than replacing the
  // ENTIRE page with an error boundary component.

  useEffect(() => {
    // Don't do !success because you may be dealing with a pending Promise
    if (success === false) {
      toast.error('Unable to get post!')
    }
  }, [success])

  /* ======================
        renderPost()
  ====================== */

  const renderPost = () => {
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

          <p className='text-sm'>Unable to get post.</p>
        </Alert>
      )
    }

    if (success === true && post && typeof post === 'object') {
      return (
        <article
          className='mx-auto mb-6 rounded-lg border border-gray-500 bg-white p-3 text-sm'
          style={{ maxWidth: 800 }}
        >
          <h5 className='mb-6 font-bold text-blue-500'>{post.title}</h5>

          <p className='mb-0'>{post.body}</p>
        </article>
      )
    }

    return null
  }

  /* ======================
          return
  ====================== */

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
            {postId ? `Post ${postId}` : 'Post'}
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            {postId ? `Post ${postId}` : 'Post'}
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        {items.map(() => null)}

        {renderPost()}

        <article
          className='mx-auto mb-6 rounded-lg border border-gray-500 bg-white p-4 text-sm'
          style={{ maxWidth: 800 }}
        >
          <p>
            It's important to note that the <code>&#60;Route&#62;</code>'s'{' '}
            <code>ErrorElement</code> is not triggered <em>only</em> by an error
            thrown in the associated <code>loader</code> function. Rather, it's
            thrown whenever an error is caught.{' '}
            <strong>It's an error boundary</strong>. Thus, if we break the page
            here, it will also trigger the <code>ErrorElement</code>. This means
            that <code>errorElement</code> prop can be used with/without the{' '}
            <code>loader</code> prop.
          </p>

          <p>
            Fortunately, it's very easy to reset the boundary with either{' '}
            <code>navigate('/')</code> and/or <code>navigate(pathname)</code>
          </p>

          <Button
            className='btn-red btn-sm mx-auto block font-bold'
            onClick={() => {
              setItems(undefined)
            }}
            style={{ cursor: 'pointer', display: 'block', margin: '0 auto' }}
          >
            Break The Page!
          </Button>
        </article>
      </div>
    </div>
  )
}

export default PagePost
