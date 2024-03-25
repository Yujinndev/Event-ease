import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import Home from '@/pages/Home'
import Events from '@/pages/Events'
import Finances from '@/pages/Finances'
import SignIn from '@/pages/SignIn'

import ScrollToAnchor from '@/utils/ScrollToAnchor'
import ProtectedRoute from '@/utils/ProtectedRoute'
import AuthProvider from '@/utils/AuthProvider'

function App() {
  return (
    <Router>
      <>
        <ScrollToAnchor />

        <AuthProvider isSignedIn={false}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/events" element={<Events />} />
              <Route path="/finances" element={<Finances />} />
            </Route>
          </Routes>
        </AuthProvider>
      </>
    </Router>
  )
}

export default App
