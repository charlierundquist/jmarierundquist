'use client'
import { BlockTemplate, ColumnContent } from '@/app/blocks/BlockTemplate'

type CTAProps = {
  columns: ColumnContent[]
}

export const CTABlockClient: React.FC<CTAProps> = (props: { columns: ColumnContent[] }) => {
  return <BlockTemplate content={props.columns} className="mb-16"></BlockTemplate>
}
