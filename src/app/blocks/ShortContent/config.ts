import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const ShortContent: Block = {
  slug: 'short-content',
  interfaceName: 'ShortContent',
  labels: {
    singular: 'Short Content Block',
    plural: 'Short Content Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageLocation',
      label: 'Image Location',
      required: true,
      type: 'radio',
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
