import { ListGrid } from '@/payload-types'
import { RenderBlocks } from '..'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'

export function ListGridBlock(block: ListGrid) {
  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        {block.title && <h2 className="text-center">{block.title}</h2>}
        <hr className="mx-auto" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <RenderBlocks
            blocks={block.items}
            className="bg-lightgreen flex flex-col justify-center rounded-sm px-4 py-8 transition-transform duration-200 focus-within:-translate-y-0.5 hover:-translate-y-0.5 lg:last:odd:translate-x-1/2"
          ></RenderBlocks>
        </div>
      </>
    ),
    className: 'max-w-(--main-width)!',
  }

  return <BlockTemplate content={[contentCol]} />
}
