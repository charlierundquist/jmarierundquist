import { BookDetails } from '@/app/blocks/BookDetails/config'
import { BookShowcase } from '@/app/blocks/BookShowcase/config'
import { Carousel } from '@/app/blocks/Carousel/config'
import { ContactForm } from '@/app/blocks/ContactForm/config'
import { ExtrasDisplay } from '@/app/blocks/ExtrasDisplay/config'
import { ImageGrid } from '@/app/blocks/ImageGrid/config'
import { ListGrid } from '@/app/blocks/ListGrid/config'
import { LongContentOneColumn } from '@/app/blocks/LongContentOneColumn/config'
import { LongContentTwoColumn } from '@/app/blocks/LongContentTwoColumn/config'
import { PraiseDisplay } from '@/app/blocks/PraiseDisplay/config'
import { ShortContent } from '@/app/blocks/ShortContent/config'
import { HeroField } from '@/app/components/Hero/config'
import { linkField } from '@/app/fields/link'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

export const revalidateFunction: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  try {
    const docSlug = doc.slug
    const previousDocSlug = previousDoc.slug
    revalidateTag(`page_${docSlug}`)
    revalidateTag(`page_${previousDocSlug}`)
    console.log(`Revalidated services cache for: ${doc.title}`)
  } catch (error) {
    console.error('Error revalidating services cache:', error)
  }
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [revalidateFunction],
  },
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 1000,
  //     },
  //   },
  // },
  access: {
    read: ({ req }) => {
      if (req.user && req.user.collection === 'users') {
        return true
      }

      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      }
    },
  },
  folders: true,
  defaultSort: [
    'title',
    'slug',
    'updatedAt',
    'createdAt',
    '-size',
    '-backgroundImage',
    '-header',
    '-subheader',
    '-linkOneText',
    '-linkOneURL',
    '-linkTwoText',
    '-linkTwoURL',
    '-pageContent',
  ],
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [HeroField],
        },
        {
          label: 'Page Layout',
          fields: [
            {
              name: 'pageContent',
              type: 'blocks',
              blocks: [
                ShortContent,
                LongContentOneColumn,
                LongContentTwoColumn,
                BookShowcase,
                PraiseDisplay,
                Carousel,
                ExtrasDisplay,
                BookDetails,
                ListGrid,
                ContactForm,
                ImageGrid,
              ],
              label: false,
            },
          ],
        },
      ],
    },
  ],
}
