import { Block } from 'payload'

export const ListGridItem: Block = {
  slug: 'list-grid-item',
  interfaceName: 'ListGridItem',
  labels: {
    singular: 'List Grid Item',
    plural: 'List Grid Items',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
