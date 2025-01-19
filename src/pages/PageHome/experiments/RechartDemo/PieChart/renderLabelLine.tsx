export const renderLabelLine = (props: any) => {
  const { cx, cy, midAngle, outerRadius, stroke } = props
  const length = 5 // Set the desired length of the line
  const radius = outerRadius + 10 // Add 20 to outer radius to start line 5px beyond outer radius
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

  // Calculate the starting and ending points of the line
  const startX = x + length * Math.cos((-midAngle * Math.PI) / 180)
  const startY = y + length * Math.sin((-midAngle * Math.PI) / 180)
  const endX = x - length * Math.cos((-midAngle * Math.PI) / 180)
  const endY = y - length * Math.sin((-midAngle * Math.PI) / 180)

  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke={stroke}
      strokeWidth={1}
    />
  )
}
