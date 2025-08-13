import { sanitizeLink } from '@/app/utilities/sanitizeLink'
import { Page } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

export type LinkType = {
  type?: 'internal' | 'external' | null | undefined
  newTab?: boolean | null
  internalLink?: (number | null) | Page
  externalLink?: string | null
  linkText?: string | null | undefined
  className?: string
  isButton?: boolean
  appearance?: 'solid' | 'outline' | 'solidInverse'
}

export function CMSLink(props: LinkType) {
  const { type, className } = props
  const internalPage = props?.internalLink || { slug: 'home' }
  const externalPage = props?.externalLink || '/'
  const linkText = props?.linkText
  const newTab = props.newTab || false

  let href = ''

  if (type === 'external') {
    href = sanitizeLink(externalPage)
  } else if (type === 'internal' && typeof internalPage === 'object') {
    const { slug } = internalPage
    href = '/' + slug
  } else {
    href = '/'
  }

  return (
    <Link
      href={href}
      target={newTab ? '_blank' : ''}
      rel="noopener noreferrer"
      className={`cmslink ${className ? className : ''} ${props.isButton ? 'w-fit rounded-full px-4 py-1 transition-transform duration-200 hover:-translate-y-0.5 focus:-translate-y-0.5 focus-visible:-translate-y-0.5' : 'hover:underline'} ${props.appearance === 'solid' ? 'bg-pink' : ''} ${props.appearance === 'outline' ? 'border-pink border-2' : ''} ${props.appearance === 'solidInverse' ? 'bg-green' : ''}`}
    >
      {typeof linkText === 'string' && linkText}
    </Link>
  )
}
