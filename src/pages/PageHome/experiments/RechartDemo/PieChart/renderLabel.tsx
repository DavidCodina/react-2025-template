export const renderLabel = (props: any) => {
  const {
    // x: X,
    // y: Y,
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    fill
  } = props

  const radius = outerRadius + 20 // Adjust this value to change the label distance
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize='12'
      fill={fill}
    >
      {value}
    </text>
  )
}
