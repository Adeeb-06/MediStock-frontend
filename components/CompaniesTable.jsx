"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Building2, Package, AlertCircle, Search, Plus, Trash2, Edit } from "lucide-react"
import Link from "next/link"

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company/all-companies`,
          { withCredentials: true }
        )
        if (res.status === 200) {
          setCompanies(res.data.companies)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredCompanies = companies?.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) || company.medicines.some(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700 rounded w-1/4"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Companies</h1>
          <p className="text-gray-400">View all companies and their medicines</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Companies</p>
                <p className="text-white font-semibold text-lg">{companies.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Medicines</p>
                <p className="text-white font-semibold text-lg">
                  {companies.reduce((acc, c) => acc + (c.medicines?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Out of Stock</p>
                <p className="text-white font-semibold text-lg">
                  {companies.reduce(
                    (acc, c) =>
                      acc + (c.medicines?.filter((m) => m.stockNumber < 1).length || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search companies or medicines"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className=" flex-2 flex gap-3">
              <Link href={'/dashboard/companies/create'} >
                <button className=' bg-blue-300 hover:bg-blue-500/10 py-3 px-4 rounded-2xl gap-1 duration-100 cursor-pointer mt-2 text-black hover:text-white     flex items-center justify-center ' >

                  <Plus className="w-4 h-4" />
                  Add Companies
                </button>
              </Link>

            </div>



          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          {companies.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No companies found</h3>
              <p className="text-gray-500">Try adding a company first</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left p-6 text-gray-300 font-semibold">Company</th>
                    <th className="text-left p-6 text-gray-300 font-semibold">Medicine</th>
                    <th className="text-left p-6 text-gray-300 font-semibold">Stock</th>
                    <th className="text-left p-6 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <React.Fragment key={company._id}>
                      {/* Company Row */}
                      <tr className="bg-gray-700/30">
                        <td className="p-6 text-white font-bold">{company.name}</td>
                        <td className="p-6 text-gray-400 italic" colSpan={2}>
                          {company.medicines?.length || 0} medicines
                        </td>
                        <td className="p-6">
                            <div className="flex items-center justify-center gap-2">
                              <Link href={`/dashboard/companies/update/${company._id}`}>
                              
                              <button className="p-2 text-gray-400 cursor-pointer hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg">
                                <Edit className="w-4 h-4" />
                              </button>
                              </Link>
                            </div>
                          </td>
                      </tr>

                      {/* Medicine Rows */}
                      {company.medicines?.map((med) => (
                        <tr key={med._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                          <td className="p-6"></td>
                          <td className="p-6 text-white font-medium">{med.name}</td>
                          <td className="p-6 text-gray-300">{med.stockNumber}</td>
                          
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompaniesTable
