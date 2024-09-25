'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../Footer'
import SidebarLinks from '../SidebarLinks/SidebarLinks'
import { useEffect, useRef, useState } from 'react'

const MobileNav = ({ user }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const toggleMenu = () => setIsOpen(!isOpen)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <section className="w-fulll max-w-[320px]">
      <Image
        src={!isOpen ? '/icons/hamburger.svg' : '/icons/plus.svg'}
        width={30}
        height={30}
        alt="menu"
        className="cursor-pointer"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div
          className="border-none bg-white left-0 top-0 absolute p-4"
          ref={menuRef}
        >
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <nav className="flex h-full flex-col gap-6 text-white pt-8">
              <SidebarLinks isOpen={isOpen} />
              USER
            </nav>

            <Footer user={user} type="mobile" />
          </div>
        </div>
      )}
    </section>
  )
}

export default MobileNav
