'use server';
import { cookies } from 'next/headers'
import { AUTHENTICATION_COOKIE } from '../auth-cookies'

export default async function getAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTHENTICATION_COOKIE)
}
