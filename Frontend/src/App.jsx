import './App.css'
import { Route, Routes } from "react-router-dom"

import Login from './compontents/login'
import Signup from './compontents/signup'
import HomePage from './compontents/home'
import NewTrip from './compontents/newTrip'
import MyTrip from './compontents/my-trip'
import TravelGuidance from './compontents/travelguidance'
import Contact from './compontents/contact'

import ProtectedRoute from "./compontents/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/newTrips"
        element={
          <ProtectedRoute>
            <NewTrip />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-trips"
        element={
          <ProtectedRoute>
            <MyTrip />
          </ProtectedRoute>
        }
      />

      <Route
        path="/travelguidance"
        element={
          <ProtectedRoute>
            <TravelGuidance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
