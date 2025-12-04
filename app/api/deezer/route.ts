import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

  if (!q) {
    return new NextResponse(JSON.stringify({ error: 'missing_query' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=15`

  try {
    const res = await fetch(url)
    const data = await res.json()

    return new NextResponse(JSON.stringify(data), {
      status: res.status,
      headers: {
        'content-type': 'application/json',
        // short CDN cache, allow stale while revalidate
        'cache-control': 's-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'fetch_failed' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
