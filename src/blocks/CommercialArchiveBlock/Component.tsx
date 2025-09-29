import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type {
  CommercialArchiveBlock as CommercialArchiveBlockProps,
  Commercial,
} from '@/payload-types'
import { CommercialCollectionArchive } from '@/components/CommercialCollectionArchive'

export const CommercialArchiveBlock = async ({
  id,
  selectedCommercials,
}: CommercialArchiveBlockProps) => {
  const payload = await getPayload({ config: configPromise })

  const commercialIDs = Array.isArray(selectedCommercials)
    ? selectedCommercials
        .map((entry) => {
          if (typeof entry?.commercial === 'object') return entry.commercial.id
          if (typeof entry?.commercial === 'number') return entry.commercial
          return null
        })
        .filter(Boolean)
    : []

  let commercials: Commercial[] = []

  if (commercialIDs.length > 0) {
    const response = await payload.find({
      collection: 'commercials',
      where: {
        id: {
          in: commercialIDs,
        },
      },
      depth: 1,
      limit: commercialIDs.length,
    })

    // preserve the manual order
    const commercialMap = new Map(response.docs.map((commercial) => [commercial.id, commercial]))
    commercials = commercialIDs
      .filter((id): id is number => id !== null)
      .map((id) => commercialMap.get(id)!)
      .filter(Boolean) as Commercial[]
  }

  return (
    <div className="lg:pt-1 pt-[10px]" id={`block-${id}`}>
      {/*{introContent && (*/}
      {/*  <div className="container mb-16">*/}
      {/*    <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <CommercialCollectionArchive commercials={commercials} />
    </div>
  )
}
