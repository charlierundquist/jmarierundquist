import { linkField } from '@/app/fields/link'
import { Block } from 'payload'

export const ImageNoLink: Block = {
  slug: 'image-no-link',
  interfaceName: 'ImageNoLink',
  labels: {
    singular: 'Image w/o Link',
    plural: 'Images w/o Links',
  },
  fields: [
    {
      name: 'imageSelect',
      label: 'Select Image:',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
}
