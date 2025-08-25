import { BookDetails } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'
import { RichText } from '@/app/components/RichText'
import { LinkType } from '@/app/components/CMSLink'

export function BookDetailsBlock(block: BookDetails) {
  if (typeof block.bookSelect === 'number' || !block.bookSelect) return null
  if (typeof block.bookSelect.coverImage === 'number' || !block.bookSelect.coverImage) {
    return <div>cover image not found</div>
  }
  const book = block.bookSelect
  const directSaleLink = book.links?.directSalePage
  const retailersLink = book.links?.retailersPage
  const links: { link: LinkType }[] = []
  if (typeof directSaleLink != 'undefined' && directSaleLink.linkText) {
    links.push({ link: directSaleLink })
  }
  if (typeof retailersLink != 'undefined' && retailersLink.linkText) {
    links.push({ link: retailersLink })
  }

  const imageCol: ColumnContent = {
    type: 'image',
    content: <></>,
    className: 'lg:mt-8! lg:sticky lg:top-8 lg:self-start flex flex-col gap-8',
    media: book.coverImage,
  }

  const contentCol: ColumnContent = {
    type: 'text',
    content: (
      <>
        <h2 className="text-center lg:text-left">{book.title}</h2>
        {book.tagline && (
          <RichText className="text-center lg:text-left" data={book.tagline}></RichText>
        )}
        <hr className="mx-auto lg:mx-0" />
        {book.description && <RichText data={book.description}></RichText>}
        <DisplayLinks links={links} className="justify-center lg:justify-start"></DisplayLinks>
      </>
    ),
  }

  const hasImage = Boolean(book.coverImage)

  return <BlockTemplate content={[imageCol, contentCol]} shiftTopLineSmall={hasImage} />
}
