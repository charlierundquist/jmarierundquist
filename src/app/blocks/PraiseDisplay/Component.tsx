import { RichText } from '@/app/components/RichText'
import { PraiseDisplay } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { CMSLink, LinkType } from '@/app/components/CMSLink'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'
import { Quote } from '@/app/components/Quote'

export function PraiseDisplayBlock(block: PraiseDisplay) {
  const book = block.bookSelect
  if (typeof book != 'object' || !book) {
    return null
  }

  const directSaleLink = book.links?.directSalePage
  const retailersLink = book.links?.retailersPage

  let links: { link: LinkType }[] = []

  if (typeof directSaleLink != 'undefined' && directSaleLink.linkText) {
    links.push({ link: directSaleLink })
  }
  if (typeof retailersLink != 'undefined' && retailersLink.linkText) {
    links.push({ link: retailersLink })
  }

  let praise = book.praise

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2 className="text-center">
          Praise for <span className="italic">{book.title}</span>
        </h2>
        <hr className="mx-auto" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {praise?.map((review, i) => {
            return (
              <Quote
                review={review}
                key={i}
                className={'bg-lightgreen rounded-sm px-4 py-8 lg:last:odd:translate-x-1/2'}
              ></Quote>
            )
          })}
        </div>
        <DisplayLinks links={links} className="justify-center"></DisplayLinks>
      </>
    ),
    className: 'max-w-(--main-width)!',
  }

  return <BlockTemplate content={[contentCol]} />
}
