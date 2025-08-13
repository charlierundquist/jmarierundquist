import { platformSelect } from '@/app/fields/platformSelect'
import { GlobalConfig } from 'payload'
import { ctaBlockField } from '../CTABlock/config'

export const SiteDetails: GlobalConfig = {
  slug: 'site-details',
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
  ],
}
