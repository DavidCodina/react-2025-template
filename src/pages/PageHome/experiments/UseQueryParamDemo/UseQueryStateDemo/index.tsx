import { useQueryState } from './useQueryState'

/* ========================================================================
                                UseQueryStateDemo     
======================================================================== */

export const UseQueryStateDemo = () => {
  const [firstName, setFirstName] = useQueryState({
    key: 'firstName',
    initialValue: 'David',
    setOnMount: true
  })

  const [lastName, setLastName] = useQueryState({
    key: 'lastName',
    initialValue: 'Codina',
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
