// Third-party imports
import { Fragment, useState } from 'react'

// Custom imports
import { Button, Unmounter } from 'components'
import { TestModal } from './TestModal'

/* ========================================================================
                                ModalDemo
======================================================================== */

export const ModalDemo = () => {
  const [showModal, setShowModal] = useState(false)

  /* ======================
        toggleModal()
  ====================== */

  const toggleModal = () => {
    setShowModal((v) => !v)
  }

  /* ======================
          return
  ====================== */

  return (
    <Fragment>
      <Button
        className='mx-auto my-6 block'
        color='green'
        onClick={toggleModal}
      >
        {showModal ? 'Hide Modal' : 'Show Modal'}
      </Button>

      <Unmounter
        remountDelay={50}
        shouldRemount
        show={showModal}
        unmountDelay={1000}
      >
        <TestModal
          onClose={() => {
            setShowModal(false)
          }}
          show={showModal}
        />
      </Unmounter>
    </Fragment>
  )
}
