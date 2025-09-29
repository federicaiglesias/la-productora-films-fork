'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { Media } from '@/payload-types'

type AIProps = {
  topImage?: number | Media | null
  leftImage?: number | Media | null
  rightImage?: number | Media | null
  content?: any // Lexical JSON
}

function urlOf(m?: number | Media | null) {
  return m && typeof m === 'object' ? (m.url ?? undefined) : undefined
}
console.log('ArtificialIntelligenceBlock - Rendered on client')
export const ArtificialIntelligenceBlock: React.FC<AIProps> = (props) => {
  const topSrc = urlOf(props.topImage) ?? '/images/top.png'
  const leftSrc = urlOf(props.leftImage) ?? '/images/left.png'
  const rightSrc = urlOf(props.rightImage) ?? '/images/right.png'

  return (
    <section className="relative text-white overflow-hidden md:py-2 font-avenir md:mb-20 sm:mb-2">
      {/* decorativas */}
      <div className="pointer-events-none select-none" aria-hidden>
        {/* bottom left */}
        <div className="hidden xl:block absolute bottom-20 left-[-5%] translate-y-[100px]">
          <Image src={leftSrc} alt="" width={630} height={420} />
        </div>

        {/* bottom right */}
        <div className="hidden xl:block absolute bottom-10 right-[-5%]">
          <Image src={rightSrc} alt="" width={630} height={420} />
        </div>
      </div>

      {/* centro */}
      <div className="container relative z-[1] px-4">
        {/* top image */}
        <div className="flex justify-center mb-2 md:mb-2">
          <Image src={topSrc} alt="" width={780} height={510} priority />
        </div>

        <div className="mx-auto max-w-3xl text-center leading-relaxed space-y-6">
          {props.content ? (
            <RichText data={props.content} enableGutter={false} />
          ) : (
            <>
              <p className="text-[15px] md:text-lg opacity-90">
                “There are ideas too big to fit on a set.
                <br className="hidden md:block" />
                Stories so powerful they demand new ways of being told.
                <br className="hidden md:block" />
                Images that, until now, seemed impossible.”
              </p>
              <p className="text-[15px] md:text-lg opacity-90">
                This is new territory.
                <br className="hidden md:block" />
                A laboratory where artificial intelligence serves emotion, art, and visual
                storytelling.
                <br className="hidden md:block" />
                It’s not a replacement. It’s expansion. It’s creative freedom.
              </p>
              <p className="text-[15px] md:text-lg opacity-90">
                Where there were once technical limits, now there are open doors.
                <br className="hidden md:block" />
                Where we used to say “it can’t be done,” now we say “imagine it.”
              </p>
              <p className="text-[15px] md:text-lg opacity-90">
                The future of image is no longer a promise.
                <br className="hidden md:block" />
                It’s a tool.
                <br className="hidden md:block" />
                And it’s ready to be used.”
              </p>
              <div className="pt-2 pb-10">
                <span className="tracking-wide text-lg md:text-xl font-semibold">
                  LA PRODUCTORA{' '}
                </span>
                <span className="tracking-wide text-lg md:text-xl font-semibold text-emerald-400">
                  AI
                </span>
              </div>

              {/* imágenes para móviles */}
              <div className="xl:hidden relative mt-8 mx-4">
                <div className="relative">
                  <div className="absolute left-[-30%] top-0 ">
                    <Image src={leftSrc} alt="" width={630} height={420} />
                  </div>
                  <div className="absolute right-[-30%] top-[100px]">
                    <Image src={rightSrc} alt="" width={630} height={420} />
                  </div>
                  <div className="h-[500px]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
