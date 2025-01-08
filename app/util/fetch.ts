import { cookies } from 'next/headers'
import { PostOptions } from '../common/post-options.interface'
import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

const getCookies = async () => {
  const cookieStore = await cookies()
  return {
    Cookie: cookieStore.toString(),
  }
}

export const post = async (path: string, formData: FormData, options?: PostOptions) => {
  const headerCookies = await getCookies()

  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headerCookies },
    body: JSON.stringify(Object.fromEntries(formData)),
  })

  const parseRes = await res.json()

  if (!res.ok) {
    return {
      error: getErrorMessage(parseRes),
    }
  }

  // if (options?.returnRes) {
  //   return res
  // }

  return { error: '' }
}

export const get = async (path: string) => {
  const headerCookies = await getCookies()
  const res = await fetch(`${API_URL}/${path}`, {
    
    headers: { ...headerCookies },
  })
  return res.json()
}
