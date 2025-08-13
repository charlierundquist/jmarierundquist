import { Block } from 'payload'

export const BookShowcase: Block = {
  slug: 'book-showcase',
  interfaceName: 'BookShowcase',
  labels: {
    singular: 'Book Showcase Block',
    plural: 'Book Showcase Blocks',
  },
  fields: [
    {
      name: 'bookSelect',
      label: 'Book to showcase',
      type: 'relationship',
      relationTo: 'books',
      required: true,
    },
    {
      name: 'imageLocation',
      label: 'Image location',
      type: 'radio',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'toggleDescription',
      label: 'Information to display',
      type: 'radio',
      options: [
        {
          label: 'Praise',
          value: 'praise',
        },
        {
          label: 'Description (truncated)',
          value: 'description',
        },
      ],
      defaultValue: 'praise',
    },
  ],
}
