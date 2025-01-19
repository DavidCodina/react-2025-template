'use client'

import { useEffect, useState, useRef } from 'react'
import { PieChart, Pie, ResponsiveContainer, Label, Legend } from 'recharts'
import { renderLegend } from './renderLegend'
import { needle } from './needle'
const data = [{ name: 'Percent', value: 100 }]

/* ========================================================================

======================================================================== */

export const PercentGauge = ({ percent = 0 }: { percent?: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const cx = dimensions.width / 2
  const cy = dimensions.height / 2
  // This calculation is based on the assumption that recharts Pie is
  // always half of the container it's in. Technically, it will have default
  // margins of 5px around it as well, which make it slighly less than half.
  // However, I've removed those margins below.
  const radius = dimensions.width / 4 // Not sure why it needs + 5, but it does.
  const multiplier = 1.7
  const innerRadius = radius * 0.8 * multiplier
  const outerRadius = radius * 1 * multiplier
  // At a multiplier of 2 inside of an aspect-video container, the semi-circle
  // is exactly the width of the circle. However, there's still a bit of extra
  // vertical space. To then center the gauge, we can use the verticalOffset.
  // Getting things just right is a bit of trial and error. It's really dependent
  // on the kind of container you're using.
  const verticalOffset = 0.975
  const labelFontSize = dimensions.width * 0.05

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) {
        return
      }
      const width = containerRef.current?.offsetWidth || 0
      const height = containerRef.current?.offsetHeight || 0

      setDimensions({ width, height })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
      ref={containerRef}
      style={{}}
    >
      <PieChart
        // This is important to do so the cx, cy, and radius are correct.
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          {twoColorGradient}
          {threeColorGradient}
        </defs>

        <Legend
          // verticalAlign='top'
          content={(props) => {
            return renderLegend(props, percent, 16)
          }}
          iconSize={0}
          wrapperStyle={{
            top: '5%',
            left: '2.5%',
            width: 'auto'
          }}
        />

        <Pie
          // stroke='transparent'
          // paddingAngle={5}
          animationDuration={500}
          startAngle={180}
          endAngle={0}
          data={data}
          dataKey='value'
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cx={(cx * multiplier) / multiplier}
          cy={cy * multiplier * verticalOffset}
          fill='url(#twoColorGradient)'
          stroke={'#333'}
          strokeWidth={0.5}
        >
          <Label
            value={'0%'}
            fill='var(--color-violet-600)'
            style={{
              fontSize: labelFontSize,
              fontWeight: 700,
              transform: 'translate(-38%, 76%)'
            }}
          />

          <Label
            value={`${Math.round(percent)}%`}
            fill='var(--color-violet-600)'
            style={{
              fontSize: labelFontSize,
              fontWeight: 700,
              transform: 'translate(0%, 76%)'
            }}
          />

          <Label
            value={'100%'}
            fill='var(--color-violet-600)'
            style={{
              fontSize: labelFontSize,
              fontWeight: 700,
              transform: 'translate(39%, 76%)'
            }}
          />
        </Pie>

        {needle({
          value: percent,
          data,
          cx: (cx * multiplier) / multiplier,
          cy: cy * multiplier * verticalOffset,
          iR: innerRadius,
          oR: outerRadius,
          color: 'var(--color-violet-800)' //'#444'
        })}
      </PieChart>
    </ResponsiveContainer>
  )
}

const twoColorGradient = (
  <linearGradient id='twoColorGradient' x1='0' y1='0' x2='100%' y2='0'>
    <stop offset='0%' stopColor='#38bdf8' />
    <stop offset='100%' stopColor='#7c3aed' />
  </linearGradient>
)

const threeColorGradient = (
  <linearGradient id='threeColorGradient' x1='0' y1='0' x2='100%' y2='0'>
    {/*  Here I experimented with anything between 0% and 10%. */}
    <stop offset='7.5%' stopColor='#66FF66' />
    {/* If we drew a line from left to right through the middle of the circle, 
    the nodes along the circumference for 1/3 and 2/3 would be exactly at 25% and 75%.
    Here, we're using 30% and 70% to help blend better. */}
    <stop offset='30%' stopColor='#FFFF66' />
    <stop offset='70%' stopColor='#FFFF66' />
    {/*  Here I experimented with anything between 90% and 10%. */}
    <stop offset='92.5%' stopColor='#FF6666' />
  </linearGradient>
)
