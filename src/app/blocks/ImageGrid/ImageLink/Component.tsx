import { CMSImage } from '@/app/components/CMSImage'
import { CMSLink } from '@/app/components/CMSLink'
import { RichText } from '@/app/components/RichText'
import { sanitizeLink } from '@/app/utilities/sanitizeLink'
import { ImageLink } from '@/payload-types'
import { Plus } from '@deemlol/next-icons'
import Link from 'next/link'

export function ImageLinkBlock(block: ImageLink) {
  const image = block.imageSelect
  const link = block.link
  if (typeof link !== 'object') {
    return null
  }
  const internalPage = link.internalLink || { slug: 'home' }
  const externalPage = link.externalLink || '/'
  const newTab = link.newTab || false
  const type = link.type || 'external'

  let href = ''

  if (type === 'external') {
    href = sanitizeLink(externalPage || '')
  } else if (type === 'internal' && typeof internalPage === 'object') {
    const { slug } = internalPage
    href = '/' + slug
  } else {
    href = '/'
  }

  const hasHover = Boolean(block.hasHoverInfo)
  const hoverTitle = block.hoverInfo?.hoverTitle
  const hoverContent = block.hoverInfo?.hoverContent

  if (hasHover) {
    return (
      <>
        <div className="group relative" tabIndex={0}>
          <CMSImage resource={image}></CMSImage>
          <Plus className="bg-lightgreen absolute right-4 bottom-4 size-8 rounded-full p-1 drop-shadow-lg"></Plus>
          <div className="bg-lightgreen-transparent invisible absolute top-0 left-0 grid h-full w-full grid-cols-1 content-center gap-4 p-8 opacity-0 backdrop-blur-sm transition-all transition-discrete duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
            {hoverTitle && <h2>{hoverTitle}</h2>}
            {hoverContent && <RichText data={hoverContent} />}
            <CMSLink {...link} linkText={'Learn More'} appearance="solid" isButton></CMSLink>
          </div>
        </div>
      </>
    )
  }

  return (
    <Link
      href={href}
      target={Boolean(newTab) ? '_blank' : ''}
      className="block transition-transform duration-200 focus-within:-translate-y-0.5 hover:-translate-y-0.5 focus:-translate-y-0.5 focus-visible:-translate-y-0.5"
    >
      <CMSImage resource={image}></CMSImage>
    </Link>
  )
}
