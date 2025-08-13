import { Footer, Header, SiteDetail } from '@/payload-types'
import { CMSLink } from '../CMSLink'
import { SocialLink } from '../SocialLink'
import { RichText } from '../RichText'
import Link from 'next/link'
import { hasText } from '@payloadcms/richtext-lexical/shared'

interface FooterClientProps {
  quickLinks: Header['links'] | Footer['quickLinks']['customLinks']
  ctaLink: Footer['link']
  siteDetails: SiteDetail
  extraInfo: Footer['extraInfo']
  children: React.ReactNode
}

export const FooterClient: React.FC<FooterClientProps> = ({
  quickLinks,
  ctaLink,
  siteDetails,
  extraInfo,
  children,
}) => {
  const hasExtraInfo = hasText(extraInfo)

  return (
    <footer className="bg-pink">
      <div className="mx-auto flex max-w-(--main-width) flex-col justify-center gap-8 px-8 py-8 sm:flex-row">
        <div className="mx-auto grid w-fit basis-1/2 place-content-center gap-4">
          <Link href={'/'}>{children}</Link>
          <h2 className="text-center">{siteDetails.siteTitle}</h2>
          <RichText
            data={siteDetails.tagline}
            className="max-w-sm text-center text-balance"
          ></RichText>
          <CMSLink
            {...ctaLink}
            isButton={true}
            appearance="solidInverse"
            className="mx-auto"
          ></CMSLink>
        </div>
        <div className="mt-auto flex basis-1/2 justify-around">
          <ul className="mx-auto w-fit space-y-2 text-center sm:mx-0 sm:text-left">
            <li className="w-fit pb-2 font-serif text-xl">Quick Links</li>
            {quickLinks?.map((obj, i) => {
              return (
                <li key={i} className="block w-fit">
                  <CMSLink {...obj.link} className="block"></CMSLink>
                </li>
              )
            })}
          </ul>
          <ul className="mx-auto w-fit space-y-2 text-center sm:mx-0 sm:text-left">
            <li className="w-fit pb-2 font-serif text-xl">Social Media</li>
            {siteDetails.socialLinks?.map((obj, i) => {
              return (
                <li key={i} className="w-fit">
                  <SocialLink {...obj} className="block"></SocialLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="border-back mx-auto my-4 max-w-(--main-width) border-t-1"></div>
      <div className="mx-auto flex max-w-(--main-width) flex-wrap justify-between gap-8 px-8 pb-16">
        {hasExtraInfo && extraInfo && (
          <RichText
            data={extraInfo}
            className="mx-auto text-center sm:mx-0 sm:text-left"
          ></RichText>
        )}
        {/* <div className="mx-auto text-center sm:mx-0 sm:text-left">
          P.O. Box 18055
          <br />
          West Saint Paul, MN 55118
        </div> */}
        <div className={`mx-auto ${hasExtraInfo && 'mx-0!'} text-center sm:text-left`}>
          © Copyright {new Date().getFullYear()}{' '}
          <Link href={'https://dawnskywebdesign.com'} target="_blank">
            Dawn Sky Web Design
          </Link>
        </div>
      </div>
    </footer>
  )
}
