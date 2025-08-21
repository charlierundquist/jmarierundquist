import { CMSImage } from '@/app/components/CMSImage'
import { ImageNoLink } from '@/payload-types'

export function ImageNoLinkBlock(block: ImageNoLink) {
  const image = block.imageSelect

  return <CMSImage resource={image}></CMSImage>
}
