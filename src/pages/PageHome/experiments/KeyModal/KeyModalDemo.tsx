import { useState } from 'react'
import { Modal } from './'

/* ========================================================================

======================================================================== */

export const KeyModalDemo = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        className='btn-blue btn-sm mx-auto block'
        onClick={() => {
          setShow(true)
        }}
      >
        Open Modal
      </button>
      <Modal
        onClose={() => {
          setShow(false)
        }}
        show={show}
      />
    </>
  )
}
