"use client"
import React, { useState, useEffect, useContext } from "react"
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts"
import { AppContent } from "@/app/context/AppContext"
import { Calendar, DollarSign, TrendingUp } from "lucide-react"

const SalesDateChart = () => {
  const { salesData } = useContext(AppContent)
  const [chartData, setChartData] = useState([])

  // Helper: format date to "Sep 13"
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  useEffect(() => {
    if (!salesData || salesData.length === 0) return

    // Group sales by date
    const grouped = salesData.reduce((acc, sale) => {
      const d = formatDate(new Date(sale.createdAt))
      acc[d] = (acc[d] || 0) + (sale.totalPrice || 0)
      return acc
    }, {})

    // Convert into array for recharts
    const merged = Object.keys(grouped).map((day) => ({
      date: day,
      totalPrice: grouped[day],
    }))

    setChartData(merged)
  }, [salesData])

  // Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 border border-gray-700 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <p className="text-gray-300 text-sm">{label}</p>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <p className="text-white font-bold">${payload[0].value}</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Sales by Date</h3>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />

            {/* X = Date */}
            <XAxis
              type="category"
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              interval={0}
            />

            {/* Y = Price */}
            <YAxis
              type="number"
              dataKey="totalPrice"
              stroke="#9CA3AF"
              tickFormatter={(v) => `$${v}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              dataKey="totalPrice"
              type="monotone"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 6, fill: "#1f2937", stroke: "#3b82f6" }}
            />
          </AreaChart>

        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesDateChart
