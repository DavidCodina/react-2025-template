// Third-party imports
import { useRouteError, useNavigate, useLocation } from 'react-router'

// Custom imports
import { Alert, Button } from 'components'
import { useThemeContext } from 'contexts'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                              ErrorElement                    
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Obviously, we can have a custom ErrorElement for each <Route />.
// However, here I've just made a generic one.
// Also, I've colocated it with the actual pages that it is associated with.
//
// It will render under the following conditions:
//
//  - If an API request fails AND you don't catch the err within a try/catch block.
//    In this case, you would intentionally omit try/catch.
//
//  - If you catch the err, and then return Promise.reject({ ... })
//
//  - If you catch the err, and then throw { ... }
//
//  - It will also render if you try to then use the data in a way
//    that would break the UI (e.g. trying to map null or undefined).
//    In other words, the ErrorElement is an error boundary and is not
//    specifically associated to the loader/action function.
//
///////////////////////////////////////////////////////////////////////////

export const ErrorElement = ({ message = '' }: { message?: string }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const error: any = useRouteError() //! Fix any

  const { mode } = useThemeContext()

  return (
    <div
      className={`mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      {/* <Waves /> */}

      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <Alert
          className='alert-red mx-auto mb-6 max-w-2xl'
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
        >
          <Alert.Heading>Error!</Alert.Heading>

          <p className=''>
            {message || error.message || 'Something went wrong!'}
          </p>

          <div className='flex justify-center gap-4'>
            <Button
              className='btn-red btn-sm min-w-[100px]'
              onClick={() => {
                navigate('/', {
                  replace: true
                })
              }}
            >
              Go Home
            </Button>

            <Button
              className='btn-red btn-sm min-w-[100px]'
              onClick={() => {
                // This will literally remount everything,which is NOT what we want: navigate(0)
                // Instead use pathname to refresh without LITERALLY refreshing.
                navigate(pathname, {
                  replace: true
                })
              }}
            >
              Go Back
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}
