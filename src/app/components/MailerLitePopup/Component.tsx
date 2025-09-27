import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { SiteDetail } from '@/payload-types'
import { MailerLitePopupClient } from './Component.client'

export async function MailerLitePopup() {
  const siteDetails: SiteDetail = await getCachedGlobal('site-details', 1)()
  const mailerlitePopup = siteDetails.mailerlitePopup

  if (typeof mailerlitePopup.popupContent === 'undefined' || !mailerlitePopup.popupContent)
    return null

  return (
    <MailerLitePopupClient
      {...{
        display: mailerlitePopup.display,
        reappearDelay: mailerlitePopup.reappearDelay,
        popupContent: mailerlitePopup.popupContent,
        blockType: 'mailer-lite-subscribe',
      }}
    />
  )
}
