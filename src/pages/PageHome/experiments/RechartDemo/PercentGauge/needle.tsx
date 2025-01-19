'use client'

/* ========================================================================

======================================================================== */

const RADIAN = Math.PI / 180

export const needle = (options: any) => {
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
