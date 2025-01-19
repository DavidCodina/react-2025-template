export const CustomTooltip = ({ active, payload /*, label */ }: any) => {
  if (active && payload && payload.length > 0) {
    const fill = payload[0]?.payload?.fill
    const name = payload[0]?.name

    console.log({ payload })

    if (name === 'background-pie') {
      return null
    }
    return (
      <div className='flex flex-col gap-1 rounded-md border border-neutral-600 bg-white p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        {/* <h6 className='m-0 text-sm leading-none text-violet-800'>{label}</h6> */}
        {payload[0] && (
          <p
            className='m-0 leading-none'
            style={{ fontSize: 12, color: fill ? fill : '' }}
          >
            <span className='font-bold'>{name}:</span>
            <span className='ml-1'>${payload[0].value}</span>
          </p>
        )}
      </div>
    )
  }

  return null
}
