export const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
  // index
}: any) => {
  const distanceFromCenter = 1.2
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * distanceFromCenter
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * distanceFromCenter

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor='middle' // 'start' | 'end' | 'middle' | 'inherit' | 'mathematical'
      dominantBaseline='central'
      className='text-sm font-semibold'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
