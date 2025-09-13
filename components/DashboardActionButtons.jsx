import React from 'react'
import { Package, ShoppingCart, Pill, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DashboardActionButtons = () => {
  const router = useRouter()
  const actionButtons = [
    {
      title: 'Create Stock',
      description: 'Add new inventory',
      icon: Package,
      href: '/dashboard/stock/newStock',
      gradient: 'from-blue-200/20 to-cyan-200/20',
      // borderGradient: 'from-blue-200 to-cyan-200',
      iconColor: 'text-blue-400',
      hoverGlow: 'hover:shadow-blue-200/25'
    },
    {
      title: 'Sell Medicine',
      description: 'Process new sale',
      icon: ShoppingCart,
      href: '/dashboard/stock/sellStock',
      gradient: 'from-emerald-200/20 to-green-200/20',
      // borderGradient: 'from-emerald-200 to-green-200',
      iconColor: 'text-emerald-400',
      hoverGlow: 'hover:shadow-emerald-200/25'
    },
    {
      title: 'Create Medicine',
      description: 'Add new medicine',
      icon: Pill,
      href: '/dashboard/medicines/create-medicine',
      gradient: 'from-purple-200/20 to-pink-200/20',
      // borderGradient: 'from-purple-200 to-pink-200',
      iconColor: 'text-purple-400',
      hoverGlow: 'hover:shadow-purple-200/25'
    },
    {
      title: 'Create Company',
      description: 'Add new company',
      icon: Building2,
      href: '/dashboard/companies/create',
      gradient: 'from-orange-200/20 to-red-200/20',
      // borderGradient: 'from-orange-200 to-red-200',
      iconColor: 'text-orange-400',
      hoverGlow: 'hover:shadow-orange-200/25'
    }
  ]

  const handleButtonClick = (href) => {
    // Handle navigation - replace with your routing logic
    console.log(`Navigating to: ${href}`)
    router.push(href)
    // For Next.js: router.push(href)
    // For React Router: navigate(href)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actionButtons.map((button, index) => (
        <div
          key={index}
          onClick={() => handleButtonClick(button.href)}
          className="group relative cursor-pointer"
        >
          {/* Neon Border Effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${button.borderGradient} rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-sm group-hover:blur-none`}></div>
          
          {/* Main Card */}
          <div className={`relative bg-gray-900 rounded-2xl py-5 px-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-gray-800/80 ${button.hoverGlow} hover:shadow-2xl`}>
            
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${button.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              
              {/* Icon */}
              <div className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-700/50 group-hover:border-transparent`}>
                <button.icon className={`w-6 h-6 ${button.iconColor} group-hover:drop-shadow-lg transition-all duration-300`} />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {button.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {button.description}
              </p>

              {/* Action Indicator */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className={`w-2 h-2 bg-gradient-to-r ${button.borderGradient} rounded-full animate-pulse`}></div>
                <span className="text-xs text-gray-300 font-medium">Click to create</span>
                <div className={`w-2 h-2 bg-gradient-to-r ${button.borderGradient} rounded-full animate-pulse`}></div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${button.borderGradient} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardActionButtons