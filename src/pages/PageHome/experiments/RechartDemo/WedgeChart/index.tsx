'use client'

import { PieChart, Pie, ResponsiveContainer, Legend, Label } from 'recharts'
import { renderLabel } from './renderLabel'
import { renderLegend } from './renderLegend'
import { skills } from '../data'

const tsData = skills.filter((skill) => skill.name === 'Typescript')
const tsValue = tsData[0]!.skill * 3.6 // 306
const tsInverseValue = 360 - tsValue
const reactData = skills.filter((skill) => skill.name === 'React')
const reactValue = reactData[0]!.skill * 3.6 // 306
const reactInverseValue = 360 - reactValue

/* ========================================================================

======================================================================== */

export const WedgeChart = () => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
          <defs>
            {/* --color-violet-600 : #7c3aed */}
            <linearGradient
              // The id must be unique to the application in orde to avoid conflicts
              // with other DOM elements by the same id name.
              id='wedge-gradient-1'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop offset='5%' stopColor='#7c3aed' stopOpacity={0.25} />
              <stop offset='95%' stopColor='#7c3aed' stopOpacity={0.75} />
            </linearGradient>

            {/* --color-sky-400 :  #38bdf8; */}
            <linearGradient id='wedge-gradient-2' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#38bdf8' stopOpacity={0.25} />
              <stop offset='95%' stopColor='#38bdf8' stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <Legend
            content={(props) => {
              return renderLegend(props)
            }}
            iconSize={0}
            wrapperStyle={{
              top: '5%',
              left: '2.5%',
              width: 'auto'
            }}
          />

          <Pie
            paddingAngle={0}
            startAngle={90}
            endAngle={-270 + tsInverseValue}
            data={tsData}
            dataKey='skill'
            nameKey='name' // ???
            cx='25%'
            cy='50%'
            innerRadius={'0%'}
            outerRadius={'100%'}
            stroke='var(--color-violet-950)'
            strokeWidth={1}
            // fill='var(--color-violet-600)'
            fill='url(#wedge-gradient-1)'
            labelLine={false}
            label={renderLabel}
          >
            <Label
              position='center'
              value={'Typescript'}
              fill='var(--color-violet-600)'
              style={{
                fontSize: 16,
                fontWeight: 700,
                transform: 'translate(0%, 43%)'
              }}
            />
          </Pie>

          <Pie
            paddingAngle={0}
            startAngle={90}
            endAngle={-270 + reactInverseValue}
            data={reactData}
            nameKey='name'
            dataKey='skill' // ???
            cx='75%'
            cy='50%'
            innerRadius={'0%'}
            outerRadius={'100%'}
            // stroke='var(--color-sky-600)'
            // fill='var(--color-sky-400)'
            fill='url(#wedge-gradient-2)'
            stroke='var(--color-sky-950)'
            strokeWidth={1}
            labelLine={false}
            label={renderLabel}
          >
            <Label
              position='center'
              value={'React'}
              fill='var(--color-sky-400)'
              style={{
                fontSize: 16,
                fontWeight: 700,
                transform: 'translate(0%, 43%)'
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
