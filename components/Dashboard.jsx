import React, { useContext, useEffect , useState } from 'react'
import { TrendingUp, Package, DollarSign, Target, AlertCircle } from 'lucide-react'
import DashboardStats from './DashboardStats'
import { AppContent } from '@/app/context/AppContext'

const Dashboard = () => {
    const { salesData, stocksData, getSales, getAllStocks } = useContext(AppContent)
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
    const totalSales = salesData?.reduce((total, sale) => {
        return total + sale.totalPrice
    }, 0)
    const totalStocks = stocksData?.reduce((total, stock) => {
        return total + stock.quantity
    }, 0)

    const expiredStocks = stocksData?.filter(stock => new Date(stock.expiryDate) < new Date())

    const totalSpend = stocksData?.reduce((total, stock) => {
        return total + stock.totalPrice
    }, 0)

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
            <div className="text- mb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text text- bg-gradient-to-r from-green-400 to-blue-500">
                    Welcome Back, Admin!
                </h1>
                <p className="text-gray-400 text-lg md:text-xl">
                    Here’s a summary of your inventory and sales
                </p>
            </div>
            <hr className='mb-4 border-gray-700/50' />

            {/* Stats Cards */}
            <DashboardStats stats={stats} />
        </div>
    )
}

export default Dashboard
