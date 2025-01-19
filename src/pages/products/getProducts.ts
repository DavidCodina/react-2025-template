import { sleep, randomFail } from 'utils'
import { API_Response } from 'types'

export type Product = { id: string; name: string }
type Data = Product[] | null
type GetProductsResponse = API_Response<Data>
type GetProducts = () => GetProductsResponse

const products: Product[] = [
  { id: '1', name: 'Captain Krunk Berries' },
  { id: '2', name: 'Frosted Hemp Nuggs' },
  { id: '3', name: 'Burnt Cinnamon Toast Crunch' }
]

export const getProducts: GetProducts = async () => {
  await sleep(1500)

  const json = {
    data: products,
    message: 'Request success.',
    success: true
  }

  if (randomFail(0.25)) {
    return {
      data: null,
      message: 'Request fail.',
      success: false
    }
  }

  return json
}
