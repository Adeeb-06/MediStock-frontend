"use client"
import { AppContent } from '@/app/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeft, Copy, Plus, Search } from 'lucide-react'
import axios from 'axios'
import { Eye, Edit, Trash2, Package, DollarSign, Building2, AlertCircle } from "lucide-react"
import { toast } from 'sonner'
import Link from 'next/link'

const ExpiredStocks = () => {
    const { stocksData, getAllStocks } = useContext(AppContent)
    const [sortBy, setSortBy] = React.useState("createdAt");
    const [sortOrder, setSortOrder] = React.useState("asc");
    const [searchTerm, setSearchTerm] = useState('')
    const [expired, setExpired] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await getAllStocks()
            setIsLoading(false)
        }
        fetchData()
    }, [])


    console.log(stocksData)


    const formateDate = (date) => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return dateObj.toLocaleDateString("en-US", options);
    };

    const expiredStocks = stocksData?.filter(stock => {
        return stock.expiredAction === "pending" || stock.expiredAction === "returned" || stock.expiredAction === "disposed"
    }) || []

    const filteredStocks = expiredStocks.filter(stock => {
        return stock.medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || stock._id.toLowerCase().includes(searchTerm.toLowerCase()) || stock.expiredAction.toLowerCase().includes(searchTerm.toLowerCase())
    }) || [];


    const expiredCount = filteredStocks.reduce((count, stock) => {
        const isExpired = new Date(stock.expiryDate) < new Date();
        const hasStock = stock.quantity > 0;
        return count + (isExpired && hasStock ? 1 : 0);
    }, 0);





    const totalValue = filteredStocks.reduce((total, stock) => {
        return total + (Number(stock.totalPrice) || 0);
    }, 0);

    console.log(expired)


    const sortedStocks = [...filteredStocks].sort((a, b) => {
        let aValue = new Date(a[sortBy]);
        let bValue = new Date(b[sortBy]);

        if (sortOrder === "asc") {
            return aValue - bValue; // earlier dates first
        } else {
            return bValue - aValue; // later dates first
        }
    });


    const handleSort = (field) => {
        if (sortBy === field) {
            // flip asc <-> desc if same field clicked again
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // switch to new field and start with asc
            setSortBy(field);
            setSortOrder("asc");
        }
    };
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
                            <div className="h-12 bg-gray-700 rounded"></div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-gray-700 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div>
                    <Link href={'/dashboard/stock'} >
                        <button className="bg-blue-300 hover:bg-blue-500/10 py-3 px-4 rounded-2xl gap-1 duration-100 cursor-pointer mt-2 text-black hover:text-white     flex items-center justify-center " >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Expired Stocks</h1>
                    {/* <p className="text-gray-400">Manage and view all stocks in your system</p> */}
                </div>


                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search stocks or companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Package className="w-4 h-4" />
                            <span>{filteredStocks.length} Stocks found</span>
                        </div>
                    </div>
                </div>
                {/* Table */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        {sortedSales.length === 0 ? (
                            <div className="text-center py-16">
                                <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Expired Stock  found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        ) : (

                            <table className="w-full  table-auto min-w-[1000px]">
                                <thead>
                                    <tr className="border-b border-gray-700/50">
                                        {/* <th className="text-left p-6 text-gray-300 font-semibold">stock Name</th> */}
                                        <th className="text-left p-6 text-gray-300 font-semibold">ID</th>
                                        <th className="text-left p-6 text-gray-300 font-semibold  cursor-pointer hover:text-white " onClick={() => handleSort("createdAt")}>
                                            <div className="flex items-center gap-2">

                                                Created At
                                                <div className="flex flex-col">
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 mb-0.5 ${sortBy === 'createdAt' && sortOrder === 'asc' ? 'border-b-blue-400' : ''}`}></div>
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${sortBy === 'createdAt' && sortOrder === 'desc' ? 'border-t-blue-400' : ''}`}></div>
                                                </div>
                                            </div> </th>

                                        <th className="text-left p-6 text-gray-300 font-semibold">Qty(Created)</th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Qty(Curr)</th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Medicine</th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Expired Action</th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Expired Action Date</th>


                                        <th className="text-left p-6 text-gray-300 font-semibold cursor-pointer hover:text-white " onClick={() => handleSort("expiryDate")}>
                                            <div className="flex items-center gap-2">

                                                Expiry Date
                                                <div className="flex flex-col">
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 mb-0.5 ${sortBy === 'expiryDate' && sortOrder === 'asc' ? 'border-b-blue-400' : ''}`}></div>
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${sortBy === 'expiryDate' && sortOrder === 'desc' ? 'border-t-blue-400' : ''}`}></div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedStocks.map((stock, i) => {
                                        const isExpired = new Date(stock.expiryDate) < new Date()

                                        return (
                                            <tr
                                                key={i}
                                                className={`border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors }`}
                                            >
                                                <div className='flex items-center '>
                                                    <td className="p-6  text-white font-medium max-w-[150px] truncate">
                                                        {stock._id}
                                                    </td>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(stock._id).then(() => toast.success("Stock ID copied to clipboard"))}
                                                        className="text-gray-400 cursor-pointer hover:text-white transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        {/* You can use an icon instead of text */}
                                                        <Copy className="w-4 h-4" />
                                                    </button>

                                                </div>

                                                <td className="p-6 text-green-400 font-semibold">{formateDate(stock.createdAt)}</td>
                                                <td className="p-6 text-white">{stock.qtyCopy}</td>
                                                <td className="p-6 text-white">{stock.quantity}</td>
                                                <td className="p-6 text-gray-300 max-w-[200px] truncate">{stock.medicine?.name}</td>
                                                <td className="p-6 text-gray-300">{stock.expiredAction.toUpperCase()}</td>
                                                <td className="p-6 text-gray-300">{formateDate(stock.expiredActionDate)}</td>

                                                <td className={`p-6 ${isExpired ? "text-red-400 font-bold" : "text-white"}`}>
                                                    {formateDate(stock.expiryDate)}
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={`/dashboard/stock/expired-stocks/update/${stock._id}`}>

                                                            <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExpiredStocks


