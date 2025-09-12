import React from 'react'

const DashboardStats = ({stats}) => {
    
    const getColorClasses = (color) => {
        const colors = {
            blue: {
                icon: 'text-blue-400',
                iconBg: 'bg-blue-500/10',
                line: 'bg-blue-500'
            },
            green: {
                icon: 'text-emerald-400',
                iconBg: 'bg-emerald-500/10',
                line: 'bg-emerald-500'
            },
            orange: {
                icon: 'text-orange-400',
                iconBg: 'bg-orange-500/10',
                line: 'bg-orange-500'
            },
            red: {
                icon: 'text-red-400',
                iconBg: 'bg-red-500/10',
                line: 'bg-red-500'
            }
        }
        return colors[color]
    }
  return (
   <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const colorClasses = getColorClasses(stat.color)
                return (
                    <div 
                        key={index}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-200 group relative overflow-hidden"
                    >
                        {/* Left colored line */}
                        <div className={`absolute left-0 top-0 w-1 h-full ${colorClasses.line} group-hover:w-2 transition-all duration-300`}></div>
                        
                        {/* Content - Horizontal layout */}
                        <div className="flex items-center justify-between">
                            {/* Left side - Icon and text */}
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${colorClasses.icon}`} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                </div>
                            </div>

                            {/* Right side - Change indicator */}
                           
                        </div>
                    </div>
                )
            })}
        </div>
   </>
  )
}

export default DashboardStats