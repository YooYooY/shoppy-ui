import { Suspense } from 'react'
import CreateProductFab from './products/create-product/create-product-fab'
import Products from './products/products'

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
      <CreateProductFab></CreateProductFab>
    </>
  )
}