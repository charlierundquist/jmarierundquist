import { ImageGrid, ListGrid, Page } from '@/payload-types'
import { Carousel } from '@/payload-types'
import { ShortContentBlock } from './ShortContent/Component'
import { LongContentOneColumnBlock } from './LongContentOneColumn/Component'
import { LongContentTwoColumnBlock } from './LongContentTwoColumn/Component'
import { BookShowcaseBlock } from './BookShowcase/Component'
import { PraiseDisplayBlock } from './PraiseDisplay/Component'
import { CarouselBlock } from './Carousel/Component'
import { ExtrasDisplayBlock } from './ExtrasDisplay/Component'
import { BookDetailsBlock } from './BookDetails/Component'
import { ListGridBlock } from './ListGrid/Component'
import { ListGridItemBlock } from './ListGrid/ListGridItem/Component'
import { ContactFormBlock } from './ContactForm/Component'
import { ImageGridBlock } from './ImageGrid/Component'
import { ImageLinkBlock } from './ImageGrid/ImageLink/Component'
import { ImageNoLinkBlock } from './ImageGrid/ImageNoLink/Component'

const blockComponents = {
  'short-content': ShortContentBlock,
  'long-content-one-column': LongContentOneColumnBlock,
  'long-content-two-column': LongContentTwoColumnBlock,
  'book-showcase': BookShowcaseBlock,
  'praise-display': PraiseDisplayBlock,
  carousel: CarouselBlock,
  'extras-display': ExtrasDisplayBlock,
  'book-details': BookDetailsBlock,
  'list-grid': ListGridBlock,
  'list-grid-item': ListGridItemBlock,
  'contact-form': ContactFormBlock,
  'image-grid': ImageGridBlock,
  'image-link': ImageLinkBlock,
  'image-no-link': ImageNoLinkBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['pageContent'] | Carousel['blocks'] | ListGrid['items'] | ImageGrid['items']
  className?: string
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} className={props.className || ''}>
                  {/* @ts-expect-error Block types not automatically generated */}
                  <Block {...block}></Block>
                </div>
              )
            }

            return null
          }
        })}
      </>
    )
  }

  return null
}
