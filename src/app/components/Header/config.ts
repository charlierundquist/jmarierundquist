import { linkField } from '@/app/fields/link'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        linkField(),
        {
          name: 'hasDropdown',
          label: 'Add a dropdown list on hover?',
          type: 'checkbox',
        },
        {
          name: 'dropdownLinks',
          label: 'Dropdown Links',
          type: 'array',
          fields: [linkField()],
          admin: {
            condition: (_, siblingData) => {
              if (siblingData.hasDropdown === true) {
                return true
              }
              return false
            },
          },
        },
      ],
      minRows: 1,
    },
  ],
}
