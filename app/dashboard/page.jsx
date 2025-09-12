"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Dashboard from '@/components/Dashboard'

const DashboardPage = () => {


  return (
    <div><Dashboard/></div>
  )
}

export default DashboardPage
