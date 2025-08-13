import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../styles.css'
import { RenderBlocks } from '@/app/blocks'
import { RenderHero } from '@/app/components/Hero/RenderHero'
import { RefreshRouteOnSave } from '../RefreshRouteOnSave'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let querySlug = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: Boolean(user),
  })

  let page = querySlug.docs[0]

  if (!page) {
    return <div>page not found</div>
  }

  return (
    <>
      {user && <RefreshRouteOnSave></RefreshRouteOnSave>}
      <RenderHero {...page.hero}></RenderHero>
      <RenderBlocks blocks={page.pageContent}></RenderBlocks>
    </>
  )
}
