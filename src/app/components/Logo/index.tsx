import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { SiteDetail } from '@/payload-types'
import { CMSImage } from '../CMSImage'

interface LogoProps {
  className?: string
  loading?: 'eager' | 'lazy'
  priority?: 'auto' | 'high' | 'low'
}

export async function Logo(props: LogoProps) {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  const details: SiteDetail = await getCachedGlobal('site-details', 1)()

  if (typeof details.logoImage === 'object') {
    return <CMSImage resource={details.logoImage} priority pictureClassName={className}></CMSImage>
  }
}
