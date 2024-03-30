import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Events from '@/pages/Events'
import Finances from '@/pages/Finances'

import ScrollToAnchor from '@/utils/ScrollToAnchor'
import ProtectedRoute from '@/utils/ProtectedRoute'

function App() {
  return (
    <Router>
      <>
        <ScrollToAnchor />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/finances" element={<Finances />} />
          </Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
