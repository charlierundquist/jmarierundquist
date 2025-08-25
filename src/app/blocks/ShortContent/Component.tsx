import { ShortContent } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'

export function ShortContentBlock(block: ShortContent) {
  const imagePos = block.imageLocation
  const hasImage = Boolean(block.image)

  const contentCol: ColumnContent = {
    content: (
      <>
        <h2 className={`${!hasImage && 'text-center'}`}>{block.title}</h2>
        <hr className={`${!hasImage && 'mx-auto'}`} />
        {block.content && <RichText data={block.content}></RichText>}
        {block.links && (
          <DisplayLinks
            links={block.links}
            className={`${!hasImage ? 'justify-center' : ''}`}
          ></DisplayLinks>
        )}
      </>
    ),
    type: 'text',
  }

  const imageCol: ColumnContent = {
    content: <></>,
    type: 'image',
    media: block.image,
  }

  if (!hasImage) return <BlockTemplate content={[contentCol]}></BlockTemplate>

  return (
    <BlockTemplate
      content={imagePos === 'left' ? [imageCol, contentCol] : [contentCol, imageCol]}
      shiftTopLineLarge={hasImage}
    ></BlockTemplate>
  )
}
