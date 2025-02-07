'use client'

import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Product as IProduct } from './interfaces/product.interface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getProductImage } from './product-image'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const router = useRouter()
  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{product.name}</Typography>
          {product.imageExists && (
            <Image
              src={getProductImage(product.id)}
              width="0"
              height="0"
              sizes="100vw"
              alt="Picture of the product"
              className="w-full h-auto"
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>{product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  )
}
