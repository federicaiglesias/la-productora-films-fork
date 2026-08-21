import React from 'react'
import RichText from '@/components/RichText'

type MediaDoc = { url?: string } | number | null | undefined
type CTA = {
  label?: string
  file?: MediaDoc
  url?: string
  newTab?: boolean
  download?: boolean
  filename?: string
}
type Group = {
  title?: string
  body?: any // Lexical JSON
  ctas?: CTA[]
}
type Props = {
  top?: Group
  middle?: Group
  bottom?: Group
  blockType?: 'expertise'
}

const Fallback = {
  topTitle: (
    <>
      Cash Rebates.
      <br />
      Compelling financial advantages for
      <br />
      international productions.
    </>
  ),
  topText: (
    <>
      <p>
        Advertising projects benefit from a{' '}
        <strong>20% cash rebate on eligible production expenses</strong>, while{' '}
        <strong>films, series, and documentaries can receive up to 25% cash back</strong>.
        Additionally, services are exempt from VAT, making Uruguay not only creatively diverse but
        also financially strategic for your next shoot.
      </p>
    </>
  ),
  middleTitle: <>Uruguay, South America&apos;s hidden gem.</>,
  middleText: (
    <>
      <p>
        Safe, stable, and strategically located, it offers a variety of{' '}
        <strong>unique locations, reliable logistics, and cost-effective services</strong> — making
        it the perfect setting for your next production.
      </p>
      <p>
        Situated between Argentina and Brazil, Uruguay is a vibrant production hub combining
        political stability with diverse landscapes.{' '}
        <strong>
          International crews benefit from favorable exchange rates, competitive production costs,
          experienced local teams and access to the latest equipment options.
        </strong>
      </p>
    </>
  ),
  bottomTitle: <>Experienced. International. Built to adapt.</>,
  bottomText: (
    <>
      <p>
        We provide <strong>full production support for all types of media</strong> from commercials
        to features, digital content, and beyond. Our{' '}
        <strong>experienced, multi-lingual team</strong> has{' '}
        <strong>supported countless global production companies</strong>, blending international
        standards with unmatched regional expertise.
      </p>
      <p>
        We <strong>combine deep local knowledge with world-wide production protocols</strong> —
        caring about every detail – because we know that great production happens when everything
        runs smoothly and nothing feels forced.{' '}
        <strong>From prep to wrap, we focus on what matters most</strong> — creative collaboration,
        and ensuring your shoot is both efficient and unforgettable.
      </p>
    </>
  ),
  ctas: [
    {
      label: 'Advertising',
      url: '/pdf/advertising.pdf',
      download: true,
      filename: 'advertising.pdf',
    },
    {
      label: 'Entertainment',
      url: '/pdf/entertainment.pdf',
      download: true,
      filename: 'entertainment.pdf',
    },
  ] as CTA[],
}

function mediaToURL(m?: MediaDoc): string | undefined {
  if (!m || typeof m === 'number') return undefined
  return m.url
}

export const ExpertiseBlock: React.FC<Props> = ({ top, middle, bottom }) => {
  const topTitle = top?.title
  const topBody = top?.body
  const topCTAs = (top?.ctas && top.ctas.length > 0 ? top.ctas : Fallback.ctas) as CTA[]

  const middleTitle = middle?.title
  const middleBody = middle?.body

  const bottomTitle = bottom?.title
  const bottomBody = bottom?.body

  return (
    <div className="bg-black text-white py-8 lg:py-16 px-8 lg:px-20 font-avenir">
      <div className="max-w-full mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px] mb-8 lg:mb-16">
          <div>
            <div className="border-t border-white w-full mb-8" />
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              {topTitle ?? Fallback.topTitle}
            </div>
          </div>

          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8" />
            <div className="mb-6 lg:mb-8">
              {topBody ? (
                <RichText data={topBody} enableGutter={false}/>
              ) : (
                <div className="prose prose-invert max-w-none">{Fallback.topText}</div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:mb-20 mx-12 lg:mx-0">
                {topCTAs.map((c, i) => {
                  const fileURL = mediaToURL(c.file)
                  const href = fileURL || c.url || '#'
                  const extra =
                    c.download && (c.filename || fileURL) ? { download: c.filename || true } : {}
                  const target = c.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
                  return (
                    <a key={i} href={href} {...extra} {...target}>
                      <button className="border border-white rounded-full px-4 lg:px-6 py-2 text-[16px] lg:text-[18px] font-[600] leading-normal hover:bg-white hover:text-black transition-colors max-w-[350px] mx-auto w-full">
                        {c.label || 'Download'}
                      </button>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px] mb-8 lg:mb-16">
          <div>
            <div className="border-t border-white w-full mb-8" />
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              {middleTitle ?? Fallback.middleTitle}
            </div>
          </div>

          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8" />
            <div className="lg:mb-20">
              {middleBody ? (
                <RichText data={middleBody} enableGutter={false} />
              ) : (
                <div className="prose prose-invert max-w-none space-y-4">{Fallback.middleText}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[465px_1fr] gap-8 lg:gap-[120px]">
          <div>
            <div className="border-t border-white w-full mb-8" />
            <div className="text-[20px] lg:text-[24px] font-[600] mb-2 lg:mb-8 leading-[26px] lg:leading-[30px]">
              {bottomTitle ?? Fallback.bottomTitle}
            </div>
          </div>

          <div>
            <div className="border-t border-white w-full mb-6 lg:mb-8" />
            <div className="lg:mb-20">
              {bottomBody ? (
                <RichText data={bottomBody} enableGutter={false} />
              ) : (
                <div className="prose prose-invert max-w-none space-y-4">{Fallback.bottomText}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpertiseBlock;
