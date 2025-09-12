"use client"
import React, { useContext } from 'react'
import { Pill, Package, TrendingUp, Home, LogOut } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { AppContent } from '@/app/context/AppContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SideBar = () => {
const {setIsLoggedIn} = useContext(AppContent)
const router = useRouter()
    const menuGroups = [
        {
            id: 'medicines',
            title: 'Medicines',
            icon: Pill,
            items: [
                { name: 'Create Medicine', href: '/dashboard/medicines/create-medicine' },
                { name: 'Show All Medicines', href: '/dashboard/medicines' }
            ]
        },
        {
            id: 'company',
            title: 'Company',
            icon: Pill,
            items: [
                { name: 'Create company', href: '/dashboard/companies/create' },
                { name: 'Show All Companies', href: '/dashboard/companies' }
            ]
        },
        {
            id: 'stock',
            title: 'Stock',
            icon: Package,
            items: [
                { name: 'Show Stocks', href: '/dashboard/stock' }
            ]
        },
        {
            id: 'sales',
            title: 'Sales',
            icon: TrendingUp,
            items: [
                { name: 'Show Sales', href: '/dashboard/sales' }
            ]
        }
    ]

    const logout = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`, {}, { withCredentials: true })
            if (response.status === 200) {
                setIsLoggedIn(false)
                toast.success('Logged out successfully')
                router.push('/login')
               console.log('Logged out successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col relative">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MediStock
                </h1>
                <p className="text-gray-400 text-sm mt-1">Pharmacy Management</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-4">
                {/* Dashboard */}
                <div className="px-4 mb-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 mb-1 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 group"
                    >
                        <Home className="w-5 h-5 mr-3 group-hover:text-blue-400 transition-colors" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                </div>

                {/* Menu Groups */}
                {menuGroups.map((group) => (
                    <div key={group.id} className="mb-4">
                        {/* Group Divider with Title */}
                        <div className="px-4 mb-3">
                            <div className="flex items-center">
                                <div className="flex-1 h-px bg-gray-800"></div>
                                <div className="flex items-center px-3">
                                    <group.icon className="w-4 h-4 mr-2 text-gray-500" />
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {group.title}
                                    </span>
                                </div>
                                <div className="flex-1 h-px bg-gray-800"></div>
                            </div>
                        </div>

                        {/* Group Items */}
                        <div className="px-4 space-y-1">
                            {group.items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 group"
                                >
                                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></div>
                                    <span className="text-[14px] font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer with User Info */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            JD
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">John Doe</p>
                            <p className="text-xs text-gray-400">Administrator</p>
                        </div>
                    </div>
                    <button onClick={()=> logout()} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar