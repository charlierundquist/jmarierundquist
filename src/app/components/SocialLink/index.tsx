import { sanitizeLink } from '@/app/utilities/sanitizeLink'
import Link from 'next/link'

interface SLinkProps {
  platform: string
  profileLink: string
  className?: string
}

export function SocialLink({ platform, profileLink: link, className }: SLinkProps) {
  return (
    <Link
      href={sanitizeLink(link)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:underline`}
    >
      {platform[0].toUpperCase() + platform.slice(1)}
    </Link>
  )
}
