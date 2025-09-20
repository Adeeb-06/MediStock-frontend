"use client"
import React, { useContext, useState, useEffect } from 'react'
import { Pill, Package, TrendingUp, Home, LogOut, Building2, X, Menu, ChevronRight, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { AppContent } from '@/app/context/AppContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SideBar = () => {
    const { setIsLoggedIn, user , isOpen, setIsOpen, isMobile, setIsMobile } = useContext(AppContent)
    // const [isOpen, setIsOpen] = useState(false) // Start closed on mobile
    // const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024
            setIsMobile(mobile)
            if (!mobile) {
                setIsOpen(true) // Auto-open on desktop
            } else {
                setIsOpen(false) // Keep closed on mobile
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && isOpen && !event.target.closest('.sidebar')) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobile, isOpen])

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

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Medicines', href: '/dashboard/medicines', icon: Pill },
        { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
        { name: 'Stocks', href: '/dashboard/stock', icon: Package },
        { name: 'Sales', href: '/dashboard/sales', icon: TrendingUp },
        { name: 'Sales Report', href: '/dashboard/report', icon: BarChart3 },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300" />
            )}

            {/* Toggle Button */}
            

            {/* Sidebar */}
            <div className={`
                sidebar fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 
                text-white flex flex-col z-50  duration-300 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                shadow-2xl backdrop-blur-xl border-r border-gray-700/50
            `}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 via-transparent to-purple-500/10"></div>
                    <div className="absolute top-1/4 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
                </div>

                {/* Header */}
                <div className="relative p-6 border-b border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                PharmaTrack
                            </h1>
                            <p className="text-gray-400 text-sm mt-1 font-medium">Pharmacy Management System</p>
                            {/* Decorative dot */}
                            <div className="absolute -top-1 -right-6 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => isMobile && setIsOpen(false)}
                                className="group relative flex items-center px-4 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 backdrop-blur-sm border border-transparent hover:border-blue-500/30"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-300"></div>
                                
                                {/* Icon with glow effect */}
                                <div className="relative z-10 p-2 rounded-lg bg-gray-800/50 group-hover:bg-gradient-to-br group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300">
                                    <IconComponent className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
                                </div>
                                
                                {/* Text */}
                                <span className="relative z-10 ml-4 font-semibold text-base group-hover:translate-x-1 transition-transform duration-300">
                                    {item.name}
                                </span>
                                
                                {/* Arrow indicator */}
                                <ChevronRight className="relative z-10 w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400" />
                                
                                {/* Active indicator line */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full group-hover:h-8 transition-all duration-300"></div>
                            </Link>
                        )
                    })}
                </div>

                {/* Footer with Enhanced User Info */}
                <div className="relative p-6 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                            {/* Enhanced Avatar */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {user?.name?.[0]}
                                </div>
                                {/* Online status indicator */}
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                            </div>
                            
                            {/* User Details */}
                            <div className="ml-4 flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                <div className="flex items-center mt-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    <p className="text-xs text-green-400 font-medium">Administrator</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced Logout Button */}
                        <button 
                            onClick={logout} 
                            className="group p-3 cursor-pointer rounded-xl text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-red-600/20 hover:to-pink-600/20 transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-500/30"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar