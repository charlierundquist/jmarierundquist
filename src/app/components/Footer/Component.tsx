import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { Header as HeaderType, SiteDetail } from '@/payload-types'
import { Footer as FooterType } from '@/payload-types'
import { FooterClient } from './Component.client'
import { Logo } from '../Logo'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const siteDetails: SiteDetail = await getCachedGlobal('site-details', 1)()
  let headerData: HeaderType
  let quickLinks: HeaderType['links'] | FooterType['quickLinks']['customLinks']

  if (footerData.quickLinks.matchHeader) {
    headerData = await getCachedGlobal('header', 1)()
    quickLinks = headerData['links']
  } else {
    quickLinks = footerData.quickLinks.customLinks
  }

  return (
    <FooterClient
      quickLinks={quickLinks}
      ctaLink={footerData.link}
      siteDetails={siteDetails}
      extraInfo={footerData.extraInfo}
    >
      <Logo loading="eager" priority="high" className="relative mx-auto h-28! w-28!"></Logo>
    </FooterClient>
  )
}
