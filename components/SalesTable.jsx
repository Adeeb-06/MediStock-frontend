"use client"
import { AppContent } from '@/app/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import axios from 'axios'
import { Eye, Edit, Trash2, Package, DollarSign, Building2, AlertCircle } from "lucide-react"
import { toast } from 'sonner'
import Link from 'next/link'

const SalesTable = () => {
    const { salesData, getSales } = useContext(AppContent)
    const [sortBy, setSortBy] = React.useState("createdAt");
    const [sortOrder, setSortOrder] = React.useState("asc");
    const [searchTerm, setSearchTerm] = useState('')
    const [expired , setExpired] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await getSales()
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const handleDelete = async (stockId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/stock-delete`, { withCredentials: true ,data: { stockId } })
            toast.success("Stock deleted successfully!");
            await getAllStocks()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    console.log(salesData)
   

    const formateDate = (date) => {
        const dateObj = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return dateObj.toLocaleDateString("en-US", options);
    };

    const filteredSales = salesData?.filter(sale => {
        return sale.medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    })  || []
// const expiredCount = filteredStocks.reduce((count, stock) => {
//   const isExpired = new Date(stock.expiryDate) < new Date();
//   const hasStock = stock.quantity > 0;
//   return count + (isExpired && hasStock ? 1 : 0);
// }, 0);



// const totalValue = filteredStocks.reduce((total, stock) => {
//   return total + (Number(stock.totalPrice) || 0);
// }, 0);

    // console.log(expired)


    const sortedSales = [...filteredSales].sort((a, b) => {
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

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">stock Inventory</h1>
                    <p className="text-gray-400">Manage and view all stocks in your system</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Stock</p>
                                <p className="text-white font-semibold text-lg">{ sortedSales.length || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Value</p>
                                <p className="text-white font-semibold text-lg">${0}</p>
                            </div>
                        </div>
                    </div>
                   
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Expired Stocks</p>
                                <p className="text-white font-semibold text-lg">{0}</p>
                            </div>
                        </div>
                    </div>
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
                        <div className=" flex-2 flex gap-3">
                        <Link href={'/dashboard/stock/newStock'} >
                        <button className=' bg-blue-300 hover:bg-blue-500/10 py-3 px-4 rounded-2xl gap-1 duration-100 cursor-pointer mt-2 text-black hover:text-white     flex items-center justify-center ' >

                            <Plus className="w-4 h-4" />
                            Add Stock
                        </button>
                        </Link>
                        <Link href={'/dashboard/stock/sellStock'} >
                        <button className=' bg-green-300 hover:bg-green-500/10 py-3 px-4 rounded-2xl gap-1 duration-100 cursor-pointer mt-2 text-black hover:text-white     flex items-center justify-center ' >
                            <Plus className="w-4 h-4" />
                            Sell Stock
                        </button>
                        </Link>
                        </div>
                       
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Package className="w-4 h-4" />
                            <span>{filteredSales.length} Sales found</span>
                        </div>
                    </div>
                </div>
                {/* Table */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700/50">
                                    {/* <th className="text-left p-6 text-gray-300 font-semibold">stock Name</th> */}
                                     <th className="text-left p-6 text-gray-300 font-semibold">Stock-ID</th>
                                    <th className="text-left p-6 text-gray-300 font-semibold  cursor-pointer hover:text-white " >
                                        <div className="flex items-center gap-2" onClick={() => handleSort("createdAt")}>

                                            Sold At
                                            <div className="flex flex-col">
                                                <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 mb-0.5 ${sortBy === 'createdAt' && sortOrder === 'asc' ? 'border-b-blue-400' : ''}`}></div>
                                                <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${sortBy === 'createdAt' && sortOrder === 'desc' ? 'border-t-blue-400' : ''}`}></div>
                                            </div>
                                        </div> </th>
                                   
                                    <th className="text-left p-6 text-gray-300 font-semibold">Qty</th>
                                    <th className="text-left p-6 text-gray-300 font-semibold">Medicine</th>
                                    <th className="text-left p-6 text-gray-300 font-semibold">Price</th>
                                
                                    <th className="text-center p-6 text-gray-300 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedSales.map((sale, i) => (
                                    <tr key={i} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                                        <td className="p-6 text-white font-medium">{sale.stockId}</td>
                                        <td className="p-6 text-green-400 font-semibold">{formateDate(sale.createdAt)}</td>
                                        <td className="p-6 text-white">{sale.soldQuantity}</td>
                                        <td className="p-6 text-gray-300">{sale.medicine?.name?.toUpperCase()}</td>
                                        <td className="p-6 text-white">{sale.totalPrice}</td>

                                        <td className="p-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(sale._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SalesTable


