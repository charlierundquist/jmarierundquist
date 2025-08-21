import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import type { Page } from '@/payload-types'

import config from '@/payload.config'
import '../styles.css'
import { RenderBlocks } from '@/app/blocks'
import { RenderHero } from '@/app/components/Hero/RenderHero'
import { RefreshRouteOnSave } from '../RefreshRouteOnSave'
import { unstable_cache } from 'next/cache'
import { getPageCache } from '@/app/utilities/getPage'
import { blurHashToDataURL } from '@/app/utilities/blurURLGenerator'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const queryPage = await getPageCache(slug)()

  let page = queryPage.docs[0]

  if (!page) {
    return <div>page not found</div>
  }

  return (
    <>
      <RenderHero {...page.hero}></RenderHero>
      <RenderBlocks blocks={page.pageContent}></RenderBlocks>
    </>
  )
}
