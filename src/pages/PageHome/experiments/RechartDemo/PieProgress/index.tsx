'use client'

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Label,
  Legend
} from 'recharts'

const data = [{ name: 'Percent', value: 25 }]

/* ========================================================================

======================================================================== */

export const PieProgress = () => {
  const progress = data[0]?.value as number

  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
          <Legend
            iconSize={0} // Default: 14
            wrapperStyle={{
              bottom: 10
            }}
            payload={[
              {
                dataKey: 'value',
                value: 'Percent',
                color: 'var(--color-violet-600)'
              }
            ]}
            // Note: RadialBar doesn't explicitly set a color property for legend rendering.
            formatter={(value, _entry, _index) => {
              return (
                <span
                  className='text-violet-600'
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600
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
          />
          <Pie
            // activeIndex={0}
            stroke='transparent'
            isAnimationActive={false}
            startAngle={90}
            endAngle={-270}
            data={data}
            cx='50%'
            cy='50%'
            dataKey='value'
            innerRadius={'80%'}
            outerRadius={'100%'}
            fill='var(--color-neutral-200)'
          />

          <Pie
            // activeIndex={0}
            // stroke='transparent'
            animationDuration={500}
            startAngle={90}
            endAngle={90 - progress * 3.6}
            data={data}
            cx='50%'
            cy='50%'
            dataKey='value'
            innerRadius={'80%'}
            outerRadius={'100%'}
          >
            <Cell fill='var(--color-sky-400)' />

            <Label
              value={progress + '%'}
              position='center'
              fill='var(--color-violet-600)'
              style={{
                fontSize: '28px',
                fontWeight: 'bold'
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
