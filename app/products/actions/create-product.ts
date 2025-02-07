'use server'

import { API_URL } from '@/app/common/constants/api'
import { getHeaders, post } from '@/app/common/util/fetch'
import { revalidateTag } from 'next/cache'

export default async function createProduct(formData: FormData) {
  const response = await post('products', formData)
  const productImage = formData.get('image')

  if (productImage instanceof File && !response.error) {
    await uploadProductImage(response.data.id, productImage)
  }

  revalidateTag('products')

  return response
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData()
  formData.append('image', file)
  const headers = await getHeaders()
  await fetch(`${API_URL}/products/${productId}/image`, {
    method: 'POST',
    body: formData,
    headers,
  })
}
