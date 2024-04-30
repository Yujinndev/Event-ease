import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import Home from '@/pages/Home'
import SignIn from '@/pages/SignIn'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Events from '@/pages/event/Events'
import EventDetail from './pages/event/EventDetail'
import Finances from '@/pages/Finances'
import NewEvent from '@/pages/event/NewEvent'
import CalendarView from '@/pages/event/CalendarView'

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
            <Route path="/" element={<Outlet />}>
              <Route path="events" element={<Events />} />
              <Route path="events/detail/:id" element={<EventDetail />} />
              <Route path="events/new" element={<NewEvent />} />
              <Route path="events/v/calendar" element={<CalendarView />} />
            </Route>

            <Route path="/finances" element={<Finances />} />
          </Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
