import { LongContentOneColumn } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RichText } from '@/app/components/RichText'
import { CMSImage } from '@/app/components/CMSImage'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'

export function LongContentOneColumnBlock(block: LongContentOneColumn) {
  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        {block.image && (
          <CMSImage resource={block.image} pictureClassName="mx-auto max-w-md"></CMSImage>
        )}
        <h2 className={`text-center`}>{block.title}</h2>
        {block.subtitle && <p className="max-w-prose text-center">{block.subtitle}</p>}
        <hr className={`mx-auto`} />
        {block.content && <RichText data={block.content}></RichText>}
        {block.links && (
          <DisplayLinks links={block.links} className="justify-center"></DisplayLinks>
        )}
      </>
    ),
  }

  const hasImage = Boolean(block.image)

  return <BlockTemplate content={[contentCol]} shiftTopLineDownLarge={hasImage}></BlockTemplate>
}
