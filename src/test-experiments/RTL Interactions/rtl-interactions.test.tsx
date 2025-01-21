import { useState, useEffect } from 'react'
import userEvent from '@testing-library/user-event'
import {
  render,
  screen
  //, logRoles
} from '@testing-library/react'

const ClickCounter = ({ dataTestId }: { dataTestId?: string }) => {
  const [count, setCount] = useState(0)
  return (
    <button data-testid={dataTestId} onClick={() => setCount((v) => v + 1)}>
      Count: {count}
    </button>
  )
}

/* ========================================================================

======================================================================== */
// https://testing-library.com/docs/user-event/intro
// https://www.youtube.com/watch?v=pyKS3H2i7gk&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=36
// https://www.youtube.com/watch?v=kqX14UyjhDM&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=37

describe('RTL Interactions...', () => {
  /* ======================

  ====================== */

  test('ClickCounter', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ClickCounter dataTestId={'click-counter'} />)
    const button = screen.getByTestId('click-counter')

    // Assert
    expect(button).toHaveTextContent('Count: 0')

    // Act
    await user.click(button)
    await user.click(button)

    // Assert
    expect(button).toHaveTextContent('Count: 2')
  })

  /* ======================

  ====================== */

  test('should call mock handleClick when clicked.', async () => {
    const user = userEvent.setup()

    // Mocking Functions: https://www.youtube.com/watch?v=TuxmnyhPdhA&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=42
    const handleClick = vi.fn()

    render(<button onClick={handleClick}>Click Me</button>)

    const button = screen.getByRole('button')

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  /* ======================

  ====================== */

  test('should spy on obj.mock and detect being called when clicked.', async () => {
    const user = userEvent.setup()

    const obj = {
      mockHandler: () => {}
    }
    const spy = vi.spyOn(obj, 'mockHandler')

    render(<button onClick={obj.mockHandler}>Click Me</button>)
    const button = screen.getByRole('button')

    await user.click(button)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  /* ======================

  ====================== */

  test('should be be removed on click.', async () => {
    const RemoveOnClick = () => {
      const [show, setShow] = useState(true)

      return (
        <div>
          {show ? (
            <button onClick={() => setShow(false)}>Click Me</button>
          ) : (
            <div>The button has been removed.</div>
          )}
        </div>
      )
    }

    const user = userEvent.setup()

    render(<RemoveOnClick />)

    const button = screen.getByRole('button')
    const message = screen.queryByText('The button has been removed.')
    expect(button).toBeInTheDocument()
    expect(message).not.toBeInTheDocument()

    await user.click(button)
    const message2 = screen.getByText('The button has been removed.')

    expect(button).not.toBeInTheDocument()
    expect(message2).toBeInTheDocument()
  })

  /* ======================

  ====================== */

  test('should show button shortly after mount, then remove on click.', async () => {
    const ShowOnMount = () => {
      const [show, setShow] = useState(false)

      useEffect(() => {
        setTimeout(() => {
          setShow(true)
        }, 500)
      }, [])

      return (
        <div>
          {show && <button onClick={() => setShow(false)}>Click Me</button>}
        </div>
      )
    }

    const user = userEvent.setup()

    render(<ShowOnMount />)

    // findBy* has a default timeout of 1000ms.
    // The third arg can be used to specify the timeout.
    // Essentiallly, findBy* is the comination of waitFor with a getBy* query.
    const button = await screen.findByRole(
      'button' /* , undefined, { timeout: 1000 } */
    )
    expect(button).toBeInTheDocument()

    // Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly
    // marked as ignored with the `void` operator.eslint@typescript-eslint/no-floating-promises)
    await user.click(button)
    expect(button).not.toBeInTheDocument()

    ///////////////////////////////////////////////////////////////////////////
    //
    // Alternative Syntax:
    //
    //   let button: HTMLElement | null = null
    //   await waitFor(() => {
    //     button = screen.getByRole('button')
    //     expect(button).toBeInTheDocument()
    //   })
    //
    //   await user.click(button as unknown as HTMLElement)
    //   expect(button).not.toBeInTheDocument()
    //
    ///////////////////////////////////////////////////////////////////////////
  })

  /* ======================

  ====================== */
  // Todo:
  // Keyboard Interactions: https://www.youtube.com/watch?v=kqX14UyjhDM&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=37
})
