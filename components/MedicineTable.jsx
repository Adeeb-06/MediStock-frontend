"use client"
// import { AppContent } from '@/app/context/AppContent'
import React, { useContext, useEffect, useState } from 'react'
import { Search, Filter, Eye, Edit, Trash2, Package, DollarSign, Building2, Calendar, AlertCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import { AppContent } from '@/app/context/AppContext'



const MedicineTable = () => {
    const { medicinesData, getMedicines, companyById } = useContext(AppContent)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await getMedicines()
            setIsLoading(false)
        }
        fetchData()
    }, [])



    // Filter and sort medicines
    const filteredMedicines = medicinesData?.medicines?.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const sortedMedicines = [...filteredMedicines].sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]

        if (sortBy === 'company') {
            aValue = a.company?.name || ''
            bValue = b.company?.name || ''
        }

        if (typeof aValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const getStockStatus = (stockNumber) => {
        if (stockNumber === 0) return { status: 'Out of Stock', color: 'text-red-400 bg-red-500/10 border-red-500/20' }
        if (stockNumber < 10 && stockNumber > 5) return { status: 'Low Stock', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' }
        return { status: 'In Stock', color: 'text-green-400 bg-green-500/10 border-green-500/20' }
    }

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
                    <h1 className="text-3xl font-bold text-white mb-2">Medicine Inventory</h1>
                    <p className="text-gray-400">Manage and view all medicines in your system</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Medicines</p>
                                <p className="text-white font-semibold text-lg">{medicinesData?.medicines?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-400" />
                            </div>

                        </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Low Stock Items</p>
                                <p className="text-white font-semibold text-lg">
                                    {medicinesData?.medicines?.filter(m => m.stockNumber < 10 && m.stockNumber > 5).length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Out Of Stock</p>
                                <p className="text-white font-semibold text-lg">
                                    {medicinesData?.medicines?.filter(m => m.stockNumber < 1).length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search medicines or companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div className=" flex-2 flex gap-3">
                            <Link href={'/dashboard/medicines/create-medicine'} >
                                <button className=' bg-blue-300 hover:bg-blue-500/10 py-3 px-4 rounded-2xl gap-1 duration-100 cursor-pointer mt-2 text-black hover:text-white     flex items-center justify-center ' >

                                    <Plus className="w-4 h-4" />
                                    Add Medicines
                                </button>
                            </Link>

                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Package className="w-4 h-4" />
                            <span>{filteredMedicines.length} medicines found</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                    {sortedMedicines.length === 0 ? (
                        <div className="text-center py-16">
                            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No medicines found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700/50">
                                        <th
                                            className="text-left p-6 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors group"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Medicine Name
                                                <div className="flex flex-col">
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 mb-0.5 ${sortBy === 'name' && sortOrder === 'asc' ? 'border-b-blue-400' : ''}`}></div>
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${sortBy === 'name' && sortOrder === 'desc' ? 'border-t-blue-400' : ''}`}></div>
                                                </div>
                                            </div>
                                        </th>

                                        <th
                                            className="text-left p-6 text-gray-300 font-semibold cursor-pointer hover:text-white transition-colors"
                                            onClick={() => handleSort('stockNumber')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" />
                                                Stock
                                                <div className="flex flex-col">
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 mb-0.5 ${sortBy === 'stockNumber' && sortOrder === 'asc' ? 'border-b-blue-400' : ''}`}></div>
                                                    <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${sortBy === 'stockNumber' && sortOrder === 'desc' ? 'border-t-blue-400' : ''}`}></div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                Company
                                            </div>
                                        </th>
                                        <th className="text-left p-6 text-gray-300 font-semibold">Status</th>
                                        <th className="text-center p-6 text-gray-300 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedMedicines.map((medicine, index) => {
                                        const stockStatus = getStockStatus(medicine.stockNumber)
                                        return (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors group"
                                            >
                                                <td className="p-6">
                                                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {medicine.name}
                                                    </div>
                                                </td>

                                                <td className="p-6">
                                                    <div className="text-white font-medium">
                                                        {medicine.stockNumber}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="text-gray-300">
                                                        {medicine.company?.name || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${stockStatus.color}`}>
                                                        {stockStatus.status}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}

            </div>
        </div>
    )
}

export default MedicineTable