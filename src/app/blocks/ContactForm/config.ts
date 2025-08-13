import { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contact-form',
  interfaceName: 'ContactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'hasLeadingContent',
      label: 'Add Accompanying Text?',
      type: 'checkbox',
    },
    {
      type: 'group',
      label: 'Accompanying Text',
      admin: {
        condition: (_, siblingData) => {
          return Boolean(siblingData.hasLeadingContent)
        },
      },
      fields: [
        {
          name: 'leadingTitle',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'leadingContent',
          label: 'Content',
          type: 'richText',
        },
      ],
    },
    {
      name: 'formSelect',
      type: 'relationship',
      relationTo: 'forms',
    },
  ],
}
