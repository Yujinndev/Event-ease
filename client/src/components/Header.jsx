import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '@/services/state/useAuthStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, NewspaperIcon, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { id: 1, name: 'Home', link: '/#home', protectedRoute: false },
  { id: 2, name: 'Features', link: '/#features', protectedRoute: false },
  { id: 3, name: 'About Us', link: '/#aboutUs', protectedRoute: false },
  { id: 4, name: 'Dashboard', link: '/dashboard', protectedRoute: true },
  { id: 5, name: 'Events', link: '/events', protectedRoute: true },
  { id: 6, name: 'Finances', link: '/finances', protectedRoute: true },
]

function NavLinks({ onToggle, isProtected }) {
  const location = useLocation()

  return (
    <>
      {links
        .filter((link) => link.protectedRoute === isProtected)
        .map((filtered) => (
          <Button
            key={filtered.id}
            size="sm"
            variant="ghost"
            className="relative ms-2 flex w-[96%] justify-start p-2 md:w-auto md:justify-center md:px-5"
            asChild
          >
            <Link to={filtered.link} onClick={onToggle}>
              {filtered.name}
              {location.pathname === filtered.link && (
                <div className="absolute inset-y-8 h-1 w-10 rounded-xl bg-green-700" />
              )}
            </Link>
          </Button>
        ))}
    </>
  )
}

function NavActions({ isProtected, onLogout, user }) {
  return (
    <>
      {isProtected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex w-44 items-center gap-2 px-4 text-[16px]"
            >
              <User size="18px" />
              {user?.name || "You're logged in!"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel className="text-gray-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                size="sm"
                variant="link"
                className="text-gray-500"
                asChild
              >
                <Link to="/" className="flex gap-2">
                  <NewspaperIcon size="18px" />
                  <p>Profile</p>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                size="sm"
                variant="link"
                className="text-gray-500"
                asChild
              >
                <Link to="/" className="flex gap-2">
                  <Edit size="18px" />
                  <p>Account Settings</p>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                size="sm"
                variant="destructive"
                className="mx-auto w-full px-6"
                onClick={onLogout}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" className="mx-3 px-6" asChild>
          <Link to="/signin">Sign in</Link>
        </Button>
      )}
    </>
  )
}

function Header() {
  const navigate = useNavigate()
  const setLogout = useAuthStore((state) => state.logout)
  const auth = useAuthStore.getState().auth
  const [isMenuOpen, setMenuOpen] = useState(false)
  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setLogout()
    navigate('/')
  }

  return (
    <header className="min-w-screen z-50 flex justify-between border-b-[1px] md:items-center md:px-4 lg:justify-around lg:px-0">
      <div className="flex w-screen items-center justify-between py-3 md:w-auto md:px-4 lg:justify-around">
        <div className="brand flex gap-2 text-xl font-bold text-green-700 lg:text-2xl">
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
          <Link to="/#home">Event Ease</Link>
        </div>
      </div>
      <div className="hidden gap-2 md:flex">
        <NavLinks
          onToggle={() => handleToggleMenu()}
          isProtected={auth ? true : false}
        />
      </div>

      <div className="flex items-center">
        <NavActions
          isProtected={auth ? true : false}
          onLogout={() => handleLogout()}
          user={auth}
        />
      </div>

      {isMenuOpen === true && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-x-0 inset-y-10 mt-4 flex h-44 w-full flex-col items-start gap-4 divide-red-600 bg-white p-1 py-4 md:hidden"
        >
          <NavLinks
            onToggle={() => handleToggleMenu()}
            isProtected={auth ? true : false}
          />
        </motion.div>
      )}
    </header>
  )
}

export default Header
