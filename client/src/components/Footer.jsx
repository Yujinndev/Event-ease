import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const links = [
  { id: 1, name: 'Home', link: '/#home' },
  { id: 2, name: 'Features', link: '/#features' },
  { id: 3, name: 'About Us', link: '/#aboutUs' },
]

function NavLinks() {
  return (
    <>
      <ul
        role="list"
        className="flex flex-wrap items-center justify-center gap-4 py-4 text-gray-600 dark:text-gray-400 sm:gap-8"
      >
        {links.map((item) => (
          <li role="listitem" key={item.id}>
            <Button key={item.id} size="sm" variant="link" asChild>
              <Link to={item.link}>{item.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-gray-100 py-12 dark:to-gray-900">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-6 xl:px-0">
        <Link
          to="/#home"
          className="flex items-center justify-center space-x-2"
        >
          <span className="brand text-2xl font-bold text-green-700 dark:text-white">
            Event Ease
          </span>
        </Link>
        <NavLinks />

        <div className="text-center">
          <span className="text-sm tracking-wide text-gray-500">
            Copyright © SynchroFission 2023 - Present | All rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
