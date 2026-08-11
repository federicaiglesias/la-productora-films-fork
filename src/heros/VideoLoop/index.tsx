'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'

export const VideoLoopHero: React.FC<Page['hero']> = (hero) => {
  const { setHeaderTheme } = useHeaderTheme()

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  const [useNarrowVideo, setUseNarrowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldMute, setShouldMute] = useState(true)
  const [stableViewportHeight, setStableViewportHeight] = useState(0)

  const updateSize = useCallback(() => {
    const vw = window.innerWidth
    let vh = window.innerHeight

    if (isMobile) {
      if (stableViewportHeight > 0) {
        vh = Math.max(vh, stableViewportHeight)
      } else {
        setStableViewportHeight(vh)
      }
    }

    const videoRatio = 16 / 9

    if (vw / vh > videoRatio) {
      setSize({
        width: vw,
        height: vw / videoRatio,
      })
    } else {
      setSize({
        width: vh * videoRatio,
        height: vh,
      })
    }
  }, [isMobile, stableViewportHeight])

  useEffect(() => {
    const checkAspectRatio = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const viewportRatio = vw / vh

      setUseNarrowVideo(viewportRatio <= 0.9)
    }

    const checkMobile = () => {
      const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        (window as Window & { opera?: string }).opera ||
        ''

      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )

      setIsMobile(isMobileDevice)

      if (isMobileDevice) {
        setShouldMute(true)
        setStableViewportHeight(window.innerHeight)
      }
    }

    checkAspectRatio()
    checkMobile()

    window.addEventListener('resize', checkAspectRatio)

    return () => {
      window.removeEventListener('resize', checkAspectRatio)
    }
  }, [])

  useEffect(() => {
    setHeaderTheme('dark')

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    updateSize()

    window.addEventListener('resize', updateSize)

    const visualViewport = window.visualViewport

    const handleVisualViewportResize = () => {
      if (!visualViewport) return

      const viewportHeight = visualViewport.height

      if (stableViewportHeight === 0 || viewportHeight > stableViewportHeight * 0.9) {
        updateSize()
      }
    }

    if (isMobile && visualViewport) {
      visualViewport.addEventListener('resize', handleVisualViewportResize)
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''

      window.removeEventListener('resize', updateSize)

      if (visualViewport) {
        visualViewport.removeEventListener('resize', handleVisualViewportResize)
      }
    }
  }, [setHeaderTheme, updateSize, isMobile, stableViewportHeight])

  const cta = hero?.cta ?? {}

  const fileUrl = cta.file && typeof cta.file !== 'number' ? cta.file.url : undefined

  const firstLink = hero?.links?.[0]?.link

  const ctaLabel = cta.label ?? firstLink?.label ?? 'Cash Rebate Program'

  const ctaHref = fileUrl ?? cta.url ?? firstLink?.url ?? '/pdf/cash-rebate-program.pdf'

  const ctaNewTab = Boolean(cta.newTab ?? firstLink?.newTab)

  const downloadAttr =
    fileUrl && cta.download
      ? {
          download: cta.filename || undefined,
        }
      : {}

  const cmsDesktop =
    hero?.videoDesktop && typeof hero.videoDesktop !== 'number' ? hero.videoDesktop.url : undefined

  const cmsMobile =
    hero?.videoMobile && typeof hero.videoMobile !== 'number' ? hero.videoMobile.url : undefined

  const poster = hero?.poster && typeof hero.poster !== 'number' ? hero.poster.url : undefined

  const desktopFallback = '/videos/hero-home-desktop.mp4'

  const mobileFallback = '/videos/hero-home-mobile.mp4'

  const desktopSrc = cmsDesktop || desktopFallback

  const mobileSrc = cmsMobile || cmsDesktop || mobileFallback

  const src = useNarrowVideo || isMobile ? mobileSrc : desktopSrc

  return (
    <div
      className="fixed -z-10 overflow-hidden"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: isMobile && stableViewportHeight > 0 ? `${stableViewportHeight}px` : '100vh',
      }}
    >
      <div className="absolute inset-0 bg-black" />

      <video
        key={src}
        autoPlay
        muted={shouldMute}
        playsInline
        loop
        preload="auto"
        src={src}
        poster={poster || undefined}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onPlay={() => setIsLoading(false)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          opacity: 1,
          transition: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}

      <a
        href={ctaHref}
        {...(ctaNewTab
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          : {})}
        {...downloadAttr}
        className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2"
      >
        <div className="min-w-[200px] cursor-pointer rounded-full border border-white px-4 py-2 text-center text-white transition-colors hover:bg-white hover:text-black">
          {ctaLabel}
        </div>
      </a>
    </div>
  )
}
