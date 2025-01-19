import { ReactNode } from 'react'
import { AreaChart } from './AreaChart'
import { BarChart } from './BarChart'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { PieChart2 } from './PieChart2'
import { PieProgress } from './PieProgress'
import { RadialProgress } from './RadialProgress'
import { HorizontalSkills } from './HorizontalSkills'
import { PercentGauge } from './PercentGauge'
import { WedgeChart } from './WedgeChart'
import { CustomShapeBarChart } from './CustomShapeBarChart'
// import { Gauge } from './Gauge'

/* ========================================================================

======================================================================== */
// I began by using Tremor Charts, which is just an abstraction over Recharts.
// However, there was a lot of additional package downloads and modifications
// to the Tailwind config that I didn't really like. I can understand why
// Tremor exists. Recharts is fairly complex. That said, an abstraction like
// Tremor also limits the flexibility of the underlying Recharts library.

// https://www.youtube.com/watch?v=Fu_YFp-9xoQ&t=14s

// Todo: Lama Dev  : https://www.youtube.com/watch?v=fq7k_gVV5x8
// Todo at 2:18:45 : https://www.youtube.com/watch?v=uoJ0Tv-BFcQ&t=2030s

export const RechartDemo = () => {
  return (
    <>
      <div
        className={`grid w-full auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-8`}
      >
        <GridItem>
          <AreaChart />
        </GridItem>

        <GridItem>
          <BarChart />
        </GridItem>

        <GridItem>
          <LineChart />
        </GridItem>

        <GridItem>
          <PieChart />
        </GridItem>

        <GridItem>
          <PieChart2 />
        </GridItem>

        <GridItem>
          <PieProgress />
        </GridItem>

        <GridItem>
          <RadialProgress />
        </GridItem>

        <GridItem>
          <HorizontalSkills />
        </GridItem>

        <GridItem>
          <PercentGauge percent={33.33} />
        </GridItem>

        <GridItem>
          <WedgeChart />
        </GridItem>

        <GridItem>
          <CustomShapeBarChart />
        </GridItem>

        {/* <GridItem>
          <Gauge />
        </GridItem> */}
      </div>
    </>
  )
}

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`flex aspect-video flex-col items-center justify-center rounded-xl border-[1.5px] border-[#409] bg-[rgb(247,252,255)] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]`}
    >
      {children}
    </div>
  )
}
