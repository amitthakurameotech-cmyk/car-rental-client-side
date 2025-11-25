import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('admin:sidebar-collapsed')
    if (saved) setCollapsed(saved === 'true')
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') document.documentElement.classList.add('dark')
  }, [])

  function toggleSidebar() {
    setCollapsed((s) => {
      const next = !s
      localStorage.setItem('admin:sidebar-collapsed', String(next))
      return next
    })
  }

  const sidebarWidth = collapsed ? 64 : 256

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <AdminSidebar collapsed={collapsed} />
      <div style={{ marginLeft: sidebarWidth }} className="transition-all">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        <main style={{ paddingTop: 64 }} className="p-6">{children}</main>
      </div>
    </div>
  )
}
