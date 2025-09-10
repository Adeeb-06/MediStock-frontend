"use client"
import { AppContent } from '@/app/context/AppContext'
import React, { useContext } from 'react'

const MedicineTable = () => {
    const {medicinesData} = useContext(AppContent)
    console.log(medicinesData)
  return (
    <div>MedicineTable</div>
  )
}

export default MedicineTable