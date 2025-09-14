"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Calendar, DollarSign } from "lucide-react"

const Chart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 6) // last 7 days including today
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/sales-by-date`, {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        }, { withCredentials: true })

        const sales = Array.isArray(res.data.sales) ? res.data.sales : []

        // Aggregate totals by ISO date (YYYY-MM-DD)
        const totalsByDate = sales.reduce((acc, sale) => {
          const day = new Date(sale.createdAt).toISOString().split("T")[0] // YYYY-MM-DD
          const price = Number(sale.totalPrice || 0)
          acc[day] = (acc[day] || 0) + price
          return acc
        }, {})

        console.log(totalsByDate)

        // Build last 7 days in chronological order (oldest -> newest)
        const days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(start)          
          d.setDate(d.getDate() + i)    
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` // local YYYY-MM-DD
          return { date: key, sales: totalsByDate[key] || 0 }
        })


        // Extra safety: sort ascending by date before setState
        days.sort((a, b) => new Date(a.date) - new Date(b.date))

        setData(days)
      } catch (error) {
        console.error("Error fetching sales:", error)
      }
    }

    fetchSales()
  }, [])

  // Stats
  const totalSales = data.reduce((s, x) => s + (x.sales || 0), 0)
  const avgSales = data.length ? totalSales / data.length : 0
  const maxSales = data.length ? Math.max(...data.map(d => d.sales)) : 0

  // Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    const displayDate = new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    return (
      <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-blue-400" />
          <p className="text-gray-300 text-sm font-medium">{displayDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <p className="text-white font-bold text-lg">${payload[0].value.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Daily Sales Performance</h3>
            <p className="text-gray-400 text-sm">Sales trend (last 7 days)</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <p className="text-gray-400 text-xs">Total</p>
            <p className="text-white font-bold">${totalSales.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs">Average</p>
            <p className="text-emerald-400 font-bold">${Math.round(avgSales).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs">Peak</p>
            <p className="text-blue-400 font-bold">${maxSales.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            {/* Use ISO date as X value to preserve chronological order; format ticks for display */}
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) =>
                new Date(tick).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#1f2937" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart
