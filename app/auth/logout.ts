'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "./auth-cookies";

export default async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTHENTICATION_COOKIE)
  redirect('/auth/login')
}