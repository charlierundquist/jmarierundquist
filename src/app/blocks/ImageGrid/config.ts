import { Block } from 'payload'
import { ImageLink } from './ImageLink/config'
import { ImageNoLink } from './ImageNoLink/config'

export const ImageGrid: Block = {
  slug: 'image-grid',
  interfaceName: 'ImageGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'richText',
    },
    {
      name: 'items',
      label: 'Images',
      type: 'blocks',
      blocks: [ImageLink, ImageNoLink],
    },
  ],
}
