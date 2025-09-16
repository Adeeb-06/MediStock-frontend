"use client"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppContent } from "../context/AppContext"
import SideBar from "@/components/SideBar"
import { toast } from "sonner"

const Layout = ({ children }) => {
  const { isLoggedIn, isAuthenticated } = useContext(AppContent)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      await isAuthenticated()
      setLoading(false)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login")
      toast.error("Please log in to access the dashboard")
    }
  }, [loading, isLoggedIn, router])

  // Skeleton loader for auth check
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-green-400 rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-300 text-lg">Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      {/* <aside className="fixed left-0 top-0 w-64 h-full bg-gray-900 border-r border-gray-800 shadow-xl z-10"> */}
        <SideBar />
      {/* </aside> */}

      {/* Main Content */}
      <main className=" flex-1 duration-200 bg-gradient-to-br from-gray-50 to-gray-100 h-full  ">
        {children}
      </main>
    </div>
  )
}

export default Layout
