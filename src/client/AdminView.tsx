import React, { useState } from 'react'
import { AdminLoginScreen } from './AdminLogin'
import { AllUsersTable } from './AllUsersTable'

export const AdminView: React.FC = () => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false)

  const handleLogin = () => {
    setAdminLoggedIn(true)
  }

  return (
    <div>
      {
      !isAdminLoggedIn ?
      <AdminLoginScreen onLogin={handleLogin} /> :
      <AllUsersTable />
      }
    </div>
  )
}

export default AdminView
