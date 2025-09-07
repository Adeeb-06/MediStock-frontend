import SideBar from '@/components/SideBar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Fixed Sidebar - 256px width (w-64) */}
      <div className="sidebar fixed left-0 top-0 w-64 h-full bg-gray-900 z-10">
        <SideBar />
      </div>
      
      {/* Main Content Area */}
      <div className="main ml-64 flex-1 bg-gray-50 h-full overflow-y-auto">
        <div className="p-">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout