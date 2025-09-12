"use client"
import { AppContent } from '@/app/context/AppContext'
import React, { useContext, useEffect } from 'react'

const StocksTable = () => {
    const { stocksData , getAllStocks } = useContext(AppContent)

    useEffect(() => {
        const fetchData = async () => {
            await getAllStocks()
        }
        fetchData()
    }, [])

    console.log(stocksData)
  return (
    <div>StocksTable</div>
  )
}

export default StocksTable