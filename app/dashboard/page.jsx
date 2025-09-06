"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const DashboardPage = () => {
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
      router.push('/login')
      toast.error('Please log in to access the dashboard')
    }
  }, [loading, isLoggedIn, router])

  if (loading) {
    return <div className="text-center py-10">Checking authentication...</div>
  }

  return (
    <div>✅ Welcome to Dashboard</div>
  )
}

export default DashboardPage
