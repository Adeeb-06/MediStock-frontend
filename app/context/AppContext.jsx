"use client"
import axios from "axios";
import { createContext, useState } from "react";


export const AppContent = createContext();


export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [companiesData, setCompaniesData] = useState([])
    const [medicinesData, setMedicinesData] = useState([])
    const [stocksData, setStocksData] = useState([])

    const isAuthenticated = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/isAuthenticated`, { withCredentials: true })
            // const data = await res.json()
            // console.log(res)
            if (res.status === 200) {
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getCompanies = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/all-companies`, { withCredentials: true })
            if (res.status === 200) {
                setCompaniesData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getMedicines = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/medicines`, { withCredentials: true })
            if (res.status === 200) {
                setMedicinesData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const companyById = async (companyId) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/company-by-id`, companyId , { withCredentials: true })
            return res.data.name
        } catch (error) {
            console.log(error)
        }
    } 

    const getAllStocks = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/stock-all`, { withCredentials: true })
            if (res.status === 200) {
                setStocksData(res.data.stocks)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isAuthenticated,
        getCompanies,
        companiesData,
        getMedicines,
        medicinesData,
        companyById,
        getAllStocks,
        stocksData
    }

    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}