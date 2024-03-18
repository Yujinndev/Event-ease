import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function NavLink({ onToggle }) {
  return (
    <>
      <Button variant="link" asChild>
        <Link to="/" onClick={onToggle}>
          Home
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/events" onClick={onToggle}>
          Events
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link to="/finances" onClick={onToggle}>
          Finances
        </Link>
      </Button>
    </>
  )
}

function Header() {
  const [isOpen, setOpen] = useState(false)
  const [isAuth, setAuth] = useState(false)

  const handleToggleMenu = () => {
    setOpen(!isOpen)
  }

  const handleLogout = () => {
    setOpen(false)
    setAuth(false)
  }

  const handleLogin = () => {
    setAuth(true)
  }

  return (
    <header className="z-50 flex md:items-center md:justify-between md:px-4">
      <div className="flex w-screen items-center justify-between py-3 md:w-auto md:px-4">
        <div className="brand text-xl font-bold text-green-700 lg:text-3xl">
          SynchroFission
        </div>

        {isAuth === true && (
          <button className="md:hidden" onClick={() => handleToggleMenu()}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {!isOpen ? (
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
        )}

        {isAuth === false && (
          <Button
            className="mx-4 block px-6 md:hidden"
            onClick={() => handleLogin()}
          >
            Sign in
          </Button>
        )}
      </div>
      {isAuth && (
        <div className="hidden gap-2 md:flex">
          <NavLink onToggle={() => handleToggleMenu()} />
        </div>
      )}

      {isAuth === true ? (
        <Button
          variant="destructive"
          className="mx-4 hidden px-6 md:flex"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      ) : (
        <Button
          className="mx-4 hidden px-6 md:flex"
          onClick={() => handleLogin()}
        >
          Sign in
        </Button>
      )}
      {isOpen && (
        <div className="absolute top-[50%] mt-4 flex w-full flex-col items-start gap-4 bg-white p-1 py-4 md:hidden">
          <NavLink onToggle={() => handleToggleMenu()} />

          {isAuth === true && (
            <Button
              variant="destructive"
              className="mx-4 px-6"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
