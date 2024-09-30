interface Pair {
  id: number,
  name: string
}

interface Data {
  category: Pair,
  id: number,
  name: string,
  photoUrls: string[],
  tags: Pair[]
}

export default async function getData() {
  const res = await fetch('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available')
  return await res.json() as Data
}
