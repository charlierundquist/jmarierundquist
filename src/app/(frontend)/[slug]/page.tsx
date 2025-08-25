import React from 'react'
import type { Page } from '@/payload-types'

import '../styles.css'
import { RenderBlocks } from '@/app/blocks'
import { RenderHero } from '@/app/components/Hero/RenderHero'
import { getPageCache } from '@/app/utilities/getPage'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  const queryPage = await getPageCache(slug)()

  const page = queryPage.docs[0]

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
