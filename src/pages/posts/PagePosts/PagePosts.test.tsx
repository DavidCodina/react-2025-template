// Third-party imports
import { render, screen, within } from '@testing-library/react'
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createMemoryRouter
} from 'react-router'

// Custom imports
import { RootLayout, MainLayout } from 'layouts'
import { createMiniRouter } from 'utils'
import PagePosts, { /*LazyPagePosts, */ loader } from './index'

/* ======================
      mockLoader
====================== */
///////////////////////////////////////////////////////////////////////////
//
// You could do this, but then you can't check how if mockLoader has been called.
//
// const mockLoader = () => {
//   return {
//     data: [
//       {
//         userId: 1,
//         id: 1,
//         title: 'Title A',
//         body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
//       },
//       {
//         userId: 1,
//         id: 2,
//         title: 'Title B',
//         body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
//       },
//       {
//         userId: 1,
//         id: 3,
//         title: 'Title C',
//         body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
//       }
//     ],
//     success: true,
//     message: 'Request success!'
//   }
// }
//
// Alternatively, use the actual loader and msw.
//
///////////////////////////////////////////////////////////////////////////

const mockResponse = {
  data: [
    {
      userId: 1,
      id: 1,
      title: 'Title A',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'Title B',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
      userId: 1,
      id: 3,
      title: 'Title C',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
    }
  ],
  success: true,
  message: 'Request success!'
}

const mockLoader = vi.fn().mockImplementation(() => mockResponse)

/* ========================================================================
                                Tests   
======================================================================== */

describe('PagePosts', () => {
  /* ======================

  ====================== */
  // This example uses createMiniRouter() and mockLoader.

  it('should render with data from mockLoader.', async () => {
    const miniRouter = createMiniRouter({
      element: <PagePosts />,
      loader: mockLoader
    })
    render(miniRouter)

    // This might not be a good idea because there might be other <ul> JSX
    // related to the offCanvas, etdc.
    const list = await screen.findByRole('list')
    expect(list).toBeInTheDocument()

    expect(mockLoader).toHaveBeenCalledTimes(1)

    // Get all list items within the list and check there are the expected number.
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThan(2)
    expect(listItems).toHaveLength(3)

    ///////////////////////////////////////////////////////////////////////////
    //
    // In this case, I happen to know that each <li> contains an inner <div>, which
    // itself contains the expected text. Knowing this, we can do this:
    //
    //   const divInSecondItem = listItems[1]?.querySelector('div') // eslint-disable-line
    //   expect(divInSecondItem).toHaveTextContent('Title B')
    //
    // However, this is a fairly brittle test, and will break as soon we change
    // the implementation details within the <li>.
    //
    // Another approach would be to create a custom function that checks all of the
    // nodes for an element with that textContent:
    //
    //   function getElementWithText(root: HTMLElement, text: string): HTMLElement | undefined {
    //     const allElements = root.querySelectorAll('*') // eslint-disable-line
    //     for (let i = 0; i < allElements.length; i++) {
    //       const element = allElements[i]
    //       if (element && element.textContent?.trim() === text) { return element as HTMLElement }
    //     }
    //     return undefined
    //   }
    //
    //   const elementWithExpectedTest = getElementWithText(listItems[1] as HTMLElement, 'Title B')
    //   expect(elementWithExpectedTest).toBeInTheDocument()
    //
    // But this is actually too verbose and unnecessary. Instead, just do this:
    //
    ///////////////////////////////////////////////////////////////////////////

    const listItem2 = listItems?.[1]
    const elementWithExpectedTest = within(listItem2 as HTMLElement).getByText(
      'Title B'
    )
    expect(elementWithExpectedTest).toBeInTheDocument()
  })

  /* ======================

  ====================== */
  // This example uses  createRoutesFromElements/createMemoryRouter
  // and the actual loader, but the loader is intercepted by msw.

  it('should render with data from msw.', async () => {
    const routes = createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
          {/* Here we're using the actual loader, which makes the actual fetch request.
          However, the fetch request is intercepted by msw. */}
          <Route path='/' loader={loader} element={<PagePosts />} />
        </Route>
      </Route>
    )

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0
    })

    render(<RouterProvider router={router} />)

    // This might not be a good idea because there might be other <ul> JSX
    // related to the offCanvas, etdc.
    const list = await screen.findByRole('list')

    expect(list).toBeInTheDocument()

    // Get all list items within the list and check there are the expected number.
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems.length).toBeGreaterThan(2)
    expect(listItems).toHaveLength(3)

    const listItem2 = listItems?.[1]
    const elementWithExpectedTest = within(listItem2 as HTMLElement).getByText(
      'MSW Title 2'
    )
    expect(elementWithExpectedTest).toBeInTheDocument()
  })

  /* ======================

  ====================== */

  test("should render 'Posts'", async () => {
    const miniRouter = createMiniRouter({
      element: <PagePosts />, // No need to use LazyPagePosts for the test.
      loader: mockLoader // Better to use mockLoader rather than actual loader.
    })
    render(miniRouter)

    // Gotcha! This won't work:
    // const title = await screen.getAllByText('Posts')
    // The reason is most likely because react-router initializes
    // with some amount of state changes, which ultimately create an
    // asynchronous gap. This is not necessarily related to the loader,
    // or lazy loading.

    // In this case, 'Posts' is also found in the offcanvas menu.
    const title = await screen.findAllByText('Posts')
    // expect(title.length).toBe(3)
    expect(title).toHaveLength(3)
  })
})
