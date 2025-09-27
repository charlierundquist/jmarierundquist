import { Field } from 'payload'

export const mailerliteSubscribeField: Field = {
  name: 'popupContent',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'richText',
    },
    {
      name: 'confirmationMessage',
      label: 'Confirmation Message',
      type: 'richText',
    },
  ],
}
