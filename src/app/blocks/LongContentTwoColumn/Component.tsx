import { LongContentTwoColumn } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RichText } from '@/app/components/RichText'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'

export function LongContentTwoColumnBlock(block: LongContentTwoColumn) {
  const imagePos = block.imageLocation

  const imageCol: ColumnContent = {
    type: 'image',
    content: <></>,
    media: block.image,
    className: 'lg:mt-8! lg:sticky lg:top-8 lg:self-start flex flex-col gap-8',
  }

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2 className="text-center lg:text-left">{block.title}</h2>
        {block.subtitle && <p className="text-center lg:text-left">{block.subtitle}</p>}
        <hr className="mx-auto lg:mx-0" />
        {block.content && <RichText data={block.content}></RichText>}
        {block.links && (
          <DisplayLinks
            links={block.links}
            className="justify-center lg:justify-start"
          ></DisplayLinks>
        )}
      </>
    ),
  }

  const hasImage = Boolean(block.image)

  return (
    <BlockTemplate
      content={imagePos === 'left' ? [imageCol, contentCol] : [contentCol, imageCol]}
      shiftTopLineLarge={hasImage}
    ></BlockTemplate>
  )
}
