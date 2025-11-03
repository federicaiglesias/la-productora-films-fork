// app/(frontend)/[slug]/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const SKIP_BLOCKS = process.env.NEXT_PUBLIC_SKIP_BLOCKS === '1'

// Construye base absoluta desde headers (soporta Vercel/reversos)
async function getBaseURL() {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  if (!host) throw new Error('Missing host header')
  return `${proto}://${host}`
}

// Helper: trae la page por slug vía HTTP (reenvía cookie si hay)
async function fetchPageBySlug(slug: string, draft: boolean, cookie: string | null) {
  const base = await getBaseURL()
  const params = new URLSearchParams()
  params.set('where[slug][equals]', slug)
  params.set('limit', '1')
  params.set('pagination', 'false')
  params.set('depth', '3')
  if (draft) params.set('draft', 'true')

  const res = await fetch(`${base}/api/pages?${params.toString()}`, {
    cache: 'no-store',
    headers: cookie ? { cookie } : {},
  })
  if (!res.ok) throw new Error(`Pages API ${res.status}`)
  const data = await res.json()
  return data?.docs?.[0] ?? null
}

type Args = { params: Promise<{ slug?: string }> }

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise

  const h = await headers()
  const cookie = h.get('cookie')

  const page = await fetchPageBySlug(slug, draft, cookie)

  if (!page) {
    const base = await getBaseURL()
    const debugURL = `${base}/api/pages?where[slug][equals]=${encodeURIComponent(
      slug,
    )}&limit=1&depth=1${draft ? '&draft=true' : ''}`
    return (
      <main style={{ padding: 24, color: 'white' }}>
        <h1>/{slug}</h1>
        <p>
          No encontré <code>pages</code> con ese slug.
        </p>
        <p>
          Probar: <code>{debugURL}</code>
        </p>
      </main>
    )
  }

  return (
    <article className="pt-0 pb-0">
      {draft && <LivePreviewListener />}

      <RenderHero {...page.hero} />
      {!SKIP_BLOCKS && <RenderBlocks blocks={page.layout} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise

  const h = await headers()
  const cookie = h.get('cookie')
  const base = await getBaseURL()

  const params = new URLSearchParams()
  params.set('where[slug][equals]', slug)
  params.set('limit', '1')
  params.set('pagination', 'false')
  params.set('depth', '0') // liviano
  if (draft) params.set('draft', 'true')

  const res = await fetch(`${base}/api/pages?${params.toString()}`, {
    cache: 'no-store',
    headers: cookie ? { cookie } : {},
  })

  const data = res.ok ? await res.json() : null
  const p = data?.docs?.[0]

  const title = p?.meta?.title ?? p?.title ?? 'Page'
  const description = p?.meta?.description ?? undefined
  const og =
    p?.meta?.image && typeof p.meta.image === 'object'
      ? [{ url: p.meta.image.url ?? '' }]
      : undefined

  return { title, description, openGraph: { title, description, images: og } }
}
