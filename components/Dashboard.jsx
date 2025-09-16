import React, { useContext, useEffect, useState } from 'react'

import DashboardStats from './DashboardStats'
import { AppContent } from '@/app/context/AppContext'
import Chart from './Chart'
import DashboardActionButtons from './DashboardActionButtons'
import { Menu, X } from 'lucide-react'

const Dashboard = () => {
    const { salesData, stocksData, getSales, getAllStocks, isOpen, setIsOpen, isMobile } = useContext(AppContent)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await getSales()
            await getAllStocks()
            setLoading(false)
        }
        fetchData()
    }, [])
    // console.log(salesData)


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Loading Dashboard...</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 shadow-xl animate-pulse"
                        >
                            <div className="w-12 h-12 mb-4 rounded-xl bg-gray-700" />
                            <div className="h-4 w-24 mb-2 bg-gray-700 rounded" />
                            <div className="h-6 w-16 bg-gray-600 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">

            {/* Welcome Heading */}
            <div className="flex items-center gap-5 mb-5">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-center p-2 w-10 h-10 cursor-pointer rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-lg ${isOpen && !isMobile ? "left-72" : "left-4"
                        } lg:${isOpen ? "left-72" : "left-4"}`}
                    aria-label="Toggle Sidebar"
                >
                    <div className="relative flex items-center justify-center w-5 h-5">
                        <Menu
                            className={`absolute transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                }`}
                        />
                        <X
                            className={`absolute transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                }`}
                        />
                    </div>
                </button>

                <div className="texts flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                        Welcome Back, Admin!
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        Here’s a summary of your inventory and sales
                    </p>
                </div>
            </div>

            <hr className='mb-4 border-gray-700/50' />

            <div className='grid grid-row-1 sm:grid-row-2 lg:grid-row-4 gap-6'>

                <DashboardStats salesData={salesData} stocksData={stocksData} />
                <DashboardActionButtons />
                <Chart />
            </div>

            {/* Stats Cards */}
        </div>
    )
}

export default Dashboard
