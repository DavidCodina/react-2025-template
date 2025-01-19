'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { salesData } from './data'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='flex flex-col gap-1 rounded-md border border-neutral-600 bg-white p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        <h6 className='m-0 text-sm leading-none text-violet-800'>{label}</h6>

        {payload[0] && (
          <p
            className='m-0 leading-none text-violet-600'
            style={{ fontSize: 12 }}
          >
            <span className='font-bold'>Revenue:</span>
            <span className='ml-1'>${payload[0].value}</span>
          </p>
        )}

        {payload[1] && (
          <p className='m-0 leading-none text-sky-400' style={{ fontSize: 12 }}>
            <span className='font-bold'>Profit:</span>
            <span className='ml-1'>${payload[1].value}</span>
          </p>
        )}
      </div>
    )
  }

  return null
}

/* ========================================================================

======================================================================== */

const BarChartComponent = () => {
  const [showRevenue, setShowRevenue] = useState(true)
  const [showProfit, setShowProfit] = useState(true)

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={salesData}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
      >
        {/* Known issue: https://github.com/recharts/recharts/issues/3615*/}
        <YAxis
          tick={{
            fontSize: '12px'
          }}
          height={0} // Default: 0
          width={60} // Default: 60
          dx={-10}
          // tickLine={false}
          // tickCount={5} // Default: 5
        />
        <XAxis
          angle={0} // Default: 0
          dataKey='name'
          tick={{
            fontSize: '12px'
          }}
          dy={10}
          // tickCount={5} // Default: 5 - not changing ???
          // height={30} // Default: 30
          // width={0} // Default: 0
          // tickLine={false}
        />
        <CartesianGrid fill='#fff' strokeDasharray='5 5' />

        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{}}
          cursor={{ fill: '#ede9fe' }} //cursor={false}
        />
        <Legend
          // By default, the Legend text color is inherited from the stroke color applied
          // to the corresponding <Area>. In this case, I actually want to use the fill color.
          formatter={(value, entry /*, index */) => {
            // const dataKey = (entry as any)?.dataKay || (entry?.payload as any)?.dataKey || entry.payload?.value
            // const payload = entry.payload
            const isInactive = (entry as any)?.inactive
            const fill = (entry?.payload as any)?.fill

            return (
              <span
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: fill && !isInactive ? fill : ''
                }}
              >
                <svg
                  className='recharts-surface'
                  width='14'
                  height='14'
                  viewBox='0 0 32 32'
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: 4
                  }}
                >
                  <path
                    strokeWidth='4'
                    fill='none'
                    stroke='currentColor'
                    d='M0,16h10.666666666666666 A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16 H32M21.333333333333332,16 A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16'
                    className='recharts-legend-icon'
                  ></path>
                </svg>

                {value}
              </span>
            )
          }}
          // This effectively hides the icon, which we want because
          // we're currently using a custom icon in the formatter.
          iconSize={0} // Default: 14
          // align='center' // Default: 'center'
          // iconType='cross'
          // content={renderLegend}
          wrapperStyle={{
            bottom: 10
          }}
          onClick={(e) => {
            const dataKey = e.dataKey

            switch (dataKey) {
              case 'revenue':
                setShowRevenue((v) => !v)

                break
              case 'profit':
                setShowProfit((v) => !v)
                break
            }
          }}
        />

        <Bar
          radius={[5, 5, 0, 0]}
          hide={!showRevenue}
          // label={{ fill: '#333', fontSize: 8 }}
          dataKey='revenue'
          type='monotone' // Makes the lines wavey rather than straight.
          // The stroke color automatically gets applied to the legend.
          stroke='var(--color-violet-950)' // Changes the line color.
          fill='var(--color-violet-600)' // Changes the color of the body.
          // Rather than overlaying the charts, we can stack them.
          // stackId='1'
        />

        <Bar
          radius={[5, 5, 0, 0]}
          hide={!showProfit}
          // label={{ fill: '#333', fontSize: 8 }}
          dataKey='profit'
          type='monotone' // Makes the lines wavey rather than straight.
          stroke='var(--color-sky-950)' // Changes the line color.
          fill='var(--color-sky-400)' // Changes the color of the body.
          // stackId='1'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { BarChartComponent as BarChart }
