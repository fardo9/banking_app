import { sidebarLinks } from '@constants'
import { cn } from '@lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SidebarLinks = ({ isOpen }: { isOpen?: boolean }) => {
  const pathname = usePathname()
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          pathname === item.route || pathname.startsWith(`${item.route}/`)

        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
          >
            <div className="relative size-6 xl:size-5">
              <Image
                src={item.imgURL}
                alt={item.label}
                fill
                className={cn({
                  'brightness-[3] invert-0': isActive,
                })}
              />
            </div>
            <p
              className={cn('sidebar-label', {
                '!text-white': isActive,
                'label-visible': isOpen,
              })}
            >
              {item.label}
            </p>
          </Link>
        )
      })}
    </>
  )
}

export default SidebarLinks
