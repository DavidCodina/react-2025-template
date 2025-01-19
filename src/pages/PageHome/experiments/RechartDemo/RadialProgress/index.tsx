'use client'

import { useRef, useEffect, useState } from 'react'

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend
} from 'recharts'

const data = [{ name: 'Percent', value: 25 }]

/* ========================================================================

======================================================================== */

export const RadialProgress = () => {
  const chartRef = useRef<any>(null)
  const [barSize, setBarSize] = useState(10)

  /* ======================
         useEffect()
  ====================== */
  // Ultimately, we don't need the useEffect, useRef, or useState, but it's
  // necessary if you want to have a responsive barSize. The alternative
  // is to use Pie/PiChart.

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.offsetWidth
        // const containerHeight = chartRef.current.offsetHeight
        // const containerDimension = Math.min(containerWidth, containerHeight)
        // const newBarSize = containerDimension * 0.1 // Set barSize to 10% of the container's smallest dimension

        const newBarSize = containerWidth * 0.05
        setBarSize(newBarSize)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <ResponsiveContainer width='100%' height='100%' ref={chartRef}>
      <RadialBarChart
        cx={'50%'}
        cy={'45%'}
        innerRadius={'90%'}
        outerRadius={'110%'}
        barSize={barSize} // barSize={'12'}
        data={data}
        startAngle={90}
        endAngle={-270}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
      >
        <Legend
          layout='vertical'
          iconSize={0} // Default: 14
          wrapperStyle={{
            bottom: 10
          }}
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

        <PolarAngleAxis
          type='number'
          domain={[0, 100]} // i.e., from 0 to 100
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          //background={true} // Sets the default background ring.
          background={{ fill: 'var(--color-neutral-200)' }}
          label={{
            position: 'center',
            fill: 'var(--color-violet-600)',
            fontSize: '28px',
            fontWeight: 'bold',

            formatter: (value: any) => `${value}%`
          }}
          dataKey='value'
          cornerRadius={'25%'} // Sets the roundedness of start/end
          className='fill-sky-400' // Or use fill prop.
          // stroke='var(--color-sky-600)'// Creates a border around the percentage.
        />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
