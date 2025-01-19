// Third-party imports
import { render, screen } from '@testing-library/react'

// Custom imports
import { createMiniRouter /* , mockLoader */ } from 'utils'
import {
  LazyPageRandom as PageRandom,
  loader as randomLoader
} from 'pages/PageRandom'

/* ========================================================================
                                Tests   
======================================================================== */

describe('PageRandom', () => {
  test("should render 'Random'", async () => {
    const miniRouter = createMiniRouter({
      element: <PageRandom />,
      loader: randomLoader // mockLoader
    })
    render(miniRouter)

    // screen.debug()

    ///////////////////////////////////////////////////////////////////////////
    //
    // Gotcha: Without the MainLayout in the createMiniRouter(), we could do:
    //
    //   const title = await screen.findByText('Random')
    //
    // However, a NavLink in MainRouter also has the text 'Random', so we need
    // to be more specific.
    //
    // Also, it may seem kind of weird that we need to use findByRole() when we're
    // not really waiting on anything async. In fact, we probably are if we're lazy
    // loading a component. I'm pretty sure the import() function returns  a promise.
    // If that's not it, then it could potentially be something in the internal
    // operations of React Router.
    //
    //   const title = await screen.findByRole('heading', { level: 2, name: 'Random' })
    //   expect(title).toBeInTheDocument()
    //
    // Update:
    //
    // The word 'Random' is no longer in a menu <NavLink/>. However, the title being used
    // actually now has two instances of 'Random', so we need to use findAllByText().
    //
    ///////////////////////////////////////////////////////////////////////////

    const title = await screen.findAllByText('Random')
    // expect(title.length).toBe(2)
    expect(title).toHaveLength(2)
  })
})
