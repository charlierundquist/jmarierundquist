import { ColumnContent } from '@/app/blocks/BlockTemplate'
import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { SiteDetail } from '@/payload-types'
import { RichText } from '../RichText'
import { DisplayLinks } from '../CMSLink/DisplayLinks'
import { CTABlockClient } from './Component.client'

export async function CTABlock() {
  const siteDetails: SiteDetail = await getCachedGlobal('site-details', 1)()

  const ctaBlock = siteDetails.ctaBlock

  if (!ctaBlock) return null

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2 className="text-center text-3xl!">{ctaBlock.ctaTitle}</h2>
        <hr className="mx-auto" />
        {ctaBlock.ctaSubtitle && (
          <RichText data={ctaBlock.ctaSubtitle} className="text-center text-balance" />
        )}
        {ctaBlock.ctaLinks && (
          <DisplayLinks links={ctaBlock.ctaLinks} className="justify-center"></DisplayLinks>
        )}
      </>
    ),
  }

  return <CTABlockClient columns={[contentCol]} />
}
