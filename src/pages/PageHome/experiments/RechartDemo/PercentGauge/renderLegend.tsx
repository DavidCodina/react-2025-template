'use client'

/* ========================================================================

======================================================================== */

const legendIcon = (
  <svg
    className='recharts-surface'
    width='1em'
    height='1em'
    viewBox='0 0 32 32'
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: 4
    }}
  >
    <circle
      stroke='none'
      cy={'50%'}
      cx={'50%'}
      r={16}
      fill='url(#twoColorGradient)'
    />
  </svg>
)

export const renderLegend = (props: any, percent: number, fontSize: number) => {
  const { payload } = props

  return (
    <>
      {payload.map((entry: any, index: number) => {
        if (index !== 0) {
          return null
        }
        return (
          <div
            key={index}
            className='text-violet-600'
            style={{
              lineHeight: 1
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: fontSize,
                fontWeight: 700
              }}
            >
              {legendIcon}
              {entry.value}
            </span>
          </div>
        )
      })}
    </>
  )
}

/* ========================================================================

======================================================================== */
// Originally, I used this custom legend to try to center the percent under the
// needle. However, using a <Label /> works better for that.

// export const renderLegend = (props: any, percent: number, fontSize: number) => {
//   const { payload } = props

//   return (
//     <>
//       {payload.map((entry: any, index: number) => {
//         if (index !== 0) {
//           return null
//         }
//         return (
//           <div
//             key={index}
//             className='mx-auto flex items-center text-violet-600'
//             style={{
//               lineHeight: 1
//             }}
//           >
//             <span
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flex: 1,
//                 textAlign: 'center',
//                 fontSize: fontSize,
//                 fontWeight: 700
//               }}
//             >
//               {legendIcon}
//               {Math.round(percent)}%
//             </span>
//           </div>
//         )
//       })}
//     </>
//   )
// }
