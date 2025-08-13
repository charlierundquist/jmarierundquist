import { getCachedGlobal } from '@/app/utilities/getGlobals'
import { Header as HeaderType } from '@/payload-types'
import { HeaderClient } from './Component.client'
import { Logo } from '../Logo'

export async function Header() {
  const data: HeaderType = await getCachedGlobal('header', 1)()

  if (!data) return <div>header not found</div>

  return (
    <HeaderClient data={data}>
      <Logo loading="eager" priority="high" className="relative h-24! w-24!"></Logo>
    </HeaderClient>
  )
}
