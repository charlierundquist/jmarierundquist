import { Block } from 'payload'

export const ExtrasDisplay: Block = {
  slug: 'extras-display',
  interfaceName: 'ExtrasDisplay',
  labels: {
    singular: 'Extras Display Block',
    plural: 'Extras Display Blocks',
  },
  fields: [
    {
      name: 'bookSelect',
      label: 'Book to display extras',
      type: 'relationship',
      relationTo: 'books',
      required: true,
    },
  ],
}
