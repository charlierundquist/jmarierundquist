import { Block } from 'payload'

export const BookDetails: Block = {
  slug: 'book-details',
  interfaceName: 'BookDetails',
  labels: {
    singular: 'Book Details Block',
    plural: 'Book Details Blocks',
  },
  fields: [
    {
      name: 'bookSelect',
      label: 'Book to display details',
      type: 'relationship',
      relationTo: 'books',
      required: true,
    },
  ],
}
