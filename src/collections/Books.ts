import { linkField } from '@/app/fields/link'
import { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'richText',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'hasAlert',
      label: 'Display an alert?',
      type: 'checkbox',
    },
    {
      name: 'alertText',
      label: 'Alert Text (e.g. "Out Now!" or "Realeases Oct. 17th")',
      type: 'text',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.hasAlert === true) {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'praise',
      type: 'array',
      fields: [
        {
          name: 'reviewerName',
          label: 'Reviewer Name',
          type: 'text',
          required: true,
        },
        {
          name: 'reviewerTitle',
          label: "Reviewer's Title",
          type: 'richText',
        },
        linkField({
          overrides: {
            name: 'reviewerWebsite',
            label: "Reviewer's Website",
          },
          disableLabel: true,
        }),
        {
          name: 'review',
          label: 'Review',
          type: 'richText',
        },
      ],
    },
    {
      name: 'extras',
      type: 'array',
      fields: [
        linkField(),
        {
          name: 'extraDescription',
          label: 'Description text (optional)',
          type: 'text',
        },
      ],
    },
    {
      name: 'links',
      label: 'Call To Action links',
      type: 'group',
      admin: {
        description: 'Links to direct users to purchase or learn more.',
      },
      fields: [
        linkField({
          overrides: {
            name: 'aboutPage',
            label: 'About Page',
            admin: {
              hideGutter: false,
            },
          },
        }),
        linkField({
          overrides: {
            name: 'directSalePage',
            label: 'Direct Sale Page',
            admin: {
              hideGutter: false,
            },
          },
        }),
        linkField({
          overrides: {
            name: 'retailersPage',
            label: 'Retailers Page',
            admin: {
              hideGutter: false,
            },
          },
        }),
      ],
    },
  ],
}
