import { cookies } from 'next/headers'
import { PostOptions } from '../interfaces/post-options.interface'
import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

export const getHeaders = async () => {
  const cookieStore = await cookies()
  return {
    Cookie: cookieStore.toString(),
  }
}

export const post = async (path: string, formData: FormData, options?: PostOptions) => {
  const headerCookies = await getHeaders()

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

  return { error: '', data: parseRes }
}

export const get = async <T>(path: string, tags?: string[]): Promise<T> => {
  const headerCookies = await getHeaders()
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headerCookies },
    next: { tags },
  })
  const data = (await res.json()) as unknown
  return data as T
}
