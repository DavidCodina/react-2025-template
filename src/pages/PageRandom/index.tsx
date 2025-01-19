// Third-party imports...
import { useEffect } from 'react'
import { useLoaderData } from 'react-router'

// Custom imports
import { useTitle } from 'hooks'
import { HR } from 'components'
import { useThemeContext } from 'contexts'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                                PageRandom
======================================================================== */

const PageRandom = () => {
  useTitle('Random')
  const { mode } = useThemeContext()

  // This is simply for the associated pageRandom.test.tsx in order to
  // demonstrate how to build out a mini data router when a component
  // uses any associated data router methods. The actual value returned
  // from the loader resolves to null.
  const loaderData = useLoaderData() as any

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    // console.log({ loaderData })
  }, [loaderData])

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
          style={{ position: 'relative', marginBottom: 24 }}
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
            Random
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Random
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />
      </div>
    </div>
  )
}

export default PageRandom
