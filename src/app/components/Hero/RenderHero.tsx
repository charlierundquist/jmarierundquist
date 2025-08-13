import type { Page } from '@/payload-types'
import React from 'react'
import { HeroLarge } from './HeroLarge'
import { HeroSmall } from './HeroSmall'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { size } = props

  if (!size) return null

  if (size === 'large') {
    return <HeroLarge {...props}></HeroLarge>
  }

  if (size === 'small') {
    return <HeroSmall {...props}></HeroSmall>
  }
}
