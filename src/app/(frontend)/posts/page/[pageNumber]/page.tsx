// src/app/(frontend)/posts/page/[pageNumber]/page.tsx
export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'

// Mantener consistencia: params como Promise (igual que en otros archivos del segmento)
type PageProps = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const { pageNumber } = await paramsPromise
  const pageNum = Number(pageNumber)
  if (!Number.isInteger(pageNum) || pageNum < 1) notFound()

  const payload = await getPayload({ config: configPromise })

  const limit = 12
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    page: pageNum,
    overrideAccess: false,
  })

  // Si piden una página fuera de rango en build/SSG => 404
  if (pageNum > 1 && pageNum > (posts.totalPages || 1)) notFound()

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={limit}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const pageNum = Number(pageNumber)
  return {
    title: `Posts — Página ${Number.isFinite(pageNum) ? pageNum : 1}`,
  }
}

// SSG: generamos TODAS las páginas válidas
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const limit = 12
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))

  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: String(i + 1),
  }))
}
