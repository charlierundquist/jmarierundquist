import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import { unstable_cache } from 'next/cache'
import { Page } from '@/payload-types'

async function getPage(slug: string): Promise<PaginatedDocs<Page>> {
  const payload = await getPayload({ config: configPromise })

  const query = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return query
}

export const getPageCache = (slug: string) =>
  unstable_cache(async () => getPage(slug), [slug], {
    tags: [`page_${slug}`],
    revalidate: 3600 * 60 * 24,
  })
