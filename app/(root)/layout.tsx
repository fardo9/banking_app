import MobileNav from '@components/Sidebar/MobileNav/MobileNav'
import Sidebar from '@components/Sidebar/Sidebar'
import { getLoggedInUser } from '@lib/actions/user.action'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (!loggedIn) redirect('/sign-in')
  // if (!loggedIn || !loggedIn.user) {
  //   console.log('Redirecting to sign-in page');
  //   redirect('/sign-in');
  // }

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
