import { RichText } from '@/app/components/RichText'
import { ListGridItem } from '@/payload-types'

export function ListGridItemBlock(block: ListGridItem) {
  return (
    <>
      <h4 className="text-center">{block.title || '[title missing]'}</h4>
      {block.content && <RichText data={block.content} className="payload-richtext text-center" />}
    </>
  )
}
