import { CMSLink, LinkType } from '@/app/components/CMSLink'
import { ExtrasDisplay } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'

export function ExtrasDisplayBlock(block: ExtrasDisplay) {
  const book = block.bookSelect
  if (typeof book === 'number' || !book) return null

  const directSaleLink = book.links?.directSalePage
  const retailersLink = book.links?.retailersPage

  let links: { link: LinkType }[] = []

  if (typeof directSaleLink != 'undefined' && directSaleLink.linkText) {
    links.push({ link: directSaleLink })
  }
  if (typeof retailersLink != 'undefined' && retailersLink.linkText) {
    links.push({ link: retailersLink })
  }

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2 className="text-center">Extras</h2>
        <hr className="mx-auto" />
        <ul className="space-y-6">
          {book.extras?.map((obj, i) => {
            return (
              <li key={i}>
                <CMSLink
                  {...obj.link}
                  className="underline hover:no-underline! focus:no-underline! focus-visible:no-underline! active:no-underline!"
                ></CMSLink>
                {obj.extraDescription && (
                  <span className="text-balance">
                    : <br />
                    {obj.extraDescription}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        <DisplayLinks links={links} className="justify-center"></DisplayLinks>
      </>
    ),
  }

  return <BlockTemplate content={[contentCol]}></BlockTemplate>
}
