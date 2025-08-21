import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const ImageLink: Block = {
  slug: 'image-link',
  interfaceName: 'ImageLink',
  labels: {
    singular: 'Image w/ Link',
    plural: 'Images w/ Links',
  },
  fields: [
    {
      name: 'imageSelect',
      label: 'Select Image:',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'hasHoverInfo',
      label: 'Add extra information on hover?',
      type: 'checkbox',
    },
    {
      name: 'hoverInfo',
      label: 'Extra Information',
      type: 'group',
      admin: {
        condition: (_, siblingData) => {
          return Boolean(siblingData.hasHoverInfo)
        },
      },
      fields: [
        {
          name: 'hoverTitle',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'hoverContent',
          label: 'Content',
          type: 'richText',
        },
      ],
    },
    linkField({ disableLabel: true }),
  ],
}
