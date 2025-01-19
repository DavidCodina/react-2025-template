// Third-party imports
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'

// Custom imports
import { useThemeContext } from 'contexts'
import { Alert, HR } from 'components'
import { getProducts, Product } from '../getProducts'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* =============================================================================
                                  PageProductList
============================================================================= */

const PageProductList = () => {
  const navigate = useNavigate()
  const { mode } = useThemeContext()

  const [products, setProducts] = useState<Product[] | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')

  /* ======================
      renderProducts()
  ====================== */

  const renderProducts = () => {
    if (status === 'error') {
      return (
        <Alert
          className='alert-red mx-auto my-12 max-w-2xl'
          leftSection={
            <svg
              style={{ height: '3em' }}
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z' />
              <path d='M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z' />
            </svg>
          }
          rightSection={
            <button
              className={`${Alert.redButtonFix} flex w-full active:scale-[0.99]`}
              onClick={handleGetProducts}
              style={{ minWidth: 100 }}
            >
              Retry
            </button>
          }
          rightClassName='items-end flex'
          centerClassName='flex-1'
        >
          <Alert.Heading>Error!</Alert.Heading>

          <p className='text-sm'>Unable to get products.</p>
        </Alert>
      )
    }

    if (status === 'pending') {
      return (
        <div
          aria-label='Loading'
          className='pointer-events-none fixed inset-0 flex items-center justify-center'
          style={{ zIndex: 9999 }}
        >
          <div className='relative flex h-20 w-20'>
            <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_ease_infinite] rounded-full border-[6px] border-solid border-t-transparent border-r-transparent border-b-violet-800 border-l-transparent'></i>
            <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_linear_infinite] rounded-full border-[6px] border-dotted border-t-transparent border-r-transparent border-b-violet-800 border-l-transparent opacity-75'></i>
          </div>
        </div>
      )
    }

    if (status === 'success' && Array.isArray(products)) {
      if (products.length === 0) {
        return (
          <Alert
            className='alert-blue mx-auto my-12 max-w-2xl'
            leftSection={
              <svg
                style={{ height: '3em' }}
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
              </svg>
            }
            rightClassName='items-end flex'
            centerClassName='flex-1'
          >
            <Alert.Heading>Whoops!</Alert.Heading>

            <p className='text-sm'>It looks like there aren't any products.</p>
          </Alert>
        )
      }

      return (
        <ul
          className='mx-auto overflow-hidden rounded-xl border border-gray-500'
          style={{ maxWidth: 500 }}
        >
          {Array.isArray(products) &&
            products.map((product) => {
              return (
                <li
                  className='border-b border-gray-500 last:border-none'
                  key={product.id}
                  style={{ cursor: 'pointer' }}
                >
                  <button
                    className='block w-full bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
                    // If using a <div> instead:
                    // Visible, non-interactive elements with click handlers must have
                    // at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events)
                    // onKeyDown={(_e) => {console.log(e) }}
                    // role='button'
                    // tabIndex={0}
                    onClick={() =>
                      navigate(`/products/${product.id}`, {
                        // location.state persists across refreshes, but the data is not
                        // stored in the URL. For that reason, I generally avoid using this feature.
                        state: {
                          productName: product.name
                        }
                      })
                    }
                  >
                    {/* You could use <Link /> but, I often prefer navigating programmatically.
                    <Link to={`/products/${product.id}`}>{product.name}</Link> */}
                    {product.name}
                  </button>
                </li>
              )
            })}
        </ul>
      )
    }

    // i.e., if 'idle'
    return null
  }

  /* ======================
      handleGetProducts
  ====================== */

  const handleGetProducts = useCallback(() => {
    setStatus('pending')
    getProducts()
      .then((json) => {
        const { data, success } = json

        if (success === true && Array.isArray(data)) {
          setStatus('success')
          setProducts(data)
        } else {
          setStatus('error')
        }

        return json
      })
      .catch((err) => {
        setStatus('error')
        return err
      })
  }, [])

  /* ======================
        useEffect()
  ====================== */
  // On mount, make an API call to get products...

  useEffect(() => {
    handleGetProducts()
  }, [handleGetProducts])

  /* ======================
          return
  ====================== */

  return (
    <div
      className={`mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      {/* <Waves /> */}

      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative' }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Product List
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Product List
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        {renderProducts()}
      </div>
    </div>
  )
}

export default PageProductList
