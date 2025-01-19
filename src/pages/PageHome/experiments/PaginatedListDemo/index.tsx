import { useNavigate /* , useSearchParams */ } from 'react-router'

import { useState } from 'react'
import { Pagination } from './Pagination'
//import { SimplePagination as Pagination } from './SimplePagination'

// const data: any = []
// for (let i = 1; i <= 100; i++) {
//   data.push({ id: i.toString(), title: `Item ${i}` })
// }

// const data = Array.from(Array(50).keys()).map((i) => ({
//   id: i.toString(),
//   title: `Item ${i}`
// }))

// const data = [...Array(93)].map((_, index) => {
//   const n = index + 1
//   return {
//     id: n.toString(),
//     title: `Item ${n}`
//   }
// })

const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`)
const itemsPerPage = 10

/* ========================================================================
                          
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// WDS:          https://www.youtube.com/watch?v=VenLRGHx3D4
//               https://www.youtube.com/watch?v=oZZEI23Ri6E
// ByteGrad:     https://www.youtube.com/watch?v=ukpgxEemXsk&t=2s
// CoderOne:     https://www.youtube.com/watch?v=h9hYnDe8DtI&t=145s
//
// Cosden Solutons: https://www.youtube.com/watch?v=gMoni2Hm92U // ❗️Not watched yet.
//
// Sam Selikoff: https://www.youtube.com/watch?v=sFTGEs2WXQ4
//
//               Discusses the 'browser back button bug', and how to avoid 'two sources of truth'.
//               https://www.youtube.com/watch?v=fYqMPvPvVAc
//
// Theo:         https://www.youtube.com/watch?v=t3FUkq7yoCw
//
// Academind:    https://www.youtube.com/watch?v=hnmTiXEY4X8
//
// Jolly Coding: https://www.youtube.com/watch?v=mXziH-hQARs
//
// John Reilly:  https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
//               https://johnnyreilly.com/react-usesearchparamsstate
//
///////////////////////////////////////////////////////////////////////////

export const PaginatedListDemo = () => {
  const navigate = useNavigate()
  //^ const [searchParams] = useSearchParams()

  // I switched to a versio that just uses browser APIs instead of react-router,
  // but either approach works
  //* Non react-router implementation
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const pageParam = searchParams.get('page')
    if (pageParam && typeof pageParam === 'string') {
      const pageNumber = parseInt(pageParam)
      return typeof pageNumber === 'number' && !isNaN(pageNumber)
        ? pageNumber
        : 1
    }
    return 1
  })

  /* ======================
        Dervived state
  ====================== */

  //^ const currentPage = (() => {
  //^   const pageParam = searchParams.get('page')
  //^   if (pageParam && typeof pageParam === 'string') {
  //^     const pageNumber = parseInt(pageParam)
  //^     return typeof pageNumber === 'number' && !isNaN(pageNumber)
  //^       ? pageNumber
  //^       : 1
  //^   }
  //^   return 1
  //^ })()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const dataSubset = data.slice(indexOfFirstItem, indexOfLastItem)

  const itemCount = data.length
  const pageCount = Math.ceil(itemCount / itemsPerPage)

  /* ======================
      handlePageChange()
  ====================== */

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search) //* Non react-router implementation
    const params = new URLSearchParams(searchParams.toString()) // Get all params
    params.set('page', page.toString()) // Update page param

    //^ navigate(
    //^   `?${params.toString()}`,
    //^   // Optional: avoid adding to the history stack.
    //^   // This changes the behavior of the browser's back button,
    //^   // so we're not iterating through list sets, but instead go
    //^   // to the previous URL.
    //^   { replace: true }
    //^ )

    //* Non react-router implementation
    // ❌ window.history.pushState({}, '', `?${params.toString()}`)
    window.history.replaceState({}, '', `?${params.toString()}`)
    setCurrentPage(page)

    // Doing everything without react-router is a valid approach.
    // However, it also means that react-router is out of the loop,
    // and is no longer aware of the exact location.
    // This can be seen in AppContext where we track the currentPath
    // using react-router's const href = useHref(location).
    // The useEffect will no longer fire with each change to the params.
    // We can mitigate this by simply telling react-router to update
    // with navigate(0), but now we're kind of right back where we started.
    // The point here is that if we're using react-router, then we should
    // probably stick with the more idiomatic (yellow) approach. On the other hand,
    // we may be using nuqs to handle search params, and in that case, we might just
    // want to add navigate(0) in our logic just to keep everything in sync.
    navigate(0)
  }

  /* ======================
        renderList()
  ====================== */

  const renderList = () => {
    return (
      <ul className='mx-auto mb-4 flex flex-col rounded pl-0'>
        {dataSubset.map((item, index) => (
          <li
            key={index}
            className={`relative block cursor-pointer border border-neutral-400 bg-white px-2 py-2 text-sm font-black text-blue-500 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] select-none first:rounded-t-[inherit] last:rounded-b-[inherit] [&:not(:first-child)]:border-t-0`}
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <div className='mx-auto mb-6 max-w-[500px]'>
      {renderList()}

      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
      />
    </div>
  )
}
