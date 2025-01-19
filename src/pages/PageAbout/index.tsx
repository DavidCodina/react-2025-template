// Third-party imports
import { Link, Outlet, useLocation } from 'react-router'
import styled, { css } from 'styled-components'

import { useThemeContext } from 'contexts'
import { useTitle } from 'hooks'
import { HR } from 'components'
export * from './loader'

// This is a styled Link.
// It's necessary to prevent isActive from getting passed to Link.
// Otherwise you get a console warning:
// "React does not recognize the `isActive` prop on a DOM element.""

const SCLink = styled((props: any) => {
  const _props = { ...props }
  delete _props.isActive

  return <Link {..._props} />
})`
  color: var(--color-blue-500);
  font-size: 24px;
  font-weight: 900;
  text-decoration: none;

  ${({ isActive }) => {
    if (isActive) {
      return css`
        &::after {
          content: '/>';
        }
        &::before {
          content: '<';
        }
      `
    }
    return css``
  }}

  &:hover {
    color: var(--color-indigo-500);
  }
`

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                                PageAbout
======================================================================== */

const PageAbout = () => {
  useTitle('About')
  const { mode } = useThemeContext()
  const location = useLocation()
  // useRouteMatch deprecated
  const _personNotChosen = location.pathname === '/about'

  /* ======================
        renderNav()
  ====================== */

  const renderNav = () => {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 15,
          marginBottom: 25
        }}
      >
        {/* Notice how it's not necessary to pass '/about/holly' & '/about/david'
        Morever, DO NOT prepend the forward slash - '/holly' or '/david'.
        That won't work. 

        <Link /> components can accept style and className props.
        However, they don't seem to have access to isActive. 
        If we need to, we can create our own isActive.
        However, if you really want to do that, you might as well use NavLink instead. */}
        <SCLink
          to='holly'
          isActive={
            location.pathname === '/about' ||
            location.pathname === '/about/holly'
          }
        >
          Holly
        </SCLink>
        <SCLink to='david' isActive={location.pathname === '/about/david'}>
          David
        </SCLink>
      </nav>
    )
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
      {/* <Waves /> */}

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
            About
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            About
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        {renderNav()}

        {/* This is only shown when the user has not yet selected a child route.

        {
          personNotChosen && (
          <div className='mx-auto mb-3 text-center fs-3 fw-bold text-blue'>
            Choose A Person...
          </div>
        }

        But what if we wanted one of the child routes to automatically render at
        the level of the parent route? That can be achieved using an index route.
        This is done back in Router.js:

        <Route path='/about/*' element={<PageAbout />}>
          <Route index element={<AboutHolly />} />
          <Route path='david' element={<AboutDavid />} />
          <Route path='holly' element={<AboutHolly />} />
        </Route>

        However, because technically neither 'holly' nor 'david' have actually
        been selected that piece of code would still be shown. We could
        actually create a new component that renders 'Choose A Person...' and set
        that as the index component, or we can just remove this all together since
        it's no longer necessary.

        The downside is that the 'holly' <Link /> is not actually active.
        To fix this you might think to remove the index route and do this here:

        useEffect(() => {
          if (personNotChosen) {
            navigate('holly')
          }
        }, [personNotChosen, navigate])

        But that actually breaks the browswer's back button. So... If we knew for certain
        that the index route was going to be 'holly', we can instead do this in the above Link:

        <SCLink
            to='holly'
            isActive={
              location.pathname === '/about' ||
              location.pathname === '/about/holly'
            }
        >
          Holly
        </SCLink>
        */}

        {/*
      personNotChosen && (
        <div className='mx-auto mb-3 text-center fs-3 fw-bold text-blue'>
          Choose A Person...
        </div>
      )
      */}

        <Outlet />

        {/*
      Or do this in <Router /> :
      <Route path='/about/*' element={<PageAbout />} />

      And this here:

      <Routes>
        <Route index element={<AboutHolly />} />
        <Route path='david' element={<AboutDavid />} />
        <Route path='holly' element={<AboutHolly />} />
      </Routes>
      */}
      </div>
    </div>
  )
}

export default PageAbout
