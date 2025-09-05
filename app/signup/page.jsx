"use client"
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import SignUp from '@/components/SignUp'

const SignUpPage = () => {
    const { isLoggedIn , isAuthenticated } = useContext(AppContent)
    const router = useRouter()

    useEffect(() => {
     isAuthenticated()
    }, [])

    useEffect(() => {
        if(isLoggedIn) {
            router.push('/')
            // console.log('logged in')
        }
    }, [isLoggedIn])
    
  return (
    <>
    <SignUp/>
    </>
  )
}

export default SignUpPage