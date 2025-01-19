// Third-party imports
// import { lazy } from 'react'
import { createRoutesFromElements, Route, Navigate } from 'react-router'

// Custom imports

import { RootLayout, MainLayout } from 'layouts'
import { ConditionalRoute } from './ConditionalRoute'
// import { PrivateRoutes } from './PrivateRoutes'
import PageHome from 'pages/PageHome' // Should NOT be lazy loaded.

import {
  LazyPageRandom as PageRandom,
  loader as randomLoader
} from 'pages/PageRandom'

// const PageRandom = lazy(() => import('pages/PageRandom'))
// import { loader as randomLoader } from 'pages/PageRandom'

import {
  LazyPageAbout as PageAbout,
  loader as pageAboutLoader
} from 'pages/PageAbout'

import { AboutDavid } from 'pages/PageAbout/AboutDavid'
import { AboutHolly } from 'pages/PageAbout/AboutHolly'

import {
  LazyPageProductList as PageProductList,
  loader as pageProductListLoader
} from 'pages/products/PageProductList'

import {
  LazyPageProductDetails as PageProductDetails,
  loader as pageProductDetailsLoader
} from 'pages/products/PageProductDetails'

import {
  LazyPageProductRandom as PageProductRandom,
  loader as pageProductRandomLoader
} from 'pages/products/PageProductRandom'

import {
  LazyPagePosts as PagePosts,
  loader as pagePostsLoader
} from 'pages/posts/PagePosts'
import {
  LazyPagePost as PagePost,
  loader as pagePostLoader
} from 'pages/posts/PagePost'

import { ErrorElement as PostErrorElement } from 'pages/posts/ErrorElement'

import {
  LazyPageCreatePost as PageCreatePost,
  loader as pageCreatePostLoader
} from 'pages/posts/PageCreatePost'

import { createPostAction } from 'pages/posts/PageCreatePost/createPost'

import PageNotFound from 'pages/PageNotFound' // Should NOT be lazy loaded.
import PageUnauthorized from 'pages/PageUnauthorized'
import { RouterFallback } from './RouterFallback'

import {
  LazyPageErrorDemo as PageErrorDemo,
  loader as pageErrorDemoLoader
} from 'pages/PageErrorDemo'

const condition = true // Used for isAllowed={true} (conditional routes demo) below.

/* ========================================================================
                                   Routes      
======================================================================== */

export const routes = createRoutesFromElements(
  <Route element={<RootLayout />} hydrateFallbackElement={<RouterFallback />}>
    <Route element={<MainLayout />}>
      {/* Unfortunately, there doesn't seem to be any way to abstract the actual routes.
      You could try abstracting all the routes into a seperate component, then doing this:

        <Route path='/*' element={<MyRoutes />} />

      Generally, that works, but an issue arises for routes that use the loader prop.
      I believe the routes that use loader must be implemented inside of the
      router (i.e., not abstracted). Otherwise you get an error:

        TypeError: Cannot destructure property 'data' of 'loaderData' as it is undefined.

      See here for more info on that:

        https://github.com/remix-run/react-router/issues/9377
        https://github.com/remix-run/react-router/issues/9362
        It seems that loader function are not called from within nested routes.
        "Descendant <Routes> trees do not participate in data loading."

      */}

      <Route path='/' element={<PageHome />} />

      {/* This is a redirect:
      The new <Navigate> element in v6 works like a declarative version of the useNavigate() hook.
      It's particularly handy in situations where you need a React element to declare your navigation intent,
      like <Route element>. It also replaces any uses that you had for a <Redirect> element in v5 outside of a <Switch>.

      The <Navigate replace> prop tells the router to use history.replaceState() when updating the URL so the / entry won't
      end up in the history stack. This means that when someone clicks the back button, they'll end up at the page they were
      at before they navigated to /. */}
      <Route path='/home' element={<Navigate to='/' replace />} />

      {/* <Route path='/editor' element={<PageEditor />} /> */}

      <Route
        path='/random'
        element={<PageRandom />}
        ///////////////////////////////////////////////////////////////////////////
        //
        // This will avoid the Suspense fallback blink, and block the page transition
        // until the data (which in this case is the component itself) is loaded.
        //
        // By default, loaders wait for the data before transitioning,
        // We can use the loader to import the component.
        // If you look at what he's actually doing in the implementation
        // in the following URL, we may not even need lazyWithPreload...
        // https://www.infoxicator.com/en/react-router-6-4-code-splitting
        //
        //   export const randomLoader = async () => {
        //     await LazyPageRandom.preload().then((component: any) => {
        //       console.log('The component has been loaded:', component)
        //       return component
        //     })
        //     // await sleep(3000)
        //     // return null or get additional data and return that.
        //     return null
        //   }
        //
        //^ That said, I no longer see any SuspenseFallback blink when first navigating to
        //^ pages that are lazy loaded:
        //^ const PageRandom = lazy(() => import('pages/PageRandom'))
        //^ It could be that react-router v7 solved that problem.
        //^
        //^ It could also be that react v18 concurrent mode fixed it.
        //^ In Concurrent Mode, Suspense can delay the rendering of sibling components until the suspended component is ready,
        //^ which helps in avoiding the brief blink of the fallback content.
        //^ https://github.com/reactwg/react-18/discussions/7
        //^
        //^ Essentially this means that there's no need for react-lazy-with-preload.
        //^ Thus, for any production projects, DO NOT add that kind of logic, unless
        //^ there is a noticeable need for it.
        //
        ///////////////////////////////////////////////////////////////////////////
        loader={randomLoader}
      />

      {/* <Route path='/hooks' element={<PageHooks />} loader={pageHooksLoader} /> */}

      {/* This page has nested routes for products. */}
      {/* <Route path='/products' element={<ProductsListPage />} /> */}
      {/* This page is reached through /products and dynamically renders that product,
        or at least its id, which would then be used to make an API call for that product. */}
      {/* <Route path='/products/:id' element={<ProductDetailsPage />} /> */}

      <Route path='/products' loader={pageProductListLoader}>
        <Route index element={<PageProductList />} />
        <Route
          path=':id'
          element={<PageProductDetails />}
          loader={pageProductDetailsLoader}
        />
      </Route>

      {/* In the Codevolution tutorial https://www.youtube.com/watch?v=P5xgsRIKJjo at 6:40 he
        then creates another route that could conceivably match the above pattern.
        However, it doesn't end up going to ProductDetailsPage. Why not?
        React Router is smart enough to first match the route that is more specific.
        Notice, for example, that the exact attribute is no longer added to the '/' route!
        See: https://www.youtube.com/watch?v=4X9YbQBcmL0&list=PL4cUxeGkcC9h7F1LWaQ7MAI8ptg5VjvxJ&index=2
        at 3:15 - 'the default behavior is to search for an exact match'. */}

      <Route
        path='/products/random'
        element={<PageProductRandom />}
        loader={pageProductRandomLoader}
      />

      {/* Nested Routes:
        Think of AboutDavid and AboutHolly as parts of the AboutPage that are
        conditionally rendered in AboutPage based on the rest of the URL fragment.
        Where the component gets rendered is dependent on where <Outlet /> is placed.
        The AboutPage also has subnavigation for viewing these components.

        https://www.youtube.com/watch?v=_gSmfgX89-8&list=PL4cUxeGkcC9h7F1LWaQ7MAI8ptg5VjvxJ&index=4
        I believe one can also go to AboutPage and do this:

        <Routes>
        <Route path='david' element={<AboutDavid />} />
        <Route path='holly' element={<AboutHolly />} />
        </Routes>

        https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-route-path-patterns
        However, the '/about' route here would also need to be updated to use an asterisk:

        <Route path='/about/*' element={<PageAbout />} />

        And with this kind of implementation going to '/about/david' will just drop AboutDavid
        directly underneath PageAbout (i.e., no need to implement <Outlet />). */}

      <Route
        path='/about'
        element={<PageAbout />}
        //
        loader={pageAboutLoader}
      >
        <Route index element={<AboutHolly />} />
        <Route path='david' element={<AboutDavid />} />
        <Route path='holly' element={<AboutHolly />} />
      </Route>

      {/* This is a conditional redirect.
      Initially, I was calling it <PrivateRoute />, but that is only one use case.
      Naming it ConditionalRoute is more generic. */}

      <Route
        path='/conditional'
        element={
          <ConditionalRoute isAllowed={true} redirectPath='/'>
            <div className='w-screen'>
              <h1 className='py-6 text-center font-black text-blue-500'>
                Conditional Routing Example
              </h1>
              <p className='text-center'>
                This page is only shown based on the value of{' '}
                <code>isAllowed</code>.
              </p>
            </div>
          </ConditionalRoute>
        }
      />

      {/* Conditional routing can also be inlined by using a ternary such that:
      element={ condition ? <SomeComponent /> : <Navigate to='/' replace />} */}

      <Route
        path='/inline-conditional'
        element={
          condition ? (
            <div className='w-screen'>
              <h1 className='py-6 text-center font-black text-blue-500'>
                Inlined Conditional Routing Example
              </h1>
            </div>
          ) : (
            <Navigate to='/' replace />
          )
        }
      />

      {/* This is a demo of loader and errorElement features from v6.4. */}
      <Route path='/posts' errorElement={<PostErrorElement />}>
        <Route
          index
          element={<PagePosts />}
          loader={pagePostsLoader}
          // Can be added to parent Route instead. However, you
          // can also add one here that overwrites the parent.
          // errorElement={<PostErrorElement />}
        />

        <Route
          path=':postId'
          element={<PagePost />}
          loader={pagePostLoader}
          // errorElement={<PostErrorElement />}
        />

        <Route
          path='create'
          element={<PageCreatePost />}
          action={createPostAction}
          loader={pageCreatePostLoader}
        />
      </Route>

      <Route
        path='/error-demo'
        element={<PageErrorDemo />}
        loader={pageErrorDemoLoader}
      />

      <Route path='/unauthorized' element={<PageUnauthorized />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>

    <Route
      path='/outlier'
      element={
        <div className='w-screen'>
          <h1 className='py-6 text-center font-black text-blue-500'>Outlier</h1>
          <p className='text-center'>
            This content exists outside of <code>MainLayout</code>.
          </p>
        </div>
      }
    />
  </Route>
)
