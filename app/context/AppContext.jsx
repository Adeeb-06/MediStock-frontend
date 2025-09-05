"use client"
import axios from "axios";
import { createContext, useState } from "react";


export const AppContent = createContext();


export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/isAuthenticated`, { withCredentials: true })
            // const data = await res.json()
            console.log(res)
            if (res.status === 200) {
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isAuthenticated
    }

    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}