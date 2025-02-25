'use client'

import Grid from '@mui/material/Grid2'
import { Product as IProduct } from './interfaces/product.interface'
import Product from './product'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { API_URL } from '../common/constants/api'
import revalidateProducts from './actions/revalidate-products'
import getAuthenticated from '../auth/actions/get-authentication'

interface ProductGridProps {
  products: IProduct[]
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthenticated()
        }
      })

      socket.on('productUpdated', () => {
        revalidateProducts()
      })
    }
    
    createSocket()

    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <Grid container spacing={3} sx={{ height: '85vh', overflow: 'scroll' }}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, lg: 4, sm: 6 }}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
