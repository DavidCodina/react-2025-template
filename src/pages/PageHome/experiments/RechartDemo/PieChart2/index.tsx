'use client'

import { useState } from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts'

import { salesData } from '../data'
import { renderLabel } from './renderLabel'
import { CustomTooltip } from './CustomTooltip'

/* ========================================================================

======================================================================== */

const PieChartComponent2 = () => {
  const [showRevenue, setShowRevenue] = useState(true)
  const [showProfit, setShowProfit] = useState(true)

  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
          <defs>
            {/* --color-violet-600 : #7c3aed */}
            <linearGradient
              // The id must be unique to the application in orde to avoid conflicts
              // with other DOM elements by the same id name.
              id='pie-gradient-1'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop offset='5%' stopColor='#7c3aed' stopOpacity={0.25} />
              <stop offset='95%' stopColor='#7c3aed' stopOpacity={0.75} />
            </linearGradient>

            {/* --color-sky-400 :  #38bdf8; */}
            <linearGradient id='pie-gradient-2' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#38bdf8' stopOpacity={0.25} />
              <stop offset='95%' stopColor='#38bdf8' stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{}}
            //cursor={{ fill: '#ede9fe' }} //cursor={false}
          />
          <Legend
            payload={[
              {
                dataKey: 'revenue',
                value: 'revenue',
                inactive: !showRevenue,
                color: 'var(--color-violet-600)'
              },
              {
                dataKey: 'profit',
                value: 'profit',
                inactive: !showProfit,
                color: 'var(--color-sky-400)'
              }
            ]}
            formatter={(value, entry /*, index */) => {
              const isInactive = (entry as any)?.inactive
              const color = entry?.color

              return (
                <span
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: color && !isInactive ? color : ''
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

          {/* <Pie
            data={[{ value: 100 }]}
            dataKey='value'
            name='background-pie'
            innerRadius={'0%'}
            outerRadius='80%'
            fill='#fff'
            isAnimationActive={false}
            stroke='transparent'
            cx='50%'
            cy='50%'
            style={{ pointerEvents: 'none' }}
          /> */}

          <Pie
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            hide={!showRevenue}
            data={[...salesData].reverse()}
            dataKey='revenue'
            nameKey='name'
            cx='25%'
            cy='50%'
            innerRadius={'15%'}
            outerRadius={'90%'}
            stroke='var(--color-violet-950)'
            strokeWidth={1}
            //fill='var(--color-violet-600)'

            fill='url(#pie-gradient-1)'
            labelLine={false}
            label={renderLabel}
          />

          <Pie
            paddingAngle={2}
            // By default, the startAngle is set to 0, which means the first
            // slice starts at the 3 o'clock position (90 degrees).
            startAngle={90}
            endAngle={-270}
            hide={!showProfit}
            data={[...salesData].reverse()}
            dataKey='profit'
            nameKey='name'
            cx='75%'
            cy='50%'
            innerRadius={'15%'}
            outerRadius={'90%'}
            // stroke='var(--color-sky-600)'
            // fill='var(--color-sky-400)'
            fill='url(#pie-gradient-2)'
            stroke='var(--color-sky-950)'
            strokeWidth={1}
            labelLine={false}
            label={renderLabel}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export { PieChartComponent2 as PieChart2 }
