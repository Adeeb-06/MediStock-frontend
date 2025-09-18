"use client"
import React, { useContext } from 'react';
import { ArrowRight, Shield, BarChart3, Package, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { AppContent } from '@/app/context/AppContext';

export default function Hero() {
  const {isLoggedIn} = useContext(AppContent)


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PharmaTrack
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
           <Link href={'/login'}>
           
            <button 
            //   onClick={handleLogin}
              className="px-6 py-2 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Login
            </button>
           </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-15">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
            <Zap className="w-4 h-4 mr-2" />
            Next-Gen Pharmacy Management System
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Smart Inventory
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Revolutionize your pharmacy operations with inventory tracking, 
            real-time analytics. 
            Experience the future of pharmaceutical retail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href={` ${isLoggedIn ? '/dashboard' : '/login'}`}>
            
            <button 
            //   onClick={handleLogin}

              className="group px-8 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center min-w-[200px]"
            >
              Access Dashboard
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            
            </Link>
          </div>

          {/* Stats */}
          
        </div>
      </div>

      {/* Feature Pills */}
    
      {/* Mobile Login Button */}
    
    </div>
  );
}