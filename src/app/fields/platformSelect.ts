import { Field } from 'payload'

export const platformSelect: Field = {
  name: 'platform',
  type: 'select',
  options: [
    {
      label: 'Facebook',
      value: 'facebook',
    },
    {
      label: 'Bluesky',
      value: 'bluesky',
    },
    {
      label: 'Instagram',
      value: 'instagram',
    },
    {
      label: 'Threads',
      value: 'threads',
    },
    {
      label: 'BookBub',
      value: 'bookbub',
    },
  ],
  required: true,
}
