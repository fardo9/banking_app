import { useRouter } from 'next/navigation'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter()
  return <div>Footer</div>
}

export default Footer
