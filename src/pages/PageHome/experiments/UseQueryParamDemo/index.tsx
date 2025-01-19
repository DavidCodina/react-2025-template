import { useState } from 'react'
import { useQueryParam } from './useQueryParam'

/* ========================================================================
                                UseQueryStateDemo     
======================================================================== */

export const UseQueryParamDemo = () => {
  const [firstName, setFirstName] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const paramValue = params.get('firstName')
    if (paramValue && typeof paramValue === 'string') {
      return paramValue
    }
    return 'David'
  })

  const [lastName, setLastName] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const paramValue = params.get('lastName')
    if (paramValue && typeof paramValue === 'string') {
      return paramValue
    }
    return 'Codina'
  })

  useQueryParam({
    key: 'firstName',
    value: firstName,
    setOnMount: true
  })

  useQueryParam({
    key: 'lastName',
    value: lastName,
    setOnMount: true
  })

  /* ======================
       handleSubmit()
  ====================== */

  const handleSubmit = () => {
    setFirstName('')
    setLastName('')
  }

  /* ======================
          return
  ====================== */

  return (
    <div className='mx-auto max-w-[800px] rounded-lg border border-neutral-400 bg-[#fafafa] p-4'>
      <div className='mb-4'>
        <input
          className='block w-full rounded border border-neutral-400 bg-white px-2 py-1 text-sm'
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
          placeholder='First Name...'
          value={firstName}
        />
      </div>

      <div className='mb-4'>
        <input
          className='block w-full rounded border border-neutral-400 bg-white px-2 py-1 text-sm'
          onChange={(e) => {
            setLastName(e.target.value)
          }}
          placeholder='Last Name...'
          value={lastName}
        />
      </div>

      <button
        className='block w-full rounded border border-violet-900 bg-violet-600 px-2 py-1 text-sm font-bold text-white'
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}
