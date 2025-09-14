"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Calendar, Filter, ArrowRight } from 'lucide-react'
import { AppContent } from '@/app/context/AppContext'
import { TrendingUp, Package, DollarSign, Target, AlertCircle } from 'lucide-react'

const DashboardStats = ({ salesData, stocksData }) => {
    //   const [startDate, setStartDate] = useState('')
    //   const [endDate, setEndDate] = useState('')
    const { startDate, setStartDate, endDate, setEndDate } = useContext(AppContent)
    const [totalSales, setTotalSales] = useState(0)
    const [totalStocks, setTotalStocks] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    const [expiredStocks, setExpiredStocks] = useState([])

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                icon: 'text-blue-400',
                iconBg: 'bg-blue-500/10',
                line: 'bg-blue-500'
            },
            green: {
                icon: 'text-emerald-400',
                iconBg: 'bg-emerald-500/10',
                line: 'bg-emerald-500'
            },
            orange: {
                icon: 'text-orange-400',
                iconBg: 'bg-orange-500/10',
                line: 'bg-orange-500'
            },
            red: {
                icon: 'text-red-400',
                iconBg: 'bg-red-500/10',
                line: 'bg-red-500'
            }
        }
        return colors[color]
    }

    useEffect(() => {
        if (!salesData?.length || !stocksData?.length) return;

        setTotalSales(
            salesData.reduce((total, sale) => total + (sale.totalPrice || 0), 0)
        );
        setTotalStocks(
            stocksData.reduce((total, stock) => total + (Number(stock.quantity) || 0), 0)
        );
        setExpiredStocks(
            stocksData.filter(stock => new Date(stock.expiryDate) < new Date())
        );
        setTotalSpend(
            stocksData.reduce((total, stock) => total + (stock.totalPrice || 0), 0)
        );
    }, [salesData, stocksData]);


    const stats = [
        {
            title: 'Total Sales',
            value: ` $${totalSales}`,
            icon: TrendingUp,
            color: 'blue'
        },
        {
            title: 'In Stock',
            value: totalStocks,
            icon: Package,
            color: 'green'
        },
        {
            title: 'Total Spend',
            value: ` $${totalSpend}`,
            icon: DollarSign,
            color: 'orange'
        },
        {
            title: 'Expired Stocks',
            value: expiredStocks.length,
            icon: AlertCircle,
            color: 'red'
        },

    ]


    const handleApply = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // filter sales by date
        const filteredSales = salesData?.filter(
            sale => new Date(sale.createdAt) >= start && new Date(sale.createdAt) <= end
        ) || [];


        // filter stocks by date (if your stock has a "dateAdded" field)
        const filteredStocks = stocksData?.filter(
            stock => new Date(stock.createdAt) >= start && new Date(stock.createdAt) <= end
        ) || [];

        setTotalSales(
            filteredSales.reduce((total, sale) => total + (sale.totalPrice || 0), 0)
        );
        setTotalStocks(
            filteredStocks.reduce((total, stock) => total + (Number(stock.quantity) || 0), 0)
        );
        setTotalSpend(
            filteredStocks.reduce((total, stock) => total + (stock.totalPrice || 0), 0)
        );
    };



    return (
        <>
            {/* Modern Date Range Picker */}
            {/* Date + Stats merged into one beautiful background */}
            <div className="relative rounded-2xl p-6 mb-6 overflow-hidden border border-gray-800/50">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl opacity-60"></div>
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl"></div>

                {/* Content wrapper */}
                <div className="relative space-y-8">
                    {/* Date Range Filter */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        {/* Date Inputs */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full lg:w-auto">
                            {/* Start Date */}
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    Start Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 cursor-pointer"
                                        style={{ colorScheme: "dark" }}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden sm:flex items-center justify-center mb-3">
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>

                            {/* End Date */}
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    End Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 cursor-pointer"
                                        style={{ colorScheme: "dark" }}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex items-end">
                            <button
                                onClick={() => handleApply(startDate, endDate)}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                            >
                                <Filter className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                                Apply Filter
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards inside same background */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const colorClasses = getColorClasses(stat.color)
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-200 group relative overflow-hidden"
                                >
                                    {/* Colored side line */}
                                    <div
                                        className={`absolute left-0 top-0 w-1 h-full ${colorClasses.line} group-hover:w-2 transition-all duration-300`}
                                    ></div>

                                    {/* Content */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}
                                            >
                                                <stat.icon className={`w-6 h-6 ${colorClasses.icon}`} />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm font-medium">
                                                    {stat.title}
                                                </p>
                                                <p className="text-2xl font-bold text-white mt-1">
                                                    {stat.value}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashboardStats