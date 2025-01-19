'use client'

import { useEffect, useState, useRef } from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { name: 'A', value: 200, color: '#66FF66' },
  { name: 'B', value: 100, color: '#FFFF66' },
  { name: 'C', value: 50, color: '#FF355E' }
]

const RADIAN = Math.PI / 180

const needle = (options: any) => {
  const { value, data, cx, cy, iR, oR, color } = options

  let total = 0
  data.forEach((v: any) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 4 // fatness of needle.
  const x0 = cx
  const y0 = cy
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    <circle key='circle' cx={x0} cy={y0} r={r} fill={color} stroke='none' />,
    <path
      key='path'
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke='#none'
      fill={color}
    />
  ]
}

/* ========================================================================

======================================================================== */

export const Gauge = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const cx = dimensions.width / 2
  const cy = dimensions.height / 2

  // This calculation is based on the assumption that recharts Pie is
  // always half of the container it's in. Technically, it will have default
  // margins of 5px around it as well, which make it slighly less than half.
  // However, I've removed those margins below.
  const radius = dimensions.width / 4 + 4 // Not sure why it needs + 4, but it does.
  const innerRadius = radius * 0.8
  const outerRadius = radius

  const totalValue: number = data.reduce(
    (sum, current) => sum + current.value,
    0
  )

  const value = totalValue * 0.25 // Change this as needed to move the needle.

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
    <>
      <ResponsiveContainer width='100%' height='100%' ref={containerRef}>
        <PieChart
          // This is imporatant to do so the cx, cy, and radius are correct
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{
            transform: 'scale(1.5) translateY(18.75%)'
          }}
        >
          <Pie
            // stroke='transparent'
            animationDuration={500}
            startAngle={180}
            endAngle={0}
            data={data}
            fill='var(--color-sky-400)'
            dataKey='value'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cx={cx}
            cy={cy}
            // paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke='#333'
                strokeWidth={0.5}
              />
            ))}
          </Pie>

          {needle({
            value,
            data,
            cx,
            cy,
            iR: innerRadius,
            oR: outerRadius,
            color: '#444'
          })}
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
