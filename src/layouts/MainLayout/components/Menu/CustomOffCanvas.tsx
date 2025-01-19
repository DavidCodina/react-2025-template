import { Dispatch, Fragment, SetStateAction } from 'react'
import { NavLink, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  // faGear,
  faInfo,
  // faChevronUp,
  // faChevronDown,
  faSun,
  faMoon
  // faStore,
  // faPlusCircle,
  // faGauge,
  // faRightFromBracket,
  // faRightToBracket,
  // faUserCircle,
  // faUserPen,
  // faClipboardCheck,
  // faUserGear
} from '@fortawesome/free-solid-svg-icons'

// Custom imports
import { OffCanvas } from 'components/OffCanvas'
import { useThemeContext } from 'contexts'

interface IMenu {
  duration?: number
  showMenu: boolean
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

const linkStyle = `
relative
block
px-4
py-2
text-xl 
font-bold 
text-indigo-800 
no-underline 
hover:before:absolute
hover:before:top-2
hover:before:bottom-0 
hover:before:left-2
hover:before:h-[calc(100%-16px)]
hover:before:w-[3px]
hover:before:rounded-full
hover:before:bg-indigo-800
hover:text-indigo-800
focus-visible:shadow-[inset_0_0_0_2px_theme(colors.indigo.800)] 
dark:focus-visible:shadow-[inset_0_0_0_2px_var(--dark-primary-color)]
focus:outline-none
dark:text-[var(--dark-primary-color)] 
`

const activeLinkStyle = `
relative
block 
px-4
py-2
text-xl 
font-bold 
no-underline 
bg-indigo-800
text-white
hover:before:absolute
hover:before:top-2
hover:before:bottom-0 
hover:before:left-2
hover:before:h-[calc(100%-16px)]
hover:before:w-[3px]
hover:before:rounded-full
hover:before:bg-white
hover:text-white
focus-visible:shadow-[inset_0_0_0_2px_theme(colors.sky.300)]
dark:focus-visible:shadow-[inset_0_0_0_2px_var(--dark-primary-color)]
focus:outline-none
dark:text-[var(--dark-primary-color)] 
`
/* ========================================================================
                            CustomOffCanvas
======================================================================== */

export const CustomOffCanvas = ({
  showMenu,
  setShowMenu,
  duration = 300
}: IMenu) => {
  const location = useLocation()
  const { mode, setMode } = useThemeContext()

  /* ======================
        handleClose()
  ====================== */

  const handleClose = () => {
    // This is a hacky way to get the OffCanvas to close (i.e., not declarative).
    // const body = document.getElementsByTagName('body')[0]; body?.click()
    setShowMenu(false)
  }

  /* ======================
        getClassName()
  ====================== */

  const getClassName = (isActive: boolean) => {
    if (isActive) {
      return activeLinkStyle
    }

    return linkStyle
  }

  /* ======================
      renderControls()
  ====================== */

  const renderControls = () => {
    const modeHoverColors = {
      light: 'hover:text-indigo-800',
      dark: 'dark:opacity-75 dark:hover:opacity-100 hover:dark:text-(--dark-primary-color)'
    }

    //! We shouldn't have to use mode here...
    const modeHoverColor = modeHoverColors[mode]

    return (
      <div className='flex justify-between px-4 py-2'>
        <button
          onClick={() => {
            setMode((v) => (v === 'light' ? 'dark' : 'light'))
          }}
          className={`cursor-pointer text-2xl opacity-50 hover:opacity-100 ${modeHoverColor}`}
          style={{}}
          title='Toggle Light/Dark Mode'
        >
          <FontAwesomeIcon className='dark:!hidden' icon={faSun} />
          <FontAwesomeIcon className='!hidden dark:!block' icon={faMoon} />
        </button>

        {/* <OffCanvas.CloseButton onClose={() => setShowMenu(false)} /> */}
        {/* https://heroicons.com/ */}

        <button className='m-0 p-0' onClick={() => setShowMenu(false)}>
          <svg
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className={`block h-8 w-8 cursor-pointer opacity-50 hover:text-indigo-800 hover:opacity-100 dark:opacity-75 dark:hover:text-[var(--dark-primary-color)] dark:hover:opacity-100`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    )
  }

  /* ======================
      renderNavLinks()
  ====================== */

  const renderNavLinks = () => {
    return (
      <Fragment>
        <NavLink
          className={({ isActive }) => getClassName(isActive)}
          to={
            location.pathname === '/' && location.search
              ? `/${location.search}`
              : '/'
          }
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faHome} style={{ marginRight: 10 }} />
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => getClassName(isActive)}
          to={
            location.pathname === '/posts' && location.search
              ? `/posts${location.search}`
              : '/posts'
          }
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faInfo} style={{ marginRight: 10 }} />
          Posts
        </NavLink>

        <NavLink
          className={({ isActive }) => getClassName(isActive)}
          to={
            location.pathname === '/about' && location.search
              ? `/about${location.search}`
              : '/about'
          }
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faInfo} style={{ marginRight: 10 }} />
          About
        </NavLink>
      </Fragment>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <OffCanvas
      className='dark:border-r-[var(--dark-primary-color)]'
      disableBodyClick={false}
      disableBackdrop={false}
      disableScrollLock={false}
      placement='start'
      value={showMenu}
      onChange={(newValue) => {
        setShowMenu(newValue)
      }}
      style={
        {
          // width: 'auto & height: 'auto' don't work so well. They end
          // up defaulting to maxWidth & maxHeight which are 100vw
          // and 100vh, respectively. Thus, don't use 'auto'
        }
      }
      duration={duration}
    >
      {/* The  OffCanvas does not have a div.offcanvas-body. It doesn't 
        really need one, but we can add it here if we want. */}
      <div
        className='bg-(--body-color) dark:bg-(--dark-body-color)'
        style={{
          flexGrow: 1,
          overflowY: 'auto'
        }}
      >
        {renderControls()}
        {renderNavLinks()}
      </div>
    </OffCanvas>
  )
}
