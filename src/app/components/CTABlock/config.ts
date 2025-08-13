import { linkField } from '@/app/fields/link'
import { Field } from 'payload'

export const ctaBlockField: Field = {
  name: 'ctaBlock',
  label: 'Call To Action Block',
  type: 'group',
  fields: [
    {
      name: 'ctaTitle',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'ctaSubtitle',
      label: 'Subtitle',
      type: 'richText',
    },
    {
      name: 'ctaLinks',
      label: 'Links',
      type: 'array',
      fields: [linkField()],
      maxRows: 2,
    },
  ],
}
