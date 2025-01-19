// Third-party imports
// import { useState } from 'react'

// Custom imports
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
  // withUnmounter
} from 'components/Modal'

import { Button } from 'components'

interface ITestModal {
  onClose: () => void
  show: boolean
}

/* ========================================================================
                              TestModal
======================================================================== */
// TestModal is an abstraction that builds on top of Modal.

export const TestModal = ({ onClose, show }: ITestModal) => {
  // const [showNestedModal, setShowNestedModal] = useState(false)
  // const [count, setCount] = useState(0)

  /* ======================
      toggleNestedModal()
  ====================== */

  // const toggleNestedModal = () => {
  //   setShowNestedModal((v) => !v)
  // }

  /* ======================
          return
  ====================== */

  return (
    <Modal
      id='my-modal'
      modalDialogStyle={{
        width: 800,
        maxWidth: 'calc(100vw - 20px)'
      }}
      onClose={onClose}
      // addCloseButton
      // centered={false}
      // fullscreen={true} // boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
      // scrollable={false}
      // shouldAnimate={false}
      // shouldShowBackdrop={false}
      // size='xl' // "xl" | "sm" | "lg" | undefined
      // createPortalWithIdOf='awesome-modal-portal'
      // portalId='abc123'
      show={show}
    >
      <ModalHeader
        // titleClassName='text-blue-500 font-black'
        // titleStyle={{ }}
        onClose={onClose}
      >
        Title Here...
        {/* <div>
          <h5 className='mb-2 font-black text-blue-500'>This is the Title</h5>
          <p className='m-0 text-sm font-bold leading-none text-blue-500'>
            This is the subtitle for people who like to read...
          </p>
        </div> */}
      </ModalHeader>

      <ModalBody className='' style={{}}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* <h5
            style={{
              color: '#333',
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 20,
              textAlign: 'center'
            }}
          >
            Custom Header Inside of Body
          </h5>

          <Button
            color='green'
            className='mx-auto my-6 block'
            onClick={() => {
              setCount((v) => v + 1)
            }}
            style={{ minWidth: 150 }}
          >
            Count {count}
          </Button> */}

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* <Button
            className='mx-auto my-6 block btn-gray btn-sm'
            onClick={toggleNestedModal}
            style={{ minWidth: 150 }}
          >
            {showNestedModal ? 'Hide Nested Modal' : 'Show Nested Modal'}
          </Button>

          <Modal
            id='my-nested-modal'
            onClose={() => {
              setShowNestedModal(false)
            }}
            show={showNestedModal}
            // shouldAnimate={false}
            // shouldShowBackdrop={false}
          >
            <ModalBody>
              <p>Yay! This is the nested Modal.</p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </ModalBody>
          </Modal> */}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button className='btn-gray btn-sm' style={{ minWidth: 100 }}>
          Action 1
        </Button>
        <Button className='btn-blue btn-sm' style={{ minWidth: 100 }}>
          Action 2
        </Button>
      </ModalFooter>
    </Modal>
  )
}
