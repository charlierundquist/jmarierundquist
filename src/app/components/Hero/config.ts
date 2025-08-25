import { linkField } from '@/app/fields/link'
import { Field } from 'payload'

export const HeroField: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'small',
      required: true,
      options: [
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'header',
      type: 'text',
      required: true,
    },
    {
      name: 'subheader',
      type: 'richText',
      admin: {
        condition: (data, siblingData) => {
          if (siblingData.size === 'large') return true

          return false
        },
      },
    },
    {
      name: 'links',
      type: 'array',
      fields: [linkField()],
      maxRows: 2,
      admin: {
        condition: (data, siblingData) => {
          if (siblingData.size === 'large') return true

          return false
        },
      },
    },
  ],
}
