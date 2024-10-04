'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../Footer'
import SidebarLinks from '../SidebarLinks/SidebarLinks'
import { useState } from 'react'

const MobileNav = ({ user }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
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
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                <SidebarLinks isOpen={isOpen} />
                USER
              </nav>
            </SheetClose>

            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
