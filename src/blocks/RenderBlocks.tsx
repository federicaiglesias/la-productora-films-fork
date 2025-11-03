import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { EmptyBlock } from '@/blocks/Empty/Component'
import { FilmArchiveBlock } from '@/blocks/FilmArchiveBlock/Component'
import { CommercialArchiveBlock } from '@/blocks/CommercialArchiveBlock/Component'
import { ContactUsBlock } from '@/blocks/ContactUs/Component'
import { ExpertiseBlock } from './Expertise/Component'
import { ArtificialIntelligenceBlock } from './ArtificialIntelligence/Component'
import { DemosAiBlock } from '@/blocks/DemosAi/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  empty: EmptyBlock,
  filmArchive: FilmArchiveBlock,
  commercialArchive: CommercialArchiveBlock,
  contactUs: ContactUsBlock,
  expertise: ExpertiseBlock,
  artificialIntelligence: ArtificialIntelligenceBlock,
  DemosAi: DemosAiBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="mb-0 mt-4" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
