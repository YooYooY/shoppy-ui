import { cookies } from 'next/headers'
import { AUTHENTICATION_COOKIE } from './auth-cookies'

export default async function authenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get(AUTHENTICATION_COOKIE)?.value
}
 