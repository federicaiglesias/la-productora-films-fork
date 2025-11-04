'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Demo } from '@/payload-types' // asumiendo que tu colección `demos` genera este tipo

export type DemosProps = {
  demos: Demo[]
}

export const DemosCollectionArchive: React.FC<DemosProps> = ({ demos }) => {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDemo(null)
    }
    if (selectedDemo) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedDemo])

  return (
    <div>
      <div className="grid grid-cols-1 gap-px mx-auto w-full">
        {demos?.map((demo, index) => {
          const thumbnail = typeof demo.thumbnail === 'object' ? demo.thumbnail : null
          const src =
            (thumbnail && (thumbnail.url || thumbnail.thumbnailURL)) || '/path/to/placeholder.png'
          return (
            <div
              key={index}
              className="relative w-full aspect-[16/9] sm:aspect-[16/5] cursor-pointer overflow-hidden group"
              onClick={() => setSelectedDemo(demo)}
            >
              {thumbnail && (
                <Image
                  src={src}
                  alt={demo.title || 'demo thumbnail'}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center px-4">
                <div className="text-white flex flex-col items-center w-full">
                  {demo.director && (
                    <p className="text-base sm:text-lg md:text-[18px] opacity-90 tracking-wide font-avenir font-[300]">
                      {demo.director}
                    </p>
                  )}
                  <p className="uppercase text-2xl sm:text-4xl md:text-[32px] leading-tight my-2 sm:my-4 font-avenir font-[500]">
                    {demo.title}
                  </p>
                  <p className="text-lg sm:text-2xl md:text-[18px] opacity-90 font-avenir font-[100]">
                    {demo.client || 'La Productora Films'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal (Vimeo/YouTube) */}
      {selectedDemo && (selectedDemo.vimeoUrl || selectedDemo.youtubeUrl) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90" onClick={() => setSelectedDemo(null)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            {(() => {
              // Primero Vimeo (igual que commercials)
              if (selectedDemo.vimeoUrl) {
                let videoId = String(selectedDemo.vimeoUrl)
                try {
                  const url = new URL(selectedDemo.vimeoUrl)
                  videoId = url.pathname.split('/').filter(Boolean).pop() || videoId
                } catch {
                  const parts = selectedDemo.vimeoUrl.split('/')
                  videoId = parts[parts.length - 1] || ''
                }
                return (
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0&title=0&byline=0&portrait=0&controls=1`}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )
              }

              // Fallback YouTube (por si lo usás en algunos demos)
              if (selectedDemo.youtubeUrl) {
                let id = ''
                try {
                  const u = new URL(selectedDemo.youtubeUrl)
                  id = u.hostname.includes('youtu.be')
                    ? u.pathname.split('/').filter(Boolean).pop() || ''
                    : u.searchParams.get('v') || ''
                } catch {
                  const parts = selectedDemo.youtubeUrl.split('v=')
                  id = parts[1]?.split('&')[0] || ''
                }
                return (
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )
              }

              return null
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export const DemosAiBlock: React.FC<{ items: Array<{ demo: Demo }> }> = ({ items }) => {
  const demos = (items || []).map((i) => i.demo).filter(Boolean)
  return <DemosCollectionArchive demos={demos} />
}
