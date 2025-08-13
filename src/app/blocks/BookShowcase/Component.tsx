import { BookShowcase } from '@/payload-types'
import { BlockTemplate, ColumnContent } from '../BlockTemplate'
import { RichText } from '@/app/components/RichText'
import { DisplayLinks } from '@/app/components/CMSLink/DisplayLinks'
import { CMSImage } from '@/app/components/CMSImage'
import { Quote } from '@/app/components/Quote'
import { LinkType } from '@/app/components/CMSLink'
import { BookAlert } from '@/app/components/BookAlert'

export function BookShowcaseBlock(block: BookShowcase) {
  const imagePos = block.imageLocation
  const book = block.bookSelect
  if (typeof book === 'number' || !book) return null
  if (typeof book.coverImage === 'number') return <div>cover image not found</div>

  const aboutLink = book.links?.aboutPage
  const directSaleLink = book.links?.directSalePage
  const retailersLink = book.links?.retailersPage

  let links: { link: LinkType }[] = []

  if (typeof directSaleLink != 'undefined' && directSaleLink.linkText) {
    links.push({ link: directSaleLink })
  } else if (typeof retailersLink != 'undefined' && retailersLink.linkText) {
    links.push({ link: retailersLink })
  }
  if (typeof aboutLink != 'undefined' && aboutLink.linkText) {
    links.push({ link: aboutLink })
  }

  const displayDescription = block.toggleDescription === 'description'

  const hasAlert = book.hasAlert ? true : false
  const alertText = book.alertText || ''

  const contentCol: ColumnContent = {
    content: (
      <>
        <div className="grid gap-2">
          <h2 className="text-center lg:text-left">{book.title}</h2>
          {book.tagline && (
            <RichText
              data={book.tagline}
              className="text-center text-balance lg:text-left"
            ></RichText>
          )}
        </div>
        <hr className="mx-auto lg:mx-0" />
        {!displayDescription &&
          book.praise &&
          book.praise.map((review, i) => {
            if (i > 1) return null
            return <Quote review={review} key={i} />
          })}
        {displayDescription && book.description && (
          <RichText data={book.description} className="line-clamp-10"></RichText>
        )}
        <DisplayLinks links={links} className="justify-center lg:justify-start"></DisplayLinks>
      </>
    ),
    type: 'text',
  }

  const hasImage = Boolean(book.coverImage)

  const imageCol: ColumnContent = {
    content: <></>,
    type: 'image',
    media: book.coverImage,
  }

  return (
    <BlockTemplate
      content={imagePos === 'left' ? [imageCol, contentCol] : [contentCol, imageCol]}
      hasAlert={hasAlert}
      alertText={alertText}
      imagePos={imagePos || 'left'}
      shiftTopLineLarge={hasImage}
    ></BlockTemplate>
  )
}
