"use client"
import LogIn from '@/components/LogIn'
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext'
import { useRouter } from 'next/navigation'

const LogInPage = () => {
    const { isLoggedIn , isAuthenticated } = useContext(AppContent)
    const router = useRouter()

    useEffect(() => {
     isAuthenticated()
    }, [])

    useEffect(() => {
        if(isLoggedIn) {
            router.push('/')
            console.log('logged in')
        }
    }, [isLoggedIn])
    
  return (
    <>
    <LogIn/>
    </>
  )
}

export default LogInPage