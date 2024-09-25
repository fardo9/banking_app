'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from '../Footer'
import SidebarLinks from './SidebarLinks/SidebarLinks'

const Sidebar = ({ user }: SiderbarProps) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        <SidebarLinks />
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar
