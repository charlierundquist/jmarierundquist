import { ImageGrid } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RenderBlocks } from '..'
import { RichText } from '@/app/components/RichText'

export function ImageGridBlock(block: ImageGrid) {
  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        {block.title && <h2 className="text-center">{block.title}</h2>}
        {block.subtitle && <RichText className="text-center" data={block.subtitle} />}
        <hr className="mx-auto" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <RenderBlocks blocks={block.items} className="max-w-xs"></RenderBlocks>
        </div>
      </>
    ),
    className: 'max-w-(--main-width)!',
  }

  return <BlockTemplate content={[contentCol]} />
}
