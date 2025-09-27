import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { SiteDetail } from '@/payload-types'
import { MailerLitePopupClient } from './Component.client'

export async function MailerLitePopup() {
  const siteDetails: SiteDetail = await getCachedGlobal('site-details', 1)()
  const mailerlitePopup = siteDetails.mailerlitePopup

  if (!mailerlitePopup) return null

  const popupContent = mailerlitePopup.popupContent

  if (typeof popupContent != 'undefined' && popupContent) {
    const { title, subtitle, confirmationMessage } = popupContent

    if (
      !title ||
      typeof title === 'undefined' ||
      !subtitle ||
      typeof subtitle === 'undefined' ||
      !confirmationMessage ||
      typeof confirmationMessage === 'undefined'
    ) {
      return null
    }

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
