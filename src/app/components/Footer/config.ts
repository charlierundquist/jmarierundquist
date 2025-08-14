import { linkField } from '@/app/fields/link'
import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('global_footer')
      },
    ],
  },
  fields: [
    {
      name: 'quickLinks',
      label: 'Quick Links',
      type: 'group',
      fields: [
        {
          name: 'matchHeader',
          label: 'Match header links? (recommended)',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'customLinks',
          label: 'Choose custom links',
          type: 'array',
          fields: [linkField()],
          minRows: 1,
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.matchHeader ? false : true
            },
          },
        },
      ],
    },
    linkField({
      overrides: {
        label: 'Call To Action Link',
      },
    }),
    {
      name: 'extraInfo',
      label: 'Extra Info',
      type: 'richText',
    },
  ],
}
