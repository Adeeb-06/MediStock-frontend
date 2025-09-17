"use client"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppContent } from "../context/AppContext"
import SideBar from "@/components/SideBar"
import { toast } from "sonner"
import { Menu, X } from "lucide-react"

const Layout = ({ children }) => {
  const { isLoggedIn, isAuthenticated, isOpen, setIsOpen, isMobile, setIsMobile } = useContext(AppContent)
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
  {/* Main Content */}
<main className={` ${isOpen ? "ml-64" : "ml-0"} flex-1 duration-300 bg-gradient-to-br from-gray-50 to-gray-100 h-full relative`}>
  {/* Toggle Button (Top Right) */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`flex items-center justify-center fixed top-4 right-5 
      p-2 w-10 h-10 cursor-pointer rounded-xl 
      bg-gradient-to-br from-blue-600 to-purple-600 
      text-white shadow-lg hover:shadow-xl 
      transition-all duration-300 hover:scale-105 backdrop-blur-lg`}
    aria-label="Toggle Sidebar"
  >
    <div className="relative flex items-center justify-center w-5 h-5">
      <Menu
        className={`absolute transition-all duration-300 ${
          isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
        }`}
      />
      <X
        className={`absolute transition-all duration-300 ${
          isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      />
    </div>
  </button>

  {children}
</main>

    </div>
  )
}

export default Layout
