import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { SiteDetail } from '@/payload-types'
import { MailerLitePopupClient } from './Component.client'

export async function MailerLitePopup() {
  const siteDetails: SiteDetail = await getCachedGlobal('site-details', 1)()
  const mailerlitePopup = siteDetails.mailerlitePopup
  const popupContent = mailerlitePopup.popupContent

  if (typeof popupContent != 'undefined' && popupContent) {
    return (
      <MailerLitePopupClient
        {...{
          display: mailerlitePopup.display,
          reappearDelay: mailerlitePopup.reappearDelay,
          popupContent: popupContent,
          blockType: 'mailer-lite-subscribe',
        }}
      />
    )
  }
}
