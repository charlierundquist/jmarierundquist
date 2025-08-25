'use client'
import { Header } from '@/payload-types'
import Link from 'next/link'
import { CMSLink } from '../CMSLink'
import { Menu, X } from '@deemlol/next-icons'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  data: Header
  children: React.ReactNode
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, children }) => {
  const pathName = usePathname()
  const [mobileMenuShowing, setMobileMenuShowing] = useState(false)

  const links = data.links

  useEffect(() => {
    setMobileMenuShowing(false)
  }, [pathName])

  return (
    <header className="bg-pink relative w-screen overflow-x-clip">
      <nav className="mx-auto flex h-16 max-w-(--main-width) justify-center px-8 lg:justify-between">
        <Link href="/home" className="">
          {children}
        </Link>
        <button
          onClick={() => {
            setMobileMenuShowing(!mobileMenuShowing)
          }}
          className={`${mobileMenuShowing ? 'fixed' : 'absolute'} top-4 right-8 z-50 lg:hidden`}
        >
          {mobileMenuShowing ? <X size={28}></X> : <Menu size={28}></Menu>}
        </button>
        <ul
          className={`bg-green fixed top-0 left-0 flex h-screen w-screen ${mobileMenuShowing ? 'translate-x-0' : 'translate-x-full'} z-40 flex-col items-center justify-around py-16 transition-transform duration-500 lg:relative lg:h-auto lg:w-fit lg:translate-x-0 lg:flex-row lg:gap-8 lg:bg-transparent lg:p-0`}
        >
          {links?.map((obj, i) => {
            const hasDropdown = obj.hasDropdown ? true : false
            const dropdownLinks = obj.dropdownLinks

            return (
              <li
                key={i}
                className={`group/dropdown relative translate-x-(--mobile-translate) transition-transform duration-500 lg:translate-x-0`}
                style={
                  {
                    '--mobile-translate': `${mobileMenuShowing ? '0' : i * 20 + 20 + 'rem'}`,
                    transitionDelay: `${i * 25 + 100}ms`,
                  } as React.CSSProperties
                }
                // add variables instead of magic numbering?
              >
                <CMSLink
                  {...obj.link}
                  className="inline-block text-center text-3xl lg:text-base"
                ></CMSLink>
                {hasDropdown && <span className="hidden lg:inline"> +</span>}
                {hasDropdown && (
                  <ul className="bg-green absolute -left-6 hidden w-max space-y-4 rounded-sm p-6 lg:group-focus-within/dropdown:block lg:group-hover/dropdown:block lg:group-focus/dropdown:block lg:group-focus-visible/dropdown:block">
                    {dropdownLinks?.map((obj2, i) => {
                      return (
                        <li key={i}>
                          <CMSLink {...obj2.link}></CMSLink>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
