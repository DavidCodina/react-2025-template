'use client'

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  // Legend,
  Cell
} from 'recharts'

const webTrafficAnalytics = [
  {
    name: 'Page A',
    uv: 4000, // Unique Visitors
    pv: 2400, // Page Views
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`
}

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />
}

const colors = [
  '#FF355E',
  '#FF9933',
  '#FFFF66',
  '#66FF66',
  '#50BFE6',
  '#FF6EFF',
  '#FF00CC'
]

/* ========================================================================

======================================================================== */

export const CustomShapeBarChart = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={webTrafficAnalytics}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
      >
        <CartesianGrid fill='#fff' strokeDasharray='5 5' />

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

        <YAxis
          tick={{
            fontSize: '12px'
          }}
          height={0} // Default: 0
          width={40} // Default: 60
          dx={-10}
          // tickLine={false}
          // tickCount={5} // Default: 5
        />

        <Bar
          dataKey='uv'
          fill='var(--color-violet-600)' // This would be the default color.
          shape={<TriangleBar />}
          label={{ position: 'top', style: { fontSize: '12px' } }}
        >
          {webTrafficAnalytics.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
