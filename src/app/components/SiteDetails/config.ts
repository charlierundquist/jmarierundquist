import { platformSelect } from '@/app/fields/platformSelect'
import { GlobalConfig } from 'payload'
import { ctaBlockField } from '../CTABlock/config'
import { revalidateTag } from 'next/cache'
import { mailerliteSubscribeField } from '@/app/components/MailerLitePopup/mailerliteSubscribe'

export const SiteDetails: GlobalConfig = {
  slug: 'site-details',
  hooks: {
    afterChange: [
      () => {
        revalidateTag('global_site-details')
      },
    ],
  },
  label: 'Site Details',
  fields: [
    {
      name: 'logoImage',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'richText',
      required: true,
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        platformSelect,
        {
          name: 'profileLink',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
    ctaBlockField,
    {
      name: 'mailerlitePopup',
      type: 'group',
      fields: [
        {
          name: 'display',
          type: 'radio',
          required: true,
          defaultValue: 'none',
          options: [
            {
              label: 'Corner',
              value: 'corner',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Do not display',
              value: 'none',
            },
          ],
        },
        {
          name: 'reappearDelay',
          label: 'Reappear Delay (minutes)',
          type: 'number',
          admin: {
            step: 1,
            style: {
              width: '20rem',
            },
          },
        },
        mailerliteSubscribeField,
      ],
    },
  ],
}
