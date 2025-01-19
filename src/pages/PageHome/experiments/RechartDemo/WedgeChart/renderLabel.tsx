export const renderLabel = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    skill
    // name
    // index
  } = props
  const distanceFromCenter = 0.95
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
      className='text-lg font-semibold'
    >
      {`${skill.toFixed(0)}%`}
    </text>
  )
}
