import { useRef } from 'react'
import { ClassBasedCounter, CounterInstance } from './'

/* ========================================================================
      
======================================================================== */

export const ClassBasedCounterDemo = () => {
  const counterRef = useRef<CounterInstance | null>(null)

  return (
    <>
      <div className='mx-auto max-w-[800px] rounded-lg border border-neutral-400 bg-white p-4 shadow'>
        <div className='btn-group mx-auto mb-6' style={{ display: 'table' }}>
          <button
            className='btn-gray btn-sm'
            onClick={() => {
              const counter = counterRef.current
              if (!counter) {
                return
              }
              counter.decrement()
            }}
          >
            External Decrement
          </button>

          <button
            className='btn-gray btn-sm'
            onClick={() => {
              const counter = counterRef.current
              if (!counter) {
                return
              }
              counter.reset()
            }}
          >
            External Reset
          </button>

          <button
            className='btn-gray btn-sm'
            onClick={() => {
              const counter = counterRef.current
              if (!counter) {
                return
              }
              counter.increment()
            }}
          >
            External Increment
          </button>
        </div>

        <ClassBasedCounter ref={counterRef} />
      </div>
    </>
  )
}
