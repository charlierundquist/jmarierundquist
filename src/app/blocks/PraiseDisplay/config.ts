import { Block } from 'payload'

export const PraiseDisplay: Block = {
  slug: 'praise-display',
  interfaceName: 'PraiseDisplay',
  labels: {
    singular: 'Praise Display Block',
    plural: 'Praise Display Blocks',
  },
  fields: [
    {
      name: 'bookSelect',
      label: 'Book to showcase praise',
      type: 'relationship',
      relationTo: 'books',
      required: true,
    },
  ],
}
