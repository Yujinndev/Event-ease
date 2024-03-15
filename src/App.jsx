import "./App.css"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import Home from "@/pages/Home"
import Events from "@/pages/Events"
import Finances from "@/pages/Finances"

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/finances" element={<Finances />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
