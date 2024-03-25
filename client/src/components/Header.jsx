import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { id: 1, name: 'Home', link: '/#home', protectedRoute: false },
  { id: 2, name: 'Features', link: '/#features', protectedRoute: false },
  { id: 3, name: 'About Us', link: '/#aboutUs', protectedRoute: false },
  { id: 4, name: 'Dashboard', link: '/dashboard', protectedRoute: true },
  { id: 5, name: 'Events', link: '/events', protectedRoute: true },
  { id: 6, name: 'Finances', link: '/finances', protectedRoute: true },
]

function NavLinks({ onToggle, isProtected }) {
  return (
    <>
      {links
        .filter((link) => link.protectedRoute === isProtected)
        .map((filtered) => (
          <Button key={filtered.id} size="sm" variant="link" asChild>
            <Link to={filtered.link} onClick={onToggle}>
              {filtered.name}
            </Link>
          </Button>
        ))}
    </>
  )
}

function NavActions({ isProtected }) {
  return (
    <>
      {isProtected ? (
        <div className="flex items-center gap-2">
          <p>Hello</p>
          <Button size="sm" variant="destructive" className="mx-3 px-6">
            Logout
          </Button>
        </div>
      ) : (
        <Button size="sm" className="mx-3 px-6" asChild>
          <Link to="/signin">Sign in</Link>
        </Button>
      )}
    </>
  )
}

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isLoggedin, setLoggedin] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <header className="min-w-screen z-50 flex justify-between border-b-[1px] md:items-center md:px-4 lg:justify-around lg:px-0">
      <div className="flex w-screen items-center justify-between py-3 md:w-auto md:px-4 lg:justify-around">
        <div className="brand text-xl font-bold text-green-700 lg:text-2xl">
          Event Ease
        </div>

        <button className="md:hidden" onClick={() => handleToggleMenu()}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {!isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            )}
          </svg>
        </button>
      </div>
      <div className="hidden gap-2 md:flex">
        <NavLinks
          onToggle={() => handleToggleMenu()}
          isProtected={isLoggedin ? true : false}
        />
      </div>

      <div className="hidden gap-2 md:flex">
        <NavActions isProtected={isLoggedin ? true : false} />
      </div>

      {isMenuOpen === true && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-x-0 inset-y-10 mt-4 flex h-52 w-full flex-col items-start gap-4 divide-red-600 bg-white p-1 py-4 md:hidden"
        >
          <NavLinks
            onToggle={() => handleToggleMenu()}
            isProtected={isLoggedin ? true : false}
          />
          <NavActions isProtected={isLoggedin ? true : false} />
        </motion.div>
      )}
    </header>
  )
}

export default Header
