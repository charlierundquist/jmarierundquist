import { Block } from 'payload'
import { BookShowcase } from '../BookShowcase/config'
import { ShortContent } from '../ShortContent/config'
import { PraiseDisplay } from '../PraiseDisplay/config'

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'Carousel',
  labels: {
    singular: 'Carousel Block',
    plural: 'Carousel Blocks',
  },
  fields: [
    {
      name: 'blocks',
      label: false,
      type: 'blocks',
      blocks: [BookShowcase, ShortContent, PraiseDisplay],
      minRows: 1,
      required: true,
    },
    {
      name: 'autoscroll',
      label: 'Autoscroll?',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
    {
      name: 'autoscrollSpeed',
      label: 'Autoscroll Speed',
      type: 'number',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.autoscroll) return true
          return false
        },
        step: 0.5,
      },
      defaultValue: 5,
    },
  ],
}
