import { Field, GroupField } from 'payload'
import deepMerge from '../utilities/deepMerge'

type linkFieldType = (options?: {
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const linkField: linkFieldType = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            defaultValue: 'internal',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            options: [
              {
                label: 'Internal Page',
                value: 'internal',
              },
              {
                label: 'Custom URL',
                value: 'external',
              },
            ],
          },
          {
            name: 'newTab',
            label: 'Open in a new tab?',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
          },
          {
            name: 'internalLink',
            label: 'Page to link to',
            type: 'relationship',
            relationTo: 'pages',
            admin: {
              condition: (_, siblingData) => siblingData.type === 'internal',
            },
          },
          {
            name: 'externalLink',
            label: 'URL to link to',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData.type === 'external',
            },
          },
        ],
      },
    ],
  }

  if (!disableLabel) {
    linkResult.fields.push({
      name: 'linkText',
      type: 'text',
    })
  }

  return deepMerge(linkResult, overrides)
}
