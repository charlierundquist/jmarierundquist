import { Block } from 'payload'
import { ListGridItem } from './ListGridItem/config'

export const ListGrid: Block = {
  slug: 'list-grid',
  interfaceName: 'ListGrid',
  labels: {
    singular: 'List Grid Block',
    plural: 'List Grid Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'items',
      type: 'blocks',
      blocks: [ListGridItem],
    },
  ],
}
