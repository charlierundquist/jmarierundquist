import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const LongContentOneColumn: Block = {
  slug: 'long-content-one-column',
  interfaceName: 'LongContentOneColumn',
  labels: {
    singular: 'Long Content Block(One Column)',
    plural: 'Long Content Blocks(One Column)',
  },
  fields: [
    {
      name: 'displayImage',
      label: 'Display an image?',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => {
          return siblingData.displayImage
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle(optional)',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'links',
      type: 'array',
      fields: [linkField()],
      maxRows: 2,
    },
  ],
}
