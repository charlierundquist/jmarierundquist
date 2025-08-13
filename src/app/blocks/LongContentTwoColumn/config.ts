import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const LongContentTwoColumn: Block = {
  slug: 'long-content-two-column',
  interfaceName: 'LongContentTwoColumn',
  labels: {
    singular: 'Long Content Block(Two Columns)',
    plural: 'Long Content Blocks(Two Columns)',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageLocation',
      label: 'Image location',
      type: 'radio',
      required: true,
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
