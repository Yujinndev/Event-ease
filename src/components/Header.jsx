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

function Actions() {
  return (
    <>
      <Button variant="outline">Login</Button>
      <Button>Create Account</Button>
    </>
  )
}

function Header() {
  const [isOpen, setOpen] = useState(false)

  const handleToggleMenu = () => {
    setOpen(!isOpen)
  }

  return (
    <header className="flex md:justify-around md:items-center md:px-4">
      <div className="flex justify-between w-screen md:w-auto items-center py-3 md:p-0">
        <div className="brand text-xl font-bold">EventEase</div>
        <button className="md:hidden" onClick={() => handleToggleMenu()}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:flex gap-2">
        <Actions />
      </div>
      {isOpen && (
        <div className="mt-4 flex flex-col items-start absolute p-2 gap-4 top-[75%] w-full bg-slate-100 md:hidden">
          <NavLink onToggle={() => handleToggleMenu()} />
          <Actions />
        </div>
      )}
    </header>
  )
}

export default Header
