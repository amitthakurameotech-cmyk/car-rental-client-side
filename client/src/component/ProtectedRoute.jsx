import React from 'react'
import { Navigate } from 'react-router-dom'

// usage: <ProtectedRoute roles={["admin"]}><AdminPage/></ProtectedRoute>
export default function ProtectedRoute({ children, roles }) {
  // The app stores auth data in localStorage as separate keys: `id`, `token`, `role`, `fullName`, `email`.
  // Older code expected a serialized `user` object which isn't used by the login flow. Read the same
  // keys Navbar and login use so role checks and presence checks are consistent.
  let user = null
  try {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const fullName = localStorage.getItem('fullName')

    if (id && token) {
      user = { id, token, role, fullName }
    }
  } catch (e) {
    // ignore parsing errors; fallback to redirect
    user = null
  }

  // Not logged in -> redirect to login (root)
  if (!user) return <Navigate to="/" replace />

  // If roles are required and the logged-in user's role doesn't match -> redirect to home
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}
