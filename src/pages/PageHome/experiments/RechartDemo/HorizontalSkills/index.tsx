'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import {} from 'recharts'
import { skills } from '../data'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='rounded-md border border-neutral-600 bg-white px-4 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        <h6 className='mb-2 text-base leading-none text-violet-800'>
          {label}:
        </h6>

        {payload[0] && (
          <p className='m-0 leading-none text-sky-400' style={{ fontSize: 14 }}>
            <span className='font-bold'>Ability:</span>
            <span className='ml-1'>{payload[0].value}%</span>
          </p>
        )}
      </div>
    )
  }

  return null
}

/* ========================================================================

======================================================================== */

export const HorizontalSkills = () => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          // width={500}
          height={300}
          data={skills}
          layout='vertical'
          margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray='5 5' fill='#fff' />

          <XAxis
            angle={0} // Default: 0
            dataKey='name'
            tick={{
              fontSize: '12px',
              fill: 'var(--color-violet-600)'
            }}
            dy={10}
            type='number'
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            fontWeight={700}
          />
          <YAxis
            tick={{
              fontSize: '12px',
              fill: 'var(--color-violet-600)'
            }}
            fontWeight={700}
            height={0} // Default: 0
            width={70} // Default: 60
            dx={-10}
            dataKey='name'
            type='category'
          />

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{}}
            cursor={{ fill: '#ede9fe' }}
          />
          <Legend
            formatter={(value, entry /*, index */) => {
              // const dataKey = (entry as any)?.dataKay || (entry?.payload as any)?.dataKey || entry.payload?.value
              // const payload = entry.payload
              const isInactive = (entry as any)?.inactive
              const fill = (entry?.payload as any)?.fill

              return (
                <span
                  style={{
                    // cursor: 'pointer',
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
            // wrapperStyle={{
            //   // outline: '1px dashed red',
            //   marginLeft: '5%',
            //   bottom: -8
            // }}

            wrapperStyle={{
              marginLeft: '32px',
              bottom: 10
            }}
            iconSize={0} // Default: 14
          />
          <Bar
            radius={[0, 5, 5, 0]}
            barSize={20}
            dataKey='skill'
            fill='var(--color-sky-400)'
            stroke='var(--color-violet-800)'
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
