import { Page } from '@/payload-types'
import { CMSLink } from '../CMSLink'
import { RichText } from '../RichText'

type Review = {
  reviewerName: string
  reviewerTitle?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  reviewerWebsite?: {
    type?: ('internal' | 'external' | 'media') | null
    newTab?: boolean | null
    internalLink?: (number | null) | Page
    externalLink?: string | null
    linkText?: string | null
  }
  review?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  id?: string | null
}

export function Quote(props: { review: Review; className?: string }) {
  const review = props.review
  const className = props.className

  return (
    <div className={`${className} flex flex-col justify-center`}>
      {review.review && <RichText data={review.review} className="mb-2 italic" />}
      {review.reviewerWebsite && (
        <CMSLink
          {...review.reviewerWebsite}
          linkText={'—' + review.reviewerName}
          className="ml-auto block w-fit font-bold"
        ></CMSLink>
      )}
      {review.reviewerTitle && (
        <RichText data={review.reviewerTitle} className="text-right text-sm" />
      )}
    </div>
  )
}
