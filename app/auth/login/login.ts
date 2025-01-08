'use server'

import { FormError } from '@/app/common/interfaces/form-error.interface'
import { API_URL } from '@/app/common/constants/api'
import { getErrorMessage } from '@/app/common/util/errors'
import { post } from '@/app/common/util/fetch'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function login(_prevState: FormError, formData: FormData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })

  const parseRes = await res.json()

  if (!res.ok) {
    return { error: getErrorMessage(parseRes) }
  }

  setAuthCookie(res)

  redirect('/')
}

const setAuthCookie = async (response: Response) => {
  const setCookiesHeader = response?.headers.get('Set-Cookie')

  if (setCookiesHeader) {
    const token = setCookiesHeader.split(';')[0].split('=')[1]
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'Authentication',
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
