import getMe from './get-me'

export default async function Home() {
  const me = await getMe()
  console.log('me=>', me)
  return <div>{me && me.userId}</div>
}
